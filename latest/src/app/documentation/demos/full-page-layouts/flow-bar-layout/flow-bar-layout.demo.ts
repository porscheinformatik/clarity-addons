/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChild } from "@angular/core";
import { ClrFlowBar, ClrFlowBarStep } from "@porscheinformatik/clr-addons";

@Component({
    selector: "clr-flow-bar-layout-demo",
    templateUrl: "./flow-bar-layout.demo.html"
})
export class FlowBarLayoutDemo {
    @ViewChild("flowBar") flowBar: ClrFlowBar;

    activeStep: ClrFlowBarStep;
    flowBarSteps: ClrFlowBarStep[] = [
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
        { title: "Step", enabled: true },
        {
            title: "Step", enabled: true, subSteps: [
                { title: "Sub Step 1/2", enabled: true },
                { title: "Sub Step 2/2", enabled: true }
            ]
        }
    ];

    public setActiveStep(step: ClrFlowBarStep) {
        this.activeStep = step;
    }

    public setActiveSubStep(step: ClrFlowBarStep) {
        this.flowBar.changeActiveSubStep(step);
    }
}
