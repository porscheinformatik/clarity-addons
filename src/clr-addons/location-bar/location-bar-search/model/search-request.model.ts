import { TemplateRef } from '@angular/core';

export interface SearchRequestModel {
  placeholder?: string;
  noResultsText?: string;

  maxResults?: number;
  minSearchText?: number;

  searchResultItemRef?: TemplateRef<any>;
}
