/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { ClarityIcons, displayIcon } from '@cds/core/icon';
import { share } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

ClarityIcons.addIcons(displayIcon);

const BASEPAGE_CODE_EXAMPLE = `
<clr-main-container>
    <clr-demo-menu></clr-demo-menu>

    <div class="content-header">
        <clr-back-button></clr-back-button>
        <h2>Base Pagelayout</h2>
        <clr-button-group class="command-bar" [clrMenuPosition]="'bottom-right'">
            <clr-button>Command1</clr-button>
            <clr-button>Command2</clr-button>
            <clr-button [clrInMenu]="true">Command3</clr-button>
        </clr-button-group>
    </div>
    <div class="content-container">
        <div class="content-area">
            This is the page content
        </div>
    </div>
</clr-main-container>
`;

const BUTTON_ORDER_EXAMPLE = `
<history button> <custom page specific buttons> <action-panel-button>
`;

const BASEPAGE_ROUTING_CODE_EXAMPLE = `
<clr-main-container>
    <clr-demo-menu></clr-demo-menu>

    <router-outlet></router-outlet>
</clr-main-container>
`;

const BASEPAGE_ROUTING_PAGE_CODE_EXAMPLE = `
<div class="content-header">
    <clr-back-button></clr-back-button>
    <h2>Base Pagelayout</h2>
    <clr-button-group class="command-bar" [clrMenuPosition]="'bottom-right'">
        <clr-button>Command1</clr-button>
        <clr-button>Command2</clr-button>
        <clr-button [clrInMenu]="true">Command3</clr-button>
    </clr-button-group>
</div>
<div class="content-container">
    <div class="content-area">
        This is the page content
    </div>
</div>
`;

const BASEPAGE_ROUTING_PAGE_TS_CODE_EXAMPLE = `
@HostBinding('class.u-main-container') bindMainContainer = true;
`;

const FLOWBAR_CODE_EXAMPLE = `
<clr-main-container>
    <clr-demo-menu></clr-demo-menu>
    <div class="content-header">
        <h2>Flow Bar Layout with sticky footer</h2>
        <clr-button-group class="command-bar" [clrMenuPosition]="'bottom-right'">
            <clr-button (click)="contentPanel.toggle()">Show/Hide Right</clr-button>
            <clr-button [clrInMenu]="true">Command1</clr-button>
        </clr-button-group>
    </div>
    <clr-flow-bar #flowBar [clrSteps]="flowBarSteps" [clrActiveStep]="activeStep"
                  (clrActiveStepChange)="setActiveStep($event)"></clr-flow-bar>
    <clr-content-panel-container>
        <clr-content-panel-container-content>
            <h3 *ngIf="!activeStep?.subSteps || activeStep?.subSteps?.length === 0">{{activeStep?.title}}
                {{flowBarSteps.indexOf(activeStep) + 1}}</h3>
            <h3 *ngIf="activeStep?.subSteps && activeStep?.subSteps?.length > 0">
                {{activeStep?.title}} {{flowBarSteps.indexOf(activeStep) + 1}} - {{activeStep.activeSubStep?.title}}
            </h3>
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
            <div class="clr-row clr-flex-fill clr-justify-content-between clr-align-items-center">
                <div class="clr-col">
                    Current Step Info
                </div>
                <div class="clr-col-auto">
                    <button type="button" class="btn btn-link" (click)="flowBar.previous()"
                            *ngIf="flowBar.isPreviousAvailable()">Previous
                    </button>
                    <clr-dropdown *ngIf="activeStep?.subSteps?.length > 0">
                        <button type="button" class="btn btn-outline-primary" clrDropdownTrigger>
                            {{activeStep.activeSubStep?.title}}
                            <cds-icon shape="angle" direction="down"></cds-icon>
                        </button>
                        <clr-dropdown-menu clrPosition="top-left" *clrIfOpen>
                            <button class="btn" clrDropdownItem *ngFor="let subStep of activeStep?.subSteps"
                                    (click)="setActiveSubStep(subStep)">
                                {{subStep.title}}
                            </button>
                        </clr-dropdown-menu>
                    </clr-dropdown>
                    <button type="button" class="btn btn-primary" (click)="flowBar.next()"
                            [disabled]="!flowBar.isNextAvailable()" *ngIf="!flowBar.isLastStep()">Next
                    </button>
                    <button type="button" class="btn btn-success" *ngIf="flowBar.isLastStep()">Finish</button>
                </div>
            </div>
        </clr-content-panel-container-footer>
        <clr-content-panel #contentPanel>
            <ng-container clr-content-panel-title>Right Content Panel</ng-container>
            <ng-container clr-content-panel-content>Content</ng-container>
        </clr-content-panel>
    </clr-content-panel-container>
</clr-main-container>
`;

const FLOWBAR_HTML_EXAMPLE_SUBMIT_ENTER = `
<form ... (submit)="flowBar.next()">
    ...
    <input type="submit" style="display: none"> <!-- Not needed, if you already have a submit button-->
</form>
`;

