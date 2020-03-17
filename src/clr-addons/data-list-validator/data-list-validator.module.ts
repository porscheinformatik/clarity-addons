/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrDataListPredefinedValidatorDirective } from './data-list-predefined-validator.directive';

@NgModule({
  declarations: [ClrDataListPredefinedValidatorDirective],
  exports: [ClrDataListPredefinedValidatorDirective],
})
export class ClrDataListValidatorModule {}
