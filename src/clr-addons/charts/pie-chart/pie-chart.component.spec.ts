import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { PieChartComponent, PieChartData } from './pie-chart.component';
import { NO_ITEMS_MESSAGE, NO_ITEMS_ALERT_TYPE } from '../constants';
import { ClrChartsModule } from '../charts.module';

const DATA: PieChartData[] = [
  { key: 'jan', label: 'January', value: 120, color: '#e57200' },
  { key: 'feb', label: 'February', value: 85, color: '#00828b' },
  { key: 'mar', label: 'March', value: 210, color: '#c1326e' },
];

describe('PieChartComponent', () => {
  let fixture: ComponentFixture<PieChartComponent>;
  let component: PieChartComponent;
  let componentRef: ComponentRef<PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrChartsModule],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('data', DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('inputs – defaults', () => {
    it('should default loading to false', () => expect(component.loading()).toBeFalse());
    it('should default showLegend to true', () => expect(component.showLegend()).toBeTrue());
    it('should default donut to true', () => expect(component.donut()).toBeTrue());
    it('should default exportFilename to "pie-chart"', () => expect(component.exportFilename()).toBe('pie-chart'));
    it('should default tooltipOrientation to "top"', () => expect(component.tooltipOrientation()).toBe('top'));
  });

  describe('alertMessageAndType()', () => {
    it('should return undefined when loading', () => {
      componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(component.alertMessageAndType()).toBeUndefined();
    });

    it('should return undefined when data is present and not loading', () => {
      expect(component.alertMessageAndType()).toBeUndefined();
    });

    it('should return no-items alert for empty data', () => {
      componentRef.setInput('data', []);
      fixture.detectChanges();
      const [msg, type] = component.alertMessageAndType();
      expect(msg).toBe(NO_ITEMS_MESSAGE);
      expect(type).toBe(NO_ITEMS_ALERT_TYPE);
    });

    it('should return no-items alert when all values are zero', () => {
      componentRef.setInput('data', [{ key: 'k', label: 'L', value: 0, color: '#000' }]);
      fixture.detectChanges();
      expect(component.alertMessageAndType()).toBeTruthy();
    });
  });

  describe('legendItems()', () => {
    it('should return empty array when showLegend is false', () => {
      componentRef.setInput('showLegend', false);
      fixture.detectChanges();
      expect(component.legendItems()).toEqual([]);
    });

    it('should return one item per data entry with a positive value when showLegend is true', () => {
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      expect(component.legendItems().length).toBe(DATA.length);
      expect(component.legendItems()[0]).toEqual({ label: 'January', color: '#e57200' });
    });

    it('should exclude items with zero values from the legend', () => {
      const dataWithZero: PieChartData[] = [...DATA, { key: 'zero', label: 'Zero', value: 0, color: '#fff' }];
      componentRef.setInput('data', dataWithZero);
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      expect(component.legendItems().length).toBe(DATA.length);
    });

    it('should use fullLabel when provided', () => {
      const dataWithFullLabel: PieChartData[] = [
        { key: 'jan', label: 'Jan', fullLabel: 'January (Full)', value: 100, color: '#e57200' },
      ];
      componentRef.setInput('data', dataWithFullLabel);
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      expect(component.legendItems()[0].label).toBe('January (Full)');
    });
  });

  describe('exportFilename input', () => {
    it('should accept a custom exportFilename', () => {
      componentRef.setInput('exportFilename', 'my-pie');
      expect(component.exportFilename()).toBe('my-pie');
    });
  });

  describe('valueClicked output', () => {
    it('should emit when triggered', () => {
      const spy = jasmine.createSpy();
      component.valueClicked.subscribe(spy);
      const payload = { key: 'jan', label: 'January', value: 120 };
      component.valueClicked.emit(payload);
      expect(spy).toHaveBeenCalledOnceWith(payload);
    });
  });
});
