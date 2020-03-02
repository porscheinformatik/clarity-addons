/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ClarityModule, ɵz as ControlIdService } from '@clr/angular';
import { ClrMultilingualModule } from '../multilingual.module';

@Component({
  template: `
    <clr-multilingual-textarea [clrSelectedLang]="selectedLang" [(ngModel)]="data" clrRequiredAllMultilang name="test">
      <label>Test</label>
      <clr-control-error>Error</clr-control-error>
      <clr-control-helper>Helper</clr-control-helper>
    </clr-multilingual-textarea>
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
    <clr-multilingual-textarea [clrSelectedLang]="selectedLang" [(ngModel)]="data" clrRequiredOneMultilang name="test">
      <label>Test</label>
      <clr-control-error>Error</clr-control-error>
      <clr-control-helper>Helper</clr-control-helper>
    </clr-multilingual-textarea>
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

describe('Multilingual Textarea', () => {
  describe('Basic + all required', () => {
    let fixture: ComponentFixture<TestComponentAllValid>;
    let inputEl: HTMLInputElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule, FormsModule, ClrMultilingualModule],
        declarations: [TestComponentAllValid],
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentAllValid);
      fixture.detectChanges();
      inputEl = fixture.debugElement.query(By.css('textarea')).nativeElement;
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
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentOneValid);
      fixture.detectChanges();
      inputEl = fixture.debugElement.query(By.css('textarea')).nativeElement;
    });

    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable();
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

  it('check correct obfuscated imports', () => {
    expect(new ControlIdService().constructor.name).toBe('ControlIdService');
  });

  function validationShown(shouldBeVisible: boolean, fixture: ComponentFixture<any>) {
    if (shouldBeVisible) {
      expect(fixture.debugElement.query(By.css('clr-multilingual-textarea')).classes['clr-error']).toBeTrue();
      expect(fixture.debugElement.query(By.css('clr-control-error'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('clr-control-helper'))).toBeFalsy();
    } else {
      expect(fixture.debugElement.query(By.css('clr-multilingual-textarea')).classes['clr-error']).toBeFalsy();
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
