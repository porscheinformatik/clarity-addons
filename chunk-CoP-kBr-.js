import{n as P,r as ie,t as O}from"./chunk-ByHoAxhQ.js";import{As as v,Bo as ot,D as B,Et as II,Ft as J9e,Gr as Xe,Gt as K,Is as vs,Ka as j,Mn as Pj,Qa as joe,Ro as oi,Va as ie$1,Vt as Jr,W as D7,Y as E,Zn as Ri,Zs as xhe,_i,an as Lp,ao as kj,bo as mr,d as $,di as Zn,ec as y,gc as zoe,j as Be,ka as gt,l as _e$1,la as ee,ls as ri,m as $R,ma as f,qn as R1,qo as pr,s as O$2,v as $oe,w as Ai,wi as aA,wn as Oj,xn as O$1,y as A}from"./main-H7HK7CIU.js";import{Ac as lM,Ec as l2,Ed as yo,Us as i3,Ws as i8,Xo as eM,gu as tM,nl as nM,qs as iM,x as Ao,xc as ko}from"./chunk-DYdAqUlK.js";function se(l,h){if(l&1&&(y(0,`clr-control-error`),ie$1(1),pr(2,`date`),v()),l&2){let m=h.error;f(),gt(` Daterange minimum is `,vs(2,1,m.min.toDate()),` `)}}function pe(l,h){if(l&1&&(y(0,`clr-control-error`),ie$1(1),pr(2,`date`),v()),l&2){let m=h.error;f(),gt(` Daterange maximum is `,vs(2,1,m.max.toDate()),` `)}}function ge(l,h){l&1&&(y(0,`clr-control-error`),ie$1(1,`Daterange is mandatory!`),v())}function ue(l,h){l&1&&(y(0,`clr-control-error`),ie$1(1,` Date "from" must be before date "to"! `),v())}function he(l,h){if(l&1&&(y(0,`clr-control-error`),ie$1(1),pr(2,`date`),v()),l&2){let m=h.error;f(),gt(` Daterange minimum is `,vs(2,1,m.min.toDate()),` `)}}function fe(l,h){if(l&1&&(y(0,`clr-control-error`),ie$1(1),pr(2,`date`),v()),l&2){let m=h.error;f(),gt(` Daterange maximum is `,vs(2,1,m.max.toDate()),` `)}}function De(l,h){l&1&&(y(0,`clr-control-error`),ie$1(1,`No valid daterange value!`),v())}var xe=`
<form clrForm>
  <clr-daterangepicker-container>
    <label>Basic demo</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;var Ee=`
<form clrForm>
  <clr-daterangepicker-container [timeSelection]="true">
    <label>Basic demo</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;var Se=`
    <clr-daterangepicker-container class="inline" [timeSelection]="true" [activateSeconds]="true">
      <input clrDaterangepicker type="date" [(ngModel)]="absolute" (ngModelChange)="emitModelChange()"/>
    </clr-daterangepicker-container>
`;var ye=`
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
`;var be=`
<form clrForm>
  <clr-daterangepicker-container>
    <label>Min date: 2023-05-03 AND Max date: 2023-06-20</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" min="2023-05-03" max="2023-06-20" />
    <clr-control-error *clrIfDaterangeError="'min'; error as err">Daterange minimum is {{ err.min.toDate() | date }}</clr-control-error>
    <clr-control-error *clrIfDaterangeError="'max'; error as err">Daterange maximum is {{ err.max.toDate() | date }}</clr-control-error>
  </clr-daterangepicker-container>
</form>
`;var we=`
<form clrForm>
  <clr-daterangepicker-container [presets]="presets">
    <label>Presets</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;var Me=`
