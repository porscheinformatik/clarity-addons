import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { DaterangePreset, DayModel, NullableDaterange } from '@porscheinformatik/clr-addons';

const BASIC_DEMO = `
<form clrForm>
  <clr-daterangepicker-container>
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
  <clr-daterangepicker-container fromLabel="Van" toLabel="Tot">
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
  basicDemo = BASIC_DEMO;
  minMaxDemo = MIN_MAX_DEMO;
  presets = PRESETS;
  presetsDemo = PRESETS_DEMO;
  presetsTypescriptDemo = PRESETS_TYPESCRIPT_DEMO;
  positionsDemo = POSITIONS_DEMO;
  labelsTranslationDemo = LABELS_TRANSLATION_DEMO;
  separatorDemo = SEPARATOR_DEMO;
  placeholderDemo = PLACEHOLDER_DEMO;
  validationDemo = VALIDATION_DEMO;

  constructor() {
    super('daterangepicker');
  }
}
