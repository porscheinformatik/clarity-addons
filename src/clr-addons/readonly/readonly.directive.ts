import { AfterViewInit, Directive, ElementRef, Injector, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { formatNumber } from '../util';

@Directive({
  selector: '[clrReadonly]',
  standalone: false,
})
export class ClrReadonlyDirective implements OnChanges, OnInit, AfterViewInit {
  @Input('clrUnitPosition') unitPosition = 'right';
  @Input('clrReadOnlyProperty') property: string | null = null;
  @Input('clrReadonly') clrReadOnly: boolean = true;
  @Input('clrUnit') unit: string = '';

  @Input('clrDecimalPlaces') decimalPlaces = 2;
  @Input('clrRoundDisplayValue') roundValue = false;
  @Input('clrAutofillDecimals') autofillDecimals = false;
  @Input('clrDecimalSep') decimalSeparator = ',';
  @Input('clrGroupingSep') groupingSeparator = '.';

  constructor(
    private elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly injector: Injector
  ) {}

  private isInitialized = false;

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (this.clrReadOnly) {
      this.renderAsSpan(ngControl);
    }
  }

  ngOnChanges(): void {
    if (this.isInitialized) {
      const ngControl = this.injector.get(NgControl, null);
      if (this.clrReadOnly) {
        this.renderAsSpan(ngControl);
      } else {
        this.resetReadonly();
      }
    }
  }

  ngAfterViewInit(): void {
    this.isInitialized = true;
  }

  private resetReadonly() {
    const parentElement = this.elementRef.nativeElement.parentElement;
    this.renderer.removeClass(parentElement, 'clr-readonly-parent');
    const spanElement = this.elementRef.nativeElement.parentElement.querySelector('span.clr-readonly');
    if (spanElement != null) {
      this.renderer.removeChild(parentElement, spanElement);
    }
  }

  private renderAsSpan(ngControl: NgControl): void {
    const parentElement = this.elementRef.nativeElement.parentElement;
    if (!parentElement) {
      return;
    }

    // Create a new span element to display the readonly value.
    const span = this.renderer.createElement('span');

    const formattedValue = this.formatControlValue(ngControl);
    const textNode = this.renderer.createText(formattedValue);

    // Add text and classes to the span element.
    this.renderer.appendChild(span, textNode);
    this.renderer.setAttribute(span, 'class', 'clr-readonly');
    this.renderer.addClass(parentElement, 'clr-readonly-parent');
    this.renderer.appendChild(parentElement, span);
  }

  private determineControlType() {
    if (this.elementRef.nativeElement.attributes['clrnumeric']) {
      return 'numeric';
    } else if (this.elementRef.nativeElement.tagName.toLowerCase() === 'select') {
      return 'select';
    } else {
      return '';
    }
  }

  private formatControlValue(ngControl: NgControl): string {
    const controlType = this.determineControlType();
    const controlValue = ngControl instanceof NgModel ? ngControl.model : ngControl.control?.value;

    if (controlValue == null || controlValue === '') {
      return '';
    }

    if (controlType === 'numeric') {
      return this.formatNumericValue(controlValue);
    } else if (this.property) {
      return this.formatValueForObjectValue(controlValue);
    } else if (controlType === 'select') {
      return this.formatListValue(controlValue);
    }

    return controlValue ?? '';
  }

  private formatNumericValue(controlValue: string): string {
    const result = formatNumber(
      controlValue + '',
      true,
      this.decimalSeparator,
      this.groupingSeparator,
      this.decimalPlaces,
      this.autofillDecimals
    );
    return this.unitPosition === 'left' ? `${this.unit} ${result}` : `${result} ${this.unit}`;
  }

  private formatValueForObjectValue(controlValue: any): string {
    if (Array.isArray(controlValue)) {
      return controlValue.map((item: Record<string, any>) => item[this.property!]).join(', ');
    } else {
      return controlValue[this.property!];
    }
  }

  private formatListValue(controlValue: any) {
    const options: HTMLOptionElement[] = this.elementRef.nativeElement.querySelectorAll('option');
    const matchingOption = Array.from(options).find(option => option.value === controlValue);
    if (matchingOption) {
      return matchingOption.innerHTML;
    } else {
      return '';
    }
  }
}
