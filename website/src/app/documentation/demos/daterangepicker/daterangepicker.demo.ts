import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { NullableDaterange } from '@porscheinformatik/clr-addons';

const BASIC_DEMO = `
<form clrForm>
  <clr-daterangepicker-container>
    <label>Basic Demo</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;
const MIN_MAX_DEMO = `
<form clrForm>
  <clr-daterangepicker-container>
    <label>Min date: 2023-05-03 AND Max date: 2023-06-20</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" min="2023-05-03" max="2023-06-20" />
    <clr-control-error *clrIfDaterangeError="'min'; error as err">
      Daterange minimum is {{ err.min.toDate() | date }}
    </clr-control-error>
    <clr-control-error *clrIfDaterangeError="'max'; error as err">
      Daterange maximum is {{ err.max.toDate() | date }}
    </clr-control-error>
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

  constructor() {
    super('daterangepicker');
  }
}
