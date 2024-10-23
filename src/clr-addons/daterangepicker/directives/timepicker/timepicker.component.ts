import { Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'clr-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrl: './timepicker.component.scss',
})
export class ClrTimepickerComponent implements OnDestroy {
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
  public valueChange = new EventEmitter<string>();

  protected get time(): string | undefined | null {
    return this.value;
  }

  /**
   * Set date.
   */
  protected set time(val: string | undefined | null) {
    this.value = val; // == null ? null : new TimeModel(val);
    this.valueChange.emit(this.value);
  }

  /** List of subscriptions to later destroy. */
  private subscriptions: Array<Subscription> = [];

  public constructor() {}

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Focus input.
   */
  public focus(): void {
    this.inputElm.nativeElement.focus();
  }
}
