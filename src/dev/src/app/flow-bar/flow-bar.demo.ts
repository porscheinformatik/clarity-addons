/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrFlowBar, FlowBarStep } from '../../../../clr-addons/flow-bar';

@Component({
  selector: 'clr-pager-demo',
  templateUrl: './flow-bar.demo.html',
})
export class FlowBarDemo implements OnInit {
  myActiveStep: FlowBarStep;
  flowBarSteps: FlowBarStep[] = [
    { title: 'Fahrzeug', enabled: true },
    { title: 'Angebotsdetails', enabled: true },
    { title: 'Finanzierung', enabled: false },
  ];

  @ViewChild(ClrFlowBar) clrFlowBar: ClrFlowBar;

  ngOnInit(): void {
    this.myActiveStep = this.flowBarSteps[2];
  }

  public activeStepChanged(activeStep: FlowBarStep): void {
    console.log(activeStep);
  }

  previous(): void {
    this.clrFlowBar.previous();
  }

  next(): void {
    this.clrFlowBar.next();
  }
}
