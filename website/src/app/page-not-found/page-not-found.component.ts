import { Component } from '@angular/core';

@Component({
  selector: 'page-not-found',
  templateUrl: 'page-not-found.component.html',
  styleUrls: ['page-not-found.component.css'],
  host: {
    '[class.content-container]': 'true',
  },
  standalone: false,
})
export class PageNotFoundComponent {
  constructor() {}
}
