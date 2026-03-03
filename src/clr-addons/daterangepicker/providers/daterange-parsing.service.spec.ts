import { registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import localeZh from '@angular/common/locales/zh';

import { NullableDaterange } from '../interfaces/daterange.interface';
import { DayModel } from '../models/day.model';
import { TimeModel } from '../models/time.model';
import { DaterangeParsingService } from './daterange-parsing.service';
import { NullableTimerange } from '../interfaces/timerange.interface';

const LITTLE_ENDIAN_LOCALE = 'nl';
const MIDDLE_ENDIAN_LOCALE = 'en-US';
const BIG_ENDIAN_LOCALE = 'zh';

describe('Service: DaterangeParsingService', () => {
  // Register locales for these unit-tests.
  registerLocaleData(localeNl);
  registerLocaleData(localeZh);

  describe('constructor', () => {
    it('should set locale display format and delimiter based on LITTLE_ENDIAN locale', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;

      // Act.
      const sut = new DaterangeParsingService(locale);

      // Assert.
      expect(sut.localeDisplayFormat).toEqual({
        name: 'LITTLE_ENDIAN',
        format: ['DD', 'MM', 'YYYY'],
      });
      expect(sut.localeDelimiter).toEqual(['-', '-']);
      expect(sut.localeFormat).toBe('DD-MM-YYYY');
    });

    it('should set locale display format and delimiter based on MIDDLE_ENDIAN locale', () => {
      // Arrange.
      const locale = MIDDLE_ENDIAN_LOCALE;

      // Act.
      const sut = new DaterangeParsingService(locale);

      // Assert.
      expect(sut.localeDisplayFormat).toEqual({
        name: 'MIDDLE_ENDIAN',
        format: ['MM', 'DD', 'YYYY'],
      });
      expect(sut.localeDelimiter).toEqual(['/', '/']);
      expect(sut.localeFormat).toBe('MM/DD/YYYY');
    });

    it('should set locale display format and delimiter based on BIG_ENDIAN locale', () => {
      // Arrange.
      const locale = BIG_ENDIAN_LOCALE;

      // Act.
      const sut = new DaterangeParsingService(locale);

      // Assert.
      expect(sut.localeDisplayFormat).toEqual({
        name: 'BIG_ENDIAN',
        format: ['YYYY', 'MM', 'DD'],
      });
      expect(sut.localeDelimiter).toEqual(['/', '/']);
      expect(sut.localeFormat).toBe('YYYY/MM/DD');
    });
  });

  describe('toLocaleString', () => {
    it('should return empty string when getting locale string with value `null`', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const daterange: NullableDaterange = null;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.toLocaleString(daterange);

      // Assert.
      expect(result).toBe('');
    });

    it('should return empty string when getting locale string with daterange has `null` property', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const daterange: NullableDaterange = { to: null, from: null };
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.toLocaleString(daterange);

      // Assert.
      expect(result).toBe('');
    });

    it('should return string when getting locale string with valid daterange', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 0, 1),
        to: new DayModel(2022, 11, 31),
      };
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.toLocaleString(daterange);

      // Assert.
      expect(result).toBe('01-01-2022 - 31-12-2022');
    });

    it('should return string when getting locale string with valid daterange and custom separator text', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 0, 1),
        to: new DayModel(2022, 11, 31),
      };
      const separator = ' tot ';
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.toLocaleString(daterange, separator);

      // Assert.
      expect(result).toBe('01-01-2022 tot 31-12-2022');
    });
  });

  describe('toLocaleTimeString', () => {
    it('should return empty string when getting locale string with value `null`', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const daterange: NullableTimerange = null;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.toLocaleStringWithTime(daterange);

      // Assert.
      expect(result).toBe('');
    });

    it('should return string when getting locale string with valid daterange', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const daterange: NullableTimerange = {
        from: new DayModel(2022, 0, 1),
        to: new DayModel(2022, 11, 31),
        fromTime: new TimeModel(10, 10, 0),
        toTime: new TimeModel(10, 10, 0),
      };
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.toLocaleStringWithTime(daterange);

      // Assert.
      expect(result).toBe('01-01-2022 10:10 - 31-12-2022 10:10');
    });
  });

  describe('parse', () => {
    const invalidDaterangeStrings = [
      { value: null, description: '`null` value' },
      { value: '', description: 'empty string' },
      { value: 'test 123', description: 'invalid daterange string' },
    ] as Array<{ value: string; description: string }>;
    invalidDaterangeStrings.forEach(test => {
      it(`should not parse with ${test.description} and return \`null\``, () => {
        // Arrange.
        const locale = LITTLE_ENDIAN_LOCALE;
        const sut = new DaterangeParsingService(locale);

        // Act.
        const result = sut.parse(test.value);

        // Assert.
        expect(result).toBeNull();
      });
    });

    const locales = {
      LITTLE_ENDIAN: {
        locale: LITTLE_ENDIAN_LOCALE,
        value: '01-01-2022 - 31-12-2022',
      },
      MIDDLE_ENDIAN: {
        locale: MIDDLE_ENDIAN_LOCALE,
        value: '01/01/2022 - 12/31/2022',
      },
      BIG_ENDIAN: {
        locale: BIG_ENDIAN_LOCALE,
        value: '2022/01/01 - 2022/12/31',
      },
    } as Record<string, { locale: string; value: string }>;
    Object.keys(locales).forEach(localeKey => {
      const locale = locales[localeKey];
      it(`should parse valid daterange with ${localeKey} locale`, () => {
        // Arrange.
        const sut = new DaterangeParsingService(locale.locale);

        // Act.
        const result = sut.parse(locale.value);

        // Assert.
        expect(result).toEqual({
          from: new DayModel(2022, 0, 1),
          to: new DayModel(2022, 11, 31),
        });
      });
    });

    it('should parse valid daterange with custom separator text', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const separator = ' tot ';
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.parse('01-01-2022 tot 31-12-2022', separator);

      // Assert.
      expect(result).toEqual({
        from: new DayModel(2022, 0, 1),
        to: new DayModel(2022, 11, 31),
      });
    });

    it('should parse an partial daterange without separator', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.parse('01-01-2022');

      // Assert.
      expect(result).toEqual({
        from: new DayModel(2022, 0, 1),
        to: null,
      });
    });

    it('should parse an partial daterange before separator', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.parse('01-01-2022 - ');

      // Assert.
      expect(result).toEqual({
        from: new DayModel(2022, 0, 1),
        to: null,
      });
    });

    it('should parse an partial daterange after separator', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.parse(' - 01-01-2022');

      // Assert.
      expect(result).toEqual({
        from: null,
        to: new DayModel(2022, 0, 1),
      });
    });

    it('should parse without padded zero', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.parse('1-1-2022');

      // Assert.
      expect(result).toEqual({
        from: new DayModel(2022, 0, 1),
        to: null,
      });
    });

    it('should parse with 2-digit year', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.parse('01-01-22');

      // Assert.
      expect(result).toEqual({
        from: new DayModel(2022, 0, 1),
        to: null,
      });
    });

    const invalidYears = [0, 5, 123, 10000];
    invalidYears.forEach(year => {
      it(`should not parse with invalid year ${year}`, () => {
        // Arrange.
        const locale = LITTLE_ENDIAN_LOCALE;
        const sut = new DaterangeParsingService(locale);

        // Act.
        const result = sut.parse(`01-01-${year} - 31-12-2022`);

        // Assert.
        expect(result).toEqual({
          from: null,
          to: new DayModel(2022, 11, 31),
        });
      });
    });
  });

  describe('getTimeModelFromDateString', () => {
    const invalidInputs = [
      { dateString: '01-01-2022', timeString: null, description: '`null` timeString' },
      { dateString: '01-01-2022', timeString: '', description: 'empty timeString' },
      { dateString: 'invalid', timeString: 'invalid', description: 'invalid timeString format' },
    ] as Array<{ dateString: string; timeString: string; description: string }>;
    invalidInputs.forEach(test => {
      it(`should return \`null\` with ${test.description}`, () => {
        // Arrange.
        const locale = LITTLE_ENDIAN_LOCALE;
        const sut = new DaterangeParsingService(locale);

        // Act.
        const result = sut.getTimeModelFromDateString(test.timeString);

        // Assert.
        expect(result).toBeNull();
      });
    });

    it('should parse valid time string with HH:mm:ss format', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.getTimeModelFromDateString('10:30:45');

      // Assert.
      expect(result).toEqual(new TimeModel(10, 30, 45));
    });

    it('should parse valid time string with HH:mm format', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.getTimeModelFromDateString('10:30');

      // Assert.
      expect(result).toEqual(new TimeModel(10, 30, 0));
    });

    it('should parse time string with leading/trailing whitespace', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.getTimeModelFromDateString('  10:30:45  ');

      // Assert.
      expect(result).toEqual(new TimeModel(10, 30, 45));
    });

    it('should parse time with midnight (00:00:00)', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.getTimeModelFromDateString('00:00:00');

      // Assert.
      expect(result).toEqual(new TimeModel(0, 0, 0));
    });

    it('should parse time with end of day (23:59:59)', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.getTimeModelFromDateString('23:59:59');

      // Assert.
      expect(result).toEqual(new TimeModel(23, 59, 59));
    });

    const invalidTimeStrings = [
      { value: '24:00:00', description: 'invalid hour (24)' },
      { value: '10:60:00', description: 'invalid minute (60)' },
      { value: '10:30:60', description: 'invalid second (60)' },
      { value: '-1:30:00', description: 'negative hour' },
      { value: '10:-5:00', description: 'negative minute' },
      { value: '10:30:-5', description: 'negative second' },
      { value: '10', description: 'incomplete time (only 1 part)' },
      { value: 'abc:def:ghi', description: 'non-numeric values' },
      { value: '10:30:00:00', description: 'too many time parts' },
    ] as Array<{ value: string; description: string }>;
    invalidTimeStrings.forEach(test => {
      it(`should return \`null\` with ${test.description}`, () => {
        // Arrange.
        const locale = LITTLE_ENDIAN_LOCALE;
        const sut = new DaterangeParsingService(locale);

        // Act.
        const result = sut.getTimeModelFromDateString(test.value);

        // Assert.
        expect(result).toBeNull();
      });
    });

    it('should work with LITTLE_ENDIAN locale (DD-MM-YYYY)', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.getTimeModelFromDateString('14:30:15');

      // Assert.
      expect(result).toEqual(new TimeModel(14, 30, 15));
    });

    it('should work with MIDDLE_ENDIAN locale (MM/DD/YYYY)', () => {
      // Arrange.
      const locale = MIDDLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.getTimeModelFromDateString('14:30:15');

      // Assert.
      expect(result).toEqual(new TimeModel(14, 30, 15));
    });

    it('should work with BIG_ENDIAN locale (YYYY/MM/DD)', () => {
      // Arrange.
      const locale = BIG_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.getTimeModelFromDateString('14:30:15');

      // Assert.
      expect(result).toEqual(new TimeModel(14, 30, 15));
    });

    it('should parse time with single digit hours and minutes', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.getTimeModelFromDateString('9:5:3');

      // Assert.
      expect(result).toEqual(new TimeModel(9, 5, 3));
    });

    it('should return null when timeString is undefined', () => {
      // Arrange.
      const locale = LITTLE_ENDIAN_LOCALE;
      const sut = new DaterangeParsingService(locale);

      // Act.
      const result = sut.getTimeModelFromDateString(undefined);

      // Assert.
      expect(result).toBeNull();
    });
  });
});
