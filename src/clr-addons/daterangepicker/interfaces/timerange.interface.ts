import { NullableTimeModel } from '../models/time.model';
import { Daterange } from '@porscheinformatik/clr-addons';

/**
 * Timerange interface.
 */
export interface Timerange extends Daterange {
  fromTime: NullableTimeModel;
  toTime: NullableTimeModel;
}

/**
 * Timerange.
 */
export type NullableTimerange = Timerange | undefined | null;
