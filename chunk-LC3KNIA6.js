import{a as re,b as ae,c as le}from"./chunk-TL2N2RC7.js";import"./chunk-53GF5SVT.js";import{c as ie,d as ne}from"./chunk-D7R3U4E3.js";import{Y as K,Yj as j,fk as h,gk as S,hk as J,ik as z,jk as X,kk as Q,lk as Z,mk as $,nk as ee,yk as te}from"./chunk-C3RSNUGJ.js";import{$c as W,$e as N,$g as G,Aa as y,J as b,Jg as q,Kb as x,La as o,Lb as E,Ma as i,Na as t,Oa as d,Rc as C,Vc as P,Wc as I,Yc as A,_c as L,ib as M,jd as O,kb as e,lf as Y,mb as D,mf as R,na as r,nc as k,nd as B,nf as V,od as F,of as H,pf as U,qb as c,rb as s,sb as p,tc as _,va as w,wa as T,za as v}from"./chunk-RVAFCAEY.js";import"./chunk-UKNGC2Y4.js";function me(l,g){if(l&1&&(i(0,"clr-control-error"),e(1),x(2,"date"),t()),l&2){let m=g.error;r(),D(" Daterange minimum is ",E(2,1,m.min.toDate())," ")}}function ce(l,g){if(l&1&&(i(0,"clr-control-error"),e(1),x(2,"date"),t()),l&2){let m=g.error;r(),D(" Daterange maximum is ",E(2,1,m.max.toDate())," ")}}function se(l,g){l&1&&(i(0,"clr-control-error"),e(1,"Daterange is mandatory!"),t())}function pe(l,g){l&1&&(i(0,"clr-control-error"),e(1,' Date "from" must be before date "to"! '),t())}function ge(l,g){if(l&1&&(i(0,"clr-control-error"),e(1),x(2,"date"),t()),l&2){let m=g.error;r(),D(" Daterange minimum is ",E(2,1,m.min.toDate())," ")}}function ue(l,g){if(l&1&&(i(0,"clr-control-error"),e(1),x(2,"date"),t()),l&2){let m=g.error;r(),D(" Daterange maximum is ",E(2,1,m.max.toDate())," ")}}function he(l,g){l&1&&(i(0,"clr-control-error"),e(1,"No valid daterange value!"),t())}var fe=`
<form clrForm>
  <clr-daterangepicker-container>
    <label>Basic demo</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`,De=`
<form clrForm>
  <clr-daterangepicker-container [timeSelection]="true">
    <label>Basic demo</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`,xe=`
    <clr-daterangepicker-container class="inline" [timeSelection]="true" [activateSeconds]="true">
      <input clrDaterangepicker type="date" [(ngModel)]="absolute" (ngModelChange)="emitModelChange()"/>
    </clr-daterangepicker-container>
`,Ee=`
  absolute = <NullableTimerange>{
        from: fromDate ? new DayModel(fromDate) : null,
        fromTime: fromDate ? new TimeModel(fromDate) : null,
        to: toDate ? new DayModel(toDate) : null,
        toTime: toDate ? new TimeModel(toDate) : null
      };

  public emitModelChange(): void {
    const fromDate = this.absolute?.from ? new Date(this.absolute.from.toDate()) : new Date();
    const fromTime = this.absolute?.fromTime ? this.absolute.fromTime.toDate() : null;
    if (fromTime) {
      fromDate.setHours(fromTime.getHours(), fromTime.getMinutes(), fromTime.getSeconds(), 0);
    } else {
      fromDate.setHours(0, 0, 0, 0);
    }

    const toDate = this.absolute?.to ? new Date(this.absolute.to.toDate()) : new Date();
    const toTime = this.absolute?.toTime ? this.absolute.toTime.toDate() : null;
    if (toTime) {
      toDate.setHours(toTime.getHours(), toTime.getMinutes(), toTime.getSeconds(), 999);
    } else {
      toDate.setHours(23, 59, 59, 99);
    }
  }
`,Se=`
<form clrForm>
  <clr-daterangepicker-container>
    <label>Min date: 2023-05-03 AND Max date: 2023-06-20</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" min="2023-05-03" max="2023-06-20" />
    <clr-control-error *clrIfDaterangeError="'min'; error as err">Daterange minimum is {{ err.min.toDate() | date }}</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'max'; error as err">Daterange maximum is {{ err.max.toDate() | date }}</clr-control-error>
  </clr-daterangepicker-container>
</form>
`,ye=`
<form clrForm>
  <clr-daterangepicker-container [presets]="presets">
    <label>Presets</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`,be=`
<form clrForm>
  <clr-daterangepicker-container [presets]="presetsTime" [timeSelection]="true">
    <label>Presets</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`,we=`
presets: Array<DaterangePreset> = [
  {
    text: 'Last 30 days',
    range: () => ({
      from: new DayModel(new Date()).incrementBy(-29),
      to: new DayModel(new Date()),
    }),
  },
  {
    text: 'From today',
    range: () => ({
      from: new DayModel(new Date()),
      to: null,
    }),
  },
  {
    text: 'Until today',
    range: () => ({
      from: null,
      to: new DayModel(new Date()),
    }),
  },
  {
    text: 'Clear',
    range: () => ({
      from: null,
      to: null,
    }),
  },
];
`,Te=`
presets: Array<DaterangePreset> = [
  {
    text: 'Last 5 minute',
    range: () => ({
      from: new DayModel(new Date()),
      to: new DayModel(new Date()),
      fromTime: new TimeModel(new Date(new Date().getTime() - 5000 * 60)),
      toTime: new TimeModel(new Date()),
    }),
  },
  {
    text: 'Last 1 hour',
    range: () => ({
      from: new DayModel(new Date()),
      to: new DayModel(new Date()),
      fromTime: new TimeModel(new Date(new Date().getTime() - 60000 * 60)),
      toTime: new TimeModel(new Date()),
    }),
  },
];
`,ve=[{text:"Last 30 days",range:()=>({from:new h(new Date).incrementBy(-29),to:new h(new Date)})},{text:"From today",range:()=>({from:new h(new Date),to:null})},{text:"Until today",range:()=>({from:null,to:new h(new Date)})},{text:"Clear",range:()=>({from:null,to:null})}],Me=[{text:"Last 5 minute",range:()=>({from:new h(new Date),to:new h(new Date),fromTime:new S(new Date(new Date().getTime()-5e3*60)),toTime:new S(new Date)})},{text:"Last 1 hour",range:()=>({from:new h(new Date),to:new h(new Date),fromTime:new S(new Date(new Date().getTime()-6e4*60)),toTime:new S(new Date)})}],ke=`
<form clrForm>
  <clr-daterangepicker-container [clrPosition]="'left-top'">
    <label>Position</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`,_e=`
<form clrForm>
  <clr-daterangepicker-container labelFrom="Van" labelTo="Tot">
    <label>Labels "from" and "to"</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`,Ce=`
<form clrForm>
  <clr-daterangepicker-container>
    <label>Separator</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" separatorText=" tot " />
  </clr-daterangepicker-container>
</form>
`,Pe=`
<form clrForm>
  <clr-daterangepicker-container>
    <label>Placeholder</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" placeholder="Custom placeholder" />
  </clr-daterangepicker-container>
</form>
`,Ie=`
<form clrForm>
  <clr-daterangepicker-container>
    <label>Validation</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" min="2023-05-03" max="2023-06-20" required />
    <clr-control-helper>Helper text.</clr-control-helper>
    <clr-control-error *clrIfDaterangeError="'required'">Daterange is mandatory!</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'fromIsAfterTo'">Date "from" must be before date "to"!</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'min'; error as err">Daterange minimum is {{ err.min.toDate() | date }}</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'max'; error as err">Daterange maximum is {{ err.max.toDate() | date }}</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'invalid'">No valid daterange value!</clr-control-error>
    <clr-control-success>\u2705 Valid.</clr-control-success>
  </clr-daterangepicker-container>
</form>
`,oe=(()=>{class l extends re{value;valueTime;basicDemo=fe;basicTimeDemo=De;minMaxDemo=Se;presets=ve;presetsTime=Me;presetsDemo=ye;presetsTimeDemo=be;presetsTypescriptDemo=we;presetsTimeTypescriptDemo=Te;positionsDemo=ke;labelsTranslationDemo=_e;separatorDemo=Ce;placeholderDemo=Pe;validationDemo=Ie;modelChangeDemoUsageHtml=xe;modelChangeDemoUsageTs=Ee;constructor(){super("daterangepicker")}static \u0275fac=function(f){return new(f||l)};static \u0275cmp=w({type:l,selectors:[["clr-daterangepicker-demo"]],hostVars:4,hostBindings:function(f,n){f&2&&M("content-area",!0)("dox-content-panel",!0)},standalone:!1,features:[v],decls:530,vars:37,consts:[[3,"title"],[1,"component-summary"],["id","design-guidelines"],[1,"clrweb-DoxMedia"],[1,"clrweb-DoxMedia-block"],[1,"clrweb-DoxMedia-img"],["src","assets/images/documentation/daterangepicker-screenshot.png","alt","Screenshot of daterangepicker"],[1,"clrweb-DoxMedia-text"],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],["id","code-examples"],["id","examples"],["clrForm",""],["clrDaterangepicker","","type","date","name","daterange",3,"ngModelChange","ngModel"],[3,"clrCode"],[3,"timeSelection"],["href","https://clarity.design/documentation/datepicker"],["clrDaterangepicker","","type","date","name","daterange","min","2023-05-03","max","2023-06-20",3,"ngModelChange","ngModel"],[4,"clrIfDaterangeError"],[1,"clr-row"],[1,"clr-col-12","clr-col-md-6"],["src","assets/images/documentation/daterangepicker-presets-screenshot.png","alt","Screenshot of daterangepicker with presets option"],[3,"presets"],["clrDaterangepicker","","type","date","name","daterange-preset",3,"ngModelChange","ngModel"],["clrLanguage","typescript",3,"clrCode"],[3,"presets","timeSelection"],[3,"clrPosition"],["clrDaterangepicker","","type","date","name","daterange-position",3,"ngModelChange","ngModel"],["labelFrom","Van","labelTo","Tot"],["clrDaterangepicker","","type","date","name","daterange-labels",3,"ngModelChange","ngModel"],["clrDaterangepicker","","type","date","name","daterange-separator","separatorText"," tot ",3,"ngModelChange","ngModel"],["clrDaterangepicker","","type","date","name","daterange-placeholder","placeholder","Custom placeholder",3,"ngModelChange","ngModel"],["clrDaterangepicker","","type","date","name","daterange-validation","min","2023-05-03","max","2023-06-20","required","",3,"ngModelChange","ngModel"]],template:function(f,n){f&1&&(i(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e(3,"DateRangePicker is a popover control for picking a date range value for an input."),t(),i(4,"div",2)(5,"h2"),e(6,"Usage"),t(),i(7,"p"),e(8," Use the daterangepicker whenever you want to select a date range. The default Clarity Date Picker allows selecting only one date. This component uses two Clarity Date Pickers to select a start and end date. As an addition, the time selection can be activated. See options for details. "),t(),i(9,"div",3)(10,"div",4)(11,"div",5),d(12,"img",6),t()(),i(13,"div",7)(14,"p"),e(15,"Screenshot of a basic daterangepicker."),t()()(),i(16,"h3"),e(17,"Summary of Options"),t(),i(18,"h4")(19,"code",8),e(20,"clr-daterangepicker-container"),t(),e(21," element"),t(),i(22,"table",9)(23,"thead")(24,"tr")(25,"th",10),e(26,"Input"),t(),i(27,"th",11),e(28,"Values"),t(),i(29,"th",12),e(30,"Default"),t(),i(31,"th",10),e(32,"Effect"),t()()(),i(33,"tbody")(34,"tr")(35,"td",10)(36,"strong"),e(37,"[clrPosition]"),t()(),i(38,"td",11),e(39,"ClrPopoverPosition (from @clr/angular)"),t(),i(40,"td",12)(41,"code",8),e(42,"ClrPopoverPosition.BOTTOM_LEFT"),t()(),i(43,"td",10),e(44," Set the position of the popover containing the two Date Pickers relative to the input field. "),t()(),i(45,"tr")(46,"td",10)(47,"strong"),e(48,"[labelFrom]"),t()(),i(49,"td",11)(50,"code",8),e(51,"String"),t()(),i(52,"td",12)(53,"code",8),e(54,"'From'"),t()(),i(55,"td",10),e(56,'Translatable "from" label.'),t()(),i(57,"tr")(58,"td",10)(59,"strong"),e(60,"[LabelTo]"),t()(),i(61,"td",11)(62,"code",8),e(63,"String"),t()(),i(64,"td",12)(65,"code",8),e(66,"'To'"),t()(),i(67,"td",10),e(68,'Translatable "to" label.'),t()(),i(69,"tr")(70,"td",10)(71,"strong"),e(72,"[presets]"),t()(),i(73,"td",11)(74,"code",8),e(75,"Array<DaterangePreset>"),t()(),i(76,"td",12)(77,"code",8),e(78,"[]"),t()(),i(79,"td",10),e(80," List of presets. By default this list is empty, which hides the presets section in the UI. "),t()(),i(81,"tr")(82,"td",10)(83,"strong"),e(84,"[timeSelection]"),t()(),i(85,"td",11)(86,"code",8),e(87,"Boolean"),t()(),i(88,"td",12),d(89,"code",8),t(),i(90,"td",10),e(91,"Set to true, if time selection should be activated."),t()(),i(92,"tr")(93,"td",10)(94,"strong"),e(95,"[activateSeconds]"),t()(),i(96,"td",11)(97,"code",8),e(98,"Boolean"),t()(),i(99,"td",12),d(100,"code",8),t(),i(101,"td",10),e(102,"Set to true, if seconds should be shown on timeselection."),t()(),i(103,"tr")(104,"td",10)(105,"strong"),e(106,"[presetsDateTime]"),t()(),i(107,"td",11)(108,"code",8),e(109,"Array<DateTimerangePreset>"),t()(),i(110,"td",12)(111,"code",8),e(112,"[]"),t()(),i(113,"td",10),e(114," List of time/date presets. By default this list is empty, which hides the presets section in the UI. If you active timeSelection, please only provide presetsDateTime. "),t()()()(),i(115,"h4")(116,"code",8),e(117,"clrDaterangepicker"),t(),e(118," directive"),t(),i(119,"table",9)(120,"thead")(121,"tr")(122,"th",10),e(123,"Input"),t(),i(124,"th",11),e(125,"Values"),t(),i(126,"th",12),e(127,"Default"),t(),i(128,"th",10),e(129,"Effect"),t()()(),i(130,"tbody")(131,"tr")(132,"td",10)(133,"strong"),e(134,"[min]"),t()(),i(135,"td",11)(136,"code",8),e(137,"String"),t()(),i(138,"td",12),e(139,"N/A"),t(),i(140,"td",10),e(141," Sets the earliest acceptable date and must be in the "),i(142,"code",8),e(143,"YYYY-MM-DD"),t(),e(144," format. "),t()(),i(145,"tr")(146,"td",10)(147,"strong"),e(148,"[max]"),t()(),i(149,"td",11)(150,"code",8),e(151,"String"),t()(),i(152,"td",12),e(153,"N/A"),t(),i(154,"td",10),e(155," Sets the latest acceptable date and must be in the "),i(156,"code",8),e(157,"YYYY-MM-DD"),t(),e(158," format. "),t()(),i(159,"tr")(160,"td",10)(161,"strong"),e(162,"[separatorText]"),t()(),i(163,"td",11)(164,"code",8),e(165,"String"),t()(),i(166,"td",12)(167,"code",8),e(168,"' - '"),t()(),i(169,"td",10),e(170,'The value between the "from" and "to" dates is the separator.'),t()(),i(171,"tr")(172,"td",10)(173,"strong"),e(174,"[placeholder]"),t()(),i(175,"td",11)(176,"code",8),e(177,"String"),t()(),i(178,"td",12),e(179,' Concat of "from" format, plus separator, plus "to" format.'),d(180,"br"),e(181," E.g. "),i(182,"code",8),e(183,"MM/DD/YYYY - MM/DD/YYYY"),t()(),i(184,"td",10),e(185,"Placeholder attribute for the input."),t()(),i(186,"tr")(187,"td",10)(188,"strong"),e(189,"(valueChange)"),t()(),i(190,"td",11)(191,"code",8),e(192,"NullableDaterange | NullableTimerange"),t()(),i(193,"td",12),e(194,"N/A"),t(),i(195,"td",10),e(196,"Event triggered when the input value changes."),t()()()()(),i(197,"div",13)(198,"h2",14),e(199,"Code & Examples"),t(),i(200,"h3")(201,"code",8),e(202,"clrDaterangepicker"),t(),e(203," directive"),t(),i(204,"p"),e(205," To use the daterangepicker, add the "),i(206,"code",8),e(207,"clrDaterangepicker"),t(),e(208," directive to an "),i(209,"code",8),e(210,"input"),t(),e(211," field. Then, place the input inside the "),i(212,"code",8),e(213,"clr-daterangepicker-container"),t(),e(214," container element. "),t(),i(215,"form",15)(216,"clr-daterangepicker-container")(217,"label"),e(218,"Basic demo"),t(),i(219,"input",16),p("ngModelChange",function(a){return s(n.value,a)||(n.value=a),a}),t()()(),d(220,"clr-code-snippet",17),i(221,"h3"),e(222,"TimeSelection"),t(),i(223,"p"),e(224," To use the daterangepicker, add the "),i(225,"code",8),e(226,"clrDaterangepicker"),t(),e(227," directive to an "),i(228,"code",8),e(229,"input"),t(),e(230," field. Then, place the input inside the "),i(231,"code",8),e(232,"clr-daterangepicker-container"),t(),e(233," container element. To use the daterangepicker with time selection, set "),i(234,"code",8),e(235,'[timeSelection]="true"'),t(),e(236," additionally. The value will be be returned as a NullableTimerange containing time information. "),t(),i(237,"form",15)(238,"clr-daterangepicker-container",18)(239,"label"),e(240,"Basic time demo"),t(),i(241,"input",16),p("ngModelChange",function(a){return s(n.valueTime,a)||(n.valueTime=a),a}),t()()(),d(242,"clr-code-snippet",17),i(243,"h4"),e(244,"Example usage of ngModelChange"),t(),i(245,"p"),e(246,"See the following code example for consuming and using the time and date from the DateRangePicker"),t(),d(247,"clr-code-snippet",17)(248,"clr-code-snippet",17),i(249,"h3"),e(250,"Configuration"),t(),i(251,"h4"),e(252,"Min/Max attributes"),t(),i(253,"p"),e(254," Just like "),i(255,"a",19),e(256,"Clarity Date Picker"),t(),e(257,", you can set earliest and latest acceptable dates. Just like the native HTML5 date spec a "),i(258,"code",8),e(259,"yyyy-mm-dd"),t(),e(260," string can be used in the value for min or max. If the max value isn't a possible date then that the input has no max value. Similar for min values, if the string used is not a possible date then the input will not have a min value. "),t(),i(261,"p"),e(262," Only dates inside the min/max range will be selectable for the input when there is a bound placed for the min or max attribute. "),t(),i(263,"p"),e(264," Showing validation errors for min & max attributes work the same as Clarity with "),i(265,"code",8),e(266,"clr-control-error"),t(),e(267,". Only one big difference, it requires an different directive. Use "),i(268,"code",8),e(269,"*clrIfDaterangeError"),t(),e(270," instead of "),i(271,"code",8),e(272,"*clrIfError"),t(),e(273,". "),t(),i(274,"form",15)(275,"clr-daterangepicker-container")(276,"label"),e(277,"Min & max attributes"),t(),i(278,"input",20),p("ngModelChange",function(a){return s(n.value,a)||(n.value=a),a}),t(),i(279,"clr-control-helper"),e(280,"Min date: 2023-05-03 AND Max date: 2023-06-20"),t(),y(281,me,3,3,"clr-control-error",21)(282,ce,3,3,"clr-control-error",21),t()(),d(283,"clr-code-snippet",17),i(284,"h4"),e(285,"Presets"),t(),i(286,"div",22)(287,"div",23)(288,"p"),e(289,' To quicker set fixed dateranges, it is possible to set a list of presets. Any preset will create an button in the popover next to the Date Pickers. Once pressed, the preset will fill the "from" and "to" Date Pickers with an hard-coded or dynamic date. You can choose to fill both dates, for example with the last 30 days. Or you can set only one date of the daterange, for example if you want today to be pre-filled. Only when both values are present, the popover will close and update the model. You can set as many presets as you want, but an maximum of 4 is advised. '),t()(),i(290,"div",23)(291,"div",3)(292,"div",4)(293,"div",5),d(294,"img",24),t()(),i(295,"div",7)(296,"p"),e(297,"Screenshot of daterangepicker with presets option."),t()()()()(),i(298,"p"),e(299," To add presets, you can use the "),i(300,"code",8),e(301,"DaterangePreset"),t(),e(302," interface. It contains an property for text of the button: "),i(303,"code",8),e(304,"text"),t(),e(305,". And it contains an function that returns an "),i(306,"code",8),e(307,"Daterange"),t(),e(308,", which will be called once the preset button is clicked. "),t(),i(309,"form",15)(310,"clr-daterangepicker-container",25)(311,"label"),e(312,"Presets"),t(),i(313,"input",26),p("ngModelChange",function(a){return s(n.value,a)||(n.value=a),a}),t()()(),d(314,"clr-code-snippet",17)(315,"clr-code-snippet",27),i(316,"p"),e(317,"Preset are also available for time selection, see example:"),t(),i(318,"form",15)(319,"clr-daterangepicker-container",28)(320,"label"),e(321,"Presets Time"),t(),i(322,"input",26),p("ngModelChange",function(a){return s(n.value,a)||(n.value=a),a}),t()()(),d(323,"clr-code-snippet",17)(324,"clr-code-snippet",27),i(325,"h4"),e(326,"Position"),t(),i(327,"p"),e(328," It is possible to change the position of the popover, which contains the two Date Pickers. This works the same as the "),i(329,"a",19),e(330,"Clarity Date Pickers"),t(),e(331,", although this option is not documented. "),t(),i(332,"p"),e(333,"The "),i(334,"code",8),e(335,"clrPosition"),t(),e(336," attribute accepts one of the following strings:"),t(),i(337,"ul")(338,"li")(339,"code",8),e(340,"'bottom-left'"),t()(),i(341,"li")(342,"code",8),e(343,"'bottom-right'"),t()(),i(344,"li")(345,"code",8),e(346,"'left-bottom'"),t()(),i(347,"li")(348,"code",8),e(349,"'left-top'"),t()(),i(350,"li")(351,"code",8),e(352,"'right-bottom'"),t()(),i(353,"li")(354,"code",8),e(355,"'right-top'"),t()(),i(356,"li")(357,"code",8),e(358,"'top-left'"),t()(),i(359,"li")(360,"code",8),e(361,"'top-right'"),t()()(),i(362,"form",15)(363,"clr-daterangepicker-container",29)(364,"label"),e(365,"Position"),t(),i(366,"input",30),p("ngModelChange",function(a){return s(n.value,a)||(n.value=a),a}),t()()(),d(367,"clr-code-snippet",17),i(368,"h3"),e(369,"Internationalization"),t(),i(370,"p"),e(371," As the Date Pickers inside the popover are "),i(372,"a",19),e(373,"Clarity Date Pickers"),t(),e(374,", they use the same locale identifiers supported by Angular for getting the date format, first day of the week, month and day names. These values are used to generate the input field placeholder and the calendar. "),t(),i(375,"h3"),e(376,"Translation"),t(),i(377,"p"),e(378,"The following options are available to help with multilingual applications:"),t(),i(379,"h4"),e(380,'Labels "from" and "to"'),t(),i(381,"p"),e(382,' Both the "from" and "to" input labels inside the modal are translatable via respectively '),i(383,"code",8),e(384,"labelFrom"),t(),e(385," and "),i(386,"code",8),e(387,"labelTo"),t(),e(388," attributes. "),t(),i(389,"form",15)(390,"clr-daterangepicker-container",31)(391,"label"),e(392,'Labels "from" and "to"'),t(),i(393,"input",32),p("ngModelChange",function(a){return s(n.value,a)||(n.value=a),a}),t()()(),d(394,"clr-code-snippet",17),i(395,"h4")(396,"code",8),e(397,"separatorText"),t(),e(398," attribute"),t(),i(399,"p"),e(400,' The value between the "from" and "to" dates is the separator. By default it uses a dash '),i(401,"code",8),e(402,"-"),t(),e(403," character, surrounded by a whitespace. This attribute is used in the input field, the default placeholder and the hover titles. Any whitespace between the dates you'll need to add to this separator option."),d(404,"br"),e(405,' The example below uses the Dutch word for "until" between the "from" and "to" dates. '),t(),i(406,"form",15)(407,"clr-daterangepicker-container")(408,"label"),e(409,"Separator"),t(),i(410,"input",33),p("ngModelChange",function(a){return s(n.value,a)||(n.value=a),a}),t()()(),d(411,"clr-code-snippet",17),i(412,"h4")(413,"code",8),e(414,"placeholder"),t(),e(415," attribute"),t(),i(416,"p"),e(417,"A whole different placeholder can be set via the "),i(418,"code",8),e(419,"placeholder"),t(),e(420," attribute."),t(),i(421,"form",15)(422,"clr-daterangepicker-container")(423,"label"),e(424,"Placeholder"),t(),i(425,"input",34),p("ngModelChange",function(a){return s(n.value,a)||(n.value=a),a}),t()()(),d(426,"clr-code-snippet",17),i(427,"h3"),e(428,"Validation"),t(),i(429,"p"),e(430," The daterangepicker has multiple validations. Each validation is enabled by default (if conditions are met), but can individually disabled. "),t(),i(431,"p"),e(432,"The following validations are present:"),t(),i(433,"ul")(434,"li"),e(435," Daterange is required. Key "),i(436,"code",8),e(437,"required"),t(),e(438,". When the "),i(439,"code",8),e(440,"input"),t(),e(441," element contains the "),i(442,"code",8),e(443,"required"),t(),e(444," attribute, this validation is enabled. When the control is touched and no value is present, this validation is activated. "),d(445,"br"),e(446," This validation is also activated when the model receives an partial daterange. "),d(447,"br"),e(448," This validation can be disabled with "),i(449,"code",8),e(450,'[clrDaterangeRequired]="false"'),t(),e(451,". "),t(),i(452,"li"),e(453,' Date "from" is after "to" date. Key '),i(454,"code",8),e(455,"fromIsAfterTo"),t(),e(456,'. This validation is always enabled, and triggered when the "from" is not after the "to" date. '),d(457,"br"),e(458," This validation can be disabled with "),i(459,"code",8),e(460,'[clrDaterangeOrder]="false"'),t(),e(461,". "),t(),i(462,"li"),e(463," Daterange cannot start before minium date. Key "),i(464,"code",8),e(465,"min"),t(),e(466,". This validation is enabled when the "),i(467,"code",8),e(468,"min"),t(),e(469," property is set. "),d(470,"br"),e(471," This validation can be disabled with "),i(472,"code",8),e(473,'[clrDaterangeMin]="false"'),t(),e(474,". "),t(),i(475,"li"),e(476," Daterange cannot end after maximum date. Key "),i(477,"code",8),e(478,"max"),t(),e(479,". This validation is enabled when the "),i(480,"code",8),e(481,"max"),t(),e(482," property is set. "),d(483,"br"),e(484," This validation can be disabled with "),i(485,"code",8),e(486,'[clrDaterangeMax]="false"'),t(),e(487,". "),t(),i(488,"li"),e(489," Invalid daterange. Key "),i(490,"code",8),e(491,"invalid"),t(),e(492,". When the manually entered daterange in the "),i(493,"code",8),e(494,"input"),t(),e(495," element is invalid, this validation is activated. "),t()(),i(496,"p"),e(497," Showing validation errors work the same as Clarity with "),i(498,"code",8),e(499,"clr-control-error"),t(),e(500,". Only one big difference, it requires an different directive. Use "),i(501,"code",8),e(502,"*clrIfDaterangeError"),t(),e(503," instead of "),i(504,"code",8),e(505,"*clrIfError"),t(),e(506,". "),t(),i(507,"p"),e(508," The "),i(509,"code",8),e(510,"clr-control-helper"),t(),e(511," and "),i(512,"code",8),e(513,"clr-control-success"),t(),e(514," are also supported. "),t(),i(515,"form",15)(516,"clr-daterangepicker-container")(517,"label"),e(518,"Validation"),t(),i(519,"input",35),p("ngModelChange",function(a){return s(n.value,a)||(n.value=a),a}),t(),i(520,"clr-control-helper"),e(521,"Helper text."),t(),y(522,se,2,0,"clr-control-error",21)(523,pe,2,0,"clr-control-error",21)(524,ge,3,3,"clr-control-error",21)(525,ue,3,3,"clr-control-error",21)(526,he,2,0,"clr-control-error",21),i(527,"clr-control-success"),e(528,"\u2705 Valid."),t()()(),d(529,"clr-code-snippet",17),t()()()),f&2&&(o("title",n.title),r(219),c("ngModel",n.value),r(),o("clrCode",n.basicDemo),r(18),o("timeSelection",!0),r(3),c("ngModel",n.valueTime),r(),o("clrCode",n.basicTimeDemo),r(5),o("clrCode",n.modelChangeDemoUsageHtml),r(),o("clrCode",n.modelChangeDemoUsageTs),r(30),c("ngModel",n.value),r(3),o("clrIfDaterangeError","min"),r(),o("clrIfDaterangeError","max"),r(),o("clrCode",n.minMaxDemo),r(27),o("presets",n.presets),r(3),c("ngModel",n.value),r(),o("clrCode",n.presetsDemo),r(),o("clrCode",n.presetsTypescriptDemo),r(4),o("presets",n.presetsTime)("timeSelection",!0),r(3),c("ngModel",n.value),r(),o("clrCode",n.presetsTimeDemo),r(),o("clrCode",n.presetsTimeTypescriptDemo),r(39),o("clrPosition","left-top"),r(3),c("ngModel",n.value),r(),o("clrCode",n.positionsDemo),r(26),c("ngModel",n.value),r(),o("clrCode",n.labelsTranslationDemo),r(16),c("ngModel",n.value),r(),o("clrCode",n.separatorDemo),r(14),c("ngModel",n.value),r(),o("clrCode",n.placeholderDemo),r(93),c("ngModel",n.value),r(3),o("clrIfDaterangeError","required"),r(),o("clrIfDaterangeError","fromIsAfterTo"),r(),o("clrIfDaterangeError","min"),r(),o("clrIfDaterangeError","max"),r(),o("clrIfDaterangeError","invalid"),r(3),o("clrCode",n.validationDemo))},dependencies:[W,C,P,I,O,L,A,H,Y,V,R,U,ie,ae,K,j,Q,Z,$,z,J,ee,X,k],encapsulation:2})}return l})();var ze=(()=>{class l{static \u0275fac=function(f){return new(f||l)};static \u0275mod=T({type:l});static \u0275inj=b({imports:[_,B,F,G,q,ne,le,N.forChild([{path:"",component:oe}]),te]})}return l})();export{ze as DaterangepickerDemoModule};
