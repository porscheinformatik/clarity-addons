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
  group as d3group,
  max as d3max,
  scaleBand as d3scaleBand,
  ScaleBand,
  scaleLinear as d3scaleLinear,
  ScaleLinear,
  select as d3select,
  Selection,
  sum as d3sum,
} from 'd3';
import {
  NO_ITEMS_ALERT_TYPE,
  NO_ITEMS_MESSAGE,
  TOO_MANY_ITEMS_ALERT_TYPE,
  TOO_MANY_ITEMS_GROUPED_MESSAGE,
  TOO_MANY_ITEMS_MESSAGE,
} from '../constants';
import { ChartLegendItem } from '../chart-legend/chart-legend.component';
import { TextRenderer, toChartColor } from '../utils';
import { ChartBase } from '../shared/chart-base';

export interface BarChartData {
  key: string;
  label: string;
  fullLabel?: string;
  value: number;
  color?: string;
  stackKey?: string;
}

export interface BarChartValue {
  key: string[];
  label: string;
  value: number;
}

type BarChartDataPoint = BarChartData & {
  stackValue0: number;
  stackValue1: number;
  percentageOfStack: number;
};

export type BarChartLabel = { stackKey: string; label: string };

@Component({
  selector: 'clr-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BarChartComponent extends ChartBase<BarChartDataPoint> implements OnChanges {
  public readonly data = input.required<BarChartData[]>();
  public readonly stacks = input<BarChartLabel[] | undefined>(undefined);
  public readonly orientation = input.required<'horizontal' | 'vertical'>();
  public readonly tooltipOrientation = input<'top' | 'bottom'>('top');

  public readonly barSizePx = input<number>(15);
  public readonly barAreaSizePx = input<number>(40);

  public readonly tooltipPercentOfTotal = input<string>('of total');
  public readonly tooltipPercentOf = input<string>('of');

  public readonly noItemsMessage = input<string>(NO_ITEMS_MESSAGE);
  public readonly tooManyItemsMessage = input<string>(TOO_MANY_ITEMS_MESSAGE);
  public readonly tooManyItemsGroupedMessage = input<string>(TOO_MANY_ITEMS_GROUPED_MESSAGE);

  public readonly showLegend = input(true);
  public readonly showExportButton = input(false);
  public readonly exportButtonTitle = input<string>('Export');
  public readonly exportFilename = input<string>('bar-chart');

  /** Optional label rendered below the X axis. */
  public readonly xAxisLabel = input<string>('');
  /** Optional label rendered rotated to the left of the Y axis. */
  public readonly yAxisLabel = input<string>('');

  public readonly valueClicked = output<BarChartValue>();

  private readonly textRenderer = new TextRenderer();

  private readonly MARGIN = { top: 10, right: 20, bottom: 30, left: 65 };
  private static readonly HORIZONTAL_BAR_MIN_HEIGHT_PX = 25;

  protected readonly toChartColor = toChartColor;

  protected readonly total = computed(() => this.data().reduce((acc, v) => acc + v.value, 0));
  protected readonly totalByStack = computed<Record<string, number>>(() => {
    const totals: Record<string, number> = {};
    for (const d of this.slicedDataPoints()) {
      totals[d.stackKey] = (totals[d.stackKey] ?? 0) + d.value;
    }
    return totals;
  });
  protected readonly keysByStack = computed<Record<string, string[]>>(() => {
    const keys: Record<string, string[]> = {};
    for (const d of this.slicedDataPoints()) {
      if (!keys[d.stackKey]) {
        keys[d.stackKey] = [];
      }
      keys[d.stackKey].push(d.key);
    }
    return keys;
  });

  // Count the total amount of bars by either the stacKey (if stacked) or the key (if not stacked)
  protected readonly totalBarCount = computed(
    () =>
      new Set(
        this.data()
          .filter(d => d.value > 0)
          .map(d => d.stackKey ?? d.key)
      ).size
  );
  protected readonly showingBarCount = computed(
    () =>
      new Set(
        this.slicedDataPoints()
          .filter(d => d.value > 0)
          .map(d => d.stackKey)
      ).size
  );

  public readonly alertMessageAndType = computed<[string, string] | undefined>(() => {
    if (this.loading()) {
      return undefined;
    }

    if (!this.showingBarCount()) {
      return [this.noItemsMessage(), NO_ITEMS_ALERT_TYPE];
    } else if (this.totalBarCount() !== this.showingBarCount()) {
      return [
        this.stacks() ? this.tooManyItemsGroupedMessage() : this.tooManyItemsMessage(),
        TOO_MANY_ITEMS_ALERT_TYPE,
      ];
    }

    return undefined;
  });

  public readonly legendItems = computed<ChartLegendItem[]>(() => {
    if (!this.showLegend() || !this.data()?.length) {
      return [];
    }
    if (this.stacks()?.length) {
      // Stacked: one legend entry per distinct label (= each layer in the stack)
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
    }
    // Non-stacked: one entry per bar
    return this.data().map(item => ({ label: item.fullLabel ?? item.label, color: item.color }));
  });

  /** Computed values used by the tooltip to avoid inline logic in the template. */
  protected readonly tooltipKey = computed<string[] | undefined>(() => {
    const item = this.selectedItem();
    if (!item) {
      return undefined;
    }
    return this.stacks()?.length ? this.keysByStack()[item.stackKey] ?? [] : [item.key];
  });

  protected readonly tooltipLabel = computed<string | undefined>(() => {
    const item = this.selectedItem();
    if (!item) {
      return undefined;
    }
    return this.stacks()?.find(stack => stack.stackKey === item.stackKey)?.label ?? item.fullLabel ?? item.label;
  });

  protected readonly tooltipValue = computed<number | undefined>(() => {
    const item = this.selectedItem();
    if (!item) {
      return undefined;
    }
    return this.stacks()?.length ? this.totalByStack()[item.stackKey] ?? 0 : item.value;
  });

  /** Slices belonging to the currently selected stack – used by the tooltip @for loop. */
  protected readonly selectedStackSlices = computed<BarChartDataPoint[]>(() => {
    const item = this.selectedItem();
    if (!item || !this.stacks()?.length) {
      return [];
    }
    return this.slicedDataPoints().filter(d => d.stackKey === item.stackKey);
  });

  private readonly maxAmountOfItems = signal<number>(undefined);
  private readonly slicedDataPoints = signal<BarChartDataPoint[]>([]);

  private svg: Selection<SVGGElement, unknown, null, undefined>;
  private barSelection: Selection<SVGGElement, BarChartDataPoint, SVGElement, undefined> | null = null;
  private labelSelection: Selection<SVGTextElement, BarChartLabel, SVGGElement, unknown> | null = null;

  public constructor() {
    super();
  }

  public ngOnChanges(_changes: SimpleChanges): void {
    if (!this.svg) {
      return;
    }
    requestAnimationFrame(() => this.updateChart());
  }

  public override ngAfterViewInit(): void {
    this.createChart();
    super.ngAfterViewInit(); // schedules the initial requestAnimationFrame(() => updateChart())
  }

  private createChart(): void {
    const element = this.chartRef().nativeElement;
    this.svg = d3select(element);
  }

  protected updateChart(): void {
    this.svg.selectAll('*').remove();

    if (this.loading()) {
      this.slicedDataPoints.set([]);
      return;
    }
    const { width: containerWidth, height: containerHeight } = this.getContainerDimensions();
    const extraBottom = this.xAxisLabel() ? 16 : 0;
    const extraLeft = this.yAxisLabel() ? 16 : 0;
    const leftMargin = (this.orientation() === 'horizontal' ? this.MARGIN.left : 30) + extraLeft;
    const width = containerWidth - leftMargin - this.MARGIN.right;
    const height = containerHeight - this.MARGIN.top - (this.MARGIN.bottom + extraBottom);

    this.maxAmountOfItems.set(this.getMaxAmountOfItems(width, height));
    if (!this.data()?.length) {
      this.slicedDataPoints.set([]);
      return;
    }

    const stacks = this.stackItems(this.data());
    const slicedStacks = stacks.slice(0, this.maxAmountOfItems());
    const flatStacks = slicedStacks.flat();
    this.slicedDataPoints.set(flatStacks);
    const slicedStackKeys = new Set(slicedStacks.map(stack => stack[0].stackKey));
    const labels: BarChartLabel[] = this.stacks()?.length
      ? this.stacks()
          .filter(stack => slicedStackKeys.has(stack.stackKey))
          .map(stack => ({ stackKey: stack.stackKey, label: stack.label }))
      : flatStacks.map(d => ({ stackKey: d.stackKey, label: d.label }));

    const g = this.svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${leftMargin},${this.MARGIN.top})`);

    if (this.orientation() === 'vertical') {
      this.createVerticalChart(g, labels, width, height, this.xAxisLabel(), this.yAxisLabel(), leftMargin);
    } else {
      this.createHorizontalChart(g, labels, width, height, this.xAxisLabel(), this.yAxisLabel(), leftMargin);
    }

    this.styleGridLines(g);
  }

  private createVerticalChart(
    g: Selection<SVGGElement, unknown, null, undefined>,
    labels: BarChartLabel[],
    width: number,
    height: number,
    xAxisLabel: string,
    yAxisLabel: string,
    leftMargin: number
  ): void {
    const keys = labels.map(d => d.stackKey);
    const x = d3scaleBand().domain(keys).range([0, width]);

    const y = d3scaleLinear()
      .domain([0, d3max(this.slicedDataPoints(), (d: BarChartDataPoint) => d.stackValue1) || 0])
      .nice()
      .range([height, 0]);

    // X Axis
    const labelSelection = g
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3axisBottom(x))
      .selectAll<SVGTextElement, BarChartLabel>('text');
    this.labelSelection = labelSelection
      .data(labels)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .call(this.addTextCommonInfo as any)
      .style('cursor', 'pointer')
      .call(this.addTextAndTitle.bind(this), x.bandwidth())
      .call(this.addTextHoverHandlers.bind(this))
      .call(this.addTextClickHandler.bind(this));

    // Y Axis
    const tickValues = y.ticks(5).filter((tick: number) => Number.isInteger(tick));
    const yAxis = g
      .append('g')
      .call(d3axisLeft(y).tickValues(tickValues).tickSize(-width).tickFormat(d3format('~s')))
      .selectAll('text');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yAxis.call(this.addTextCommonInfo as any);

    this.createBarSelectionGroups(g);

    // Add highlight rect (behind)
    this.addVerticalBarRectangle(x, y, 2)
      .attr('class', 'bar-highlight')
      .attr('fill', '#fff')
      .style('stroke', (d: BarChartDataPoint) => toChartColor(d.color))
      .attr('stroke-width', 2)
      .style('opacity', 0); // hidden by default;

    // Add main bar rect (on top)
    this.addVerticalBarRectangle(x, y)
      .attr('class', 'bar')
      .style('fill', (d: BarChartDataPoint) => toChartColor(d.color));

    this.appendAxisLabel(g, xAxisLabel, width / 2, height + 40);
    this.appendAxisLabel(g, yAxisLabel, -height / 2, -(leftMargin - 10), 'rotate(-90)');
  }

  private createHorizontalChart(
    g: Selection<SVGGElement, unknown, null, undefined>,
    labels: BarChartLabel[],
    width: number,
    height: number,
    xAxisLabel: string,
    yAxisLabel: string,
    leftMargin: number
  ): void {
    const x = d3scaleLinear()
      .domain([0, d3max(this.slicedDataPoints(), (d: BarChartDataPoint) => d.stackValue1) || 0])
      .nice()
      .range([0, width]);

    const keys = labels.map(d => d.stackKey);
    const y = d3scaleBand().domain(keys).range([0, height]);

    // X Axis
    const tickValues = x.ticks(5).filter((tick: number) => Number.isInteger(tick));
    const xAxis = g
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3axisBottom(x).tickValues(tickValues).tickSize(-height).tickFormat(d3format('~s')))
      .selectAll('text');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xAxis.call(this.addTextCommonInfo as any);

    // Y Axis
    const labelSelection = g
      .append('g')
      .attr('transform', `translate(0,0)`)
      .call(d3axisLeft(y))
      .selectAll<SVGTextElement, BarChartData>('text');
    this.labelSelection = labelSelection
      .data(labels)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .call(this.addTextCommonInfo as any)
      .style('cursor', 'pointer')
      .call(this.addTextAndTitle.bind(this), this.MARGIN.left - 10)
      .call(this.addTextHoverHandlers.bind(this))
      .call(this.addTextClickHandler.bind(this));

    this.createBarSelectionGroups(g);

    // Add highlight rect (behind)
    this.addHorizontalBarRectangle(x, y, 2)
      .attr('class', 'bar-highlight')
      .attr('fill', '#fff')
      .style('stroke', (d: BarChartDataPoint) => toChartColor(d.color))
      .attr('stroke-width', 2)
      .style('opacity', 0); // hidden by default;

    // Add main bar rect (on top)
    this.addHorizontalBarRectangle(x, y)
      .attr('class', 'bar')
      .style('fill', (d: BarChartDataPoint) => toChartColor(d.color));

    // X axis description label (value axis at bottom)
    this.appendAxisLabel(g, xAxisLabel, width / 2, height + 40);
    // Y axis description label: centred in the extra band reserved for it
    this.appendAxisLabel(g, yAxisLabel, -height / 2, -((this.MARGIN.left + leftMargin) / 2), 'rotate(-90)');
  }

  private createBarSelectionGroups(g: Selection<SVGGElement, unknown, null, undefined>) {
    this.barSelection = g
      .selectAll<SVGRectElement, BarChartDataPoint>('.bar-group')
      .data(this.slicedDataPoints(), (d: BarChartDataPoint) => d.key)
      .join('g')
      .attr('class', 'bar-group')
      .style('cursor', 'pointer')
      .on('mouseover', (_e: PointerEvent, d: BarChartDataPoint) =>
        this.setHoverStylesByStackKey(d.stackKey, d.key, true)
      )
      .on('mouseout', (_e: PointerEvent, d: BarChartDataPoint) =>
        this.setHoverStylesByStackKey(d.stackKey, d.key, false)
      )
      .call(this.addBarClickHandler.bind(this));
  }

  private addTextCommonInfo(g: Selection<BaseType, any, BaseType, any>): void {
    g.style('font-size', '11px').style('fill', 'var(--clr-color-neutral-600, #666)');
  }

  private addTextHoverHandlers(g: Selection<BaseType, BarChartData, SVGGElement, undefined>): void {
    g.on('mouseover', (_e: PointerEvent, d: BarChartData) => this.setHoverStylesByStackKey(d.stackKey, undefined, true)) //
      .on('mouseout', (_e: PointerEvent, d: BarChartData) =>
        this.setHoverStylesByStackKey(d.stackKey, undefined, false)
      );
  }

  private setHoverStylesByStackKey(stackKey: string, key: string | undefined, isHover: boolean): void {
    // When hovering a stack section, we also need to highlight the label, but not the other sections of the same stack.
    // But when hovering a label, we need to highlight all sections of the stack.
    const barGroup = this.barSelection.filter(
      (d: BarChartDataPoint) => d.stackKey === stackKey && (key == null || d.key === key)
    );
    barGroup.select('.bar').style('mix-blend-mode', isHover ? 'multiply' : 'unset');
    barGroup.select('.bar-highlight').style('opacity', isHover ? '1' : '0');

    this.labelSelection
      .filter((d: BarChartLabel) => d.stackKey === stackKey)
      .style('font-weight', isHover ? 'bold' : 'unset');
  }

  private addBarClickHandler(g: Selection<SVGRectElement, BarChartDataPoint, SVGElement, undefined>) {
    g.on('click', (event: PointerEvent, d: BarChartDataPoint) => {
      event.stopPropagation();
      this.openTooltipByKey(d.key);
    });
  }

  private addTextClickHandler(g: Selection<SVGTextElement, BarChartLabel, SVGElement, undefined>) {
    // no click handler for labels in stacked charts
    if (this.stacks()?.length) {
      return;
    }

    g.on('click', (event: PointerEvent, d: BarChartLabel) => {
      event.stopPropagation();
      // Note: In non-stacked charts, the stackKey is equal to the key, so this works - but the logic is confusing [VU3REQ-4790]
      this.openTooltipByKey(d.stackKey);
    });
  }

  private openTooltipByKey(key: string): void {
    const index = this.slicedDataPoints().findIndex(item => item.key === key);
    const rect = this.barSelection
      .filter((_d: BarChartDataPoint, i: number) => i === index)
      // we actually want the bar, not the group (because if value is 0, then the group is not positioned correctly
      .node()
      .children[0].getBoundingClientRect();
    const container = this.chartRef().nativeElement.getBoundingClientRect();

    this.tooltipPosition.set({
      x: rect.left - container.left + rect.width / 2,
      y: (this.tooltipOrientation() === 'top' ? rect.top : rect.bottom) - container.top,
    });
    this.selectedItem.set(this.slicedDataPoints()[index]);
  }

  private addTextAndTitle(g: Selection<SVGTextElement, BarChartLabel, SVGElement, undefined>, availableWidth: number) {
    g.each((d: BarChartLabel, index: number, nodes: SVGTextElement[] | ArrayLike<SVGTextElement>) => {
      const target = d3select(nodes[index]);
      target.text(
        this.textRenderer.render(d.label, 15, availableWidth, target.style('font-size'), target.style('font-family'))
      );
      target.append('title').text(d.label);
    });
  }

  private styleGridLines(g: Selection<SVGGElement, unknown, null, undefined>) {
    g.selectAll('.tick line').style('stroke', 'var(--clr-color-neutral-200, #e8e8e8)');
  }

  private addVerticalBarRectangle(
    x: ScaleBand<string>,
    y: ScaleLinear<number, number>,
    extraSize: number = 0
  ): Selection<SVGRectElement, BarChartDataPoint, SVGElement, undefined> {
    return this.barSelection
      .append('rect')
      .attr('x', (d: BarChartDataPoint) => {
        return (x(d.stackKey) || 0) + (x.bandwidth() - this.barSizePx()) / 2 + extraSize;
      })
      .attr('y', (d: BarChartDataPoint) => y(d.stackValue1))
      .attr('width', this.barSizePx() - 2 * extraSize)
      .attr('height', (d: BarChartDataPoint) => y(d.stackValue0) - y(d.stackValue1))
      .attr('rx', 1)
      .attr('ry', 1);
  }

  private addHorizontalBarRectangle(
    x: ScaleLinear<number, number>,
    y: ScaleBand<string>,
    extraSize: number = 0
  ): Selection<SVGRectElement, BarChartDataPoint, SVGElement, undefined> {
    return this.barSelection
      .append('rect')
      .attr('x', (d: BarChartDataPoint) => x(d.stackValue0))
      .attr('y', (d: BarChartDataPoint) => {
        return (y(d.stackKey) || 0) + (y.bandwidth() - this.barSizePx()) / 2 + extraSize;
      })
      .attr('width', (d: BarChartDataPoint) => x(d.stackValue1) - x(d.stackValue0))
      .attr('height', this.barSizePx() - 2 * extraSize)
      .attr('rx', 1)
      .attr('ry', 1);
  }

  /** Appends a shared-style axis description label to the chart group. */
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
      .style('fill', 'var(--clr-color-neutral-600, #666)')
      .text(text)
      .attr('x', x)
      .attr('y', y);
    if (transform) {
      el.attr('transform', transform);
    }
  }

  private stackItems(data: BarChartData[]): BarChartDataPoint[][] {
    let groups: [string, BarChartData[]][];
    if (this.stacks()?.length) {
      groups = Array.from(d3group(data, (d: BarChartData) => d.stackKey ?? d.key));
    } else {
      groups = data.map(item => [item.key, [item]]);
    }

    return this.mapItems(groups);
  }

  private mapItems(groups: [string, BarChartData[]][]): BarChartDataPoint[][] {
    const result: BarChartDataPoint[][] = [];
    for (const [_, items] of groups) {
      let stackValue = 0;
      const stackSum = d3sum(items, (d: BarChartData) => d.value);
      result.push(
        items.map(item => {
          const stackValue0 = stackValue;
          stackValue += item.value;
          return {
            ...item,
            stackValue0,
            stackValue1: stackValue,
            stackKey: item.stackKey ?? item.key,
            percentageOfStack: stackSum === 0 ? 0 : (100 * item.value) / stackSum,
          };
        })
      );
    }

    return result;
  }

  private getMaxAmountOfItems(width: number, height: number) {
    if (this.orientation() === 'vertical') {
      return Math.floor(width / this.barAreaSizePx());
    }
    return Math.floor(height / BarChartComponent.HORIZONTAL_BAR_MIN_HEIGHT_PX);
  }
}
