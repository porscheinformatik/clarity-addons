/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChild } from "@angular/core";
import { ClrFlowBar, ClrFlowBarStep } from "@porscheinformatik/clr-addons";

interface FlowBarDemoStep extends ClrFlowBarStep {
    subSteps: ClrFlowBarStep[];
}

@Component({
    selector: "clr-flow-bar-layout-demo",
    templateUrl: "./flow-bar-layout.demo.html"
})
export class FlowBarLayoutDemo {
    @ViewChild("flowBar") flowBar: ClrFlowBar;

    activeStep: FlowBarDemoStep;
    flowBarSteps: FlowBarDemoStep[] = [
        {
            title: "Step", enabled: true, subSteps: [
                { title: "Sub Step 1/3", enabled: true },
                { title: "Sub Step 2/3", enabled: true },
                { title: "Sub Step 3/3", enabled: true }
            ]
        },
        {
            title: "Step", enabled: true, subSteps: [
                { title: "Sub Step 1/2", enabled: true },
                { title: "Sub Step 2/2", enabled: true }
            ]
        },
        { title: "Step", enabled: true, subSteps: [] },
        { title: "Step", enabled: true, subSteps: [] }
    ];
    activeSubStep: ClrFlowBarStep;

    public setActiveStep(step: FlowBarDemoStep) {
        const previousIndex = this.flowBarSteps.indexOf(this.activeStep);
        this.activeStep = step;
        if (this.activeStep.subSteps.length > 0) {
            if (previousIndex < this.flowBarSteps.indexOf(this.activeStep)) {
                this.activeSubStep = this.activeStep.subSteps[0];
            } else {
                this.activeSubStep = this.activeStep.subSteps[this.activeStep.subSteps.length - 1];
            }
        }
    }

    public openPreviousStep(): void {
        // If active step has no sub steps or first sub step is selected -> go to previous flow bar step
        if (!this.activeStep.subSteps || this.activeStep.subSteps.length === 0
            || this.activeSubStep === this.activeStep.subSteps[0]) {
            this.flowBar.previous();
        } else {
            const subStepIndex = this.activeStep.subSteps.indexOf(this.activeSubStep);
            this.activeSubStep = this.activeStep.subSteps[subStepIndex - 1];
        }
    }

    public openNextStep(): void {
        // If active step has no sub steps or last sub step is selected -> go to next flow bar step
        if (!this.activeStep.subSteps || this.activeStep.subSteps.length === 0
            || this.activeSubStep === this.activeStep.subSteps[this.activeStep.subSteps.length - 1]) {
            this.flowBar.next();
        } else {
            const subStepIndex = this.activeStep.subSteps.indexOf(this.activeSubStep);
            this.activeSubStep = this.activeStep.subSteps[subStepIndex + 1];
        }
    }

    public isPreviousAvailable(): boolean {
        if (this.activeStep) {
            if (!this.activeStep.subSteps || this.activeStep.subSteps.length === 0
                || this.activeSubStep === this.activeStep.subSteps[0]) {
                return this.flowBar.isPreviousAvailable();
            } else {
                return true;
            }
        }
    }

    public isNextAvailable(): boolean {
        if (this.activeStep) {
            if (!this.activeStep.subSteps || this.activeStep.subSteps.length === 0) {
                return this.flowBar.isNextAvailable();
            } else {
                return this.activeSubStep !== this.activeStep.subSteps[0];
            }
        }
    }
}
