/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ComboChartComponent, ComboBarSeries, ComboLineSeries, ComboChartValue } from './combo-chart.component';
import { NO_ITEMS_MESSAGE, NO_ITEMS_ALERT_TYPE } from '../constants';
import { ClrChartsModule } from '../charts.module';

const BAR_SERIES: ComboBarSeries[] = [
  {
    key: 'revenue',
    label: 'Revenue',
    color: '#e57200',
    data: [
      { x: 'jan', xLabel: 'January', value: 120 },
      { x: 'feb', xLabel: 'February', value: 85 },
      { x: 'mar', xLabel: 'March', value: 210 },
    ],
  },
  {
    key: 'costs',
    label: 'Costs',
    color: '#00828b',
    data: [
      { x: 'jan', xLabel: 'January', value: 60 },
      { x: 'feb', xLabel: 'February', value: 40 },
      { x: 'mar', xLabel: 'March', value: 90 },
    ],
  },
];

const LINE_SERIES: ComboLineSeries[] = [
  {
    key: 'target',
    label: 'Target',
    color: '#c1326e',
    data: [
      { x: 'jan', value: 100 },
      { x: 'feb', value: 110 },
      { x: 'mar', value: 120 },
    ],
  },
];

describe('ComboChartComponent', () => {
  let fixture: ComponentFixture<ComboChartComponent>;
  let component: ComboChartComponent;
  let componentRef: ComponentRef<ComboChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrChartsModule],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ComboChartComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('barSeries', BAR_SERIES);
    componentRef.setInput('lineSeries', LINE_SERIES);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Input defaults ──────────────────────────────────────────────────────────

  describe('inputs – defaults', () => {
    it('should default loading to false', () => expect(component.loading()).toBeFalse());
    it('should default showLegend to true', () => expect(component.showLegend()).toBeTrue());
    it('should default tooltipOrientation to "top"', () => expect(component.tooltipOrientation()).toBe('top'));
    it('should default exportFilename to "combo-chart"', () => expect(component.exportFilename()).toBe('combo-chart'));
    it('should default showExportButton to false', () => expect(component.showExportButton()).toBeFalse());
    it('should default noItemsMessage to the shared constant', () =>
      expect(component.noItemsMessage()).toBe(NO_ITEMS_MESSAGE));
  });

  // ── hasData() ───────────────────────────────────────────────────────────────

  describe('hasData()', () => {
    it('should be true when both barSeries and lineSeries contain data', () => {
      expect((component as any).hasData()).toBeTrue();
    });

    it('should be true when only barSeries has data', () => {
      componentRef.setInput('lineSeries', []);
      fixture.detectChanges();
      expect((component as any).hasData()).toBeTrue();
    });

    it('should be true when only lineSeries has data', () => {
      componentRef.setInput('barSeries', []);
      fixture.detectChanges();
      expect((component as any).hasData()).toBeTrue();
    });

    it('should be false when both are empty', () => {
      componentRef.setInput('barSeries', []);
      componentRef.setInput('lineSeries', []);
      fixture.detectChanges();
      expect((component as any).hasData()).toBeFalse();
    });

    it('should be false when series arrays contain series with empty data arrays', () => {
      componentRef.setInput('barSeries', [{ key: 'a', label: 'A', color: '#000', data: [] }]);
      componentRef.setInput('lineSeries', [{ key: 'b', label: 'B', color: '#fff', data: [] }]);
      fixture.detectChanges();
      expect((component as any).hasData()).toBeFalse();
    });
  });

  // ── total() ─────────────────────────────────────────────────────────────────

  describe('total()', () => {
    it('should sum all bar and line values', () => {
      // bars: (120+85+210) + (60+40+90) = 415 + 190 = 605
      // lines: (100+110+120) = 330
      // total = 935
      expect((component as any).total()).toBe(935);
    });

    it('should return 0 when both series are empty', () => {
      componentRef.setInput('barSeries', []);
      componentRef.setInput('lineSeries', []);
      fixture.detectChanges();
      expect((component as any).total()).toBe(0);
    });

    it('should count only bar values when lineSeries is empty', () => {
      componentRef.setInput('lineSeries', []);
      fixture.detectChanges();
      // (120+85+210) + (60+40+90) = 605
      expect((component as any).total()).toBe(605);
    });

    it('should count only line values when barSeries is empty', () => {
      componentRef.setInput('barSeries', []);
      fixture.detectChanges();
      // 100+110+120 = 330
      expect((component as any).total()).toBe(330);
    });
  });

  // ── alertMessageAndType() ────────────────────────────────────────────────────

  describe('alertMessageAndType()', () => {
    it('should return undefined when data is present', () => {
      expect(component.alertMessageAndType()).toBeUndefined();
    });

    it('should return undefined while loading (regardless of data)', () => {
      componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(component.alertMessageAndType()).toBeUndefined();
    });

    it('should return a no-items alert when both series are empty', () => {
      componentRef.setInput('barSeries', []);
      componentRef.setInput('lineSeries', []);
      fixture.detectChanges();
      const [msg, type] = component.alertMessageAndType();
      expect(msg).toBe(NO_ITEMS_MESSAGE);
      expect(type).toBe(NO_ITEMS_ALERT_TYPE);
    });

    it('should use a custom noItemsMessage', () => {
      componentRef.setInput('barSeries', []);
      componentRef.setInput('lineSeries', []);
      componentRef.setInput('noItemsMessage', 'Keine Daten vorhanden');
      fixture.detectChanges();
      const [msg] = component.alertMessageAndType();
      expect(msg).toBe('Keine Daten vorhanden');
    });
  });

  // ── legendItems() ────────────────────────────────────────────────────────────

  describe('legendItems()', () => {
    it('should return an empty array when showLegend is false', () => {
      componentRef.setInput('showLegend', false);
      fixture.detectChanges();
      expect(component.legendItems()).toEqual([]);
    });

    it('should return bar + line series as legend items when showLegend is true', () => {
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      // 2 bar series + 1 line series = 3
      expect(component.legendItems().length).toBe(3);
    });

    it('should map series label and color correctly', () => {
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      const items = component.legendItems();
      expect(items[0]).toEqual({ label: 'Revenue', color: '#e57200' });
      expect(items[1]).toEqual({ label: 'Costs', color: '#00828b' });
      expect(items[2]).toEqual({ label: 'Target', color: '#c1326e' });
    });

    it('should return only bar items when lineSeries is empty', () => {
      componentRef.setInput('lineSeries', []);
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      expect(component.legendItems().length).toBe(2);
    });

    it('should return only line items when barSeries is empty', () => {
      componentRef.setInput('barSeries', []);
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      expect(component.legendItems().length).toBe(1);
    });
  });

  // ── exportFilename ───────────────────────────────────────────────────────────

  describe('exportFilename input', () => {
    it('should accept a custom exportFilename', () => {
      componentRef.setInput('exportFilename', 'my-combo');
      fixture.detectChanges();
      expect(component.exportFilename()).toBe('my-combo');
    });
  });

  describe('showExportButton input', () => {
    it('should hide the export button when set to false', () => {
      componentRef.setInput('showExportButton', false);
      fixture.detectChanges();
      expect(component.showExportButton()).toBeFalse();
    });
  });

  // ── resetTooltip() ──────────────────────────────────────────────────────────

  describe('resetTooltip()', () => {
    it('should not throw when called with no selected item', () => {
      expect(() => component.resetTooltip()).not.toThrow();
    });

    it('should clear selectedItem and tooltipPosition', () => {
      // Expose the protected signals via any-cast for testing
      const c = component as any;
      c.selectedItem.set({
        seriesKey: 'revenue',
        seriesLabel: 'Revenue',
        seriesType: 'bar',
        color: '#e57200',
        x: 'jan',
        value: 120,
        total: 935,
      });
      c.tooltipPosition.set({ x: 100, y: 50 });
      fixture.detectChanges();

      component.resetTooltip();
      fixture.detectChanges();

      expect(c.selectedItem()).toBeUndefined();
      expect(c.tooltipPosition()).toBeUndefined();
    });
  });

  // ── valueClicked output ──────────────────────────────────────────────────────

  describe('valueClicked output', () => {
    it('should emit a ComboChartValue when triggered', () => {
      const spy = jasmine.createSpy('valueClicked');
      component.valueClicked.subscribe(spy);

      const emitted: ComboChartValue = {
        seriesKey: 'revenue',
        seriesLabel: 'Revenue',
        seriesType: 'bar',
        x: 'jan',
        xLabel: 'January',
        value: 120,
      };
      component.valueClicked.emit(emitted);

      expect(spy).toHaveBeenCalledOnceWith(emitted);
    });
  });

  // ── tooltipOrientation ───────────────────────────────────────────────────────

  describe('tooltipOrientation input', () => {
    it('should accept "bottom" as orientation', () => {
      componentRef.setInput('tooltipOrientation', 'bottom');
      fixture.detectChanges();
      expect(component.tooltipOrientation()).toBe('bottom');
    });
  });
});
