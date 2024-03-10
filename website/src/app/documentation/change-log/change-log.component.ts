import { Component } from '@angular/core';

@Component({
  selector: 'change-log',
  templateUrl: './change-log.component.html',
  styleUrl: './change-log.component.scss',
  host: {
    '[class.content-area]': 'true',
  },
})
export class ChangeLogComponent {}
