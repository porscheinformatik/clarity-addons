/**
 * Time model.
 * Takes care of keeping records of full time.
 */
export class TimeModel {
  private hours!: number;

  private minutes!: number;

  private seconds!: number;

  /**
   * Creates a time model.
   * @param hours - The full hours (0-23).
   * @param minutes - The minutes
   * @param seconds - The seconds
   */
  public constructor(hours: number, minutes: number, seconds: number);
  /**
   * Creates an time model.
   * @param date - Javascript Date object.
   */
  public constructor(date: Date);
  /**
   * Creates a time model.
   * @param date - time string in `hh:mm:ss` format.
   */
  public constructor(date: string);
  public constructor(...args: Array<number | Date | string>) {
    if (args[0] instanceof Date) {
      const date: Date = args[0];
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
      this.seconds = date.getSeconds();
    } else if (typeof args[0] === 'string') {
      const [hours, minutes, seconds] = args[0].split(':').map(n => parseInt(n));
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    } else {
      this.hours = args[0] as number;
      this.minutes = args[1] as number;
      this.seconds = args[2] as number;
    }
  }

  /**
   * Checks if the passed value is equal to current time model.
   * @param value - Time model.
   * @returns Whether value is equal to current time model.
   */
  public isEqual(value: TimeModel): boolean {
    if (value) {
      return this.hours === value.hours && this.minutes === value.minutes && this.seconds === value.seconds;
    }
    return false;
  }

  /**
   * Checks if current time model is after value.
   * @param value - time model.
   * @returns Whether current time model is after value.
   */
  public isAfter(value: TimeModel): boolean {
    return this.toDate() > value.toDate();
  }

  /**
   * Checks if current time model is before value.
   * @param value - Time model.
   * @returns Whether current time model is before value.
   */
  public isBefore(value: TimeModel): boolean {
    return this.toDate() < value.toDate();
  }

  /**
   * Clones the current odel.
   * @returns Cloned model.
   */
  public clone(): TimeModel {
    return new TimeModel(this.hours, this.minutes, this.seconds);
  }

  /**
   * Convert to Javascript Date object.
   * @returns Javascript Date object.
   */
  public toDate(): Date {
    return new Date(new Date().setHours(this.hours, this.minutes, this.seconds ? this.seconds : 0));
  }

  /**
   * To HTML5 time spec string.
   * @returns Time as HTML5 spec string.
   */
  public toHTML5SpecTimeString(): string {
    // The clarity time picker uses the format 'hh:mm:ss'.
    if (this.seconds) {
      return this.pad(this.hours) + ':' + this.pad(this.minutes) + ':' + this.pad(this.seconds);
    }
    // The clarity time picker uses the format 'hh:mm'.
    return this.pad(this.hours) + ':' + this.pad(this.minutes);
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}

/**
 * Time model.
 * Takes care of keeping records of full time.
 */
export type NullableTimeModel = TimeModel | undefined | null;
