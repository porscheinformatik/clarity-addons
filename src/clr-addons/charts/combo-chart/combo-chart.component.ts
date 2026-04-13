import { ChangeDetectionStrategy, Component, computed, input, OnChanges, output, SimpleChanges } from '@angular/core';
import {
  axisRight as d3axisRight,
  curveMonotoneX,
  format as d3format,
  line as d3line,
  max as d3max,
  scaleBand as d3scaleBand,
  ScaleBand,
  ScaleLinear,
  scaleLinear as d3scaleLinear,
  select as d3select,
  Selection,
} from 'd3';
import { NO_ITEMS_ALERT_TYPE, NO_ITEMS_MESSAGE } from '../constants';
import { toChartColor } from '../utils';
import { ChartLegendItem } from '../chart-legend/chart-legend.component';
import { drawXYAxes, styleGridLines } from '../shared/d3-chart-axes';
import { ChartBase } from '../shared/chart-base';

// ─── Public types ────────────────────────────────────────────────────────────

export interface ComboBarPoint {
  /** X category key (must match keys used in line data). */
  x: string;
  /** Optional display label for the X-axis tick. */
  xLabel?: string;
  value: number;
}

export interface ComboBarSeries {
  key: string;
  label: string;
  color: string;
  data: ComboBarPoint[];
}

export interface ComboLinePoint {
  x: string;
  value: number;
}

export interface ComboLineSeries {
  key: string;
  label: string;
  color: string;
  data: ComboLinePoint[];
}

/** Emitted when the user clicks a bar segment or a line dot. */
export interface ComboChartValue {
  seriesKey: string;
  seriesLabel: string;
  seriesType: 'bar' | 'line';
  x: string;
  xLabel?: string;
  value: number;
}

// ─── Internal ────────────────────────────────────────────────────────────────

interface SelectedComboItem {
  seriesKey: string;
  seriesLabel: string;
  seriesType: 'bar' | 'line';
  color: string;
  x: string;
  xLabel?: string;
  value: number;
  total: number;
}

