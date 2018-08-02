/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClrFlowBarStep } from '../../../../clr-addons/flow-bar';

@Component({
  selector: 'clr-flow-bar-demo',
  templateUrl: './flow-bar.demo.html',
})
export class FlowBarDemo {
  activeStep: ClrFlowBarStep;
  flowBarSteps: ClrFlowBarStep[] = [
    {
      title: 'Step',
      enabled: true,
      subSteps: [
        { title: 'Sub Step 1/3', enabled: true },
        { title: 'Sub Step 2/3', enabled: true },
        { title: 'Sub Step 3/3', enabled: true },
      ],
    },
    {
      title: 'Step',
      enabled: true,
      subSteps: [{ title: 'Sub Step 1/2', enabled: true }, { title: 'Sub Step 2/2', enabled: true }],
    },
    { title: 'Step', enabled: true },
    {
      title: 'Step',
      enabled: true,
      subSteps: [{ title: 'Sub Step 1/2', enabled: true }, { title: 'Sub Step 2/2', enabled: true }],
    },
  ];

  activeStepChanged(step: ClrFlowBarStep): void {
    this.activeStep = step;
  }
}
