/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClrImageGalleryImage } from '@porscheinformatik/clr-addons';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_EXAMPLE = `
<clr-image-gallery
  [images]="images"
  [productName]="'Porsche 911'"
  [spotlightSize]="400">
</clr-image-gallery>
`;

@Component({
  selector: 'clr-image-gallery-demo',
  templateUrl: './image-gallery.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class ImageGalleryDemo extends ClarityDocComponent {
  htmlExample = HTML_EXAMPLE;

  images: ClrImageGalleryImage[] = [
    { src: 'https://picsum.photos/seed/car1/800/600', alt: 'Car image 1' },
    { src: 'https://picsum.photos/seed/car2/800/600', alt: 'Car image 2' },
    { src: 'https://picsum.photos/seed/car3/800/600', alt: 'Car image 3' },
    { src: 'https://picsum.photos/seed/car4/800/600', alt: 'Car image 4' },
    { src: 'https://picsum.photos/seed/car5/800/600', alt: 'Car image 5' },
    { src: 'https://picsum.photos/seed/car6/800/600', alt: 'Car image 6' },
    { src: 'https://picsum.photos/seed/car7/800/600', alt: 'Car image 7' },
  ];

  constructor() {
    super('image-gallery');
  }
}
