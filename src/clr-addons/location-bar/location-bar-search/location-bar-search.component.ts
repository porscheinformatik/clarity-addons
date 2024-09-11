import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchRequestModel } from '../location-bar.search.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'clr-location-bar-search',
  templateUrl: './location-bar-search.component.html',
  styleUrls: ['location-bar-search.component.scss'],
})
export class LocationBarSearchComponent implements OnInit {
  searchControl = new FormControl('');
  previousValue: string = '';

  readonly MIN_SEARCH_TEXT_DEFAULT: number = 3;

  @Input('clrSearchRequest') searchRequest: SearchRequestModel;

  @Output('searchPerformed') searchPerformed = new EventEmitter<string>();

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(text => this.onSearch(text));
  }

  private onSearch(text: string) {
    if (this.validateSearchText(text)) {
      this.searchPerformed.emit(text);
    }
  }

  private validateSearchText(text: string): boolean {
    if (this.isTextDeletion(text)) {
      return true;
    }

    return text.length >= this.getMinSearchTextLength();
  }

  private isTextDeletion(text: string): boolean {
    const isDeletion = text.length < this.previousValue.length;
    this.previousValue = text;
    return isDeletion;
  }

  private getMinSearchTextLength(): number {
    return this.searchRequest?.minSearchText !== undefined
      ? this.searchRequest.minSearchText
      : this.MIN_SEARCH_TEXT_DEFAULT;
  }

  preventDropdownActions(event: KeyboardEvent) {
    event.stopPropagation();
  }
}
