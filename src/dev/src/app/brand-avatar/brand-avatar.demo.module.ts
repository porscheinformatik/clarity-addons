/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';

import { BrandAvatarDemo } from './brand-avatar.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrFormsModule,
    ClrAddonsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: BrandAvatarDemo }]),
  ],
  declarations: [BrandAvatarDemo],
  exports: [BrandAvatarDemo],
})
export class BrandAvatarDemoModule {}
