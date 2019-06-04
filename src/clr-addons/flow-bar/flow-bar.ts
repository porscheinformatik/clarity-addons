/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

export interface ClrFlowBarStep {
  title: Observable<string>;
  enabled: boolean;
  activeSubStep?: ClrFlowBarStep;
  subSteps?: ClrFlowBarStep[];
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
        // If sub steps exist then set the first non disabled sub step per default
        if (this.activeTabHasSubSteps()) {
          this._activeStep.activeSubStep = this._activeStep.subSteps.find(step => {
            return step.enabled;
          });
        }
        // Do async update here to avoid ExpressionChangedAfterItHasBeenCheckedError
        setTimeout(() => {
          this._activeStepChange.emit(this._activeStep);
        });
      }
    }
  }

  public changeActiveStep(step: ClrFlowBarStep): void {
    const previousIndex = this._steps.indexOf(this._activeStep);
    this._activeStep = step;
    if (this.activeTabHasSubSteps()) {
      if (previousIndex < this._steps.indexOf(this._activeStep)) {
        this._activeStep.activeSubStep = this._activeStep.subSteps[0];
      } else {
        this._activeStep.activeSubStep = this._activeStep.subSteps[this._activeStep.subSteps.length - 1];
      }
    }
    this._activeStepChange.emit(this._activeStep);
  }

  public changeActiveSubStep(subStep: ClrFlowBarStep): void {
    this._activeStep.activeSubStep = subStep;
  }

  public previous(): void {
    if (this.isPreviousAvailable()) {
      // If active step has no sub steps or first sub step is selected -> go to previous main step
      if (!this.activeTabHasSubSteps() || this.isFirstSubStep()) {
        this.changeActiveStep(this.findPreviousEnabledStep());
      } else {
        const subStepIndex = this._activeStep.subSteps.indexOf(this._activeStep.activeSubStep);
        this._activeStep.activeSubStep = this._activeStep.subSteps[subStepIndex - 1];
      }
    }
  }

  public next(): void {
    if (this.isNextAvailable()) {
      // If active step has no sub steps or last sub step is selected -> go to next main step
      if (!this.activeTabHasSubSteps() || this.isLastSubStep()) {
        this.changeActiveStep(this.findNextEnabledStep());
      } else {
        const subStepIndex = this._activeStep.subSteps.indexOf(this._activeStep.activeSubStep);
        this._activeStep.activeSubStep = this._activeStep.subSteps[subStepIndex + 1];
      }
    }
  }

  public isPreviousAvailable(): boolean {
    if (this._activeStep) {
      if (!this.activeTabHasSubSteps() || this.isFirstSubStep()) {
        const index = this.getCurrentIndex();
        return index > 0 && this.isAnyPreviousStepEnabled(index);
      } else {
        return true;
      }
    }
  }

  public isNextAvailable(): boolean {
    if (this._activeStep) {
      if (!this.activeTabHasSubSteps() || this.isLastSubStep()) {
        const index = this.getCurrentIndex();
        return index < this._steps.length - 1 && this.isAnyFollowingStepEnabled(index);
      } else {
        return true;
      }
    }
  }

  public isLastStep(): boolean {
    if (this.getCurrentIndex() === this._steps.length - 1) {
      if (this.activeTabHasSubSteps()) {
        return this.isLastSubStep();
      } else {
        return true;
      }
    }
    return false;
  }

  private getCurrentIndex(): number {
    return this._steps.findIndex(value => {
      return value === this._activeStep;
    });
  }

  // Convenience methods for easier to read code
  private activeTabHasSubSteps(): boolean {
    return this._activeStep.subSteps && this._activeStep.subSteps.length > 0;
  }

  private isFirstSubStep(): boolean {
    return this._activeStep.activeSubStep === this._activeStep.subSteps[0];
  }

  private isLastSubStep(): boolean {
    return this._activeStep.activeSubStep === this._activeStep.subSteps[this._activeStep.subSteps.length - 1];
  }

  private isAnyPreviousStepEnabled(index: number): boolean {
    return this._steps.slice(0, index).find(step => step.enabled) !== undefined;
  }

  private isAnyFollowingStepEnabled(index: number): boolean {
    return this._steps.slice(index + 1, this._steps.length).find(step => step.enabled) !== undefined;
  }

  private findPreviousEnabledStep(): ClrFlowBarStep {
    const index = this.getCurrentIndex();
    return this._steps
      .slice(0, index)
      .reverse()
      .find(step => step.enabled);
  }

  private findNextEnabledStep(): ClrFlowBarStep {
    const index = this.getCurrentIndex();
    return this._steps.slice(index + 1, this._steps.length).find(step => step.enabled);
  }
}
