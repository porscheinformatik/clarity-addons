import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlEditorComponent } from './html-editor.component';

describe('HtmlComponent', () => {
  let component: HtmlEditorComponent;
  let fixture: ComponentFixture<HtmlEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HtmlEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HtmlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
