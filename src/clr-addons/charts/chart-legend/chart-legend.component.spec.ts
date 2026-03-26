import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ChartLegendComponent, ChartLegendItem } from './chart-legend.component';

const ITEMS: ChartLegendItem[] = [
  { label: 'Revenue', color: '#e57200' },
  { label: 'Costs', color: '#00828b' },
  { label: 'Profit', color: '#5b40b2' },
];

describe('ChartLegendComponent', () => {
  let fixture: ComponentFixture<ChartLegendComponent>;
  let component: ChartLegendComponent;
  let componentRef: ComponentRef<ChartLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartLegendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartLegendComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('items', ITEMS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one legend-item per input item', () => {
    const items = fixture.debugElement.queryAll(By.css('.legend-item'));
    expect(items.length).toBe(ITEMS.length);
  });

  it('should display correct labels', () => {
    const labels = fixture.debugElement.queryAll(By.css('.legend-label'));
    expect(labels[0].nativeElement.textContent.trim()).toBe('Revenue');
    expect(labels[1].nativeElement.textContent.trim()).toBe('Costs');
    expect(labels[2].nativeElement.textContent.trim()).toBe('Profit');
  });

  it('should apply the correct background colour to each colour square', () => {
    const squares = fixture.debugElement.queryAll(By.css('.legend-color-square'));
    // Browsers normalise hex to rgb()
    expect(squares[0].nativeElement.style.backgroundColor).toBe('rgb(229, 114, 0)');
    expect(squares[1].nativeElement.style.backgroundColor).toBe('rgb(0, 130, 139)');
  });

  it('should render no items when the items array is empty', () => {
    componentRef.setInput('items', []);
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.legend-item'));
    expect(items.length).toBe(0);
  });

  it('should update when items input changes', () => {
    componentRef.setInput('items', [{ label: 'Only', color: '#000' }]);
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.legend-item'));
    expect(items.length).toBe(1);
    expect(items[0].query(By.css('.legend-label')).nativeElement.textContent.trim()).toBe('Only');
  });
});
