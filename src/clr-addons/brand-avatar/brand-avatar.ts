/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  Component,
  Input,
  HostBinding,
  ViewChild,
  AfterViewInit,
  Renderer2,
  ElementRef,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'clr-brand-avatar',
  templateUrl: './brand-avatar.html',
})
export class ClrBrandAvatar implements AfterViewInit {
  @HostBinding('class.clr-avatar') avatar = true;

  @Input('clrBrand') brand: string;
  @Input('clrColor') color = '#707070';

  @ViewChild('avatar', { static: true }) avatarElement: ElementRef;

  @ViewChild('DEFAULT', { static: true }) default_template: TemplateRef<any>;
  @ViewChild('AUDI', { static: true }) audi_template: TemplateRef<any>;
  @ViewChild('CUPRA', { static: true }) cupra_template: TemplateRef<any>;
  @ViewChild('DWA', { static: true }) dwa_template: TemplateRef<any>;
  @ViewChild('PORSCHE', { static: true }) porsche_template: TemplateRef<any>;
  @ViewChild('SEAT', { static: true }) seat_template: TemplateRef<any>;
  @ViewChild('SKODA', { static: true }) skoda_template: TemplateRef<any>;
  @ViewChild('VW', { static: true }) vw_template: TemplateRef<any>;
  @ViewChild('VWN', { static: true }) vwn_template: TemplateRef<any>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.avatarElement.nativeElement, 'background-color', this.color);
  }

  getBrandTemplate(): TemplateRef<any> {
    switch (ClrBrandAvatar.getCleanBrandName(this.brand)) {
      case 'AUDI':
        return this.audi_template;
      case 'CUPRA':
        return this.cupra_template;
      case 'DWA':
        return this.dwa_template;
      case 'PORSCHE':
        return this.porsche_template;
      case 'SEAT':
        return this.seat_template;
      case 'SKODA':
        return this.skoda_template;
      case 'VW':
        return this.vw_template;
      case 'VWN':
        return this.vwn_template;
      default:
        return this.default_template;
    }
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