const STICKYFOOTER_CODE_EXAMPLE = `
<clr-main-container>
    <clr-demo-menu></clr-demo-menu>
    <div class="content-header">
        <h2>Sticky Footer Layout</h2>
    </div>
    <div class="content-container clr-flex-column">
        <div class="content-area">
            <h3>Content Area</h3>
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
        </div>
        <div class="content-area-footer">
            Sticky Footer
        </div>
    </div>
</clr-main-container>
`;

const FULLSCREENDIALOG_HTML_EXAMPLE = `
<!-- This is the router outlet for full screen dialogs -->
<router-outlet name="overlay" (activate)="overlayActive = true" (deactivate)="overlayActive = false"></router-outlet>

<!-- This is the default router outlet for all of your default pages -->
<div [hidden]="overlayActive">
    <router-outlet></router-outlet>
</div>
`;

const ACTION_PANEL_EXAMPLE = `
  <clr-action-panel-container>
    <clr-action-panel-container-content>
      <h1>Action Panel example</h1>
    </clr-action-panel-container-content>
    <clr-action-panel #actionPanel>
      <ng-container clr-action-panel-content>
        <h1>Heading 1</h1>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h2>Heading 2</h2>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
      </ng-container>
    </clr-action-panel>
  </clr-action-panel-container>
`;

const ACTION_PANEL_TOGGLE_EXAMPLE = `
 @ViewChild('actionPanel')
 actionPanel: ClrActionPanel;

  private toggleActionPanel() {
    this.actionPanel.toggle();
  }
`;

const HTML_EXAMPLE_AP = `
  <clr-action-panel-container>
    <clr-action-panel-container-content>
      <h1>Heading 1</h1>
      <p>
        Lorem ipsum <b>dolor sit amet</b>, consetetur sadipscing <i>elitr</i>, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. <br />
      </p>
    </clr-action-panel-container-content>
    <clr-action-panel>
      <ng-container clr-action-panel-title>Title2</ng-container>
      <ng-container clr-action-panel-content>
        <h1>Heading 1</h1>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h2>Heading 2</h2>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h3>Heading 3</h3>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h4>Heading 4</h4>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h5>Heading 5</h5>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
      </ng-container>
    </clr-action-panel>
  </clr-action-panel-container>
`;

const HTML_EXAMPLE_CP = `
 <clr-content-panel-container>
  <clr-content-panel-container-content>
    <h1>Heading 1</h1>
    <p>
      Lorem ipsum <b>dolor sit amet</b>, consetetur sadipscing <i>elitr</i>, sed diam nonumy eirmod tempor invidunt ut
      labore et dolore magna aliquyam erat, sed diam voluptua. <br /><sub
        >At vero eos et accusam et justo duo dolores et ea rebum.</sub
      >
    </p>
  </clr-content-panel-container-content>
  <clr-content-panel-container-footer> This is a footer </clr-content-panel-container-footer>
  <clr-content-panel>
    <ng-container clr-content-panel-title>Title2</ng-container>
    <ng-container clr-content-panel-content>
      <h1>Heading 1</h1>
      <p>Lorem <b>ipsum</b> dolor sit amet.</p>
      <h2>Heading 2</h2>
      <p>Lorem <b>ipsum</b> dolor sit amet.</p>
      <h3>Heading 3</h3>
      <p>Lorem <b>ipsum</b> dolor sit amet.</p>
      <h4>Heading 4</h4>
      <p>Lorem <b>ipsum</b> dolor sit amet.</p>
      <h5>Heading 5</h5>
      <p>Lorem <b>ipsum</b> dolor sit amet.</p>
    </ng-container>
  </clr-content-panel>
</clr-content-panel-container>
`;

@Component({
  selector: 'clr-page-layouts-demo-docu',
  templateUrl: './page-layouts.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class PageLayoutsDemo extends ClarityDocComponent {
  basePageCodeExample = BASEPAGE_CODE_EXAMPLE;
  basePageRoutingCodeExample = BASEPAGE_ROUTING_CODE_EXAMPLE;
  basePageRoutingPageCodeExample = BASEPAGE_ROUTING_PAGE_CODE_EXAMPLE;
  basePageRoutingPageTSCodeExample = BASEPAGE_ROUTING_PAGE_TS_CODE_EXAMPLE;
  flowbarCodeExample = FLOWBAR_CODE_EXAMPLE;
  flowbarHtmlExampleSubmitEnter = FLOWBAR_HTML_EXAMPLE_SUBMIT_ENTER;
  stickyFooterCodeExample = STICKYFOOTER_CODE_EXAMPLE;
  fullScreenDialogHtmlExample = FULLSCREENDIALOG_HTML_EXAMPLE;
  buttonCodeOrderExample = BUTTON_ORDER_EXAMPLE;
  actionPanelExample = ACTION_PANEL_EXAMPLE;
  actionPanelToggleExample = ACTION_PANEL_TOGGLE_EXAMPLE;
  activeFragment;
  htmlExampleActionPanel = HTML_EXAMPLE_AP;
  htmlExampleContentPanel = HTML_EXAMPLE_CP;

  constructor(public route: ActivatedRoute) {
    super('page-layouts');
    this.activeFragment = this.route.fragment.pipe(share());
  }
}
