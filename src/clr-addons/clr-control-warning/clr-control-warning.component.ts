import { Component, Input } from '@angular/core';

@Component({
  selector: 'clr-control-warning',
  templateUrl: './clr-control-warning.component.html',
  styleUrl: './clr-control-warning.demo.css',
})
export class ClrControlWarning {
  @Input() warning: string;
}
