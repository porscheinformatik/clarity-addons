/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2, TemplateRef, ViewChild } from '@angular/core';

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
  imports: [CommonModule, ClarityModule, ClrFormsModule, FormsModule],
})
export class ClrDateTimeContainer implements AfterViewInit {
  @ViewChild('timeInput', { static: true }) timeInput: TemplateRef<any>;

  constructor(
    private renderer: Renderer2,
    private inputEl: ElementRef
  ) {}

  ngAfterViewInit(): void {
    // Create the time input
    const timeInputElement = this.timeInput.createEmbeddedView(null).rootNodes[0];
    // Select the clr input wrapper of the date-container
    const inputWrapper = this.inputEl.nativeElement.querySelector('.clr-input-wrapper');
    // Append it as a child
    this.renderer.appendChild(inputWrapper, timeInputElement);
  }
}
