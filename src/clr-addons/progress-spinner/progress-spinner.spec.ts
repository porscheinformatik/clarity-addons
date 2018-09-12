/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';

import { ClrProgressSpinnerDirective } from './progress-spinner';
import { Component } from '@angular/core';

@Component({
  selector: 'test-component',
  template: `<div [clrProgressSpinner]="loadingState"></div>`,
})
class TestComponent {
  public loadingState: boolean = false;
}

describe('ProgressSpinnerDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let originalTimeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ClrProgressSpinnerDirective],
      imports: [ClarityModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jasmine.clock().uninstall();
    jasmine.clock().install();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 300;
    jasmine.clock().mockDate();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invisible', () => {
    const loadingOverlay: HTMLLinkElement = fixture.nativeElement.querySelector('.loading-overlay');
    const display = loadingOverlay.style.display;
    expect(display).toBe('none');
  });

  it('should be visible after setting the input to true', () => {
    component.loadingState = true;
    fixture.detectChanges();
    const loadingOverlay: HTMLLinkElement = fixture.nativeElement.querySelector('.loading-overlay');
    const display = loadingOverlay.style.display;
    expect(display).toBe('flex');
  });

  it('should be invisible after the minimal visible time', () => {
    jasmine.clock().mockDate();
    component.loadingState = true;
    fixture.detectChanges();
    component.loadingState = false;
    fixture.detectChanges();
    jasmine.clock().tick(200);
    const loadingOverlay: HTMLLinkElement = fixture.nativeElement.querySelector('.loading-overlay');
    const display = loadingOverlay.style.display;
    expect(display).toBe('none');
  });
});
