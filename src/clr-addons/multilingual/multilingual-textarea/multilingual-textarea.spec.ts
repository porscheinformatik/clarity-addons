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

  ngOnInit(): void {
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

  ngOnInit(): void {
    this.data.set('EN', 'english text');
    this.data.set('DE', 'deutscher text');
  }
}

@Component({
  template: `
    <clr-multilingual-textarea
      [clrSelectedLang]="selectedLang"
      [clrLanguages]="languages"
      clrMissingPrefix="<na> "
      clrFallbackLang="FR"
      [(ngModel)]="data"
      name="test"
    >
      <label>Test</label>
      <clr-control-error>Error</clr-control-error>
      <clr-control-helper>Helper</clr-control-helper>
    </clr-multilingual-textarea>
  `,
})
class TestComponentComplex implements OnInit {
  selectedLang = 'EN';
  languages = ['EN', 'DE', 'PT'];
  data = new Map();

  ngOnInit(): void {
    this.data.set('EN', 'english text');
    this.data.set('DE', 'deutscher text');
    this.data.set('FR', 'texte français');
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
        teardown: { destroyAfterEach: false },
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentAllValid);
      fixture.detectChanges();
      inputEl = fixture.debugElement.query(By.css('textarea')).nativeElement;
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
      inputEl = fixture.debugElement.query(By.css('textarea')).nativeElement;
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

  describe('Complex tests', () => {
    let fixture: ComponentFixture<TestComponentComplex>;
    let inputEl: HTMLInputElement;
    let langSelector: HTMLButtonElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule, FormsModule, ClrMultilingualModule],
        declarations: [TestComponentComplex],
        teardown: { destroyAfterEach: false },
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponentComplex);
      fixture.detectChanges();
      inputEl = fixture.debugElement.query(By.css('textarea')).nativeElement;
    });

    beforeEach(waitForAsync(() => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        langSelector = fixture.debugElement.query(By.css('.clr-multilingual-button')).nativeElement;
      });
    }));

    it('show missing prefix -> fallback lang not present', () => {
      fixture.componentInstance.data.delete('FR');
      fixture.componentInstance.data = new Map(fixture.componentInstance.data);
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(fixture.componentInstance.data.size).toBe(2);
        expect(fixture.componentInstance.data.get('EN')).toBe('english text');
        expect(fixture.componentInstance.data.get('DE')).toBe('deutscher text');

        langSelector.click();
        fixture.detectChanges();

        const langSelectorElements = getLanguageSelectorElements(fixture);
        expect(langSelectorElements.size).toBe(2);
        expect(langSelectorElements.get('DE')).toBe('deutscher text');
        expect(langSelectorElements.get('PT')).toBe('<na> deutscher text');
      });
    });

    it('show missing prefix -> hidden language', () => {
      expect(fixture.componentInstance.data.size).toBe(3);
      expect(fixture.componentInstance.data.get('EN')).toBe('english text');
      expect(fixture.componentInstance.data.get('DE')).toBe('deutscher text');
      expect(fixture.componentInstance.data.get('FR')).toBe('texte français');

      langSelector.click();
      fixture.detectChanges();

      const langSelectorElements = getLanguageSelectorElements(fixture);
      expect(langSelectorElements.size).toBe(2);
      expect(langSelectorElements.get('DE')).toBe('deutscher text');
      expect(langSelectorElements.get('PT')).toBe('<na> texte français');
    });

    it('leave hidden languages untouched', () => {
      expect(fixture.componentInstance.data.size).toBe(3);
      expect(fixture.componentInstance.data.get('EN')).toBe('english text');
      expect(fixture.componentInstance.data.get('DE')).toBe('deutscher text');
      expect(fixture.componentInstance.data.get('FR')).toBe('texte français');

      langSelector.click();
      fixture.detectChanges();

      const langSelectorElements = getLanguageSelectorElements(fixture);
      expect(langSelectorElements.size).toBe(2);
      expect(langSelectorElements.get('DE')).toBe('deutscher text');
      expect(langSelectorElements.get('PT')).toBe('<na> texte français');

      sendInput(inputEl, fixture, 'different english text');
      expect(fixture.componentInstance.data.size).toBe(3);
      expect(fixture.componentInstance.data.get('EN')).toBe('different english text');
      expect(fixture.componentInstance.data.get('DE')).toBe('deutscher text');
      expect(fixture.componentInstance.data.get('FR')).toBe('texte français');
    });
  });

  function validationShown(shouldBeVisible: boolean, fixture: ComponentFixture<any>): void {
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

  function sendInput(inputEl: HTMLInputElement, fixture: ComponentFixture<any>, text: string): void {
    inputEl.value = text;
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function getLanguageSelectorElements(fixture: ComponentFixture<any>): Map<string, string> {
    return new Map(
      fixture.debugElement.queryAll(By.css('.clr-multilingual-dd-entry')).map(elem => {
        const lang = (elem.children[0].nativeElement as HTMLSpanElement).innerText;
        return [lang, (elem.nativeElement as HTMLElement).innerText.substring(lang.length)];
      })
    );
  }
});
