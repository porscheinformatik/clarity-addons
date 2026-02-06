/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, Component, ElementRef, HostBinding, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'clr-icon-avatar',
  templateUrl: './icon-avatar.html',
  standalone: false,
})
export class ClrIconAvatar implements AfterViewInit {
  @HostBinding('class.clr-avatar') avatar = true;

  @Input('clrShape') shape: string;
  @Input('clrSize') size = 24;

  @ViewChild('avatar', { static: true }) avatarElement: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.avatarElement.nativeElement, 'width', this.size + 'px');
    this.renderer.setStyle(this.avatarElement.nativeElement, 'height', this.size + 'px');
  }

  getShape(): string {
    return this.shape ?? 'user';
  }
}
