/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { ClrGenericQuickList } from './generic-quick-list';
import { ClrGenericQuickListModule } from './generic-quick-list.module';

@Component({
  template: `
    <form clrForm>
      <clr-generic-quick-list [clrAllItems]="allItems" [clrMandatory]="isRequired" [clrAddPossible]="isAddPossible">
        <label>Generic Quickie</label>
        <ng-template let-item>
          <clr-input-container>
            <label [hidden]="true"></label>
            <input clrInput [(ngModel)]="item.firstname" required [name]="'first' + item.id" />
            <clr-control-error *clrIfError="'required'">Please enter a value</clr-control-error>
          </clr-input-container>
          <clr-input-container>
            <label [hidden]="true"></label>
            <input clrInput [(ngModel)]="item.lastname" required [name]="'last' + item.id" />
            <clr-control-error *clrIfError="'required'">Please enter a value</clr-control-error>
          </clr-input-container>
        </ng-template>
      </clr-generic-quick-list>
    </form>
  `,
})
class TestComponent {
  @ViewChild(ClrGenericQuickList, { static: true }) quickList: ClrGenericQuickList<any>;

  isRequired = false;
  isAddPossible = true;
  allItems = [{ id: 1, firstname: 'first', lastname: 'last' }, { id: 2, firstname: 'second', lastname: 'secondLast' }];
}

describe('GenericQuickListComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [CommonModule, ClarityModule, FormsModule, ClrGenericQuickListModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('clrRemoved event triggered when item removed', () => {
    spyOn(fixture.componentInstance.quickList.removed, 'emit');
    fixture.debugElement.query(By.css('.btn-trash')).nativeElement.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.allItems.length).toBe(1);
    expect(fixture.componentInstance.quickList.removed.emit).toHaveBeenCalledTimes(1);
  });

  it('clrAdded event triggered when item added', () => {
    spyOn(fixture.componentInstance.quickList.added, 'emit');
    fixture.debugElement.query(By.css('.btn-add')).nativeElement.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.allItems.length).toBe(3);
    expect(fixture.componentInstance.quickList.added.emit).toHaveBeenCalledTimes(1);
  });

  it('disable add button by component input', () => {
    const addButton = fixture.debugElement.query(By.css('.btn-add')).nativeElement;
    expect(addButton.disabled).toBeFalsy();

    fixture.componentInstance.isAddPossible = false;
    fixture.detectChanges();

    expect(addButton.disabled).toBeTruthy();
  });

  it('disable remove button on last item when required', () => {
    fixture.componentInstance.allItems = [fixture.componentInstance.allItems[0]];
    fixture.detectChanges();

    const trashButtons = fixture.debugElement.queryAll(By.css('.btn-trash'));
    expect(trashButtons.length).toBe(1);
    expect(trashButtons[0].nativeElement.disabled).toBeFalsy();

    fixture.componentInstance.isRequired = true;
    fixture.detectChanges();

    expect(trashButtons[0].nativeElement.disabled).toBeTruthy();
  });
});
