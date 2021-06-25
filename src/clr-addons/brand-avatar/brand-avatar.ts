/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';

export enum AcceptedBrands {
  AUDI,
  CUPRA,
  DWA,
  PORSCHE,
  SEAT,
  SKODA,
  VW,
  VWN,
}

@Component({
  selector: 'clr-brand-avatar',
  templateUrl: './brand-avatar.html',
})
export class ClrBrandAvatar {
  @HostBinding('class.clr-brand-avatar') avatar = true;

  @Input('clrBrand') brand: string;

  @ViewChild('avatar', { static: true }) avatarElement: ElementRef;

  static DEFAULT_ICON_SHAPE = 'new-car-private';

  getShape(): string {
    const brandName = ClrBrandAvatar.getCleanBrandName(this.brand);
    if (brandName in AcceptedBrands) {
      return 'brand-' + brandName.toLowerCase();
    }
    return ClrBrandAvatar.DEFAULT_ICON_SHAPE;
  }

  static getCleanBrandName(input: string): string {
    let output: string = '' + input;
    output = output.replace(/ /g, '');
    output = output.replace(/-/g, '');
    output = output.replace(/_/g, '');
    output = output.toUpperCase();
    output = output.replace('VOLKSWAGEN', 'VW');
    output = output.replace('NUTZFAHRZEUGE', 'N');
    output = output.replace('DASWELTAUTO', 'DWA');
    output = output.replace('Š', 'S');
    return output;
  }
}
