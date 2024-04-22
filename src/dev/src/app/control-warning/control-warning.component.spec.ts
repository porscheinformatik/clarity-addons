import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlWarningComponent } from './control-warning.component';

describe('ControlWarningComponent', () => {
  let component: ControlWarningComponent;
  let fixture: ComponentFixture<ControlWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlWarningComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
