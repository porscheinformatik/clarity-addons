/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, effect, ElementRef, HostListener, input, output, signal, ViewChild } from '@angular/core';
import { circleArrowIcon, timesIcon, ClarityIcons } from '@cds/core/icon';
import { ClrImageGalleryImage } from './image-gallery';

ClarityIcons.addIcons(circleArrowIcon, timesIcon);

@Component({
  selector: 'clr-image-carousel',
  templateUrl: './image-carousel.html',
  styleUrls: ['./image-carousel.scss'],
  standalone: false,
})
export class ClrImageCarousel {
  @ViewChild('thumbStrip') private thumbStripRef?: ElementRef<HTMLElement>;

  readonly images = input<ClrImageGalleryImage[]>([]);
  readonly productName = input('');
  readonly initialIndex = input(0);
  /** When true the header row (title + close button) is not rendered. */
  readonly hideHeader = input(false);

  readonly closeCarousel = output<void>();

  protected activeIndex = signal(0);
  protected spacerWidth = signal(0);

  private readonly thumbPx = 64;

  constructor() {
    // Seed activeIndex from initialIndex whenever it changes
    effect(() => {
      this.activeIndex.set(this.initialIndex());
    });

    effect(() => {
      const index = this.activeIndex();
      setTimeout(() => {
        this.updateSpacerWidth();
        this.scrollThumbIntoCenter(index);
      });
    });
  }

  private updateSpacerWidth(): void {
    const strip = this.thumbStripRef?.nativeElement;
    if (!strip) {
      return;
    }
    this.spacerWidth.set(Math.max(0, strip.clientWidth / 2 - this.thumbPx / 2));
  }

  private scrollThumbIntoCenter(index: number): void {
    const strip = this.thumbStripRef?.nativeElement;
    if (!strip) {
      return;
    }
    const thumb = strip.children[index + 1] as HTMLElement | undefined;
    if (!thumb) {
      return;
    }
    const stripRect = strip.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const thumbCenterRelativeToStrip = thumbRect.left - stripRect.left + thumbRect.width / 2 + strip.scrollLeft;
    strip.scrollTo({
      left: thumbCenterRelativeToStrip - strip.clientWidth / 2,
      behavior: 'smooth',
    });
  }

  protected prev(): void {
    this.activeIndex.update(i => (i - 1 + this.images().length) % this.images().length);
  }

  protected next(): void {
    this.activeIndex.update(i => (i + 1) % this.images().length);
  }

  protected setActive(index: number): void {
    this.activeIndex.set(index);
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'Escape') {
      this.closeCarousel.emit();
    }
  }
}
