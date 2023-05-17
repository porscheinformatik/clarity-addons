import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { ClrControlError, ClrPopoverEventsService, ClrPopoverToggleService } from '@clr/angular';

import { ClrDaterangepickerModule } from '../daterangepicker.module';
import { DaterangeControlStateService } from '../providers/daterange-control-state.service';
import { DaterangeService } from '../providers/daterange.service';
import { ClrDaterangepickerContainerComponent } from './daterangepicker-container/daterangepicker-container.component';
import { ClrIfDaterangeErrorDirective } from './if-daterange-error.directive';

const errorMessage = 'ERROR_MESSAGE';
const minLengthMessage = 'MIN_LENGTH_MESSAGE';
const maxLengthMessage = 'MAX_LENGTH_MESSAGE';

@Component({
  template: `<div *clrIfDaterangeError></div>`,
})
class InvalidUseTestComponent {}

@Component({
  template: `<clr-control-error *clrIfDaterangeError>${errorMessage}</clr-control-error>`,
  providers: [
    ClrDaterangepickerContainerComponent,
    ClrPopoverEventsService,
    ClrPopoverToggleService,
    DaterangeControlStateService,
    DaterangeService,
  ],
})
class GeneralErrorTestComponent {}

@Component({
  template: `
    <clr-control-error *clrIfDaterangeError="'required'">${errorMessage}</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'minlength'">${minLengthMessage}</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'maxlength'; error as err">
      ${maxLengthMessage}-{{ err.requiredLength }}-{{ err.actualLength }}
    </clr-control-error>
  `,
  providers: [
    ClrDaterangepickerContainerComponent,
    ClrPopoverEventsService,
    ClrPopoverToggleService,
    DaterangeControlStateService,
    DaterangeService,
  ],
})
class SpecificErrorTestComponent {}

