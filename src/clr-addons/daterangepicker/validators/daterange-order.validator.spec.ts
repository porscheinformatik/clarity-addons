import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ClrDaterangepickerModule } from '../daterangepicker.module';
import { NullableDaterange } from '../interfaces/daterange.interface';
import { DayModel } from '../models/day.model';

@Component({
  template: `
    <clr-daterangepicker-container>
      <input type="date" clrDaterangepicker [formControl]="this.formControl" />
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
        [clrDaterangeOrder]="this.validationState"
        [formControl]="this.formControl"
      />
    </clr-daterangepicker-container>
  `,
})
class TestWithToggleableValidationComponent {
  public validationState: unknown;
  public readonly formControl = new FormControl<NullableDaterange>(null);
}

describe('Validator: ClrDaterangeOrderValidator', () => {
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

    it("should not allow a daterange 'from' to be before the 'to' date", () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 11, 31),
        to: new DayModel(2022, 0, 1),
      };
      const expectedErrors = {
        fromIsAfterTo: { from: new DayModel(2022, 11, 31), to: new DayModel(2022, 0, 1) },
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toEqual(expectedErrors);
    });

    it("should allow a daterange 'from' to be equal to the 'to' date", () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 11, 31),
        to: new DayModel(2022, 11, 31),
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toBeNull();
    });

    it("should allow an empty daterange 'from' date", () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: null,
        to: new DayModel(2022, 11, 31),
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toBeNull();
    });

    it("should allow an empty daterange 'to' date", () => {
      // Arrange.
      const daterange: NullableDaterange = {
        from: new DayModel(2022, 11, 31),
        to: null,
      };

      // Act.
      fixture.componentInstance.formControl.setValue(daterange);
      fixture.detectChanges();

      // Assert.
      expect(fixture.componentInstance.formControl.errors).toBeNull();
    });

    it('should allow an empty daterange', () => {
      // Arrange.
      const daterange: NullableDaterange = null;

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
        from: new DayModel(2022, 11, 31),
        to: new DayModel(2022, 0, 1),
      };
      const expectedErrors = {
        fromIsAfterTo: { from: new DayModel(2022, 11, 31), to: new DayModel(2022, 0, 1) },
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
        from: new DayModel(2022, 11, 31),
        to: new DayModel(2022, 0, 1),
      };
      const expectedErrors = {
        fromIsAfterTo: { from: new DayModel(2022, 11, 31), to: new DayModel(2022, 0, 1) },
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
        from: new DayModel(2022, 11, 31),
        to: new DayModel(2022, 0, 1),
      };
      const expectedErrors = {
        fromIsAfterTo: { from: new DayModel(2022, 11, 31), to: new DayModel(2022, 0, 1) },
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
        from: new DayModel(2022, 11, 31),
        to: new DayModel(2022, 0, 1),
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
        from: new DayModel(2022, 11, 31),
        to: new DayModel(2022, 0, 1),
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
