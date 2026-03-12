export const FOCUS_FIRST_INVALID_EXAMPLE = `
<form clrForm clrFocusFirstInvalidField (ngSubmit)="onSubmit()">
  <clr-input-container class="clr-col-12">
    <label class="clr-required-mark">Input Field (required)</label>
    <input
      clrInput
      type="text"
      [(ngModel)]="inputField"
      name="inputField"
      placeholder="Please fill this field"
      required
    />
    <clr-control-error *clrIfError="'required'">This field is required</clr-control-error>
  </clr-input-container>

  <clr-textarea-container class="clr-col-12">
    <label class="clr-required-mark">Textarea Field (required)</label>
    <textarea
      clrTextarea
      [(ngModel)]="textAreaField"
      name="textAreaField"
      placeholder="Please fill this field"
      required
    ></textarea>
    <clr-control-error *clrIfError="'required'">This field is required</clr-control-error>
  </clr-textarea-container>

  <clr-select-container class="clr-col-12">
    <label class="clr-required-mark">Select Field (required)</label>
    <select clrSelect [(ngModel)]="selectField" name="selectField" required>
      <option value="" disabled selected>Select an option...</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
    </select>
    <clr-control-error *clrIfError="'required'">This field is required</clr-control-error>
  </clr-select-container>

  <button class="btn btn-primary" type="submit">Submit Form</button>
</form>
`;

export const CONTROL_ENTER_BASIC_EXAMPLE = `
<!-- 1. With tooltip -->
<form clrForm [clrControlEnterSubmit]="'Ctrl(Cmd) + Enter to submit'" (ngSubmit)="onCtrlEnterSubmit()" #form="ngForm">
  <clr-input-container>
    <label>Press Ctrl+Enter here</label>
    <input clrInput [(ngModel)]="ctrlEnterModel" name="ctrlEnterModel" />
  </clr-input-container>
  <button class="btn btn-primary" type="submit">Submit</button>
</form>

<!-- 2. Without tooltip -->
<form clrForm clrControlEnterSubmit (ngSubmit)="onCtrlEnterSubmit()">
  <!-- ... form fields ... -->
  <button class="btn btn-primary" type="submit">Submit</button>
</form>
`;

export const CONTROL_ENTER_TRANSLATION_EXAMPLE = `
<form clrForm [clrControlEnterSubmit]="'Ctrl+Enter to submit'" (ngSubmit)="onSubmit()`;
