import { Directive, ElementRef, OnDestroy, OnInit, Optional, Renderer2 } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ControlIdService } from './control-id.service';

@Directive({ selector: 'label' })
export class ClrAddonsLabel implements OnInit, OnDestroy {
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

    if (this.controlIdService && !(this.el.nativeElement as HTMLLabelElement).getAttribute('for')) {
      this.controlIdService.idChange.pipe(takeUntil(this.destroyed$)).subscribe(id =>
        // setTimeout needed, otherwise the ClrLabel directive of clarity will remove this via HostBinding again
        setTimeout(() => this.renderer.setAttribute(this.el.nativeElement, 'for', id))
      );
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
