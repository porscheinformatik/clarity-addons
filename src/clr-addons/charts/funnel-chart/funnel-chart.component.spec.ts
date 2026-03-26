import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { FunnelChartComponent, FunnelChartData } from './funnel-chart.component';
import { ClrChartsModule } from '../charts.module';

const SAMPLE_DATA: FunnelChartData[] = [
  {
    key: 'stage1',
    label: 'Stage 1',
    value: 1000,
    sections: [
      { key: 'passed', label: 'Passed Through', value: 650 },
      { key: 'active', label: 'Active', value: 200 },
      { key: 'lost', label: 'Lost', value: 100 },
      { key: 'rejected', label: 'Rejected', value: 50 },
    ],
  },
  {
    key: 'stage2',
    label: 'Stage 2',
    value: 650,
    sections: [
      { key: 'passed', label: 'Passed Through', value: 400 },
      { key: 'active', label: 'Active', value: 150 },
      { key: 'lost', label: 'Lost', value: 80 },
      { key: 'rejected', label: 'Rejected', value: 20 },
    ],
  },
  {
    key: 'stage3',
    label: 'Stage 3',
    value: 400,
    sections: [
      { key: 'passed', label: 'Passed Through', value: 250 },
      { key: 'active', label: 'Active', value: 80 },
      { key: 'lost', label: 'Lost', value: 60 },
      { key: 'rejected', label: 'Rejected', value: 10 },
    ],
  },
  {
    key: 'stage4',
    label: 'Stage 4',
    value: 250,
    sections: [
      { key: 'passed', label: 'Passed Through', value: 155 },
      { key: 'active', label: 'Active', value: 50 },
      { key: 'lost', label: 'Lost', value: 40 },
      { key: 'rejected', label: 'Rejected', value: 5 },
    ],
  },
];

describe('FunnelChartComponent', () => {
  let fixture: ComponentFixture<FunnelChartComponent>;
  let component: FunnelChartComponent;
  let componentRef: ComponentRef<FunnelChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrChartsModule],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(FunnelChartComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('data', SAMPLE_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Input defaults ──────────────────────────────────────────────────────────

  describe('inputs – defaults', () => {
    it('should default loading to false', () => expect(component.loading()).toBeFalse());
    it('should default textSize to 200', () => expect(component.textSize()).toBe(200));
    it('should default barGap to 2', () => expect(component.barGap()).toBe(2));
    it('should default exportFilename to "funnel-chart"', () =>
      expect(component.exportFilename()).toBe('funnel-chart'));
    it('should default orientation to "default"', () => expect(component.orientation()).toBe('default'));
    it('should default spacerColor to "#D9D9D9"', () => expect(component.spacerColor()).toBe('#D9D9D9'));
    it('should default barToSpacerRatio to 2', () => expect(component.barToSpacerRatio()).toBe(2));
  });

  // ── orientation input ────────────────────────────────────────────────────────
  describe('orientation input', () => {
    it('should accept "centered"', () => {
      componentRef.setInput('orientation', 'centered');
      fixture.detectChanges();
      expect(component.orientation()).toBe('centered');
    });

    it('should accept "default"', () => {
      componentRef.setInput('orientation', 'centered');
      componentRef.setInput('orientation', 'default');
      fixture.detectChanges();
      expect(component.orientation()).toBe('default');
    });
  });

  // ── hasData() ───────────────────────────────────────────────────────────────

  describe('hasData()', () => {
    it('should be true when data is provided', () => {
      expect((component as any).hasData()).toBeTrue();
    });

    it('should be false when data is empty', () => {
      componentRef.setInput('data', []);
      fixture.detectChanges();
      expect((component as any).hasData()).toBeFalse();
    });
  });

  // ── total() ─────────────────────────────────────────────────────────────────

  describe('total()', () => {
    it('should return the value of the first data point (first stage)', () => {
      expect((component as any).total()).toBe(1000);
    });

    it('should return 0 when data is empty', () => {
      componentRef.setInput('data', []);
      fixture.detectChanges();
      expect((component as any).total()).toBe(0);
    });
  });

  // ── resolvedChartLabels() ───────────────────────────────────────────────────

  describe('resolvedChartLabels()', () => {
    it('should use English defaults when no chartLabels input is provided', () => {
      const labels = (component as any).resolvedChartLabels();
      expect(labels.total).toBe('Total');
      expect(labels.all).toBe('All');
    });

    it('should merge custom labels over the defaults', () => {
      componentRef.setInput('chartLabels', { total: 'Gesamt' });
      fixture.detectChanges();
      const labels = (component as any).resolvedChartLabels();
      expect(labels.total).toBe('Gesamt');
      expect(labels.all).toBe('All'); // unchanged default
    });
  });

  // ── resetTooltip() ──────────────────────────────────────────────────────────

  describe('resetTooltip()', () => {
    it('should not throw when called with no selection', () => {
      expect(() => component.resetTooltip()).not.toThrow();
    });

    it('should clear selectedItem and tooltipPosition', () => {
      const c = component as any;
      c.selectedItem.set({
        key: 'stage1',
        label: 'Stage 1',
        value: 1000,
        y: 0,
        width: 100,
        percentage: 100,
        sections: [],
      });
      c.tooltipPosition.set({ x: 50, y: 80 });
      fixture.detectChanges();

      component.resetTooltip();
      fixture.detectChanges();

      expect(c.selectedItem()).toBeUndefined();
      expect(c.tooltipPosition()).toBeUndefined();
    });
  });

  // ── valueClicked output ──────────────────────────────────────────────────────

  describe('valueClicked output', () => {
    it('should emit a FunnelValue when triggered', () => {
      const spy = jasmine.createSpy('valueClicked');
      component.valueClicked.subscribe(spy);
      component.valueClicked.emit({ value: 1000, label: 'Stage 1', key: 'stage1', section: 'active' });
      expect(spy).toHaveBeenCalledOnceWith({
        value: 1000,
        label: 'Stage 1',
        key: 'stage1',
        section: 'active',
      });
    });
  });

  // ── loading input ────────────────────────────────────────────────────────────

  describe('loading input', () => {
    it('should accept true', () => {
      componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(component.loading()).toBeTrue();
    });
  });

  // ── exportFilename ───────────────────────────────────────────────────────────

  describe('exportFilename input', () => {
    it('should accept a custom export filename', () => {
      componentRef.setInput('exportFilename', 'sales-funnel');
      fixture.detectChanges();
      expect(component.exportFilename()).toBe('sales-funnel');
    });

    it('should accept empty string to suppress the export button', () => {
      componentRef.setInput('exportFilename', '');
      fixture.detectChanges();
      expect(component.exportFilename()).toBe('');
    });
  });

  // ── sectionColors input ──────────────────────────────────────────────────────

  describe('sectionColors input', () => {
    it('should accept a Record<string, string> of section key overrides', () => {
      componentRef.setInput('sectionColors', { passed: '#006b4a', active: '#5b40b2' });
      fixture.detectChanges();
      expect(component.sectionColors()).toEqual({ passed: '#006b4a', active: '#5b40b2' });
    });
  });
});
