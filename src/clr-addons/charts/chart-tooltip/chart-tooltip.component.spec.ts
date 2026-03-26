import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ChartTooltipComponent } from './chart-tooltip.component';

describe('ChartTooltipComponent', () => {
  let fixture: ComponentFixture<ChartTooltipComponent>;
  let component: ChartTooltipComponent;
  let componentRef: ComponentRef<ChartTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartTooltipComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('tooltipPosition', { x: 120, y: 80 });
    componentRef.setInput('squareColor', '#e57200');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default orientation "top"', () => {
    expect(component.tooltipOrientation()).toBe('top');
  });

  it('should have tooltipClickable true by default', () => {
    expect(component.tooltipClickable()).toBeTrue();
  });

  it('should position the container using the tooltipPosition input', () => {
    const container = fixture.debugElement.query(By.css('.tooltip-container')).nativeElement;
    expect(container.style.left).toBe('120px');
    expect(container.style.top).toBe('80px');
  });

  it('should add orientation-bottom class when orientation is "bottom"', () => {
    componentRef.setInput('tooltipOrientation', 'bottom');
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.tooltip-container')).nativeElement;
    expect(container.classList).toContain('orientation-bottom');
  });

  it('should not add orientation-bottom class when orientation is "top"', () => {
    const container = fixture.debugElement.query(By.css('.tooltip-container')).nativeElement;
    expect(container.classList).not.toContain('orientation-bottom');
  });

  it('should show the colour square when squareColor is provided', () => {
    const square = fixture.debugElement.query(By.css('.color-square'));
    expect(square).toBeTruthy();
    expect(square.nativeElement.style.backgroundColor).toBe('rgb(229, 114, 0)');
  });

  it('should hide the colour square when squareColor is undefined', () => {
    componentRef.setInput('squareColor', undefined);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.color-square'))).toBeNull();
  });

  it('should emit tooltipClosed when the close button is clicked', () => {
    const spy = spyOn(component.tooltipClosed, 'emit');
    fixture.debugElement.query(By.css('.tooltip-close-btn')).triggerEventHandler('click', new MouseEvent('click'));
    expect(spy).toHaveBeenCalledOnceWith();
  });

  it('should emit tooltipHeaderClicked when the header h5 is clicked and clickable', () => {
    const spy = spyOn(component.tooltipHeaderClicked, 'emit');
    fixture.debugElement.query(By.css('h5')).triggerEventHandler('click', new MouseEvent('click'));
    expect(spy).toHaveBeenCalledOnceWith();
  });

  it('should NOT emit tooltipHeaderClicked when tooltipClickable is false', () => {
    componentRef.setInput('tooltipClickable', false);
    fixture.detectChanges();
    const spy = spyOn(component.tooltipHeaderClicked, 'emit');
    fixture.debugElement.query(By.css('h5')).triggerEventHandler('click', new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });
});
