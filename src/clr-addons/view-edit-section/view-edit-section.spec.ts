/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, tick, fakeAsync, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';

import { ClrViewEditSectionModule } from './view-edit-section.module';
import { ClrViewEditSection } from './view-edit-section';

@Component({
  template: `
    <clr-view-edit-section
      [clrTitle]="title"
      [clrSaveText]="saveText"
      [clrCancelText]="cancelText"
      [clrEditRef]="editBlock"
      [clrViewRef]="viewBlock"
    >
      <ng-template #viewBlock>
        <div class="view-item">View</div>
      </ng-template>
      <ng-template #editBlock>
        <div class="edit-item">Edit</div>
      </ng-template>
    </clr-view-edit-section>
  `,
})
class TestComponent {
  @ViewChild(ClrViewEditSection, { static: true }) vesInstance: ClrViewEditSection;
  title = 'TestTitle';
  saveText = 'Test Save';
  cancelText = 'Test Cancel';
}

@Component({
  template: `
    <clr-view-edit-section [(clrEditMode)]="editMode">
      <div action-block>Test</div>
    </clr-view-edit-section>
  `,
})
class EditModeComponent {
  editMode = false;
}

@Component({
  template: ` <clr-view-edit-section [clrEditIcon]="editIcon"> </clr-view-edit-section> `,
})
class EditIconComponent {
  editIcon = 'cog';
}

@Component({
  template: ` <clr-view-edit-section [clrEditable]="false"> </clr-view-edit-section> `,
})
class NotEditableComponent {}

describe('ViewEditSectionComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent, EditIconComponent, EditModeComponent, NotEditableComponent],
        imports: [ClarityModule, ClrViewEditSectionModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  function checkMode(componentFixture: ComponentFixture<TestComponent>, isEditMode: boolean): void {
    fixture.detectChanges();
    tick();

    if (isEditMode) {
      expect(componentFixture.componentInstance.vesInstance._editMode).toBeTrue();
      expect(componentFixture.nativeElement.querySelector('.view-item')).toBeNull();
      expect(componentFixture.nativeElement.querySelector('.edit-item')).not.toBeNull();
    } else {
      expect(componentFixture.componentInstance.vesInstance._editMode).toBeFalse();
      expect(componentFixture.nativeElement.querySelector('.view-item')).not.toBeNull();
      expect(componentFixture.nativeElement.querySelector('.edit-item')).toBeNull();
    }
  }

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has correct title', () => {
    expect(fixture.nativeElement.querySelector('.card-title').textContent).toMatch(fixture.componentInstance.title);
  });

  it('has correct save text', fakeAsync(() => {
    fixture.nativeElement.querySelector('.ves-action').click();
    checkMode(fixture, true);

    expect(fixture.nativeElement.querySelector('.ves-save').textContent).toMatch(fixture.componentInstance.saveText);
  }));

  it('has correct cancel text', fakeAsync(() => {
    fixture.nativeElement.querySelector('.ves-action').click();
    checkMode(fixture, true);

    expect(fixture.nativeElement.querySelector('.ves-cancel').textContent).toMatch(
      fixture.componentInstance.cancelText
    );
  }));

  it('switch from view to edit and cancel', fakeAsync(() => {
    spyOn(fixture.componentInstance.vesInstance._editModeChanged, 'emit');
    spyOn(fixture.componentInstance.vesInstance._cancelled, 'emit');

    checkMode(fixture, false);

    fixture.nativeElement.querySelector('.ves-action').click();
    checkMode(fixture, true);
    expect(fixture.componentInstance.vesInstance._editModeChanged.emit).toHaveBeenCalledWith(true);

    fixture.nativeElement.querySelector('.ves-cancel').click();
    checkMode(fixture, false);
    expect(fixture.componentInstance.vesInstance._cancelled.emit).toHaveBeenCalled();
    expect(fixture.componentInstance.vesInstance._editModeChanged.emit).toHaveBeenCalledWith(false);
  }));

  it('switch from view to edit and save', fakeAsync(() => {
    spyOn(fixture.componentInstance.vesInstance._submitted, 'emit');
    spyOn(fixture.componentInstance.vesInstance._editModeChanged, 'emit');

    checkMode(fixture, false);

    fixture.nativeElement.querySelector('.ves-action').click();
    checkMode(fixture, true);
    expect(fixture.componentInstance.vesInstance._editModeChanged.emit).toHaveBeenCalledWith(true);

    fixture.nativeElement.querySelector('.ves-save').click();
    checkMode(fixture, false);
    expect(fixture.componentInstance.vesInstance._submitted.emit).toHaveBeenCalled();
    expect(fixture.componentInstance.vesInstance._editModeChanged.emit).toHaveBeenCalledWith(false);
  }));

  it('has correct edit icon', () => {
    const editFixture: ComponentFixture<EditIconComponent> = TestBed.createComponent(EditIconComponent);
    editFixture.detectChanges();

    expect(editFixture.nativeElement.querySelector('clr-icon').getAttribute('shape')).toMatch(
      editFixture.componentInstance.editIcon
    );
    editFixture.destroy();
  });

  it('has correct action block', () => {
    const editFixture: ComponentFixture<EditModeComponent> = TestBed.createComponent(EditModeComponent);
    editFixture.detectChanges();
    expect(editFixture.nativeElement.querySelector('.ves-action')).toBeNull();
    expect(editFixture.nativeElement.querySelector('[action-block]').textContent).toMatch('Test');
    editFixture.destroy();
  });

  it('is not editable', () => {
    const editFixture: ComponentFixture<NotEditableComponent> = TestBed.createComponent(NotEditableComponent);
    editFixture.detectChanges();
    expect(editFixture.nativeElement.querySelector('.ves-action')).toBeNull();
    expect(editFixture.nativeElement.querySelector('[action-block]')).toBeNull();
    editFixture.destroy();
  });
});
