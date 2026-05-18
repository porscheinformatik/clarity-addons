/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { ClrImageGallery } from './image-gallery';
import { ClrImageCarousel } from './image-carousel';

@NgModule({
  imports: [CommonModule, ClarityModule, NgOptimizedImage],
  declarations: [ClrImageGallery, ClrImageCarousel],
  exports: [ClrImageGallery, ClrImageCarousel],
})
export class ClrImageGalleryModule {}
