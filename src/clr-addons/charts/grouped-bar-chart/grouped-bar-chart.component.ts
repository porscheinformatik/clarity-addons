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
import {
  axisBottom as d3axisBottom,
  axisLeft as d3axisLeft,
  BaseType,
  format as d3format,
  max as d3max,
  scaleBand as d3scaleBand,
  ScaleBand,
  scaleLinear as d3scaleLinear,
  ScaleLinear,
  select as d3select,
  Selection,
} from 'd3';
import { ChartLegendItem } from '../chart-legend/chart-legend.component';
import {
  ALL_ITEMS_ZERO_MESSAGE,
  NO_ITEMS_ALERT_TYPE,
  NO_ITEMS_MESSAGE,
  TOO_MANY_ITEMS_ALERT_TYPE,
  TOO_MANY_ITEMS_GROUPED_MESSAGE,
} from '../constants';
import { ChartBase } from '../shared/chart-base';
import { TextRenderer, toChartColor } from '../utils';

export interface GroupedBarChartData {
  key: string;
  label: string;
  fullLabel?: string;
  groupKey: string;
  groupLabel?: string;
  value: number;
  color?: string;
}

export interface GroupedBarChartGroup {
  key: string;
  label: string;
}

export interface GroupedBarChartValue {
  key: string;
  label: string;
  groupKey: string;
  groupLabel: string;
  value: number;
}

type GroupedBarChartDataPoint = GroupedBarChartData & {
  groupLabel: string;
};

