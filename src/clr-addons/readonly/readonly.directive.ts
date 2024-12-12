import { AfterViewChecked, Directive, ElementRef, Injector, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { formatNumber } from '../util';

@Directive({
  selector: '[clrReadonly]',
})
export class ClrReadonlyDirective implements AfterViewChecked {
  @Input('clrMulti') isMultiSelect: boolean = false;
  @Input('clrUnitPosition') unitPosition: 'left' | 'right' = 'right';
  @Input('clrReadOnlyProperty') property: string | null = null;
  @Input('clrReadonly') clrReadOnly: boolean = true;
  @Input('clrUnit') unit: string | '' = '';

  @Input('clrDecimalPlaces') decimalPlaces = 2;
  @Input('clrRoundDisplayValue') roundValue = false;
  @Input('clrAutofillDecimals') autofillDecimals = false;
  @Input('clrDecimalSep') decimalSeparator = ',';
  @Input('clrGroupingSep') groupingSeparator = '.';

  private isInitialized = false;

  constructor(
    private elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly injector: Injector
  ) {}

  ngAfterViewChecked(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (!this.isInitialized && ngControl.value != null) {
      this.isInitialized = true;
      this.renderAsSpan(ngControl);
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

    // Hide all child elements of the parent and append the new span.
    this.hideAllChildren(parentElement);
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    this.renderer.appendChild(parentElement, span);
  }

  private hideAllChildren(parentElement: HTMLElement): void {
    Array.from(parentElement.childNodes).forEach(childNode => {
      if (childNode instanceof HTMLElement) {
        this.renderer.setStyle(childNode, 'display', 'none');
      }
    });
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

    const controlValue = ngControl.control.value;

    if (controlType === 'numeric') {
      return this.formatNumericValue(controlValue);
    } else if (this.isMultiSelect) {
      return this.formatMultiSelectValue(controlValue);
    } else if (controlType === 'select') {
      return this.formatListValue();
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

  private formatMultiSelectValue(controlValue: any): string {
    return controlValue.map((item: Record<string, any>) => item[this.property!]).join(', ');
  }

  private formatListValue() {
    const selectedOption = this.elementRef.nativeElement.options[this.elementRef.nativeElement.selectedIndex];
    return selectedOption ? selectedOption.textContent || selectedOption.innerText : null;
  }
}
