/*
 * Copyright (c) 2018-2023 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ElementRef, HostBinding, Input, Renderer2, ViewChild } from '@angular/core';
import { ClarityIcons } from '@cds/core/icon';
import {
  AudiBrandShape,
  CupraBrandShape,
  DWABrandShape,
  NewCarPrivateShape,
  PorscheBrandShape,
  SeatShape,
  SkodaBrandShape,
  VWNBrandShape,
  VWShape,
} from '../icons';

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

// import car brands to be used for cds-icon
ClarityIcons.addIcons(['brand-audi', AudiBrandShape]);
ClarityIcons.addIcons(['brand-cupra', CupraBrandShape]);
ClarityIcons.addIcons(['brand-dwa', DWABrandShape]);
ClarityIcons.addIcons(['brand-porsche', PorscheBrandShape]);
ClarityIcons.addIcons(['brand-seat', SeatShape]);
ClarityIcons.addIcons(['brand-skoda', SkodaBrandShape]);
ClarityIcons.addIcons(['brand-vw', VWShape]);
ClarityIcons.addIcons(['brand-vwn', VWNBrandShape]);
ClarityIcons.addIcons(['new-car-private', NewCarPrivateShape]);

@Component({
  selector: 'clr-brand-avatar',
  templateUrl: './brand-avatar.html',
})
export class ClrBrandAvatar {
  @HostBinding('class.clr-brand-avatar') avatar = true;

  @Input('clrBrand') brand: string;
  @Input('clrSize') size = 24;

  @ViewChild('avatar', { static: true }) avatarElement: ElementRef;

  static DEFAULT_ICON_SHAPE = 'new-car-private';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.avatarElement.nativeElement, 'width', this.size + 'px');
    this.renderer.setStyle(this.avatarElement.nativeElement, 'height', this.size + 'px');
  }

  getShape(): string {
    const brandName = ClrBrandAvatar.getCleanBrandName(this.brand);
    if (brandName in AcceptedBrands) {
      return 'brand-' + brandName.toLowerCase();
    }
    return this.getDefaultIcon();
  }

  getDefaultIcon() {
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
