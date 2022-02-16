import { Component, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ClrAddonsLabel } from './label';
import { ControlIdService } from './control-id.service';

@Component({ template: `<label></label>` })
class NoForTest {}

@Component({ template: `<label [for]="forValue"></label>` })
class ExplicitForTest {
  forValue = 'hello';
}

@Component({
  template: `<div><label for="hello"></label></div>`,
  providers: [ControlIdService],
})
class ContainerizedTest {
  @ViewChild(ClrAddonsLabel, { static: true }) label: ClrAddonsLabel;
}

describe('ClrAddonsLabel', () => {
  it("doesn't crash if it is not used in an Angular form", function () {
    TestBed.configureTestingModule({ declarations: [ClrAddonsLabel, NoForTest] });
    expect(() => {
      const fixture = TestBed.createComponent(NoForTest);
      fixture.detectChanges();
    }).not.toThrow();
  });

  it("doesn't set the the class unless its inside of a container", function () {
    TestBed.configureTestingModule({ declarations: [ClrAddonsLabel, NoForTest] });
    const fixture = TestBed.createComponent(NoForTest);
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('label')).nativeElement.classList.contains('clr-control-label')
    ).toBeFalse();
  });

  it('does set the the class when its inside of a container', function () {
    TestBed.configureTestingModule({
      declarations: [ClrAddonsLabel, ContainerizedTest],
    });
    const fixture = TestBed.createComponent(ContainerizedTest);
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('label')).nativeElement.classList.contains('clr-control-label')
    ).toBeTrue();
  });

  it('sets the for attribute to the id given by the service', function () {
    TestBed.configureTestingModule({ declarations: [ClrAddonsLabel, NoForTest], providers: [ControlIdService] });
    const fixture = TestBed.createComponent(NoForTest);
    fixture.detectChanges();
    const controlIdService = fixture.debugElement.injector.get(ControlIdService);
    const label = fixture.nativeElement.querySelector('label');
    expect(label.getAttribute('for')).toBe(controlIdService.id);
    controlIdService.id = 'test';
    fixture.detectChanges();
    expect(label.getAttribute('for')).toBe('test');
  });

  it('leaves the for attribute untouched if it exists', function () {
    TestBed.configureTestingModule({ declarations: [ClrAddonsLabel, ExplicitForTest], providers: [ControlIdService] });
    const fixture = TestBed.createComponent(ExplicitForTest);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.getAttribute('for')).toBe('hello');
  });

  it('provides a host binding on the for attribute', function () {
    TestBed.configureTestingModule({ declarations: [ClrAddonsLabel, ExplicitForTest], providers: [ControlIdService] });
    const fixture = TestBed.createComponent(ExplicitForTest);
    fixture.detectChanges();
    fixture.componentInstance.forValue = 'updatedFor';
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.getAttribute('for')).toBe('updatedFor');
  });
});
