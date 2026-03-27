import { format } from 'd3';

export const percentage = (value: number, total: number): number => {
  if (total <= 0) {
    return 0;
  }
  return Math.min(100, Math.max(0, Math.round((value / total) * 100)));
};

export const d3percentFormat = (
  f =>
  (d: number): string =>
    `${f(d)}%`
)(format('.1f'));
