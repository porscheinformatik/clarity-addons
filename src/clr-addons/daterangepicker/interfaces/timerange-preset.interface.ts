import { Timerange } from './timerange.interface';

/**
 * timerange preset for daterangepicker.
 */
export interface TimerangePreset {
  text: string;

  range(): Timerange;
}
