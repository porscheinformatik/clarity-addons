/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const CODE_EXAMPLE = `
<clr-main-container>
    <clr-demo-menu></clr-demo-menu>
    <div class="content-header">
        <h2>Flow Bar Layout with sticky footer</h2>
        <clr-button-group class="command-bar" [clrMenuPosition]="'bottom-right'">
            <clr-button (click)="contentPanel.toggle()">Show/Hide Right</clr-button>
            <clr-button [clrInMenu]="true">Command1</clr-button>
        </clr-button-group>
    </div>
    <clr-flow-bar #flowBar [clrSteps]="flowBarSteps" [(clrActiveStep)]="activeStep"></clr-flow-bar>
    <clr-content-panel-container>
        <clr-content-panel-container-content>
            <h3>Content Area Title</h3>
            <p *ngFor="let a of [1, 2, 3, 4, 5, 6, 7, 8]">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam
                erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                gubergren,
                no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                sadipscing
                elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus
                est
                Lorem ipsum dolor sit amet.
            </p>
        </clr-content-panel-container-content>
        <clr-content-panel-container-footer>
            <button type="button" class="btn btn-outline-primary" (click)="flowBar.previous()"
                    *ngIf="flowBar.isPreviousAvailable()">Previous
            </button>
            <button type="button" class="btn btn-primary" (click)="flowBar.next()"
                    [disabled]="!flowBar.isNextAvailable()" *ngIf="!flowBar.isLastStep()">Next
            </button>
            <button type="button" class="btn btn-success" *ngIf="flowBar.isLastStep()">Finish</button>
        </clr-content-panel-container-footer>
        <clr-content-panel #contentPanel>
            <ng-container clr-content-panel-title>Right Content Panel</ng-container>
            <ng-container clr-content-panel-content>Content</ng-container>
        </clr-content-panel>
    </clr-content-panel-container>
</clr-main-container>
`;

@Component({
    selector: "clr-flow-bar-layout-demo",
    templateUrl: "./flow-bar-layout.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class FlowBarLayoutDemo extends ClarityDocComponent {
    codeExample = CODE_EXAMPLE;


    constructor() {
        super("flow-bar-layout");
    }
}
