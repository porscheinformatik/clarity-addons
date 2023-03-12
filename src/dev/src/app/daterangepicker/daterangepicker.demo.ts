import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DaterangePreset,
  DayModel,
  NullableDaterange,
  PopoverPosition,
  PopoverPositions,
} from '../../../../clr-addons/daterangepicker';

@Component({
  selector: 'clr-daterangepicker-demo',
  templateUrl: './daterangepicker.demo.html',
  styleUrls: ['./daterangepicker.demo.scss'],
})
export class DaterangepickerDemo {
  reactiveForm = new FormGroup({
    daterange: new FormControl(null),
    date: new FormControl(null),
    otherValue: new FormControl(''),
  });

  templateDrivenValue: NullableDaterange = null;

  validationForm = new FormGroup({
    daterange: new FormControl(null, {
      validators: [Validators.required],
    }),
  });
  minDate = new Date(2023, 0, 1);
  maxDate = new Date(2024, 11, 31);

  configurationValue: NullableDaterange = null;

  presets = DATERANGEPICKER_PRESETS;

  presetsI18n: Array<DaterangePreset> = [
    {
      text: 'Laatste 30 days',
      range: () => ({
        from: new DayModel(new Date()).incrementBy(-29),
        to: new DayModel(new Date()),
      }),
    },
  ];

  position: PopoverPosition = 'top-right';
  positions = PopoverPositions.options;

  public updateReactiveForm(): void {
    this.reactiveForm.patchValue({
      daterange: {
        from: new DayModel(new Date()),
        to: new DayModel(new Date()).incrementBy(7),
      },
    });
  }

  public updateTemplateDriven(): void {
    this.templateDrivenValue = {
      from: new DayModel(new Date()),
      to: new DayModel(new Date()).incrementBy(7),
    };
  }

  public triggerRequiredValidation(): void {
    this.validationForm.patchValue({ daterange: null });
  }

  public triggerPartialRequiredValidation(): void {
    this.validationForm.patchValue({ daterange: { from: null, to: null } });
  }

  public triggerFromIsAfterToValidation(): void {
    this.validationForm.patchValue({
      daterange: {
        from: new DayModel(2023, 5, 3),
        to: new DayModel(2023, 4, 3),
      },
    });
  }

  public triggerMinMaxValidation(): void {
    this.validationForm.patchValue({
      daterange: {
        from: new DayModel(2020, 4, 3),
        to: new DayModel(2030, 4, 3),
      },
    });
  }

  public triggerSuccess(): void {
    this.validationForm.patchValue({
      daterange: {
        from: new DayModel(2023, 4, 3),
        to: new DayModel(2023, 5, 3),
      },
    });
  }
}

const DATERANGEPICKER_PRESETS: Array<DaterangePreset> = [
  {
    text: 'Last 30 days',
    range: () => ({
      from: new DayModel(new Date()).incrementBy(-29),
      to: new DayModel(new Date()),
    }),
  },
  {
    text: 'From today',
    range: () => ({
      from: new DayModel(new Date()),
      to: null,
    }),
  },
  {
    text: 'Until today',
    range: () => ({
      from: null,
      to: new DayModel(new Date()),
    }),
  },
  {
    text: 'Clear',
    range: () => ({
      from: null,
      to: null,
    }),
  },
];
