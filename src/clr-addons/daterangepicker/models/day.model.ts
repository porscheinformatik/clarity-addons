/**
 * Day model.
 * Takes care of keeping records of full days, without the times & timezone issues.
 */
export class DayModel {
  /** Year. */
  private year!: number;

  /** Month, zero-indexed. */
  private month!: number;

  /** Date of the month. */
  private date!: number;

  /**
   * Creates an day model.
   * @param date - Javascript Date object.
   */
  public constructor(date: Date);
  /**
   * Creates an day model.
   * @param year - The full year.
   * @param month - The month as a number between 0 and 11 (January to December).
   * @param date - The date as a number between 1 and 31.
   */
  public constructor(year: number, month: number, date: number);
  public constructor(...args: Array<number | Date>) {
    if (args[0] instanceof Date) {
      const date: Date = args[0];
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.date = date.getDate();
    } else {
      this.year = args[0];
      this.month = args[1] as number;
      this.date = args[2] as number;
    }
  }

  /**
   * Checks if the passed value is equal to current day model.
   * @param value - Day model.
   * @returns Wether value is equal to current day model.
   */
  public isEqual(value: DayModel): boolean {
    if (value) {
      return this.year === value.year && this.month === value.month && this.date === value.date;
    }
    return false;
  }

  /**
   * Increment day model with date value.
   * @param value - Incremental date value.
   * @returns Updated day model with incremented date value.
   */
  public incrementBy(value: number): DayModel {
    // Creating new Javascript Date object to increment because
    // it will automatically take care of switching to next or previous
    // months & years without we having to worry about it.
    const date: Date = new Date(this.year, this.month, this.date + value);
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.date = date.getDate();
    return this;
  }

  /**
   * Checks if current day model is after value.
   * @param value - Day model.
   * @returns Wether current day model is after value.
   */
  public isAfter(value: DayModel): boolean {
    return this.toDate() > value.toDate();
  }

  /**
   * Checks if current day model is before value.
   * @param value - Day model.
   * @returns Wether current day model is before value.
   */
  public isBefore(value: DayModel): boolean {
    return this.toDate() < value.toDate();
  }

  /**
   * Clones the current day model.
   * @returns Cloned day model.
   */
  public clone(): DayModel {
    return new DayModel(this.year, this.month, this.date);
  }

  /**
   * Convert to Javascript Date object.
   * @returns Javascript Date object.
   */
  public toDate(): Date {
    return new Date(this.year, this.month, this.date);
  }

  /**
   * To HTML5 date spec string.
   * See https://clarity.design/documentation/datepicker
   * @returns Date as HTML5 spec string.
   */
  public toHTML5SpecDateString(): string {
    // The clarity date picker uses the format 'YYYY-MM-DD'.
    return `${this.year}-${this.pad(this.month + 1)}-${this.pad(this.date)}`;
  }

  /**
   * String padding with zeros.
   * @param num - Number to pad.
   * @returns Padded string.
   */
  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}

/**
 * Day model.
 * Takes care of keeping records of full days, without the times & timezone issues.
 */
export type NullableDayModel = DayModel | undefined | null;
