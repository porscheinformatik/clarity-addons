/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { TestBed } from '@angular/core/testing';
import { TreetableColumnStateService, TreetableColumnUpdate } from './treetable-column-state.service';
import { tickAsync } from '../testing/tick-async';

describe('TreetableColumnStateService', () => {
  let service: TreetableColumnStateService;

  // --- Setup helpers ---

  function reg(id: string, opts?: { hideable?: boolean; hidden?: boolean; initialHidden?: boolean }) {
    service.register({ id });
    if (opts?.hideable) {
      service.registerHideable(id, {
        hideable: true,
        hidden: opts.hidden ?? false,
        initialHidden: opts.initialHidden ?? opts.hidden ?? false,
      });
    }
  }

  function regOrdered(columns: Array<{ id: string; hideable?: boolean; hidden?: boolean; initialHidden?: boolean }>) {
    columns.forEach(({ id, ...opts }) => reg(id, opts));
    service.initializeOrder(columns.map(c => c.id));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TreetableColumnStateService] });
    service = TestBed.inject(TreetableColumnStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ---------------------------------------------------------------------------
  describe('initial state', () => {
    it('should have no columns', () => {
      expect(service.columns().length).toBe(0);
    });

    it('should have no visible columns', () => {
      expect(service.visibleColumns().length).toBe(0);
    });

    it('should have no hideable columns', () => {
      expect(service.hideableColumns().length).toBe(0);
    });

    it('should report hasHideableColumns as false', () => {
      expect(service.hasHideableColumns()).toBeFalse();
    });
  });

  // ---------------------------------------------------------------------------
  describe('register', () => {
    it('should add a column with default values', async () => {
      service.register({ id: 'a' });
      await tickAsync();

      const col = service.columns()[0];
      expect(col.id).toBe('a');
      expect(col.hideable).toBeFalse();
      expect(col.hidden).toBeFalse();
      expect(col.initialHidden).toBeFalse();
    });

    it('should set columnIndex to MAX_SAFE_INTEGER on register', async () => {
      service.register({ id: 'a' });
      await tickAsync();

      expect(service.columns()[0].columnIndex).toBe(Number.MAX_SAFE_INTEGER);
    });

    it('should add multiple columns independently', async () => {
      service.register({ id: 'a' });
      service.register({ id: 'b' });
      await tickAsync();

      expect(service.columns().length).toBe(2);
    });
  });

  // ---------------------------------------------------------------------------
  describe('registerHideable', () => {
    it('should update existing column to hideable', async () => {
      service.register({ id: 'a' });
      service.registerHideable('a', { hideable: true, hidden: false });
      await tickAsync();

      expect(service.columns()[0].hideable).toBeTrue();
    });

    it('should default initialHidden to hidden when initialHidden not provided', async () => {
      service.register({ id: 'a' });
      service.registerHideable('a', { hideable: true, hidden: true });
      await tickAsync();

      expect(service.columns()[0].initialHidden).toBeTrue();
    });

    it('should set initialHidden independently when provided', async () => {
      service.register({ id: 'a' });
      service.registerHideable('a', { hideable: true, hidden: false, initialHidden: true });
      await tickAsync();

      const col = service.columns()[0];
      expect(col.hidden).toBeFalse();
      expect(col.initialHidden).toBeTrue();
    });

    it('should be a no-op when column is not registered', async () => {
      service.registerHideable('unknown', { hideable: true, hidden: false });
      await tickAsync();

      expect(service.columns().length).toBe(0);
    });
  });

  // ---------------------------------------------------------------------------
  describe('unregister', () => {
    it('should remove a registered column', async () => {
      service.register({ id: 'a' });
      service.unregister('a');
      await tickAsync();

      expect(service.columns().length).toBe(0);
    });

    it('should only remove the targeted column', async () => {
      service.register({ id: 'a' });
      service.register({ id: 'b' });
      service.unregister('a');
      await tickAsync();

      expect(service.columns().length).toBe(1);
      expect(service.columns()[0].id).toBe('b');
    });

    it('should be a no-op for unknown id', async () => {
      service.register({ id: 'a' });
      service.unregister('unknown');
      await tickAsync();

      expect(service.columns().length).toBe(1);
    });
  });

  // ---------------------------------------------------------------------------
  describe('initializeOrder', () => {
    it('should set columnIndex based on array position', async () => {
      service.register({ id: 'a' });
      service.register({ id: 'b' });
      service.initializeOrder(['a', 'b']);
      await tickAsync();

      const cols = service.columns();
      expect(cols.find(c => c.id === 'a').columnIndex).toBe(0);
      expect(cols.find(c => c.id === 'b').columnIndex).toBe(1);
    });

    it('should cause columns() to return columns sorted by columnIndex', async () => {
      service.register({ id: 'a' });
      service.register({ id: 'b' });
      service.register({ id: 'c' });
      service.initializeOrder(['c', 'a', 'b']);
      await tickAsync();

      const ids = service.columns().map(c => c.id);
      expect(ids).toEqual(['c', 'a', 'b']);
    });

    it('should ignore ids not present in state', async () => {
      service.register({ id: 'a' });
      service.initializeOrder(['a', 'unknown']);
      await tickAsync();

      expect(service.columns().length).toBe(1);
      expect(service.columns()[0].columnIndex).toBe(0);
    });
  });

  // ---------------------------------------------------------------------------
  describe('computed signals', () => {
    it('columns() should return all columns sorted by columnIndex', async () => {
      regOrdered([{ id: 'b' }, { id: 'a' }, { id: 'c' }]);
      await tickAsync();

      expect(service.columns().map(c => c.id)).toEqual(['b', 'a', 'c']);
    });

    it('visibleColumns() should exclude hidden columns', async () => {
      regOrdered([
        { id: 'a', hideable: true, hidden: false },
        { id: 'b', hideable: true, hidden: true },
      ]);
      await tickAsync();

      expect(service.visibleColumns().map(c => c.id)).toEqual(['a']);
    });

    it('hideableColumns() should include only hideable columns', async () => {
      regOrdered([{ id: 'a', hideable: true }, { id: 'b' }]);
      await tickAsync();

      expect(service.hideableColumns().map(c => c.id)).toEqual(['a']);
    });

    it('hasHideableColumns() should be true when hideable columns exist', async () => {
      regOrdered([{ id: 'a', hideable: true }]);
      await tickAsync();

      expect(service.hasHideableColumns()).toBeTrue();
    });

    it('hasHideableColumns() should be false when no hideable columns', async () => {
      regOrdered([{ id: 'a' }]);
      await tickAsync();

      expect(service.hasHideableColumns()).toBeFalse();
    });
  });

  // ---------------------------------------------------------------------------
  describe('changeWidth', () => {
    it('should update column width', async () => {
      regOrdered([{ id: 'a' }]);
      service.changeWidth('a', 200);
      await tickAsync();

      expect(service.columns()[0].width).toBe(200);
    });

    it('should emit WIDTH via changes$', async () => {
      regOrdered([{ id: 'a' }]);

      const emissions: TreetableColumnUpdate[] = [];
      const sub = service.changes$.subscribe(v => emissions.push(v));

      service.changeWidth('a', 150);
      await tickAsync();

      expect(emissions).toEqual([TreetableColumnUpdate.WIDTH]);
      sub.unsubscribe();
    });
  });

  // ---------------------------------------------------------------------------
  describe('changeHideable', () => {
    it('should make a non-hideable column hideable', async () => {
      regOrdered([{ id: 'a' }]);
      service.changeHideable('a', true, false);
      await tickAsync();

      expect(service.columns()[0].hideable).toBeTrue();
    });

    it('should set hidden and initialHidden when making column hideable', async () => {
      regOrdered([{ id: 'a' }]);
      service.changeHideable('a', true, true);
      await tickAsync();

      const col = service.columns()[0];
      expect(col.hidden).toBeTrue();
      expect(col.initialHidden).toBeTrue();
    });

    it('should make a hideable column non-hideable and reset hidden/initialHidden', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: true }]);
      service.changeHideable('a', false, false);
      await tickAsync();

      const col = service.columns()[0];
      expect(col.hideable).toBeFalse();
      expect(col.hidden).toBeFalse();
      expect(col.initialHidden).toBeFalse();
    });

    it('should update hidden on already-hideable column without changing hideable flag', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false }]);
      service.changeHideable('a', true, true);
      await tickAsync();

      const col = service.columns()[0];
      expect(col.hideable).toBeTrue();
      expect(col.hidden).toBeTrue();
    });
  });

  // ---------------------------------------------------------------------------
  describe('toggleHidden', () => {
    it('should flip hidden from false to true on a hideable column', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false }]);
      service.toggleHidden('a');
      await tickAsync();

      expect(service.columns()[0].hidden).toBeTrue();
    });

    it('should flip hidden from true to false on a hideable column', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: true }]);
      service.toggleHidden('a');
      await tickAsync();

      expect(service.columns()[0].hidden).toBeFalse();
    });

    it('should not affect a non-hideable column', async () => {
      regOrdered([{ id: 'a' }]);
      service.toggleHidden('a');
      await tickAsync();

      expect(service.columns()[0].hidden).toBeFalse();
    });

    it('should emit HIDDEN via changes$', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false }]);

      const emissions: TreetableColumnUpdate[] = [];
      const sub = service.changes$.subscribe(v => emissions.push(v));

      service.toggleHidden('a');
      await tickAsync();

      expect(emissions).toEqual([TreetableColumnUpdate.HIDDEN]);
      sub.unsubscribe();
    });
  });

  // ---------------------------------------------------------------------------
  describe('changeHiddenForAll / displayAllColumns', () => {
    it('should hide all columns when changeHiddenForAll(true)', async () => {
      regOrdered([
        { id: 'a', hideable: true, hidden: false },
        { id: 'b', hideable: true, hidden: false },
      ]);
      service.changeHiddenForAll(true);
      await tickAsync();

      expect(service.columns().every(c => c.hidden)).toBeTrue();
    });

    it('should show all columns via displayAllColumns()', async () => {
      regOrdered([
        { id: 'a', hideable: true, hidden: true },
        { id: 'b', hideable: true, hidden: true },
      ]);
      service.displayAllColumns();
      await tickAsync();

      expect(service.visibleColumns().length).toBe(2);
    });

    it('should emit HIDDEN via changes$', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false }]);

      const emissions: TreetableColumnUpdate[] = [];
      const sub = service.changes$.subscribe(v => emissions.push(v));

      service.changeHiddenForAll(true);
      await tickAsync();

      expect(emissions).toEqual([TreetableColumnUpdate.HIDDEN]);
      sub.unsubscribe();
    });
  });

  // ---------------------------------------------------------------------------
  describe('resetToInitialHidden', () => {
    it('should restore hideable columns to their initialHidden state', async () => {
      regOrdered([
        { id: 'a', hideable: true, hidden: false, initialHidden: true },
        { id: 'b', hideable: true, hidden: true, initialHidden: false },
      ]);
      service.resetToInitialHidden();
      await tickAsync();

      const cols = service.columns();
      expect(cols.find(c => c.id === 'a').hidden).toBeTrue();
      expect(cols.find(c => c.id === 'b').hidden).toBeFalse();
    });

    it('should not affect non-hideable columns', async () => {
      regOrdered([{ id: 'a' }]);
      service.changeHiddenForAll(true); // force hidden on non-hideable
      service.resetToInitialHidden();
      await tickAsync();

      // non-hideable column is not reset by resetToInitialHidden
      expect(service.columns()[0].hidden).toBeTrue();
    });

    it('should emit HIDDEN via changes$', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false, initialHidden: false }]);

      const emissions: TreetableColumnUpdate[] = [];
      const sub = service.changes$.subscribe(v => emissions.push(v));

      service.resetToInitialHidden();
      await tickAsync();

      expect(emissions).toEqual([TreetableColumnUpdate.HIDDEN]);
      sub.unsubscribe();
    });
  });

  // ---------------------------------------------------------------------------
  describe('getColumnState', () => {
    it('should emit current state of specified column', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false }]);

      const states: unknown[] = [];
      // getColumnState uses toObservable internally — must call within injection context
      const sub = TestBed.runInInjectionContext(() => service.getColumnState('a')).subscribe(s => states.push(s));
      await tickAsync();

      expect(states.length).toBeGreaterThan(0);
      expect((states[states.length - 1] as { id: string }).id).toBe('a');
      sub.unsubscribe();
    });

    it('should emit updated state when column changes', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false }]);

      const hiddenValues: boolean[] = [];
      const sub = TestBed.runInInjectionContext(() => service.getColumnState('a')).subscribe(s =>
        hiddenValues.push(s?.hidden)
      );
      await tickAsync();

      service.toggleHidden('a');
      await tickAsync();

      expect(hiddenValues).toContain(true);
      sub.unsubscribe();
    });
  });

  // ---------------------------------------------------------------------------
  describe('changes$', () => {
    it('should emit WIDTH for width changes', async () => {
      regOrdered([{ id: 'a' }]);

      const emissions: TreetableColumnUpdate[] = [];
      const sub = service.changes$.subscribe(v => emissions.push(v));

      service.changeWidth('a', 300);
      await tickAsync();

      expect(emissions).toEqual([TreetableColumnUpdate.WIDTH]);
      sub.unsubscribe();
    });

    it('should emit HIDDEN for toggleHidden', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false }]);

      const emissions: TreetableColumnUpdate[] = [];
      const sub = service.changes$.subscribe(v => emissions.push(v));

      service.toggleHidden('a');
      await tickAsync();

      expect(emissions).toEqual([TreetableColumnUpdate.HIDDEN]);
      sub.unsubscribe();
    });

    it('should emit HIDDEN for resetToInitialHidden', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false, initialHidden: false }]);

      const emissions: TreetableColumnUpdate[] = [];
      const sub = service.changes$.subscribe(v => emissions.push(v));

      service.resetToInitialHidden();
      await tickAsync();

      expect(emissions).toEqual([TreetableColumnUpdate.HIDDEN]);
      sub.unsubscribe();
    });

    it('should emit HIDDEN for changeHiddenForAll', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false }]);

      const emissions: TreetableColumnUpdate[] = [];
      const sub = service.changes$.subscribe(v => emissions.push(v));

      service.changeHiddenForAll(true);
      await tickAsync();

      expect(emissions).toEqual([TreetableColumnUpdate.HIDDEN]);
      sub.unsubscribe();
    });

    it('should emit one event per distinct action', async () => {
      regOrdered([{ id: 'a', hideable: true, hidden: false }]);

      const emissions: TreetableColumnUpdate[] = [];
      const sub = service.changes$.subscribe(v => emissions.push(v));

      service.changeWidth('a', 100);
      service.toggleHidden('a');
      service.resetToInitialHidden();
      await tickAsync();

      expect(emissions.length).toBe(3);
      expect(emissions[0]).toBe(TreetableColumnUpdate.WIDTH);
      expect(emissions[1]).toBe(TreetableColumnUpdate.HIDDEN);
      expect(emissions[2]).toBe(TreetableColumnUpdate.HIDDEN);
      sub.unsubscribe();
    });
  });
});
