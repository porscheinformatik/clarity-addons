import { AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[clrIfWarning]',
  standalone: false,
})
export class ClrIfWarning implements AfterViewInit {
  private hostElement: Element;
  private formContainer: Element;
  private icon = this.renderer.createElement('cds-icon');

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
    private renderer: Renderer2,
    private host: ElementRef
  ) {}

  @Input() set clrIfWarning(clrIfWarning: boolean) {
    if (clrIfWarning) {
      this.container.createEmbeddedView(this.template);
      setTimeout(() => {
        this.hostElement = this.host.nativeElement?.previousElementSibling;
        const wrapper = this.hostElement?.previousElementSibling;
        this.formContainer = this.getFormContainer(wrapper);
        //Radio buttons have no wrapper
        if (!wrapper) {
          this.formContainer = this.getFormContainer(this.hostElement?.parentElement);
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

  getFormContainer(element: Element) {
    return element?.parentElement;
  }

  ngAfterViewInit(): void {
    this.icon.setAttribute('shape', 'exclamation-triangle');
    this.renderer.addClass(this.icon, 'clr-control-warning-icon');
  }

  resetControlStyles() {
    if (this.hostElement) {
      this.renderer.removeClass(this.hostElement, 'clr-warning');
    }
    if (this.formContainer) {
      this.renderer.removeClass(this.formContainer, 'clr-warning');
    }
  }

  setControlStyles() {
    if (this.hostElement) {
      this.renderer.addClass(this.hostElement, 'clr-warning');
    }
    if (this.formContainer) {
      this.renderer.addClass(this.formContainer, 'clr-warning');
    }
  }
}
