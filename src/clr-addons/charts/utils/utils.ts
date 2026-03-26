import { format } from 'd3';

export const percentage = (value: number, total: number): number => Math.round((value / total) * 100);

export const d3percentFormat = (
  f =>
  (d: number): string =>
    `${f(d)}%`
)(format('.1f'));
