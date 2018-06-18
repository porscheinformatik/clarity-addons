/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';

import { ClrViewEditSectionModule } from './view-edit-section.module';
import { ClrViewEditSection } from './view-edit-section';

@Component({
  template: `
        <clr-view-edit-section [clrTitle]="title">
            <div view-block>
                <div class="view-item">View</div>
            </div>
            <div edit-block>
                <div class="edit-item">Edit</div>
            </div>
        </clr-view-edit-section>
    `,
})
class TestComponent {
  @ViewChild(ClrViewEditSection) vesInstance: ClrViewEditSection;
  title: string = 'TestTitle';
}

@Component({
  template: `
        <clr-view-edit-section [clrEditIcon]="editIcon">
        </clr-view-edit-section>
    `,
})
class EditIconComponent {
  editIcon: string = 'cog';
}

describe('ViewEditSectionComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, EditIconComponent],
      imports: [ClarityModule, ClrViewEditSectionModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  function checkMode(componentFixture: ComponentFixture<TestComponent>, isEditMode: boolean) {
    fixture.detectChanges();
    tick();

    if (isEditMode) {
      expect(componentFixture.componentInstance.vesInstance._editMode).toBeTrue();
      expect(componentFixture.nativeElement.querySelector('[view-block]')).toBeNull();
      expect(componentFixture.nativeElement.querySelector('[edit-block]')).not.toBeNull();
    } else {
      expect(componentFixture.componentInstance.vesInstance._editMode).toBeFalse();
      expect(componentFixture.nativeElement.querySelector('[view-block]')).not.toBeNull();
      expect(componentFixture.nativeElement.querySelector('[edit-block]')).toBeNull();
    }
  }

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct title', () => {
    expect(fixture.nativeElement.querySelector('.card-title').textContent).toMatch(fixture.componentInstance.title);
  });

  it(
    'switch from view to edit and cancel',
    fakeAsync(() => {
      checkMode(fixture, false);

      fixture.nativeElement.querySelector('.ves-edit').click();
      checkMode(fixture, true);

      spyOn(fixture.componentInstance.vesInstance._cancelled, 'emit');
      fixture.nativeElement.querySelector('.ves-cancel').click();
      checkMode(fixture, false);
      expect(fixture.componentInstance.vesInstance._cancelled.emit).toHaveBeenCalled();
    })
  );

  it(
    'switch from view to edit and save',
    fakeAsync(() => {
      checkMode(fixture, false);

      fixture.nativeElement.querySelector('.ves-edit').click();
      checkMode(fixture, true);

      spyOn(fixture.componentInstance.vesInstance._submitted, 'emit');
      fixture.nativeElement.querySelector('.ves-save').click();
      checkMode(fixture, false);
      expect(fixture.componentInstance.vesInstance._submitted.emit).toHaveBeenCalled();
    })
  );

  it('has correct edit icon', () => {
    const editFixture: ComponentFixture<EditIconComponent> = TestBed.createComponent(EditIconComponent);
    editFixture.detectChanges();
    expect(editFixture.nativeElement.querySelector('clr-icon').getAttribute('shape')).toMatch(
      editFixture.componentInstance.editIcon
    );
    editFixture.destroy();
  });
});
