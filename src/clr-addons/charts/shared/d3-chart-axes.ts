/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  axisBottom as d3axisBottom,
  axisLeft as d3axisLeft,
  AxisScale,
  format as d3format,
  ScaleLinear,
  Selection,
} from 'd3';

/** Options passed to {@link drawXYAxes}. */
export interface XYAxisOptions {
  /** Maps each X key to its display label. */
  xLabelMap: Map<string, string>;
  width: number;
  height: number;
  /** Optional description label rendered below the X axis. */
  xAxisLabel?: string;
  /** Optional description label rendered rotated left of the Y axis. */
  yAxisLabel?: string;
  /** Left margin already accounting for the Y-axis label offset. */
  effectiveLeft: number;
}

/**
 * Draws the X and Y axes (with integer-only Y ticks and grid lines) plus
 * optional description labels onto the given D3 group.
 *
 * @param g          The D3 group element to append into.
 * @param x          Any D3 axis scale keyed on strings (`ScalePoint` or `ScaleBand`).
 * @param y          The linear Y scale.
 * @param opts       Axis configuration options.
 */
export function drawXYAxes(
  g: Selection<SVGGElement, unknown, null, undefined>,
  x: AxisScale<string>,
  y: ScaleLinear<number, number>,
  opts: XYAxisOptions
): void {
  const { xLabelMap, width, height, xAxisLabel, yAxisLabel, effectiveLeft } = opts;

  // X axis
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3axisBottom(x).tickFormat((d: string) => xLabelMap.get(d) ?? d))
    .selectAll('text')
    .style('font-size', '11px')
    .style('fill', 'var(--clr-color-neutral-600, #666)');

  // Y axis
  const tickValues = y.ticks(5).filter((t: number) => Number.isInteger(t));
  g.append('g')
    .call(d3axisLeft(y).tickValues(tickValues).tickSize(-width).tickFormat(d3format('~s')))
    .selectAll('text')
    .style('font-size', '11px')
    .style('fill', 'var(--clr-color-neutral-600, #666)');

  // Optional X axis description label
  if (xAxisLabel) {
    g.append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'var(--clr-color-neutral-600, #666)')
      .text(xAxisLabel);
  }

  // Optional Y axis description label (rotated, centred in the left-margin band)
  if (yAxisLabel) {
    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -(effectiveLeft / 2))
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'var(--clr-color-neutral-600, #666)')
      .text(yAxisLabel);
  }
}

/**
 * Styles all D3 grid tick lines inside `g` with the neutral chart grid color.
 */
export function styleGridLines(g: Selection<SVGGElement, unknown, null, undefined>): void {
  g.selectAll('.tick line').style('stroke', 'var(--clr-color-neutral-200, #e8e8e8)');
}
