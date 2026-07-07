/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CdkTrapFocusModule, ClarityModule, ClrCommonStringsService, ClrPopoverService } from '@clr/angular';

import { ClrTreetableColumnManagerMenuComponent } from './treetable-column-manager-menu.component';
import { TreetableColumnStateService } from './providers/treetable-column-state.service';

describe('ClrTreetableColumnManagerMenuComponent', () => {
  let component: ClrTreetableColumnManagerMenuComponent;
  let fixture: ComponentFixture<ClrTreetableColumnManagerMenuComponent>;
  let columnService: TreetableColumnStateService;
  let commonStrings: ClrCommonStringsService;

  const RESET_LABEL = 'Reset to default';

  const COL_A = 'col-a';
  const COL_B = 'col-b';
  const COL_C = 'col-c';

  // --- DOM helpers ---

  const queryOpenBtn = (): HTMLButtonElement =>
    fixture.debugElement.query(By.css('button.column-manager-menu-open'))?.nativeElement;

  const queryDialog = (): HTMLElement | null => document.querySelector('.column-switch');

  const querySelectAllBtn = (): HTMLButtonElement | null =>
    document.querySelector('.switch-footer .switch-button:first-child');

  const queryResetBtn = (): HTMLButtonElement | null =>
    document.querySelector('.switch-footer .switch-button:last-child');

  const queryCheckboxes = (): NodeListOf<HTMLInputElement> =>
    document.querySelectorAll('.switch-content input[type="checkbox"]');

  const queryDialogHeader = (): HTMLElement | null => document.querySelector('.switch-header h2');

  const queryCloseBtn = (): HTMLButtonElement | null => document.querySelector('.toggle-switch-close-button');

  // Opens popover and waits for ngModel bindings to stabilize
  const openMenu = async () => {
    queryOpenBtn().click();
    await fixture.whenStable();
  };

  // --- Setup helpers ---

  async function registerColumns(
    columns: Array<{ id: string; hideable?: boolean; hidden?: boolean; initialHidden?: boolean }>
  ) {
    columns.forEach(({ id }) => columnService.register({ id }));
    columnService.initializeOrder(columns.map(c => c.id));
    columns.forEach(({ id, hideable, hidden, initialHidden }) => {
      if (hideable) {
        columnService.registerHideable(id, {
          hideable: true,
          hidden: hidden ?? false,
          initialHidden: initialHidden ?? hidden ?? false,
        });
      }
    });
    await fixture.whenStable();
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClrTreetableColumnManagerMenuComponent],
      imports: [ClarityModule, FormsModule, CdkTrapFocusModule],
      providers: [TreetableColumnStateService, ClrPopoverService],
    });

    columnService = TestBed.inject(TreetableColumnStateService);
    commonStrings = TestBed.inject(ClrCommonStringsService);

    fixture = TestBed.createComponent(ClrTreetableColumnManagerMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('resetLabel', RESET_LABEL);
    fixture.autoDetectChanges();
  });

  afterEach(() => {
    // Close menu so portal content is removed before next test
    if (queryDialog()) {
      queryOpenBtn()?.click();
      fixture.detectChanges();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  describe('host element', () => {
    it('should always have column-manager-menu class', () => {
      const el: HTMLElement = fixture.nativeElement;
      expect(el.classList).toContain('column-manager-menu');
    });

    it('should add active class when menu is open', async () => {
      await openMenu();
      expect((fixture.nativeElement as HTMLElement).classList).toContain('active');
    });

    it('should not have active class when menu is closed', () => {
      expect((fixture.nativeElement as HTMLElement).classList).not.toContain('active');
    });
  });

  // ---------------------------------------------------------------------------
  describe('open button', () => {
    it('should render pickColumns label from common strings', () => {
      expect(queryOpenBtn().textContent?.trim()).toBe(commonStrings.keys.pickColumns);
    });

    it('should have aria-haspopup="menu"', () => {
      expect(queryOpenBtn().getAttribute('aria-haspopup')).toBe('menu');
    });

    it('should not have aria-expanded set to true when menu is closed', () => {
      // open() signal is undefined before first popover emission → attribute absent or not 'true'
      expect(queryOpenBtn().getAttribute('aria-expanded')).not.toBe('true');
    });

    it('should set aria-expanded to true when menu is open', async () => {
      await openMenu();
      expect(queryOpenBtn().getAttribute('aria-expanded')).toBe('true');
    });
  });

  // ---------------------------------------------------------------------------
  describe('menu dialog', () => {
    it('should not render dialog before button click', () => {
      expect(queryDialog()).toBeNull();
    });

    it('should render dialog after button click', async () => {
      await openMenu();
      expect(queryDialog()).toBeTruthy();
    });

    it('should display showColumns header text', async () => {
      await openMenu();
      expect(queryDialogHeader()?.textContent?.trim()).toBe(commonStrings.keys.showColumns);
    });

    it('should render close button with correct aria-label', async () => {
      await openMenu();
      expect(queryCloseBtn()?.getAttribute('aria-label')).toBe(commonStrings.keys.close);
    });

    it('should close dialog when close button clicked', async () => {
      await openMenu();
      expect(queryDialog()).toBeTruthy();
      queryCloseBtn()!.click();
      fixture.detectChanges();
      expect(queryDialog()).toBeNull();
    });
  });

  // ---------------------------------------------------------------------------
  describe('column checkboxes', () => {
    it('should render one checkbox per hideable column', async () => {
      await registerColumns([
        { id: COL_A, hideable: true },
        { id: COL_B, hideable: true },
        { id: COL_C, hideable: false },
      ]);
      await openMenu();
      expect(queryCheckboxes().length).toBe(2);
    });

    it('should not render checkboxes when no hideable columns', async () => {
      await registerColumns([{ id: COL_A, hideable: false }]);
      await openMenu();
      expect(queryCheckboxes().length).toBe(0);
    });

    it('should render checkbox checked for visible column', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: false },
        { id: COL_B, hideable: true, hidden: true },
      ]);
      await openMenu();
      expect(queryCheckboxes()[0].checked).toBeTrue();
    });

    it('should render checkbox unchecked for hidden column', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: false },
        { id: COL_B, hideable: true, hidden: true },
      ]);
      await openMenu();
      expect(queryCheckboxes()[1].checked).toBeFalse();
    });

    it('should disable the last visible checkbox when all columns are hideable', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: false },
        { id: COL_B, hideable: true, hidden: true },
      ]);
      await openMenu();
      // COL_A is the only visible → must be disabled to prevent hiding all
      expect(queryCheckboxes()[0].disabled).toBeTrue();
      expect(queryCheckboxes()[1].disabled).toBeFalse();
    });

    it('should not disable checkboxes when multiple visible columns exist', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: false },
        { id: COL_B, hideable: true, hidden: false },
      ]);
      await openMenu();
      expect(queryCheckboxes()[0].disabled).toBeFalse();
      expect(queryCheckboxes()[1].disabled).toBeFalse();
    });

    it('should hide column when visible checkbox is clicked', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: false },
        { id: COL_B, hideable: true, hidden: false },
      ]);
      await openMenu();
      queryCheckboxes()[0].click();
      await fixture.whenStable();
      expect(queryCheckboxes()[0].checked).toBeFalse();
    });

    it('should show column when hidden checkbox is clicked', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: true },
        { id: COL_B, hideable: true, hidden: false },
      ]);
      await openMenu();
      queryCheckboxes()[0].click();
      await fixture.whenStable();
      expect(queryCheckboxes()[0].checked).toBeTrue();
    });
  });

  // ---------------------------------------------------------------------------
  describe('Select All button', () => {
    it('should be disabled when all columns are visible', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: false },
        { id: COL_B, hideable: true, hidden: false },
      ]);
      await openMenu();
      expect(querySelectAllBtn()?.disabled).toBeTrue();
    });

    it('should be enabled when some columns are hidden', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: true },
        { id: COL_B, hideable: true, hidden: false },
      ]);
      await openMenu();
      expect(querySelectAllBtn()?.disabled).toBeFalse();
    });

    it('should make all columns visible when clicked', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: true },
        { id: COL_B, hideable: true, hidden: true },
        { id: COL_C, hideable: true, hidden: false },
      ]);
      await openMenu();
      querySelectAllBtn()!.click();
      await fixture.whenStable();
      const boxes = queryCheckboxes();
      expect(boxes[0].checked).toBeTrue();
      expect(boxes[1].checked).toBeTrue();
      expect(boxes[2].checked).toBeTrue();
    });

    it('should become disabled after all columns are made visible', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: true },
        { id: COL_B, hideable: true, hidden: false },
      ]);
      await openMenu();
      querySelectAllBtn()!.click();
      await fixture.whenStable();
      expect(querySelectAllBtn()?.disabled).toBeTrue();
    });
  });

  // ---------------------------------------------------------------------------
  describe('Reset button', () => {
    it('should display resetLabel as button text', async () => {
      await openMenu();
      expect(queryResetBtn()?.textContent?.trim()).toBe(RESET_LABEL);
    });

    it('should update button text when resetLabel input changes', async () => {
      await openMenu();
      const newLabel = 'Restore defaults';
      fixture.componentRef.setInput('resetLabel', newLabel);
      fixture.detectChanges();
      expect(queryResetBtn()?.textContent?.trim()).toBe(newLabel);
    });

    it('should be disabled when all columns match their initial state', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: false, initialHidden: false },
        { id: COL_B, hideable: true, hidden: true, initialHidden: true },
      ]);
      await openMenu();
      expect(queryResetBtn()?.disabled).toBeTrue();
    });

    it('should be enabled when a column hidden state differs from initial', async () => {
      await registerColumns([{ id: COL_A, hideable: true, hidden: false, initialHidden: true }]);
      await openMenu();
      expect(queryResetBtn()?.disabled).toBeFalse();
    });

    it('should restore columns to initial hidden states when clicked', async () => {
      await registerColumns([
        { id: COL_A, hideable: true, hidden: false, initialHidden: true },
        { id: COL_B, hideable: true, hidden: true, initialHidden: false },
      ]);
      await openMenu();
      queryResetBtn()!.click();
      await fixture.whenStable();
      const boxes = queryCheckboxes();
      // COL_A initial=hidden → unchecked; COL_B initial=visible → checked
      expect(boxes[0].checked).toBeFalse();
      expect(boxes[1].checked).toBeTrue();
    });

    it('should become disabled after reset makes all columns match initial state', async () => {
      await registerColumns([{ id: COL_A, hideable: true, hidden: false, initialHidden: true }]);
      await openMenu();
      queryResetBtn()!.click();
      await fixture.whenStable();
      expect(queryResetBtn()?.disabled).toBeTrue();
    });
  });
});
