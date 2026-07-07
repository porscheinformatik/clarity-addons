/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrCollapseExpandSection } from './collapse-expand-section';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  template: `
    <clr-collapse-expand-section [clrIsCollapsed]="false">
      <ng-container clr-ces-title>Test Title</ng-container>
      <ng-container clr-ces-subtitle>Test Subtitle</ng-container>
      <ng-container clr-ces-content>Test Content</ng-container>
    </clr-collapse-expand-section>
  `,
  standalone: false,
})
class CollapseExpandSectionHostComponent {}

@Component({
  template: `
    <clr-collapse-expand-section [clrIsCollapsed]="false" [clrDisableHeaderStyles]="true">
      <ng-container clr-ces-title>Test Title</ng-container>
      <ng-container clr-ces-subtitle>Test Subtitle</ng-container>
      <ng-container clr-ces-content>Test Content</ng-container>
    </clr-collapse-expand-section>
  `,
  standalone: false,
})
class CollapseExpandSectionDisabledHeaderStylesHostComponent {}

describe('CollapseExpandSectionComponent', () => {
  let component: ClrCollapseExpandSection;
  let fixture: ComponentFixture<ClrCollapseExpandSection>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClrCollapseExpandSection,
        CollapseExpandSectionHostComponent,
        CollapseExpandSectionDisabledHeaderStylesHostComponent,
      ],
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrCollapseExpandSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be expanded then collapsed', () => {
    component.onCollapseExpand();
    expect(component.isCollapsed).toBeFalse();
    component.onCollapseExpand();
    expect(component.isCollapsed).toBeTrue();
  });

  it('should fire expand event', () => {
    spyOn(component.expanded, 'emit');
    component.onCollapseExpand();
    expect(component.expanded.emit).toHaveBeenCalledTimes(1);
  });

  it('should fire collapse event', () => {
    component.isCollapsed = false;
    spyOn(component.collapsed, 'emit');
    component.onCollapseExpand();
    expect(component.collapsed.emit).toHaveBeenCalledTimes(1);
  });

  it('should project title, subtitle and content', () => {
    const hostFixture = TestBed.createComponent(CollapseExpandSectionHostComponent);
    hostFixture.detectChanges();

    const textContent = hostFixture.nativeElement.textContent;

    expect(textContent).toContain('Test Title');
    expect(textContent).toContain('Test Subtitle');
    expect(textContent).toContain('Test Content');
  });

  it('should project title and subtitle when clrDisableHeaderStyles is true', () => {
    const hostFixture = TestBed.createComponent(CollapseExpandSectionDisabledHeaderStylesHostComponent);
    hostFixture.detectChanges();

    const textContent = hostFixture.nativeElement.textContent;

    expect(textContent).toContain('Test Title');
    expect(textContent).toContain('Test Subtitle');
    expect(textContent).toContain('Test Content');
  });

  it('should toggle when clicking the title', () => {
    const hostFixture = TestBed.createComponent(CollapseExpandSectionHostComponent);
    const section = hostFixture.debugElement.children[0].componentInstance as ClrCollapseExpandSection;
    hostFixture.detectChanges();

    expect(section.isCollapsed).toBeFalse();

    hostFixture.nativeElement.querySelector('.ces-title-trigger').click();

    expect(section.isCollapsed).toBeTrue();
  });
});
