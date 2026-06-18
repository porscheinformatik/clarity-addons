import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrTreetableColumnManagerMenuComponent } from './treetable-column-manager-menu.component';

describe('ClrTreetableColumnManagerMenuComponent', () => {
  let component: ClrTreetableColumnManagerMenuComponent;
  let fixture: ComponentFixture<ClrTreetableColumnManagerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrTreetableColumnManagerMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrTreetableColumnManagerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
