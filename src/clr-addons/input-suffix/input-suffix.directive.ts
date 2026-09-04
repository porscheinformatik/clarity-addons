import { AfterViewInit, Directive, DoCheck, ElementRef, inject, input, OnDestroy, Renderer2 } from '@angular/core';

/**
 * This directive is meant to be used on clarity input containers apart from `clr-input-container` for ex. `clr-number-input-container`
 * For `clr-input-container` use the provided clrInputSuffix directives instead.
 */
@Directive({
  selector: '[cngInputSuffix]',
})
export class CngInputSuffixDirective implements AfterViewInit, DoCheck, OnDestroy {
  public readonly cngInputSuffix = input<string>('');

  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private suffixEl: HTMLSpanElement | null = null;

  public ngAfterViewInit(): void {
    const inputGroup = this.el.nativeElement.querySelector('.clr-input-group');
    if (!inputGroup) {
      return;
    }

    this.suffixEl = this.renderer.createElement('span');
    Object.assign(this.suffixEl.style, {
      paddingLeft: '0.25rem',
      paddingRight: '0.25rem',
      whiteSpace: 'nowrap',
      flexShrink: '0',
    });

    // insertBefore with null acts as appendChild — places suffix before +/- buttons if present, otherwise at the end
    inputGroup.insertBefore(this.suffixEl, inputGroup.querySelector('.clr-input-group-actions'));
  }

  public ngDoCheck(): void {
    if (this.suffixEl) {
      this.suffixEl.textContent = this.cngInputSuffix();
      this.suffixEl.hidden = !this.cngInputSuffix();
    }
  }

  public ngOnDestroy(): void {
    this.suffixEl?.remove();
  }
}
