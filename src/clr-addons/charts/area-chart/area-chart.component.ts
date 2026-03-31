import { ChangeDetectionStrategy, Component, computed, input, OnChanges, output, SimpleChanges } from '@angular/core';
import {
  area as d3area,
  curveMonotoneX,
  line as d3line,
  max as d3max,
  scaleLinear as d3scaleLinear,
  ScaleLinear,
  scalePoint as d3scalePoint,
  ScalePoint,
  select as d3select,
  Selection,
} from 'd3';
import { NO_ITEMS_ALERT_TYPE, NO_ITEMS_MESSAGE } from '../constants';
import { toChartColor } from '../utils';
import { ChartLegendItem } from '../chart-legend/chart-legend.component';
import { XYChartPoint, XYChartSeries, XYChartValue } from '../shared/xy-chart.types';
import { renderDots } from '../shared/d3-dots';
import { drawXYAxes, styleGridLines } from '../shared/d3-chart-axes';
import { ChartBase } from '../shared/chart-base';

// Re-exported as chart-specific aliases for backward compatibility
export type {
  XYChartPoint as AreaChartPoint,
  XYChartSeries as AreaChartSeries,
  XYChartValue as AreaChartValue,
} from '../shared/xy-chart.types';

type AreaChartSelectedPoint = XYChartPoint & {
  seriesKey: string;
  seriesLabel: string;
  color: string;
};

@Component({
  selector: 'clr-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaChartComponent extends ChartBase<AreaChartSelectedPoint> implements OnChanges {
  public readonly series = input.required<XYChartSeries[]>();
  public readonly tooltipOrientation = input<'top' | 'bottom'>('top');
  public readonly showLegend = input(true);
  public readonly showExportButton = input(false);
  public readonly exportButtonTitle = input<string>('Export');
  public readonly exportFilename = input<string>('area-chart');
  /** Area fill opacity (0–1). Default: 0.2. */
  public readonly areaOpacity = input<number>(0.2);

  public readonly noItemsMessage = input<string>(NO_ITEMS_MESSAGE);
  public readonly tooltipPercentOfTotal = input<string>('of total');

  /** Optional label rendered below the X axis. */
  public readonly xAxisLabel = input<string>('');
  /** Optional label rendered rotated to the left of the Y axis. */
  public readonly yAxisLabel = input<string>('');

  public readonly valueClicked = output<XYChartValue>();

  private readonly MARGIN = { top: 20, right: 30, bottom: 30, left: 65 };

  protected readonly hasData = computed(() => this.series().some(s => s.data.length > 0));

  protected readonly total = computed(() =>
    this.series().reduce((acc, s) => acc + s.data.reduce((a: number, d) => a + d.value, 0), 0)
  );

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
    return this.series().map(s => ({ label: s.label, color: s.color }));
  });

  private svg: Selection<SVGSVGElement, unknown, null, undefined>;

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

  protected updateChart(): void {
    this.svg.selectAll('*').remove();

    if (this.loading() || !this.hasData()) {
      return;
    }

    const { width: containerWidth, height: containerHeight } = this.getContainerDimensions();
    const extraBottom = this.xAxisLabel() ? 16 : 0;
    const extraLeft = this.yAxisLabel() ? 16 : 0;
    const effectiveLeft = this.MARGIN.left + extraLeft;
    const width = containerWidth - effectiveLeft - this.MARGIN.right;
    const height = containerHeight - this.MARGIN.top - (this.MARGIN.bottom + extraBottom);

    const xKeys = [...new Set(this.series().flatMap(s => s.data.map(d => d.x)))];
    const xLabelMap = new Map<string, string>();
    this.series().forEach(s => s.data.forEach(d => xLabelMap.set(d.x, d.xLabel ?? d.x)));

    const x = d3scalePoint<string>().domain(xKeys).range([0, width]).padding(0.5);
    const maxY = d3max(this.series().flatMap(s => s.data.map(d => d.value))) ?? 0;
    const y = d3scaleLinear().domain([0, maxY]).nice().range([height, 0]);

    const g = this.svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${effectiveLeft},${this.MARGIN.top})`);

    drawXYAxes(g, x, y, {
      xLabelMap,
      width,
      height,
      xAxisLabel: this.xAxisLabel(),
      yAxisLabel: this.yAxisLabel(),
      effectiveLeft,
    });
    styleGridLines(g);
    this.drawSeries(g, x, y, height);
  }

  private drawSeries(
    g: Selection<SVGGElement, unknown, null, undefined>,
    x: ScalePoint<string>,
    y: ScaleLinear<number, number>,
    height: number
  ): void {
    const areaGenerator = d3area<XYChartPoint>()
      .x((d: XYChartPoint) => x(d.x) ?? 0)
      .y0(height)
      .y1((d: XYChartPoint) => y(d.value))
      .curve(curveMonotoneX);

    const lineGenerator = d3line<XYChartPoint>()
      .x((d: XYChartPoint) => x(d.x) ?? 0)
      .y((d: XYChartPoint) => y(d.value))
      .curve(curveMonotoneX);

    // Draw areas first (behind lines)
    for (const series of this.series()) {
      if (!series.data.length) {
        continue;
      }
      g.append('path')
        .datum(series.data)
        .attr('class', `area area-${series.key}`)
        .style('fill', toChartColor(series.color))
        .attr('fill-opacity', this.areaOpacity())
        .attr('stroke', 'none')
        .attr('d', areaGenerator);
    }

    // Draw lines and dots on top
    for (const series of this.series()) {
      if (!series.data.length) {
        continue;
      }

      g.append('path')
        .datum(series.data)
        .attr('class', `line line-${series.key}`)
        .attr('fill', 'none')
        .style('stroke', toChartColor(series.color))
        .attr('stroke-width', 2)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', lineGenerator);

      renderDots(g, series, x, y, (el, point, s) => this.openTooltip(el, point, s));
    }
  }

  private openTooltip(el: SVGCircleElement, point: XYChartPoint, series: XYChartSeries): void {
    const rect = el.getBoundingClientRect();
    const container = this.chartRef().nativeElement.getBoundingClientRect();
    this.tooltipPosition.set({
      x: rect.left - container.left + rect.width / 2,
      y: (this.tooltipOrientation() === 'top' ? rect.top : rect.bottom) - container.top,
    });
    this.selectedItem.set({ ...point, seriesKey: series.key, seriesLabel: series.label, color: series.color });
  }
}
