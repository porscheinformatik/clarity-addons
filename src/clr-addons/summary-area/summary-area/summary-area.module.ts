import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrIconModule, ClrTooltipModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { ClrSummaryArea } from './summary-area';
import { ClrSummaryItem } from '../summary-item/summary-item';
import { ClrSummaryItemValue } from '../summary-item-value/summary-item-value';
import { ClrSummaryItemValueCopyButtonComponent } from '../summary-item-value-copy-button/summary-item-value-copy-button';
import { ClrSummaryAreaToggle } from '../summary-area-toggle/summary-area-toggle';
import { angleDoubleIcon, ClarityIcons, copyToClipboardIcon, successStandardIcon } from '@cds/core/icon';

const CLR_SUMMARY_AREA_DIRECTIVES: Type<any>[] = [
  ClrSummaryArea,
  ClrSummaryAreaToggle,
  ClrSummaryItem,
  ClrSummaryItemValue,
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
