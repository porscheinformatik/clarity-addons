import { DayModel } from './day.model';

describe('Model: DayModel', function () {
  const dayModel1: DayModel = new DayModel(2018, 0, 1);
  const dayModel2: DayModel = new DayModel(2018, 5, 21);
  const dayModel3: DayModel = new DayModel(new Date(2018, 0, 1));

  it('checks if 2 DayModels are equal when the date, month and year matches', () => {
    expect(dayModel1.isEqual(dayModel3)).toBeTrue();
    expect(dayModel3.isEqual(dayModel1)).toBeTrue();

    expect(dayModel1.isEqual(dayModel2)).toBeFalse();
    expect(dayModel2.isEqual(dayModel1)).toBeFalse();

    expect(dayModel3.isEqual(dayModel2)).toBeFalse();
    expect(dayModel2.isEqual(dayModel3)).toBeFalse();

    expect(dayModel1.isEqual(null)).toBeFalse();
  });

  it('provides a method to increment or decrement it a DayModel by a number of days', () => {
    incrementDayModelAndCompare(dayModel2, 20);
    incrementDayModelAndCompare(dayModel2, -20);

    incrementDayModelAndCompare(dayModel2, 40);
    incrementDayModelAndCompare(dayModel2, -40);

    incrementDayModelAndCompare(dayModel1, 1);
    incrementDayModelAndCompare(dayModel1, -1);
  });

  it('checks if one DayModel is after another DayModel', () => {
    expect(dayModel2.isAfter(dayModel1)).toBeTrue();
    expect(dayModel1.isAfter(dayModel3)).toBeFalse();
  });

  it('checks if one DayModel is before another DayModel', () => {
    expect(dayModel1.isBefore(dayModel2)).toBeTrue();
    expect(dayModel1.isBefore(dayModel3)).toBeFalse();
  });

  it('returns a clone of the DayModel', () => {
    let testDayModel: DayModel = dayModel1.clone();

    expect(testDayModel).not.toBe(dayModel1);

    expect(assertEqualDates(testDayModel.toDate(), dayModel1.toDate())).toBeTrue();

    testDayModel = dayModel2.clone();
    expect(assertEqualDates(testDayModel.toDate(), dayModel2.toDate())).toBeTrue();
  });

  it('converts a DayModel into the javascript date object', () => {
    const date1: Date = dayModel1.toDate();
    const date2: Date = dayModel2.toDate();

    expect(date1).not.toBeNull();
    expect(date2).not.toBeNull();

    expect(date1.getTime()).toEqual(new Date(2018, 0, 1).getTime());
    expect(date2.getTime()).toEqual(new Date(2018, 5, 21).getTime());
  });

  it('provides a toHTML5SpecDateString method that returns the aate as HTML5 spec string', () => {
    const testString = dayModel1.toHTML5SpecDateString();
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
