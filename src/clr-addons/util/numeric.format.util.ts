const NEGATIVE = '-';
const NUMBERS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

export function formatNumber(
  value: string,
  finalFormatting: boolean,
  decimalSeparator: string,
  groupingSeparator: string,
  decimalPlaces: number,
  autofillDecimals: boolean
): string {
  let result = strip(value, finalFormatting, decimalSeparator, groupingSeparator, decimalPlaces);

  /* add grouping separator */
  const decimalIndex = result.indexOf(decimalSeparator);
  const isNegative = result[0] === NEGATIVE;
  let i = decimalIndex > -1 ? decimalIndex : result.length;
  while (i > (isNegative ? 4 : 3)) {
    i -= 3;
    result = result.substring(0, i) + groupingSeparator + result.substring(i, result.length);
  }

  if (finalFormatting) {
    if (decimalPlaces > 0 && !!result) {
      /* autofill decimal places */
      let actualDecimalIndex = result.indexOf(decimalSeparator);
      if (autofillDecimals) {
        if (actualDecimalIndex === -1) {
          actualDecimalIndex = result.length;
          result += decimalSeparator;
        }

        result = addMissingLeadingZero(result, actualDecimalIndex);
        actualDecimalIndex = result.indexOf(decimalSeparator);

        const actualDecimalPlaces = result.length - actualDecimalIndex - 1;
        for (let j = 0; j < decimalPlaces - actualDecimalPlaces; j++) {
          result += '0';
        }
      } else {
        result = addMissingLeadingZero(result, actualDecimalIndex);
      }
    }
  }

  return result;
}

function addMissingLeadingZero(result: string, actualDecimalIndex: number): string {
  const isNegative = result[0] === NEGATIVE;
  /* autoadd a zero before decimal separator, when it's missing */
  if (actualDecimalIndex === 0) {
    result = '0' + result;
  }
  /* autoadd a zero before decimal separator, when it's missing, for negative values */
  if (actualDecimalIndex === 1 && isNegative) {
    result = result[0] + '0' + result.substring(1, result.length);
  }
  return result;
}

export function strip(
  value: string,
  removeLeadingZeros = false,
  decimalSeparator: string,
  groupingSeparator: string,
  decimalPlaces: number
): string {
  const allowedKeys = new Set(NUMBERS);
  allowedKeys.add(NEGATIVE);
  allowedKeys.add(decimalSeparator);

  let result = '';
  let indexDecimalSep = -1;
  let j = -1;
  let ignoredChars = 0;
  for (const char of value) {
    j++;
    if (allowedKeys.has(char)) {
      if (char === decimalSeparator) {
        if (decimalPlaces === 0) {
          /* dismiss content after a decimal separator, when no places allowed */
          break;
        } else if (indexDecimalSep > -1) {
          /* ignore subsequent decimal separators */
          continue;
        }
        indexDecimalSep = j;
      }
      if (char === '0' && removeLeadingZeros) {
        /* remove leading zero only if it's not the only zero in the 'value' string */
        if ((result.length === 0 && j + 1 !== value.length) || result === NEGATIVE) {
          ignoredChars++;
          continue;
        }
      }
      if (char === NEGATIVE && j > 0) {
        /* dismiss content after a negative sign not on first position */
        break;
      }
      if (indexDecimalSep > -1 && result.length + ignoredChars > indexDecimalSep + decimalPlaces) {
        /* dismiss content after maximum decimal places reached */
        break;
      }
      result += char;
    } else if (char === groupingSeparator) {
      if (indexDecimalSep === -1) {
        ignoredChars++;
      }
    } else {
      /* dismiss content after a invalid character */
      break;
    }
  }

  return result;
}
