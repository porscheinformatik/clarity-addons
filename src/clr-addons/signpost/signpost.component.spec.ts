import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrSignpostAddonComponent } from './signpost.component';
import { ElementRef } from '@angular/core';

describe('SignpostComponent', () => {
  let component: ClrSignpostAddonComponent;
  let fixture: ComponentFixture<ClrSignpostAddonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrSignpostAddonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrSignpostAddonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should stop click propagation inside the signpost except for close button', () => {
    const stopImmediatePropagation = jasmine.createSpy('stopImmediatePropagation');
    const mockEvent = {
      target: document.createElement('div'),
      stopImmediatePropagation,
    } as any as MouseEvent;

    const signpostDiv = document.createElement('div');
    Object.defineProperty(component, 'signpostElement', {
      value: { nativeElement: signpostDiv } as ElementRef,
    });
    signpostDiv.appendChild(mockEvent.target as Node);

    component.preventPropagation(mockEvent);
    expect(stopImmediatePropagation).toHaveBeenCalled();
  });

  it('should move signpost content to the correct parent', () => {
    const parent = document.createElement('div');
    parent.classList.add('target-anchor');
    const signpostDiv = document.createElement('div');
    Object.defineProperty(component, 'signpostElement', {
      value: { nativeElement: signpostDiv } as ElementRef,
    });
    component.targetAnchor = '.target-anchor';

    const wrapper = document.createElement('div');
    parent.appendChild(wrapper);
    wrapper.appendChild(signpostDiv);

    spyOn(component['renderer'], 'appendChild').and.callThrough();

    spyOn(signpostDiv, 'closest').and.returnValue(parent);

    (component as any).moveSignpostContentToSiblingOfLabel();

    expect(component['renderer'].appendChild).toHaveBeenCalledWith(parent, signpostDiv);
  });
});
