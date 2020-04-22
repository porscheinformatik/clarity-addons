import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[clrMainNavGroupItem]',
})
export class ClrMainNavGroupItem {
  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {
    renderer.setAttribute(el.nativeElement, 'tabindex', '-1');
  }

  disabled = false;

  focus(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '0');
    this.el.nativeElement.focus();
  }
  blur(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'tabindex', '-1');
    this.el.nativeElement.blur();
  }
}
