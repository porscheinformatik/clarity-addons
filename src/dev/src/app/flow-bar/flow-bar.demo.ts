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
  myActiveStep: ClrFlowBarStep;
  flowBarSteps: ClrFlowBarStep[] = [
    { title: 'Fahrzeug', enabled: true },
    { title: 'Zubehör', enabled: true },
    { title: 'Angebotsdetails', enabled: true },
    { title: 'Finanzierung', enabled: true },
  ];

  activeStepChanged(step: ClrFlowBarStep): void {
    this.myActiveStep = step;
  }
}
