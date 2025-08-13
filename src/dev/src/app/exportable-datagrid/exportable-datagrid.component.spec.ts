import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportableDatagridComponent } from './exportable-datagrid.component';

describe('ExportableDatagridComponent', () => {
  let component: ExportableDatagridComponent;
  let fixture: ComponentFixture<ExportableDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportableDatagridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportableDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