<form clrForm>
  <clr-daterangepicker-container [presets]="presetsTime" [timeSelection]="true">
    <label>Presets</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;var Te=`
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
`;var ve=`
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
`;var Ce=[{text:`Last 30 days`,range:()=>({from:new l2(/* @__PURE__ */ new Date).incrementBy(-29),to:new l2(/* @__PURE__ */ new Date)})},{text:`From today`,range:()=>({from:new l2(/* @__PURE__ */ new Date),to:null})},{text:`Until today`,range:()=>({from:null,to:new l2(/* @__PURE__ */ new Date)})},{text:`Clear`,range:()=>({from:null,to:null})}];var ke=[{text:`Last 5 minute`,range:()=>({from:new l2(/* @__PURE__ */ new Date),to:new l2(/* @__PURE__ */ new Date),fromTime:new i3(/* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).getTime()-3e5)),toTime:new i3(/* @__PURE__ */ new Date)})},{text:`Last 1 hour`,range:()=>({from:new l2(/* @__PURE__ */ new Date),to:new l2(/* @__PURE__ */ new Date),fromTime:new i3(/* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).getTime()-36e5)),toTime:new i3(/* @__PURE__ */ new Date)})}];var _e=`
<form clrForm>
  <clr-daterangepicker-container [clrPosition]="'left-top'">
    <label>Position</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;var Pe=`
<form clrForm>
  <clr-daterangepicker-container labelFrom="Van" labelTo="Tot">
    <label>Labels "from" and "to"</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />
  </clr-daterangepicker-container>
</form>
`;var Ie=`
<form clrForm>
  <clr-daterangepicker-container>
    <label>Separator</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" separatorText=" tot " />
  </clr-daterangepicker-container>
</form>
`;var Ae=`
<form clrForm>
  <clr-daterangepicker-container>
    <label>Placeholder</label>
    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" placeholder="Custom placeholder" />
  </clr-daterangepicker-container>
