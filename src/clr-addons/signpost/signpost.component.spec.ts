import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignpostComponent } from './signpost.component';

describe('SignpostComponent', () => {
  let component: SignpostComponent;
  let fixture: ComponentFixture<SignpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignpostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
