import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WindowResizeDirective } from './window-resize.directive';
import { ScreenStateService } from './screen-state.service';
import { Subject } from 'rxjs';

@Component({
  template: `<div (cngWindowResize)="onResize($event)"></div>`,
  imports: [WindowResizeDirective],
})
class TestHostComponent {
  lastWidth: number | undefined;
  onResize(width: number) {
    this.lastWidth = width;
  }
}

describe('WindowResizeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let screenWidthSubject: Subject<number>;
  let mockScreenStateService: { getScreenWidthChanged: () => Subject<number> };

  beforeEach(async () => {
    screenWidthSubject = new Subject<number>();
    mockScreenStateService = { getScreenWidthChanged: () => screenWidthSubject };

    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [{ provide: ScreenStateService, useValue: mockScreenStateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    const directive = fixture.debugElement.query(By.directive(WindowResizeDirective));
    expect(directive).toBeTruthy();
  });

  it('should skip the first emission by default (includeFirst = false)', fakeAsync(() => {
    // The first value from subject would be skipped
    screenWidthSubject.next(800);
    tick(250);
    fixture.detectChanges();
    expect(host.lastWidth).toBeUndefined();
  }));

  it('should emit after the second resize event with debounce', fakeAsync(() => {
    // Skip first
    screenWidthSubject.next(800);
    tick(250);
    // Second emission should be delivered
    screenWidthSubject.next(1024);
    tick(250);
    fixture.detectChanges();
    expect(host.lastWidth).toBe(1024);
  }));
});
