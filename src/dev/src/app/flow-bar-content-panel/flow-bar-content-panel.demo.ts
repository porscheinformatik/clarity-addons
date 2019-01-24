/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClrFlowBarStep } from '@porscheinformatik/clr-addons';
import { of } from 'rxjs';

@Component({
  selector: 'clr-flow-bar-content-panel-demo',
  templateUrl: './flow-bar-content-panel.demo.html',
})
export class FlowBarContentPanelDemo {
  myActiveStep: ClrFlowBarStep;
  flowBarSteps: ClrFlowBarStep[] = [
    { title: of('Fahrzeug'), enabled: true },
    { title: of('Zubehör / Dienstleistungen'), enabled: true },
    { title: of('Angebotsdetails'), enabled: true },
    { title: of('Finanzierung'), enabled: true },
    { title: of('Bestellung'), enabled: true },
  ];

  activeStepChanged(step: ClrFlowBarStep): void {
    this.myActiveStep = step;
  }
}
