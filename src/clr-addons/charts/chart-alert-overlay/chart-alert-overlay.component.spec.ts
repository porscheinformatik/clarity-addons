import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ChartAlertOverlayComponent } from './chart-alert-overlay.component';

describe('ChartAlertOverlayComponent', () => {
  let fixture: ComponentFixture<ChartAlertOverlayComponent>;
  let component: ChartAlertOverlayComponent;
  let componentRef: ComponentRef<ChartAlertOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartAlertOverlayComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartAlertOverlayComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('alertMessage', 'No items to display');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the provided alert message', () => {
    const alertText = fixture.nativeElement.querySelector('.alert-text');
    expect(alertText.textContent.trim()).toBe('No items to display');
  });

  it('should use "info" as the default alertType', () => {
    expect(component.alertType()).toBe('info');
  });

  it('should update the message when alertMessage input changes', () => {
    componentRef.setInput('alertMessage', 'Too many items');
    fixture.detectChanges();
    const alertText = fixture.nativeElement.querySelector('.alert-text');
    expect(alertText.textContent.trim()).toBe('Too many items');
  });

  it('should accept "warning" as alertType', () => {
    componentRef.setInput('alertType', 'warning');
    fixture.detectChanges();
    expect(component.alertType()).toBe('warning');
  });
});
