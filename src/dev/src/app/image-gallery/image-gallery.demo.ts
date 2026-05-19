/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ClrImageGalleryModule, ClrImageGalleryImage } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-image-gallery-demo',
  templateUrl: './image-gallery.demo.html',
  imports: [FormsModule, ClrImageGalleryModule],
})
export class ImageGalleryDemo {
  readonly productName = signal('Porsche 911');
  readonly spotlightSize = signal(400);
  readonly carouselImageSize = signal(0);
  readonly carouselThumbnailSize = signal(64);

  images: ClrImageGalleryImage[] = Array.from({ length: 30 }, (_, i) => ({
    src: `https://picsum.photos/seed/car${i + 1}/800/600`,
    alt: `Car image ${i + 1}`,
  }));

  fewImages: ClrImageGalleryImage[] = [
    { src: 'https://picsum.photos/seed/few1/800/600', alt: 'Image 1' },
    { src: 'https://picsum.photos/seed/few2/800/600', alt: 'Image 2' },
    { src: 'https://picsum.photos/seed/few3/800/600', alt: 'Image 3' },
  ];

  singleImage: ClrImageGalleryImage[] = [{ src: 'https://picsum.photos/seed/single/800/600', alt: 'Single image' }];

  setSpotlightSize(val: string): void {
    const n = Number.parseInt(val);
    if (!Number.isNaN(n) && n > 0) {
      this.spotlightSize.set(n);
    }
  }

  setCarouselImageSize(val: string): void {
    const n = Number.parseInt(val);
    this.carouselImageSize.set(!Number.isNaN(n) && n > 0 ? n : 0);
  }

  setCarouselThumbnailSize(val: string): void {
    const n = Number.parseInt(val);
    if (!Number.isNaN(n) && n > 0) {
      this.carouselThumbnailSize.set(n);
    }
  }
}
