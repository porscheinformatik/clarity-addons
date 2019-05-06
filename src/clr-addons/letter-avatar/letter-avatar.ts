/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, OnInit, Input, HostBinding, ViewChild, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'clr-letter-avatar',
  templateUrl: './letter-avatar.html',
})
export class ClrLetterAvatar implements AfterViewInit {
  @HostBinding('class.clr-avatar') avatar = true;

  @Input('clrName') name: string;
  @Input('clrSize') size = 24;

  @ViewChild('avatar') avatarElement: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.setStyle(this.avatarElement.nativeElement, 'width', this.size + 'px');
    this.renderer.setStyle(this.avatarElement.nativeElement, 'height', this.size + 'px');
  }

  getInitials(): string {
    if (this.name !== undefined) {
      return this.name.split(/\s/).reduce((response, word) => {
        if (response.length < 2) {
          return (response += word.slice(0, 1));
        } else {
          return response;
        }
      }, '');
    } else {
      return '';
    }
  }
}
