/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { Component } from '@angular/core';
import { ClrMainNavGroupModule } from './main-nav-group.module';
import { RouterModule } from '@angular/router';

@Component({
  template: `
    <div class="main-container"
      [class.open-hamburger-menu]="hamburgerMenu">
      <div class="header">
        <div class="header-nav">
          <clr-main-nav-group [class.active]="menuActive">
            <a class="nav-link dropdown-item" [class.active]="menuActive">Menu1</a>
            <a class="nav-link dropdown-item">Menu2</a>
          </clr-main-nav-group>
        </div>
      </div>
    </div>
  `,
})
class TestComponent {
  hamburgerMenu: boolean = false;
  menuActive: boolean = false;
}

describe('ClrMainNavGroupComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ClarityModule, ClrMainNavGroupModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  function checkNavVisible(componentFixture: ComponentFixture<TestComponent>, isVisible: boolean) {
    fixture.detectChanges();

    const displayStyle: string = window
      .getComputedStyle(<HTMLElement>componentFixture.nativeElement.querySelector('.nav-list'))
      .getPropertyValue('visibility');

    const input = <HTMLInputElement>componentFixture.nativeElement.querySelector('input[type=checkbox]');

    if (isVisible) {
      expect(input.checked).toBeTrue();
      expect(displayStyle).toBe('visible');
    } else {
      expect(input.checked).toBeFalse();
      expect(displayStyle).toBe('hidden');
    }
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hide nav-list when the nav is collapsed', () => {
    checkNavVisible(fixture, false);
  });

  it('show nav-list when the nav is expanded from nav-text', () => {
    fixture.nativeElement.querySelector('.collapsible > .nav-text').click();

    checkNavVisible(fixture, true);
  });

  it('show nav-list when the nav is expanded from collapsible', () => {
    fixture.nativeElement.querySelector('.collapsible').click();

    checkNavVisible(fixture, true);
  });

  it('hide nav-list when clicking outside the main-nav-group', () => {
    fixture.nativeElement.querySelector('.collapsible > .nav-text').click();
    checkNavVisible(fixture, true);

    fixture.nativeElement.click();
    checkNavVisible(fixture, false);
  });

  it('show nav-list in hamburger menu when the nav is expanded from nav-text', () => {
    checkNavVisible(fixture, false);

    component.hamburgerMenu = true;
    fixture.nativeElement.querySelector('.collapsible').click();

    checkNavVisible(fixture, true);
  });

  it('dont hide nav-list in hamburger menu when clicking outside the main-nav-group', () => {
    component.hamburgerMenu = true;
    fixture.nativeElement.querySelector('.collapsible > .nav-text').click();
    checkNavVisible(fixture, true);

    fixture.nativeElement.click();
    checkNavVisible(fixture, true);
  });

  it('expand nav-list in hamburger menu automatically when any link is active', () => {
    component.hamburgerMenu = true;
    component.menuActive = true;
    checkNavVisible(fixture, true);
  });
});
