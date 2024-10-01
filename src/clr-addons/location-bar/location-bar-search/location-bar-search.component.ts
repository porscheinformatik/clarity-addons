import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SearchRequestModel } from '../location-bar.search.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'clr-location-bar-search',
  templateUrl: './location-bar-search.component.html',
  styleUrls: ['location-bar-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationBarSearchComponent implements OnInit {
  searchControl = new FormControl('');
  previousValue: string = '';
  displayWarning: boolean = false;

  readonly MIN_CHARACTERS_DEFAULT: number = 3;
  readonly MIM_CHARACTERS_TEXT_DEFAULT: string = 'Type 3+ characters to search.';

  @Input('clrSearchRequest') searchRequest: SearchRequestModel;

  @Output('searchPerformed') searchPerformed = new EventEmitter<string>();

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(text => this.onSearch(text));
  }

  private onSearch(text: string) {
    const validatedText = this.validateSearchText(text);
    if (validatedText !== null) {
      this.searchPerformed.emit(validatedText);
      this.displayWarning = false;
    }
  }

  private validateSearchText(text: string): string {
    const isDeletion = this.isTextDeletion(text);
    this.displayWarning = text.length < this.getMinSearchTextLength();
    if (isDeletion) {
      return text.length >= this.getMinSearchTextLength() ? text : '';
    } else {
      return text.length >= this.getMinSearchTextLength() ? text : null;
    }
  }

  public focusInput(): void {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    });
  }

  private isTextDeletion(text: string): boolean {
    const isDeletion = text.length < this.previousValue.length;
    this.previousValue = text;
    return isDeletion;
  }

  private getMinSearchTextLength(): number {
    return this.searchRequest?.minCharacters !== undefined
      ? this.searchRequest.minCharacters
      : this.MIN_CHARACTERS_DEFAULT;
  }

  preventDropdownActions(event: Event) {
    event.stopPropagation();
  }
}
