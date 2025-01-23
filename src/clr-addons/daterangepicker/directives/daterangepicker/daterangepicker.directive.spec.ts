import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClrDaterangepickerDirective } from './daterangepicker.directive';
import { DaterangeService } from '../../providers/daterange.service';
import { DaterangeParsingService } from '../../providers/daterange-parsing.service';
import { DaterangeControlStateService } from '../../providers/daterange-control-state.service';
import { ControlIdService } from '../../../abstract-form-component/control-id.service';
import { NullableDaterange } from '../../interfaces/daterange.interface';
import { DayModel } from '../../models/day.model';
import { NullableTimerange, TimeModel } from '@porscheinformatik/clr-addons';

@Component({
  template: `<input
    [formControl]="control"
    clrDaterangepicker
    [min]="minDate"
    [max]="maxDate"
    (valueChange)="onValueChange($event)"
    type="date"
  />`,
  standalone: false,
})
class TestHostComponent {
  control = new FormControl();
  minDate: string | null = null;
  maxDate: string | null = null;
  selectedRange: NullableDaterange | null = null;

  onValueChange(range: NullableDaterange) {
    this.selectedRange = range;
  }
}

describe('ClrDaterangepickerDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let inputEl: DebugElement;
  let directive: ClrDaterangepickerDirective;
  const daterangeService = new DaterangeService();
  let daterangeParsingService: jasmine.SpyObj<DaterangeParsingService>;
  let daterangeControlStateService: jasmine.SpyObj<DaterangeControlStateService>;
  let controlIdService: jasmine.SpyObj<ControlIdService>;

  beforeEach(() => {
    daterangeParsingService = jasmine.createSpyObj(
      'DaterangeParsingService',
      ['parse', 'toLocaleString', 'toLocaleStringWithTime'],
      {
        localeFormat: 'MM/DD/YYYY',
      }
    );
    daterangeControlStateService = jasmine.createSpyObj('DaterangeControlStateService', ['updateStatus'], {
      disabled: false,
      focused: false,
    });
    controlIdService = jasmine.createSpyObj('ControlIdService', [], { id: 'test-id' });

    TestBed.configureTestingModule({
      declarations: [ClrDaterangepickerDirective, TestHostComponent],
      imports: [ReactiveFormsModule, FormsModule], // Import FormsModule and ReactiveFormsModule
      providers: [
        { provide: DaterangeService, useValue: daterangeService },
        { provide: DaterangeParsingService, useValue: daterangeParsingService },
        { provide: DaterangeControlStateService, useValue: daterangeControlStateService },
        { provide: ControlIdService, useValue: controlIdService },
        { provide: ElementRef, useValue: new ElementRef(document.createElement('input')) },
        { provide: Renderer2, useValue: jasmine.createSpyObj('Renderer2', ['setProperty']) },
      ],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    inputEl = fixture.debugElement.query(By.directive(ClrDaterangepickerDirective));
    directive = inputEl.injector.get(ClrDaterangepickerDirective);
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should set placeholder text based on the configuration', () => {
    directive.placeholder = 'Custom Placeholder';
    fixture.detectChanges();
    expect(directive.placeholderText).toBe('Custom Placeholder');

    directive.placeholder = undefined;
    daterangeService.timeActive = false;
    fixture.detectChanges();
    expect(directive.placeholderText).toContain('MM/DD/YYYY');
  });

  it('should call blurEvent and set focused to false when input loses focus', () => {
    daterangeControlStateService.focused = true;
    inputEl.triggerEventHandler('blur', null);
    expect(daterangeControlStateService.focused).toBeFalse();
  });

  it('should be null on change', () => {
    inputEl.triggerEventHandler('change', { value: null });
    expect(daterangeService.selectedDaterange).toEqual(null);
  });

  it('should write correct value for regex week', () => {
    const now = new Date();
    now.setDate(now.getDate() - Number(2) * 7);
    directive.onChangeEvent({ value: '2w' } as HTMLInputElement);
    expect(daterangeService.selectedDaterange.from.isEqual(new DayModel(now))).toBe(true);
  });

  it('should write correct value for regex days', () => {
    const now = new Date();
    now.setDate(now.getDate() - Number(3));
    directive.onChangeEvent({ value: '3d' } as HTMLInputElement);
    expect(daterangeService.selectedDaterange.from.isEqual(new DayModel(now))).toBe(true);
  });

  it('should write correct value for regex hours', () => {
    directive.onChangeEvent({ value: '4h' } as HTMLInputElement);
    expect(
      (daterangeService.selectedDaterange as NullableTimerange).fromTime.isEqual(
        new TimeModel(new Date(new Date().getTime() - Number(4) * 3600000))
      )
    ).toBe(true);
  });

  it('should write value via ControlValueAccessor', () => {
    const daterange: NullableDaterange = { from: new DayModel('2023-01-01'), to: new DayModel('2023-01-31') };
    directive.writeValue(daterange);
    expect(daterangeService.selectedDaterange.from.isEqual(new DayModel('2023-01-01'))).toBe(true);
  });

  it('should set the input type to text', () => {
    expect(inputEl.attributes['type']).toBe('date');
  });
});
