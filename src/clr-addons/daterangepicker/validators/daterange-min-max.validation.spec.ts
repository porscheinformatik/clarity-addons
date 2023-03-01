import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ClrDaterangepickerModule } from '../daterangepicker.module';
import { NullableDaterange } from '../interfaces/daterange.interface';
import { DayModel } from '../models/day.model';

const MIN_DATE = new Date(2022, 0, 1);
const MAX_DATE = new Date(2022, 11, 31);

@Component({
  template: `
    <clr-daterangepicker-container>
      <input
        type="date"
        clrDaterangepicker
        [min]="this.minDate"
        [max]="this.maxDate"
        [formControl]="this.formControl"
      />
    </clr-daterangepicker-container>
  `,
})
class TestComponent {
  public readonly minDate = MIN_DATE;
  public readonly maxDate = MAX_DATE;
  public readonly formControl = new FormControl();
}

@Component({
  template: `
    <clr-daterangepicker-container>
      <input
        type="date"
        clrDaterangepicker
        [min]="this.minDate"
        [max]="this.maxDate"
        [clrDaterangeMinMax]="this.validationState"
        [formControl]="this.formControl"
      />
    </clr-daterangepicker-container>
  `,
})
class TestWithToggleableValidationComponent {
  public readonly minDate = MIN_DATE;
  public readonly maxDate = MAX_DATE;
  public validationState: unknown;
  public readonly formControl = new FormControl();
}

describe('Validator: ClrDaterangeMinMaxValidator', () => {
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

    it('should not allow a daterange less than the min date', () => {
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

    it('should allow a daterange between the min and max dates', () => {
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

    it('should allow a daterange equal to the max date', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 6, 1),
        to: new DayModel(MAX_DATE),
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toBeNull();
    });

    it('should not allow a daterange greater than the max date', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 6, 1),
        to: new DayModel(MAX_DATE).incrementBy(1),
      };
      const expectedErrors = {
        max: {
          max: new DayModel(MAX_DATE),
          actual: new DayModel(MAX_DATE).incrementBy(1),
        },
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toEqual(expectedErrors);
    });

    it('should not allow a daterange less than the min date and greater than the max date', () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(MIN_DATE).incrementBy(-1),
        to: new DayModel(MAX_DATE).incrementBy(1),
      };
      const expectedErrors = {
        min: {
          min: new DayModel(MIN_DATE),
          actual: new DayModel(MIN_DATE).incrementBy(-1),
        },
        max: {
          max: new DayModel(MAX_DATE),
          actual: new DayModel(MAX_DATE).incrementBy(1),
        },
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toEqual(expectedErrors);
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
        to: new DayModel(MAX_DATE).incrementBy(1),
      };
      const expectedErrors = {
        min: {
          min: new DayModel(MIN_DATE),
          actual: new DayModel(MIN_DATE).incrementBy(-1),
        },
        max: {
          max: new DayModel(MAX_DATE),
          actual: new DayModel(MAX_DATE).incrementBy(1),
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
        to: new DayModel(MAX_DATE).incrementBy(1),
      };
      const expectedErrors = {
        min: {
          min: new DayModel(MIN_DATE),
          actual: new DayModel(MIN_DATE).incrementBy(-1),
        },
        max: {
          max: new DayModel(MAX_DATE),
          actual: new DayModel(MAX_DATE).incrementBy(1),
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
        to: new DayModel(MAX_DATE).incrementBy(1),
      };
      const expectedErrors = {
        min: {
          min: new DayModel(MIN_DATE),
          actual: new DayModel(MIN_DATE).incrementBy(-1),
        },
        max: {
          max: new DayModel(MAX_DATE),
          actual: new DayModel(MAX_DATE).incrementBy(1),
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
        to: new DayModel(MAX_DATE).incrementBy(1),
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
        to: new DayModel(MAX_DATE).incrementBy(1),
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
