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
  /**
   * Size in pixels of the active (spotlight) image square.
   * When 0 (default), the image fills the available container width automatically.
   */
  readonly imageSize = input(0);
  /**
   * Size in pixels of each thumbnail square.
   * Defaults to 64px.
   */
  readonly thumbnailSize = input(64);

  readonly closeCarousel = output<void>();

  protected activeIndex = signal(0);
  protected needsScroll = signal(false);
  protected showFadeLeft = signal(false);
  protected showFadeRight = signal(false);

  constructor() {
    effect(() => {
      this.activeIndex.set(this.initialIndex());
    });

    effect(() => {
      const index = this.activeIndex();
      setTimeout(() => {
        this.updateScrollState();
        this.scrollThumbIntoCenter(index);
      });
    });
  }

  private updateScrollState(): void {
    const strip = this.thumbStripRef?.nativeElement;
    if (!strip) {
      return;
    }
    const thumbCount = this.images().length;
    const gap = 8;
    const contentWidth = thumbCount * this.thumbnailSize() + Math.max(0, thumbCount - 1) * gap;
    this.needsScroll.set(contentWidth > strip.clientWidth);
    this.updateFades(strip);
  }

  protected onThumbStripScroll(): void {
    const strip = this.thumbStripRef?.nativeElement;
    if (strip) {
      this.updateFades(strip);
    }
  }

  private updateFades(strip: HTMLElement): void {
    const atLeft = strip.scrollLeft <= 0;
    const atRight = strip.scrollLeft >= strip.scrollWidth - strip.clientWidth - 1;
    this.showFadeLeft.set(this.needsScroll() && !atLeft);
    this.showFadeRight.set(this.needsScroll() && !atRight);
  }

  private scrollThumbIntoCenter(index: number): void {
    const strip = this.thumbStripRef?.nativeElement;
    if (!strip || !this.needsScroll()) {
      return;
    }
    const thumb = strip.children[index] as HTMLElement | undefined;
    if (!thumb) {
      return;
    }
    const stripRect = strip.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const thumbCenterInScroll = thumbRect.left - stripRect.left + thumbRect.width / 2 + strip.scrollLeft;
    const desired = thumbCenterInScroll - strip.clientWidth / 2;
    const maxScroll = strip.scrollWidth - strip.clientWidth;
    strip.scrollTo({
      left: Math.max(0, Math.min(desired, maxScroll)),
      behavior: 'smooth',
    });
    setTimeout(() => this.updateFades(strip), 350);
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
