import { AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[clrIfWarning]',
})
export class ClrIfWarning implements AfterViewInit {
  icon = this.renderer.createElement('cds-icon');
  component: any;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>,
    private renderer: Renderer2,
    private host: ElementRef
  ) {}

  setIconStyles() {
    this.icon.style.color = 'var(--cds-alias-status-warning-dark)';
    this.icon.style.marginLeft = '-2px';
    this.icon.style.height = '1.2rem';
    this.icon.style.width = '1.2rem';
    this.icon.style.minHeight = '1.2rem';
    this.icon.style.minWidth = '1.2rem';
  }

  ngAfterViewInit(): void {
    this.icon.setAttribute('shape', 'exclamation-triangle');
    this.renderer.addClass(this.icon, 'icon');
  }

  @Input() set clrIfWarning(clrIfWarning: boolean) {
    if (clrIfWarning) {
      this.container.createEmbeddedView(this.template);

      setTimeout(() => {
        const elem = this.host.nativeElement;
        this.setIconStyles();
        const parent = this.renderer.parentNode(elem);
        console.log(parent);
        const container = parent?.parentNode?.querySelector('[class^="clr-control-container"]');
        let wrapper = container?.querySelector('[class^="clr-"][class$="-wrapper"]');
        if (wrapper) {
          console.log('has wrapper');
          this.renderer.appendChild(wrapper, this.icon);
        } else {
          console.log('no wrapper');
          if (container) {
            console.log('has container', container);
            const innerWrapper = container.querySelector('[class^="clr-"][class*="-wrapper"]');
            const group = innerWrapper.querySelector('[class$="-group"]');
            console.log(group);
            this.renderer.insertBefore(group.parentNode, this.icon, group.nextSibling);
          } else {
            console.log('no container', parent);
            this.renderer.insertBefore(elem.parentNode, this.icon, elem.previousSibling);
          }
        }
        this.renderer.setStyle(elem?.previousSibling, 'color', 'var(--cds-alias-status-warning-dark)');
      });
    } else {
      this.icon.remove();
      this.container.clear();
    }
  }
  /*
.warning-input {
  background: linear-gradient(to bottom, transparent 95%, var(--cds-alias-status-warning-dark) 95%) no-repeat !important;
  border-bottom-color: var(--cds-alias-status-warning-dark) !important;
}
*/
}
