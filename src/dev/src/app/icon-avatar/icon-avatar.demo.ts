/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityIcons, factoryIcon } from '@cds/core/icon';

ClarityIcons.addIcons(factoryIcon);

@Component({
  selector: 'clr-icon-avatar-demo',
  templateUrl: './icon-avatar.demo.html',
  styleUrls: ['./icon-avatar.demo.scss'],
  standalone: false,
})
export class IconAvatarDemo {}
