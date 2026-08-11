import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { GroupedBarChartComponent, GroupedBarChartData, GroupedBarChartGroup } from './grouped-bar-chart.component';
import { ALL_ITEMS_ZERO_MESSAGE, NO_ITEMS_ALERT_TYPE, NO_ITEMS_MESSAGE } from '../constants';
import { ClrChartsModule } from '../charts.module';

const GROUPED_DATA: GroupedBarChartData[] = [
  { key: 'jan-revenue', groupKey: 'jan', label: 'Revenue', value: 120, color: '#e57200' },
  { key: 'jan-costs', groupKey: 'jan', label: 'Costs', value: 60, color: '#00828b' },
  { key: 'feb-revenue', groupKey: 'feb', label: 'Revenue', value: 85, color: '#e57200' },
  { key: 'feb-costs', groupKey: 'feb', label: 'Costs', value: 40, color: '#00828b' },
];

const GROUPS: GroupedBarChartGroup[] = [
  { key: 'jan', label: 'January' },
  { key: 'feb', label: 'February' },
];

describe('GroupedBarChartComponent', () => {
  let fixture: ComponentFixture<GroupedBarChartComponent>;
  let component: GroupedBarChartComponent;
  let componentRef: ComponentRef<GroupedBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrChartsModule],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupedBarChartComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('data', GROUPED_DATA);
    componentRef.setInput('groups', GROUPS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('inputs – defaults', () => {
    it('should default loading to false', () => expect(component.loading()).toBeFalse());
    it('should default showLegend to true', () => expect(component.showLegend()).toBeTrue());
    it('should default showExportButton to false', () => expect(component.showExportButton()).toBeFalse());
    it('should default orientation to "horizontal"', () => expect(component.orientation()).toBe('horizontal'));
    it('should default barSizePx to 12', () => expect(component.barSizePx()).toBe(12));
    it('should default exportFilename to "grouped-bar-chart"', () =>
      expect(component.exportFilename()).toBe('grouped-bar-chart'));
    it('should default tooltipOrientation to "top"', () => expect(component.tooltipOrientation()).toBe('top'));
  });

  describe('orientation input', () => {
    it('should accept vertical orientation', () => {
      componentRef.setInput('orientation', 'vertical');
      fixture.detectChanges();
      expect(component.orientation()).toBe('vertical');
    });
  });

  describe('barSizePx input', () => {
    it('should accept a custom bar size', () => {
      componentRef.setInput('barSizePx', 18);
      fixture.detectChanges();
      expect(component.barSizePx()).toBe(18);
    });
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

    it('should return an all-zero alert when all values are zero', () => {
      componentRef.setInput(
        'data',
        GROUPED_DATA.map(item => ({ ...item, value: 0 }))
      );
      fixture.detectChanges();
      const [msg, type] = component.alertMessageAndType();
      expect(msg).toBe(ALL_ITEMS_ZERO_MESSAGE);
      expect(type).toBe(NO_ITEMS_ALERT_TYPE);
    });
  });

  describe('legendItems()', () => {
    it('should return empty array when showLegend is false', () => {
      componentRef.setInput('showLegend', false);
      fixture.detectChanges();
      expect(component.legendItems()).toEqual([]);
    });

    it('should return one item per distinct label', () => {
      componentRef.setInput('showLegend', true);
      fixture.detectChanges();
      expect(component.legendItems().length).toBe(2);
    });
  });

  describe('valueClicked output', () => {
    it('should emit when valueClicked is triggered', () => {
      const spy = jasmine.createSpy('valueClicked');
      component.valueClicked.subscribe(spy);
      component.valueClicked.emit({
        key: 'jan-revenue',
        label: 'Revenue',
        groupKey: 'jan',
        groupLabel: 'January',
        value: 120,
      });
      expect(spy).toHaveBeenCalledOnceWith({
        key: 'jan-revenue',
        label: 'Revenue',
        groupKey: 'jan',
        groupLabel: 'January',
        value: 120,
      });
    });
  });
});
