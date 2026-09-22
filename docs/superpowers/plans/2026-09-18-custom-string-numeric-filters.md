# Implementation Plan: Custom String & Numeric Datagrid Filters

## Goal

Add two new addon-style Clarity Datagrid filter components — `clr-string-filter`
and `clr-numeric-filter` — that mirror the existing `clr-date-filter` /
`clr-enum-filter` pattern (standalone `clrProperty` input, nested-property
support, `ClrDatagridFilterInterface` implementation) and include a trash-can
"clear filter" button. Extract the shared trash-button markup into a reusable
component and relocate `NestedProperty` into a shared `datagrid/util`
location so all four filters can eventually use it. Ship a new documentation
page on the website demonstrating both filters together.

## Spec

`docs/superpowers/specs/2026-09-18-custom-string-numeric-filters-design.md`
(committed, approved). This plan implements that spec in full; consult it for
rationale behind API shapes, debounce timing, and out-of-scope items
(low>high cross-validation, updating `date-filter`/`enum-filter` to use the
new shared button, and the 7-app rollout).

## Architecture

```
src/clr-addons/datagrid/
  util/
    nested-property.ts          (moved from date-filter/, unchanged content)
    nested-property.spec.ts     (new)
    index.ts                    (new barrel: util re-exports, internal only)
    filter-clear-button/
      filter-clear-button.component.ts
      filter-clear-button.component.html
      filter-clear-button.component.scss
      filter-clear-button.component.spec.ts
      filter-clear-button.module.ts
      index.ts
  string-filter/
    string-filter.component.ts
    string-filter.component.html
    string-filter.component.scss
    string-filter.component.spec.ts
    string-filter.module.ts
    index.ts
  numeric-filter/
    numeric-filter.component.ts
    numeric-filter.component.html
    numeric-filter.component.scss
    numeric-filter.component.spec.ts
    numeric-filter.module.ts
    index.ts
  date-filter/
    date-filter.component.ts      (modify: import NestedProperty from '../util/nested-property')
    nested-property.ts            (deleted)
  index.ts                        (modify: add string-filter/numeric-filter exports)
src/clr-addons/
  clr-addons.module.ts             (modify: import+export the two new modules)
website/src/app/documentation/
  demos/custom-filters/
    custom-filters.demo.ts
    custom-filters.demo.html
    custom-filters.demo.module.ts
  documentation-routing.module.ts  (modify: add 'custom-filters' route)
website/src/settings/
  componentlist.json               (modify: add 'custom-filters' nav entry)
```

`util/` is a new non-public-API folder (no barrel export from
`datagrid/index.ts`) purely for code shared between filter implementations,
matching how `nested-property.ts` was already unexported. The
`filter-clear-button` component IS exported from its own `index.ts` so
`string-filter.module.ts` / `numeric-filter.module.ts` can import
`ClrFilterClearButtonModule`, but it is **not** re-exported from
`datagrid/index.ts` or `clr-addons.module.ts` — it is plumbing for the two
new filters only, not a public addon API surface (per spec, `date-filter`
and `enum-filter` keep their own inline trash-button markup this iteration).

## Tech Stack

- Angular (NgModule-based, `standalone: false` components) — matches existing
  `date-filter`/`enum-filter` convention.
- RxJS (`Subject`, `debounceTime`, `distinctUntilChanged`) for the 500ms
  input debounce.
- `@clr/angular` (`ClrDatagridFilter`, `ClrDatagridFilterInterface`,
  `ClrCommonStringsService`, `ClarityIcons`/`trashIcon`, `clr-input-container`,
  `clr-number-input-container`).
- Testing: Karma + Jasmine, `ng test clr-addons --watch false`
  (`fakeAsync`/`tick` for debounce assertions).
- Linting: `npm run lint` (`eslint "src/clr-addons/**/*.ts" "src/dev/**/*.ts"`).

## Global Constraints

- Every new/modified TypeScript file must pass `npm run lint`.
- Every new component ships with a co-located `.spec.ts`; run
  `ng test clr-addons --watch false` after each task and confirm the new
  specs plus the full existing suite (especially `date-filter.component.spec.ts`)
  still pass.
- Follow existing code style exactly: Allman-style is NOT used here — this
  package follows the _existing TypeScript/Angular file conventions already
  in `src/clr-addons/datagrid/_`\* (K&R-ish Angular/Prettier formatting, 2-space
  indent) — do not reformat unrelated code. (The global Allman-brace rule
  applies to Java; this is a TypeScript/Angular library and must follow the
  surrounding TS file conventions instead.)
- The husky pre-commit hook (`pretty-quick --staged` + license-header
  auto-fixer) runs on every commit — do not hand-write license headers; let
  the hook add them, then verify they were added correctly after committing.
- Always `git commit --amend` per repo convention if fixing up work from the
  same logical change within this plan's execution; do NOT create a fresh
  commit per task unless explicitly instructed by the execution skill in use
  — follow whatever the chosen execution skill (subagent-driven-development /
  executing-plans) directs for commit granularity, but never touch the
  `Change-Id:` trailer and never `git add -A`.
- No new npm dependencies. No changes to `date-filter`/`enum-filter` runtime
  behavior (only the one-line import path fix in `date-filter.component.ts`).
- Do not add low/high cross-field validation to the numeric filter (explicit
  spec non-goal).

---

## Task 1: Relocate `NestedProperty` to `datagrid/util/`

Pure relocation with a new test file (no prior spec existed for this class).
Keeps `date-filter` working unchanged aside from its import path.

**Files:**

- Create: `src/clr-addons/datagrid/util/nested-property.ts`
- Create: `src/clr-addons/datagrid/util/nested-property.spec.ts`
- Create: `src/clr-addons/datagrid/util/index.ts`
- Modify: `src/clr-addons/datagrid/date-filter/date-filter.component.ts` (import path only)
- Delete: `src/clr-addons/datagrid/date-filter/nested-property.ts`

