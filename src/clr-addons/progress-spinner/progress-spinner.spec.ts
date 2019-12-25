/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';

import { ClrProgressSpinnerComponent } from './progress-spinner';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'test-component',
  template: `
    <clr-progress-spinner [clrShowSpinner]="loadingState">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      k
    </clr-progress-spinner>
  `,
})
class TestComponent {
  public loadingState: boolean = false;
}

@NgModule({
  declarations: [ClrProgressSpinnerComponent],
  imports: [ClarityModule, CommonModule],
  exports: [ClrProgressSpinnerComponent],
})
class ClrProgressSpinnerComponentTestModule {}

describe('ProgressSpinnerDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let originalTimeout;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [CommonModule, ClarityModule, ClrProgressSpinnerComponentTestModule],
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
    const loadingOverlay: HTMLLinkElement = fixture.nativeElement.querySelector('.progress-spinner-overlay');
    expect(loadingOverlay).toBe(null);
  });

  it('should be visible after setting the input to true', () => {
    component.loadingState = true;
    fixture.detectChanges();
    const loadingOverlay: HTMLLinkElement = fixture.nativeElement.querySelector('.progress-spinner-overlay');
    expect(loadingOverlay).not.toBe(null);
  });

  it('should be invisible after the minimal visible time', () => {
    jasmine.clock().mockDate();
    component.loadingState = true;
    fixture.detectChanges();
    component.loadingState = false;
    fixture.detectChanges();
    let loadingOverlay: HTMLLinkElement = fixture.nativeElement.querySelector('.progress-spinner-overlay');
    expect(loadingOverlay).not.toBe(null); // the spinner should be visible at least 200 ms
    jasmine.clock().tick(200);
    fixture.detectChanges();
    loadingOverlay = fixture.nativeElement.querySelector('.progress-spinner-overlay');
    expect(loadingOverlay).toBe(null);
  });
});
