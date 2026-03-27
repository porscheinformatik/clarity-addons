import { ChangeDetectionStrategy, Component, computed, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { Arc, arc as d3arc, format as d3format, pie as d3pie, PieArcDatum, select as d3select, Selection } from 'd3';
import { NO_ITEMS_ALERT_TYPE, NO_ITEMS_MESSAGE } from '../constants';
import { toChartColor } from '../utils';
import { ChartLegendItem } from '../chart-legend/chart-legend.component';
import { ChartBase } from '../shared/chart-base';

export interface PieChartData {
  key: string;
  label: string;
  fullLabel?: string;
  value: number;
  color: string;
}

export interface PieChartValue {
  key: string;
  label: string;
  value: number;
}

@Component({
  selector: 'clr-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartComponent extends ChartBase<PieChartData> implements OnChanges {
  public readonly data = input.required<PieChartData[]>();
  public readonly donut = input(true);
  public readonly showLegend = input(true);
  public readonly showExportButton = input(false);
  public readonly exportFilename = input<string>('pie-chart');
  public readonly tooltipOrientation = input<'top' | 'bottom'>('top');

  public readonly noItemsMessage = input<string>(NO_ITEMS_MESSAGE);
  public readonly tooltipPercentOfTotal = input<string>('of total');

  public readonly valueClicked = output<PieChartValue>();

  protected readonly hasData = computed(() => this.data()?.some(d => d.value > 0));
  protected readonly total = computed(() => this.data()?.reduce((acc, d) => acc + d.value, 0) ?? 0);

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
    return (this.data() ?? []).filter(d => d.value > 0).map(d => ({ label: d.fullLabel ?? d.label, color: d.color }));
  });

  private svg: Selection<SVGSVGElement, unknown, null, undefined>;
  private arcGen: Arc<any, PieArcDatum<PieChartData>>;

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

    const { width, height } = this.getContainerDimensions();
    const radius = Math.min(width, height) / 2;
    const innerRadius = this.donut() ? radius * 0.55 : 0;
    const outerRadius = radius * 0.9;

    this.arcGen = d3arc<PieArcDatum<PieChartData>>().innerRadius(innerRadius).outerRadius(outerRadius);

    const hoverArc = d3arc<PieArcDatum<PieChartData>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius * 1.06);

    const pieGen = d3pie<PieChartData>()
      .value(d => d.value)
      .sort(null);

    const arcs = pieGen(this.data().filter(d => d.value > 0));

    const g = this.svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Slices
    g.selectAll<SVGPathElement, PieArcDatum<PieChartData>>('.slice')
      .data(arcs, (d: PieArcDatum<PieChartData>) => d.data.key)
      .join('path')
      .attr('class', 'slice')
      .attr('d', this.arcGen)
      .style('fill', (d: PieArcDatum<PieChartData>) => toChartColor(d.data.color))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', (e: PointerEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        d3select(e.currentTarget as SVGPathElement).attr('d', hoverArc as any);
      })
      .on('mouseout', (e: PointerEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        d3select(e.currentTarget as SVGPathElement).attr('d', this.arcGen as any);
      })
      .on('click', (event: PointerEvent, d: PieArcDatum<PieChartData>) => {
        event.stopPropagation();
        this.openTooltip(d, width, height);
      });

    // Slice labels – only show when the slice angle is large enough to fit text
    const MIN_ANGLE = 0.4; // ~23°
    const labelRadius = this.donut() ? (innerRadius + outerRadius) / 2 : outerRadius * 0.65;
    const labelArc = d3arc<PieArcDatum<PieChartData>>().innerRadius(labelRadius).outerRadius(labelRadius);
    const total = this.total();

    const labelGroups = g
      .selectAll<SVGGElement, PieArcDatum<PieChartData>>('.slice-label')
      .data(
        arcs.filter((d: PieArcDatum<PieChartData>) => d.endAngle - d.startAngle >= MIN_ANGLE),
        (d: PieArcDatum<PieChartData>) => d.data.key
      )
      .join('g')
      .attr('class', 'slice-label')
      .attr('transform', (d: PieArcDatum<PieChartData>) => {
        const [x, y] = labelArc.centroid(d);
        return `translate(${x},${y})`;
      })
      .style('pointer-events', 'none');

    labelGroups
      .append('text')
      .attr('class', 'label-value')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.3em')
      .style('font-size', '11px')
      .style('font-weight', '600')
      .style('fill', '#fff')
      .style('pointer-events', 'none')
      .text((d: PieArcDatum<PieChartData>) => d3format('~s')(d.data.value));

    labelGroups
      .append('text')
      .attr('class', 'label-percent')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.9em')
      .style('font-size', '10px')
      .style('fill', 'rgba(255, 255, 255, 0.9)')
      .style('pointer-events', 'none')
      .text((d: PieArcDatum<PieChartData>) => `${((100 * d.data.value) / total).toFixed(1)}%`);

    // Center label (donut only)
    if (this.donut()) {
      g.append('text')
        .attr('class', 'center-label')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.1em')
        .style('font-size', '1.4rem')
        .style('font-weight', '600')
        .style('fill', 'var(--clr-color-neutral-900, #21333b)')
        .text(d3format('~s')(this.total()));

      g.append('text')
        .attr('class', 'center-sublabel')
        .attr('text-anchor', 'middle')
        .attr('dy', '1.2em')
        .style('font-size', '0.65rem')
        .style('fill', 'var(--clr-color-neutral-600, #666)')
        .style('text-transform', 'uppercase')
        .style('letter-spacing', '0.05em')
        .text('Total');
    }
  }

  private openTooltip(d: PieArcDatum<PieChartData>, width: number, height: number): void {
    const [cx, cy] = this.arcGen.centroid(d);
    this.tooltipPosition.set({
      x: width / 2 + cx,
      y: height / 2 + cy,
    });
    this.selectedItem.set(d.data);
  }
}
