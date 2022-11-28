import { Component, QueryList, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule, ClrDatagridHideableColumn } from '@clr/angular';
import { By } from '@angular/platform-browser';
import { ClrDatagridStatePersistenceModule } from './datagrid-state-persistence.module';

@Component({
  template: `
    <clr-datagrid [clrStatePersistenceKey]="{ key: 'ColumnHiddenStatePersistenceDirective', serverDriven: true }">
      <clr-dg-column id="column1" [clrDgField]="'column1'">
        <ng-template clrDgHideableColumn><span>column1</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column2" [clrDgField]="'column2'">
        <ng-template clrDgHideableColumn><span>column2</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column3">
        <ng-template clrDgHideableColumn><span>column3</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column4" [clrDgField]="'column4'">
        <span>column4</span>
      </clr-dg-column>
      <clr-dg-column id="column5" [clrDgField]="'column5'">
        <ng-template clrDgHideableColumn [clrDgHidden]="true"><span>column5</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column6" [clrDgField]="'column6'">
        <ng-template clrDgHideableColumn [clrDgHidden]="true"><span>column5</span></ng-template>
      </clr-dg-column>
    </clr-datagrid>
  `,
})
class TestComponent {
  @ViewChildren(ClrDatagridHideableColumn)
  hideableColumnDirectives: QueryList<ClrDatagridHideableColumn>;
}

describe('ColumnHiddenStatePersistenceDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ClrDatagridStatePersistenceModule],
      declarations: [TestComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Nothing persisted', () => {
    expect(fixture.debugElement.query(By.css('#column1')).nativeElement).not.toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column2')).nativeElement).not.toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column3')).nativeElement).not.toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column4')).nativeElement).not.toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column5')).nativeElement).toHaveClass('datagrid-hidden-column');
  });

  it('Loaded from storage', () => {
    const storageModel =
      '{"columns":{"column1": {"hidden":true}, "column2": {"hidden":false}, "column6": {"hidden":false}}}';
    localStorage.setItem('ColumnHiddenStatePersistenceDirective', storageModel);

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#column1')).nativeElement).toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column2')).nativeElement).not.toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column3')).nativeElement).not.toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column4')).nativeElement).not.toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column5')).nativeElement).toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column6')).nativeElement).not.toHaveClass('datagrid-hidden-column');
  });

  it('Persisted to storage', () => {
    fixture.componentInstance.hideableColumnDirectives.get(0).clrDgHidden = true;
    fixture.componentInstance.hideableColumnDirectives.get(2).clrDgHidden = true;
    fixture.componentInstance.hideableColumnDirectives.get(3).clrDgHidden = false;

    expect(fixture.debugElement.query(By.css('#column1')).nativeElement).toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column2')).nativeElement).not.toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column3')).nativeElement).toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column4')).nativeElement).not.toHaveClass('datagrid-hidden-column');
    expect(fixture.debugElement.query(By.css('#column5')).nativeElement).not.toHaveClass('datagrid-hidden-column');

    const storageModel = localStorage.getItem('ColumnHiddenStatePersistenceDirective');
    expect(storageModel).toBe('{"columns":{"column1":{"hidden":true},"column5":{"hidden":false}}}');
  });
});
