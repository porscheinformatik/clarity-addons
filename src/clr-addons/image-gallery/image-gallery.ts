/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, computed, effect, ElementRef, HostListener, input, signal, ViewChild } from '@angular/core';
import { circleArrowIcon, timesIcon, ClarityIcons } from '@cds/core/icon';

ClarityIcons.addIcons(circleArrowIcon, timesIcon);

export interface ClrImageGalleryImage {
  src: string;
  alt?: string;
}

@Component({
  selector: 'clr-image-gallery',
  templateUrl: './image-gallery.html',
  styleUrls: ['./image-gallery.scss'],
  standalone: false,
})
export class ClrImageGallery {
  @ViewChild('thumbStrip') private thumbStripRef?: ElementRef<HTMLElement>;

  protected images = input<ClrImageGalleryImage[]>([]);
  protected productName = input('');
  /** Size in pixels of the spotlighted image in the static view */
  protected spotlightSize = input(284);

  protected modalOpen = signal(false);
  protected activeIndex = signal(0);
  protected spacerWidth = signal(0);

  protected maxThumbnails = 4;
  private readonly thumbPx = 64;

  protected readonly thumbnailSize = computed(() => {
    const totalPadding = 8 * (this.maxThumbnails - 1);
    return (this.spotlightSize() - totalPadding) / this.maxThumbnails;
  });
  protected readonly staticThumbnails = computed(() => this.images().slice(1, this.maxThumbnails + 1));
  protected readonly remainingCount = computed(() => this.images().length - this.maxThumbnails - 1);

  constructor() {
    effect(() => {
      const index = this.activeIndex();
      const open = this.modalOpen();
      // Wait for DOM to settle (modal *ngIf + thumbnail *ngFor)
      setTimeout(() => {
        if (open) {
          this.updateSpacerWidth();
          this.scrollThumbIntoCenter(index);
        }
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
    // children[0] is the leading spacer <span>, thumbnails start at children[1]
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

  protected openModal(index = 0): void {
    this.activeIndex.set(index);
    this.modalOpen.set(true);
  }

  protected closeModal(): void {
    this.modalOpen.set(false);
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

  protected onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('clr-image-gallery-backdrop')) {
      this.closeModal();
    }
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (!this.modalOpen()) {
      return;
    }
    if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'Escape') {
      this.closeModal();
    }
  }
}
