import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ClrDaterangepickerModule } from '../daterangepicker.module';
import { NullableDaterange } from '../interfaces/daterange.interface';
import { DayModel } from '../models/day.model';

const MIN_DATE = new Date(2022, 0, 1);

@Component({
  template: `
    <clr-daterangepicker-container>
      <input type="date" clrDaterangepicker [min]="this.minDate" [formControl]="this.formControl" />
    </clr-daterangepicker-container>
  `,
})
class TestComponent {
  public readonly minDate = MIN_DATE;
  public readonly formControl = new FormControl();
}

@Component({
  template: `
    <clr-daterangepicker-container>
      <input
        type="date"
        clrDaterangepicker
        [min]="this.minDate"
        [clrDaterangeMin]="this.validationState"
        [formControl]="this.formControl"
      />
    </clr-daterangepicker-container>
  `,
})
class TestWithToggleableValidationComponent {
  public readonly minDate = MIN_DATE;
  public validationState: unknown;
  public readonly formControl = new FormControl();
}

describe('Validator: ClrDaterangeMinValidator', () => {
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

    it('should not allow a daterange that is before the min date', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(MIN_DATE).incrementBy(-1),
        to: new DayModel(2022, 11, 31),
      };
      const expectedErrors = {
        min: {
          min: new DayModel(MIN_DATE),
          actual: new DayModel(MIN_DATE).incrementBy(-1),
        },
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toEqual(expectedErrors);
    });

    it('should allow a daterange equal to the min date', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(MIN_DATE),
        to: new DayModel(2022, 11, 31),
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toBeNull();
    });

    it('should allow a daterange after the min date', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 6, 1),
        to: new DayModel(2022, 7, 1),
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toBeNull();
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
        from: new DayModel(MIN_DATE).incrementBy(-1),
        to: new DayModel(2022, 11, 31),
      };
      const expectedErrors = {
        min: {
          min: new DayModel(MIN_DATE),
          actual: new DayModel(MIN_DATE).incrementBy(-1),
        },
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
        from: new DayModel(MIN_DATE).incrementBy(-1),
        to: new DayModel(2022, 11, 31),
      };
      const expectedErrors = {
        min: {
          min: new DayModel(MIN_DATE),
          actual: new DayModel(MIN_DATE).incrementBy(-1),
        },
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
        from: new DayModel(MIN_DATE).incrementBy(-1),
        to: new DayModel(2022, 11, 31),
      };
      const expectedErrors = {
        min: {
          min: new DayModel(MIN_DATE),
          actual: new DayModel(MIN_DATE).incrementBy(-1),
        },
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
        from: new DayModel(MIN_DATE).incrementBy(-1),
        to: new DayModel(2022, 11, 31),
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
        from: new DayModel(MIN_DATE).incrementBy(-1),
        to: new DayModel(2022, 11, 31),
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
