/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { ClrImageGallery } from './image-gallery';
import { ClrImageCarousel } from './image-carousel';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrImageGallery`, `ClrImageCarousel` directly instead.
 */
@NgModule({
  imports: [ClrImageGallery, ClrImageCarousel],
  exports: [ClrImageGallery, ClrImageCarousel],
})
export class ClrImageGalleryModule {}
