import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { LocationBarComponent } from './location-bar.component';
import { LocationBarNodeComponent } from './location-bar-node/location-bar-node.component';
import { ClrDropdownOverflowModule } from '../dropdown';

@NgModule({
  declarations: [LocationBarComponent, LocationBarNodeComponent],
  imports: [CommonModule, ClrIconModule, ClrDropdownModule, ClrDropdownOverflowModule],
  exports: [LocationBarComponent],
})
export class ClrLocationBarModule {}
