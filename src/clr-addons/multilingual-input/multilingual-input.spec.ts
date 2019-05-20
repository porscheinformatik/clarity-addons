/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { ClrMultilingualInputModule } from './multilingual-input.module';

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

  ngOnInit() {
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

  ngOnInit() {
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
        imports: [ClarityModule, FormsModule, ClrMultilingualInputModule],
        declarations: [TestComponentAllValid],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentAllValid);
      inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable();
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

    it('show validation error', () => {
      validationShown(false, fixture);

      sendInput(inputEl, fixture, '');
      validationShown(true, fixture);
    });
  });

  describe('One required', () => {
    let fixture: ComponentFixture<TestComponentOneValid>;
    let inputEl: HTMLInputElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule, FormsModule, ClrMultilingualInputModule],
        declarations: [TestComponentOneValid],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentOneValid);
      inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable();
    }));

    it('show validation error', () => {
      validationShown(false, fixture);

      sendInput(inputEl, fixture, '');
      fixture.componentInstance.selectedLang = 'DE';
      fixture.detectChanges();
      validationShown(false, fixture);

      sendInput(inputEl, fixture, '');
      validationShown(true, fixture);
    });
  });

  function validationShown(shouldBeVisible: boolean, fixture: ComponentFixture<any>) {
    if (shouldBeVisible) {
      expect(fixture.debugElement.query(By.css('clr-multilingual-input')).classes['clr-error']).toBeTrue();
      expect(fixture.debugElement.query(By.css('clr-control-error'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('clr-control-helper'))).toBeFalsy();
    } else {
      expect(fixture.debugElement.query(By.css('clr-multilingual-input')).classes['clr-error']).toBeFalse();
      expect(fixture.debugElement.query(By.css('clr-control-error'))).toBeFalsy();
      expect(fixture.debugElement.query(By.css('clr-control-helper'))).toBeTruthy();
    }
  }

  function sendInput(inputEl: HTMLInputElement, fixture: ComponentFixture<any>, text: string) {
    inputEl.value = text;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }
});
