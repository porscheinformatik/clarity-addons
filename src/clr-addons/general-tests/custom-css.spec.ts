/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <clr-datagrid [class.datagrid-no-select-all]="selectHidden" [(clrDgSelected)]="selected">
      <clr-dg-column>Col1</clr-dg-column>
      <clr-dg-row><clr-dg-cell></clr-dg-cell></clr-dg-row>
    </clr-datagrid>
  `,
})
class DataGridComponent {
  selected: any[] = [];
  selectHidden = true;
}

describe('CustomCSS', () => {
  let fixture: ComponentFixture<DataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataGridComponent],
      imports: [ClarityModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridComponent);
    fixture.detectChanges();
  });

  it('Datagrid select-all hidden', () => {
    expect(
      getComputedStyle(
        fixture.debugElement.query(By.css('.datagrid-header .datagrid-select .clr-checkbox-wrapper')).nativeElement
      ).display
    ).toBe('none');
  });

  it('Datagrid select-all shown', () => {
    fixture.componentInstance.selectHidden = false;
    fixture.detectChanges();
    expect(
      getComputedStyle(
        fixture.debugElement.query(By.css('.datagrid-header .datagrid-select .clr-checkbox-wrapper')).nativeElement
      ).display
    ).not.toBe('none');
  });
});
