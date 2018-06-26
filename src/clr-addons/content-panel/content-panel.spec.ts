/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrContentPanel } from './content-panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContentPanelComponent', () => {
  let component: ClrContentPanel;
  let fixture: ComponentFixture<ClrContentPanel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClrContentPanel],
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrContentPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be opened', () => {
    component.open();
    expect(component.isOpen()).toBeTrue();
  });

  it('should be closed', () => {
    component.open();
    component.close();
    expect(component.isOpen()).toBeFalse();
  });

  it('should fire open event', () => {
    spyOn(component.opened, 'emit');
    component.open();
    expect(component.opened.emit).toHaveBeenCalledTimes(1);
  });

  it('should fire close event', () => {
    component.open();
    spyOn(component.closed, 'emit');
    component.close();
    expect(component.closed.emit).toHaveBeenCalledTimes(1);
  });
});
