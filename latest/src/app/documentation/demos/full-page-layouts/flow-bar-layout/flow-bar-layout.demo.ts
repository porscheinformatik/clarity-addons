/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChild } from "@angular/core";
import { ClrFlowBar, ClrFlowBarStep } from "@porscheinformatik/clr-addons";
import { of } from "rxjs";

@Component({
    selector: "clr-flow-bar-layout-demo",
    templateUrl: "./flow-bar-layout.demo.html"
})
export class FlowBarLayoutDemo {
    @ViewChild("flowBar") flowBar: ClrFlowBar;

    activeStep: ClrFlowBarStep;
    flowBarSteps: ClrFlowBarStep[] = [
        {
            title: of("Step"), enabled: true, subSteps: [
                { title: of("Sub Step 1/3"), enabled: true },
                { title: of("Sub Step 2/3"), enabled: true },
                { title: of("Sub Step 3/3"), enabled: true }
            ]
        },
        {
            title: of("Step"), enabled: true, subSteps: [
                { title: of("Sub Step 1/2"), enabled: true },
                { title: of("Sub Step 2/2"), enabled: true }
            ]
        },
        { title: of("Step"), enabled: true },
        {
            title: of("Step"), enabled: true, subSteps: [
                { title: of("Sub Step 1/2"), enabled: true },
                { title: of("Sub Step 2/2"), enabled: true }
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
