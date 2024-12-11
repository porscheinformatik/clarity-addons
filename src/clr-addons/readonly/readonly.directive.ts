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
    if (this.isNumeric) {
      return this.formatNumericValue(ngControl);
    }

    if (this.isMultiSelect) {
      return this.formatMultiSelectValue(ngControl);
    }

    if (this.isList) {
      return this.formatListValue();
    }

    return ngControl.value ?? '';
  }

  private formatNumericValue(ngControl: NgControl): string {
    let unit = '';
    if (this.elementRef.nativeElement.attributes['clrunit']) {
      unit = this.elementRef.nativeElement.attributes['clrunit'].value;
    }

    return this.unitPosition === 'left' ? `${unit} ${ngControl.value}` : `${ngControl.value} ${unit}`;
  }

  private formatMultiSelectValue(ngControl: NgControl): string {
    return ngControl.value.map((item: Record<string, any>) => item[this.arrayPosition!]).join(', ');
  }

  private formatListValue() {
    const selectedOption = this.elementRef.nativeElement.options[this.elementRef.nativeElement.selectedIndex];
    return selectedOption ? selectedOption.textContent || selectedOption.innerText : null;
  }
}
