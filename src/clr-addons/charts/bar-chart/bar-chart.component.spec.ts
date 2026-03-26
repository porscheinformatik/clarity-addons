import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { BarChartComponent, BarChartData } from './bar-chart.component';
import { NO_ITEMS_MESSAGE, NO_ITEMS_ALERT_TYPE } from '../constants';
import { ClrChartsModule } from '../charts.module';

const SIMPLE_DATA: BarChartData[] = [
  { key: 'jan', label: 'January', value: 120, color: '#e57200' },
  { key: 'feb', label: 'February', value: 85, color: '#00828b' },
  { key: 'mar', label: 'March', value: 210, color: '#c1326e' },
];

const STACKED_DATA: BarChartData[] = [
  { key: 'jan-a', label: 'Revenue', value: 120, color: '#e57200', stackKey: 'jan' },
  { key: 'jan-b', label: 'Costs', value: 60, color: '#00828b', stackKey: 'jan' },
  { key: 'feb-a', label: 'Revenue', value: 85, color: '#e57200', stackKey: 'feb' },
  { key: 'feb-b', label: 'Costs', value: 40, color: '#00828b', stackKey: 'feb' },
];

describe('BarChartComponent', () => {
  let fixture: ComponentFixture<BarChartComponent>;
  let component: BarChartComponent;
  let componentRef: ComponentRef<BarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrChartsModule],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('data', SIMPLE_DATA);
    componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('inputs – defaults', () => {
    it('should default loading to false', () => expect(component.loading()).toBeFalse());
    it('should default showLegend to true', () => expect(component.showLegend()).toBeTrue());
    it('should default showExportButton to false', () => expect(component.showExportButton()).toBeFalse());
    it('should default exportFilename to "bar-chart"', () => expect(component.exportFilename()).toBe('bar-chart'));
    it('should default tooltipOrientation to "top"', () => expect(component.tooltipOrientation()).toBe('top'));
    it('should default stackLabels to undefined', () => expect(component.stackLabels()).toBeUndefined());
  });

  describe('alertMessageAndType()', () => {
    it('should return undefined when loading', () => {
      componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(component.alertMessageAndType()).toBeUndefined();
    });

    it('should return a no-items alert for empty data', () => {
      componentRef.setInput('data', []);
      fixture.detectChanges();
      const [msg, type] = component.alertMessageAndType();
      expect(msg).toBe(NO_ITEMS_MESSAGE);
      expect(type).toBe(NO_ITEMS_ALERT_TYPE);
    });
  });

  describe('legendItems()', () => {
    it('should return empty array when showLegend is false', () => {
      componentRef.setInput('showLegend', false);
      fixture.detectChanges();
      expect(component.legendItems()).toEqual([]);
    });

    it('should return one item per bar when showLegend is true (simple data)', () => {
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      expect(component.legendItems().length).toBe(SIMPLE_DATA.length);
    });

    it('should return one item per distinct label for stacked data', () => {
      componentRef.setInput('data', STACKED_DATA);
      componentRef.setInput('stackLabels', ['jan', 'feb']);
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      // Revenue + Costs = 2 distinct labels
      expect(component.legendItems().length).toBe(2);
    });
  });

  describe('exportFilename input', () => {
    it('should accept a custom exportFilename', () => {
      componentRef.setInput('exportFilename', 'my-bar');
      fixture.detectChanges();
      expect(component.exportFilename()).toBe('my-bar');
    });
  });

  describe('showExportButton input', () => {
    it('should hide the export button when set to false', () => {
      componentRef.setInput('showExportButton', false);
      fixture.detectChanges();
      expect(component.showExportButton()).toBeFalse();
    });
  });

  describe('valueClicked output', () => {
    it('should emit when valueClicked is triggered', () => {
      const spy = jasmine.createSpy('valueClicked');
      component.valueClicked.subscribe(spy);
      component.valueClicked.emit({ key: ['jan'], label: 'January', value: 120 });
      expect(spy).toHaveBeenCalledOnceWith({ key: ['jan'], label: 'January', value: 120 });
    });
  });
});
