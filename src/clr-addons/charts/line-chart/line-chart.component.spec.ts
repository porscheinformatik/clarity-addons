import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { LineChartComponent, LineChartSeries } from './line-chart.component';
import { NO_ITEMS_MESSAGE, NO_ITEMS_ALERT_TYPE } from '../constants';
import { ClrChartsModule } from '../charts.module';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr'];

const SINGLE_SERIES: LineChartSeries[] = [
  {
    key: 'revenue',
    label: 'Revenue',
    color: '#e57200',
    data: MONTHS.map((x, i) => ({ x, value: 100 + i * 10 })),
  },
];

const MULTI_SERIES: LineChartSeries[] = [
  ...SINGLE_SERIES,
  { key: 'costs', label: 'Costs', color: '#00828b', data: MONTHS.map((x, i) => ({ x, value: 50 + i * 5 })) },
];

describe('LineChartComponent', () => {
  let fixture: ComponentFixture<LineChartComponent>;
  let component: LineChartComponent;
  let componentRef: ComponentRef<LineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrChartsModule],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('series', SINGLE_SERIES);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('inputs – defaults', () => {
    it('should default loading to false', () => expect(component.loading()).toBeFalse());
    it('should default showLegend to true', () => expect(component.showLegend()).toBeTrue());
    it('should default showArea to false', () => expect(component.showArea()).toBeFalse());
    it('should default exportFilename to "line-chart"', () => expect(component.exportFilename()).toBe('line-chart'));
    it('should default tooltipOrientation to "top"', () => expect(component.tooltipOrientation()).toBe('top'));
  });

  describe('alertMessageAndType()', () => {
    it('should return undefined when loading', () => {
      componentRef.setInput('loading', true);
      fixture.detectChanges();
      expect(component.alertMessageAndType()).toBeUndefined();
    });

    it('should return undefined when data is present', () => {
      expect(component.alertMessageAndType()).toBeUndefined();
    });

    it('should return no-items alert for empty series', () => {
      componentRef.setInput('series', []);
      fixture.detectChanges();
      const [msg, type] = component.alertMessageAndType();
      expect(msg).toBe(NO_ITEMS_MESSAGE);
      expect(type).toBe(NO_ITEMS_ALERT_TYPE);
    });

    it('should return no-items alert when series have no data points', () => {
      componentRef.setInput('series', [{ key: 'k', label: 'L', color: '#000', data: [] }]);
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

    it('should return one item per series when showLegend is true', () => {
      componentRef.setInput('series', MULTI_SERIES);
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      expect(component.legendItems().length).toBe(2);
      expect(component.legendItems()[0]).toEqual({ label: 'Revenue', color: '#e57200' });
      expect(component.legendItems()[1]).toEqual({ label: 'Costs', color: '#00828b' });
    });
  });

  describe('exportFilename input', () => {
    it('should accept a custom exportFilename', () => {
      componentRef.setInput('exportFilename', 'my-line');
      expect(component.exportFilename()).toBe('my-line');
    });
  });

  describe('valueClicked output', () => {
    it('should emit when triggered', () => {
      const spy = jasmine.createSpy();
      component.valueClicked.subscribe(spy);
      const payload = { seriesKey: 'revenue', seriesLabel: 'Revenue', x: 'Jan', value: 100 };
      component.valueClicked.emit(payload);
      expect(spy).toHaveBeenCalledOnceWith(payload);
    });
  });
});
