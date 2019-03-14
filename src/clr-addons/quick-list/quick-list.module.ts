/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrQuickListComponent } from './quick-list.component';
import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { AddOptionComponent } from './add-option.component';

@NgModule({
  imports: [CommonModule, ClarityModule, ClrFormsModule, FormsModule],
  declarations: [AddOptionComponent, ClrQuickListComponent],
  exports: [AddOptionComponent, ClrQuickListComponent],
})
export class ClrQuickListModule {}
