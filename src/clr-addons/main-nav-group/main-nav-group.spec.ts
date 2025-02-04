/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { Component } from '@angular/core';
import { ClrMainNavGroupModule } from './main-nav-group.module';

@Component({
  template: `
    <div class="main-container" [class.open-hamburger-menu]="hamburgerMenu">
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
  standalone: false,
})
class TestComponent {
  hamburgerMenu = false;
  menuActive = false;
}

describe('ClrMainNavGroupComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ClarityModule, ClrMainNavGroupModule],
      teardown: { destroyAfterEach: false },
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

  function checkNavVisible(componentFixture: ComponentFixture<TestComponent>, isVisible: boolean): void {
    fixture.detectChanges();

    const displayStyle: string = window
      .getComputedStyle(componentFixture.nativeElement.querySelector('.nav-list') as HTMLElement)
      .getPropertyValue('visibility');

    const input = componentFixture.nativeElement.querySelector('input[type=checkbox]') as HTMLInputElement;

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
