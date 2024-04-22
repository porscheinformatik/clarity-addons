import { AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[clrIfWarning]',
})
export class ClrIfWarning implements AfterViewInit {
  icon = this.renderer.createElement('cds-icon');
  hostElement: Element;
  inputElement: Element;

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
        this.setInputElement();
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

  setInputElement() {
    if (this.hostElement) {
      const parent = this.renderer.parentNode(this.hostElement);
      console.log(this.hasFocusIndicator(parent));
      const container = parent?.querySelector('[class^="clr-"][class$="-wrapper"]');

      this.inputElement = container?.querySelectorAll('input, select')[0];
    }
  }

  hasGroup(element: Element) {
    return element?.querySelector('[class*="-group"]') !== null;
  }

  hasFocusIndicator(element: Element) {
    console.log(element?.querySelector('[class*="clr-focus-indicator"]'));
    return element?.querySelector('[class*="clr-focus-indicator"]') !== null;
  }

  resetControlStyles() {
    if (this.inputElement) {
      this.renderer.removeClass(this.inputElement, 'clr-control-warning');
    }
  }

  setControlStyles() {
    if (this.inputElement) {
      this.renderer.addClass(this.inputElement, 'clr-control-warning');
    }
  }
}