**Interfaces:**

- Consumes: nothing new.
- Produces: `NestedProperty` class, importable from
  `../util/nested-property` (relative) — used by Tasks 3 and 4.

**Steps:**

1. Write the failing test first. Create
   `src/clr-addons/datagrid/util/nested-property.spec.ts`:

   ```ts
   import { NestedProperty } from './nested-property';

   describe('NestedProperty', () => {
     it('reads a top-level property', () => {
       const prop = new NestedProperty('name');

       expect(prop.getPropValue({ name: 'Alpha' })).toBe('Alpha');
     });

     it('reads a nested property via dot notation', () => {
       const prop = new NestedProperty('address.city');

       expect(prop.getPropValue({ address: { city: 'Vienna' } })).toBe('Vienna');
     });

     it('returns undefined when an intermediate property is missing', () => {
       const prop = new NestedProperty('address.city');

       expect(prop.getPropValue({ address: null })).toBeUndefined();
       expect(prop.getPropValue({})).toBeUndefined();
     });

     it('exposes the original prop string', () => {
       const prop = new NestedProperty('address.city');

       expect(prop.prop).toBe('address.city');
     });
   });
   ```

2. Run `ng test clr-addons --watch false` and confirm this new spec fails
   with a module-not-found error (`./nested-property` doesn't exist yet at
   this location).
3. Create `src/clr-addons/datagrid/util/nested-property.ts` with the exact
   content currently in `date-filter/nested-property.ts` (the class body is
   unchanged — only its location moves):

   ```ts
   /**
    * Generic accessor for deep object properties
    * that can be specified as simple dot-separated strings.
    */
   export class NestedProperty<T = any> {
     private splitProp: string[];

     constructor(public prop: string) {
       if (prop.indexOf('.') >= 0) {
         this.splitProp = prop.split('.');
       }
     }

     // Safe getter for a deep object property, will not throw an error but return
     // undefined if one of the intermediate properties is null or undefined.
     public getPropValue(item: T): any {
       if (this.splitProp) {
         let value = item;
         for (const nestedProp of this.splitProp) {
           if (
             value === null ||
             typeof value === 'undefined' ||
             typeof (value as Record<string, any>)[nestedProp] === 'undefined'
           ) {
             return undefined;
           }
           value = (value as Record<string, any>)[nestedProp];
         }
         return value;
       } else {
         return (item as Record<string, any>)[this.prop];
       }
     }
   }
   ```

   (Omit the license header comment block — the pre-commit hook inserts it
   automatically on commit, matching how every other file in this package is
   handled.)

4. Create `src/clr-addons/datagrid/util/index.ts`:

   ```ts
   export * from './nested-property';
   ```

5. Run `ng test clr-addons --watch false` again and confirm
   `nested-property.spec.ts` now passes.
6. Update the import in `src/clr-addons/datagrid/date-filter/date-filter.component.ts`:
   - Change `import { NestedProperty } from './nested-property';` to
     `import { NestedProperty } from '../util/nested-property';`.
7. Delete `src/clr-addons/datagrid/date-filter/nested-property.ts`.
8. Run `ng test clr-addons --watch false` (full suite) and confirm
   `date-filter.component.spec.ts` still passes and no other spec broke.
9. Run `npm run lint` and fix any reported issues in touched files.
10. Commit: `git add src/clr-addons/datagrid/util src/clr-addons/datagrid/date-filter/date-filter.component.ts` and the deletion, then commit with a message such as `C3DEV-697052: relocate NestedProperty to shared datagrid/util`.

---

## Task 2: Shared `ClrFilterClearButtonComponent`

Extracts the trash-button markup (currently duplicated identically in
`date-filter.component.html`/`.scss` and `enum-filter.component.html`/`.scss`)
into a small reusable component used by the two new filters.

**Files:**

- Create: `src/clr-addons/datagrid/util/filter-clear-button/filter-clear-button.component.ts`
- Create: `src/clr-addons/datagrid/util/filter-clear-button/filter-clear-button.component.html`
- Create: `src/clr-addons/datagrid/util/filter-clear-button/filter-clear-button.component.scss`
- Create: `src/clr-addons/datagrid/util/filter-clear-button/filter-clear-button.component.spec.ts`
- Create: `src/clr-addons/datagrid/util/filter-clear-button/filter-clear-button.module.ts`
- Create: `src/clr-addons/datagrid/util/filter-clear-button/index.ts`

**Interfaces:**

- Consumes: nothing (leaf UI component).
- Produces: `<clr-filter-clear-button [testId]="'...'" (clear)="...">` used by
  Tasks 3 and 4's templates; `ClrFilterClearButtonModule` importable from
  `../util/filter-clear-button`.

**Steps:**

1. Write the failing spec first. Create
   `filter-clear-button.component.spec.ts`:

   ```ts
   import { Component } from '@angular/core';
   import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
   import { By } from '@angular/platform-browser';
   import { ClrFilterClearButtonComponent } from './filter-clear-button.component';

   @Component({
     template: `<clr-filter-clear-button testId="test-clear-button" (clear)="onClear()"></clr-filter-clear-button>`,
     standalone: false,
   })
   class TestComponent {
     cleared = false;
     onClear() {
       this.cleared = true;
     }
   }

   describe('ClrFilterClearButtonComponent', () => {
     let fixture: ComponentFixture<TestComponent>;

     beforeEach(waitForAsync(() => {
       TestBed.configureTestingModule({
         declarations: [TestComponent, ClrFilterClearButtonComponent],
       }).compileComponents();
     }));

     beforeEach(() => {
       fixture = TestBed.createComponent(TestComponent);
       fixture.detectChanges();
     });

     it('should create', () => {
       expect(fixture.componentInstance).toBeTruthy();
     });

     it('renders the provided testId as a data-testid attribute', () => {
       const button = fixture.debugElement.query(By.css('button'));

       expect(button.nativeElement.getAttribute('data-testid')).toBe('test-clear-button');
     });

     it('emits clear when clicked', () => {
       const button = fixture.debugElement.query(By.css('button'));

       button.nativeElement.click();
       fixture.detectChanges();

       expect(fixture.componentInstance.cleared).toBeTrue();
     });
   });
   ```