@Component({
  selector: 'clr-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GroupedBarChartComponent extends ChartBase<GroupedBarChartDataPoint> implements OnChanges {
  public readonly data = input.required<GroupedBarChartData[]>();
  public readonly groups = input<GroupedBarChartGroup[] | undefined>(undefined);
  public readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  public readonly tooltipOrientation = input<'top' | 'bottom'>('top');

  public readonly barSizePx = input<number>(12);
  public readonly groupAreaSizePx = input<number>(60);

  public readonly noItemsMessage = input<string>(NO_ITEMS_MESSAGE);
  public readonly tooManyItemsGroupedMessage = input<string>(TOO_MANY_ITEMS_GROUPED_MESSAGE);
  public readonly allValuesZeroMessage = input<string>(ALL_ITEMS_ZERO_MESSAGE);

  public readonly showLegend = input(true);
  public readonly showExportButton = input(false);
  public readonly exportButtonTitle = input<string>('Export');
  public readonly exportFilename = input<string>('grouped-bar-chart');

  /** Optional label rendered below the X axis. */
  public readonly xAxisLabel = input<string>('');
  /** Optional label rendered rotated to the left of the Y axis. */
  public readonly yAxisLabel = input<string>('');

  public readonly valueClicked = output<GroupedBarChartValue>();

  protected readonly allValuesZero = computed(() => !!this.data()?.length && this.data().every(d => d.value === 0));
  protected readonly toChartColor = toChartColor;
  protected readonly tooltipLabel = computed(() => this.selectedItem()?.fullLabel ?? this.selectedItem()?.label);

  public readonly legendItems = computed<ChartLegendItem[]>(() => {
    if (!this.showLegend() || !this.data()?.length) {
      return [];
    }

    const seen = new Set<string>();
    const items: ChartLegendItem[] = [];
    for (const item of this.data()) {
      const label = item.fullLabel ?? item.label;
      if (!seen.has(label)) {
        seen.add(label);
        items.push({ label, color: item.color });
      }
    }
    return items;
  });

  public readonly alertMessageAndType = computed<[string, string] | undefined>(() => {
    if (this.loading()) {
      return undefined;
    }

    if (this.allValuesZero()) {
      return [this.allValuesZeroMessage(), NO_ITEMS_ALERT_TYPE];
    }

    if (!this.showingGroupCount()) {
      return [this.noItemsMessage(), NO_ITEMS_ALERT_TYPE];
    }

    if (this.totalGroupCount() !== this.showingGroupCount()) {
      const message = this.tooManyItemsGroupedMessage()
        .replace('{{totalAmount}}', String(this.totalGroupCount()))
        .replace('{{showingAmount}}', String(this.showingGroupCount()));
      return [message, TOO_MANY_ITEMS_ALERT_TYPE];
    }

    return undefined;
  });

  private readonly textRenderer = new TextRenderer();
  private readonly MARGIN = { top: 10, right: 20, bottom: 30, left: 80 };

  private readonly totalGroupCount = signal<number>(0);
  private readonly showingGroupCount = signal<number>(0);
  private readonly slicedDataPoints = signal<GroupedBarChartDataPoint[]>([]);

  private svg: Selection<SVGGElement, unknown, null, undefined>;
  private barSelection: Selection<SVGGElement, GroupedBarChartDataPoint, SVGElement, undefined> | null = null;
  private labelSelection: Selection<SVGTextElement, GroupedBarChartGroup, BaseType, unknown> | null = null;

  public ngOnChanges(_changes: SimpleChanges): void {
    if (!this.svg) {
      return;
    }
    requestAnimationFrame(() => this.updateChart());
  }

  public override ngAfterViewInit(): void {
    this.createChart();
    super.ngAfterViewInit();
  }

  private createChart(): void {
    this.svg = d3select(this.chartRef().nativeElement);
  }

  protected updateChart(): void {
    this.svg.selectAll('*').remove();

    if (this.loading()) {
      this.resetVisibleState();
      return;
    }

    const normalizedGroups = this.getNormalizedGroups();
    this.totalGroupCount.set(normalizedGroups.length);

    if (!this.data()?.length || !normalizedGroups.length) {
      this.resetVisibleState();
      return;
    }

    const { width: containerWidth, height: containerHeight } = this.getContainerDimensions();
    const extraBottom = this.xAxisLabel() ? 16 : 0;
    const extraLeft = this.yAxisLabel() ? 16 : 0;
    const leftMargin = (this.orientation() === 'horizontal' ? this.MARGIN.left : 30) + extraLeft;
    const width = containerWidth - leftMargin - this.MARGIN.right;
    const height = containerHeight - this.MARGIN.top - (this.MARGIN.bottom + extraBottom);

    if (width <= 0 || height <= 0) {
      this.resetVisibleState();
      return;
    }

    const visibleGroups = normalizedGroups.slice(0, this.getMaxAmountOfGroups(width, height));
    const visibleGroupKeys = new Set(visibleGroups.map(group => group.key));
    const dataPoints = this.data()
      .filter(item => visibleGroupKeys.has(item.groupKey))
      .map(item => ({
        ...item,
        groupLabel: visibleGroups.find(group => group.key === item.groupKey)?.label ?? item.groupLabel ?? item.groupKey,
      }));

    this.showingGroupCount.set(visibleGroups.length);
    this.slicedDataPoints.set(dataPoints);

    const g = this.svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${leftMargin},${this.MARGIN.top})`);

    if (this.orientation() === 'vertical') {
      this.createVerticalChart(g, visibleGroups, width, height, this.xAxisLabel(), this.yAxisLabel(), leftMargin);
    } else {
      this.createHorizontalChart(g, visibleGroups, width, height, this.xAxisLabel(), this.yAxisLabel(), leftMargin);
    }
    this.styleGridLines(g);
  }

  private createVerticalChart(
    g: Selection<SVGGElement, unknown, null, undefined>,
    groups: GroupedBarChartGroup[],
    width: number,
    height: number,
    xAxisLabel: string,
    yAxisLabel: string,
    leftMargin: number
  ): void {
    const x0 = d3scaleBand()
      .domain(groups.map(group => group.key))
      .range([0, width])
      .paddingInner(0.2);

    const x1 = d3scaleBand().domain(this.seriesLabels()).range([0, x0.bandwidth()]).padding(0.05);

    const y = d3scaleLinear()
      .domain([0, d3max(this.slicedDataPoints(), (d: GroupedBarChartDataPoint) => d.value) || 0])
      .nice()
      .range([height, 0]);

    const xAxis = g
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3axisBottom(x0).tickFormat(groupKey => groups.find(group => group.key === groupKey)?.label ?? groupKey));
    this.labelSelection = xAxis
      .selectAll<SVGTextElement, GroupedBarChartGroup>('text')
      .data(groups)
      .call(this.addTextCommonInfo as any)
      .call(this.addTextAndTitle.bind(this), x0.bandwidth());

    const tickValues = y.ticks(5).filter((tick: number) => Number.isInteger(tick));
    const yAxis = g
      .append('g')
      .call(d3axisLeft(y).tickValues(tickValues).tickSize(-width).tickFormat(d3format('~s')))
      .selectAll('text');
    yAxis.call(this.addTextCommonInfo as any);

    this.createBarSelectionGroups(g);
    this.addVerticalBarRectangle(x0, x1, y, 2)
      .attr('class', 'bar-highlight')
      .attr('fill', '#fff')
      .style('stroke', (d: GroupedBarChartDataPoint) => toChartColor(d.color))
      .attr('stroke-width', 2)
      .style('opacity', 0);

    this.addVerticalBarRectangle(x0, x1, y)
      .attr('class', 'bar')
      .style('fill', (d: GroupedBarChartDataPoint) => toChartColor(d.color));

    this.appendAxisLabel(g, xAxisLabel, width / 2, height + 40);
    this.appendAxisLabel(g, yAxisLabel, -height / 2, -(leftMargin - 10), 'rotate(-90)');
  }

  private createHorizontalChart(
    g: Selection<SVGGElement, unknown, null, undefined>,
    groups: GroupedBarChartGroup[],
    width: number,
    height: number,
    xAxisLabel: string,
    yAxisLabel: string,
    leftMargin: number
  ): void {
    const x = d3scaleLinear()
      .domain([0, d3max(this.slicedDataPoints(), (d: GroupedBarChartDataPoint) => d.value) || 0])
      .nice()
      .range([0, width]);

    const y0 = d3scaleBand()
      .domain(groups.map(group => group.key))
      .range([0, height])
      .paddingInner(0.2);

    const y1 = d3scaleBand().domain(this.seriesLabels()).range([0, y0.bandwidth()]).padding(0.05);

    const tickValues = x.ticks(5).filter((tick: number) => Number.isInteger(tick));
    const xAxis = g
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3axisBottom(x).tickValues(tickValues).tickSize(-height).tickFormat(d3format('~s')))
      .selectAll('text');
    xAxis.call(this.addTextCommonInfo as any);

    const yAxis = g
      .append('g')
      .call(d3axisLeft(y0).tickFormat(groupKey => groups.find(group => group.key === groupKey)?.label ?? groupKey));
    this.labelSelection = yAxis
      .selectAll<SVGTextElement, GroupedBarChartGroup>('text')
      .data(groups)
      .call(this.addTextCommonInfo as any)
      .call(this.addTextAndTitle.bind(this), this.MARGIN.left - 10);

    this.createBarSelectionGroups(g);
    this.addHorizontalBarRectangle(x, y0, y1, 2)
      .attr('class', 'bar-highlight')
      .attr('fill', '#fff')
      .style('stroke', (d: GroupedBarChartDataPoint) => toChartColor(d.color))
      .attr('stroke-width', 2)
      .style('opacity', 0);

    this.addHorizontalBarRectangle(x, y0, y1)
      .attr('class', 'bar')
      .style('fill', (d: GroupedBarChartDataPoint) => toChartColor(d.color));

    this.appendAxisLabel(g, xAxisLabel, width / 2, height + 40);
    this.appendAxisLabel(g, yAxisLabel, -height / 2, -((this.MARGIN.left + leftMargin) / 2), 'rotate(-90)');
  }

  private createBarSelectionGroups(g: Selection<SVGGElement, unknown, null, undefined>): void {
    this.barSelection = g
      .selectAll<SVGGElement, GroupedBarChartDataPoint>('.bar-group')
      .data(this.slicedDataPoints(), (d: GroupedBarChartDataPoint) => d.key)
      .join('g')
      .attr('class', 'bar-group')
      .style('cursor', 'pointer')
      .on('mouseover', (_event: PointerEvent, d: GroupedBarChartDataPoint) => this.setHoverStyles(d, true))
      .on('mouseout', (_event: PointerEvent, d: GroupedBarChartDataPoint) => this.setHoverStyles(d, false))
      .call(this.addBarClickHandler.bind(this));
  }

  private addHorizontalBarRectangle(
    x: ScaleLinear<number, number>,
    y0: ScaleBand<string>,
    y1: ScaleBand<string>,
    outlineSize: number = 0
  ): Selection<SVGRectElement, GroupedBarChartDataPoint, SVGElement, undefined> {
    const barHeight = Math.max(0, Math.min(this.barSizePx(), y1.bandwidth()));
    const yOffset = (y1.bandwidth() - barHeight) / 2;
    return this.barSelection
      .append('rect')
      .attr('x', -outlineSize)
      .attr('y', (d: GroupedBarChartDataPoint) => {
        return (y0(d.groupKey) || 0) + (y1(d.fullLabel ?? d.label) || 0) + yOffset - outlineSize;
      })
      .attr('width', (d: GroupedBarChartDataPoint) => x(d.value) + 2 * outlineSize)
      .attr('height', barHeight + 2 * outlineSize)
      .attr('rx', 1)
      .attr('ry', 1);
  }

  private addVerticalBarRectangle(
    x0: ScaleBand<string>,
    x1: ScaleBand<string>,
    y: ScaleLinear<number, number>,
    outlineSize: number = 0
  ): Selection<SVGRectElement, GroupedBarChartDataPoint, SVGElement, undefined> {
    const barWidth = Math.max(0, Math.min(this.barSizePx(), x1.bandwidth()));
    const xOffset = (x1.bandwidth() - barWidth) / 2;
    return this.barSelection
      .append('rect')
      .attr('x', (d: GroupedBarChartDataPoint) => {
        return (x0(d.groupKey) || 0) + (x1(d.fullLabel ?? d.label) || 0) + xOffset - outlineSize;
      })
      .attr('y', (d: GroupedBarChartDataPoint) => y(d.value) - outlineSize)
      .attr('width', barWidth + 2 * outlineSize)
      .attr('height', (d: GroupedBarChartDataPoint) => y(0) - y(d.value) + 2 * outlineSize)
      .attr('rx', 1)
      .attr('ry', 1);
  }

  protected emitSelectedValue(): void {
    const item = this.selectedItem();
    if (!item) {
      return;
    }

    this.valueClicked.emit({
      key: item.key,
      label: item.fullLabel ?? item.label,
      groupKey: item.groupKey,
      groupLabel: item.groupLabel,
      value: item.value,
    });
  }

  private addBarClickHandler(g: Selection<SVGRectElement, GroupedBarChartDataPoint, SVGElement, undefined>): void {
    g.on('click', (event: PointerEvent, d: GroupedBarChartDataPoint) => {
      event.stopPropagation();
      this.openTooltip(d.key);
    });
  }

  private openTooltip(key: string): void {
    const index = this.slicedDataPoints().findIndex(item => item.key === key);
    const rect = this.barSelection
      .filter((_d: GroupedBarChartDataPoint, i: number) => i === index)
      .node()
      .children[0].getBoundingClientRect();
    const container = this.chartRef().nativeElement.getBoundingClientRect();

    this.tooltipPosition.set({
      x: rect.left - container.left + rect.width / 2,
      y: (this.tooltipOrientation() === 'top' ? rect.top : rect.bottom) - container.top,
    });
    this.selectedItem.set(this.slicedDataPoints()[index]);
  }

  private setHoverStyles(d: GroupedBarChartDataPoint, isHover: boolean): void {
    const barGroup = this.barSelection.filter((item: GroupedBarChartDataPoint) => item.key === d.key);
    barGroup.select('.bar').style('mix-blend-mode', isHover ? 'multiply' : 'unset');
    barGroup.select('.bar-highlight').style('opacity', isHover ? '1' : '0');

    this.labelSelection
      .filter((group: GroupedBarChartGroup) => group.key === d.groupKey)
      .style('font-weight', isHover ? 'bold' : 'unset');
  }

  private addTextCommonInfo(g: Selection<BaseType, any, BaseType, any>): void {
    g.style('font-size', '11px').style('fill', 'var(--cds-global-color-construction-400, #666)');
  }

  private addTextAndTitle(
    g: Selection<SVGTextElement, GroupedBarChartGroup, SVGElement, undefined>,
    availableWidth: number
  ): void {
    g.each((d: GroupedBarChartGroup, index: number, nodes: SVGTextElement[] | ArrayLike<SVGTextElement>) => {
      const target = d3select(nodes[index]);
      target.text(
        this.textRenderer.render(d.label, 15, availableWidth, target.style('font-size'), target.style('font-family'))
      );
      target.append('title').text(d.label);
    });
  }

  private appendAxisLabel(
    g: Selection<SVGGElement, unknown, null, undefined>,
    text: string,
    x: number,
    y: number,
    transform?: string
  ): void {
    if (!text) {
      return;
    }
    const el = g
      .append('text')
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'var(--cds-global-color-construction-400, #666)')
      .text(text)
      .attr('x', x)
      .attr('y', y);
    if (transform) {
      el.attr('transform', transform);
    }
  }

  private styleGridLines(g: Selection<SVGGElement, unknown, null, undefined>): void {
    g.selectAll('.tick line').style('stroke', 'var(--cds-global-color-gray-200, #e8e8e8)');
  }

  private getNormalizedGroups(): GroupedBarChartGroup[] {
    if (this.groups()?.length) {
      return this.groups();
    }

    const seen = new Set<string>();
    const groups: GroupedBarChartGroup[] = [];
    for (const item of this.data() ?? []) {
      if (!seen.has(item.groupKey)) {
        seen.add(item.groupKey);
        groups.push({ key: item.groupKey, label: item.groupLabel ?? item.groupKey });
      }
    }
    return groups;
  }

  private seriesLabels(): string[] {
    const seen = new Set<string>();
    const labels: string[] = [];
    for (const item of this.slicedDataPoints()) {
      const label = item.fullLabel ?? item.label;
      if (!seen.has(label)) {
        seen.add(label);
        labels.push(label);
      }
    }
    return labels;
  }

  private getMaxAmountOfGroups(width: number, height: number): number {
    if (this.orientation() === 'vertical') {
      return Math.floor(width / this.groupAreaSizePx());
    }
    return Math.floor(height / this.groupAreaSizePx());
  }

  private resetVisibleState(): void {
    this.showingGroupCount.set(0);
    this.slicedDataPoints.set([]);
  }
}
