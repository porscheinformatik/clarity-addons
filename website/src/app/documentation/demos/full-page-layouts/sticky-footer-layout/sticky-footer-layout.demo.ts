/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ClrMainContainerModule, ClrNavigationModule } from '@clr/angular';
import { DemoMenu } from '../demo-menu/demo-menu';
import { ClrBackButton } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-sticky-footer-layout-demo',
  templateUrl: './sticky-footer-layout.demo.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ClrMainContainerModule, ClrNavigationModule, DemoMenu, ClrBackButton],
})
export class StickyFooterLayoutDemo {}
