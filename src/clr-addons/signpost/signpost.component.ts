import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ClrSignpostContent } from '@clr/angular';
import { ClarityIcons, infoStandardIcon } from '@cds/core/icon';

@Component({
  selector: 'clr-signpost-addon',
  templateUrl: './signpost.component.html',
  styleUrl: './signpost.component.css',
  standalone: false,
})
export class ClrSignpostAddonComponent implements OnInit, OnDestroy {
  open = false;
  preventPropagationCall = (event: MouseEvent) => this.preventPropagation(event);

  @Input() targetAnchor: string;
  @Input() position: string = 'right-bottom';

  @ViewChild(ClrSignpostContent, { read: ElementRef }) signpostElement: ElementRef;

  constructor(private readonly renderer: Renderer2, @Inject(DOCUMENT) private readonly document: Document) {
    ClarityIcons.addIcons(infoStandardIcon);
  }

  ngOnInit() {
    this.document.addEventListener('click', this.preventPropagationCall, true);
  }

  /*
   * We need to immediately stop propagation of any click inside the signpost, except the close button.
   * Otherwise the signpost will close itself, as the content is now no child of the trigger button anymore
   * and will handle it as "outside" click.
   */
  preventPropagation(event: MouseEvent) {
    if (
      this.signpostElement?.nativeElement.contains(event.target) &&
      !(event.target as HTMLElement).closest('.signpost-action.close')
    ) {
      event.stopImmediatePropagation();
    }
  }

  openChanged(isOpen: any) {
    if (isOpen) {
      setTimeout(() => {
        this.moveSignpostContentBelowTargetAnchor();
      });
    }
  }

  private moveSignpostContentBelowTargetAnchor() {
    if (this.signpostElement) {
      const targetAnchorParent = this.signpostElement.nativeElement.closest(this.targetAnchor);
      if (targetAnchorParent) {
        this.renderer.appendChild(targetAnchorParent, this.signpostElement.nativeElement);
      }
    }
  }

  ngOnDestroy() {
    this.document.removeEventListener('click', this.preventPropagationCall, true);
  }
}
