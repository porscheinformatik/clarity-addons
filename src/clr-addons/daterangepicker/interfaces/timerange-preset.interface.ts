import { Timerange } from './timerange.interface';

/**
 * timerange preset for daterangepicker.
 */
export interface DateTimerangePreset {
  text: string;

  range(): Timerange;
}
