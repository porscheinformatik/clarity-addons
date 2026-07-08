import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrTreetableFooter } from './treetable-footer';
import { TreetableColumnStateService } from './providers/treetable-column-state.service';
import { SortStateService, TreetableDataStateService } from './providers';
import { FilterStateService } from './providers/filter-state.service';

describe('TreetableFooterComponent', () => {
  let component: ClrTreetableFooter;
  let fixture: ComponentFixture<ClrTreetableFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClrTreetableFooter],
      providers: [TreetableColumnStateService, TreetableDataStateService, FilterStateService, SortStateService],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrTreetableFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
