import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrHtmlEditorComponent } from './html-editor.component';

describe('HtmlComponent', () => {
  let component: ClrHtmlEditorComponent;
  let fixture: ComponentFixture<ClrHtmlEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClrHtmlEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrHtmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
