/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Output } from '@angular/core';
import { ClrAlertModule, ClrDatagridModule, ClrIconModule, ClrModalModule, ClrProgressBarModule } from '@clr/angular';

@Component({
  selector: 'app-progress-item',
  imports: [ClrDatagridModule, ClrIconModule, ClrModalModule, ClrAlertModule, ClrProgressBarModule],
  templateUrl: './progress-item.component.html',
  styleUrl: './progress-item.component.scss',
})
export class ProgressItemComponent {
  @Output() showDetailsEvent = new EventEmitter<void>();

  public openDetails() {
    this.showDetailsEvent.emit();
  }
}
