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
