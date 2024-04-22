import { AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[clrIfWarning]',
})
export class ClrIfWarning implements AfterViewInit {
  icon = this.renderer.createElement('cds-icon');
  hostElement: Element;
  inputElement: Element;
  inputGroup: Element;
  comboboxWrapper: Element;
  focusIndicator: Element;
  private textArea: Element;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
    private renderer: Renderer2,
    private host: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.icon.setAttribute('shape', 'exclamation-triangle');
    this.renderer.addClass(this.icon, 'clr-control-warning-icon');
  }

  @Input() set clrIfWarning(clrIfWarning: boolean) {
    if (clrIfWarning) {
      this.container.createEmbeddedView(this.template);
      setTimeout(() => {
        this.hostElement = this.host.nativeElement?.previousElementSibling;
        const wrapper = this.hostElement?.previousElementSibling;
        this.setInputComponents();
        //Radio buttons have no wrapper
        if (!wrapper) {
          this.renderer.insertBefore(this.hostElement?.parentElement, this.icon, this.hostElement);
        }
        //if an error icon is already present, place the icon in the parent
        if (wrapper?.classList?.contains('clr-validate-icon')) {
          this.renderer.insertBefore(wrapper.parentElement, this.icon, wrapper?.nextSibling);
        } else {
          this.renderer.insertBefore(wrapper, this.icon, wrapper?.previousElementSibling);
        }
        this.setControlStyles();
      });
    } else {
      this.resetControlStyles();
      this.icon.remove();
      this.container.clear();
    }
  }

  setInputComponents() {
    if (this.hostElement) {
      const parent = this.renderer.parentNode(this.hostElement);
      this.comboboxWrapper = this.hasComboBox(parent);
      this.focusIndicator = this.hasFocusIndicator(parent);
      this.inputElement = this.hasInput(parent?.querySelector('[class^="clr-"][class$="-wrapper"]'));
      this.inputGroup = this.hasGroup(parent?.querySelector('[class^="clr-"][class$="-wrapper"]'));
      this.textArea = this.hasTextArea(parent?.querySelector('[class^="clr-"][class$="-wrapper"]'));
    }
  }

  hasInput(element: Element) {
    if (element && element?.querySelectorAll('input, select').length >= 1) {
      return element?.querySelectorAll('input, select')[0];
    }
    return null;
  }

  hasComboBox(element: Element) {
    return element?.querySelector('[class*="clr-combobox-wrapper"]');
  }
  hasTextArea(element: Element) {
    return element?.querySelector('[class*="clr-textarea"]');
  }

  hasGroup(element: Element) {
    return element?.querySelector('[class*="-group"]');
  }

  hasFocusIndicator(element: Element) {
    return element?.querySelector('[class*="clr-focus-indicator"]');
  }

  resetControlStyles() {
    this.focusIndicator ? this.renderer.removeClass(this.focusIndicator, 'clr-warning') : null;
    this.comboboxWrapper ? this.renderer.removeClass(this.comboboxWrapper, 'clr-warning') : null;
    this.inputElement ? this.renderer.removeClass(this.inputElement, 'clr-warning') : null;
    this.inputGroup ? this.renderer.removeClass(this.inputGroup, 'clr-warning') : null;
    this.textArea ? this.renderer.removeClass(this.textArea, 'clr-warning') : null;
  }

  setControlStyles() {
    this.focusIndicator ? this.renderer.addClass(this.focusIndicator, 'clr-warning') : null;
    this.comboboxWrapper ? this.renderer.addClass(this.comboboxWrapper, 'clr-warning') : null;
    this.inputElement ? this.renderer.addClass(this.inputElement, 'clr-warning') : null;
    this.inputGroup ? this.renderer.addClass(this.inputGroup, 'clr-warning') : null;
    this.textArea ? this.renderer.addClass(this.textArea, 'clr-warning') : null;
  }
}
