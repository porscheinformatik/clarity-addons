import { AfterViewInit, Directive, ElementRef, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
@Directive({
  selector: '[clrIfWarning]',
})
export class IfWarning implements AfterViewInit {
  icon = this.renderer.createElement('cds-icon');
  helper = this.renderer.createElement('clr-control-helper');
  parent$: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private ngControl: NgControl,
    private elem: ElementRef
  ) {}

  private subscribeToParent() {
    if (this.ngControl && this.ngControl.valueAccessor) {
      this.parent$ = this.ngControl.hostElementChanges.subscribe({});
    }
  }

  @Input() set clrIfWarning(clrIfWarning: boolean) {
    /*if(clrIfWarning){
      const parent = this.hostElement.previousSibling.previousSibling;
      const wrapper = parent?.parentElement.querySelector('[class^="clr-"][class$="-wrapper"]');
      this.control = parent?.parentElement.querySelectorAll('input, select')[0];
      console.log(this.elementRef);
      console.log('parent',parent);
      console.log('wrapper',wrapper);
      console.log('control',this.control);
      setTimeout(() => {
        this.renderer.setProperty(this.helper, 'innerHTML', this.elementRef.nativeElement.previousSibling.getAttribute('warning'));
        wrapper?.parentNode.insertBefore(this.helper, this.wrapper.nextSibling);
        this.viewContainer.createEmbeddedView(this.templateRef);
      })
    }else {
      if(this.control){
        this.renderer.removeClass(this.control, 'warning-input');
      }
      this.icon.remove();
      this.helper.remove();
      this.viewContainer.clear();
    }*/
  }

  public ngAfterViewInit(): void {
    this.icon.setAttribute('shape', 'exclamation-triangle');
    this.renderer.addClass(this.icon, 'warning');
    this.renderer.addClass(this.icon, 'icon');
    this.renderer.addClass(this.helper, 'clr-subtext');
    this.renderer.addClass(this.helper, 'warning');
  }
}
