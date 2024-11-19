"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[932],{72551:(H,m,n)=>{n.r(m),n.d(m,{DaterangepickerDemoModule:()=>$});var p=n(60177),s=n(84341),g=n(5928),F=n(62491),o=n(36366),k=n(63275),E=n(20786),h=n(2985),e=n(93953),u=n(87620),D=n(91464);function f(a,i){if(1&a&&(e.j41(0,"clr-control-error"),e.EFF(1),e.nI1(2,"date"),e.k0s()),2&a){const l=i.error;e.R7$(),e.SpI(" Daterange minimum is ",e.bMT(2,1,l.min.toDate())," ")}}function j(a,i){if(1&a&&(e.j41(0,"clr-control-error"),e.EFF(1),e.nI1(2,"date"),e.k0s()),2&a){const l=i.error;e.R7$(),e.SpI(" Daterange maximum is ",e.bMT(2,1,l.max.toDate())," ")}}function b(a,i){1&a&&(e.j41(0,"clr-control-error"),e.EFF(1,"Daterange is mandatory!"),e.k0s())}function T(a,i){1&a&&(e.j41(0,"clr-control-error"),e.EFF(1,' Date "from" must be before date "to"! '),e.k0s())}function M(a,i){if(1&a&&(e.j41(0,"clr-control-error"),e.EFF(1),e.nI1(2,"date"),e.k0s()),2&a){const l=i.error;e.R7$(),e.SpI(" Daterange minimum is ",e.bMT(2,1,l.min.toDate())," ")}}function w(a,i){if(1&a&&(e.j41(0,"clr-control-error"),e.EFF(1),e.nI1(2,"date"),e.k0s()),2&a){const l=i.error;e.R7$(),e.SpI(" Daterange maximum is ",e.bMT(2,1,l.max.toDate())," ")}}function v(a,i){1&a&&(e.j41(0,"clr-control-error"),e.EFF(1,"No valid daterange value!"),e.k0s())}const Y=[{text:"Last 30 days",range:()=>({from:new o.IMA(new Date).incrementBy(-29),to:new o.IMA(new Date)})},{text:"From today",range:()=>({from:new o.IMA(new Date),to:null})},{text:"Until today",range:()=>({from:null,to:new o.IMA(new Date)})},{text:"Clear",range:()=>({from:null,to:null})}],x=[{text:"Last 5 minute",range:()=>({from:new o.IMA(new Date),to:new o.IMA(new Date),fromTime:new o.rJw(new Date((new Date).getTime()-3e5)),toTime:new o.rJw(new Date)})},{text:"Last 1 hour",range:()=>({from:new o.IMA(new Date),to:new o.IMA(new Date),fromTime:new o.rJw(new Date((new Date).getTime()-36e5)),toTime:new o.rJw(new Date)})}];let B=(()=>{class a extends h.S{value;valueTime;basicDemo='\n<form clrForm>\n  <clr-daterangepicker-container>\n    <label>Basic demo</label>\n    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />\n  </clr-daterangepicker-container>\n</form>\n';basicTimeDemo='\n<form clrForm>\n  <clr-daterangepicker-container [timeSelection]="true">\n    <label>Basic demo</label>\n    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />\n  </clr-daterangepicker-container>\n</form>\n';minMaxDemo='\n<form clrForm>\n  <clr-daterangepicker-container>\n    <label>Min date: 2023-05-03 AND Max date: 2023-06-20</label>\n    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" min="2023-05-03" max="2023-06-20" />\n    <clr-control-error *clrIfDaterangeError="\'min\'; error as err">Daterange minimum is {{ err.min.toDate() | date }}</clr-control-error>\n    <clr-control-error *clrIfDaterangeError="\'max\'; error as err">Daterange maximum is {{ err.max.toDate() | date }}</clr-control-error>\n  </clr-daterangepicker-container>\n</form>\n';presets=Y;presetsTime=x;presetsDemo='\n<form clrForm>\n  <clr-daterangepicker-container [presets]="presets">\n    <label>Presets</label>\n    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />\n  </clr-daterangepicker-container>\n</form>\n';presetsTimeDemo='\n<form clrForm>\n  <clr-daterangepicker-container [presets]="presetsTime" [timeSelection]="true">\n    <label>Presets</label>\n    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />\n  </clr-daterangepicker-container>\n</form>\n';presetsTypescriptDemo="\npresets: Array<DaterangePreset> = [\n  {\n    text: 'Last 30 days',\n    range: () => ({\n      from: new DayModel(new Date()).incrementBy(-29),\n      to: new DayModel(new Date()),\n    }),\n  },\n  {\n    text: 'From today',\n    range: () => ({\n      from: new DayModel(new Date()),\n      to: null,\n    }),\n  },\n  {\n    text: 'Until today',\n    range: () => ({\n      from: null,\n      to: new DayModel(new Date()),\n    }),\n  },\n  {\n    text: 'Clear',\n    range: () => ({\n      from: null,\n      to: null,\n    }),\n  },\n];\n";presetsTimeTypescriptDemo="\npresets: Array<DaterangePreset> = [\n  {\n    text: 'Last 5 minute',\n    range: () => ({\n      from: new DayModel(new Date()),\n      to: new DayModel(new Date()),\n      fromTime: new TimeModel(new Date(new Date().getTime() - 5000 * 60)),\n      toTime: new TimeModel(new Date()),\n    }),\n  },\n  {\n    text: 'Last 1 hour',\n    range: () => ({\n      from: new DayModel(new Date()),\n      to: new DayModel(new Date()),\n      fromTime: new TimeModel(new Date(new Date().getTime() - 60000 * 60)),\n      toTime: new TimeModel(new Date()),\n    }),\n  },\n];\n";positionsDemo='\n<form clrForm>\n  <clr-daterangepicker-container [clrPosition]="\'left-top\'">\n    <label>Position</label>\n    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />\n  </clr-daterangepicker-container>\n</form>\n';labelsTranslationDemo='\n<form clrForm>\n  <clr-daterangepicker-container labelFrom="Van" labelTo="Tot">\n    <label>Labels "from" and "to"</label>\n    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" />\n  </clr-daterangepicker-container>\n</form>\n';separatorDemo='\n<form clrForm>\n  <clr-daterangepicker-container>\n    <label>Separator</label>\n    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" separatorText=" tot " />\n  </clr-daterangepicker-container>\n</form>\n';placeholderDemo='\n<form clrForm>\n  <clr-daterangepicker-container>\n    <label>Placeholder</label>\n    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" placeholder="Custom placeholder" />\n  </clr-daterangepicker-container>\n</form>\n';validationDemo='\n<form clrForm>\n  <clr-daterangepicker-container>\n    <label>Validation</label>\n    <input clrDaterangepicker type="date" name="demo" [(ngModel)]="demo" min="2023-05-03" max="2023-06-20" required />\n    <clr-control-helper>Helper text.</clr-control-helper>\n    <clr-control-error *clrIfDaterangeError="\'required\'">Daterange is mandatory!</clr-control-error>\n    <clr-control-error *clrIfDaterangeError="\'fromIsAfterTo\'">Date "from" must be before date "to"!</clr-control-error>\n    <clr-control-error *clrIfDaterangeError="\'min\'; error as err">Daterange minimum is {{ err.min.toDate() | date }}</clr-control-error>\n    <clr-control-error *clrIfDaterangeError="\'max\'; error as err">Daterange maximum is {{ err.max.toDate() | date }}</clr-control-error>\n    <clr-control-error *clrIfDaterangeError="\'invalid\'">No valid daterange value!</clr-control-error>\n    <clr-control-success>\u2705 Valid.</clr-control-success>\n  </clr-daterangepicker-container>\n</form>\n';constructor(){super("daterangepicker")}static \u0275fac=function(d){return new(d||a)};static \u0275cmp=e.VBU({type:a,selectors:[["clr-daterangepicker-demo"]],hostVars:4,hostBindings:function(d,t){2&d&&e.AVh("content-area",!0)("dox-content-panel",!0)},features:[e.Vt3],decls:549,vars:35,consts:[[3,"title"],[1,"component-summary"],["id","design-guidelines"],[1,"clrweb-DoxMedia"],[1,"clrweb-DoxMedia-block"],[1,"clrweb-DoxMedia-img"],["src","assets/images/documentation/daterangepicker-screenshot.png","alt","Screenshot of daterangepicker"],[1,"clrweb-DoxMedia-text"],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],["id","code-examples"],["id","examples"],["clrForm",""],["clrDaterangepicker","","type","date","name","daterange",3,"ngModelChange","ngModel"],[3,"clrCode"],[3,"timeSelection"],["href","https://clarity.design/documentation/datepicker"],["clrDaterangepicker","","type","date","name","daterange","min","2023-05-03","max","2023-06-20",3,"ngModelChange","ngModel"],[4,"clrIfDaterangeError"],[1,"clr-row"],[1,"clr-col-12","clr-col-md-6"],["src","assets/images/documentation/daterangepicker-presets-screenshot.png","alt","Screenshot of daterangepicker with presets option"],[3,"presets"],["clrDaterangepicker","","type","date","name","daterange-preset",3,"ngModelChange","ngModel"],["clrLanguage","typescript",3,"clrCode"],[3,"presets","timeSelection"],[3,"clrPosition"],["clrDaterangepicker","","type","date","name","daterange-position",3,"ngModelChange","ngModel"],["labelFrom","Van","labelTo","Tot"],["clrDaterangepicker","","type","date","name","daterange-labels",3,"ngModelChange","ngModel"],["clrDaterangepicker","","type","date","name","daterange-separator","separatorText"," tot ",3,"ngModelChange","ngModel"],["clrDaterangepicker","","type","date","name","daterange-placeholder","placeholder","Custom placeholder",3,"ngModelChange","ngModel"],["clrDaterangepicker","","type","date","name","daterange-validation","min","2023-05-03","max","2023-06-20","required","",3,"ngModelChange","ngModel"]],template:function(d,t){1&d&&(e.j41(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e.EFF(3,"DateRangePicker is a popover control for picking a date range value for an input."),e.k0s(),e.j41(4,"div",2)(5,"h2"),e.EFF(6,"Usage"),e.k0s(),e.j41(7,"p"),e.EFF(8," Use the daterangepicker whenever you want to select a date range. The default Clarity Date Picker allows selecting only one date. This component uses two Clarity Date Pickers to select a start and end date. As an addition, the time selection can be activated. See options for details. "),e.k0s(),e.j41(9,"div",3)(10,"div",4)(11,"div",5),e.nrm(12,"img",6),e.k0s()(),e.j41(13,"div",7)(14,"p"),e.EFF(15,"Screenshot of a basic daterangepicker."),e.k0s()()(),e.j41(16,"h3"),e.EFF(17,"Summary of Options"),e.k0s(),e.j41(18,"h4")(19,"code",8),e.EFF(20,"clr-daterangepicker-container"),e.k0s(),e.EFF(21," element"),e.k0s(),e.j41(22,"table",9)(23,"thead")(24,"tr")(25,"th",10),e.EFF(26,"Input"),e.k0s(),e.j41(27,"th",11),e.EFF(28,"Values"),e.k0s(),e.j41(29,"th",12),e.EFF(30,"Default"),e.k0s(),e.j41(31,"th",10),e.EFF(32,"Effect"),e.k0s()()(),e.j41(33,"tbody")(34,"tr")(35,"td",10)(36,"strong"),e.EFF(37,"[clrPosition]"),e.k0s()(),e.j41(38,"td",11),e.EFF(39," One of the following strings: "),e.j41(40,"ul")(41,"li")(42,"code",8),e.EFF(43,"'bottom-left'"),e.k0s()(),e.j41(44,"li")(45,"code",8),e.EFF(46,"'bottom-right'"),e.k0s()(),e.j41(47,"li")(48,"code",8),e.EFF(49,"'left-bottom'"),e.k0s()(),e.j41(50,"li")(51,"code",8),e.EFF(52,"'left-top'"),e.k0s()(),e.j41(53,"li")(54,"code",8),e.EFF(55,"'right-bottom'"),e.k0s()(),e.j41(56,"li")(57,"code",8),e.EFF(58,"'right-top'"),e.k0s()(),e.j41(59,"li")(60,"code",8),e.EFF(61,"'top-left'"),e.k0s()(),e.j41(62,"li")(63,"code",8),e.EFF(64,"'top-right'"),e.k0s()()()(),e.j41(65,"td",12)(66,"code",8),e.EFF(67,"'bottom-left'"),e.k0s()(),e.j41(68,"td",10),e.EFF(69," Set the position of the popover containing the two Date Pickers relative to the input field. "),e.k0s()(),e.j41(70,"tr")(71,"td",10)(72,"strong"),e.EFF(73,"[labelFrom]"),e.k0s()(),e.j41(74,"td",11)(75,"code",8),e.EFF(76,"String"),e.k0s()(),e.j41(77,"td",12)(78,"code",8),e.EFF(79,"'From'"),e.k0s()(),e.j41(80,"td",10),e.EFF(81,'Translatable "from" label.'),e.k0s()(),e.j41(82,"tr")(83,"td",10)(84,"strong"),e.EFF(85,"[LabelTo]"),e.k0s()(),e.j41(86,"td",11)(87,"code",8),e.EFF(88,"String"),e.k0s()(),e.j41(89,"td",12)(90,"code",8),e.EFF(91,"'To'"),e.k0s()(),e.j41(92,"td",10),e.EFF(93,'Translatable "to" label.'),e.k0s()(),e.j41(94,"tr")(95,"td",10)(96,"strong"),e.EFF(97,"[presets]"),e.k0s()(),e.j41(98,"td",11)(99,"code",8),e.EFF(100,"Array<DaterangePreset>"),e.k0s()(),e.j41(101,"td",12)(102,"code",8),e.EFF(103,"[]"),e.k0s()(),e.j41(104,"td",10),e.EFF(105," List of presets. By default this list is empty, which hides the presets section in the UI. "),e.k0s()(),e.j41(106,"tr")(107,"td",10)(108,"strong"),e.EFF(109,"[timeSelection]"),e.k0s()(),e.j41(110,"td",11)(111,"code",8),e.EFF(112,"Boolean"),e.k0s()(),e.j41(113,"td",12),e.nrm(114,"code",8),e.k0s(),e.j41(115,"td",10),e.EFF(116,"Set to true, if time selection should be activated."),e.k0s()(),e.j41(117,"tr")(118,"td",10)(119,"strong"),e.EFF(120,"[activateSeconds]"),e.k0s()(),e.j41(121,"td",11)(122,"code",8),e.EFF(123,"Boolean"),e.k0s()(),e.j41(124,"td",12),e.nrm(125,"code",8),e.k0s(),e.j41(126,"td",10),e.EFF(127,"Set to true, if seconds should be shown on timeselection."),e.k0s()(),e.j41(128,"tr")(129,"td",10)(130,"strong"),e.EFF(131,"[presetsDateTime]"),e.k0s()(),e.j41(132,"td",11)(133,"code",8),e.EFF(134,"Array<DateTimerangePreset>"),e.k0s()(),e.j41(135,"td",12)(136,"code",8),e.EFF(137,"[]"),e.k0s()(),e.j41(138,"td",10),e.EFF(139," List of time/date presets. By default this list is empty, which hides the presets section in the UI. If you active timeSelection, please only provide presetsDateTime. "),e.k0s()()()(),e.j41(140,"h4")(141,"code",8),e.EFF(142,"clrDaterangepicker"),e.k0s(),e.EFF(143," directive"),e.k0s(),e.j41(144,"table",9)(145,"thead")(146,"tr")(147,"th",10),e.EFF(148,"Input"),e.k0s(),e.j41(149,"th",11),e.EFF(150,"Values"),e.k0s(),e.j41(151,"th",12),e.EFF(152,"Default"),e.k0s(),e.j41(153,"th",10),e.EFF(154,"Effect"),e.k0s()()(),e.j41(155,"tbody")(156,"tr")(157,"td",10)(158,"strong"),e.EFF(159,"[min]"),e.k0s()(),e.j41(160,"td",11)(161,"code",8),e.EFF(162,"String"),e.k0s()(),e.j41(163,"td",12),e.EFF(164,"N/A"),e.k0s(),e.j41(165,"td",10),e.EFF(166," Sets the earliest acceptable date and must be in the "),e.j41(167,"code",8),e.EFF(168,"YYYY-MM-DD"),e.k0s(),e.EFF(169," format. "),e.k0s()(),e.j41(170,"tr")(171,"td",10)(172,"strong"),e.EFF(173,"[max]"),e.k0s()(),e.j41(174,"td",11)(175,"code",8),e.EFF(176,"String"),e.k0s()(),e.j41(177,"td",12),e.EFF(178,"N/A"),e.k0s(),e.j41(179,"td",10),e.EFF(180," Sets the latest acceptable date and must be in the "),e.j41(181,"code",8),e.EFF(182,"YYYY-MM-DD"),e.k0s(),e.EFF(183," format. "),e.k0s()(),e.j41(184,"tr")(185,"td",10)(186,"strong"),e.EFF(187,"[separatorText]"),e.k0s()(),e.j41(188,"td",11)(189,"code",8),e.EFF(190,"String"),e.k0s()(),e.j41(191,"td",12)(192,"code",8),e.EFF(193,"' - '"),e.k0s()(),e.j41(194,"td",10),e.EFF(195,'The value between the "from" and "to" dates is the separator.'),e.k0s()(),e.j41(196,"tr")(197,"td",10)(198,"strong"),e.EFF(199,"[placeholder]"),e.k0s()(),e.j41(200,"td",11)(201,"code",8),e.EFF(202,"String"),e.k0s()(),e.j41(203,"td",12),e.EFF(204,' Concat of "from" format, plus separator, plus "to" format.'),e.nrm(205,"br"),e.EFF(206," E.g. "),e.j41(207,"code",8),e.EFF(208,"MM/DD/YYYY - MM/DD/YYYY"),e.k0s()(),e.j41(209,"td",10),e.EFF(210,"Placeholder attribute for the input."),e.k0s()(),e.j41(211,"tr")(212,"td",10)(213,"strong"),e.EFF(214,"(valueChange)"),e.k0s()(),e.j41(215,"td",11)(216,"code",8),e.EFF(217,"NullableDaterange | NullableTimerange"),e.k0s()(),e.j41(218,"td",12),e.EFF(219,"N/A"),e.k0s(),e.j41(220,"td",10),e.EFF(221,"Event triggered when the input value changes."),e.k0s()()()()(),e.j41(222,"div",13)(223,"h2",14),e.EFF(224,"Code & Examples"),e.k0s(),e.j41(225,"h3")(226,"code",8),e.EFF(227,"clrDaterangepicker"),e.k0s(),e.EFF(228," directive"),e.k0s(),e.j41(229,"p"),e.EFF(230," To use the daterangepicker, add the "),e.j41(231,"code",8),e.EFF(232,"clrDaterangepicker"),e.k0s(),e.EFF(233," directive to an "),e.j41(234,"code",8),e.EFF(235,"input"),e.k0s(),e.EFF(236," field. Then, place the input inside the "),e.j41(237,"code",8),e.EFF(238,"clr-daterangepicker-container"),e.k0s(),e.EFF(239," container element. "),e.k0s(),e.j41(240,"form",15)(241,"clr-daterangepicker-container")(242,"label"),e.EFF(243,"Basic demo"),e.k0s(),e.j41(244,"input",16),e.mxI("ngModelChange",function(r){return e.DH7(t.value,r)||(t.value=r),r}),e.k0s()()(),e.nrm(245,"clr-code-snippet",17),e.j41(246,"h3"),e.EFF(247,"TimeSelection"),e.k0s(),e.j41(248,"p"),e.EFF(249," To use the daterangepicker, add the "),e.j41(250,"code",8),e.EFF(251,"clrDaterangepicker"),e.k0s(),e.EFF(252," directive to an "),e.j41(253,"code",8),e.EFF(254,"input"),e.k0s(),e.EFF(255," field. Then, place the input inside the "),e.j41(256,"code",8),e.EFF(257,"clr-daterangepicker-container"),e.k0s(),e.EFF(258," container element. To use the daterangepicker with time selection, set "),e.j41(259,"code",8),e.EFF(260,'[timeSelection]="true"'),e.k0s(),e.EFF(261," additionally. The value will be be returned as a NullableTimerange containing time information. "),e.k0s(),e.j41(262,"form",15)(263,"clr-daterangepicker-container",18)(264,"label"),e.EFF(265,"Basic time demo"),e.k0s(),e.j41(266,"input",16),e.mxI("ngModelChange",function(r){return e.DH7(t.valueTime,r)||(t.valueTime=r),r}),e.k0s()()(),e.nrm(267,"clr-code-snippet",17),e.j41(268,"h3"),e.EFF(269,"Configuration"),e.k0s(),e.j41(270,"h4"),e.EFF(271,"Min/Max attributes"),e.k0s(),e.j41(272,"p"),e.EFF(273," Just like "),e.j41(274,"a",19),e.EFF(275,"Clarity Date Picker"),e.k0s(),e.EFF(276,", you can set earliest and latest acceptable dates. Just like the native HTML5 date spec a "),e.j41(277,"code",8),e.EFF(278,"yyyy-mm-dd"),e.k0s(),e.EFF(279," string can be used in the value for min or max. If the max value isn't a possible date then that the input has no max value. Similar for min values, if the string used is not a possible date then the input will not have a min value. "),e.k0s(),e.j41(280,"p"),e.EFF(281," Only dates inside the min/max range will be selectable for the input when there is a bound placed for the min or max attribute. "),e.k0s(),e.j41(282,"p"),e.EFF(283," Showing validation errors for min & max attributes work the same as Clarity with "),e.j41(284,"code",8),e.EFF(285,"clr-control-error"),e.k0s(),e.EFF(286,". Only one big difference, it requires an different directive. Use "),e.j41(287,"code",8),e.EFF(288,"*clrIfDaterangeError"),e.k0s(),e.EFF(289," instead of "),e.j41(290,"code",8),e.EFF(291,"*clrIfError"),e.k0s(),e.EFF(292,". "),e.k0s(),e.j41(293,"form",15)(294,"clr-daterangepicker-container")(295,"label"),e.EFF(296,"Min & max attributes"),e.k0s(),e.j41(297,"input",20),e.mxI("ngModelChange",function(r){return e.DH7(t.value,r)||(t.value=r),r}),e.k0s(),e.j41(298,"clr-control-helper"),e.EFF(299,"Min date: 2023-05-03 AND Max date: 2023-06-20"),e.k0s(),e.DNE(300,f,3,3,"clr-control-error",21)(301,j,3,3,"clr-control-error",21),e.k0s()(),e.nrm(302,"clr-code-snippet",17),e.j41(303,"h4"),e.EFF(304,"Presets"),e.k0s(),e.j41(305,"div",22)(306,"div",23)(307,"p"),e.EFF(308,' To quicker set fixed dateranges, it is possible to set a list of presets. Any preset will create an button in the popover next to the Date Pickers. Once pressed, the preset will fill the "from" and "to" Date Pickers with an hard-coded or dynamic date. You can choose to fill both dates, for example with the last 30 days. Or you can set only one date of the daterange, for example if you want today to be pre-filled. Only when both values are present, the popover will close and update the model. You can set as many presets as you want, but an maximum of 4 is advised. '),e.k0s()(),e.j41(309,"div",23)(310,"div",3)(311,"div",4)(312,"div",5),e.nrm(313,"img",24),e.k0s()(),e.j41(314,"div",7)(315,"p"),e.EFF(316,"Screenshot of daterangepicker with presets option."),e.k0s()()()()(),e.j41(317,"p"),e.EFF(318," To add presets, you can use the "),e.j41(319,"code",8),e.EFF(320,"DaterangePreset"),e.k0s(),e.EFF(321," interface. It contains an property for text of the button: "),e.j41(322,"code",8),e.EFF(323,"text"),e.k0s(),e.EFF(324,". And it contains an function that returns an "),e.j41(325,"code",8),e.EFF(326,"Daterange"),e.k0s(),e.EFF(327,", which will be called once the preset button is clicked. "),e.k0s(),e.j41(328,"form",15)(329,"clr-daterangepicker-container",25)(330,"label"),e.EFF(331,"Presets"),e.k0s(),e.j41(332,"input",26),e.mxI("ngModelChange",function(r){return e.DH7(t.value,r)||(t.value=r),r}),e.k0s()()(),e.nrm(333,"clr-code-snippet",17)(334,"clr-code-snippet",27),e.j41(335,"p"),e.EFF(336,"Preset are also available for time selection, see example:"),e.k0s(),e.j41(337,"form",15)(338,"clr-daterangepicker-container",28)(339,"label"),e.EFF(340,"Presets Time"),e.k0s(),e.j41(341,"input",26),e.mxI("ngModelChange",function(r){return e.DH7(t.value,r)||(t.value=r),r}),e.k0s()()(),e.nrm(342,"clr-code-snippet",17)(343,"clr-code-snippet",27),e.j41(344,"h4"),e.EFF(345,"Position"),e.k0s(),e.j41(346,"p"),e.EFF(347," It is possible to change the position of the popover, which contains the two Date Pickers. This works the same as the "),e.j41(348,"a",19),e.EFF(349,"Clarity Date Pickers"),e.k0s(),e.EFF(350,", although this option is not documented. "),e.k0s(),e.j41(351,"p"),e.EFF(352,"The "),e.j41(353,"code",8),e.EFF(354,"clrPosition"),e.k0s(),e.EFF(355," attribute accepts one of the following strings:"),e.k0s(),e.j41(356,"ul")(357,"li")(358,"code",8),e.EFF(359,"'bottom-left'"),e.k0s()(),e.j41(360,"li")(361,"code",8),e.EFF(362,"'bottom-right'"),e.k0s()(),e.j41(363,"li")(364,"code",8),e.EFF(365,"'left-bottom'"),e.k0s()(),e.j41(366,"li")(367,"code",8),e.EFF(368,"'left-top'"),e.k0s()(),e.j41(369,"li")(370,"code",8),e.EFF(371,"'right-bottom'"),e.k0s()(),e.j41(372,"li")(373,"code",8),e.EFF(374,"'right-top'"),e.k0s()(),e.j41(375,"li")(376,"code",8),e.EFF(377,"'top-left'"),e.k0s()(),e.j41(378,"li")(379,"code",8),e.EFF(380,"'top-right'"),e.k0s()()(),e.j41(381,"form",15)(382,"clr-daterangepicker-container",29)(383,"label"),e.EFF(384,"Position"),e.k0s(),e.j41(385,"input",30),e.mxI("ngModelChange",function(r){return e.DH7(t.value,r)||(t.value=r),r}),e.k0s()()(),e.nrm(386,"clr-code-snippet",17),e.j41(387,"h3"),e.EFF(388,"Internationalization"),e.k0s(),e.j41(389,"p"),e.EFF(390," As the Date Pickers inside the popover are "),e.j41(391,"a",19),e.EFF(392,"Clarity Date Pickers"),e.k0s(),e.EFF(393,", they use the same locale identifiers supported by Angular for getting the date format, first day of the week, month and day names. These values are used to generate the input field placeholder and the calendar. "),e.k0s(),e.j41(394,"h3"),e.EFF(395,"Translation"),e.k0s(),e.j41(396,"p"),e.EFF(397,"The following options are available to help with multilingual applications:"),e.k0s(),e.j41(398,"h4"),e.EFF(399,'Labels "from" and "to"'),e.k0s(),e.j41(400,"p"),e.EFF(401,' Both the "from" and "to" input labels inside the modal are translatable via respectively '),e.j41(402,"code",8),e.EFF(403,"labelFrom"),e.k0s(),e.EFF(404," and "),e.j41(405,"code",8),e.EFF(406,"labelTo"),e.k0s(),e.EFF(407," attributes. "),e.k0s(),e.j41(408,"form",15)(409,"clr-daterangepicker-container",31)(410,"label"),e.EFF(411,'Labels "from" and "to"'),e.k0s(),e.j41(412,"input",32),e.mxI("ngModelChange",function(r){return e.DH7(t.value,r)||(t.value=r),r}),e.k0s()()(),e.nrm(413,"clr-code-snippet",17),e.j41(414,"h4")(415,"code",8),e.EFF(416,"separatorText"),e.k0s(),e.EFF(417," attribute"),e.k0s(),e.j41(418,"p"),e.EFF(419,' The value between the "from" and "to" dates is the separator. By default it uses a dash '),e.j41(420,"code",8),e.EFF(421,"-"),e.k0s(),e.EFF(422," character, surrounded by a whitespace. This attribute is used in the input field, the default placeholder and the hover titles. Any whitespace between the dates you'll need to add to this separator option."),e.nrm(423,"br"),e.EFF(424,' The example below uses the Dutch word for "until" between the "from" and "to" dates. '),e.k0s(),e.j41(425,"form",15)(426,"clr-daterangepicker-container")(427,"label"),e.EFF(428,"Separator"),e.k0s(),e.j41(429,"input",33),e.mxI("ngModelChange",function(r){return e.DH7(t.value,r)||(t.value=r),r}),e.k0s()()(),e.nrm(430,"clr-code-snippet",17),e.j41(431,"h4")(432,"code",8),e.EFF(433,"placeholder"),e.k0s(),e.EFF(434," attribute"),e.k0s(),e.j41(435,"p"),e.EFF(436,"A whole different placeholder can be set via the "),e.j41(437,"code",8),e.EFF(438,"placeholder"),e.k0s(),e.EFF(439," attribute."),e.k0s(),e.j41(440,"form",15)(441,"clr-daterangepicker-container")(442,"label"),e.EFF(443,"Placeholder"),e.k0s(),e.j41(444,"input",34),e.mxI("ngModelChange",function(r){return e.DH7(t.value,r)||(t.value=r),r}),e.k0s()()(),e.nrm(445,"clr-code-snippet",17),e.j41(446,"h3"),e.EFF(447,"Validation"),e.k0s(),e.j41(448,"p"),e.EFF(449," The daterangepicker has multiple validations. Each validation is enabled by default (if conditions are met), but can individually disabled. "),e.k0s(),e.j41(450,"p"),e.EFF(451,"The following validations are present:"),e.k0s(),e.j41(452,"ul")(453,"li"),e.EFF(454," Daterange is required. Key "),e.j41(455,"code",8),e.EFF(456,"required"),e.k0s(),e.EFF(457,". When the "),e.j41(458,"code",8),e.EFF(459,"input"),e.k0s(),e.EFF(460," element contains the "),e.j41(461,"code",8),e.EFF(462,"required"),e.k0s(),e.EFF(463," attribute, this validation is enabled. When the control is touched and no value is present, this validation is activated. "),e.nrm(464,"br"),e.EFF(465," This validation is also activated when the model receives an partial daterange. "),e.nrm(466,"br"),e.EFF(467," This validation can be disabled with "),e.j41(468,"code",8),e.EFF(469,'[clrDaterangeRequired]="false"'),e.k0s(),e.EFF(470,". "),e.k0s(),e.j41(471,"li"),e.EFF(472,' Date "from" is after "to" date. Key '),e.j41(473,"code",8),e.EFF(474,"fromIsAfterTo"),e.k0s(),e.EFF(475,'. This validation is always enabled, and triggered when the "from" is not after the "to" date. '),e.nrm(476,"br"),e.EFF(477," This validation can be disabled with "),e.j41(478,"code",8),e.EFF(479,'[clrDaterangeOrder]="false"'),e.k0s(),e.EFF(480,". "),e.k0s(),e.j41(481,"li"),e.EFF(482," Daterange cannot start before minium date. Key "),e.j41(483,"code",8),e.EFF(484,"min"),e.k0s(),e.EFF(485,". This validation is enabled when the "),e.j41(486,"code",8),e.EFF(487,"min"),e.k0s(),e.EFF(488," property is set. "),e.nrm(489,"br"),e.EFF(490," This validation can be disabled with "),e.j41(491,"code",8),e.EFF(492,'[clrDaterangeMin]="false"'),e.k0s(),e.EFF(493,". "),e.k0s(),e.j41(494,"li"),e.EFF(495," Daterange cannot end after maximum date. Key "),e.j41(496,"code",8),e.EFF(497,"max"),e.k0s(),e.EFF(498,". This validation is enabled when the "),e.j41(499,"code",8),e.EFF(500,"max"),e.k0s(),e.EFF(501," property is set. "),e.nrm(502,"br"),e.EFF(503," This validation can be disabled with "),e.j41(504,"code",8),e.EFF(505,'[clrDaterangeMax]="false"'),e.k0s(),e.EFF(506,". "),e.k0s(),e.j41(507,"li"),e.EFF(508," Invalid daterange. Key "),e.j41(509,"code",8),e.EFF(510,"invalid"),e.k0s(),e.EFF(511,". When the manually entered daterange in the "),e.j41(512,"code",8),e.EFF(513,"input"),e.k0s(),e.EFF(514," element is invalid, this validation is activated. "),e.k0s()(),e.j41(515,"p"),e.EFF(516," Showing validation errors work the same as Clarity with "),e.j41(517,"code",8),e.EFF(518,"clr-control-error"),e.k0s(),e.EFF(519,". Only one big difference, it requires an different directive. Use "),e.j41(520,"code",8),e.EFF(521,"*clrIfDaterangeError"),e.k0s(),e.EFF(522," instead of "),e.j41(523,"code",8),e.EFF(524,"*clrIfError"),e.k0s(),e.EFF(525,". "),e.k0s(),e.j41(526,"p"),e.EFF(527," The "),e.j41(528,"code",8),e.EFF(529,"clr-control-helper"),e.k0s(),e.EFF(530," and "),e.j41(531,"code",8),e.EFF(532,"clr-control-success"),e.k0s(),e.EFF(533," are also supported. "),e.k0s(),e.j41(534,"form",15)(535,"clr-daterangepicker-container")(536,"label"),e.EFF(537,"Validation"),e.k0s(),e.j41(538,"input",35),e.mxI("ngModelChange",function(r){return e.DH7(t.value,r)||(t.value=r),r}),e.k0s(),e.j41(539,"clr-control-helper"),e.EFF(540,"Helper text."),e.k0s(),e.DNE(541,b,2,0,"clr-control-error",21)(542,T,2,0,"clr-control-error",21)(543,M,3,3,"clr-control-error",21)(544,w,3,3,"clr-control-error",21)(545,v,2,0,"clr-control-error",21),e.j41(546,"clr-control-success"),e.EFF(547,"\u2705 Valid."),e.k0s()()(),e.nrm(548,"clr-code-snippet",17),e.k0s()()()),2&d&&(e.Y8G("title",t.title),e.R7$(244),e.R50("ngModel",t.value),e.R7$(),e.Y8G("clrCode",t.basicDemo),e.R7$(18),e.Y8G("timeSelection",!0),e.R7$(3),e.R50("ngModel",t.valueTime),e.R7$(),e.Y8G("clrCode",t.basicTimeDemo),e.R7$(30),e.R50("ngModel",t.value),e.R7$(3),e.Y8G("clrIfDaterangeError","min"),e.R7$(),e.Y8G("clrIfDaterangeError","max"),e.R7$(),e.Y8G("clrCode",t.minMaxDemo),e.R7$(27),e.Y8G("presets",t.presets),e.R7$(3),e.R50("ngModel",t.value),e.R7$(),e.Y8G("clrCode",t.presetsDemo),e.R7$(),e.Y8G("clrCode",t.presetsTypescriptDemo),e.R7$(4),e.Y8G("presets",t.presetsTime)("timeSelection",!0),e.R7$(3),e.R50("ngModel",t.value),e.R7$(),e.Y8G("clrCode",t.presetsTimeDemo),e.R7$(),e.Y8G("clrCode",t.presetsTimeTypescriptDemo),e.R7$(39),e.Y8G("clrPosition","left-top"),e.R7$(3),e.R50("ngModel",t.value),e.R7$(),e.Y8G("clrCode",t.positionsDemo),e.R7$(26),e.R50("ngModel",t.value),e.R7$(),e.Y8G("clrCode",t.labelsTranslationDemo),e.R7$(16),e.R50("ngModel",t.value),e.R7$(),e.Y8G("clrCode",t.separatorDemo),e.R7$(14),e.R50("ngModel",t.value),e.R7$(),e.Y8G("clrCode",t.placeholderDemo),e.R7$(93),e.R50("ngModel",t.value),e.R7$(3),e.Y8G("clrIfDaterangeError","required"),e.R7$(),e.Y8G("clrIfDaterangeError","fromIsAfterTo"),e.R7$(),e.Y8G("clrIfDaterangeError","min"),e.R7$(),e.Y8G("clrIfDaterangeError","max"),e.R7$(),e.Y8G("clrIfDaterangeError","invalid"),e.R7$(3),e.Y8G("clrCode",t.validationDemo))},dependencies:[s.qT,s.me,s.BC,s.cb,s.YS,s.vS,s.cV,F.aZZ,F.Hpg,F.Kwi,F.bnk,F.mDd,u.z,D.u,o.NQI,o.b2Q,o.$1U,o.b6P,o.tRp,o.dEy,o._cx,o.IQD,o.NNE,p.vh],encapsulation:2})}return a})(),$=(()=>{class a{static \u0275fac=function(d){return new(d||a)};static \u0275mod=e.$C({type:a});static \u0275inj=e.G2t({imports:[p.MD,s.YN,s.X1,F.PuD,F.t5G,k.u,E.g,g.iI.forChild([{path:"",component:B}]),o.P8i]})}return a})()}}]);