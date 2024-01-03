import { DayModel } from './day.model';

describe('Model: DayModel', function () {
  const dayModelNumbers: DayModel = new DayModel(2018, 0, 1);
  const dayModelJsDate: DayModel = new DayModel(new Date(2018, 0, 1));
  const dayModelString: DayModel = new DayModel('2018-01-01');

  const dayModelNumbers2: DayModel = new DayModel(2018, 5, 21);

  it('checks if 2 DayModels are equal when the date, month and year matches', () => {
    expect(dayModelNumbers.isEqual(dayModelJsDate)).toBeTrue();
    expect(dayModelJsDate.isEqual(dayModelNumbers)).toBeTrue();

    expect(dayModelNumbers.isEqual(dayModelString)).toBeTrue();
    expect(dayModelString.isEqual(dayModelNumbers)).toBeTrue();

    expect(dayModelNumbers.isEqual(dayModelNumbers2)).toBeFalse();
    expect(dayModelNumbers2.isEqual(dayModelNumbers)).toBeFalse();

    expect(dayModelJsDate.isEqual(dayModelNumbers2)).toBeFalse();
    expect(dayModelNumbers2.isEqual(dayModelJsDate)).toBeFalse();

    expect(dayModelString.isEqual(dayModelNumbers2)).toBeFalse();
    expect(dayModelNumbers2.isEqual(dayModelString)).toBeFalse();

    expect(dayModelNumbers.isEqual(null)).toBeFalse();
    expect(dayModelJsDate.isEqual(null)).toBeFalse();
    expect(dayModelString.isEqual(null)).toBeFalse();
    expect(dayModelNumbers2.isEqual(null)).toBeFalse();
  });

  it('provides a method to increment or decrement it a DayModel by a number of days', () => {
    incrementDayModelAndCompare(dayModelNumbers2, 20);
    incrementDayModelAndCompare(dayModelNumbers2, -20);

    incrementDayModelAndCompare(dayModelNumbers2, 40);
    incrementDayModelAndCompare(dayModelNumbers2, -40);

    incrementDayModelAndCompare(dayModelNumbers, 1);
    incrementDayModelAndCompare(dayModelNumbers, -1);
  });

  it('checks if one DayModel is after another DayModel', () => {
    expect(dayModelNumbers2.isAfter(dayModelNumbers)).toBeTrue();
    expect(dayModelNumbers.isAfter(dayModelJsDate)).toBeFalse();
  });

  it('checks if one DayModel is before another DayModel', () => {
    expect(dayModelNumbers.isBefore(dayModelNumbers2)).toBeTrue();
    expect(dayModelNumbers.isBefore(dayModelJsDate)).toBeFalse();
  });

  it('returns a clone of the DayModel', () => {
    let testDayModel: DayModel = dayModelNumbers.clone();

    expect(testDayModel).not.toBe(dayModelNumbers);

    expect(assertEqualDates(testDayModel.toDate(), dayModelNumbers.toDate())).toBeTrue();

    testDayModel = dayModelNumbers2.clone();
    expect(assertEqualDates(testDayModel.toDate(), dayModelNumbers2.toDate())).toBeTrue();
  });

  it('converts a DayModel into the javascript date object', () => {
    const date1: Date = dayModelNumbers.toDate();
    const date2: Date = dayModelNumbers2.toDate();

    expect(date1).not.toBeNull();
    expect(date2).not.toBeNull();

    expect(date1.getTime()).toEqual(new Date(2018, 0, 1).getTime());
    expect(date2.getTime()).toEqual(new Date(2018, 5, 21).getTime());
  });

  it('provides a toHTML5SpecDateString method that returns the date as HTML5 spec string', () => {
    const testString = dayModelNumbers.toHTML5SpecDateString();
    expect(testString).toEqual('2018-01-01');
  });
});

/**
 * Assert if two dates are the same. Only by date, not by time.
 * @param date1 - Date.
 * @param date2 - Date.
 * @returns Wether the two dates are the same.
 */
function assertEqualDates(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/**
 * Increment day model and run assertion.
 * @param dayModel - Day model.
 * @param incrementBy - Incremental.
 */
function incrementDayModelAndCompare(dayModel: DayModel, incrementBy: number): void {
  const date: Date = dayModel.toDate();
  const testDate: Date = dayModel.incrementBy(incrementBy).toDate();

  date.setDate(date.getDate() + incrementBy);
  expect(assertEqualDates(date, testDate)).toBeTrue();
}
