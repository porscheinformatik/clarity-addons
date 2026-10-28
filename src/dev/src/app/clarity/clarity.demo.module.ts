import { CommonModule } from '@angular/common';
/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule, ClrFormsModule } from '@clr/angular';

import { ClarityDemo } from './clarity.demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ClrFormsModule,
    RouterModule.forChild([{ path: '', component: ClarityDemo }]),
    ClarityDemo,
  ],
  exports: [ClarityDemo],
})
export class ClarityDemoModule {}
