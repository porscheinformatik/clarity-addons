/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, computed, input, output, signal } from '@angular/core';

export interface ClrImageGalleryImage {
  src: string;
  alt?: string;
}

export interface ClrImageGalleryOpenEvent {
  images: ClrImageGalleryImage[];
  index: number;
}

@Component({
  selector: 'clr-image-gallery',
  templateUrl: './image-gallery.html',
  styleUrls: ['./image-gallery.scss'],
  standalone: false,
})
export class ClrImageGallery {
  readonly images = input<ClrImageGalleryImage[]>([]);
  readonly productName = input('');
  /** Size in pixels of the spotlighted image in the static view */
  readonly spotlightSize = input(284);
  /**
   * When true (default), clicking opens a built-in full-screen modal.
   * When false, emits `galleryOpen` so the parent can embed the carousel.
   */
  readonly useBuiltInModal = input(true);

  /** Emitted when useBuiltInModal is false and the user clicks an image. */
  readonly galleryOpen = output<ClrImageGalleryOpenEvent>();

  protected modalOpen = signal(false);
  protected activeIndex = signal(0);

  protected maxThumbnails = 4;

  protected readonly thumbnailSize = computed(() => {
    const totalPadding = 8 * (this.maxThumbnails - 1);
    return (this.spotlightSize() - totalPadding) / this.maxThumbnails;
  });
  protected readonly staticThumbnails = computed(() => this.images().slice(1, this.maxThumbnails + 1));
  protected readonly remainingCount = computed(() => this.images().length - this.maxThumbnails - 1);

  protected openModal(index = 0): void {
    if (this.useBuiltInModal()) {
      this.activeIndex.set(index);
      this.modalOpen.set(true);
    } else {
      this.galleryOpen.emit({ images: this.images(), index });
    }
  }

  protected closeModal(): void {
    this.modalOpen.set(false);
  }

  protected onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('clr-image-gallery-backdrop')) {
      this.closeModal();
    }
  }
}
