/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClrAddonsIconShapes } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-icons-demo',
  templateUrl: './icons-demo.component.html',
})
export class IconsDemo {
  shapes: string[] = Object.keys(ClrAddonsIconShapes);
}
