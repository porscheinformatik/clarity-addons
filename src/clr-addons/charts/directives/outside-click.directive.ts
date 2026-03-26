import { AfterViewInit, DestroyRef, Directive, inject, output, Renderer2 } from '@angular/core';

// Clarity actually has an "outside-click" directive, but they don't export it 🤷
@Directive({
  selector: '[cngOutsideClick]',
})
export class OutsideClickDirective implements AfterViewInit {
  public readonly outsideClick = output<void>({ alias: 'cngOutsideClick' });

  private readonly renderer = inject(Renderer2);
  private readonly destroyRef = inject(DestroyRef);

  public ngAfterViewInit(): void {
    const listener = this.renderer.listen('document', 'click', () => this.outsideClick.emit());
    this.destroyRef.onDestroy(listener);
  }
}
