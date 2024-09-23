import { TemplateRef } from '@angular/core';
import { LocationBarNode, NodeId } from './location-bar.model';

export interface SearchRequestModel {
  placeholder?: string;
  noResultsText?: string;

  minCharacters?: number;
  minCharacterText?: string;

  searchResultItemRef?: TemplateRef<any>;
}

export interface SearchResponseModel<T extends NodeId> {
  text?: string;
  searchableNodes?: LocationBarNode<T>[];
}

export interface SearchResultModel {
  [key: string]: string;
}
