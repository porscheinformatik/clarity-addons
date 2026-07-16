/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';

import { ClrViewEditSectionModule } from './view-edit-section.module';
import { ClrViewEditSection } from './view-edit-section';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <clr-view-edit-section
      [clrTitle]="title"
      [clrSaveText]="saveText"
      [clrCancelText]="cancelText"
      [clrEditRef]="editBlock"
      [clrViewRef]="viewBlock"
      [clrIsCollapsible]="true"
    >
      <ng-template #viewBlock>
        <div class="view-item">View</div>
      </ng-template>
      <ng-template #editBlock>
        <div class="edit-item">Edit</div>
      </ng-template>
    </clr-view-edit-section>
  `,
  standalone: false,
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
  standalone: false,
})
class EditModeComponent {
  editMode = false;
}

@Component({
  template: ` <clr-view-edit-section [clrEditIcon]="editIcon"></clr-view-edit-section> `,
  standalone: false,
})
class EditIconComponent {
  editIcon = 'cog';
}

@Component({
  template: ` <clr-view-edit-section [clrEditable]="false"></clr-view-edit-section> `,
  standalone: false,
})
class NotEditableComponent {}

@Component({
  template: `
    <clr-view-edit-section
      clrTitle="Badge title"
      [clrShowBadge]="showBadge"
      [clrBadgeContent]="badgeContent"
      [clrBadgeClass]="badgeClass"
    >
    </clr-view-edit-section>
  `,
  standalone: false,
})
class StringBadgeComponent {
  showBadge = true;
  badgeContent = 'Badge content';
  badgeClass: string | string[] = 'label label-primary';
}

@Component({
  template: `
    <clr-view-edit-section clrTitle="Badge title" [clrShowBadge]="showBadge">
      <span badge class="custom-projected-badge">Projected</span>
    </clr-view-edit-section>
  `,
  standalone: false,
})
class ProjectedBadgeComponent {
  showBadge = true;
}

describe('ViewEditSectionComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: ClrViewEditSection;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        EditIconComponent,
        EditModeComponent,
        NotEditableComponent,
        StringBadgeComponent,
        ProjectedBadgeComponent,
      ],
      imports: [ClarityModule, ClrViewEditSectionModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance.vesInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  function checkMode(componentFixture: ComponentFixture<TestComponent>, isEditMode: boolean): void {
    fixture.detectChanges();
    tick();

    if (isEditMode) {
      expect(componentFixture.componentInstance.vesInstance.editMode).toBeTrue();
      expect(componentFixture.nativeElement.querySelector('.view-item')).toBeNull();
      expect(componentFixture.nativeElement.querySelector('.edit-item')).not.toBeNull();
    } else {
      expect(componentFixture.componentInstance.vesInstance.editMode).toBeFalse();
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

    expect(editFixture.nativeElement.querySelector('cds-icon').getAttribute('shape')).toMatch(
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

  it('should be expanded then collapsed', () => {
    component.onCollapseExpand();
    expect(component._isCollapsed).toBeTrue();
    component.onCollapseExpand();
    expect(component._isCollapsed).toBeFalse();
  });

  it('should fire collapse state changed event twice', () => {
    spyOn(component._isCollapsedChange, 'emit');
    component.onCollapseExpand();
    expect(component._isCollapsedChange.emit).toHaveBeenCalledWith(true);
    component.onCollapseExpand();
    expect(component._isCollapsedChange.emit).toHaveBeenCalledWith(false);
    expect(component._isCollapsedChange.emit).toHaveBeenCalledTimes(2);
  });

  it('should have no collapse icon when in edit mode', () => {
    component.onEdit();
    fixture.changeDetectorRef.detectChanges();
    expect(fixture.nativeElement.querySelector('.ces-caret-btn')).toBeNull();
  });

  it('should toggle when clicking the title', () => {
    expect(component._isCollapsed).toBeFalse();

    fixture.nativeElement.querySelector('.ces-title-trigger').click();

    expect(component._isCollapsed).toBeTrue();
  });

  it('shows the string badge with default class', () => {
    const badgeFixture: ComponentFixture<StringBadgeComponent> = TestBed.createComponent(StringBadgeComponent);
    badgeFixture.detectChanges();

    const badge = badgeFixture.nativeElement.querySelector('.ves-badge');
    expect(badge).not.toBeNull();
    expect(badge.textContent).toContain('Badge content');
    expect(badge.classList).toContain('label');
    expect(badge.classList).toContain('label-primary');
    badgeFixture.destroy();
  });

  it('applies a custom badge class', () => {
    const badgeFixture: ComponentFixture<StringBadgeComponent> = TestBed.createComponent(StringBadgeComponent);
    badgeFixture.componentInstance.badgeClass = 'label label-warning';
    badgeFixture.detectChanges();

    const badge = badgeFixture.nativeElement.querySelector('.ves-badge');
    expect(badge.classList).toContain('label-warning');
    expect(badge.classList).not.toContain('label-primary');
    badgeFixture.destroy();
  });

  it('does not render the string badge when clrShowBadge is false', () => {
    const badgeFixture: ComponentFixture<StringBadgeComponent> = TestBed.createComponent(StringBadgeComponent);
    badgeFixture.componentInstance.showBadge = false;
    badgeFixture.detectChanges();

    expect(badgeFixture.nativeElement.querySelector('.ves-badge')).toBeNull();
    badgeFixture.destroy();
  });

  it('renders a projected badge when clrShowBadge is true', () => {
    const badgeFixture: ComponentFixture<ProjectedBadgeComponent> = TestBed.createComponent(ProjectedBadgeComponent);
    badgeFixture.detectChanges();

    const projected = badgeFixture.nativeElement.querySelector('[badge].custom-projected-badge');
    expect(projected).not.toBeNull();
    expect(projected.textContent).toContain('Projected');
    badgeFixture.destroy();
  });

  it('does not render a projected badge when clrShowBadge is false', () => {
    const badgeFixture: ComponentFixture<ProjectedBadgeComponent> = TestBed.createComponent(ProjectedBadgeComponent);
    badgeFixture.componentInstance.showBadge = false;
    badgeFixture.detectChanges();

    expect(badgeFixture.nativeElement.querySelector('[badge].custom-projected-badge')).toBeNull();
    badgeFixture.destroy();
  });
});