describe('Directive: ClrIfDaterangeErrorDirective', () => {
  describe('invalid use', () => {
    it('throws error when used outside of `ClrDaterangepickerContainerComponent`', () => {
      TestBed.configureTestingModule({
        declarations: [ClrControlError, ClrIfDaterangeErrorDirective, InvalidUseTestComponent],
      });
      expect(() => {
        const fixture = TestBed.createComponent(InvalidUseTestComponent);
        fixture.detectChanges();
      }).toThrow(
        new Error('`ClrIfDaterangeErrorDirective` can only be used within `ClrDaterangepickerContainerComponent`')
      );
    });
  });

  describe('general error', () => {
    let fixture: ComponentFixture<GeneralErrorTestComponent>;
    let daterangeControlStateService: DaterangeControlStateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClrDaterangepickerModule],
        declarations: [ClrControlError, ClrIfDaterangeErrorDirective, GeneralErrorTestComponent],
      });
      fixture = TestBed.createComponent(GeneralErrorTestComponent);
      fixture.detectChanges();
      daterangeControlStateService = fixture.debugElement.injector.get(DaterangeControlStateService);
    });

    it('hides the error initially', () => {
      expect(fixture.nativeElement.innerHTML).not.toContain(errorMessage);
    });

    it('displays the error message after touched on general errors', fakeAsync(() => {
      // Arrange.
      expect(fixture.nativeElement.innerHTML).not.toContain(errorMessage);
      const control = new FormControl('', Validators.required);
      control.markAsTouched();

      // Act.
      daterangeControlStateService.updateStatus(control);
      tick();
      fixture.detectChanges();

      // Assert.
      expect(fixture.nativeElement.innerHTML).toContain(errorMessage);
    }));
  });

  describe('specific error', () => {
    let fixture: ComponentFixture<SpecificErrorTestComponent>;
    let daterangeControlStateService: DaterangeControlStateService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClrDaterangepickerModule],
        declarations: [ClrControlError, ClrIfDaterangeErrorDirective, SpecificErrorTestComponent],
      });
      fixture = TestBed.createComponent(SpecificErrorTestComponent);
      fixture.detectChanges();
      daterangeControlStateService = fixture.debugElement.injector.get(DaterangeControlStateService);
    });

    it('hides the error initially', () => {
      expect(fixture.nativeElement.innerHTML).not.toContain(errorMessage);
    });

    it('displays the error when the specific error is defined', fakeAsync(() => {
      // Arrange.
      expect(fixture.nativeElement.innerHTML).not.toContain(errorMessage);
      const control = new FormControl('', [Validators.required, Validators.minLength(5)]);
      control.markAsTouched();

      // Act.
      daterangeControlStateService.updateStatus(control);
      tick();
      fixture.detectChanges();

      // Assert.
      expect(fixture.nativeElement.innerHTML).toContain(errorMessage);
    }));

    it('hides the message even when it is invalid due to a different validation error', fakeAsync(() => {
      // Arrange.
      expect(fixture.nativeElement.innerHTML).not.toContain(errorMessage);
      const control = new FormControl('abc', [Validators.required, Validators.minLength(5)]);

      // Act.
      daterangeControlStateService.updateStatus(control);
      tick();
      fixture.detectChanges();

      // Assert.
      expect(fixture.nativeElement.innerHTML).not.toContain(errorMessage);
      expect(fixture.nativeElement.innerHTML).toContain(minLengthMessage);
    }));

    it('displays the error message with values from error object in context', fakeAsync(() => {
      // Arrange.
      const control = new FormControl('abcdef', [Validators.maxLength(5)]);

      // Act.
      daterangeControlStateService.updateStatus(control);
      tick();
      fixture.detectChanges();

      // Assert.
      console.log('TEST', fixture.nativeElement);
      expect(fixture.nativeElement.innerHTML).toContain(`${maxLengthMessage}-5-6`);
    }));

    it('updates the error message with values from error object in context', fakeAsync(() => {
      // Arrange.
      const control = new FormControl('abcdef', [Validators.maxLength(5)]);

      // Act.
      daterangeControlStateService.updateStatus(control);
      tick();
      fixture.detectChanges();

      // Assert.
      expect(fixture.nativeElement.innerHTML).toContain(`${maxLengthMessage}-5-6`);

      // Act.
      control.setValue('abcdefg');
      daterangeControlStateService.updateStatus(control);
      tick();
      fixture.detectChanges();

      // Assert.
      expect(fixture.nativeElement.innerHTML).toContain(`${maxLengthMessage}-5-7`);
    }));

    it('should show error only when they are required', fakeAsync(() => {
      // Arrange.
      const control = new FormControl(undefined, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(5),
      ]);
      control.markAsTouched();

      // Required message.
      daterangeControlStateService.updateStatus(control);
      tick();
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML).toContain(errorMessage);
      expect(fixture.nativeElement.innerHTML).not.toContain(minLengthMessage);
      expect(fixture.nativeElement.innerHTML).not.toContain(maxLengthMessage);

      // MinLength message.
      control.setValue('abc');
      daterangeControlStateService.updateStatus(control);
      tick();
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML).not.toContain(errorMessage);
      expect(fixture.nativeElement.innerHTML).toContain(minLengthMessage);
      expect(fixture.nativeElement.innerHTML).not.toContain(maxLengthMessage);

      // MaxLength message.
      control.setValue('abcdef');
      daterangeControlStateService.updateStatus(control);
      tick();
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML).not.toContain(errorMessage);
      expect(fixture.nativeElement.innerHTML).not.toContain(minLengthMessage);
      expect(fixture.nativeElement.innerHTML).toContain(maxLengthMessage);

      // No errors.
      control.setValue('abcde');
      daterangeControlStateService.updateStatus(control);
      tick();
      fixture.detectChanges();
      expect(fixture.nativeElement.innerHTML).not.toContain(errorMessage);
      expect(fixture.nativeElement.innerHTML).not.toContain(minLengthMessage);
      expect(fixture.nativeElement.innerHTML).not.toContain(maxLengthMessage);
    }));
  });
});
