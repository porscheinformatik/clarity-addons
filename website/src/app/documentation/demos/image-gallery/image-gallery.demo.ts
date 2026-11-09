/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ClrImageGalleryImage, ClrImageGallery } from '@porscheinformatik/clr-addons';
import { ClarityDocComponent } from '../clarity-doc';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';
import { CodeSnippet } from '../../../utils/code-snippet';

const HTML_EXAMPLE = `
<clr-image-gallery
  [images]="images"
  [productName]="'Porsche 911'"
  [spotlightSize]="400">
</clr-image-gallery>
`;

const DATA_URI_EXAMPLE = `
images: ClrImageGalleryImage[] = [
  { src: 'data:image/png;base64,iVBORw0KGgo...', alt: 'Uploaded image' },
  { src: 'https://example.com/image.jpg', alt: 'External image' },
];
`;

@Component({
  selector: 'clr-image-gallery-demo',
  templateUrl: './image-gallery.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  imports: [DocWrapper, ClrImageGallery, CodeSnippet, CommonModule, ClarityModule, UtilsModule, DocWrapperModule],
})
export class ImageGalleryDemo extends ClarityDocComponent {
  htmlExample = HTML_EXAMPLE;
  dataUriExample = DATA_URI_EXAMPLE;

  images: ClrImageGalleryImage[] = [
    { src: 'https://picsum.photos/seed/car1/800/600', alt: 'Car image 1' },
    { src: 'https://picsum.photos/seed/car2/800/600', alt: 'Car image 2' },
    { src: 'https://picsum.photos/seed/car3/800/600', alt: 'Car image 3' },
    { src: 'https://picsum.photos/seed/car4/800/600', alt: 'Car image 4' },
    { src: 'https://picsum.photos/seed/car5/800/600', alt: 'Car image 5' },
    { src: 'https://picsum.photos/seed/car6/800/600', alt: 'Car image 6' },
    { src: 'https://picsum.photos/seed/car7/800/600', alt: 'Car image 7' },
  ];

  readonly mixedImages = signal<ClrImageGalleryImage[]>([]);

  constructor() {
    super('image-gallery');
    this.loadMixedImages();
  }

  /** Simulates uploaded images by converting downloaded photos into base64 data URIs. */
  private async loadMixedImages(): Promise<void> {
    const [upload1, upload2] = await Promise.all([
      this.toDataUri('https://picsum.photos/seed/upload1/800/600'),
      this.toDataUri('https://picsum.photos/seed/upload2/800/600'),
    ]);
    this.mixedImages.set([
      { src: upload1, alt: 'Uploaded image 1 (data URI)' },
      { src: 'https://picsum.photos/seed/car1/800/600', alt: 'Car image 1 (URL)' },
      { src: upload2, alt: 'Uploaded image 2 (data URI)' },
    ]);
  }

  private async toDataUri(url: string): Promise<string> {
    const blob = await (await fetch(url)).blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }
}
