import { FormControl, Validators } from '@angular/forms';

import { NullableDaterange } from '../interfaces/daterange.interface';
import { DayModel } from '../models/day.model';
import { DaterangeService } from './daterange.service';

describe('Service: DaterangeService', () => {
  it('should keep track of min date, max date, disabled and focused', () => {
    // Arrange.
    const sut = new DaterangeService();
    const minDate = new DayModel(2022, 4, 3);
    const maxDate = new DayModel(2022, 4, 3);
    const disabled = true;
    const focused = true;

    // Act.
    sut.minDate = minDate;
    sut.maxDate = maxDate;
    sut.disabled = disabled;
    sut.focused = focused;

    // Assert.
    expect(sut.minDate).toEqual(minDate);
    expect(sut.maxDate).toEqual(maxDate);
    expect(sut.disabled).toEqual(disabled);
    expect(sut.focused).toEqual(focused);
  });

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

  it('should return valid status and no errors, and emit status change event, when control is valid', () => {
    // Arrange.
    const sut = new DaterangeService();
    const spy = jasmine.createSpy();
    sut.statusChange.subscribe(spy);
    const control = new FormControl('abcdef', Validators.required);
    control.markAsTouched();

    // Act.
    sut.updateStatus(control);

    // Assert.
    expect(sut.invalid).toBeFalse();
    expect(sut.errors).toBeNull();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should return invalid status and error, and emit status change event, when control is invalid', () => {
    // Arrange.
    const sut = new DaterangeService();
    const spy = jasmine.createSpy();
    sut.statusChange.subscribe(spy);
    const control = new FormControl('', Validators.required);
    control.markAsTouched();
    const expectedErrors = {
      required: true,
    };

    // Act.
    sut.updateStatus(control);

    // Assert.
    expect(sut.invalid).toBeTrue();
    expect(sut.errors).toEqual(expectedErrors);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should not update status, errors and not emit event, when control status is not valid or invalid', () => {
    // Arrange.
    const sut = new DaterangeService();
    const spy = jasmine.createSpy();
    sut.statusChange.subscribe(spy);
    const control = new FormControl('', Validators.required);
    control.disable();

    // Act.
    sut.updateStatus(control);

    // Assert.
    expect(sut.invalid).toBeFalse();
    expect(sut.errors).toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });
});
