import { TestBed } from '@angular/core/testing';

import { TreetableColumnStateService } from './treetable-column-state.service';

describe('TreetableColumnStateService', () => {
  let service: TreetableColumnStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreetableColumnStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
