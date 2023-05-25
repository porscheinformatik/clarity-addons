import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ClrDaterangepickerModule } from '../daterangepicker.module';
import { Daterange, NullableDaterange } from '../interfaces/daterange.interface';
import { DayModel } from '../models/day.model';
import { ClrDaterangeRequiredValidator } from './daterange-required.validator';

type RequiredValidationError = {
  required: Daterange;
};

@Component({
  template: `
    <clr-daterangepicker-container>
      <input type="date" clrDaterangepicker required [formControl]="this.formControl" />
    </clr-daterangepicker-container>
  `,
})
class TestComponent {
  public readonly formControl = new FormControl<NullableDaterange>(null);
}

@Component({
  template: `
    <clr-daterangepicker-container>
      <input
        type="date"
        clrDaterangepicker
        [clrDaterangeRequired]="this.validationState"
        [formControl]="this.formControl"
      />
    </clr-daterangepicker-container>
  `,
})
class TestWithToggleableValidationComponent {
  public validationState: unknown;
  public readonly formControl = new FormControl<NullableDaterange>(null);
}

describe('Validator: ClrDaterangeRequiredValidator', () => {
  describe('validation', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, ClrDaterangepickerModule],
        declarations: [TestComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      });

      fixture = TestBed.createComponent(TestComponent);
    });

    it("should not allow an empty daterange 'from'", () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: null,
        to: new DayModel(2022, 0, 1),
      };
      const expectedErrors: RequiredValidationError = {
        required: { from: null, to: new DayModel(2022, 0, 1) },
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toEqual(expectedErrors);
    });

    it("should not allow an empty daterange 'to'", () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 0, 1),
        to: null,
      };
      const expectedErrors: RequiredValidationError = {
        required: { from: new DayModel(2022, 0, 1), to: null },
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toEqual(expectedErrors);
    });

    it("should not allow an empty daterange 'from' and 'to'", () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: null,
        to: null,
      };
      const expectedErrors: RequiredValidationError = {
        required: { from: null, to: null },
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toEqual(expectedErrors);
    });

    it('should allow an valid daterange', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 0, 1),
        to: new DayModel(2022, 11, 31),
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toBeNull();
    });

    it('should allow an empty daterange', () => {
      // Setting `null` as the control value, will trigger Angular required validator,
      // because of the `required`-attribute on the component.
      // Therefor we have to call the validator itself to trigger the validation.

      // Arrange.
      const daterange: NullableDaterange = null;
      const validator = new ClrDaterangeRequiredValidator();

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      const errors = validator.validate(fixture.componentInstance.formControl);

      // Assert.
      expect(errors).toBeNull();
    });
  });

  describe('configuration', () => {
    let fixture: ComponentFixture<TestWithToggleableValidationComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, ClrDaterangepickerModule],
        declarations: [TestWithToggleableValidationComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      });

      fixture = TestBed.createComponent(TestWithToggleableValidationComponent);
    });

    it('should trigger validation by default', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: null,
        to: null,
      };
      const expectedErrors: RequiredValidationError = {
        required: { from: null, to: null },
      };

      // Act.
      fixture.componentInstance.validationState = null;
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toEqual(expectedErrors);
    });

    it('should trigger validation with enabled validation set to `true` boolean', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: null,
        to: null,
      };
      const expectedErrors: RequiredValidationError = {
        required: { from: null, to: null },
      };

      // Act.
      fixture.componentInstance.validationState = true;
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toEqual(expectedErrors);
    });

    it('should trigger validation with enabled validation set to `true` string', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: null,
        to: null,
      };
      const expectedErrors: RequiredValidationError = {
        required: { from: null, to: null },
      };

      // Act.
      fixture.componentInstance.validationState = 'true';
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toEqual(expectedErrors);
    });

    it('should not trigger validation with disabled validation set to `false` boolean', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: null,
        to: null,
      };

      // Act.
      fixture.componentInstance.validationState = false;
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toBeNull();
    });

    it('should not trigger validation with disabled validation set to `false` string', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: null,
        to: null,
      };

      // Act.
      fixture.componentInstance.validationState = 'false';
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toBeNull();
    });
  });
});
