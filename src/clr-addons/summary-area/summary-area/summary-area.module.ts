import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrIconModule, ClrTooltipModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { ClrSummaryAreaComponent } from './summary-area.component';
import { ClrSummaryItemComponent } from '../summary-item/summary-item.component';
import { ClrSummaryItemValueComponent } from '../summary-item-value/summary-item-value.component';
import { ClrSummaryItemValueCopyButtonComponent } from '../summary-item-value-copy-button/summary-item-value-copy-button.component';
import { ClrSummaryAreaToggleComponent } from '../summary-area-toggle/summary-area-toggle.component';
import { angleDoubleIcon, ClarityIcons, copyToClipboardIcon, successStandardIcon } from '@cds/core/icon';

const CLR_SUMMARY_AREA_DIRECTIVES: Type<any>[] = [
  ClrSummaryAreaComponent,
  ClrSummaryAreaToggleComponent,
  ClrSummaryItemComponent,
  ClrSummaryItemValueComponent,
  ClrSummaryItemValueCopyButtonComponent,
];

@NgModule({
  imports: [CommonModule, RouterModule, ClarityModule, ClrIconModule, ClrTooltipModule, CdkCopyToClipboard],
  declarations: [CLR_SUMMARY_AREA_DIRECTIVES],
  exports: [CLR_SUMMARY_AREA_DIRECTIVES],
})
export class ClrSummaryAreaModule {
  constructor() {
    ClarityIcons.addIcons(angleDoubleIcon, copyToClipboardIcon, successStandardIcon);
  }
}
