/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export interface ClrImageGalleryImage {
  src: string;
  alt?: string;
}

export interface ClrImageGalleryOpenEvent {
  images: ClrImageGalleryImage[];
  index: number;
}
