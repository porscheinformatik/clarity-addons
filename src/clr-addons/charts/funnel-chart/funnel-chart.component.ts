/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnChanges,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { color as d3color, max as d3max, scaleLinear as d3scaleLinear, select as d3select, Selection } from 'd3';
import { toChartColor } from '../utils';
import { ChartBase } from '../shared/chart-base';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface FunnelChartSection {
  key: string;
  label: string;
  value: number;
  /** Hex value ('#009ADB') or CSS custom property ('--cds-global-color-blue-800'). */
  color?: string;
  /** Text color rendered inside this section. */
  textColor?: string;
}

export interface FunnelChartData {
  key: string;
  label: string;
  fullLabel?: string;
  description?: string;
  value: number;
  /** Optional breakdown of the bar into named segments. Values should sum to `value`. */
  sections?: FunnelChartSection[];
}

export interface FunnelValue {
  value: number;
  label: string;
  key: string;
  /** Key of the clicked section, or `undefined` when the whole bar was clicked. */
  section?: string;
}

export interface FunnelChartLabels {
  total: string;
  all: string;
}

// ─── Internal types ───────────────────────────────────────────────────────────

interface FunnelDataPointSection {
  key: string;
  label: string;
  x: number;
  width: number;
  value: number;
  percentage: number;
  cssColor: string;
  hoverColor: string;
  textColor: string;
}

interface FunnelDataPoint {
  key: string;
  label: string;
  fullLabel?: string;
  description?: string;
  value: number;
  y: number;
  width: number;
  percentage: number;
  delta?: number;
  deltaPercentage?: number;
  sections: FunnelDataPointSection[];
}

interface SectionTooltipData {
  key: string;
  x?: number;
  y?: number;
  description?: string;
}

interface CenteredDataPoint {
  key: string;
  label: string;
  fullLabel?: string;
  description?: string;
  value: number;
  sections?: FunnelChartSection[];
  y: number;
  width: number;
  percentage: number;
  delta?: number;
  deltaPercentage?: number;
}

