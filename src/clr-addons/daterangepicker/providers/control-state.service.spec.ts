import { FormControl, Validators } from '@angular/forms';

import { ControlStateService } from './control-state.service';

describe('Service: ControlStateService', () => {
  it('should keep track of disabled and focused', () => {
    // Arrange.
    const sut = new ControlStateService();
    const disabled = true;
    const focused = true;

    // Act.
    sut.disabled = disabled;
    sut.focused = focused;

    // Assert.
    expect(sut.disabled).toEqual(disabled);
    expect(sut.focused).toEqual(focused);
  });

  it('should return valid status and no errors, and emit status change event, when control is valid', () => {
    // Arrange.
    const sut = new ControlStateService();
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
    const sut = new ControlStateService();
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
    const sut = new ControlStateService();
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
