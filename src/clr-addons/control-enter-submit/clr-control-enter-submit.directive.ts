import {
  AfterContentInit,
  AfterViewChecked,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  HostListener,
  Optional,
  Host,
} from '@angular/core';
import { ClrForm } from '@clr/angular';

@Directive({
  selector: 'form[clrControlEnterSubmit]',
  standalone: false,
})
export class ClrControlEnterSubmitDirective implements AfterContentInit, AfterViewChecked {
  @Input('clrControlEnterSubmit') tooltipText: string | undefined;

  constructor(
    private readonly renderer: Renderer2,
    private readonly host: ElementRef<HTMLFormElement>,
    @Optional() @Host() private readonly clrForm?: ClrForm
  ) {}

  @HostListener('window:keydown.control.enter', ['$event']) submitCtrlEnter(event: KeyboardEvent) {
    event.stopPropagation();
    if (this.clrForm) {
      this.clrForm.markAsTouched();
    }
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    this.host.nativeElement.requestSubmit();
  }
  ngAfterContentInit(): void {
    this.setTooltip();
  }

  ngAfterViewChecked(): void {
    this.setTooltip();
  }
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
}
