/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';

import { ImageGalleryDemo } from './image-gallery.demo';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: ImageGalleryDemo }]),
    ImageGalleryDemo,
  ],
  exports: [ImageGalleryDemo],
})
export class ImageGalleryDemoModule {}
