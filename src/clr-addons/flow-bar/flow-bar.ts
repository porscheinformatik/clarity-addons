/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface FlowBarStep {
  title: string;
  enabled: boolean;
}

@Component({
  selector: 'clr-flow-bar',
  templateUrl: './flow-bar.html',
})
export class ClrFlowBar implements OnInit {
  @Input('clrSteps') _steps: FlowBarStep[] = [];
  @Input('clrActiveStep') _activeStep: FlowBarStep;

  @Output('clrActiveStepChanged') _activeStepChanged: EventEmitter<FlowBarStep> = new EventEmitter(false);

  ngOnInit() {
    // If no active step is set as input, select the first one
    // If the active step input is not enabled, select the first one
    if (!this._activeStep || !this._activeStep.enabled) {
      this._activeStep = this._steps[0];
    }
  }

  public previous(): void {
    if (this.isPreviousAvailable()) {
      this.setActiveStep(this._steps[this.getCurrentIndex() - 1]);
    }
  }

  public next(): void {
    if (this.isNextAvailable()) {
      this.setActiveStep(this._steps[this.getCurrentIndex() + 1]);
    }
  }

  public isPreviousAvailable(): boolean {
    const index = this.getCurrentIndex();
    return index > 0 && this._steps[index - 1].enabled;
  }

  public isNextAvailable(): boolean {
    const index = this.getCurrentIndex();
    return index < this._steps.length - 1 && this._steps[index + 1].enabled;
  }

  private setActiveStep(step: FlowBarStep): void {
    this._activeStep = step;
    this._activeStepChanged.emit(this._activeStep);
  }

  private getCurrentIndex(): number {
    return this._steps.findIndex(value => {
      return value === this._activeStep;
    });
  }
}
