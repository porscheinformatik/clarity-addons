/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { ClrFlowBarStep } from '../../../../clr-addons/flow-bar';

@Component({
  selector: 'clr-flow-bar-demo',
  templateUrl: './flow-bar.demo.html',
})
export class FlowBarDemo {
  activeStep: ClrFlowBarStep;
  flowBarSteps: ClrFlowBarStep[] = [
    {
      title: of('Step'),
      enabled: true,
      subSteps: [
        { title: of('Sub Step 1/3'), enabled: true },
        { title: of('Sub Step 2/3'), enabled: true },
        { title: of('Sub Step 3/3'), enabled: true },
      ],
    },
    {
      title: of('Step'),
      enabled: true,
      subSteps: [{ title: of('Sub Step 1/2'), enabled: true }, { title: of('Sub Step 2/2'), enabled: true }],
    },
    { title: of('Step'), enabled: true },
    {
      title: of('Step'),
      enabled: true,
      subSteps: [{ title: of('Sub Step 1/2'), enabled: true }, { title: of('Sub Step 2/2'), enabled: true }],
    },
  ];

  activeStepChanged(step: ClrFlowBarStep): void {
    this.activeStep = step;
  }
}
