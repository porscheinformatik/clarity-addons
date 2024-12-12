import { AfterViewChecked, Directive, ElementRef, Injector, Input, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[clrReadonly]',
})
export class ClrReadonlyDirective implements AfterViewChecked {
  @Input('clrMulti') isMultiSelect: boolean = false;
  @Input('clrUnitPosition') unitPosition: 'left' | 'right' = 'right';
  @Input('clrReadOnlyProperty') arrayPosition: string | null = null;
  @Input('clrReadonly') clrReadOnly: boolean = true;

  private readonly originalElement: HTMLElement;
  private isInitialized = false;
  private isList: boolean = false;
  private isNumeric: boolean = false;
  private ngControl: NgControl;

  constructor(
    private elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly injector: Injector
  ) {
    this.originalElement = elementRef.nativeElement;
  }

  ngAfterViewChecked(): void {
    this.ngControl = this.injector.get(NgControl, null);
    if (!this.isInitialized && this.ngControl.value != null) {
      this.isInitialized = true;
      this.renderAsSpan();
    }
  }

  private renderAsSpan(): void {
    const parentElement = this.originalElement.parentElement;
    if (!parentElement) {
      return;
    }

    this.handleDifferentControlTypes();

    // Create a new span element to display the readonly value.
    const span = this.renderer.createElement('span');

    const formattedValue = this.formatControlValue(this.ngControl);
    const textNode = this.renderer.createText(formattedValue);

    // Add text and classes to the span element.
    this.renderer.appendChild(span, textNode);
    this.renderer.setAttribute(span, 'class', 'clr-readonly');
    this.renderer.addClass(parentElement, 'clr-readonly-parent');

    // Hide all child elements of the parent and append the new span.
    this.hideAllChildren(parentElement);
    this.renderer.setStyle(this.originalElement, 'display', 'none');
    this.renderer.appendChild(parentElement, span);
  }

  private hideAllChildren(parentElement: HTMLElement): void {
    Array.from(parentElement.childNodes).forEach(childNode => {
      if (childNode instanceof HTMLElement) {
        this.renderer.setStyle(childNode, 'display', 'none');
      }
    });
  }

  private handleDifferentControlTypes() {
    if (this.elementRef.nativeElement.attributes['clrnumeric']) {
      this.isNumeric = true;
    }

    this.isList = this.elementRef.nativeElement.tagName.toLowerCase() === 'select';
  }

  private formatControlValue(ngControl: NgControl): string {
    const controlValue = ngControl.control.value;

    if (this.isNumeric) {
      return this.formatNumericValue(controlValue);
    }

    if (this.isMultiSelect) {
      return this.formatMultiSelectValue(controlValue);
    }

    if (this.isList) {
      return this.formatListValue();
    }

    return controlValue ?? '';
  }

  private formatNumericValue(controlValue: any): string {
    let unit = '';

    if (this.elementRef.nativeElement.attributes['clrunit']) {
      unit = this.elementRef.nativeElement.attributes['clrunit'].value;
    }

    return this.unitPosition === 'left' ? `${unit} ${controlValue}` : `${controlValue} ${unit}`;
  }

  private formatMultiSelectValue(controlValue: any): string {
    return controlValue.map((item: Record<string, any>) => item[this.arrayPosition!]).join(', ');
  }

  private formatListValue() {
    const selectedOption = this.elementRef.nativeElement.options[this.elementRef.nativeElement.selectedIndex];
    return selectedOption ? selectedOption.textContent || selectedOption.innerText : null;
  }
}
