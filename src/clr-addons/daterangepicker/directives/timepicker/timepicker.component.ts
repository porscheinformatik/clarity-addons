import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TimeModel } from '../../models/time.model';

@Component({
  selector: 'clr-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.scss',
  standalone: false,
})
export class ClrTimepickerComponent {
  /**
   * Input value.
   */
  @Input()
  public value: string;

  /**
   * Activate/Deactivate seconds handling.
   */
  @Input()
  public activateSeconds = false;

  /**
   * Input control.
   */
  @ViewChild('inputElm')
  private inputElm!: ElementRef<HTMLInputElement>;

  /**
   * Event triggered when value changes.
   */
  @Output()
  public valueChange = new EventEmitter<TimeModel>();

  protected get time(): any | undefined | null {
    if (typeof this.value === 'string') {
      return this.value;
    }
    if (this.value) {
      return (this.value as TimeModel).toHTML5SpecTimeString();
    }
  }

  /**
   * Set time.
   */
  protected set time(val: string | undefined | null) {
    this.value = val;
    this.valueChange.emit(!val ? null : new TimeModel(val));
  }

  public constructor() {}

  /**
   * Focus input.
   */
  public focus(): void {
    this.inputElm.nativeElement.focus();
  }
}
