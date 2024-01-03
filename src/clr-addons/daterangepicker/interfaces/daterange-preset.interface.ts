import { Daterange } from './daterange.interface';

/**
 * Daterange preset for daterangepicker.
 */
export interface DaterangePreset {
  text: string;
  range(): Daterange;
}
