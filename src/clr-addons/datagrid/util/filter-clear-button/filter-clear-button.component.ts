import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClarityIcons, trashIcon } from '@clr/angular/icon';

ClarityIcons.addIcons(trashIcon);

/**
 * Shared "clear filter" trash-can button used by the addon-style datagrid
 * filters (clr-string-filter, clr-numeric-filter). Purely presentational:
 * the consumer decides what "clear" means for its own filter state.
 */
@Component({
  selector: 'clr-filter-clear-button',
  templateUrl: './filter-clear-button.component.html',
  styleUrls: ['./filter-clear-button.component.scss'],
  standalone: false,
})
export class ClrFilterClearButtonComponent {
  @Input() testId = 'filter-clear-button';
  @Output() clear = new EventEmitter<void>();
}
