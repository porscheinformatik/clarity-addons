import{a as _,b as I,c as O}from"./chunk-NFNZCF3H.js";import"./chunk-S3DWPM3E.js";import{c as D,d as M}from"./chunk-BVYDJZUK.js";import{Ad as y,Ba as E,Bd as f,Cd as w,He as L,K as h,Mb as s,Na as l,Nb as c,Oa as n,Pa as t,Qa as i,bf as P,ef as C,ff as k,hf as A,hh as F,if as T,jf as B,kb as m,mb as e,oa as o,oc as x,ua as g,wa as b,wc as v,xa as S,z as p}from"./chunk-KXNV7YWY.js";import"./chunk-76DGGKHL.js";f.addIcons(L);var R=`
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
`,N=`
<history button> <custom page specific buttons> <action-panel-button>
`,U=`
<clr-main-container>
    <clr-demo-menu></clr-demo-menu>

    <router-outlet></router-outlet>
</clr-main-container>
`,G=`
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
`,X=`
@HostBinding('class.u-main-container') bindMainContainer = true;
`,j=`
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
`,W=`
<form ... (submit)="flowBar.next()">
    ...
    <input type="submit" style="display: none"> <!-- Not needed, if you already have a submit button-->
</form>
`,Y=`
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
`,V=`
<!-- This is the router outlet for full screen dialogs -->
<router-outlet name="overlay" (activate)="overlayActive = true" (deactivate)="overlayActive = false"></router-outlet>

<!-- This is the default router outlet for all of your default pages -->
<div [hidden]="overlayActive">
    <router-outlet></router-outlet>
</div>
`,z=`
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
`,J=`
 @ViewChild('actionPanel')
 actionPanel: ClrActionPanel;

  private toggleActionPanel() {
    this.actionPanel.toggle();
  }
`,K=`
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
`,Z=`
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
`,H=(()=>{class r extends _{route;basePageCodeExample=R;basePageRoutingCodeExample=U;basePageRoutingPageCodeExample=G;basePageRoutingPageTSCodeExample=X;flowbarCodeExample=j;flowbarHtmlExampleSubmitEnter=W;stickyFooterCodeExample=Y;fullScreenDialogHtmlExample=V;buttonCodeOrderExample=N;actionPanelExample=z;actionPanelToggleExample=J;activeFragment;htmlExampleActionPanel=K;htmlExampleContentPanel=Z;constructor(u){super("page-layouts"),this.route=u,this.activeFragment=this.route.fragment.pipe(p())}static \u0275fac=function(d){return new(d||r)(g(P))};static \u0275cmp=b({type:r,selectors:[["clr-page-layouts-demo-docu"]],hostVars:4,hostBindings:function(d,a){d&2&&m("content-area",!0)("dox-content-panel",!0)},standalone:!1,features:[E],decls:450,vars:45,consts:[[3,"title","showTabs"],[1,"table-of-contents"],[1,"title"],[1,"list-unstyled","toc-list"],["routerLink",".","fragment","base-layout"],["routerLink",".","fragment","flow-layout"],["routerLink",".","fragment","sidebar-layout"],["routerLink",".","fragment","sticky-footer"],["routerLink",".","fragment","full-screen"],["routerLink",".","fragment","action-panel"],["routerLink",".","fragment","content-panel"],["id","generic-pager-header",1,"component-summary"],["href","full-page-layouts/basepage-layout-command","target","_blank"],[1,"btn","btn-outline"],["shape","display"],["id","base-layout"],[1,"list"],[1,"clr-code"],["src","assets/images/documentation/command-bar.png","width","500px","alt","Command Bar"],[3,"clrCode"],["clrLanguage","typescript",3,"clrCode"],["id","code-examples"],["id","examples"],["routerLink","/full-page-layouts/basepage-layout","routerLinkActive","active"],[1,"nav-text"],["routerLink","/full-page-layouts/basepage-layout-command","routerLinkActive","active"],["routerLink","/full-page-layouts/action-panel","routerLinkActive","active"],["id","flow-layout"],[1,"component-summary"],["id","design-guidelines"],["routerLink","/full-page-layouts/flow-bar","routerLinkActive","active"],["id","sidebar-layout"],["routerLink","/full-page-layouts/sidebarpage-layout","routerLinkActive","active"],["id","sticky-footer"],[1,"clr-row"],[1,"clr-col-md-12","clr-col-lg-6"],[1,"clrweb-DoxMedia","is-do-block"],[1,"clrweb-DoxMedia-block"],[1,"clrweb-DoxMedia-img"],["src","assets/images/documentation/do.png","alt","do"],[1,"clrweb-DoxMedia-text"],[1,"clrweb-DoxMedia-do-dont"],[1,"clrweb-DoxMedia","is-dont-block"],["src","assets/images/documentation/dont.png","alt","dont"],["routerLink","/full-page-layouts/sticky-footer","routerLinkActive","active"],["id","full-screen"],["id","action-panel"],[3,"clrMenuPosition"],["shape","view-columns"],["id","content-panel"],["routerLink","/full-page-layouts/content-panel","routerLinkActive","active"]],template:function(d,a){d&1&&(n(0,"clr-doc-wrapper",0)(1,"div",1)(2,"span",2),e(3,"Content"),t(),n(4,"ul",3)(5,"li")(6,"a",4),s(7,"async"),s(8,"async"),e(9,"Base Page Layout"),t()(),n(10,"li")(11,"a",5),s(12,"async"),e(13,"Flow Bar Layout"),t()(),n(14,"li")(15,"a",6),s(16,"async"),e(17,"Sidebar Page Layout"),t()(),n(18,"li")(19,"a",7),s(20,"async"),e(21,"Sticky Footer Layout"),t()(),n(22,"li")(23,"a",8),s(24,"async"),e(25,"Full Screen Dialog"),t()(),n(26,"li")(27,"a",9),s(28,"async"),e(29,"Action Panel"),t()(),n(30,"li")(31,"a",10),s(32,"async"),e(33,"Content Panel"),t()()()(),n(34,"article")(35,"h5",11),e(36," All pages in an application should follow a common layout structure to ensure a consistent user experience across applications. "),t(),n(37,"a",12)(38,"button",13),i(39,"cds-icon",14),e(40,"\xA0 Demo application"),t()(),n(41,"h2",15),e(42,"Base Page Layout"),t(),n(43,"h5",11),e(44," The Base Page Layout provides the most fundamental navigation and content elements. "),t(),n(45,"div")(46,"p"),e(47,"The Base Page Layout includes the following components:"),t(),n(48,"ul",16)(49,"li"),e(50,"Main Navigation"),t(),n(51,"li"),e(52,"Pagetitle"),t(),n(53,"li"),e(54,"Content Area"),t()(),n(55,"p")(56,"code",17),e(57,"ATTENTION!"),t(),e(58," Following DOM structure is vital for a correctly working page layout. They MUST be DIRECT children of each other! "),t(),n(59,"ul")(60,"li"),e(61," .main-container or .u-main-container "),n(62,"ul")(63,"li"),e(64,".content-header"),t(),n(65,"li"),e(66,"flowbar (optional)"),t(),n(67,"li"),e(68," .content-container "),n(69,"ul")(70,"li"),e(71,".content-area"),t(),n(72,"li"),e(73,"vertical nav (optional)"),t(),n(74,"li"),e(75,".content-area-footer (optional)"),t()()()()()(),n(76,"p"),e(77,"Further components may complete the page layout as needed:"),t(),n(78,"ul",16)(79,"li"),e(80,"Back Button"),t(),n(81,"li"),e(82,"Command bar"),t(),n(83,"li"),e(84,"Sidebar"),t(),n(85,"li"),e(86,"Content-Panel"),t(),n(87,"li"),e(88,"Action-Panel"),t()(),n(89,"h4"),e(90,"Command Bar"),t(),n(91,"ul",16)(92,"li"),e(93,"The Command Bar comprises the most common users tasks."),t(),n(94,"li"),e(95,"The most important ones are shown, additional ones are accessible in an overflow-menu."),t(),n(96,"li"),e(97," Other commands, either less common ones or where the proximity to an ui element is crucial, are provided within the content area. "),t(),n(98,"li"),e(99,"Consistent button order in command-bar:"),t(),n(100,"ul")(101,"li"),e(102,"The history-button is the left-most button, followed by"),t(),n(103,"li"),e(104,"Action Buttons, and"),t(),n(105,"li"),e(106,"Optional: the action-panel-button is the right-most button in the command-bar"),t()(),i(107,"img",18),t(),n(108,"h4"),e(109,"Action Panel"),t(),n(110,"ul",16)(111,"li"),e(112,"Use when lot of actions are required"),t(),n(113,"li"),e(114,"Group similar actions using Captions and Spacer."),t(),n(115,"li"),e(116,"Don't use when only a few actions are required, consider using Command bar then."),t()(),n(117,"p"),e(118,"Following example shows how to use the action panel."),t(),i(119,"clr-code-snippet",19),n(120,"p"),e(121," Add a button to show/hide the action panel. This can be done by calling the toggle method of the action panel component. "),t(),i(122,"clr-code-snippet",20),t(),n(123,"div",21)(124,"h3",22),e(125,"Code & Examples"),t(),n(126,"h4"),e(127,"Demo"),t(),n(128,"div"),i(129,"cds-icon",14),e(130,"\xA0 "),n(131,"a",23)(132,"span",24),e(133,"Base Page Layout"),t()()(),n(134,"div"),i(135,"cds-icon",14),e(136,"\xA0 "),n(137,"a",25)(138,"span",24),e(139,"Command bar"),t()()(),n(140,"div"),i(141,"cds-icon",14),e(142,"\xA0 "),n(143,"a",26)(144,"span",24),e(145,"Action panel"),t()()(),n(146,"p"),e(147," Following example shows a base page layout without multiple pages. If you have different pages (different header, ...) with routing see next example. "),t(),i(148,"clr-code-snippet",19),n(149,"p"),e(150," To ensure a correct page layout when whole pages are inside a route you need to put .u-main-container on those pages which contain the layout "),t(),e(151," app.component.html "),i(152,"clr-code-snippet",19),e(153," page.component.html "),i(154,"clr-code-snippet",19),e(155," page.component.ts "),i(156,"clr-code-snippet",20),t(),n(157,"h2",27),e(158,"Flow Bar Layout"),t(),n(159,"h5",28),e(160," The Flow Bar Layout extends the Base Page Layout by adding a wizard-like navigation control. "),t(),n(161,"p"),e(162," This layout that can be used to highlight the current progress a user is making throughout multiple steps. The Flow Bar allows the user to navigate between steps, by either clicking on a specific step or using the previous or next button. "),t(),n(163,"p"),e(164," The Flow Bar Layout requires the "),n(165,"code",17),e(166,"ClrFlowBar"),t(),e(167," and can optionally also contain the Sticky Footer Layout. "),t(),n(168,"div",29)(169,"h3"),e(170,"Usage"),t(),n(171,"p"),e(172," Use this layout if you want to guide the user through a sequence of multiple steps. Each step requires the user to perform a complex task like filling out a form. Don't use this layout if the user's steps are mutually exclusive; in this case use Tabs instead. "),t(),n(173,"p"),e(174," When implementing a flow bar on your page, you will need to insert a "),n(175,"code",17),e(176,"clr-flow-bar"),t(),e(177," right below your content-header but above your content-container. "),t(),n(178,"p"),e(179,"Following inputs & outputs are available:"),t(),n(180,"ul")(181,"li")(182,"code",17),e(183,"[clrSteps]"),t(),e(184," - an array of "),n(185,"code",17),e(186,"FlowBarStep"),t(),e(187,". You can extend/implement this interface to save even more information in your steps. "),t(),n(188,"li")(189,"code",17),e(190,"[(clrActiveStep)]"),t(),e(191," two way binding of the active step."),t()(),n(192,"p"),e(193," You can use the "),n(194,"code",17),e(195,"@ViewChild()"),t(),e(196," annotation to get a reference of your "),n(197,"code",17),e(198,"ClrFlowBar"),t(),e(199,", which will allow you to call its methods: "),t(),n(200,"ul")(201,"li")(202,"code",17),e(203,"previous()"),t(),e(204," - open the previous step."),t(),n(205,"li")(206,"code",17),e(207,"next()"),t(),e(208," - opens the next step."),t(),n(209,"li")(210,"code",17),e(211,"isPreviousAvailable()"),t(),e(212," - returns true if the previous step can be opened."),t(),n(213,"li")(214,"code",17),e(215,"isNextAvailable()"),t(),e(216," - returns true if the next step can be opened."),t(),n(217,"li")(218,"code",17),e(219,"isLastStep()"),t(),e(220," - returns true if the current step is the last."),t()()(),n(221,"div",21)(222,"h3",22),e(223,"Code & Examples"),t(),n(224,"h4"),e(225,"Demo"),t(),n(226,"a",30),i(227,"cds-icon",14),n(228,"span"),e(229,"Base Page Layout with a Flow Bar"),t()(),i(230,"clr-code-snippet",19),n(231,"h4"),e(232,"Submit form on enter and go to next page"),t(),n(233,"p"),e(234," As the next button is outside your form, following steps need to be done to go to next page after submitting the form with 'enter' "),t(),n(235,"ul")(236,"li"),e(237," Add hidden submit button to your form to activate 'enter' key handling in browser (only needed if you not already have one) "),t(),n(238,"li"),e(239,"React to submit of form and call next() on the flowbar"),t()(),i(240,"clr-code-snippet",19),t(),n(241,"h2",31),e(242,"Sidebar Page Layout"),t(),n(243,"h5",11),e(244," The Sidebar Page Layout enhances the Base Page Layout with a vertical navigation sidebar. "),t(),n(245,"div",29)(246,"h3"),e(247,"Design Guidelines"),t(),n(248,"p"),e(249,"The Sidebar Page Layout includes the following components:"),t(),n(250,"ul",16)(251,"li"),e(252,"Main Navigation"),t(),n(253,"li"),e(254,"Pagetitle"),t(),n(255,"li"),e(256,"Content Area"),t(),n(257,"li"),e(258,"Vertical Nav (Sidebar)"),t(),n(259,"li")(260,"strong"),e(261,"Optional: Summary Area"),t(),e(262," (panel between header and content for key information and quick actions) "),t()(),n(263,"p")(264,"strong"),e(265,"Summary Area Extension:"),t(),e(266," The Sidebar Page Layout can be extended with a "),n(267,"strong"),e(268,"Summary Area"),t(),e(269," panel, which appears between the page header and the main content. This area is ideal for displaying key information and quick actions at a glance, such as label-value pairs, icons, actions, and status indicators. The summary area is especially useful when users need to see important status, identifiers, or actions without scrolling, or when a summary should always be visible across multiple sections or tabs. It can also provide quick actions (copy, edit, navigate) for summary items and supports a collapsible state for more compact layouts. "),t(),n(270,"p"),e(271,"Use the Summary Area when:"),t(),n(272,"ul",16)(273,"li"),e(274,"You want to provide a quick summary of key data at the top of the page."),t(),n(275,"li"),e(276,"Users need to see important status, identifiers, or actions without scrolling."),t(),n(277,"li"),e(278,"There are multiple sections/tabs and a summary should always be visible."),t(),n(279,"li"),e(280,"You want to provide quick actions for summary items."),t()(),n(281,"p"),e(282,"Do not use the Summary Area when:"),t(),n(283,"ul",16)(284,"li"),e(285,"The page has only a single, simple form or content area."),t(),n(286,"li"),e(287,"There is no meaningful summary or key data to display."),t(),n(288,"li"),e(289,"The summary would duplicate all content from the main area."),t()(),n(290,"p"),e(291,"Further components may complete the page layout as needed:"),t(),n(292,"ul",16)(293,"li"),e(294,"Command Bar"),t(),n(295,"li"),e(296,"Back Button"),t(),n(297,"li"),e(298,"Collapsible Summary Area"),t()(),n(299,"h3"),e(300,"Use when"),t(),n(301,"p"),e(302,"Use the Sidebar Page Layout when you have:"),t(),n(303,"ul",16)(304,"li"),e(305,"Lots of content on one page, that can be junked in logical separated pages"),t(),n(306,"li"),e(307,"If you need a summary or overview-page, this should be the first element in the sidebar"),t()()(),n(308,"div",21)(309,"h3",22),e(310,"Code & Examples"),t(),n(311,"h4"),e(312,"Demo"),t(),i(313,"cds-icon",14),e(314,"\xA0"),n(315,"a",32)(316,"span",24),e(317,"Sidebar Page Layout"),t()()(),n(318,"h2",33),e(319,"Sticky Footer Layout"),t(),n(320,"h5",28),e(321," The Sticky footer represents a bar at the bottom of your page which is always visible - scrollable content is hidden behind the sticky footer. "),t(),n(322,"p"),e(323," The Sticky footer can be used for e.g. providing navigational buttons for a wizard (See also Flow Bar Layout). "),t(),n(324,"div",29)(325,"h3"),e(326,"Usage"),t(),n(327,"p"),e(328," Use this component when you want to display permanently visible elements on the bottom of a page. It works particularly well in combination with the Flow Bar Layout to provide navigational controls. When the Sticky Footer contains buttons for navigation, keep in mind to place them on the right hand side to follow a logical Z Pattern. "),t(),n(329,"div",34)(330,"div",35)(331,"div",36)(332,"div",37)(333,"div",38),i(334,"img",39),t()(),n(335,"div",40)(336,"h6",41),e(337,"Do"),t(),n(338,"p"),e(339," Place buttons leading to next step on the right. Optional information about the user's actions are placed on the left side. "),t()()()(),n(340,"div",35)(341,"div",42)(342,"div",37)(343,"div",38),i(344,"img",43),t()(),n(345,"div",40)(346,"h6",41),e(347,"Don't"),t(),n(348,"p"),e(349,"Don't put navigational buttons on the left side."),t()()()()(),n(350,"p"),e(351," When implementing a sticky footer on your page, you will want to insert a div with class "),n(352,"code",17),e(353,"content-area-footer"),t(),e(354," right below your "),n(355,"code",17),e(356,"content-area"),t(),e(357," div. This can be combined with a content panel layout, see the code example of the flow bar layout for more information. "),t()(),n(358,"div",21)(359,"h3",22),e(360,"Code & Examples"),t(),n(361,"h4"),e(362,"Demo"),t(),n(363,"a",44),i(364,"cds-icon",14),n(365,"span"),e(366,"Base Page Layout with a Sticky Footer"),t()(),i(367,"clr-code-snippet",19),t(),n(368,"h2",45),e(369,"Full Screen Dialog"),t(),n(370,"h5",11),e(371," The Full Screen Dialog is an alternative to the default modal dialog. "),t(),n(372,"p"),e(373," The Full Screen Dialog looks and feels like any other page though it is conceptually a modal dialog. This means that a full screen dialog can have any page layout. From a technical point of view, full screen dialogs are shown in a router outlet above the current page. This eliminates the loading time which usually occurs while navigating from page to page. "),t(),n(374,"div",29)(375,"h3"),e(376,"Design Guidelines"),t(),n(377,"p"),e(378," A Full Screen Dialog usually contains mutliple input elements and "),n(379,"strong"),e(380,"Save"),t(),e(381," and "),n(382,"strong"),e(383,"Cancel"),t(),e(384," options. Place these call to action buttons on the left side of the bottom of the page. Just like you would in a regular form. Optionally the dialog can also have a Back-button. Provide a confirmation prompt if the user has already entered data and Back was selected. Note that this prompt is not required for the Cancel-button, since the user deliberately choose Cancel to discard the input. "),t(),n(385,"h3"),e(386,"Use when"),t(),n(387,"p"),e(388,"Use the Full Screen Dialog if:"),t(),n(389,"ul",16)(390,"li"),e(391," You want to display a complex input form that requires "),n(392,"strong"),e(393,"Save"),t(),e(394," and "),n(395,"strong"),e(396,"Cancel"),t(),e(397," options "),t(),n(398,"li"),e(399," You need to show additional modal dialogs. In general you should not show another modal over a modal, but you can open a modal over a Full Screen Dialog. "),t(),n(400,"li"),e(401," The dialog's content would require too much scrolling in a modal dialog. Try to avoid scrolling in modal dialogs. "),t()()(),n(402,"div",21)(403,"h3",22),e(404,"Code"),t(),i(405,"clr-code-snippet",19),t(),n(406,"h2",46),e(407,"Action Panel"),t(),n(408,"h5",28),e(409,"Action panel is used if a lot of actions are required on one side."),t(),n(410,"h3"),e(411,"Best Practices"),t(),n(412,"ul",16)(413,"li"),e(414,"Use when lot of actions are required."),t(),n(415,"li"),e(416,"Group similar actions using Captions and Spacer."),t(),n(417,"li"),e(418,"Don\u2019t use when only a few actions are required, consider using Command bar then."),t()(),e(419," Provide a "),n(420,"clr-button-group",47)(421,"clr-button"),i(422,"cds-icon",48),t()(),e(423," button which handles the show/hide (toggle) of the panel. "),n(424,"div",21)(425,"h3",22),e(426,"Code & Examples"),t(),n(427,"div"),e(428," For an example usage follow the link: "),i(429,"cds-icon",14),e(430,"\xA0 "),n(431,"a",26)(432,"span",24),e(433,"Action panel"),t()()(),i(434,"clr-code-snippet",19),t(),n(435,"h2",49),e(436,"Content Panel"),t(),n(437,"h5",28),e(438,"Content panel is used if some text/action should be placed in a right panel."),t(),n(439,"div",21)(440,"h3",22),e(441,"Code & Examples"),t(),n(442,"div"),e(443," For an example usage follow the link: "),i(444,"cds-icon",14),e(445,"\xA0 "),n(446,"a",50)(447,"span",24),e(448,"Content panel"),t()()(),i(449,"clr-code-snippet",19),t()()()),d&2&&(l("title",a.title)("showTabs",!1),o(6),m("active",c(7,29,a.activeFragment)==="base-layout"||c(8,31,a.activeFragment)===null),o(5),m("active",c(12,33,a.activeFragment)==="flow-layout"),o(4),m("active",c(16,35,a.activeFragment)==="sidebar-layout"),o(4),m("active",c(20,37,a.activeFragment)==="sticky-footer"),o(4),m("active",c(24,39,a.activeFragment)==="full-screen"),o(4),m("active",c(28,41,a.activeFragment)==="action-panel"),o(4),m("active",c(32,43,a.activeFragment)==="content-panel"),o(88),l("clrCode",a.actionPanelExample),o(3),l("clrCode",a.actionPanelToggleExample),o(26),l("clrCode",a.basePageCodeExample),o(4),l("clrCode",a.basePageRoutingCodeExample),o(2),l("clrCode",a.basePageRoutingPageCodeExample),o(2),l("clrCode",a.basePageRoutingPageTSCodeExample),o(74),l("clrCode",a.flowbarCodeExample),o(10),l("clrCode",a.flowbarHtmlExampleSubmitEnter),o(127),l("clrCode",a.stickyFooterCodeExample),o(38),l("clrCode",a.fullScreenDialogHtmlExample),o(15),l("clrMenuPosition","bottom-right"),o(14),l("clrCode",a.htmlExampleActionPanel),o(15),l("clrCode",a.htmlExampleContentPanel))},dependencies:[w,y,T,B,D,I,C,k,x],encapsulation:2})}return r})();var he=(()=>{class r{static \u0275fac=function(d){return new(d||r)};static \u0275mod=S({type:r});static \u0275inj=h({imports:[v,F,M,O,A.forChild([{path:"",component:H}])]})}return r})();export{he as PageLayoutsDemoModule};
