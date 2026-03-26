/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ScaleLinear, ScalePoint, select as d3select, Selection } from 'd3';
import { XYChartPoint, XYChartSeries } from './xy-chart.types';
import { toChartColor } from '../utils';

/**
 * Renders interactive dot circles for a single XY series onto the given D3 group.
 *
 * - Default radius: 4px, hover radius: 6px.
 * - Calls `onClick` with the clicked element, data point and series when a dot is clicked.
 *
 */
export function renderDots(
  g: Selection<SVGGElement, unknown, null, undefined>,
  series: XYChartSeries,
  x: ScalePoint<string>,
  y: ScaleLinear<number, number>,
  onClick: (el: SVGCircleElement, point: XYChartPoint, series: XYChartSeries) => void
): void {
  g.selectAll<SVGCircleElement, XYChartPoint>(`.dot-${series.key}`)
    .data(series.data, (d: XYChartPoint) => d.x)
    .join('circle')
    .attr('class', `dot dot-${series.key}`)
    .attr('cx', (d: XYChartPoint) => x(d.x) ?? 0)
    .attr('cy', (d: XYChartPoint) => y(d.value))
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
    .on('click', (event: PointerEvent, d: XYChartPoint) => {
      event.stopPropagation();
      onClick(event.currentTarget as SVGCircleElement, d, series);
    });
}
