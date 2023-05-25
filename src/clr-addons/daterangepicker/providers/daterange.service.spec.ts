import { NullableDaterange } from '../interfaces/daterange.interface';
import { DayModel } from '../models/day.model';
import { DaterangeService } from './daterange.service';

describe('Service: DaterangeService', () => {
  describe('minDate & maxDate', () => {
    it('should keep track of min and max date', () => {
      // Arrange.
      const sut = new DaterangeService();
      const minDate = new DayModel(2022, 4, 3);
      const maxDate = new DayModel(2022, 4, 3);

      // Act.
      sut.minDate = minDate;
      sut.maxDate = maxDate;

      // Assert.
      expect(sut.minDate).toEqual(minDate);
      expect(sut.maxDate).toEqual(maxDate);
    });
  });

  describe('updateSelectedDaterange', () => {
    it('should keep track of selected daterange and emit value change event', () => {
      // Arrange.
      const sut = new DaterangeService();
      const spy = jasmine.createSpy();
      sut.valueChange.subscribe(spy);
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 0, 1),
        to: new DayModel(2022, 11, 31),
      };

      // Act.
      sut.updateSelectedDaterange(daterange);

      // Assert.
      expect(sut.selectedDaterange).toEqual(daterange);
      expect(spy).toHaveBeenCalledWith(daterange);
    });

    it('should keep track of selected daterange and not emit value change event, with disabled trigger event', () => {
      // Arrange.
      const sut = new DaterangeService();
      const spy = jasmine.createSpy();
      sut.valueChange.subscribe(spy);
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 0, 1),
        to: new DayModel(2022, 11, 31),
      };

      // Act.
      sut.updateSelectedDaterange(daterange, false);

      // Assert.
      expect(sut.selectedDaterange).toEqual(daterange);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('isValid', () => {
    it('should return true for valid daterange', () => {
      // Arrange.
      const sut = new DaterangeService();
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 0, 1),
        to: new DayModel(2022, 11, 31),
      };
      sut.updateSelectedDaterange(daterange, false);

      // Act.
      const result = sut.isValid();

      // Assert.
      expect(result).toBeTrue();
    });

    const invalidDateranges = [
      { value: null, description: '`null` range' },
      { value: { from: null, to: new DayModel(2022, 0, 1) }, description: 'absent `from` date' },
      { value: { from: new DayModel(2022, 0, 1), to: null }, description: 'absent `to` date' },
    ] as Array<{ value: NullableDaterange; description: string }>;
    invalidDateranges.forEach(test => {
      it(`should return false for invalid daterange with ${test.description}`, () => {
        // Arrange.
        const sut = new DaterangeService();
        sut.updateSelectedDaterange(test.value, false);

        // Act.
        const result = sut.isValid();

        // Assert.
        expect(result).toBeFalse();
      });
    });
  });
});
