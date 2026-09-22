import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClrFilterClearButtonComponent } from './filter-clear-button.component';

@Component({
  template: `<clr-filter-clear-button testId="test-clear-button" (clear)="onClear()"></clr-filter-clear-button>`,
  standalone: false,
})
class TestComponent {
  cleared = false;
  onClear() {
    this.cleared = true;
  }
}

describe('ClrFilterClearButtonComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ClrFilterClearButtonComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the provided testId as a data-testid attribute', () => {
    const button = fixture.debugElement.query(By.css('button'));

    expect(button.nativeElement.getAttribute('data-testid')).toBe('test-clear-button');
  });

  it('emits clear when clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.cleared).toBeTrue();
  });
});
