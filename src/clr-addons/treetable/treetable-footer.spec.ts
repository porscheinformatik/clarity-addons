import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrTreetableFooter } from './treetable-footer';

describe('TreetableFooterComponent', () => {
  let component: ClrTreetableFooter;
  let fixture: ComponentFixture<ClrTreetableFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrTreetableFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrTreetableFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
