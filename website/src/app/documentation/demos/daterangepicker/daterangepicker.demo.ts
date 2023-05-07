import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const BASIC_DEMO = `
<form clrForm>
  <clr-daterangepicker-container>
    <label>Daterange</label>
    <input clrDaterangepicker type="date" name="daterange" [(ngModel)]="value" />
  </clr-daterangepicker-container>
</form>
`;
const MIN_MAX_DEMO = `
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
  value: string;
  basicDemo = BASIC_DEMO;
  minMaxDemo = MIN_MAX_DEMO;

  constructor() {
    super('daterangepicker');
  }
}
