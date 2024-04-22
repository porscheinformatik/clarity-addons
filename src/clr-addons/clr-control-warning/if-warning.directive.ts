import { AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
enum IconInsertPosition {
  BEFORE_NEXT = 'beforeNext',
  BEFORE_PREV = 'beforePrev',
  APPEND = 'append',
}

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
    this.setIconStyles();
  }

  @Input() set clrIfWarning(clrIfWarning: boolean) {
    if (clrIfWarning) {
      this.container.createEmbeddedView(this.template);
      setTimeout(() => {
        const elem = this.host.nativeElement;
        if (this.findExistingIcons(elem)) {
          this.renderer.insertBefore(
            this.findExistingIcons(elem).parentNode,
            this.icon,
            this.findExistingIcons(elem).previousSibling
          );
        }
        /*this.setIconStyles();
        const iconPosition =  this.determineIconPosition(elem);
        console.log(iconPosition);
        this.insertIcon(iconPosition.elem, this.icon, iconPosition.position);

        const parent = this.renderer.parentNode(elem);
        const container = parent?.parentNode?.querySelector('[class^="clr-control-container"]');
        let wrapper = container?.querySelector('[class^="clr-"][class$="-wrapper"]');
        if (wrapper) {
          console.log('appending wrapper');
          this.renderer.appendChild(wrapper, this.icon);
        } else {
          if (container) {
            const innerWrapper = container.querySelector('[class^="clr-"][class*="-wrapper"]');
            const group = innerWrapper.querySelector('[class$="-group"]');
            this.renderer.insertBefore(group.parentNode, this.icon, group.nextSibling);
          } else {
            this.renderer.insertBefore(elem.parentNode, this.icon, elem.previousSibling);
          }
        }
        this.renderer.setStyle(elem?.previousSibling, 'color', 'var(--cds-alias-status-warning-dark)');*/
      });
    } else {
      this.icon.remove();
      this.container.clear();
    }
  }

  findExistingIcons(element: ElementRef): Element {
    const parent = this.renderer.parentNode(element);
    return parent?.querySelectorAll('cds-icon')[0];
  }

  determineIconPosition(hostElement: Element) {
    const parent = this.renderer.parentNode(hostElement);
    const container = parent?.parentNode?.querySelector('[class^="clr-control-container"]');
    if (!container) {
      return {
        elem: hostElement,
        position: IconInsertPosition.BEFORE_NEXT,
      };
    }
    let wrapper = container?.querySelector('[class^="clr-"][class$="-wrapper"]');
    if (!wrapper) {
      const innerWrapper = container?.querySelector('[class^="clr-"][class*="-wrapper"]');
      if (innerWrapper) {
        return {
          elem: innerWrapper.querySelector('[class$="-group"]'),
          position: IconInsertPosition.BEFORE_NEXT,
        };
      }
    }
    return {
      elem: wrapper,
      position: IconInsertPosition.APPEND,
    };
  }

  insertIcon(parent: ElementRef, newElem: ElementRef, position: IconInsertPosition) {
    const parentNode = parent.nativeElement;
    const elem = newElem.nativeElement;

    switch (position) {
      case 'append':
        this.renderer.appendChild(parentNode, elem);
        break;
      case 'beforeNext':
        this.renderer.insertBefore(parentNode, elem, parentNode.nextSibling);
        break;
      case 'beforePrev':
        this.renderer.insertBefore(parentNode, elem, elem.previousSibling);
        break;
      default:
        console.error('Invalid position specified');
    }
  }
}
