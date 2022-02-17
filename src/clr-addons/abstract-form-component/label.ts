import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ControlIdService } from './control-id.service';

@Directive({ selector: 'label' })
export class ClrAddonsLabel implements OnInit, OnDestroy {
  @HostBinding('attr.for')
  @Input('for')
  forAttr: string;

  destroyed$ = new Subject<void>();

  constructor(
    @Optional() private controlIdService: ControlIdService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    // Only add the clr-control-label if it is inside a control container
    if (this.controlIdService) {
      this.renderer.addClass(this.el.nativeElement, 'clr-control-label');
    }

    if (this.controlIdService && !this.forAttr) {
      this.controlIdService.idChange.pipe(takeUntil(this.destroyed$)).subscribe(id => (this.forAttr = id));
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
