import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { LocationBarComponent } from './location-bar.component';
import { LocationBarNodeComponent } from './location-bar-node/location-bar-node.component';

@NgModule({
  declarations: [LocationBarComponent, LocationBarNodeComponent],
  imports: [CommonModule, ClrIconModule, ClrDropdownModule],
  exports: [LocationBarComponent],
})
export class ClrLocationBarModule {}
