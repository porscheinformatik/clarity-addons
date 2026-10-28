/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClrMainContainerModule, ClrNavigationModule } from '@clr/angular';
import { DemoMenu } from '../demo-menu/demo-menu';
import { ClrBackButton } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-sticky-footer-layout-demo',
  templateUrl: './sticky-footer-layout.demo.html',
  imports: [ClrMainContainerModule, ClrNavigationModule, DemoMenu, ClrBackButton],
})
export class StickyFooterLayoutDemo {}
