/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ClrIconsService } from './icons.service';

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule],
  declarations: [],
  exports: [],
  providers: [
    ClrIconsService,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: ClrIconsService) => () => service.loadIcons(),
      deps: [ClrIconsService],
      multi: true,
    },
  ],
})
export class ClrAddonsIconsModule {}
