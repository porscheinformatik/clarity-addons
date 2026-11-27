import{n as P,r as ie,t as O}from"./chunk-agnf9ZDH.js";import{$n as T,Ba as j$1,Bn as Rhe,Cr as VB,Er as Vp,Ho as pr,Jn as SB,Ls as vs,Ms as v,O as B,Oa as hae,Pa as ie$1,Pt as K$1,Uo as q,Zt as Lp,ai as Zo,b as A,d as $$1,dn as O$1,ds as t3e,ea as ee,ec as y,fs as tA,ji as br,l as _e,lo as me,mr as Ud,rt as F6e,s as O$2,sa as f,ws as u}from"./main-MZS5HDZR.js";me.addIcons(t3e);var N=`
<clr-main-container>
    <clr-demo-menu></clr-demo-menu>

    <div class="content-header">
        <clr-back-button></clr-back-button>
        <h2>Base Page Layout</h2>
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
`;var U=`
<history button> <custom page specific buttons> <action-panel-button>
`;var G=`
<clr-main-container>
    <clr-demo-menu></clr-demo-menu>

    <router-outlet></router-outlet>
</clr-main-container>
`;var X=`
<div class="content-header">
    <clr-back-button></clr-back-button>
    <h2>Base Page Layout</h2>
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
`;var j=`
@HostBinding('class.u-main-container') bindMainContainer = true;
`;var W=`
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
`;var Y=`
<form ... (submit)="flowBar.next()">
    ...
    <input type="submit" style="display: none"> <!-- Not needed, if you already have a submit button-->
</form>
`;var V=`
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
`;var z=`
<!-- This is the router outlet for full screen dialogs -->
<router-outlet name="overlay" (activate)="overlayActive = true" (deactivate)="overlayActive = false"></router-outlet>

<!-- This is the default router outlet for all of your default pages -->
<div [hidden]="overlayActive">
    <router-outlet></router-outlet>
</div>
`;var J=`
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
`;var K=`
 @ViewChild('actionPanel')
 actionPanel: ClrActionPanel;

  private toggleActionPanel() {
    this.actionPanel.toggle();
  }
`;var Z=`
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
`;var $=`
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
`;var S=(()=>{class r extends P{route;basePageCodeExample=N;basePageRoutingCodeExample=G;basePageRoutingPageCodeExample=X;basePageRoutingPageTSCodeExample=j;flowbarCodeExample=W;flowbarHtmlExampleSubmitEnter=Y;stickyFooterCodeExample=V;fullScreenDialogHtmlExample=z;buttonCodeOrderExample=U;actionPanelExample=J;actionPanelToggleExample=K;activeFragment;htmlExampleActionPanel=Z;htmlExampleContentPanel=$;constructor(u){super(`page-layouts`),this.route=u,this.activeFragment=this.route.fragment.pipe(Zo())}static ɵfac=function(d){return new(d||r)(u(br))};static ɵcmp=O$1({type:r,selectors:[[`clr-page-layouts-demo-docu`]],hostVars:4,hostBindings:function(d,a){d&2&&T(`content-area`,!0)(`dox-content-panel`,!0)},features:[ee],decls:450,vars:45,consts:[[3,`title`,`showTabs`],[1,`table-of-contents`],[1,`title`],[1,`list-unstyled`,`toc-list`],[`routerLink`,`.`,`fragment`,`base-layout`],[`routerLink`,`.`,`fragment`,`flow-layout`],[`routerLink`,`.`,`fragment`,`sidebar-layout`],[`routerLink`,`.`,`fragment`,`sticky-footer`],[`routerLink`,`.`,`fragment`,`full-screen`],[`routerLink`,`.`,`fragment`,`action-panel`],[`routerLink`,`.`,`fragment`,`content-panel`],[`id`,`generic-pager-header`,1,`component-summary`],[`href`,`full-page-layouts/basepage-layout-command`,`target`,`_blank`],[1,`btn`,`btn-outline`],[`shape`,`display`],[`id`,`base-layout`],[1,`list`],[1,`clr-code`],[`src`,`assets/images/documentation/command-bar.png`,`width`,`500px`,`alt`,`Command Bar`],[3,`clrCode`],[`clrLanguage`,`typescript`,3,`clrCode`],[`id`,`code-examples`],[`id`,`examples`],[`routerLink`,`/full-page-layouts/basepage-layout`,`routerLinkActive`,`active`],[1,`nav-text`],[`routerLink`,`/full-page-layouts/basepage-layout-command`,`routerLinkActive`,`active`],[`routerLink`,`/full-page-layouts/action-panel`,`routerLinkActive`,`active`],[`id`,`flow-layout`],[1,`component-summary`],[`id`,`design-guidelines`],[`routerLink`,`/full-page-layouts/flow-bar`,`routerLinkActive`,`active`],[`id`,`sidebar-layout`],[`routerLink`,`/full-page-layouts/sidebarpage-layout`,`routerLinkActive`,`active`],[`id`,`sticky-footer`],[1,`clr-row`],[1,`clr-col-md-12`,`clr-col-lg-6`],[1,`clrweb-DoxMedia`,`is-do-block`],[1,`clrweb-DoxMedia-block`],[1,`clrweb-DoxMedia-img`],[`src`,`assets/images/documentation/do.png`,`alt`,`do`],[1,`clrweb-DoxMedia-text`],[1,`clrweb-DoxMedia-do-dont`],[1,`clrweb-DoxMedia`,`is-dont-block`],[`src`,`assets/images/documentation/dont.png`,`alt`,`dont`],[`routerLink`,`/full-page-layouts/sticky-footer`,`routerLinkActive`,`active`],[`id`,`full-screen`],[`id`,`action-panel`],[3,`clrMenuPosition`],[`shape`,`view-columns`],[`id`,`content-panel`],[`routerLink`,`/full-page-layouts/content-panel`,`routerLinkActive`,`active`]],template:function(d,a){d&1&&(y(0,`clr-doc-wrapper`,0)(1,`div`,1)(2,`span`,2),ie$1(3,`Content`),v(),y(4,`ul`,3)(5,`li`)(6,`a`,4),pr(7,`async`),pr(8,`async`),ie$1(9,`Base Page Layout`),v()(),y(10,`li`)(11,`a`,5),pr(12,`async`),ie$1(13,`Flow Bar Layout`),v()(),y(14,`li`)(15,`a`,6),pr(16,`async`),ie$1(17,`Sidebar Page Layout`),v()(),y(18,`li`)(19,`a`,7),pr(20,`async`),ie$1(21,`Sticky Footer Layout`),v()(),y(22,`li`)(23,`a`,8),pr(24,`async`),ie$1(25,`Full Screen Dialog`),v()(),y(26,`li`)(27,`a`,9),pr(28,`async`),ie$1(29,`Action Panel`),v()(),y(30,`li`)(31,`a`,10),pr(32,`async`),ie$1(33,`Content Panel`),v()()()(),y(34,`article`)(35,`h5`,11),ie$1(36,` All pages in an application should follow a common layout structure to ensure a consistent user experience across applications. `),v(),y(37,`a`,12)(38,`button`,13),j$1(39,`cds-icon`,14),ie$1(40,`\xA0 Demo application`),v()(),y(41,`h2`,15),ie$1(42,`Base Page Layout`),v(),y(43,`h5`,11),ie$1(44,` The Base Page Layout provides the most fundamental navigation and content elements. `),v(),y(45,`div`)(46,`p`),ie$1(47,`The Base Page Layout includes the following components:`),v(),y(48,`ul`,16)(49,`li`),ie$1(50,`Main Navigation`),v(),y(51,`li`),ie$1(52,`Pagetitle`),v(),y(53,`li`),ie$1(54,`Content Area`),v()(),y(55,`p`)(56,`code`,17),ie$1(57,`ATTENTION!`),v(),ie$1(58,` Following DOM structure is vital for a correctly working page layout. They MUST be DIRECT children of each other! `),v(),y(59,`ul`)(60,`li`),ie$1(61,` .main-container or .u-main-container `),y(62,`ul`)(63,`li`),ie$1(64,`.content-header`),v(),y(65,`li`),ie$1(66,`flowbar (optional)`),v(),y(67,`li`),ie$1(68,` .content-container `),y(69,`ul`)(70,`li`),ie$1(71,`.content-area`),v(),y(72,`li`),ie$1(73,`vertical nav (optional)`),v(),y(74,`li`),ie$1(75,`.content-area-footer (optional)`),v()()()()()(),y(76,`p`),ie$1(77,`Further components may complete the page layout as needed:`),v(),y(78,`ul`,16)(79,`li`),ie$1(80,`Back Button`),v(),y(81,`li`),ie$1(82,`Command bar`),v(),y(83,`li`),ie$1(84,`Sidebar`),v(),y(85,`li`),ie$1(86,`Content-Panel`),v(),y(87,`li`),ie$1(88,`Action-Panel`),v()(),y(89,`h4`),ie$1(90,`Command Bar`),v(),y(91,`ul`,16)(92,`li`),ie$1(93,`The Command Bar comprises the most common users tasks.`),v(),y(94,`li`),ie$1(95,`The most important ones are shown, additional ones are accessible in an overflow-menu.`),v(),y(96,`li`),ie$1(97,` Other commands, either less common ones or where the proximity to an ui element is crucial, are provided within the content area. `),v(),y(98,`li`),ie$1(99,`Consistent button order in command-bar:`),v(),y(100,`ul`)(101,`li`),ie$1(102,`The history-button is the left-most button, followed by`),v(),y(103,`li`),ie$1(104,`Action Buttons, and`),v(),y(105,`li`),ie$1(106,`Optional: the action-panel-button is the right-most button in the command-bar`),v()(),j$1(107,`img`,18),v(),y(108,`h4`),ie$1(109,`Action Panel`),v(),y(110,`ul`,16)(111,`li`),ie$1(112,`Use when lot of actions are required`),v(),y(113,`li`),ie$1(114,`Group similar actions using Captions and Spacer.`),v(),y(115,`li`),ie$1(116,`Don't use when only a few actions are required, consider using Command bar then.`),v()(),y(117,`p`),ie$1(118,`Following example shows how to use the action panel.`),v(),j$1(119,`clr-code-snippet`,19),y(120,`p`),ie$1(121,` Add a button to show/hide the action panel. This can be done by calling the toggle method of the action panel component. `),v(),j$1(122,`clr-code-snippet`,20),v(),y(123,`div`,21)(124,`h3`,22),ie$1(125,`Code & Examples`),v(),y(126,`h4`),ie$1(127,`Demo`),v(),y(128,`div`),j$1(129,`cds-icon`,14),ie$1(130,`\xA0 `),y(131,`a`,23)(132,`span`,24),ie$1(133,`Base Page Layout`),v()()(),y(134,`div`),j$1(135,`cds-icon`,14),ie$1(136,`\xA0 `),y(137,`a`,25)(138,`span`,24),ie$1(139,`Command bar`),v()()(),y(140,`div`),j$1(141,`cds-icon`,14),ie$1(142,`\xA0 `),y(143,`a`,26)(144,`span`,24),ie$1(145,`Action panel`),v()()(),y(146,`p`),ie$1(147,` Following example shows a base page layout without multiple pages. If you have different pages (different header, ...) with routing see next example. `),v(),j$1(148,`clr-code-snippet`,19),y(149,`p`),ie$1(150,` To ensure a correct page layout when whole pages are inside a route you need to put .u-main-container on those pages which contain the layout `),v(),ie$1(151,` app.component.html `),j$1(152,`clr-code-snippet`,19),ie$1(153,` page.component.html `),j$1(154,`clr-code-snippet`,19),ie$1(155,` page.component.ts `),j$1(156,`clr-code-snippet`,20),v(),y(157,`h2`,27),ie$1(158,`Flow Bar Layout`),v(),y(159,`h5`,28),ie$1(160,` The Flow Bar Layout extends the Base Page Layout by adding a wizard-like navigation control. `),v(),y(161,`p`),ie$1(162,` This layout that can be used to highlight the current progress a user is making throughout multiple steps. The Flow Bar allows the user to navigate between steps, by either clicking on a specific step or using the previous or next button. `),v(),y(163,`p`),ie$1(164,` The Flow Bar Layout requires the `),y(165,`code`,17),ie$1(166,`ClrFlowBar`),v(),ie$1(167,` and can optionally also contain the Sticky Footer Layout. `),v(),y(168,`div`,29)(169,`h3`),ie$1(170,`Usage`),v(),y(171,`p`),ie$1(172,` Use this layout if you want to guide the user through a sequence of multiple steps. Each step requires the user to perform a complex task like filling out a form. Don't use this layout if the user's steps are mutually exclusive; in this case use Tabs instead. `),v(),y(173,`p`),ie$1(174,` When implementing a flow bar on your page, you will need to insert a `),y(175,`code`,17),ie$1(176,`clr-flow-bar`),v(),ie$1(177,` right below your content-header but above your content-container. `),v(),y(178,`p`),ie$1(179,`Following inputs & outputs are available:`),v(),y(180,`ul`)(181,`li`)(182,`code`,17),ie$1(183,`[clrSteps]`),v(),ie$1(184,` - an array of `),y(185,`code`,17),ie$1(186,`FlowBarStep`),v(),ie$1(187,`. You can extend/implement this interface to save even more information in your steps. `),v(),y(188,`li`)(189,`code`,17),ie$1(190,`[(clrActiveStep)]`),v(),ie$1(191,` two way binding of the active step.`),v()(),y(192,`p`),ie$1(193,` You can use the `),y(194,`code`,17),ie$1(195,`@ViewChild()`),v(),ie$1(196,` annotation to get a reference of your `),y(197,`code`,17),ie$1(198,`ClrFlowBar`),v(),ie$1(199,`, which will allow you to call its methods: `),v(),y(200,`ul`)(201,`li`)(202,`code`,17),ie$1(203,`previous()`),v(),ie$1(204,` - open the previous step.`),v(),y(205,`li`)(206,`code`,17),ie$1(207,`next()`),v(),ie$1(208,` - opens the next step.`),v(),y(209,`li`)(210,`code`,17),ie$1(211,`isPreviousAvailable()`),v(),ie$1(212,` - returns true if the previous step can be opened.`),v(),y(213,`li`)(214,`code`,17),ie$1(215,`isNextAvailable()`),v(),ie$1(216,` - returns true if the next step can be opened.`),v(),y(217,`li`)(218,`code`,17),ie$1(219,`isLastStep()`),v(),ie$1(220,` - returns true if the current step is the last.`),v()()(),y(221,`div`,21)(222,`h3`,22),ie$1(223,`Code & Examples`),v(),y(224,`h4`),ie$1(225,`Demo`),v(),y(226,`a`,30),j$1(227,`cds-icon`,14),y(228,`span`),ie$1(229,`Base Page Layout with a Flow Bar`),v()(),j$1(230,`clr-code-snippet`,19),y(231,`h4`),ie$1(232,`Submit form on enter and go to next page`),v(),y(233,`p`),ie$1(234,` As the next button is outside your form, following steps need to be done to go to next page after submitting the form with 'enter' `),v(),y(235,`ul`)(236,`li`),ie$1(237,` Add hidden submit button to your form to activate 'enter' key handling in browser (only needed if you not already have one) `),v(),y(238,`li`),ie$1(239,`React to submit of form and call next() on the flowbar`),v()(),j$1(240,`clr-code-snippet`,19),v(),y(241,`h2`,31),ie$1(242,`Sidebar Page Layout`),v(),y(243,`h5`,11),ie$1(244,` The Sidebar Page Layout enhances the Base Page Layout with a vertical navigation sidebar. `),v(),y(245,`div`,29)(246,`h3`),ie$1(247,`Design Guidelines`),v(),y(248,`p`),ie$1(249,`The Sidebar Page Layout includes the following components:`),v(),y(250,`ul`,16)(251,`li`),ie$1(252,`Main Navigation`),v(),y(253,`li`),ie$1(254,`Pagetitle`),v(),y(255,`li`),ie$1(256,`Content Area`),v(),y(257,`li`),ie$1(258,`Vertical Nav (Sidebar)`),v(),y(259,`li`)(260,`strong`),ie$1(261,`Optional: Summary Area`),v(),ie$1(262,` (panel between header and content for key information and quick actions) `),v()(),y(263,`p`)(264,`strong`),ie$1(265,`Summary Area Extension:`),v(),ie$1(266,` The Sidebar Page Layout can be extended with a `),y(267,`strong`),ie$1(268,`Summary Area`),v(),ie$1(269,` panel, which appears between the page header and the main content. This area is ideal for displaying key information and quick actions at a glance, such as label-value pairs, icons, actions, and status indicators. The summary area is especially useful when users need to see important status, identifiers, or actions without scrolling, or when a summary should always be visible across multiple sections or tabs. It can also provide quick actions (copy, edit, navigate) for summary items and supports a collapsible state for more compact layouts. `),v(),y(270,`p`),ie$1(271,`Use the Summary Area when:`),v(),y(272,`ul`,16)(273,`li`),ie$1(274,`You want to provide a quick summary of key data at the top of the page.`),v(),y(275,`li`),ie$1(276,`Users need to see important status, identifiers, or actions without scrolling.`),v(),y(277,`li`),ie$1(278,`There are multiple sections/tabs and a summary should always be visible.`),v(),y(279,`li`),ie$1(280,`You want to provide quick actions for summary items.`),v()(),y(281,`p`),ie$1(282,`Do not use the Summary Area when:`),v(),y(283,`ul`,16)(284,`li`),ie$1(285,`The page has only a single, simple form or content area.`),v(),y(286,`li`),ie$1(287,`There is no meaningful summary or key data to display.`),v(),y(288,`li`),ie$1(289,`The summary would duplicate all content from the main area.`),v()(),y(290,`p`),ie$1(291,`Further components may complete the page layout as needed:`),v(),y(292,`ul`,16)(293,`li`),ie$1(294,`Command Bar`),v(),y(295,`li`),ie$1(296,`Back Button`),v(),y(297,`li`),ie$1(298,`Collapsible Summary Area`),v()(),y(299,`h3`),ie$1(300,`Use when`),v(),y(301,`p`),ie$1(302,`Use the Sidebar Page Layout when you have:`),v(),y(303,`ul`,16)(304,`li`),ie$1(305,`Lots of content on one page, that can be junked in logical separated pages`),v(),y(306,`li`),ie$1(307,`If you need a summary or overview-page, this should be the first element in the sidebar`),v()()(),y(308,`div`,21)(309,`h3`,22),ie$1(310,`Code & Examples`),v(),y(311,`h4`),ie$1(312,`Demo`),v(),j$1(313,`cds-icon`,14),ie$1(314,`\xA0`),y(315,`a`,32)(316,`span`,24),ie$1(317,`Sidebar Page Layout`),v()()(),y(318,`h2`,33),ie$1(319,`Sticky Footer Layout`),v(),y(320,`h5`,28),ie$1(321,` The Sticky footer represents a bar at the bottom of your page which is always visible - scrollable content is hidden behind the sticky footer. `),v(),y(322,`p`),ie$1(323,` The Sticky footer can be used for e.g. providing navigational buttons for a wizard (See also Flow Bar Layout). `),v(),y(324,`div`,29)(325,`h3`),ie$1(326,`Usage`),v(),y(327,`p`),ie$1(328,` Use this component when you want to display permanently visible elements on the bottom of a page. It works particularly well in combination with the Flow Bar Layout to provide navigational controls. When the Sticky Footer contains buttons for navigation, keep in mind to place them on the right hand side to follow a logical Z Pattern. `),v(),y(329,`div`,34)(330,`div`,35)(331,`div`,36)(332,`div`,37)(333,`div`,38),j$1(334,`img`,39),v()(),y(335,`div`,40)(336,`h6`,41),ie$1(337,`Do`),v(),y(338,`p`),ie$1(339,` Place buttons leading to next step on the right. Optional information about the user's actions are placed on the left side. `),v()()()(),y(340,`div`,35)(341,`div`,42)(342,`div`,37)(343,`div`,38),j$1(344,`img`,43),v()(),y(345,`div`,40)(346,`h6`,41),ie$1(347,`Don't`),v(),y(348,`p`),ie$1(349,`Don't put navigational buttons on the left side.`),v()()()()(),y(350,`p`),ie$1(351,` When implementing a sticky footer on your page, you will want to insert a div with class `),y(352,`code`,17),ie$1(353,`content-area-footer`),v(),ie$1(354,` right below your `),y(355,`code`,17),ie$1(356,`content-area`),v(),ie$1(357,` div. This can be combined with a content panel layout, see the code example of the flow bar layout for more information. `),v()(),y(358,`div`,21)(359,`h3`,22),ie$1(360,`Code & Examples`),v(),y(361,`h4`),ie$1(362,`Demo`),v(),y(363,`a`,44),j$1(364,`cds-icon`,14),y(365,`span`),ie$1(366,`Base Page Layout with a Sticky Footer`),v()(),j$1(367,`clr-code-snippet`,19),v(),y(368,`h2`,45),ie$1(369,`Full Screen Dialog`),v(),y(370,`h5`,11),ie$1(371,` The Full Screen Dialog is an alternative to the default modal dialog. `),v(),y(372,`p`),ie$1(373,` The Full Screen Dialog looks and feels like any other page though it is conceptually a modal dialog. This means that a full screen dialog can have any page layout. From a technical point of view, full screen dialogs are shown in a router outlet above the current page. This eliminates the loading time which usually occurs while navigating from page to page. `),v(),y(374,`div`,29)(375,`h3`),ie$1(376,`Design Guidelines`),v(),y(377,`p`),ie$1(378,` A Full Screen Dialog usually contains mutliple input elements and `),y(379,`strong`),ie$1(380,`Save`),v(),ie$1(381,` and `),y(382,`strong`),ie$1(383,`Cancel`),v(),ie$1(384,` options. Place these call to action buttons on the left side of the bottom of the page. Just like you would in a regular form. Optionally the dialog can also have a Back-button. Provide a confirmation prompt if the user has already entered data and Back was selected. Note that this prompt is not required for the Cancel-button, since the user deliberately choose Cancel to discard the input. `),v(),y(385,`h3`),ie$1(386,`Use when`),v(),y(387,`p`),ie$1(388,`Use the Full Screen Dialog if:`),v(),y(389,`ul`,16)(390,`li`),ie$1(391,` You want to display a complex input form that requires `),y(392,`strong`),ie$1(393,`Save`),v(),ie$1(394,` and `),y(395,`strong`),ie$1(396,`Cancel`),v(),ie$1(397,` options `),v(),y(398,`li`),ie$1(399,` You need to show additional modal dialogs. In general you should not show another modal over a modal, but you can open a modal over a Full Screen Dialog. `),v(),y(400,`li`),ie$1(401,` The dialog's content would require too much scrolling in a modal dialog. Try to avoid scrolling in modal dialogs. `),v()()(),y(402,`div`,21)(403,`h3`,22),ie$1(404,`Code`),v(),j$1(405,`clr-code-snippet`,19),v(),y(406,`h2`,46),ie$1(407,`Action Panel`),v(),y(408,`h5`,28),ie$1(409,`Action panel is used if a lot of actions are required on one side.`),v(),y(410,`h3`),ie$1(411,`Best Practices`),v(),y(412,`ul`,16)(413,`li`),ie$1(414,`Use when lot of actions are required.`),v(),y(415,`li`),ie$1(416,`Group similar actions using Captions and Spacer.`),v(),y(417,`li`),ie$1(418,`Don’t use when only a few actions are required, consider using Command bar then.`),v()(),ie$1(419,` Provide a `),y(420,`clr-button-group`,47)(421,`clr-button`),j$1(422,`cds-icon`,48),v()(),ie$1(423,` button which handles the show/hide (toggle) of the panel. `),y(424,`div`,21)(425,`h3`,22),ie$1(426,`Code & Examples`),v(),y(427,`div`),ie$1(428,` For an example usage follow the link: `),j$1(429,`cds-icon`,14),ie$1(430,`\xA0 `),y(431,`a`,26)(432,`span`,24),ie$1(433,`Action panel`),v()()(),j$1(434,`clr-code-snippet`,19),v(),y(435,`h2`,49),ie$1(436,`Content Panel`),v(),y(437,`h5`,28),ie$1(438,`Content panel is used if some text/action should be placed in a right panel.`),v(),y(439,`div`,21)(440,`h3`,22),ie$1(441,`Code & Examples`),v(),y(442,`div`),ie$1(443,` For an example usage follow the link: `),j$1(444,`cds-icon`,14),ie$1(445,`\xA0 `),y(446,`a`,50)(447,`span`,24),ie$1(448,`Content panel`),v()()(),j$1(449,`clr-code-snippet`,19),v()()()),d&2&&(A(`title`,a.title)(`showTabs`,!1),f(6),T(`active`,vs(7,29,a.activeFragment)===`base-layout`||vs(8,31,a.activeFragment)===null),f(5),T(`active`,vs(12,33,a.activeFragment)===`flow-layout`),f(4),T(`active`,vs(16,35,a.activeFragment)===`sidebar-layout`),f(4),T(`active`,vs(20,37,a.activeFragment)===`sticky-footer`),f(4),T(`active`,vs(24,39,a.activeFragment)===`full-screen`),f(4),T(`active`,vs(28,41,a.activeFragment)===`action-panel`),f(4),T(`active`,vs(32,43,a.activeFragment)===`content-panel`),f(88),A(`clrCode`,a.actionPanelExample),f(3),A(`clrCode`,a.actionPanelToggleExample),f(26),A(`clrCode`,a.basePageCodeExample),f(4),A(`clrCode`,a.basePageRoutingCodeExample),f(2),A(`clrCode`,a.basePageRoutingPageCodeExample),f(2),A(`clrCode`,a.basePageRoutingPageTSCodeExample),f(74),A(`clrCode`,a.flowbarCodeExample),f(10),A(`clrCode`,a.flowbarHtmlExampleSubmitEnter),f(127),A(`clrCode`,a.stickyFooterCodeExample),f(38),A(`clrCode`,a.fullScreenDialogHtmlExample),f(15),A(`clrMenuPosition`,`bottom-right`),f(14),A(`clrCode`,a.htmlExampleActionPanel),f(15),A(`clrCode`,a.htmlExampleContentPanel))},dependencies:[O,Ud,q,O$2,Vp,VB,SB,F6e,K$1,Rhe,hae,_e,ie,tA],encapsulation:2,changeDetection:1})}return r})();var xe=(()=>{class r{static ɵfac=function(d){return new(d||r)};static ɵmod=$$1({type:r});static ɵinj=B({imports:[K$1,Rhe,_e,ie,Lp.forChild([{path:``,component:S}]),S]})}return r})();export{xe as PageLayoutsDemoModule};