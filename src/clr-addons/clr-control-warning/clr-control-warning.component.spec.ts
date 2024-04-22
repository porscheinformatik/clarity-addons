import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrControlWarningComponent } from './clr-control-warning.component';

describe('ClrControlWarningComponent', () => {
  let component: ClrControlWarningComponent;
  let fixture: ComponentFixture<ClrControlWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrControlWarningComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrControlWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
