/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'clr-date-time-container',
  template: `
    <ng-content select="clr-date-container"></ng-content>

    <ng-template #timeInput>
      <div class="clr-input-wrapper">
        <ng-content select="[clrTime]"></ng-content>
      </div>
    </ng-template>
  `,
  host: {
    '[class.date-time-container]': 'true',
  },
})
export class ClrDateTimeContainer implements AfterViewInit, OnInit {
  @ViewChild('timeInput', { static: true }) timeInput: TemplateRef<any>;

  constructor(private renderer: Renderer2, private inputEl: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Create the time input
    const timeInputElement = this.timeInput.createEmbeddedView(null).rootNodes[0];
    // Select the clr input wrapper of the date-container
    const inputWrapper = this.inputEl.nativeElement.querySelector('.clr-input-wrapper');
    // Append it as a child
    this.renderer.appendChild(inputWrapper, timeInputElement);
  }
}
