import { Component, EventEmitter, HostListener, Output, inject, input } from '@angular/core';
//import { ClrIconModule, ClrTooltipModule } from '@clr/angular';

import { ClrSummaryAreaStateService } from '../summary-area/summary-area-state.service';
import { angleDoubleIcon, ClarityIcons } from '@cds/core/icon';

ClarityIcons.addIcons(angleDoubleIcon);

@Component({
  selector: 'clr-summary-area-toggle',
  standalone: false,
  templateUrl: './summary-area-toggle.component.html',
  styleUrl: './summary-area-toggle.component.scss',
  //imports: [ClrIconModule, ClrTooltipModule],
})
export class ClrSummaryAreaToggleComponent {
  @Output() public readonly summaryToggle = new EventEmitter<void>();

  public readonly disabled = input(false);
  public readonly state = inject(ClrSummaryAreaStateService);
  public readonly collapsed = this.state.collapsed;
  public readonly ariaLabel = 'summary.area.toggle';

  @HostListener('keydown', ['$event'])
  public handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleToggle(event);
    }
  }

  public handleToggle(event?: Event): void {
    event?.preventDefault();
    if (this.disabled()) {
      return;
    }
    this.state.toggle();
    this.summaryToggle.emit();
  }
}
