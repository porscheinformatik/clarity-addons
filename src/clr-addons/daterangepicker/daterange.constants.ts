export const USER_INPUT_REGEX = /\d+/g;

// https://en.wikipedia.org/wiki/Date_format_by_country
export const LITTLE_ENDIAN_REGEX = /d+.+m+.+y+/i;
export const MIDDLE_ENDIAN_REGEX = /m+.+d+.+y+/i;

export const DELIMITER_REGEX = /d+|m+|y+/i;

export const YEAR = 'YYYY';
export const MONTH = 'MM';
export const DATE = 'DD';

export type FormatType = 'LITTLE_ENDIAN' | 'MIDDLE_ENDIAN' | 'BIG_ENDIAN';

export type InputDateDisplayFormat = {
  readonly name: FormatType;
  readonly format: [string, string, string];
};

export const LITTLE_ENDIAN: InputDateDisplayFormat = {
  name: 'LITTLE_ENDIAN',
  format: [DATE, MONTH, YEAR],
};

export const MIDDLE_ENDIAN: InputDateDisplayFormat = {
  name: 'MIDDLE_ENDIAN',
  format: [MONTH, DATE, YEAR],
};

export const BIG_ENDIAN: InputDateDisplayFormat = {
  name: 'BIG_ENDIAN',
  format: [YEAR, MONTH, DATE],
};

/** Default separator text. */
export const SEPARATOR_TEXT_DEFAULT = ' - ';
