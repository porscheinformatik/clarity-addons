import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-control-warning',
  templateUrl: './control-warning.demo.html',
  styleUrl: './control-warning.demo.css',
})
export class ControlWarningDemo {
  public form = new FormGroup({});
  public shouldShowWarning = false;

  constructor() {
    //nothing
  }

  public toggleWarning() {
    this.shouldShowWarning = !this.shouldShowWarning;
  }
}
