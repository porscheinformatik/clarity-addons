/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClrFlowBarStep } from "@porscheinformatik/clr-addons";

@Component({
    selector: "clr-flow-bar-layout-demo",
    templateUrl: "./flow-bar-layout.demo.html"
})
export class FlowBarLayoutDemo {
    activeStep: ClrFlowBarStep;
    flowBarSteps: ClrFlowBarStep[] = [
        { title: 'Step', enabled: true },
        { title: 'Step', enabled: true },
        { title: 'Step', enabled: true },
        { title: 'Step', enabled: true }
    ];
}