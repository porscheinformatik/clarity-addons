import { ComponentRef, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { ClrIcon } from '@clr/angular';

@Directive({
  selector: '[clrIfWarning]',
  standalone: false,
})
export class ClrIfWarning {
  private hostElement: Element;
  private formContainer: Element;
  private iconRef: ComponentRef<ClrIcon>;

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

        if (!this.iconRef) {
          this.iconRef = this.container.createComponent(ClrIcon);
          this.iconRef.instance.shape = 'exclamation-triangle';
          this.renderer.addClass(this.iconRef.location.nativeElement, 'clr-control-warning-icon');
        }
        const iconEl = this.iconRef.location.nativeElement;

        //Radio buttons have no wrapper
        if (!wrapper) {
          this.formContainer = this.getFormContainer(this.hostElement?.parentElement);
          this.renderer.insertBefore(this.hostElement?.parentElement, iconEl, this.hostElement);
        }
        //if an error icon is already present, place the icon in the parent
        if (wrapper?.classList?.contains('clr-validate-icon')) {
          this.renderer.insertBefore(wrapper.parentElement, iconEl, wrapper?.nextSibling);
        } else {
          this.renderer.insertBefore(wrapper, iconEl, wrapper?.previousElementSibling);
        }
        this.setControlStyles();
      });
    } else {
      this.resetControlStyles();
      this.iconRef?.destroy();
      this.iconRef = undefined;
      this.container.clear();
    }
  }

  getFormContainer(element: Element) {
    return element?.parentElement;
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
