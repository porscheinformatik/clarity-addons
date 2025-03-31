import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrComboboxModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrFormModule } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-combobox-demo',
  templateUrl: './combobox.demo.html',
  imports: [CommonModule, ClarityModule, FormsModule, ReactiveFormsModule, ClrComboboxModule, ClrFormModule],
})
export class ComboboxDemo {
  public items: string[] = [
    'Item 1',
    'Item 2 is very very very very very very very very very very very very very very very very very long',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6 is also very very very very very very very very very very long',
    'Item 7',
  ];

  public singleSelection: string;
  public multiSelection: string[] = [];
  public multiSelectionVertical: string[] = [];
}
