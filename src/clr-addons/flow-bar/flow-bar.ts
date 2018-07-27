/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ClrFlowBarStep {
  title: string;
  enabled: boolean;
}

@Component({
  selector: 'clr-flow-bar',
  templateUrl: './flow-bar.html',
  host: {
    '[class.flow-bar]': 'true',
  },
})
export class ClrFlowBar implements OnInit {
  _activeStep: ClrFlowBarStep;

  @Input('clrSteps') _steps: ClrFlowBarStep[] = [];
  @Output('clrActiveStepChange') _activeStepChange: EventEmitter<ClrFlowBarStep> = new EventEmitter(false);

  @Input('clrActiveStep')
  get activeStep() {
    return this._activeStep;
  }

  set activeStep(step: ClrFlowBarStep) {
    this._activeStep = step;
    this._activeStepChange.emit(this._activeStep);
  }

  ngOnInit() {
    // If no active step is set as input or the active step is not enabled, select the first enabled step
    if (!this._activeStep || !this._activeStep.enabled) {
      this._activeStep = this._steps.find(step => {
        return step.enabled;
      });
    }
  }

  public previous(): void {
    if (this.isPreviousAvailable()) {
      this.activeStep = this._steps[this.getCurrentIndex() - 1];
    }
  }

  public next(): void {
    if (this.isNextAvailable()) {
      this.activeStep = this._steps[this.getCurrentIndex() + 1];
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

  public isLastStep(): boolean {
    return this.getCurrentIndex() === this._steps.length - 1;
  }

  private getCurrentIndex(): number {
    return this._steps.findIndex(value => {
      return value === this._activeStep;
    });
  }
}
