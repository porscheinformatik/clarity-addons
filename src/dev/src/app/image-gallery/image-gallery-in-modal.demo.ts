/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, effect, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { angleIcon, ClarityIcons } from '@cds/core/icon';
import { ClrImageGalleryModule, ClrImageGalleryImage, ClrImageGalleryOpenEvent } from '@porscheinformatik/clr-addons';

ClarityIcons.addIcons(angleIcon);

@Component({
  selector: 'clr-image-gallery-in-modal-demo',
  templateUrl: './image-gallery-in-modal.demo.html',
  imports: [CommonModule, ClarityModule, ClrImageGalleryModule],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      body.gallery-modal-open .modal-body-wrapper {
        max-height: none !important;
        overflow: hidden !important;
        display: flex;
        flex-direction: column;
      }
      body.gallery-modal-open .modal-dialog {
        display: flex;
        flex-direction: column;
        max-height: 92vh;
      }
      body.gallery-modal-open .modal-content-wrapper,
      body.gallery-modal-open .modal-content {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        min-height: 0;
      }
    `,
  ],
})
export class ImageGalleryInModalDemo {
  protected modalOpen = signal(false);
  protected showCarousel = signal(false);
  protected carouselIndex = signal(0);

  protected autoModalOpen = signal(false);
  protected showAutoCarousel = signal(false);
  protected autoCarouselIndex = signal(0);

  protected images: ClrImageGalleryImage[] = Array.from({ length: 10 }, (_, i) => ({
    src: `https://picsum.photos/seed/modal${i + 1}/800/600`,
    alt: `Image ${i + 1}`,
  }));

  constructor() {
    effect(() => {
      if (this.modalOpen()) {
        document.body.classList.add('gallery-modal-open');
      } else {
        document.body.classList.remove('gallery-modal-open');
      }
    });
  }

  protected openModal(): void {
    this.showCarousel.set(false);
    this.modalOpen.set(true);
  }

  protected onGalleryOpen(event: ClrImageGalleryOpenEvent): void {
    this.carouselIndex.set(event.index);
    this.showCarousel.set(true);
  }

  protected onCarouselClose(): void {
    this.showCarousel.set(false);
  }

  protected onModalClose(): void {
    this.showCarousel.set(false);
    this.modalOpen.set(false);
  }

  protected openAutoModal(): void {
    this.showAutoCarousel.set(false);
    this.autoModalOpen.set(true);
  }

  protected onAutoGalleryOpen(event: ClrImageGalleryOpenEvent): void {
    this.autoCarouselIndex.set(event.index);
    this.showAutoCarousel.set(true);
  }

  protected onAutoCarouselClose(): void {
    this.showAutoCarousel.set(false);
  }

  protected onAutoModalClose(): void {
    this.showAutoCarousel.set(false);
    this.autoModalOpen.set(false);
  }
}
