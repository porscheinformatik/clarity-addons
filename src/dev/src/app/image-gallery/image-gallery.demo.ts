/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrImageGalleryModule, ClrImageGalleryImage } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-image-gallery-demo',
  templateUrl: './image-gallery.demo.html',
  imports: [CommonModule, FormsModule, ClrImageGalleryModule],
})
export class ImageGalleryDemo {
  protected readonly productName = signal('Porsche 911');
  protected readonly spotlightSize = signal(400);

  protected images: ClrImageGalleryImage[] = Array.from({ length: 30 }, (_, i) => ({
    src: `https://picsum.photos/seed/car${i + 1}/800/600`,
    alt: `Car image ${i + 1}`,
  }));

  protected fewImages: ClrImageGalleryImage[] = [
    { src: 'https://picsum.photos/seed/few1/800/600', alt: 'Image 1' },
    { src: 'https://picsum.photos/seed/few2/800/600', alt: 'Image 2' },
    { src: 'https://picsum.photos/seed/few3/800/600', alt: 'Image 3' },
  ];

  protected singleImage: ClrImageGalleryImage[] = [
    { src: 'https://picsum.photos/seed/single/800/600', alt: 'Single image' },
  ];

  setSpotlightSize(val: string): void {
    const n = Number.parseInt(val);
    if (!Number.isNaN(n) && n > 0) {
      this.spotlightSize.set(n);
    }
  }
}
