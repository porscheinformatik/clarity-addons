import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'page-not-found',
  templateUrl: 'page-not-found.component.html',
  styleUrls: ['page-not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  host: {
    '[class.content-container]': 'true',
  },
})
export class PageNotFoundComponent {
  constructor() {}
}
