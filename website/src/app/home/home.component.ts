import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[class.content-container]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterLink],
})
export class HomeComponent {
  constructor() {}
}
