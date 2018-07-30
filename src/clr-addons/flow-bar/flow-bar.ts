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
  @Input('clrSteps') _steps: ClrFlowBarStep[] = [];
  @Input('clrActiveStep') _activeStep: ClrFlowBarStep;
  @Output('clrActiveStepChange') _activeStepChange: EventEmitter<ClrFlowBarStep> = new EventEmitter(false);

  ngOnInit() {
    // If no active step is set as input or the active step is not enabled, select the first enabled step
    if (!this._activeStep || !this._activeStep.enabled) {
      this._activeStep = this._steps.find(step => {
        return step.enabled;
      });
      if (this._activeStep) {
        // Do async update here to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this._activeStepChange.emit(this._activeStep);
        });
      }
    }
  }

  public changeActiveStep(step: ClrFlowBarStep): void {
    this._activeStep = step;
    this._activeStepChange.emit(this._activeStep);
  }

  public previous(): void {
    if (this.isPreviousAvailable()) {
      this.changeActiveStep(this._steps[this.getCurrentIndex() - 1]);
    }
  }

  public next(): void {
    if (this.isNextAvailable()) {
      this.changeActiveStep(this._steps[this.getCurrentIndex() + 1]);
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
