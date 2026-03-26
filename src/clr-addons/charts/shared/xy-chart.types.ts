/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * A single data point on an XY chart (line, area).
 * `x` is used as the category key; `xLabel` is the optional display label for the axis tick.
 */
export interface XYChartPoint {
  /** Unique key used as the X-axis category. */
  x: string;
  /** Optional display label for the X-axis tick (defaults to `x`). */
  xLabel?: string;
  /** Y value. */
  value: number;
}

/**
 * A named data series for an XY chart.
 */
export interface XYChartSeries {
  /** Unique identifier. */
  key: string;
  /** Display name shown in the legend and tooltip. */
  label: string;
  /** Line / area / dot colour. Accepts hex or CSS custom property. */
  color: string;
  /** Ordered data points for this series. */
  data: XYChartPoint[];
}

/**
 * Emitted when the user clicks a data point on an XY chart.
 */
export interface XYChartValue {
  seriesKey: string;
  seriesLabel: string;
  x: string;
  xLabel?: string;
  value: number;
}
