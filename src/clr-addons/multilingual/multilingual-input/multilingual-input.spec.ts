/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { ClrMultilingualModule } from '../multilingual.module';

@Component({
  template: `
    <clr-multilingual-input [clrSelectedLang]="selectedLang" [(ngModel)]="data" clrRequiredAllMultilang name="test">
      <label>Test</label>
      <clr-control-error>Error</clr-control-error>
      <clr-control-helper>Helper</clr-control-helper>
    </clr-multilingual-input>
  `,
})
class TestComponentAllValid implements OnInit {
  selectedLang = 'EN';
  data = new Map();

  ngOnInit(): void {
    this.data.set('EN', 'english text');
    this.data.set('DE', 'deutscher text');
  }
}

@Component({
  template: `
    <clr-multilingual-input [clrSelectedLang]="selectedLang" [(ngModel)]="data" clrRequiredOneMultilang name="test">
      <label>Test</label>
      <clr-control-error>Error</clr-control-error>
      <clr-control-helper>Helper</clr-control-helper>
    </clr-multilingual-input>
  `,
})
class TestComponentOneValid implements OnInit {
  selectedLang = 'EN';
  data = new Map();

  ngOnInit(): void {
    this.data.set('EN', 'english text');
    this.data.set('DE', 'deutscher text');
  }
}

describe('Multilingual Input', () => {
  describe('Basic + all required', () => {
    let fixture: ComponentFixture<TestComponentAllValid>;
    let inputEl: HTMLInputElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule, FormsModule, ClrMultilingualModule],
        declarations: [TestComponentAllValid],
        teardown: { destroyAfterEach: false },
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentAllValid);
      fixture.detectChanges();
      inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    beforeEach(waitForAsync(() => {
      fixture.detectChanges();
      fixture.whenStable().then();
    }));

    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });

    it('change text', () => {
      sendInput(inputEl, fixture, 'different english text');
      expect(fixture.componentInstance.data.get('EN')).toBe('different english text');
    });

    it('change text of different lang', () => {
      fixture.componentInstance.selectedLang = 'DE';
      fixture.detectChanges();

      sendInput(inputEl, fixture, 'anderer deutscher text');
      expect(fixture.componentInstance.data.get('DE')).toBe('anderer deutscher text');
    });

    it('show validation error on touched', () => {
      validationShown(false, fixture);

      sendInput(inputEl, fixture, '');
      validationShown(false, fixture);

      inputEl.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      validationShown(true, fixture);
    });
  });

  describe('One required', () => {
    let fixture: ComponentFixture<TestComponentOneValid>;
    let inputEl: HTMLInputElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule, FormsModule, ClrMultilingualModule],
        declarations: [TestComponentOneValid],
        teardown: { destroyAfterEach: false },
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentOneValid);
      fixture.detectChanges();
      inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    beforeEach(waitForAsync(() => {
      fixture.detectChanges();
      fixture.whenStable().then();
    }));

    it('show validation error on touched', () => {
      validationShown(false, fixture);

      inputEl.dispatchEvent(new Event('blur'));
      sendInput(inputEl, fixture, '');
      fixture.componentInstance.selectedLang = 'DE';
      fixture.detectChanges();
      validationShown(false, fixture);

      sendInput(inputEl, fixture, '');
      validationShown(true, fixture);
    });
  });

  function validationShown(shouldBeVisible: boolean, fixture: ComponentFixture<any>): void {
    if (shouldBeVisible) {
      expect(fixture.debugElement.query(By.css('clr-multilingual-input')).classes['clr-error']).toBeTrue();
      expect(fixture.debugElement.query(By.css('clr-control-error'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('clr-control-helper'))).toBeFalsy();
    } else {
      expect(fixture.debugElement.query(By.css('clr-multilingual-input')).classes['clr-error']).toBeFalsy();
      expect(fixture.debugElement.query(By.css('clr-control-error'))).toBeFalsy();
      expect(fixture.debugElement.query(By.css('clr-control-helper'))).toBeTruthy();
    }
  }

  function sendInput(inputEl: HTMLInputElement, fixture: ComponentFixture<any>, text: string): void {
    inputEl.value = text;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }
});