@Component({
  selector: 'clr-combo-chart',
  templateUrl: './combo-chart.component.html',
  styleUrls: ['./combo-chart.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboChartComponent extends ChartBase<SelectedComboItem> implements OnChanges {
  // ── Inputs ──────────────────────────────────────────────────────────────────
  public readonly barSeries = input<ComboBarSeries[]>([]);
  public readonly lineSeries = input<ComboLineSeries[]>([]);
  public readonly tooltipOrientation = input<'top' | 'bottom'>('top');
  public readonly showLegend = input(true);
  public readonly showExportButton = input(false);
  public readonly exportButtonTitle = input<string>('Export');
  public readonly exportFilename = input<string>('combo-chart');

  public readonly noItemsMessage = input<string>(NO_ITEMS_MESSAGE);
  public readonly tooltipPercentOfTotal = input<string>('of total');

  /** Optional label rendered below the X axis. */
  public readonly xAxisLabel = input<string>('');
  /** Optional label rendered rotated to the left of the Y axis (bar scale). */
  public readonly yAxisLabel = input<string>('');
  /** Optional label rendered rotated to the right of the Y axis (line scale). */
  public readonly yLineAxisLabel = input<string>('');
  /** Optional fixed maximum value for the bar Y axis (left). Defaults to auto. */
  public readonly yBarMax = input<number | undefined>(undefined);
  /** Optional fixed maximum value for the line Y axis (right). Defaults to auto. */
  public readonly yLineMax = input<number | undefined>(undefined);

  // ── Outputs ─────────────────────────────────────────────────────────────────
  public readonly valueClicked = output<ComboChartValue>();

  // ── Layout ───────────────────────────────────────────────────────────────────
  private readonly MARGIN = { top: 20, right: 30, bottom: 30, left: 65 };

  // ── Computed ─────────────────────────────────────────────────────────────────
  protected readonly hasData = computed(
    () => this.barSeries().some(s => s.data.length > 0) || this.lineSeries().some(s => s.data.length > 0)
  );

  protected readonly total = computed(() => {
    const barTotal = this.barSeries().reduce((acc, s) => acc + s.data.reduce((a, d) => a + d.value, 0), 0);
    const lineTotal = this.lineSeries().reduce((acc, s) => acc + s.data.reduce((a, d) => a + d.value, 0), 0);
    return barTotal + lineTotal;
  });

  public readonly alertMessageAndType = computed<[string, string] | undefined>(() => {
    if (this.loading()) {
      return undefined;
    }
    if (!this.hasData()) {
      return [this.noItemsMessage(), NO_ITEMS_ALERT_TYPE];
    }
    return undefined;
  });

  public readonly legendItems = computed<ChartLegendItem[]>(() => {
    if (!this.showLegend()) {
      return [];
    }
    const barItems = this.barSeries().map(s => ({ label: s.label, color: s.color }));
    const lineItems = this.lineSeries().map(s => ({ label: s.label, color: s.color }));
    return [...barItems, ...lineItems];
  });

  // ── State ────────────────────────────────────────────────────────────────────
  private svg: Selection<SVGSVGElement, unknown, null, undefined>;
  private _clipIdCounter = 0;

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
    this.svg.selectAll('*').remove();

    if (this.loading() || !this.hasData()) {
      return;
    }

    const { width: cw, height: ch } = this.getContainerDimensions();
    const extraBottom = this.xAxisLabel() ? 16 : 0;
    const extraLeft = this.yAxisLabel() ? 16 : 0;
    const effectiveLeft = this.MARGIN.left + extraLeft;

    // Reserve extra right margin when line series are present (right Y axis)
    const hasLines = this.lineSeries().some(s => s.data.length > 0);
    const extraRight = hasLines ? (this.yLineAxisLabel() ? 50 : 40) : 0;

    const width = cw - effectiveLeft - this.MARGIN.right - extraRight;
    const height = ch - this.MARGIN.top - (this.MARGIN.bottom + extraBottom);

    // Collect all unique X keys preserving order
    const allBarKeys = this.barSeries().flatMap(s => s.data.map(d => d.x));
    const allLineKeys = this.lineSeries().flatMap(s => s.data.map(d => d.x));
    const xKeys = [...new Set([...allBarKeys, ...allLineKeys])];

    // Build X-label map
    const xLabelMap = new Map<string, string>();
    this.barSeries().forEach(s => s.data.forEach(d => xLabelMap.set(d.x, d.xLabel ?? d.x)));

    // Outer X scale (one band per category)
    const x = d3scaleBand<string>().domain(xKeys).range([0, width]).paddingInner(0.35).paddingOuter(0.15);

    // ── Separate Y scales ────────────────────────────────────────────────────
    // Bar Y scale (left axis)
    const xStackTotals = new Map<string, number>();
    for (const series of this.barSeries()) {
      for (const point of series.data) {
        xStackTotals.set(point.x, (xStackTotals.get(point.x) ?? 0) + point.value);
      }
    }
    const maxBarAuto = d3max([...xStackTotals.values()]) ?? 0;
    const maxBar = this.yBarMax() ?? maxBarAuto;
    const yBar = d3scaleLinear()
      .domain([0, maxBar || 1])
      .nice(this.yBarMax() === undefined ? undefined : 0)
      .range([height, 0]);

    // Line Y scale (right axis)
    const maxLineAuto = d3max(this.lineSeries().flatMap(s => s.data.map(d => d.value))) ?? 0;
    const maxLine = this.yLineMax() ?? maxLineAuto;
    const yLine = d3scaleLinear()
      .domain([0, maxLine || 1])
      .nice(this.yLineMax() === undefined ? undefined : 0)
      .range([height, 0]);

    // ── SVG ClipPath ─────────────────────────────────────────────────────────
    // Ensures bars/lines that exceed the Y-axis maximum (yBarMax/yLineMax) are
    // visually clipped at the chart boundary without modifying the data values.
    const clipId = `combo-clip-${this._clipIdCounter++}`;
    this.svg
      .append('defs')
      .append('clipPath')
      .attr('id', clipId)
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height);

    const g = this.svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${effectiveLeft},${this.MARGIN.top})`);

    drawXYAxes(g, x, yBar, {
      xLabelMap,
      width,
      height,
      xAxisLabel: this.xAxisLabel(),
      yAxisLabel: this.yAxisLabel(),
      effectiveLeft,
    });
    styleGridLines(g);

    // ── Right Y axis for line series ─────────────────────────────────────────
    if (hasLines) {
      const lineTickValues = yLine.ticks(5).filter((t: number) => Number.isInteger(t));
      const rightAxisG = g
        .append('g')
        .attr('transform', `translate(${width},0)`)
        .call(
          d3axisRight(yLine).tickValues(lineTickValues).tickFormat(d3format('~s')).tickSize(-width) // draw grid lines across the chart
        );
      rightAxisG.selectAll('text').style('font-size', '11px').style('fill', 'var(--clr-color-neutral-600, #666)');
      // Style the line-axis grid lines with a distinct dashed color
      rightAxisG
        .selectAll('.tick line')
        .style('stroke', 'var(--clr-color-neutral-400, #b3b3b3)')
        .style('stroke-dasharray', '4 3')
        .style('stroke-opacity', '0.8');
      // Remove the default domain line so it doesn't overlap the chart
      rightAxisG.select('.domain').remove();

      if (this.yLineAxisLabel()) {
        g.append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -height / 2)
          .attr('y', width + extraRight - 4)
          .attr('text-anchor', 'middle')
          .style('font-size', '12px')
          .style('fill', 'var(--clr-color-neutral-600, #666)')
          .text(this.yLineAxisLabel());
      }
    }

    // Wrap chart content in a clipped group so elements exceeding the Y max
    // are not visible beyond the chart boundary.
    const contentGroup = g.append('g').attr('clip-path', `url(#${clipId})`);

    this.drawBars(contentGroup, x, yBar);
    this.drawLines(contentGroup, x, yLine);
  }

  private drawBars(
    g: Selection<SVGGElement, unknown, null, undefined>,
    x: ScaleBand<string>,
    y: ScaleLinear<number, number>
  ): void {
    // Running stack base (cumulative sum) per X key across all bar series
    const stackBase = new Map<string, number>();

    for (const series of this.barSeries()) {
      if (!series.data.length) {
        continue;
      }

      // Snapshot the base for each point before updating the running total
      type StackedPoint = ComboBarPoint & { base: number };
      const stacked: StackedPoint[] = series.data.map(d => ({
        ...d,
        base: stackBase.get(d.x) ?? 0,
      }));

      // Advance running totals for the next series
      for (const d of series.data) {
        stackBase.set(d.x, (stackBase.get(d.x) ?? 0) + d.value);
      }

      g.selectAll<SVGRectElement, StackedPoint>(`.bar-${series.key}`)
        .data(stacked, (d: StackedPoint) => d.x)
        .join('rect')
        .attr('class', `bar bar-${series.key}`)
        .attr('x', (d: StackedPoint) => x(d.x) ?? 0)
        .attr('y', (d: StackedPoint) => y(d.base + d.value))
        .attr('width', x.bandwidth())
        .attr('height', (d: StackedPoint) => y(d.base) - y(d.base + d.value))
        .attr('rx', 2)
        .attr('ry', 2)
        .style('fill', toChartColor(series.color))
        .style('cursor', 'pointer')
        .on('mouseover', (e: PointerEvent) => {
          d3select(e.currentTarget as SVGRectElement).attr('fill-opacity', 0.75);
        })
        .on('mouseout', (e: PointerEvent) => {
          d3select(e.currentTarget as SVGRectElement).attr('fill-opacity', 1);
        })
        .on('click', (event: PointerEvent, d: StackedPoint) => {
          event.stopPropagation();
          const rect = (event.currentTarget as SVGRectElement).getBoundingClientRect();
          const container = this.chartRef().nativeElement.getBoundingClientRect();
          this.tooltipPosition.set({
            x: rect.left - container.left + rect.width / 2,
            y: (this.tooltipOrientation() === 'top' ? rect.top : rect.bottom) - container.top,
          });
          this.selectedItem.set({
            seriesKey: series.key,
            seriesLabel: series.label,
            seriesType: 'bar',
            color: series.color,
            x: d.x,
            xLabel: d.xLabel,
            value: d.value,
            total: this.total(),
          });
        });
    }
  }

  private drawLines(
    g: Selection<SVGGElement, unknown, null, undefined>,
    x: ScaleBand<string>,
    y: ScaleLinear<number, number>
  ): void {
    // Map X key → band center position for line/dot placement
    const lineX = (key: string) => (x(key) ?? 0) + x.bandwidth() / 2;

    const lineGenerator = d3line<ComboLinePoint>()
      .x((d: ComboLinePoint) => lineX(d.x))
      .y((d: ComboLinePoint) => y(d.value))
      .curve(curveMonotoneX);

    for (const series of this.lineSeries()) {
      if (!series.data.length) {
        continue;
      }

      // Line path
      g.append('path')
        .datum(series.data)
        .attr('class', `combo-line combo-line-${series.key}`)
        .attr('fill', 'none')
        .style('stroke', toChartColor(series.color))
        .attr('stroke-width', 2.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', lineGenerator);

      // Dots
      g.selectAll<SVGCircleElement, ComboLinePoint>(`.combo-dot-${series.key}`)
        .data(series.data, (d: ComboLinePoint) => d.x)
        .join('circle')
        .attr('class', `combo-dot combo-dot-${series.key}`)
        .attr('cx', (d: ComboLinePoint) => lineX(d.x))
        .attr('cy', (d: ComboLinePoint) => y(d.value))
        .attr('r', 4)
        .style('fill', toChartColor(series.color))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', (e: PointerEvent) => {
          d3select(e.currentTarget as SVGCircleElement).attr('r', 6);
        })
        .on('mouseout', (e: PointerEvent) => {
          d3select(e.currentTarget as SVGCircleElement).attr('r', 4);
        })
        .on('click', (event: PointerEvent, d: ComboLinePoint) => {
          event.stopPropagation();
          const el = event.currentTarget as SVGCircleElement;
          const rect = el.getBoundingClientRect();
          const container = this.chartRef().nativeElement.getBoundingClientRect();
          this.tooltipPosition.set({
            x: rect.left - container.left + rect.width / 2,
            y: (this.tooltipOrientation() === 'top' ? rect.top : rect.bottom) - container.top,
          });
          this.selectedItem.set({
            seriesKey: series.key,
            seriesLabel: series.label,
            seriesType: 'line',
            color: series.color,
            x: d.x,
            value: d.value,
            total: this.total(),
          });
        });
    }
  }

  // ── Tooltip ──────────────────────────────────────────────────────────────────
}
