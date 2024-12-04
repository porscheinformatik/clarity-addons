import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import {
  DaterangePreset,
  DayModel,
  NullableDaterange,
  NullableTimerange,
  TimeModel,
} from '@porscheinformatik/clr-addons';

const BASIC_DEMO = `
<form clrForm>
  <clr-daterangepicker-container>
    <label>Basic demo</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;
const BASIC_TIME_DEMO = `
<form clrForm>
  <clr-daterangepicker-container [timeSelection]="true">
    <label>Basic demo</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;
const MIN_MAX_DEMO = `
<form clrForm>
  <clr-daterangepicker-container>
    <label>Min date: 2023-05-03 AND Max date: 2023-06-20</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" min="2023-05-03" max="2023-06-20" />
    <clr-control-error *clrIfDaterangeError="'min'; error as err">Daterange minimum is {{ err.min.toDate() | date }}</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'max'; error as err">Daterange maximum is {{ err.max.toDate() | date }}</clr-control-error>
  </clr-daterangepicker-container>
</form>
`;
const PRESETS_DEMO = `
<form clrForm>
  <clr-daterangepicker-container [presets]="presets">
    <label>Presets</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;
const PRESETS_TIME_DEMO = `
<form clrForm>
  <clr-daterangepicker-container [presets]="presetsTime" [timeSelection]="true">
    <label>Presets</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;
const PRESETS_TYPESCRIPT_DEMO = `
presets: Array<DaterangePreset> = [
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
`;
const PRESETS_TIME_TYPESCRIPT_DEMO = `
presets: Array<DaterangePreset> = [
  {
    text: 'Last 5 minute',
    range: () => ({
      from: new DayModel(new Date()),
      to: new DayModel(new Date()),
      fromTime: new TimeModel(new Date(new Date().getTime() - 5000 * 60)),
      toTime: new TimeModel(new Date()),
    }),
  },
  {
    text: 'Last 1 hour',
    range: () => ({
      from: new DayModel(new Date()),
      to: new DayModel(new Date()),
      fromTime: new TimeModel(new Date(new Date().getTime() - 60000 * 60)),
      toTime: new TimeModel(new Date()),
    }),
  },
];
`;
const PRESETS: Array<DaterangePreset> = [
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

const PRESETS_TIME: Array<DaterangePreset> = [
  {
    text: 'Last 5 minute',
    range: () => ({
      from: new DayModel(new Date()),
      to: new DayModel(new Date()),
      fromTime: new TimeModel(new Date(new Date().getTime() - 5000 * 60)),
      toTime: new TimeModel(new Date()),
    }),
  },
  {
    text: 'Last 1 hour',
    range: () => ({
      from: new DayModel(new Date()),
      to: new DayModel(new Date()),
      fromTime: new TimeModel(new Date(new Date().getTime() - 60000 * 60)),
      toTime: new TimeModel(new Date()),
    }),
  },
];
const POSITIONS_DEMO = `
<form clrForm>
  <clr-daterangepicker-container [clrPosition]="'left-top'">
    <label>Position</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;
const LABELS_TRANSLATION_DEMO = `
<form clrForm>
  <clr-daterangepicker-container labelFrom="Van" labelTo="Tot">
    <label>Labels "from" and "to"</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;
const SEPARATOR_DEMO = `
<form clrForm>
  <clr-daterangepicker-container>
    <label>Separator</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" separatorText=" tot " />
  </clr-daterangepicker-container>
</form>
`;
const PLACEHOLDER_DEMO = `
<form clrForm>
  <clr-daterangepicker-container>
    <label>Placeholder</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" placeholder="Custom placeholder" />
  </clr-daterangepicker-container>
</form>
`;
const VALIDATION_DEMO = `
<form clrForm>
  <clr-daterangepicker-container>
    <label>Validation</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" min="2023-05-03" max="2023-06-20" required />
    <clr-control-helper>Helper text.</clr-control-helper>
    <clr-control-error *clrIfDaterangeError="'required'">Daterange is mandatory!</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'fromIsAfterTo'">Date "from" must be before date "to"!</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'min'; error as err">Daterange minimum is {{ err.min.toDate() | date }}</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'max'; error as err">Daterange maximum is {{ err.max.toDate() | date }}</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'invalid'">No valid daterange value!</clr-control-error>
    <clr-control-success>✅ Valid.</clr-control-success>
  </clr-daterangepicker-container>
</form>
`;

@Component({
  selector: 'clr-daterangepicker-demo',
  templateUrl: './daterangepicker.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class DaterangepickerDemo extends ClarityDocComponent {
  value: NullableDaterange;
  valueTime: NullableTimerange;
  basicDemo = BASIC_DEMO;
  basicTimeDemo = BASIC_TIME_DEMO;
  minMaxDemo = MIN_MAX_DEMO;
  presets = PRESETS;
  presetsTime = PRESETS_TIME;
  presetsDemo = PRESETS_DEMO;
  presetsTimeDemo = PRESETS_TIME_DEMO;
  presetsTypescriptDemo = PRESETS_TYPESCRIPT_DEMO;
  presetsTimeTypescriptDemo = PRESETS_TIME_TYPESCRIPT_DEMO;
  positionsDemo = POSITIONS_DEMO;
  labelsTranslationDemo = LABELS_TRANSLATION_DEMO;
  separatorDemo = SEPARATOR_DEMO;
  placeholderDemo = PLACEHOLDER_DEMO;
  validationDemo = VALIDATION_DEMO;

  constructor() {
    super('daterangepicker');
  }
}
