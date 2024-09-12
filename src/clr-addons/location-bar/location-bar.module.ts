import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule, ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { LocationBarComponent } from './location-bar.component';
import { LocationBarNodeComponent } from './location-bar-node/location-bar-node.component';
import { ClrDropdownOverflowModule } from '../dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrAutocompleteOffModule } from '../autocomplete-off';
import { ClrFormModule } from '../abstract-form-component';
import { ClrSearchFieldModule } from '../searchfield';
import { LocationBarSearchComponent } from './location-bar-search/location-bar-search.component';

@NgModule({
  declarations: [LocationBarComponent, LocationBarNodeComponent, LocationBarSearchComponent],
  imports: [
    CommonModule,
    ClrIconModule,
    ClrDropdownModule,
    ClrDropdownOverflowModule,
    ClarityModule,
    FormsModule,
    ClrAutocompleteOffModule,
    ClrFormModule,
    ClrSearchFieldModule,
    ReactiveFormsModule,
  ],
  exports: [LocationBarComponent],
})
export class ClrLocationBarModule {}
