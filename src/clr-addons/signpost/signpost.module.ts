/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrIconModule, ClrSignpostModule } from '@clr/angular';
import { ClrSignpostAddonComponent } from './signpost.component';

@NgModule({
  imports: [CommonModule, ClrIconModule, ClrSignpostModule],
  declarations: [ClrSignpostAddonComponent],
  exports: [ClrSignpostAddonComponent],
})
export class ClrSignpostAddonModule {}
