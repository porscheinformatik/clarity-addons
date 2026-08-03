import { ComponentRef, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { ClrIcon } from '@clr/angular';

@Directive({
  selector: '[clrIfWarning]',
  standalone: false,
})
export class ClrIfWarning {
  private helperElement: Element;
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
        // Angular inserts a structural directive's embedded view right
        // before the anchor comment left behind by this directive, so the
        // rendered `<clr-control-helper>` element is its previous sibling.
        this.helperElement = this.host.nativeElement?.previousElementSibling;

        if (!this.helperElement) {
          return;
        }

        this.formContainer = this.helperElement.closest('.clr-control-container');

        if (!this.iconRef) {
          this.iconRef = this.container.createComponent(ClrIcon);
          this.iconRef.instance.shape = 'exclamation-triangle';
          this.renderer.addClass(this.iconRef.location.nativeElement, 'clr-control-warning-icon');
        }
        const iconEl = this.iconRef.location.nativeElement;

        const parent = this.helperElement.parentElement;

        // clr-checkbox-container / clr-radio-container already group their
        // clr-control-helper inside a `.clr-subtext-wrapper` div, mirroring
        // the layout Clarity uses for clr-control-error (icon + text in a
        // single row). In that case we just need to place our icon in there.
        if (parent?.classList?.contains('clr-subtext-wrapper')) {
          this.renderer.insertBefore(parent, iconEl, this.helperElement);
        } else {
          // For other controls (input, textarea, select, date, combobox, ...)
          // no such wrapper exists, so create one ourselves to replicate the
          // same icon + text row layout used by clr-control-error.
          const ownSubtextWrapper = this.renderer.createElement('div');
          this.renderer.addClass(ownSubtextWrapper, 'clr-subtext-wrapper');
          this.renderer.insertBefore(parent, ownSubtextWrapper, this.helperElement);
          this.renderer.appendChild(ownSubtextWrapper, iconEl);
          this.renderer.appendChild(ownSubtextWrapper, this.helperElement);
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

  resetControlStyles() {
    if (this.helperElement) {
      this.renderer.removeClass(this.helperElement, 'clr-warning');
    }
    if (this.formContainer) {
      this.renderer.removeClass(this.formContainer, 'clr-warning');
    }
  }

  setControlStyles() {
    if (this.helperElement) {
      this.renderer.addClass(this.helperElement, 'clr-warning');
    }
    if (this.formContainer) {
      this.renderer.addClass(this.formContainer, 'clr-warning');
    }
  }
}
