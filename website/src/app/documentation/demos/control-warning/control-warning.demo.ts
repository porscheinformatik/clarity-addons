import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import {
  ClarityModule,
  ClrCheckboxModule,
  ClrComboboxModule,
  ClrCommonFormsModule,
  ClrDatepickerModule,
  ClrInputModule,
  ClrSelectModule,
  ClrTextareaModule,
} from '@clr/angular';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClarityDocComponent } from '../clarity-doc';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';
import { ClrAddonsLabel, ClrAutocompleteOff, ClrIfWarning } from '@porscheinformatik/clr-addons';
import { CodeSnippet } from '../../../utils/code-snippet';
import { AsyncPipe } from '@angular/common';

const INPUT_EXAMPLE = `
<form [formGroup]="inputForm">
  <clr-input-container class="clr-col-12">
    <label class="clr-required-mark">Input label</label>
    <input class="clr-col-2" clrInput formControlName="input" minlength="5" name="inputName" required type="text"/>
    <clr-control-error *clrIfError="'required'">Error message about being required</clr-control-error>
    <clr-control-helper *clrIfWarning="showingInputWarnings" id="inputWarning">This is a warning
    </clr-control-helper>
  </clr-input-container>
</form>
`;

@Component({
  selector: 'app-control-warning',
  templateUrl: './control-warning.demo.html',
  styleUrl: './control-warning.demo.css',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  imports: [
    DocWrapper,
    FormsModule,
    ClrCommonFormsModule,
    ReactiveFormsModule,
    ClrInputModule,
    ClrAddonsLabel,
    ClrAutocompleteOff,
    ClrIfWarning,
    ClrTextareaModule,
    ClrDatepickerModule,
    ClrSelectModule,
    ClrComboboxModule,
    ClrCheckboxModule,
    CodeSnippet,
    CommonModule,
    ClarityModule,
    DocWrapperModule,
    UtilsModule,
    AsyncPipe,
  ],
})
export class ControlWarningDemo extends ClarityDocComponent implements AfterViewInit {
  inputExample = INPUT_EXAMPLE;

  values$ = of([
    'Option 4',
    '<na> Option 5',
    'Option 6 (test)Option 6 (test)Option 6 (test)Option 6 (test)',
    'Option 7',
  ]).pipe(delay(500));
  date: any;
  time: any;
  showingInputWarnings = false;
  isInputFormValidating = false;
  comboBoxWarningString = ' This warning icon was displayed before the error';

  inputForm: FormGroup = new FormGroup<any>({
    input: new FormControl(),
    textArea: new FormControl(),
    select: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    comboSingle: new FormControl(),
    checkbox: new FormControl(),
  });

  constructor() {
    super('control-warning');
  }

  ngAfterViewInit(): void {
    this.isInputFormValidating = true;
    this.inputForm.reset();
  }

  validateInputForm() {
    this.inputForm.markAllAsTouched();
  }

  toggleInputFormValidation() {
    this.isInputFormValidating = !this.isInputFormValidating;
    if (!this.isInputFormValidating) {
      if (!this.showingInputWarnings) {
        this.comboBoxWarningString = ' This warning icon was displayed after the error';
      }
      this.validateInputForm();
    } else {
      this.comboBoxWarningString = ' This warning icon was displayed before the error';

      this.inputForm.reset();
    }
  }

  showTextInputWarnings() {
    this.showingInputWarnings = !this.showingInputWarnings;
  }
}
