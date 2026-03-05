import {
  AfterContentInit,
  AfterViewChecked,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  inject,
} from '@angular/core';
import { ClrForm } from '@clr/angular';

@Directive({
  selector: 'form[clrControlEnterSubmit]',
  standalone: false,
})
export class ClrControlEnterSubmitDirective implements AfterContentInit, AfterViewChecked {
  @Input('clrControlEnterSubmit') tooltipText: string | undefined;
  private readonly clrForm = inject(ClrForm);
  private readonly host = inject<ElementRef<HTMLFormElement>>(ElementRef);

  constructor(private readonly renderer: Renderer2) {}

  private setTooltip(): void {
    const submitButtons = this.host.nativeElement.querySelectorAll('button[type="submit"]');
    if (this.tooltipText) {
      submitButtons.forEach(button => {
        this.renderer.setAttribute(button, 'title', this.tooltipText);
      });
    } else {
      submitButtons.forEach(button => {
        this.renderer.removeAttribute(button, 'title');
      });
    }
  }

  ngAfterContentInit(): void {
    this.setTooltip();
  }

  ngAfterViewChecked(): void {
    this.setTooltip();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Debug logs for every keydown event
    // Prevent default submit for Enter unless ctrl/meta is pressed
    if (event.key === 'Enter') {
      if (!(event.ctrlKey || event.metaKey) && !event.shiftKey) {
        event.preventDefault();
      } else if ((event.ctrlKey || event.metaKey) && !event.shiftKey) {
        event.stopPropagation();
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        this.clrForm.markAsTouched();
        this.host.nativeElement.requestSubmit();
      }
    }
  }
}
