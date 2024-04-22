import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlWarningDemo } from './control-warning.demo';

describe('ControlWarningComponent', () => {
  let component: ControlWarningDemo;
  let fixture: ComponentFixture<ControlWarningDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlWarningDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlWarningDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
