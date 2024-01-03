/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule, CONTENT_PROVIDER } from '@porscheinformatik/clr-addons';
import { DemoLocationBarContentProvider } from './content-provider';
import { LocationBarDemo } from './location-bar.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    RouterModule.forChild([{ path: '', component: LocationBarDemo }]),
  ],
  declarations: [LocationBarDemo],
  exports: [LocationBarDemo],
  providers: [{ provide: CONTENT_PROVIDER, useExisting: DemoLocationBarContentProvider }],
})
export class LocationBarDemoModule {}