2. Run `ng test clr-addons --watch false` and confirm it fails (component
   doesn't exist yet).
3. Create `filter-clear-button.component.ts`:

   ```ts
   import { Component, EventEmitter, Input, Output } from '@angular/core';
   import { ClarityIcons, trashIcon } from '@clr/angular/icon';

   ClarityIcons.addIcons(trashIcon);

   /**
    * Shared "clear filter" trash-can button used by the addon-style datagrid
    * filters (clr-string-filter, clr-numeric-filter). Purely presentational:
    * the consumer decides what "clear" means for its own filter state.
    */
   @Component({
     selector: 'clr-filter-clear-button',
     templateUrl: './filter-clear-button.component.html',
     styleUrls: ['./filter-clear-button.component.scss'],
     standalone: false,
   })
   export class ClrFilterClearButtonComponent {
     @Input() testId = 'filter-clear-button';
     @Output() clear = new EventEmitter<void>();
   }
   ```

4. Create `filter-clear-button.component.html`:

   ```html
   <button
     type="button"
     class="btn btn-sm btn-icon btn-link btn-trash"
     (click)="clear.emit()"
     [attr.data-testid]="testId"
   >
     <cds-icon shape="trash"></cds-icon>
   </button>
   ```

5. Create `filter-clear-button.component.scss` (same rule as the existing
   two filters):

   ```scss
   .btn-trash {
     position: absolute;
     top: 15px;
     right: 40px;
     padding: 0;
   }
   ```

6. Create `filter-clear-button.module.ts`:

   ```ts
   import { CommonModule } from '@angular/common';
   import { NgModule } from '@angular/core';
   import { ClarityModule } from '@clr/angular';
   import { ClrFilterClearButtonComponent } from './filter-clear-button.component';

   @NgModule({
     imports: [ClarityModule, CommonModule],
     declarations: [ClrFilterClearButtonComponent],
     exports: [ClrFilterClearButtonComponent],
   })
   export class ClrFilterClearButtonModule {}
   ```

7. Create `index.ts`:

   ```ts
   export * from './filter-clear-button.component';
   export * from './filter-clear-button.module';
   ```

8. Run `ng test clr-addons --watch false` and confirm the new spec passes
   and nothing else broke.
9. Run `npm run lint` and fix any issues.
10. Commit: `C3DEV-697052: add shared filter clear-button component`.

---

## Task 3: `ClrStringFilterComponent`

**Files:**

- Create: `src/clr-addons/datagrid/string-filter/string-filter.component.ts`
- Create: `src/clr-addons/datagrid/string-filter/string-filter.component.html`
- Create: `src/clr-addons/datagrid/string-filter/string-filter.component.scss`
- Create: `src/clr-addons/datagrid/string-filter/string-filter.component.spec.ts`
- Create: `src/clr-addons/datagrid/string-filter/string-filter.module.ts`
- Create: `src/clr-addons/datagrid/string-filter/index.ts`
- Modify: `src/clr-addons/datagrid/index.ts` (add barrel export)
- Modify: `src/clr-addons/clr-addons.module.ts` (import + export the module)

**Interfaces:**

- Consumes: `NestedProperty` from `../util/nested-property`,
  `ClrFilterClearButtonModule` from `../util/filter-clear-button`,
  `ClrDatagridFilter`/`ClrDatagridFilterInterface`/`ClrCommonStringsService`
  from `@clr/angular`.
- Produces: `<clr-string-filter clrProperty="..." [(clrFilterValue)]="...">`
  placed inside `<clr-dg-filter>`, matching the `clr-date-filter` placement
  convention; public exports `ClrStringFilterComponent`,
  `ClrStringFilterModule`, `CLR_STRING_FILTER_DEBOUNCE_MS` from
  `@porscheinformatik/clr-addons`.

**Steps:**

1. Write the failing spec first. Create `string-filter.component.spec.ts`:

   ```ts
   import { Component, ViewChild } from '@angular/core';
   import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
   import { FormsModule } from '@angular/forms';
   import { provideNoopAnimations } from '@angular/platform-browser/animations';
   import { ClarityModule, ClrDatagrid } from '@clr/angular';
   import { ClrFilterClearButtonModule } from '../util/filter-clear-button';
   import { ClrStringFilterComponent } from './string-filter.component';

   interface Item {
     name: string;
     nested?: { name: string };
   }

   @Component({
     template: `
       <clr-datagrid>
         <clr-dg-column [clrDgField]="'name'">
           <clr-dg-filter>
             <clr-string-filter clrProperty="name" [(clrFilterValue)]="filterValue"></clr-string-filter>
           </clr-dg-filter>
         </clr-dg-column>

         <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
           <clr-dg-cell>{{ data.name }}</clr-dg-cell>
         </clr-dg-row>
       </clr-datagrid>
     `,
     standalone: false,
   })
   class TestComponent {
     dataList: Item[] = [{ name: 'Alpha' }, { name: 'Beta' }, { name: 'Gamma' }];
     filterValue = '';

     @ViewChild(ClrStringFilterComponent) component: ClrStringFilterComponent<Item>;
     @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
   }

   describe('ClrStringFilterComponent', () => {
     let fixture: ComponentFixture<TestComponent>;

     beforeEach(waitForAsync(() => {
       TestBed.configureTestingModule({
         imports: [ClarityModule, FormsModule, ClrFilterClearButtonModule],
         declarations: [TestComponent, ClrStringFilterComponent],
         providers: [provideNoopAnimations()],
       }).compileComponents();
     }));

     beforeEach(() => {
       fixture = TestBed.createComponent(TestComponent);
       fixture.detectChanges();
     });

     it('should create', () => {
       expect(fixture.componentInstance.component).toBeTruthy();
     });

     it('does not filter before the debounce elapses', fakeAsync(() => {
       fixture.componentInstance.component.onInput('a');
       tick(499);
       fixture.detectChanges();

       expect(fixture.componentInstance.datagrid.rows.length).toBe(3);
     }));

     it('filters case-insensitively (substring) after the debounce elapses', fakeAsync(() => {
       fixture.componentInstance.component.onInput('a');
       tick(500);
       fixture.detectChanges();

       expect(fixture.componentInstance.datagrid.rows.length).toBe(2); // Alpha, Gamma
     }));

     it('clearFilter resets the value immediately, without waiting for the debounce', fakeAsync(() => {
       fixture.componentInstance.component.onInput('a');
       tick(500);
       fixture.detectChanges();
       expect(fixture.componentInstance.datagrid.rows.length).toBe(2);

       fixture.componentInstance.component.clearFilter();
       fixture.detectChanges();

       expect(fixture.componentInstance.datagrid.rows.length).toBe(3);
       expect(fixture.componentInstance.component.isActive()).toBeFalse();
     }));

     it('applies external clrFilterValue changes immediately, without debounce', () => {
       fixture.componentInstance.filterValue = 'beta';
       fixture.detectChanges();

       expect(fixture.componentInstance.datagrid.rows.length).toBe(1);
     });

     it('supports nested properties via clrProperty', fakeAsync(() => {
       const component = fixture.componentInstance.component;
       component.property = 'nested.name';
       component.onInput('al');
       tick(500);

       expect(component.accepts({ name: 'x', nested: { name: 'Alpha' } })).toBeTrue();
       expect(component.accepts({ name: 'x', nested: { name: 'Beta' } })).toBeFalse();
     }));

     it('exposes state for persistence', fakeAsync(() => {
       fixture.componentInstance.filterValue = 'gamma';
       fixture.detectChanges();
       tick(500);

       expect(fixture.componentInstance.component.state).toEqual({
         property: fixture.componentInstance.component['nestedProp' as any] ?? jasmine.anything(),
         value: 'gamma',
       });
     }));
   });
   ```

   Note: the last test references a private field defensively via bracket
   access purely to avoid over-asserting on the `NestedProperty` instance
   identity; if this proves awkward once written, simplify it to
   `expect(fixture.componentInstance.component.state.value).toBe('gamma');`
   plus a separate assertion on `.property` (the public getter). Prefer the
   simplified version — do not fight the type system for one assertion.

2. Run `ng test clr-addons --watch false` and confirm all new tests fail
   (component/module don't exist yet).
3. Create `string-filter.component.ts`:

   ```ts
   import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
   import { ClrCommonStringsService, ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
   import { Observable, Subject, Subscription } from 'rxjs';
   import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
   import { NestedProperty } from '../util/nested-property';

   export const CLR_STRING_FILTER_DEBOUNCE_MS = 500;

   @Component({
     selector: 'clr-string-filter',
     templateUrl: './string-filter.component.html',
     styleUrls: ['./string-filter.component.scss'],
     standalone: false,
   })
   export class ClrStringFilterComponent<T extends { [key: string]: any }>
     implements ClrDatagridFilterInterface<T>, OnDestroy
   {
     private nestedProp: NestedProperty;

     @Input('clrProperty') set property(value: string) {
       this.nestedProp = new NestedProperty(value);
     }

     get property() {
       return this.nestedProp?.prop;
     }

     @Input('clrFilterPlaceholder') placeholder: string;

     get placeholderValue() {
       return this.placeholder || this.commonStrings.keys.filterItems;
     }

     @Input('clrFilterValue')
     public set value(value: string) {
       const normalized = value ?? '';
       if (normalized !== this._rawValue) {
         this.inputValue = normalized;
         this.applyValue(normalized);
       }
     }

     public get value(): string {
       return this._rawValue;
     }

     @Output('clrFilterValueChange') filterValueChange = new EventEmitter<string>();

     /** Bound to the text input for immediate visual feedback; actual filtering is debounced. */
     inputValue = '';

     private _rawValue = '';
     private _lowerCaseValue = '';
     private readonly inputChanges = new Subject<string>();
     private readonly _changes = new Subject<string>();
     private readonly subscription: Subscription;

     constructor(
       private commonStrings: ClrCommonStringsService,
       filterContainer: ClrDatagridFilter
     ) {
       filterContainer.setFilter(this);
       this.subscription = this.inputChanges
         .pipe(debounceTime(CLR_STRING_FILTER_DEBOUNCE_MS), distinctUntilChanged())
         .subscribe(value => this.applyValue(value));
     }

     onInput(value: string) {
       this.inputValue = value;
       this.inputChanges.next(value);
     }

     isActive(): boolean {
       return !!this._rawValue;
     }

     accepts(item: T): boolean {
       const propValue = this.nestedProp ? this.nestedProp.getPropValue(item) : item;
       if (propValue === undefined || propValue === null) {
         return false;
       }
       return String(propValue).toLowerCase().includes(this._lowerCaseValue);
     }

     public get changes(): Observable<string> {
       return this._changes.asObservable();
     }

     public get state(): any {
       return {
         property: this.nestedProp,
         value: this._rawValue,
       };
     }

     public clearFilter() {
       this.inputValue = '';
       this.applyValue('');
     }

     public equals(other: ClrDatagridFilterInterface<T, any>): boolean {
       return other === this;
     }

     ngOnDestroy() {
       this.subscription.unsubscribe();
     }

     private applyValue(value: string) {
       if (value === this._rawValue) {
         return;
       }
       this._rawValue = value;
       this._lowerCaseValue = value.toLowerCase().trim();
       this._changes.next(this._rawValue);
       this.filterValueChange.emit(this._rawValue);
     }
   }
   ```

4. Create `string-filter.component.html`:

   ```html
   <clr-filter-clear-button testId="string-filter-clear-button" (clear)="clearFilter()"></clr-filter-clear-button>
   <clr-input-container class="filter-selection">
     <input
       clrInput
       type="text"
       autocomplete="off"
       name="value"
       [ngModel]="inputValue"
       (ngModelChange)="onInput($event)"
       [placeholder]="placeholderValue"
       [attr.aria-label]="placeholderValue"
       data-testid="string-filter-input"
     />
   </clr-input-container>
   ```

5. Create `string-filter.component.scss`:

   ```scss
   .filter-selection {
     margin-top: 0.5rem;
   }
   ```

6. Create `string-filter.module.ts`:

   ```ts
   import { CommonModule } from '@angular/common';
   import { NgModule } from '@angular/core';
   import { FormsModule } from '@angular/forms';
   import { ClarityModule } from '@clr/angular';
   import { ClrFilterClearButtonModule } from '../util/filter-clear-button';
   import { ClrStringFilterComponent } from './string-filter.component';

   @NgModule({
     imports: [ClarityModule, CommonModule, FormsModule, ClrFilterClearButtonModule],
     declarations: [ClrStringFilterComponent],
     exports: [ClrStringFilterComponent],
   })
   export class ClrStringFilterModule {}
   ```

7. Create `index.ts`:

   ```ts
   export * from './string-filter.component';
   export * from './string-filter.module';
   ```

8. Run `ng test clr-addons --watch false` and confirm all `string-filter`
   specs now pass.
9. Wire up public exports:
   - In `src/clr-addons/datagrid/index.ts`, add `export * from './string-filter';`
     next to the existing `export * from './date-filter';` /
     `export * from './enum-filter';` lines.
   - In `src/clr-addons/clr-addons.module.ts`, add an import
     `ClrStringFilterModule` from `./datagrid` (it flows through the
     `datagrid/index.ts` barrel already imported there) and add
     `ClrStringFilterModule` to the `exports` array next to
     `ClrEnumFilterModule, ClrDateFilterModule,`.
10. Run `ng test clr-addons --watch false` (full suite) to confirm the module
    wiring didn't break anything.
11. Run `npm run lint` and fix any issues.
12. Commit: `C3DEV-697052: add ClrStringFilterComponent`.

---

## Task 4: `ClrNumericFilterComponent`

**Files:**

- Create: `src/clr-addons/datagrid/numeric-filter/numeric-filter.component.ts`
- Create: `src/clr-addons/datagrid/numeric-filter/numeric-filter.component.html`
- Create: `src/clr-addons/datagrid/numeric-filter/numeric-filter.component.scss`
- Create: `src/clr-addons/datagrid/numeric-filter/numeric-filter.component.spec.ts`
- Create: `src/clr-addons/datagrid/numeric-filter/numeric-filter.module.ts`
- Create: `src/clr-addons/datagrid/numeric-filter/index.ts`
- Modify: `src/clr-addons/datagrid/index.ts` (add barrel export)
- Modify: `src/clr-addons/clr-addons.module.ts` (import + export the module)

**Interfaces:**

- Consumes: `NestedProperty` from `../util/nested-property`,
  `ClrFilterClearButtonModule` from `../util/filter-clear-button`,
  `ClrDatagridFilter`/`ClrDatagridFilterInterface` from `@clr/angular`,
  Clarity's built-in `clr-number-input-container`/`clrNumberInput`.
- Produces: `<clr-numeric-filter clrProperty="..." [(clrFilterValue)]="...">`
  placed inside `<clr-dg-filter>`; public exports
  `ClrNumericFilterComponent`, `ClrNumericFilterModule`,
  `CLR_NUMERIC_FILTER_DEBOUNCE_MS` from `@porscheinformatik/clr-addons`.
  `clrFilterValue` is a `[number | null, number | null]` tuple (`[low, high]`),
  matching the `[from, to]` tuple convention used by `clr-date-filter`.

**Steps:**

1. Write the failing spec first. Create `numeric-filter.component.spec.ts`:

   ```ts
   import { Component, ViewChild } from '@angular/core';
   import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
   import { FormsModule } from '@angular/forms';
   import { provideNoopAnimations } from '@angular/platform-browser/animations';
   import { ClarityModule, ClrDatagrid } from '@clr/angular';
   import { ClrFilterClearButtonModule } from '../util/filter-clear-button';
   import { ClrNumericFilterComponent } from './numeric-filter.component';

   interface Item {
     amount: number;
     nested?: { amount: number };
   }

   @Component({
     template: `
       <clr-datagrid>
         <clr-dg-column [clrDgField]="'amount'">
           <clr-dg-filter>
             <clr-numeric-filter clrProperty="amount" [(clrFilterValue)]="filterValue"></clr-numeric-filter>
           </clr-dg-filter>
         </clr-dg-column>

         <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
           <clr-dg-cell>{{ data.amount }}</clr-dg-cell>
         </clr-dg-row>
       </clr-datagrid>
     `,
     standalone: false,
   })
   class TestComponent {
     dataList: Item[] = [{ amount: 1 }, { amount: 5 }, { amount: 10 }];
     filterValue: [number, number] = [null, null];

     @ViewChild(ClrNumericFilterComponent) component: ClrNumericFilterComponent<Item>;
     @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
   }

   describe('ClrNumericFilterComponent', () => {
     let fixture: ComponentFixture<TestComponent>;

     beforeEach(waitForAsync(() => {
       TestBed.configureTestingModule({
         imports: [ClarityModule, FormsModule, ClrFilterClearButtonModule],
         declarations: [TestComponent, ClrNumericFilterComponent],
         providers: [provideNoopAnimations()],
       }).compileComponents();
     }));

     beforeEach(() => {
       fixture = TestBed.createComponent(TestComponent);
       fixture.detectChanges();
     });

     it('should create', () => {
       expect(fixture.componentInstance.component).toBeTruthy();
     });

     it('does not filter before the debounce elapses', fakeAsync(() => {
       fixture.componentInstance.component.onLowInput(5);
       tick(499);
       fixture.detectChanges();

       expect(fixture.componentInstance.datagrid.rows.length).toBe(3);
     }));

     it('filters by low bound after the debounce elapses', fakeAsync(() => {
       fixture.componentInstance.component.onLowInput(5);
       tick(500);
       fixture.detectChanges();

       expect(fixture.componentInstance.datagrid.rows.length).toBe(2); // 5, 10
     }));

     it('filters by high bound after the debounce elapses', fakeAsync(() => {
       fixture.componentInstance.component.onHighInput(5);
       tick(500);
       fixture.detectChanges();

       expect(fixture.componentInstance.datagrid.rows.length).toBe(2); // 1, 5
     }));

     it('filters by combined low and high bounds', fakeAsync(() => {
       fixture.componentInstance.component.onLowInput(2);
       fixture.componentInstance.component.onHighInput(9);
       tick(500);
       fixture.detectChanges();

       expect(fixture.componentInstance.datagrid.rows.length).toBe(1); // 5
     }));

     it('clearFilter resets both bounds immediately, without waiting for the debounce', fakeAsync(() => {
       fixture.componentInstance.component.onLowInput(5);
       tick(500);
       fixture.detectChanges();
       expect(fixture.componentInstance.datagrid.rows.length).toBe(2);

       fixture.componentInstance.component.clearFilter();
       fixture.detectChanges();

       expect(fixture.componentInstance.datagrid.rows.length).toBe(3);
       expect(fixture.componentInstance.component.isActive()).toBeFalse();
     }));

     it('applies external clrFilterValue changes immediately, without debounce', () => {
       fixture.componentInstance.filterValue = [5, null];
       fixture.detectChanges();

       expect(fixture.componentInstance.datagrid.rows.length).toBe(2);
     });

     it('supports nested properties via clrProperty', fakeAsync(() => {
       const component = fixture.componentInstance.component;
       component.property = 'nested.amount';
       component.onLowInput(5);
       tick(500);

       expect(component.accepts({ amount: 0, nested: { amount: 10 } })).toBeTrue();
       expect(component.accepts({ amount: 0, nested: { amount: 1 } })).toBeFalse();
     }));

     it('exposes state for persistence', fakeAsync(() => {
       fixture.componentInstance.filterValue = [2, 9];
       fixture.detectChanges();
       tick(500);

       expect(fixture.componentInstance.component.state.low).toBe(2);
       expect(fixture.componentInstance.component.state.high).toBe(9);
     }));
   });
   ```

2. Run `ng test clr-addons --watch false` and confirm all new tests fail.
3. Create `numeric-filter.component.ts`:

   ```ts
   import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
   import { ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
   import { Observable, Subject, Subscription } from 'rxjs';
   import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
   import { NestedProperty } from '../util/nested-property';

   export const CLR_NUMERIC_FILTER_DEBOUNCE_MS = 500;

   @Component({
     selector: 'clr-numeric-filter',
     templateUrl: './numeric-filter.component.html',
     styleUrls: ['./numeric-filter.component.scss'],
     standalone: false,
   })
   export class ClrNumericFilterComponent<T extends { [key: string]: any }>
     implements ClrDatagridFilterInterface<T>, OnDestroy
   {
     private nestedProp: NestedProperty;

     @Input('clrProperty') set property(value: string) {
       this.nestedProp = new NestedProperty(value);
     }

     get property() {
       return this.nestedProp?.prop;
     }

     @Input('clrFilterMinPlaceholder') minPlaceholder: string;

     get minPlaceholderValue() {
       return this.minPlaceholder || 'Min value';
     }

     @Input('clrFilterMaxPlaceholder') maxPlaceholder: string;

     get maxPlaceholderValue() {
       return this.maxPlaceholder || 'Max value';
     }

     @Input('clrFilterValue')
     public set value(values: [number, number]) {
       if (!Array.isArray(values)) {
         return;
       }
       const low = values[0] ?? null;
       const high = values[1] ?? null;
       if (low !== this._low || high !== this._high) {
         this.lowInput = low;
         this.highInput = high;
         this.applyValue(low, high);
       }
     }

     public get value(): [number, number] {
       return [this._low, this._high];
     }

     @Output('clrFilterValueChange') filterValueChange = new EventEmitter<[number, number]>();

     /** Bound to the two inputs for immediate visual feedback; actual filtering is debounced. */
     lowInput: number | null = null;
     highInput: number | null = null;

     private _low: number | null = null;
     private _high: number | null = null;
     private readonly lowChanges = new Subject<number | null>();
     private readonly highChanges = new Subject<number | null>();
     private readonly _changes = new Subject<[number, number]>();
     private readonly subscriptions: Subscription[] = [];

     constructor(filterContainer: ClrDatagridFilter) {
       filterContainer.setFilter(this);
       this.subscriptions.push(
         this.lowChanges
           .pipe(debounceTime(CLR_NUMERIC_FILTER_DEBOUNCE_MS), distinctUntilChanged())
           .subscribe(low => this.applyValue(low, this._high)),
         this.highChanges
           .pipe(debounceTime(CLR_NUMERIC_FILTER_DEBOUNCE_MS), distinctUntilChanged())
           .subscribe(high => this.applyValue(this._low, high))
       );
     }

     onLowInput(value: number | null) {
       this.lowInput = value;
       this.lowChanges.next(value);
     }

     onHighInput(value: number | null) {
       this.highInput = value;
       this.highChanges.next(value);
     }

     isActive(): boolean {
       return this._low !== null || this._high !== null;
     }

     accepts(item: T): boolean {
       const propValue = this.nestedProp ? this.nestedProp.getPropValue(item) : item;
       if (propValue === undefined || propValue === null) {
         return false;
       }
       const numericValue = typeof propValue === 'number' ? propValue : Number(propValue);
       if (Number.isNaN(numericValue)) {
         return false;
       }
       if (this._low !== null && numericValue < this._low) {
         return false;
       }
       if (this._high !== null && numericValue > this._high) {
         return false;
       }
       return true;
     }

     public get changes(): Observable<[number, number]> {
       return this._changes.asObservable();
     }

     public get state(): any {
       return {
         property: this.nestedProp,
         low: this._low,
         high: this._high,
       };
     }

     public clearFilter() {
       this.lowInput = null;
       this.highInput = null;
       this.applyValue(null, null);
     }

     public equals(other: ClrDatagridFilterInterface<T, any>): boolean {
       return other === this;
     }

     ngOnDestroy() {
       this.subscriptions.forEach(subscription => subscription.unsubscribe());
     }

     private applyValue(low: number | null, high: number | null) {
       if (low === this._low && high === this._high) {
         return;
       }
       this._low = low;
       this._high = high;
       this._changes.next([this._low, this._high]);
       this.filterValueChange.emit([this._low, this._high]);
     }
   }
   ```

4. Create `numeric-filter.component.html`:

   ```html
   <clr-filter-clear-button testId="numeric-filter-clear-button" (clear)="clearFilter()"></clr-filter-clear-button>
   <clr-number-input-container class="filter-selection">
     <label>{{ minPlaceholderValue }}</label>
     <input
       type="number"
       clrNumberInput
       name="low"
       [ngModel]="lowInput"
       (ngModelChange)="onLowInput($event)"
       [placeholder]="minPlaceholderValue"
       [attr.aria-label]="minPlaceholderValue"
       data-testid="numeric-filter-low-input"
     />
   </clr-number-input-container>
   <clr-number-input-container class="filter-selection">
     <label>{{ maxPlaceholderValue }}</label>
     <input
       type="number"
       clrNumberInput
       name="high"
       [ngModel]="highInput"
       (ngModelChange)="onHighInput($event)"
       [placeholder]="maxPlaceholderValue"
       [attr.aria-label]="maxPlaceholderValue"
       data-testid="numeric-filter-high-input"
     />
   </clr-number-input-container>
   ```

5. Create `numeric-filter.component.scss`:

   ```scss
   .filter-selection {
     margin-top: 0.5rem;
   }
   ```

6. Create `numeric-filter.module.ts`:

   ```ts
   import { CommonModule } from '@angular/common';
   import { NgModule } from '@angular/core';
   import { FormsModule } from '@angular/forms';
   import { ClarityModule } from '@clr/angular';
   import { ClrFilterClearButtonModule } from '../util/filter-clear-button';
   import { ClrNumericFilterComponent } from './numeric-filter.component';

   @NgModule({
     imports: [ClarityModule, CommonModule, FormsModule, ClrFilterClearButtonModule],
     declarations: [ClrNumericFilterComponent],
     exports: [ClrNumericFilterComponent],
   })
   export class ClrNumericFilterModule {}
   ```

7. Create `index.ts`:

   ```ts
   export * from './numeric-filter.component';
   export * from './numeric-filter.module';
   ```

8. Run `ng test clr-addons --watch false` and confirm all `numeric-filter`
   specs now pass.
9. Wire up public exports:
   - In `src/clr-addons/datagrid/index.ts`, add
     `export * from './numeric-filter';`.
   - In `src/clr-addons/clr-addons.module.ts`, add `ClrNumericFilterModule`
     to the same import statement/`exports` array entry touched in Task 3
     (`ClrEnumFilterModule, ClrDateFilterModule, ClrStringFilterModule, ClrNumericFilterModule,`).
10. Run `ng test clr-addons --watch false` (full suite) to confirm nothing
    broke.
11. Run `npm run lint` and fix any issues.
12. Commit: `C3DEV-697052: add ClrNumericFilterComponent`.

---

## Task 5: Documentation website page

Adds a single combined "Custom Filters" docs page demonstrating both new
filters on one datagrid, following the `search-field` demo's structure and
the internal `src/dev` datagrid-filters demo's grid markup.

**Files:**

- Create: `website/src/app/documentation/demos/custom-filters/custom-filters.demo.ts`
- Create: `website/src/app/documentation/demos/custom-filters/custom-filters.demo.html`
- Create: `website/src/app/documentation/demos/custom-filters/custom-filters.demo.module.ts`
- Modify: `website/src/app/documentation/documentation-routing.module.ts`
- Modify: `website/src/settings/componentlist.json`

**Interfaces:**

- Consumes: `ClrAddonsModule` (already exports `ClrStringFilterModule`/
  `ClrNumericFilterModule` from Task 3/4), `ClarityDocComponent`,
  `DocWrapperModule`.
- Produces: a routable docs page at `/custom-filters`, listed in the site
  nav via `componentlist.json`.

**Steps:**

1. Create `custom-filters.demo.ts`:

   ```ts
   import { Component } from '@angular/core';
   import { ClarityDocComponent } from '../clarity-doc';

   interface DemoItem {
     name: string;
     amount: number;
   }

   const HTML_EXAMPLE = `
   <clr-datagrid>
       <clr-dg-column [clrDgField]="'name'">
           Name
           <clr-dg-filter>
               <clr-string-filter clrProperty="name"></clr-string-filter>
           </clr-dg-filter>
       </clr-dg-column>
       <clr-dg-column [clrDgField]="'amount'">
           Amount
           <clr-dg-filter>
               <clr-numeric-filter clrProperty="amount"></clr-numeric-filter>
           </clr-dg-filter>
       </clr-dg-column>
   
       <clr-dg-row *clrDgItems="let item of items">
           <clr-dg-cell>{{ item.name }}</clr-dg-cell>
           <clr-dg-cell>{{ item.amount }}</clr-dg-cell>
       </clr-dg-row>
   </clr-datagrid>
   `;

   @Component({
     selector: 'clr-custom-filters-demo',
     templateUrl: './custom-filters.demo.html',
     host: {
       '[class.content-area]': 'true',
       '[class.dox-content-panel]': 'true',
     },
     standalone: false,
   })
   export class CustomFiltersDemo extends ClarityDocComponent {
     htmlExample = HTML_EXAMPLE;
     items: DemoItem[] = [
       { name: 'Alpha', amount: 1 },
       { name: 'Beta', amount: 5 },
       { name: 'Gamma', amount: 10 },
       { name: 'Delta', amount: 25 },
     ];

     constructor() {
       super('custom-filters');
     }
   }
   ```

2. Create `custom-filters.demo.html`:

   ```html
   <clr-doc-wrapper [title]="title">
     <article>
       <h5 class="component-summary">
         Custom Text and Number filters for the Clarity Datagrid, including a trash-can button to clear the filter's
         contents.
       </h5>

       <h3>Best Practices</h3>
       <ul class="list">
         <li>
           <strong>clr-string-filter:</strong> case-insensitive substring match on the bound property, debounced by
           500ms while typing.
         </li>
         <li>
           <strong>clr-numeric-filter:</strong> inclusive low/high range match on the bound property, debounced by 500ms
           while typing.
         </li>
         <li>
           <strong>clrProperty:</strong> supports dot-separated nested properties, e.g.
           <code class="clr-code">clrProperty="address.city"</code>.
         </li>
       </ul>

       <div id="code-examples">
         <h3 id="examples">Code &amp; Examples</h3>
         <p>
           Both filters are placed inside a <code class="clr-code">clr-dg-filter</code>, matching the existing
           <code class="clr-code">clr-date-filter</code> / <code class="clr-code">clr-enum-filter</code> convention.
         </p>

         <clr-datagrid>
           <clr-dg-column [clrDgField]="'name'">
             Name
             <clr-dg-filter>
               <clr-string-filter clrProperty="name"></clr-string-filter>
             </clr-dg-filter>
           </clr-dg-column>
           <clr-dg-column [clrDgField]="'amount'">
             Amount
             <clr-dg-filter>
               <clr-numeric-filter clrProperty="amount"></clr-numeric-filter>
             </clr-dg-filter>
           </clr-dg-column>

           <clr-dg-row *clrDgItems="let item of items">
             <clr-dg-cell>{{ item.name }}</clr-dg-cell>
             <clr-dg-cell>{{ item.amount }}</clr-dg-cell>
           </clr-dg-row>
         </clr-datagrid>

         <clr-code-snippet [clrCode]="htmlExample"></clr-code-snippet>
       </div>
     </article>
   </clr-doc-wrapper>
   ```

3. Create `custom-filters.demo.module.ts`:

   ```ts
   import { CommonModule } from '@angular/common';
   import { NgModule } from '@angular/core';
   import { FormsModule, ReactiveFormsModule } from '@angular/forms';
   import { RouterModule } from '@angular/router';
   import { ClarityModule, ClrFormsModule } from '@clr/angular';
   import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
   import { UtilsModule } from '../../../utils/utils.module';
   import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
   import { CustomFiltersDemo } from './custom-filters.demo';

   @NgModule({
     imports: [
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       ClarityModule,
       ClrFormsModule,
       UtilsModule,
       DocWrapperModule,
       RouterModule.forChild([{ path: '', component: CustomFiltersDemo }]),
       ClrAddonsModule,
     ],
     declarations: [CustomFiltersDemo],
     exports: [CustomFiltersDemo],
   })
   export class CustomFiltersDemoModule {}
   ```

4. In `documentation-routing.module.ts`, add a new route entry right after
   the existing `'datagrid'` route entry:

   ```ts
   {
     path: 'custom-filters',
     loadChildren: () => import('./demos/custom-filters/custom-filters.demo.module').then(m => m.CustomFiltersDemoModule),
     data: {
       browserTitle: 'Custom Filters',
     },
   },
   ```

5. In `website/src/settings/componentlist.json`, add a new entry right after
   the `"datagrid"` entry:

   ```json
   {
     "url": "custom-filters",
     "text": "Custom Filters",
     "type": "component"
   },
   ```

6. Build the website to confirm the new route/module compile cleanly:
   run `ng build website` (or the project's equivalent website build
   script — check `package.json` for the exact target name if `website` is
   not the correct project name) and confirm it succeeds with no new errors.
7. Run `npm run lint` (covers `src/clr-addons` and `src/dev` only — website
   files are not linted by this script, so no action needed there beyond the
   successful build).
8. Commit: `C3DEV-697052: add Custom Filters documentation page`.

---

## Final Verification

After all 5 tasks are complete:

1. `ng test clr-addons --watch false` — full suite green, including
   `nested-property.spec.ts`, `filter-clear-button.component.spec.ts`,
   `string-filter.component.spec.ts`, `numeric-filter.component.spec.ts`,
   and the pre-existing `date-filter.component.spec.ts` /
   `enum-filter.component.spec.ts` (unaffected).
2. `npm run lint` — clean.
3. `ng build website` (or equivalent) — clean, new `/custom-filters` route
   reachable.
4. Manually diff `src/clr-addons/index.ts` public exports (via the built
   library, or by inspecting `datagrid/index.ts` and `clr-addons.module.ts`)
   to confirm `ClrStringFilterComponent`, `ClrStringFilterModule`,
   `ClrNumericFilterComponent`, `ClrNumericFilterModule` are all reachable
   from `@porscheinformatik/clr-addons`.
5. Re-read the spec
   (`docs/superpowers/specs/2026-09-18-custom-string-numeric-filters-design.md`)
   against the implementation once more to confirm no requirement was
   missed (naming, debounce, addon-style API, Approach A shared code,
   documentation page).