</form>
`;var Le=`
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
`;var I=(()=>{class l extends P{value;valueTime;basicDemo=xe;basicTimeDemo=Ee;minMaxDemo=be;presets=Ce;presetsTime=ke;presetsDemo=we;presetsTimeDemo=Me;presetsTypescriptDemo=Te;presetsTimeTypescriptDemo=ve;positionsDemo=_e;labelsTranslationDemo=Pe;separatorDemo=Ie;placeholderDemo=Ae;validationDemo=Le;modelChangeDemoUsageHtml=Se;modelChangeDemoUsageTs=ye;constructor(){super(`daterangepicker`)}static ɵfac=function(x){return new(x||l)};static ɵcmp=O$1({type:l,selectors:[[`clr-daterangepicker-demo`]],hostVars:4,hostBindings:function(x,i){x&2&&E(`content-area`,!0)(`dox-content-panel`,!0)},features:[ee],decls:530,vars:37,consts:[[3,`title`],[1,`component-summary`],[`id`,`design-guidelines`],[1,`clrweb-DoxMedia`],[1,`clrweb-DoxMedia-block`],[1,`clrweb-DoxMedia-img`],[`src`,`assets/images/documentation/daterangepicker-screenshot.png`,`alt`,`Screenshot of daterangepicker`],[1,`clrweb-DoxMedia-text`],[1,`clr-code`],[1,`table`],[1,`left`],[1,`left`,`clr-hidden-xs-down`],[1,`clr-hidden-xs-down`],[`id`,`code-examples`],[`id`,`examples`],[`clrForm`,``],[`clrDaterangepicker`,``,`type`,`date`,`name`,`daterange`,3,`ngModelChange`,`ngModel`],[3,`clrCode`],[3,`timeSelection`],[`href`,`https://clarity.design/documentation/datepicker`],[`clrDaterangepicker`,``,`type`,`date`,`name`,`daterange`,`min`,`2023-05-03`,`max`,`2023-06-20`,3,`ngModelChange`,`ngModel`],[4,`clrIfDaterangeError`],[1,`clr-row`],[1,`clr-col-12`,`clr-col-md-6`],[`src`,`assets/images/documentation/daterangepicker-presets-screenshot.png`,`alt`,`Screenshot of daterangepicker with presets option`],[3,`presets`],[`clrDaterangepicker`,``,`type`,`date`,`name`,`daterange-preset`,3,`ngModelChange`,`ngModel`],[`clrLanguage`,`typescript`,3,`clrCode`],[3,`presets`,`timeSelection`],[3,`clrPosition`],[`clrDaterangepicker`,``,`type`,`date`,`name`,`daterange-position`,3,`ngModelChange`,`ngModel`],[`labelFrom`,`Van`,`labelTo`,`Tot`],[`clrDaterangepicker`,``,`type`,`date`,`name`,`daterange-labels`,3,`ngModelChange`,`ngModel`],[`clrDaterangepicker`,``,`type`,`date`,`name`,`daterange-separator`,`separatorText`,` tot `,3,`ngModelChange`,`ngModel`],[`clrDaterangepicker`,``,`type`,`date`,`name`,`daterange-placeholder`,`placeholder`,`Custom placeholder`,3,`ngModelChange`,`ngModel`],[`clrDaterangepicker`,``,`type`,`date`,`name`,`daterange-validation`,`min`,`2023-05-03`,`max`,`2023-06-20`,`required`,``,3,`ngModelChange`,`ngModel`]],template:function(x,i){x&1&&(y(0,`clr-doc-wrapper`,0)(1,`article`)(2,`h5`,1),ie$1(3,`DateRangePicker is a popover control for picking a date range value for an input.`),v(),y(4,`div`,2)(5,`h2`),ie$1(6,`Usage`),v(),y(7,`p`),ie$1(8,` Use the daterangepicker whenever you want to select a date range. The default Clarity Date Picker allows selecting only one date. This component uses two Clarity Date Pickers to select a start and end date. As an addition, the time selection can be activated. See options for details. `),v(),y(9,`div`,3)(10,`div`,4)(11,`div`,5),j(12,`img`,6),v()(),y(13,`div`,7)(14,`p`),ie$1(15,`Screenshot of a basic daterangepicker.`),v()()(),y(16,`h3`),ie$1(17,`Summary of Options`),v(),y(18,`h4`)(19,`code`,8),ie$1(20,`clr-daterangepicker-container`),v(),ie$1(21,` element`),v(),y(22,`table`,9)(23,`thead`)(24,`tr`)(25,`th`,10),ie$1(26,`Input`),v(),y(27,`th`,11),ie$1(28,`Values`),v(),y(29,`th`,12),ie$1(30,`Default`),v(),y(31,`th`,10),ie$1(32,`Effect`),v()()(),y(33,`tbody`)(34,`tr`)(35,`td`,10)(36,`strong`),ie$1(37,`[clrPosition]`),v()(),y(38,`td`,11),ie$1(39,`ClrPopoverPosition (from @clr/angular)`),v(),y(40,`td`,12)(41,`code`,8),ie$1(42,`ClrPopoverPosition.BOTTOM_LEFT`),v()(),y(43,`td`,10),ie$1(44,` Set the position of the popover containing the two Date Pickers relative to the input field. `),v()(),y(45,`tr`)(46,`td`,10)(47,`strong`),ie$1(48,`[labelFrom]`),v()(),y(49,`td`,11)(50,`code`,8),ie$1(51,`String`),v()(),y(52,`td`,12)(53,`code`,8),ie$1(54,`'From'`),v()(),y(55,`td`,10),ie$1(56,`Translatable "from" label.`),v()(),y(57,`tr`)(58,`td`,10)(59,`strong`),ie$1(60,`[LabelTo]`),v()(),y(61,`td`,11)(62,`code`,8),ie$1(63,`String`),v()(),y(64,`td`,12)(65,`code`,8),ie$1(66,`'To'`),v()(),y(67,`td`,10),ie$1(68,`Translatable "to" label.`),v()(),y(69,`tr`)(70,`td`,10)(71,`strong`),ie$1(72,`[presets]`),v()(),y(73,`td`,11)(74,`code`,8),ie$1(75,`Array<DaterangePreset>`),v()(),y(76,`td`,12)(77,`code`,8),ie$1(78,`[]`),v()(),y(79,`td`,10),ie$1(80,` List of presets. By default this list is empty, which hides the presets section in the UI. `),v()(),y(81,`tr`)(82,`td`,10)(83,`strong`),ie$1(84,`[timeSelection]`),v()(),y(85,`td`,11)(86,`code`,8),ie$1(87,`Boolean`),v()(),y(88,`td`,12),j(89,`code`,8),v(),y(90,`td`,10),ie$1(91,`Set to true, if time selection should be activated.`),v()(),y(92,`tr`)(93,`td`,10)(94,`strong`),ie$1(95,`[activateSeconds]`),v()(),y(96,`td`,11)(97,`code`,8),ie$1(98,`Boolean`),v()(),y(99,`td`,12),j(100,`code`,8),v(),y(101,`td`,10),ie$1(102,`Set to true, if seconds should be shown on timeselection.`),v()(),y(103,`tr`)(104,`td`,10)(105,`strong`),ie$1(106,`[presetsDateTime]`),v()(),y(107,`td`,11)(108,`code`,8),ie$1(109,`Array<DateTimerangePreset>`),v()(),y(110,`td`,12)(111,`code`,8),ie$1(112,`[]`),v()(),y(113,`td`,10),ie$1(114,` List of time/date presets. By default this list is empty, which hides the presets section in the UI. If you active timeSelection, please only provide presetsDateTime. `),v()()()(),y(115,`h4`)(116,`code`,8),ie$1(117,`clrDaterangepicker`),v(),ie$1(118,` directive`),v(),y(119,`table`,9)(120,`thead`)(121,`tr`)(122,`th`,10),ie$1(123,`Input`),v(),y(124,`th`,11),ie$1(125,`Values`),v(),y(126,`th`,12),ie$1(127,`Default`),v(),y(128,`th`,10),ie$1(129,`Effect`),v()()(),y(130,`tbody`)(131,`tr`)(132,`td`,10)(133,`strong`),ie$1(134,`[min]`),v()(),y(135,`td`,11)(136,`code`,8),ie$1(137,`String`),v()(),y(138,`td`,12),ie$1(139,`N/A`),v(),y(140,`td`,10),ie$1(141,` Sets the earliest acceptable date and must be in the `),y(142,`code`,8),ie$1(143,`YYYY-MM-DD`),v(),ie$1(144,` format. `),v()(),y(145,`tr`)(146,`td`,10)(147,`strong`),ie$1(148,`[max]`),v()(),y(149,`td`,11)(150,`code`,8),ie$1(151,`String`),v()(),y(152,`td`,12),ie$1(153,`N/A`),v(),y(154,`td`,10),ie$1(155,` Sets the latest acceptable date and must be in the `),y(156,`code`,8),ie$1(157,`YYYY-MM-DD`),v(),ie$1(158,` format. `),v()(),y(159,`tr`)(160,`td`,10)(161,`strong`),ie$1(162,`[separatorText]`),v()(),y(163,`td`,11)(164,`code`,8),ie$1(165,`String`),v()(),y(166,`td`,12)(167,`code`,8),ie$1(168,`' - '`),v()(),y(169,`td`,10),ie$1(170,`The value between the "from" and "to" dates is the separator.`),v()(),y(171,`tr`)(172,`td`,10)(173,`strong`),ie$1(174,`[placeholder]`),v()(),y(175,`td`,11)(176,`code`,8),ie$1(177,`String`),v()(),y(178,`td`,12),ie$1(179,` Concat of "from" format, plus separator, plus "to" format.`),j(180,`br`),ie$1(181,` E.g. `),y(182,`code`,8),ie$1(183,`MM/DD/YYYY - MM/DD/YYYY`),v()(),y(184,`td`,10),ie$1(185,`Placeholder attribute for the input.`),v()(),y(186,`tr`)(187,`td`,10)(188,`strong`),ie$1(189,`(valueChange)`),v()(),y(190,`td`,11)(191,`code`,8),ie$1(192,`NullableDaterange | NullableTimerange`),v()(),y(193,`td`,12),ie$1(194,`N/A`),v(),y(195,`td`,10),ie$1(196,`Event triggered when the input value changes.`),v()()()()(),y(197,`div`,13)(198,`h2`,14),ie$1(199,`Code & Examples`),v(),y(200,`h3`)(201,`code`,8),ie$1(202,`clrDaterangepicker`),v(),ie$1(203,` directive`),v(),y(204,`p`),ie$1(205,` To use the daterangepicker, add the `),y(206,`code`,8),ie$1(207,`clrDaterangepicker`),v(),ie$1(208,` directive to an `),y(209,`code`,8),ie$1(210,`input`),v(),ie$1(211,` field. Then, place the input inside the `),y(212,`code`,8),ie$1(213,`clr-daterangepicker-container`),v(),ie$1(214,` container element. `),v(),y(215,`form`,15)(216,`clr-daterangepicker-container`)(217,`label`),ie$1(218,`Basic demo`),v(),y(219,`input`,16),Ai(),oi(`ngModelChange`,function(a){return _i(i.value,a)||(i.value=a),a}),v()()(),j(220,`clr-code-snippet`,17),y(221,`h3`),ie$1(222,`TimeSelection`),v(),y(223,`p`),ie$1(224,` To use the daterangepicker, add the `),y(225,`code`,8),ie$1(226,`clrDaterangepicker`),v(),ie$1(227,` directive to an `),y(228,`code`,8),ie$1(229,`input`),v(),ie$1(230,` field. Then, place the input inside the `),y(231,`code`,8),ie$1(232,`clr-daterangepicker-container`),v(),ie$1(233,` container element. To use the daterangepicker with time selection, set `),y(234,`code`,8),ie$1(235,`[timeSelection]="true"`),v(),ie$1(236,` additionally. The value will be be returned as a NullableTimerange containing time information. `),v(),y(237,`form`,15)(238,`clr-daterangepicker-container`,18)(239,`label`),ie$1(240,`Basic time demo`),v(),y(241,`input`,16),Ai(),oi(`ngModelChange`,function(a){return _i(i.valueTime,a)||(i.valueTime=a),a}),v()()(),j(242,`clr-code-snippet`,17),y(243,`h4`),ie$1(244,`Example usage of ngModelChange`),v(),y(245,`p`),ie$1(246,`See the following code example for consuming and using the time and date from the DateRangePicker`),v(),j(247,`clr-code-snippet`,17)(248,`clr-code-snippet`,17),y(249,`h3`),ie$1(250,`Configuration`),v(),y(251,`h4`),ie$1(252,`Min/Max attributes`),v(),y(253,`p`),ie$1(254,` Just like `),y(255,`a`,19),ie$1(256,`Clarity Date Picker`),v(),ie$1(257,`, you can set earliest and latest acceptable dates. Just like the native HTML5 date spec a `),y(258,`code`,8),ie$1(259,`yyyy-mm-dd`),v(),ie$1(260,` string can be used in the value for min or max. If the max value isn't a possible date then that the input has no max value. Similar for min values, if the string used is not a possible date then the input will not have a min value. `),v(),y(261,`p`),ie$1(262,` Only dates inside the min/max range will be selectable for the input when there is a bound placed for the min or max attribute. `),v(),y(263,`p`),ie$1(264,` Showing validation errors for min & max attributes work the same as Clarity with `),y(265,`code`,8),ie$1(266,`clr-control-error`),v(),ie$1(267,`. Only one big difference, it requires an different directive. Use `),y(268,`code`,8),ie$1(269,`*clrIfDaterangeError`),v(),ie$1(270,` instead of `),y(271,`code`,8),ie$1(272,`*clrIfError`),v(),ie$1(273,`. `),v(),y(274,`form`,15)(275,`clr-daterangepicker-container`)(276,`label`),ie$1(277,`Min & max attributes`),v(),y(278,`input`,20),Ai(),oi(`ngModelChange`,function(a){return _i(i.value,a)||(i.value=a),a}),v(),y(279,`clr-control-helper`),ie$1(280,`Min date: 2023-05-03 AND Max date: 2023-06-20`),v(),Be(281,se,3,3,`clr-control-error`,21)(282,pe,3,3,`clr-control-error`,21),v()(),j(283,`clr-code-snippet`,17),y(284,`h4`),ie$1(285,`Presets`),v(),y(286,`div`,22)(287,`div`,23)(288,`p`),ie$1(289,` To quicker set fixed dateranges, it is possible to set a list of presets. Any preset will create an button in the popover next to the Date Pickers. Once pressed, the preset will fill the "from" and "to" Date Pickers with an hard-coded or dynamic date. You can choose to fill both dates, for example with the last 30 days. Or you can set only one date of the daterange, for example if you want today to be pre-filled. Only when both values are present, the popover will close and update the model. You can set as many presets as you want, but an maximum of 4 is advised. `),v()(),y(290,`div`,23)(291,`div`,3)(292,`div`,4)(293,`div`,5),j(294,`img`,24),v()(),y(295,`div`,7)(296,`p`),ie$1(297,`Screenshot of daterangepicker with presets option.`),v()()()()(),y(298,`p`),ie$1(299,` To add presets, you can use the `),y(300,`code`,8),ie$1(301,`DaterangePreset`),v(),ie$1(302,` interface. It contains an property for text of the button: `),y(303,`code`,8),ie$1(304,`text`),v(),ie$1(305,`. And it contains an function that returns an `),y(306,`code`,8),ie$1(307,`Daterange`),v(),ie$1(308,`, which will be called once the preset button is clicked. `),v(),y(309,`form`,15)(310,`clr-daterangepicker-container`,25)(311,`label`),ie$1(312,`Presets`),v(),y(313,`input`,26),Ai(),oi(`ngModelChange`,function(a){return _i(i.value,a)||(i.value=a),a}),v()()(),j(314,`clr-code-snippet`,17)(315,`clr-code-snippet`,27),y(316,`p`),ie$1(317,`Preset are also available for time selection, see example:`),v(),y(318,`form`,15)(319,`clr-daterangepicker-container`,28)(320,`label`),ie$1(321,`Presets Time`),v(),y(322,`input`,26),Ai(),oi(`ngModelChange`,function(a){return _i(i.value,a)||(i.value=a),a}),v()()(),j(323,`clr-code-snippet`,17)(324,`clr-code-snippet`,27),y(325,`h4`),ie$1(326,`Position`),v(),y(327,`p`),ie$1(328,` It is possible to change the position of the popover, which contains the two Date Pickers. This works the same as the `),y(329,`a`,19),ie$1(330,`Clarity Date Pickers`),v(),ie$1(331,`, although this option is not documented. `),v(),y(332,`p`),ie$1(333,`The `),y(334,`code`,8),ie$1(335,`clrPosition`),v(),ie$1(336,` attribute accepts one of the following strings:`),v(),y(337,`ul`)(338,`li`)(339,`code`,8),ie$1(340,`'bottom-left'`),v()(),y(341,`li`)(342,`code`,8),ie$1(343,`'bottom-right'`),v()(),y(344,`li`)(345,`code`,8),ie$1(346,`'left-bottom'`),v()(),y(347,`li`)(348,`code`,8),ie$1(349,`'left-top'`),v()(),y(350,`li`)(351,`code`,8),ie$1(352,`'right-bottom'`),v()(),y(353,`li`)(354,`code`,8),ie$1(355,`'right-top'`),v()(),y(356,`li`)(357,`code`,8),ie$1(358,`'top-left'`),v()(),y(359,`li`)(360,`code`,8),ie$1(361,`'top-right'`),v()()(),y(362,`form`,15)(363,`clr-daterangepicker-container`,29)(364,`label`),ie$1(365,`Position`),v(),y(366,`input`,30),Ai(),oi(`ngModelChange`,function(a){return _i(i.value,a)||(i.value=a),a}),v()()(),j(367,`clr-code-snippet`,17),y(368,`h3`),ie$1(369,`Internationalization`),v(),y(370,`p`),ie$1(371,` As the Date Pickers inside the popover are `),y(372,`a`,19),ie$1(373,`Clarity Date Pickers`),v(),ie$1(374,`, they use the same locale identifiers supported by Angular for getting the date format, first day of the week, month and day names. These values are used to generate the input field placeholder and the calendar. `),v(),y(375,`h3`),ie$1(376,`Translation`),v(),y(377,`p`),ie$1(378,`The following options are available to help with multilingual applications:`),v(),y(379,`h4`),ie$1(380,`Labels "from" and "to"`),v(),y(381,`p`),ie$1(382,` Both the "from" and "to" input labels inside the modal are translatable via respectively `),y(383,`code`,8),ie$1(384,`labelFrom`),v(),ie$1(385,` and `),y(386,`code`,8),ie$1(387,`labelTo`),v(),ie$1(388,` attributes. `),v(),y(389,`form`,15)(390,`clr-daterangepicker-container`,31)(391,`label`),ie$1(392,`Labels "from" and "to"`),v(),y(393,`input`,32),Ai(),oi(`ngModelChange`,function(a){return _i(i.value,a)||(i.value=a),a}),v()()(),j(394,`clr-code-snippet`,17),y(395,`h4`)(396,`code`,8),ie$1(397,`separatorText`),v(),ie$1(398,` attribute`),v(),y(399,`p`),ie$1(400,` The value between the "from" and "to" dates is the separator. By default it uses a dash `),y(401,`code`,8),ie$1(402,`-`),v(),ie$1(403,` character, surrounded by a whitespace. This attribute is used in the input field, the default placeholder and the hover titles. Any whitespace between the dates you'll need to add to this separator option.`),j(404,`br`),ie$1(405,` The example below uses the Dutch word for "until" between the "from" and "to" dates. `),v(),y(406,`form`,15)(407,`clr-daterangepicker-container`)(408,`label`),ie$1(409,`Separator`),v(),y(410,`input`,33),Ai(),oi(`ngModelChange`,function(a){return _i(i.value,a)||(i.value=a),a}),v()()(),j(411,`clr-code-snippet`,17),y(412,`h4`)(413,`code`,8),ie$1(414,`placeholder`),v(),ie$1(415,` attribute`),v(),y(416,`p`),ie$1(417,`A whole different placeholder can be set via the `),y(418,`code`,8),ie$1(419,`placeholder`),v(),ie$1(420,` attribute.`),v(),y(421,`form`,15)(422,`clr-daterangepicker-container`)(423,`label`),ie$1(424,`Placeholder`),v(),y(425,`input`,34),Ai(),oi(`ngModelChange`,function(a){return _i(i.value,a)||(i.value=a),a}),v()()(),j(426,`clr-code-snippet`,17),y(427,`h3`),ie$1(428,`Validation`),v(),y(429,`p`),ie$1(430,` The daterangepicker has multiple validations. Each validation is enabled by default (if conditions are met), but can individually disabled. `),v(),y(431,`p`),ie$1(432,`The following validations are present:`),v(),y(433,`ul`)(434,`li`),ie$1(435,` Daterange is required. Key `),y(436,`code`,8),ie$1(437,`required`),v(),ie$1(438,`. When the `),y(439,`code`,8),ie$1(440,`input`),v(),ie$1(441,` element contains the `),y(442,`code`,8),ie$1(443,`required`),v(),ie$1(444,` attribute, this validation is enabled. When the control is touched and no value is present, this validation is activated. `),j(445,`br`),ie$1(446,` This validation is also activated when the model receives an partial daterange. `),j(447,`br`),ie$1(448,` This validation can be disabled with `),y(449,`code`,8),ie$1(450,`[clrDaterangeRequired]="false"`),v(),ie$1(451,`. `),v(),y(452,`li`),ie$1(453,` Date "from" is after "to" date. Key `),y(454,`code`,8),ie$1(455,`fromIsAfterTo`),v(),ie$1(456,`. This validation is always enabled, and triggered when the "from" is not after the "to" date. `),j(457,`br`),ie$1(458,` This validation can be disabled with `),y(459,`code`,8),ie$1(460,`[clrDaterangeOrder]="false"`),v(),ie$1(461,`. `),v(),y(462,`li`),ie$1(463,` Daterange cannot start before minium date. Key `),y(464,`code`,8),ie$1(465,`min`),v(),ie$1(466,`. This validation is enabled when the `),y(467,`code`,8),ie$1(468,`min`),v(),ie$1(469,` property is set. `),j(470,`br`),ie$1(471,` This validation can be disabled with `),y(472,`code`,8),ie$1(473,`[clrDaterangeMin]="false"`),v(),ie$1(474,`. `),v(),y(475,`li`),ie$1(476,` Daterange cannot end after maximum date. Key `),y(477,`code`,8),ie$1(478,`max`),v(),ie$1(479,`. This validation is enabled when the `),y(480,`code`,8),ie$1(481,`max`),v(),ie$1(482,` property is set. `),j(483,`br`),ie$1(484,` This validation can be disabled with `),y(485,`code`,8),ie$1(486,`[clrDaterangeMax]="false"`),v(),ie$1(487,`. `),v(),y(488,`li`),ie$1(489,` Invalid daterange. Key `),y(490,`code`,8),ie$1(491,`invalid`),v(),ie$1(492,`. When the manually entered daterange in the `),y(493,`code`,8),ie$1(494,`input`),v(),ie$1(495,` element is invalid, this validation is activated. `),v()(),y(496,`p`),ie$1(497,` Showing validation errors work the same as Clarity with `),y(498,`code`,8),ie$1(499,`clr-control-error`),v(),ie$1(500,`. Only one big difference, it requires an different directive. Use `),y(501,`code`,8),ie$1(502,`*clrIfDaterangeError`),v(),ie$1(503,` instead of `),y(504,`code`,8),ie$1(505,`*clrIfError`),v(),ie$1(506,`. `),v(),y(507,`p`),ie$1(508,` The `),y(509,`code`,8),ie$1(510,`clr-control-helper`),v(),ie$1(511,` and `),y(512,`code`,8),ie$1(513,`clr-control-success`),v(),ie$1(514,` are also supported. `),v(),y(515,`form`,15)(516,`clr-daterangepicker-container`)(517,`label`),ie$1(518,`Validation`),v(),y(519,`input`,35),Ai(),oi(`ngModelChange`,function(a){return _i(i.value,a)||(i.value=a),a}),v(),y(520,`clr-control-helper`),ie$1(521,`Helper text.`),v(),Be(522,ge,2,0,`clr-control-error`,21)(523,ue,2,0,`clr-control-error`,21)(524,he,3,3,`clr-control-error`,21)(525,fe,3,3,`clr-control-error`,21)(526,De,2,0,`clr-control-error`,21),y(527,`clr-control-success`),ie$1(528,`✅ Valid.`),v()()(),j(529,`clr-code-snippet`,17),v()()()),x&2&&(A(`title`,i.title),f(219),ri(`ngModel`,i.value),Ri(),f(),A(`clrCode`,i.basicDemo),f(18),A(`timeSelection`,!0),f(3),ri(`ngModel`,i.valueTime),Ri(),f(),A(`clrCode`,i.basicTimeDemo),f(5),A(`clrCode`,i.modelChangeDemoUsageHtml),f(),A(`clrCode`,i.modelChangeDemoUsageTs),f(30),ri(`ngModel`,i.value),Ri(),f(3),A(`clrIfDaterangeError`,`min`),f(),A(`clrIfDaterangeError`,`max`),f(),A(`clrCode`,i.minMaxDemo),f(27),A(`presets`,i.presets),f(3),ri(`ngModel`,i.value),Ri(),f(),A(`clrCode`,i.presetsDemo),f(),A(`clrCode`,i.presetsTypescriptDemo),f(4),A(`presets`,i.presetsTime)(`timeSelection`,!0),f(3),ri(`ngModel`,i.value),Ri(),f(),A(`clrCode`,i.presetsTimeDemo),f(),A(`clrCode`,i.presetsTimeTypescriptDemo),f(39),A(`clrPosition`,`left-top`),f(3),ri(`ngModel`,i.value),Ri(),f(),A(`clrCode`,i.positionsDemo),f(26),ri(`ngModel`,i.value),Ri(),f(),A(`clrCode`,i.labelsTranslationDemo),f(16),ri(`ngModel`,i.value),Ri(),f(),A(`clrCode`,i.separatorDemo),f(14),ri(`ngModel`,i.value),Ri(),f(),A(`clrCode`,i.placeholderDemo),f(93),ri(`ngModel`,i.value),Ri(),f(3),A(`clrIfDaterangeError`,`required`),f(),A(`clrIfDaterangeError`,`fromIsAfterTo`),f(),A(`clrIfDaterangeError`,`min`),f(),A(`clrIfDaterangeError`,`max`),f(),A(`clrIfDaterangeError`,`invalid`),f(3),A(`clrCode`,i.validationDemo))},dependencies:[O,Zn,zoe,Jr,mr,joe,D7,R1,$R,ot,Xe,kj,Pj,Oj,J9e,Ao,yo,i8,iM,ko,O$2,nM,tM,eM,lM,K,$oe,xhe,II,_e$1,ie,aA],encapsulation:2,changeDetection:1})}return l})();var tt=(()=>{class l{static ɵfac=function(x){return new(x||l)};static ɵmod=$({type:l});static ɵinj=B({imports:[K,Zn,$oe,xhe,II,_e$1,ie,Lp.forChild([{path:``,component:I}]),I]})}return l})();export{tt as DaterangepickerDemoModule};