interface SpacerDataPoint {
  index: number;
  topWidth: number;
  bottomWidth: number;
  topY: number;
  bottomY: number;
  topX: number;
  bottomX: number;
  deltaPercentage: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DEFAULT_SECTION_COLORS = ['#009ADB', '#66D1FF', '#D9D9D9', '#A6A6A6'];
const DEFAULT_TEXT_COLORS = ['#eee', '#eee', '#555', '#eee'];

const DEFAULT_CHART_LABELS: FunnelChartLabels = {
  total: 'Total',
  all: 'All',
};

@Component({
  selector: 'clr-funnel-chart',
  templateUrl: './funnel-chart.component.html',
  styleUrls: ['./funnel-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class FunnelChartComponent extends ChartBase<FunnelDataPoint> implements OnChanges {
  // ── Inputs ──────────────────────────────────────────────────────────────────
  public readonly data = input<FunnelChartData[]>([]);
  public readonly showExportButton = input(false);
  public readonly exportButtonTitle = input<string>('Export');
  public readonly exportFilename = input<string>('funnel-chart');

  /** Rendering mode. 'default' = horizontal bars with sections; 'centered' = centered trapezoid funnel. */
  public readonly orientation = input<'default' | 'centered'>('default');

  /** Width reserved on each side for labels (px). */
  public readonly textSize = input(200);
  /** Gap between funnel bars and their side-line labels (px). */
  public readonly lineTextPadding = input(8);
  /** Vertical gap between funnel bars – default mode only (px). */
  public readonly barGap = input(2);
  /** Vertical padding inside the side measurement lines (px). */
  public readonly sideLineVerticalPadding = input(4);

  // ── Centered-mode specific inputs ────────────────────────────────────────────
  /** Minimum length of the horizontal measurement lines on each side (px). Centered mode only. */
  public readonly minLineSize = input(30);
  /** Ratio of bar height to spacer height. Centered mode only. */
  public readonly barToSpacerRatio = input(2);
  /** Vertical padding inside the center divider lines (px). Centered mode only. */
  public readonly middleLineVerticalPadding = input(4);
  /** Fill color of the centered-mode bars. Accepts hex or CSS custom property. Centered mode only. */
  public readonly barColor = input<string>(DEFAULT_SECTION_COLORS[0]);
  /** Fill color of the trapezoid spacers. Accepts hex or CSS custom property. Centered mode only. */
  public readonly spacerColor = input<string>('#D9D9D9');

  /**
   * Override the chart labels shown in the tooltip (total / all rows).
   * Partial – any key not provided falls back to the English default.
   */
  public readonly chartLabels = input<Partial<FunnelChartLabels>>({});

  /**
   * Override section colors by section key.
   * Accepts hex values ('#009ADB') or CSS custom properties ('--cds-global-color-blue-800').
   * Per-section `color` in the data takes priority over this map; this map takes priority over
   * the built-in default palette.
   */
  public readonly sectionColors = input<Record<string, string>>({});

  // ── Outputs ─────────────────────────────────────────────────────────────────
  public readonly valueClicked = output<FunnelValue>();

  // ── Computed ─────────────────────────────────────────────────────────────────
  protected readonly resolvedChartLabels = computed<FunnelChartLabels>(() => ({
    ...DEFAULT_CHART_LABELS,
    ...this.chartLabels(),
  }));

  /** CSS-ready color for the centered-mode bar. */
  protected readonly centeredBarCssColor = computed(() => toChartColor(this.barColor()));

  /** CSS-ready spacer color. */
  protected readonly centeredSpacerCssColor = computed(() => toChartColor(this.spacerColor()));

  protected readonly total = computed(() => this.data()[0]?.value ?? 0);

  protected readonly hasData = computed(() => this.data().length > 0);

  // ── State ─────────────────────────────────────────────────────────────────────
  protected readonly selectedItemLabel = computed(
    () => this.selectedItem()?.fullLabel ?? this.selectedItem()?.label ?? ''
  );
  protected readonly selectedSpacerItem = signal<SpacerDataPoint | undefined>(undefined);
  protected readonly sectionTooltips = signal<SectionTooltipData[]>([]);

  private svg: Selection<SVGSVGElement, unknown, null, undefined>;

  // ── Lifecycle ────────────────────────────────────────────────────────────────

  public ngOnChanges(_changes: SimpleChanges): void {
    if (!this.svg) {
      return;
    }
    requestAnimationFrame(() => this.updateChart());
  }

  public override ngAfterViewInit(): void {
    this.svg = d3select(this.chartRef().nativeElement);
    super.ngAfterViewInit();
  }

  // ── Chart rendering ──────────────────────────────────────────────────────────
  protected updateChart(): void {
    if (!this.svg) {
      return;
    }
    this.svg.selectAll('*').remove();

    if (this.loading() || !this.hasData()) {
      return;
    }

    const { width: containerWidth, height: containerHeight } = this.getContainerDimensions();

    if (this.orientation() === 'centered') {
      this.renderCenteredChart(containerWidth, containerHeight);
    } else {
      const funnelWidth = this.getFunnelWidth(containerWidth);
      const barHeight = this.getBarHeight(containerHeight);
      const dataPoints = this.calculateDataPoints(funnelWidth, barHeight);
      this.renderRightSideText(dataPoints, containerWidth, barHeight);
      this.renderLeftSideText(dataPoints, barHeight);
      this.renderSideLines(dataPoints, containerWidth, funnelWidth, barHeight);
      this.renderFunnel(dataPoints, containerWidth, containerHeight, funnelWidth, barHeight);
    }
  }

  // ── Data calculation ─────────────────────────────────────────────────────────
  private calculateDataPoints(funnelWidth: number, barHeight: number): FunnelDataPoint[] {
    const maxValue = d3max(this.data(), d => d.value) ?? 1;
    const widthScale = d3scaleLinear().domain([0, maxValue]).range([0, funnelWidth]);
    const sectionColorOverrides = this.sectionColors();

    return this.data().map((d, i) => {
      let xOffset = 0;

      const sections: FunnelDataPointSection[] = (d.sections ?? []).map((s, si) => {
        const rawColor =
          s.color ?? sectionColorOverrides[s.key] ?? DEFAULT_SECTION_COLORS[si % DEFAULT_SECTION_COLORS.length];
        const cssColor = toChartColor(rawColor);
        const hoverColor = rawColor.startsWith('--')
          ? cssColor
          : d3color(rawColor)?.darker(0.5)?.formatHex() ?? cssColor;
        const textColor = s.textColor ?? DEFAULT_TEXT_COLORS[si % DEFAULT_TEXT_COLORS.length];
        const sWidth = widthScale(s.value);

        const sec: FunnelDataPointSection = {
          key: s.key,
          label: s.label,
          x: xOffset,
          width: sWidth,
          value: s.value,
          percentage: d.value ? this.round((s.value / d.value) * 100) : 0,
          cssColor,
          hoverColor,
          textColor,
        };
        xOffset += sWidth;
        return sec;
      });

      const point: FunnelDataPoint = {
        ...d,
        sections,
        y: i * (barHeight + this.barGap()),
        width: widthScale(d.value),
        percentage: this.total() ? this.round((d.value / this.total()) * 100) : 0,
      };

      if (i > 0) {
        const previousValue = this.data()[i - 1].value;
        point.delta = previousValue - d.value;
        point.deltaPercentage = previousValue === 0 ? 0 : this.round((point.delta / previousValue) * 100);
      }

      return point;
    });
  }

  // ── Rendering helpers ────────────────────────────────────────────────────────
  private renderRightSideText(dataPoints: FunnelDataPoint[], containerWidth: number, barHeight: number): void {
    const rightG = this.svg.append('g').attr('transform', `translate(${containerWidth - this.textSize()},0)`);

    dataPoints.forEach((d, i) => {
      if (i === 0) {
        return;
      }
      const prev = dataPoints[i - 1];
      const labelY = (prev.y + barHeight + d.y) / 2 + 4;
      rightG
        .append('text')
        .attr('x', 0)
        .attr('y', labelY)
        .attr('text-anchor', 'start')
        .style('font-size', '12px')
        .style('fill', 'var(--clr-color-neutral-600, #666)')
        .text(`-${this.round(d.deltaPercentage)}% (${d.delta})`);
    });
  }

  private renderLeftSideText(dataPoints: FunnelDataPoint[], barHeight: number): void {
    const leftG = this.svg.append('g');
    const ICON_SPACE = 20;
    const positions: SectionTooltipData[] = [];

    dataPoints.forEach(d => {
      const labelY = (d.y + barHeight + d.y) / 2 + 4;
      const iconSpacing = d.description ? ICON_SPACE : 0;

      const textLength = leftG
        .append('text')
        .attr('x', this.textSize() - iconSpacing)
        .attr('y', labelY - 8)
        .attr('text-anchor', 'end')
        .style('font-size', '13px')
        .style('font-weight', '600')
        .style('fill', 'var(--clr-color-neutral-900, #21333b)')
        .style('cursor', 'pointer')
        .text(d.label)
        .on('click', () => this.valueClicked.emit({ value: d.value, label: d.label, key: d.key }))
        .node()
        .getComputedTextLength();

      if (d.description) {
        positions.push({
          x: this.textSize() - iconSpacing + 5,
          y: labelY - 24,
          key: d.key,
          description: d.description,
        });
      }

      leftG
        .append('line')
        .attr('x1', this.textSize() - textLength - iconSpacing)
        .attr('y1', labelY - 5)
        .attr('x2', this.textSize() - iconSpacing)
        .attr('y2', labelY - 5)
        .attr('stroke', 'var(--clr-color-neutral-600, #666)')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '2,2');

      leftG
        .append('text')
        .attr('x', this.textSize())
        .attr('y', labelY + 10)
        .attr('text-anchor', 'end')
        .style('font-size', '12px')
        .style('fill', 'var(--clr-color-neutral-600, #666)')
        .text(`${this.round(d.percentage)}% (${d.value})`);
    });

    this.sectionTooltips.set(positions);
  }

  private renderSideLines(
    dataPoints: FunnelDataPoint[],
    containerWidth: number,
    funnelWidth: number,
    barHeight: number
  ): void {
    const lineG = this.svg.append('g').attr('transform', `translate(${(containerWidth - funnelWidth) / 2},0)`);

    dataPoints.forEach(d => {
      const midY = d.y + barHeight / 2;

      lineG
        .append('line')
        .attr('x1', 0)
        .attr('y1', midY)
        .attr('x2', funnelWidth)
        .attr('y2', midY)
        .attr('stroke', '#D9D9D9')
        .attr('stroke-width', 1);

      this.renderSideLine(lineG, funnelWidth, d.y, barHeight);

      if (d.value === 0) {
        this.renderSideLine(lineG, 0, d.y, barHeight);
      }
    });
  }

  private renderSideLine(
    g: Selection<SVGGElement, unknown, null, undefined>,
    x: number,
    y: number,
    barHeight: number
  ): void {
    g.append('line')
      .attr('x1', x)
      .attr('y1', y + this.sideLineVerticalPadding())
      .attr('x2', x)
      .attr('y2', y + barHeight - this.sideLineVerticalPadding())
      .attr('stroke', '#D9D9D9')
      .attr('stroke-width', 1);
  }

  private renderFunnel(
    dataPoints: FunnelDataPoint[],
    containerWidth: number,
    containerHeight: number,
    funnelWidth: number,
    barHeight: number
  ): void {
    const funnelG = this.svg
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .append('g')
      .attr('transform', `translate(${(containerWidth - funnelWidth) / 2},0)`);

    // First pass: all rects (z-order: rects below texts)
    dataPoints.forEach(dp => {
      dp.sections.forEach(section => {
        funnelG
          .append('rect')
          .attr('x', section.x)
          .attr('y', dp.y)
          .attr('width', section.width)
          .attr('height', barHeight)
          .style('fill', section.cssColor)
          .style('cursor', 'pointer')
          .on('mouseover', e => {
            d3select(e.currentTarget).style('fill', section.hoverColor);
          })
          .on('mouseout', e => {
            d3select(e.currentTarget).style('fill', section.cssColor);
          })
          .on('click', (event: PointerEvent) => {
            this.handleSectionClick(event, dp, section.key);
          });
      });
    });

    // Second pass: texts on top
    dataPoints.forEach(dp => {
      dp.sections.forEach(section => {
        if (section.width > 40) {
          funnelG
            .append('text')
            .attr('x', section.x + section.width / 2)
            .attr('y', dp.y + barHeight / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('font-size', '13px')
            .style('font-weight', '600')
            .style('pointer-events', 'none')
            .style('fill', section.textColor)
            .text(`${section.percentage}%`);
        }
      });
    });
  }

  // ── Event handlers ────────────────────────────────────────────────────────────
  private handleSectionClick(event: PointerEvent, d: FunnelDataPoint, _sectionKey: string): void {
    event.stopPropagation();
    const target = event.currentTarget as SVGElement;
    const rect = target.getBoundingClientRect();
    const container = this.chartRef().nativeElement.getBoundingClientRect();
    this.tooltipPosition.set({
      x: rect.left - container.left + rect.width / 2,
      y: rect.bottom - container.top,
    });
    this.selectedItem.set(d);
  }

  public override resetTooltip(): void {
    if (this.selectedItem() || this.selectedSpacerItem() || this.tooltipPosition()) {
      this.selectedItem.set(undefined);
      this.selectedSpacerItem.set(undefined);
      this.tooltipPosition.set(undefined);
    }
  }

  /** Formats a percentage to 2 decimal places for template use. */
  protected pct(value: number, total: number): number {
    return this.round(total ? (value / total) * 100 : 0);
  }

  // ── Centered chart ────────────────────────────────────────────────────────────
  private renderCenteredChart(containerWidth: number, containerHeight: number): void {
    const maxFunnelWidth = this.getMaxFunnelWidth(containerWidth);
    const barHeight = this.getCenteredBarHeight(containerHeight);
    const spacerHeight = this.getCenteredSpacerHeight(containerHeight);

    const dataPoints = this.calculateCenteredDataPoints(maxFunnelWidth, barHeight, spacerHeight);
    const spacerPoints = this.calculateSpacerDataPoints(dataPoints, maxFunnelWidth, barHeight);

    this.renderCenteredLeftSideText(dataPoints, barHeight);
    this.renderCenteredLeftSideLines(dataPoints, maxFunnelWidth, barHeight);
    this.renderCenteredRightSideText(dataPoints, containerWidth, barHeight);
    this.renderCenteredRightSideLines(dataPoints, containerWidth, maxFunnelWidth, barHeight);
    this.renderCenteredMiddleLines(dataPoints, spacerPoints, containerWidth, barHeight);
    this.renderCenteredFunnel(
      dataPoints,
      spacerPoints,
      containerWidth,
      containerHeight,
      maxFunnelWidth,
      barHeight,
      spacerHeight
    );
  }

  private calculateCenteredDataPoints(
    maxFunnelWidth: number,
    barHeight: number,
    spacerHeight: number
  ): CenteredDataPoint[] {
    const total = this.data()[0]?.value ?? 1;
    const maxValue = d3max(this.data(), d => d.value) ?? 1;
    const scale = d3scaleLinear().domain([0, maxValue]).range([0, maxFunnelWidth]);

    return this.data().map((d, i) => {
      const point: CenteredDataPoint = {
        ...d,
        y: i * (barHeight + spacerHeight),
        width: scale(d.value),
        percentage: total ? this.round((d.value / total) * 100) : 0,
      };
      if (i > 0) {
        const prev = this.data()[i - 1].value;
        point.delta = prev - d.value;
        point.deltaPercentage = prev === 0 ? 0 : this.round((point.delta / prev) * 100);
      }
      return point;
    });
  }

  private calculateSpacerDataPoints(
    dataPoints: CenteredDataPoint[],
    maxFunnelWidth: number,
    barHeight: number
  ): SpacerDataPoint[] {
    const spacers: SpacerDataPoint[] = [];
    for (let i = 0; i < dataPoints.length - 1; i++) {
      const cur = dataPoints[i];
      const next = dataPoints[i + 1];
      spacers.push({
        index: i,
        topWidth: cur.width,
        bottomWidth: next.width,
        topY: cur.y + barHeight,
        bottomY: next.y,
        topX: (maxFunnelWidth - cur.width) / 2,
        bottomX: (maxFunnelWidth - next.width) / 2,
        deltaPercentage: next.deltaPercentage ?? 0,
      });
    }
    return spacers;
  }

  private renderCenteredLeftSideText(dataPoints: CenteredDataPoint[], barHeight: number): void {
    const g = this.svg.append('g').attr('transform', `translate(${this.textSize()},0)`);
    const ICON_SPACE = 20;
    const positions: SectionTooltipData[] = [];

    dataPoints.forEach(d => {
      const cy = d.y + barHeight / 2;
      const iconSpacing = d.description ? ICON_SPACE : 0;

      const textLen = g
        .append('text')
        .attr('x', -iconSpacing)
        .attr('y', cy - 8)
        .attr('text-anchor', 'end')
        .style('font-size', '13px')
        .style('font-weight', '600')
        .style('fill', 'var(--clr-color-neutral-900, #21333b)')
        .style('cursor', 'pointer')
        .text(d.label)
        .on('click', () => this.valueClicked.emit({ value: d.value, label: d.label, key: d.key }))
        .node()
        .getComputedTextLength();

      if (d.description) {
        positions.push({ key: d.key, x: this.textSize() - iconSpacing + 5, y: cy - 24, description: d.description });
      }

      g.append('line')
        .attr('x1', -textLen - iconSpacing)
        .attr('y1', cy - 5)
        .attr('x2', -iconSpacing)
        .attr('y2', cy - 5)
        .attr('stroke', 'var(--clr-color-neutral-600, #666)')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '2,2');

      g.append('text')
        .attr('x', 0)
        .attr('y', cy + 10)
        .attr('text-anchor', 'end')
        .style('font-size', '12px')
        .style('fill', 'var(--clr-color-neutral-600, #666)')
        .text(`${this.round(d.percentage)}% (${d.value})`);
    });

    this.sectionTooltips.set(positions);
  }

  private renderCenteredLeftSideLines(
    dataPoints: CenteredDataPoint[],
    maxFunnelWidth: number,
    barHeight: number
  ): void {
    const g = this.svg.append('g').attr('transform', `translate(${this.textSize() + this.lineTextPadding()},0)`);
    dataPoints.forEach(d => {
      g.append('line')
        .attr('x1', 0)
        .attr('y1', d.y + barHeight / 2)
        .attr('x2', maxFunnelWidth / 2 + this.minLineSize())
        .attr('y2', d.y + barHeight / 2)
        .attr('stroke', '#D9D9D9')
        .attr('stroke-width', 1);
    });
  }

  private renderCenteredRightSideText(
    dataPoints: CenteredDataPoint[],
    containerWidth: number,
    barHeight: number
  ): void {
    const g = this.svg.append('g').attr('transform', `translate(${containerWidth - this.textSize()},0)`);
    dataPoints.forEach((d, i) => {
      if (i === 0) {
        return;
      }
      const prev = dataPoints[i - 1];
      const cy = (prev.y + barHeight + d.y) / 2 + 4;
      g.append('text')
        .attr('x', 0)
        .attr('y', cy)
        .attr('text-anchor', 'start')
        .style('font-size', '12px')
        .style('fill', 'var(--clr-color-neutral-600, #666)')
        .text(`-${this.round(d.deltaPercentage)}% (${d.delta})`);
    });
  }

  private renderCenteredRightSideLines(
    dataPoints: CenteredDataPoint[],
    containerWidth: number,
    maxFunnelWidth: number,
    barHeight: number
  ): void {
    const g = this.svg.append('g').attr('transform', `translate(${containerWidth / 2},0)`);
    dataPoints.forEach((d, i) => {
      if (i === 0) {
        return;
      }
      const prev = dataPoints[i - 1];
      const cy = (prev.y + barHeight + d.y) / 2;
      g.append('line')
        .attr('x1', 0)
        .attr('y1', cy)
        .attr('x2', maxFunnelWidth / 2 + this.minLineSize())
        .attr('y2', cy)
        .attr('stroke', '#D9D9D9')
        .attr('stroke-width', 1);
    });
  }

  private renderCenteredMiddleLines(
    dataPoints: CenteredDataPoint[],
    spacerPoints: SpacerDataPoint[],
    containerWidth: number,
    barHeight: number
  ): void {
    const vPad = this.middleLineVerticalPadding();
    const g = this.svg.append('g').attr('transform', `translate(${containerWidth / 2},0)`);

    g.selectAll('.bar-mid')
      .data(dataPoints)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('y1', d => d.y + vPad)
      .attr('x2', 0)
      .attr('y2', d => d.y + barHeight - vPad)
      .attr('stroke', '#D9D9D9')
      .attr('stroke-width', 1);

    g.selectAll('.spacer-mid')
      .data(spacerPoints)
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('y1', d => d.topY + vPad)
      .attr('x2', 0)
      .attr('y2', d => d.bottomY - vPad)
      .attr('stroke', '#D9D9D9')
      .attr('stroke-width', 1);
  }

  private renderCenteredFunnel(
    dataPoints: CenteredDataPoint[],
    spacerPoints: SpacerDataPoint[],
    containerWidth: number,
    containerHeight: number,
    maxFunnelWidth: number,
    barHeight: number,
    spacerHeight: number
  ): void {
    const g = this.svg
      .attr('width', containerWidth)
      .attr('height', containerHeight)
      .append('g')
      .attr('transform', `translate(${(containerWidth - maxFunnelWidth) / 2},0)`);

    // ── Bars ──────────────────────────────────────────────────────────────────
    const rawBarColor = this.barColor();
    const cssBarColor = toChartColor(rawBarColor);
    const hoverBarColor = rawBarColor.startsWith('--')
      ? cssBarColor
      : d3color(rawBarColor)?.darker(0.5)?.formatHex() ?? cssBarColor;

    const bars = g
      .selectAll<SVGGElement, CenteredDataPoint>('.c-bar')
      .data(dataPoints)
      .enter()
      .append('g')
      .attr('class', 'c-bar');

    bars
      .append('rect')
      .attr('x', d => (maxFunnelWidth - d.width) / 2)
      .attr('y', d => d.y)
      .attr('width', d => d.width)
      .attr('height', barHeight)
      .style('fill', cssBarColor)
      .style('cursor', 'pointer')
      .on('mouseover', e => {
        d3select(e.currentTarget).style('fill', hoverBarColor);
      })
      .on('mouseout', e => {
        d3select(e.currentTarget).style('fill', cssBarColor);
      })
      .on('click', (event: PointerEvent, d: CenteredDataPoint) => {
        event.stopPropagation();
        const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
        const cont = this.chartRef().nativeElement.getBoundingClientRect();
        this.tooltipPosition.set({ x: rect.left - cont.left + rect.width / 2, y: rect.top - cont.top });
        this.selectedSpacerItem.set(undefined);
        this.selectedItem.set(d as unknown as FunnelDataPoint);
      });

    bars
      .selectAll<SVGTextElement, CenteredDataPoint>('.c-bar-label')
      .data(dataPoints.filter(d => d.width > 40))
      .enter()
      .append('text')
      .attr('x', maxFunnelWidth / 2)
      .attr('y', d => d.y + barHeight / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '13px')
      .style('font-weight', '600')
      .style('pointer-events', 'none')
      .style('fill', '#eee')
      .text(d => `${this.round(d.percentage)}%`);

    // ── Spacers ───────────────────────────────────────────────────────────────
    const rawSpacerColor = this.spacerColor();
    const cssSpacerColor = toChartColor(rawSpacerColor);
    const hoverSpacerColor = rawSpacerColor.startsWith('--')
      ? cssSpacerColor
      : d3color(rawSpacerColor)?.darker(0.2)?.formatHex() ?? cssSpacerColor;

    g.selectAll<SVGPolygonElement, SpacerDataPoint>('.c-spacer')
      .data(spacerPoints)
      .enter()
      .append('polygon')
      .attr('class', 'c-spacer')
      .attr(
        'points',
        d =>
          `${d.topX},${d.topY} ${d.topX + d.topWidth},${d.topY} ${d.bottomX + d.bottomWidth},${d.bottomY} ${
            d.bottomX
          },${d.bottomY}`
      )
      .style('fill', cssSpacerColor)
      .style('cursor', 'pointer')
      .on('mouseover', e => {
        d3select(e.currentTarget).style('fill', hoverSpacerColor);
      })
      .on('mouseout', e => {
        d3select(e.currentTarget).style('fill', cssSpacerColor);
      })
      .on('click', (event: PointerEvent, d: SpacerDataPoint) => {
        event.stopPropagation();
        const rect = (event.currentTarget as SVGElement).getBoundingClientRect();
        const cont = this.chartRef().nativeElement.getBoundingClientRect();
        this.tooltipPosition.set({ x: rect.left - cont.left + rect.width / 2, y: rect.top - cont.top });
        this.selectedItem.set(undefined);
        this.selectedSpacerItem.set(d);
      });

    g.selectAll<SVGTextElement, SpacerDataPoint>('.c-spacer-label')
      .data(spacerPoints.filter(d => d.bottomWidth > 40))
      .enter()
      .append('text')
      .attr('x', maxFunnelWidth / 2)
      .attr('y', d => d.topY + spacerHeight / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-size', '13px')
      .style('font-weight', '600')
      .style('pointer-events', 'none')
      .style('fill', '#333')
      .text(d => `-${this.round(d.deltaPercentage)}%`);
  }

  // ── Helpers ───────────────────────────────────────────────────────────────────
  private getMaxFunnelWidth(containerWidth: number): number {
    return containerWidth - this.textSize() * 2 - this.minLineSize() * 2 - this.lineTextPadding() * 2;
  }

  private getCenteredFractionHeight(containerHeight: number): number {
    return containerHeight / (this.data().length * (this.barToSpacerRatio() + 1) - 1);
  }

  private getCenteredBarHeight(containerHeight: number): number {
    return this.getCenteredFractionHeight(containerHeight) * this.barToSpacerRatio();
  }

  private getCenteredSpacerHeight(containerHeight: number): number {
    return this.getCenteredFractionHeight(containerHeight);
  }

  private getFunnelWidth(containerWidth: number): number {
    return containerWidth - this.textSize() * 2 - this.lineTextPadding() * 2;
  }

  private getBarHeight(containerHeight: number): number {
    const n = this.data().length;
    if (n === 0) {
      return 0;
    }
    return (containerHeight - (n - 1) * this.barGap()) / n;
  }

  private round(value: number, decimals = 2): number {
    const factor = 10 ** decimals;
    return Math.round(factor * value) / factor;
  }
}
