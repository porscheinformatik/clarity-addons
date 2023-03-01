import { NullableDayModel } from '../models/day.model';

/**
 * Daterange interface.
 */
export interface Daterange {
  from: NullableDayModel;
  to: NullableDayModel;
}

/**
 * Daterange.
 */
export type NullableDaterange = Daterange | null | undefined;
