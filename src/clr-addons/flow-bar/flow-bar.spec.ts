/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { of } from 'rxjs';

import { ClrFlowBar } from './flow-bar';

describe('FlowBarComponent', () => {
  let fixture: ComponentFixture<ClrFlowBar>;
  let component: ClrFlowBar;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClrFlowBar],
        imports: [ClarityModule],
        teardown: { destroyAfterEach: false },
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrFlowBar);
    component = fixture.componentInstance;
    component._steps = [
      { title: of('Step1'), enabled: true },
      { title: of('Step2'), enabled: true },
      { title: of('Step3'), enabled: true },
    ];
    fixture.detectChanges();
    expect(component._activeStep).toBe(component._steps[0]);
  });

  it('Select next step successful', () => {
    component.next();
    expect(component._activeStep).toBe(component._steps[1]);
  });

  it('Select previous step successful', () => {
    component._activeStep = component._steps[2];
    component.previous();
    expect(component._activeStep).toBe(component._steps[1]);
  });

  it('Next step not available', () => {
    component._activeStep = component._steps[2];
    const avail = component.isNextAvailable();
    expect(avail).toBeFalse();
  });

  it('Previous step not available', () => {
    const avail = component.isPreviousAvailable();
    expect(avail).toBeFalse();
  });

  it('Next step not available because disabled', () => {
    component._steps[1].enabled = false;
    component._steps[2].enabled = false;
    const avail = component.isNextAvailable();
    expect(avail).toBeFalse();
  });

  it('Previous step not available because disabled', () => {
    component._activeStep = component._steps[1];
    component._steps[0].enabled = false;
    const avail = component.isPreviousAvailable();
    expect(avail).toBeFalse();
  });

  it('Skip disabled steps', () => {
    component._steps = [
      { title: of('Step1'), enabled: true },
      { title: of('Step2'), enabled: false },
      { title: of('Step3'), enabled: true },
      { title: of('Step4'), enabled: false },
      { title: of('Step5'), enabled: false },
      { title: of('Step6'), enabled: true },
    ];
    component._activeStep = component._steps[2];
    component.previous();
    expect(component._activeStep).toBe(component._steps[0]);
    component.next();
    component.next();
    expect(component._activeStep).toBe(component._steps[5]);
  });
});
