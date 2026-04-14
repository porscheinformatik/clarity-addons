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
 * Computes sensible tick values for a linear Y scale.
 *
 * When the domain contains enough integer values (≥ 3) the ticks are filtered
 * to integers only (avoids fractional labels for count data).  For small-range
 * domains – e.g. 0–1 ratios / probabilities – the raw D3 ticks are returned
 * unchanged so that decimal labels are still visible.
 */
export function computeYTickValues(y: ScaleLinear<number, number>, count = 5): number[] {
  const raw = y.ticks(count);
  const integers = raw.filter(Number.isInteger);
  // Keep integer-only ticks only when there are at least 3 of them; otherwise
  // the domain is too small (e.g. 0–1) and we need the decimal ticks.
  return integers.length >= 3 ? integers : raw;
}

/**
 * Returns a D3 tick-format function that matches the decision made in
 * {@link computeYTickValues}:
 *
 * - **Integer / large-value domain** (≥ 3 integer ticks): SI prefix format
 *   (`~s`), e.g. `1k`, `200`.
 * - **Small / decimal domain** (< 3 integer ticks, e.g. 0–1 ratios): plain
 *   fixed-point format (`.3~f`) – avoids the SI "milli" prefix (`m`) that
 *   D3 would otherwise apply to values < 1.
 */
export function computeYTickFormat(
  y: ScaleLinear<number, number>,
  count = 5
): (d: number | { valueOf(): number }) => string {
  const raw = y.ticks(count);
  const integers = raw.filter(Number.isInteger);
  return integers.length >= 3 ? d3format('~s') : d3format('.3~f');
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
  const tickValues = computeYTickValues(y);
  const tickFormat = computeYTickFormat(y);
  g.append('g')
    .call(d3axisLeft(y).tickValues(tickValues).tickSize(-width).tickFormat(tickFormat))
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
