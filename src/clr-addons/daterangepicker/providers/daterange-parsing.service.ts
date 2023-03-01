import { FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import {
  BIG_ENDIAN,
  DELIMITER_REGEX,
  InputDateDisplayFormat,
  LITTLE_ENDIAN,
  LITTLE_ENDIAN_REGEX,
  MIDDLE_ENDIAN,
  MIDDLE_ENDIAN_REGEX,
  SEPARATOR_TEXT_DEFAULT,
  USER_INPUT_REGEX,
} from '../daterange.constants';
import { NullableDaterange } from '../interfaces/daterange.interface';
import { DayModel } from '../models/day.model';

/**
 * Daterange parsing service.
 * Heavy inspired by `date-io.service.ts` from Clarity.
 * https://github.com/vmware-clarity/ng-clarity/blob/a21fe726fe91ae3c929b8f016359afe354bb89c6/projects/angular/src/forms/datepicker/providers/date-io.service.ts
 */
@Injectable({
  providedIn: 'root',
})
export class DaterangeParsingService {
  private localeDisplayFormat: InputDateDisplayFormat;
  private localeDelimiter: Array<string> = [];

  public constructor(@Inject(LOCALE_ID) private readonly locale: string) {
    this.initLocaleDisplayFormat();
  }

  /**
   * Get locale display format.
   */
  private initLocaleDisplayFormat(): void {
    const localeFormat = getLocaleDateFormat(this.locale, FormatWidth.Short);
    const format: string = localeFormat.toLocaleLowerCase();

    console.log('DaterangeParsingService.getLocaleDisplayFormat', {
      localeFormat,
      format,
    });

    if (LITTLE_ENDIAN_REGEX.test(format)) {
      this.localeDisplayFormat = LITTLE_ENDIAN;
    } else if (MIDDLE_ENDIAN_REGEX.test(format)) {
      this.localeDisplayFormat = MIDDLE_ENDIAN;
    } else {
      this.localeDisplayFormat = BIG_ENDIAN;
    }

    // Splitting it by date, month and year, leaves us with the delimiters.
    // E.g. `"dd/MM/y".split(/d+|m+|y+/i)` results in `["", "/", "/", ""]`.
    const delimiters: Array<string> = localeFormat.split(DELIMITER_REGEX);
    this.localeDelimiter = [delimiters[1], delimiters[2]];
  }

  /**
   * Convert daterange to locale friendly text.
   * @param daterange - Daterange.
   * @param separator - Separator between 'from' and 'to' dates.
   * @returns Friendly daterange text.
   */
  public toLocaleString(daterange: NullableDaterange, separator: string = SEPARATOR_TEXT_DEFAULT): string {
    console.log('DaterangeParsingService.toLocaleString', {
      daterange,
      separator,
      locale: this.locale,
    });

    if (daterange == null) return '';

    const { from, to } = daterange;
    if (from == null || to == null) return '';

    const fromDate = from.toDate();
    const toDate = to.toDate();

    const fromDateStr = this.toLocaleDisplayFormatString(fromDate);
    const toDateStr = this.toLocaleDisplayFormatString(toDate);

    return fromDateStr + separator + toDateStr;
  }

  /**
   * Convert date to locale display format string.
   * @param date - Javascript Date object.
   * @returns Locale display format string.
   */
  private toLocaleDisplayFormatString(date: Date): string {
    const dateNo: number = date.getDate();
    const monthNo: number = date.getMonth() + 1;
    const yearNo: number = date.getFullYear();

    const dateStr: string = this.pad(dateNo);
    const monthStr: string = this.pad(monthNo);

    const delim1 = this.localeDelimiter[0];
    const delim2 = this.localeDelimiter[1];

    if (this.localeDisplayFormat === LITTLE_ENDIAN) {
      return dateStr + delim1 + monthStr + delim2 + yearNo;
    } else if (this.localeDisplayFormat === MIDDLE_ENDIAN) {
      return monthStr + delim1 + dateStr + delim2 + yearNo;
    } else {
      return yearNo + delim1 + monthStr + delim2 + dateStr;
    }
  }

  /**
   * String padding with zeros.
   * @param num - Number to pad.
   * @returns Padded string.
   */
  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  /**
   * Parse daterange string to daterange object.
   * @param daterangeString - Daterange string.
   * @param separator - Separator text.
   * @returns Daterange object.
   */
  public parse(daterangeString: string, separator: string = SEPARATOR_TEXT_DEFAULT): NullableDaterange {
    console.log('DaterangeParsingService.parse', {
      daterangeString,
      separator,
      locale: this.locale,
    });

    const [fromString, toString] = daterangeString.split(separator);
    const from = this.getDayModelFromDateString(fromString);
    const to = this.getDayModelFromDateString(toString);

    console.log('DaterangeParsingService.parse.2', {
      fromString,
      toString,
      to,
      from,
    });

    if (from == null && to == null) return null;

    const daterange: NullableDaterange = { from, to };
    return daterange;
  }

  /**
   * Get `DayModel` from date string.
   * @param dateString - Date string.
   * @returns DayModel.
   */
  private getDayModelFromDateString(dateString: string): DayModel | null {
    console.log('DaterangeParsingService.getDayModelFromDateString', {
      dateString,
      match: dateString?.match(USER_INPUT_REGEX),
    });

    if (!dateString) return null;

    const dateParts: RegExpMatchArray = dateString.match(USER_INPUT_REGEX);
    if (dateParts == null || dateParts.length !== 3) return null;

    const [firstPart, secondPart, thirdPart] = dateParts;
    if (this.localeDisplayFormat === LITTLE_ENDIAN) {
      // secondPart is month && firstPart is date.
      return this.getDayModelFromDateParts(thirdPart, secondPart, firstPart);
    } else if (this.localeDisplayFormat === MIDDLE_ENDIAN) {
      // firstPart is month && secondPart is date.
      return this.getDayModelFromDateParts(thirdPart, firstPart, secondPart);
    } else {
      // secondPart is month && thirdPart is date.
      return this.getDayModelFromDateParts(firstPart, secondPart, thirdPart);
    }
  }

  /**
   * Get `DayModel` from date string parts.
   * @param yearString - Year string.
   * @param monthString - Month string.
   * @param dateString - Date string.
   * @returns DayModel.
   */
  private getDayModelFromDateParts(yearString: string, monthString: string, dateString: string): DayModel | null {
    console.log('DaterangeParsingService.validateAndGetDate', {
      yearString,
      monthString,
      dateString,
    });

    // Check for valid date part strings.
    let year: number = parseInt(yearString);
    if (isNaN(year)) return null;
    let month: number = parseInt(monthString);
    if (isNaN(month)) return null;
    const date: number = parseInt(dateString);
    if (isNaN(date)) return null;

    // Convert year to 4 digit year.
    year = this.parseToFourDigitYear(year);
    console.log('DaterangeParsingService.validateAndGetDate.2', {
      year,
    });
    if (year == null) return null;

    // Month is zero-indexed.
    month -= 1;

    // Creating new Javascript Date object, because it will automatically take care of
    // switching to next or previous months & years without we having to worry about it.
    const parsedDate = new Date(year, month, date);
    if (isNaN(parsedDate.getTime())) return null;

    return new DayModel(parsedDate);
  }

  /**
   * Takes in a year and if it is a 2 digit year, returns the corresponding 4 digit year.
   * Window of 80 years before and 20 years after the present year.
   * Credit: https://github.com/globalizejs/globalize/blob/e1b31cd6a4f1cff75b185b68b7a32220aac5196f/src/date/parse.js
   * @param year - Year.
   * @returns Four-digit year.
   */
  private parseToFourDigitYear(year: number): number | null {
    console.log('DaterangeParsingService.validateAndGetDate', {
      year,
    });

    // Impossible years.
    if (year > 9999 || (year > 100 && year < 999) || year < 10) {
      return null;
    }

    if (year > 999) {
      return year;
    }

    const currYear: number = new Date().getFullYear();
    const century: number = Math.floor(currYear / 100) * 100;
    let result: number = year + century;
    if (result > currYear + 20) {
      result = result - 100;
    }
    return result;
  }
}
