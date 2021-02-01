(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{vTEu:function(e,t,l){"use strict";l.r(t),l.d(t,"QuickListDemoModule",function(){return m});var c=l("3Pt+"),b=l("ofXK"),r=l("8MG2"),n=l("JsA7"),i=l("tyNb"),o=l("XPsC"),s=l("6Y1o"),a=l("N+3j"),d=l("fXoL"),u=l("0G9f"),O=l("vAyd");function P(e,t){1&e&&(d.Pb(0,"clr-control-error"),d.Ac(1,"Please select a value"),d.Ob())}function A(e,t){1&e&&(d.Pb(0,"clr-control-error"),d.Ac(1,"Please enter a value"),d.Ob())}function p(e,t){if(1&e&&(d.Pb(0,"clr-select-container"),d.Kb(1,"label",22),d.Pb(2,"select",23),d.Wb("ngModelChange",function(e){return t.$implicit.salutation=e}),d.Pb(3,"option",24),d.Ac(4,"Mr."),d.Ob(),d.Pb(5,"option",25),d.Ac(6,"Mrs."),d.Ob(),d.Pb(7,"option",26),d.Ac(8,"Ms."),d.Ob(),d.Ob(),d.yc(9,P,2,0,"clr-control-error",27),d.Ob(),d.Pb(10,"clr-input-container"),d.Kb(11,"label",22),d.Pb(12,"input",28),d.Wb("ngModelChange",function(e){return t.$implicit.name=e}),d.Ob(),d.yc(13,A,2,0,"clr-control-error",27),d.Ob()),2&e){const e=t.$implicit;d.yb(1),d.gc("hidden",!0),d.yb(1),d.gc("name","salutation"+e.id)("ngModel",e.salutation),d.yb(7),d.gc("clrIfError","required"),d.yb(2),d.gc("hidden",!0),d.yb(1),d.gc("ngModel",e.name)("name","last"+e.id),d.yb(1),d.gc("clrIfError","required")}}let h=(()=>{class e extends a.a{constructor(){super("quick-list"),this.htmlExample1='\n<form clrForm>\n  <clr-quick-list\n      [clrAddLabel]="getAddLabel()"\n      [clrAllValues]="possibleOptions"\n      [clrBlankOption]="BLANK_OPTION"\n      [clrMandatory]="true"\n      [clrValues]="selectedOptionsMandatory"\n      class="clr-form-control clr-row"\n      clrControlClasses="clr-col-lg-3 clr-col-md-4 clr-col-sm-5">\n    <label class="clr-control-label clr-col-md-2 clr-col-sm-3 required">Option list</label>\n  </clr-quick-list>\n</form>\n',this.htmlExample2='\nBLANK_OPTION: ClrQuickListValue<string> = { id: "-BLANK-", label: "- Select -", value: null };\noptions: Array<string> = [\n  "First option",\n  "Second option",\n  "Third Option",\n  "Fourth option",\n  "Fifth option"\n];\npossibleOptions: Array<ClrQuickListValue<string>> = this.options.map(op=>\n  new class implements ClrQuickListValue<string> {\n    id = op.substr(0, 3);\n    label = op;\n    value = op;\n  }());\n',this.htmlExampleGeneric='\n<form clrForm #form="ngForm">\n  <clr-generic-quick-list [clrAddLabel]="\'ADD\'" [clrAddPossible]="form.valid" [clrAllItems]="allItemsGeneric"\n      [clrMandatory]="\'true\'" class="clr-row" clrControlClasses="clr-col-md-6 clr-col-xl-4">\n      <label class="clr-control-label clr-col-md-2 required">Generic Quick List</label>\n      <ng-template let-item>\n          \x3c!-- Custom content below --\x3e\n          <clr-select-container>\n            <label [hidden]="true"></label>\n            <select required clrSelect class="clr-col-12" [name]="\'salutation\' + item.id"\n                    [(ngModel)]="item.salutation">\n                <option value="mr">Mr.</option>\n                <option value="mrs">Mrs.</option>\n                <option value="ms">Ms.</option>\n            </select>\n            <clr-control-error *clrIfError="\'required\'">Please select a value</clr-control-error>\n          </clr-select-container>\n          <clr-input-container>\n              <label [hidden]="true"></label>\n              <input class="clr-col-12" placeholder="Name*" clrInput [(ngModel)]="item.name"\n              required [name]="\'last\' + item.id" />\n              <clr-control-error *clrIfError="\'required\'">Please enter a value</clr-control-error>\n          </clr-input-container>\n          \x3c!-- Custom content above --\x3e\n      </ng-template>\n  </clr-generic-quick-list>\n</form>\n',this.angularExampleGeneric="\ninterface ClrNameQuickListItem extends ClrGenericQuickListItem {\n    salutation: string;\n    name: string;\n};\n\nallItemsGeneric = [<ClrNameQuickListItem>{ id: 1 }];\n",this.BLANK_OPTION={id:"-BLANK-",label:"- Select -",value:null},this.options=["First option","Second option","Third Option","Fourth option","Fifth option"],this.possibleOptions=this.options.map(e=>new class{constructor(){this.id=e.substr(0,3),this.label=e,this.value=e}}),this.selectedOptionsMandatory=[],this.selectedOptionsNotMandatory=[],this.allItemsGeneric=[{id:1}]}getAddLabel(){return"ADD OPTION"}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=d.Db({type:e,selectors:[["app-quick-list"]],hostVars:4,hostBindings:function(e,t){2&e&&d.Bb("content-area",!0)("dox-content-panel",!0)},features:[d.vb],decls:340,vars:18,consts:[[3,"title"],[1,"component-summary"],["id","design-guidelines"],["id","usage"],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],[1,"clr-hidden-xs-down"],["id","code-examples"],["id","examples"],["clrForm",""],["clrControlClasses","clr-col-lg-3 clr-col-md-4 clr-col-sm-5",1,"clr-form-control","clr-row",3,"clrAddLabel","clrAllValues","clrBlankOption","clrMandatory","clrValues"],[1,"clr-control-label","clr-col-md-2","clr-col-sm-3","required"],["clrControlClasses","clr-col-lg-3 clr-col-md-4 clr-col-sm-5",1,"clr-form-control","clr-row",3,"clrAddLabel","clrAllValues","clrBlankOption","clrValues"],[1,"clr-control-label","clr-col-md-2","clr-col-sm-3"],[3,"clrCode"],["clrLanguage","typescript",3,"clrCode"],["form","ngForm"],["clrControlClasses","clr-col-md-6 clr-col-xl-4",1,"clr-row",3,"clrAddLabel","clrAddPossible","clrAllItems","clrMandatory"],[1,"clr-control-label","clr-col-md-2","required"],[3,"hidden"],["required","","clrSelect","",1,"clr-col-12",3,"name","ngModel","ngModelChange"],["value","mr"],["value","mrs"],["value","ms"],[4,"clrIfError"],["placeholder","Name*","clrInput","","required","",1,"clr-col-12",3,"ngModel","name","ngModelChange"]],template:function(e,t){if(1&e&&(d.Pb(0,"clr-doc-wrapper",0),d.Pb(1,"article"),d.Pb(2,"h5",1),d.Ac(3,"The quick list of Clarity Addons extends the default select component by an Angular Component which allows the developer use a multi selection list."),d.Ob(),d.Pb(4,"div",2),d.Pb(5,"h3",3),d.Ac(6,"Usage"),d.Ob(),d.Pb(7,"p"),d.Ac(8,"Use the Quick List whenever you want to allow the user to select multiple option from a suggestion list. The user is able to select option by scrolling over the list. By clicking the Add button below the list he is able to make additional selection."),d.Ob(),d.Pb(9,"p"),d.Ac(10,"The component uses a predefined type "),d.Pb(11,"code",4),d.Ac(12,"ClrQuickListValue\u227aT\u227b "),d.Ob(),d.Ac(13," that encapsulates the real data (values), the developer should previously warp his list inside ClrQuickListValue. So the component uses generics "),d.Pb(14,"code",4),d.Ac(15,"T"),d.Ob(),d.Ac(16," for the type of the contained values."),d.Ob(),d.Pb(17,"table",5),d.Pb(18,"thead"),d.Pb(19,"tr"),d.Pb(20,"th",6),d.Ac(21,"attribute"),d.Ob(),d.Pb(22,"th",7),d.Ac(23,"Values"),d.Ob(),d.Pb(24,"th",6),d.Ac(25,"Effect"),d.Ob(),d.Ob(),d.Ob(),d.Pb(26,"tbody"),d.Pb(27,"tr"),d.Pb(28,"td",6),d.Pb(29,"b"),d.Ac(30,"label"),d.Ob(),d.Pb(31,"div",8),d.Ac(32,"Type: string"),d.Ob(),d.Ob(),d.Pb(33,"td",7),d.Ac(34,"string"),d.Ob(),d.Pb(35,"td",6),d.Ac(36,"the label that will be displayed for each option"),d.Ob(),d.Ob(),d.Pb(37,"tr"),d.Pb(38,"td",6),d.Pb(39,"b"),d.Ac(40,"value"),d.Ob(),d.Pb(41,"div",8),d.Ac(42,"Type: string"),d.Ob(),d.Ob(),d.Pb(43,"td",7),d.Pb(44,"code",4),d.Ac(45,"T"),d.Ob(),d.Ob(),d.Pb(46,"td",6),d.Ac(47,"the value behind each option"),d.Ob(),d.Ob(),d.Pb(48,"tr"),d.Pb(49,"td",6),d.Pb(50,"b"),d.Ac(51,"id"),d.Ob(),d.Pb(52,"div",8),d.Ac(53,"Type: string"),d.Ob(),d.Ob(),d.Pb(54,"td",7),d.Ac(55,"string"),d.Ob(),d.Pb(56,"td",6),d.Ac(57,"the ids over the list should be unique"),d.Ob(),d.Ob(),d.Ob(),d.Ob(),d.Pb(58,"h3"),d.Ac(59,"Summary of Options"),d.Ob(),d.Pb(60,"table",5),d.Pb(61,"thead"),d.Pb(62,"tr"),d.Pb(63,"th",6),d.Ac(64,"Input/Output"),d.Ob(),d.Pb(65,"th",7),d.Ac(66,"Values"),d.Ob(),d.Pb(67,"th",9),d.Ac(68,"Default"),d.Ob(),d.Pb(69,"th",6),d.Ac(70,"Effect"),d.Ob(),d.Ob(),d.Ob(),d.Pb(71,"tbody"),d.Pb(72,"tr"),d.Pb(73,"td",6),d.Pb(74,"b"),d.Ac(75,"[clrBlankOption]"),d.Ob(),d.Pb(76,"div",8),d.Ac(77,"Type: ClrQuickListValue"),d.Ob(),d.Pb(78,"div",8),d.Ac(79,"Default: default"),d.Ob(),d.Ob(),d.Pb(80,"td",7),d.Ac(81,"ClrQuickListValue"),d.Ob(),d.Pb(82,"td",9),d.Ac(83,"default"),d.Ob(),d.Pb(84,"td",6),d.Ac(85,"The object that should refer to the no-option selected"),d.Ob(),d.Ob(),d.Pb(86,"tr"),d.Pb(87,"td",6),d.Pb(88,"b"),d.Ac(89,"[clrAllValues]"),d.Ob(),d.Pb(90,"div",8),d.Ac(91,"Type: List of ClrQuickListValue"),d.Ob(),d.Pb(92,"div",8),d.Ac(93,"Default: false"),d.Ob(),d.Ob(),d.Pb(94,"td",7),d.Ac(95,"List of ClrQuickListValue"),d.Ob(),d.Pb(96,"td",9),d.Ac(97,"empty"),d.Ob(),d.Pb(98,"td",6),d.Ac(99,"Contains all the options list"),d.Ob(),d.Ob(),d.Pb(100,"tr"),d.Pb(101,"td",6),d.Pb(102,"b"),d.Ac(103,"[clrValues]"),d.Ob(),d.Pb(104,"div",8),d.Ac(105,"Type: List of ClrQuickListValue"),d.Ob(),d.Pb(106,"div",8),d.Ac(107,"Default: undefined"),d.Ob(),d.Ob(),d.Pb(108,"td",7),d.Ac(109,"List of ClrQuickListValue"),d.Ob(),d.Pb(110,"td",9),d.Ac(111,"empty List"),d.Ob(),d.Pb(112,"td",6),d.Ac(113,"The value of the preselected option"),d.Ob(),d.Ob(),d.Pb(114,"tr"),d.Pb(115,"td",6),d.Pb(116,"b"),d.Ac(117,"[clrAddLabel]"),d.Ob(),d.Pb(118,"div",8),d.Ac(119,"Type: string"),d.Ob(),d.Pb(120,"div",8),d.Ac(121,"Default: ADD OPTION"),d.Ob(),d.Ob(),d.Pb(122,"td",7),d.Ac(123,"string"),d.Ob(),d.Pb(124,"td",9),d.Ac(125,"ADD OPTION"),d.Ob(),d.Pb(126,"td",6),d.Ac(127,"Label for the add button"),d.Ob(),d.Ob(),d.Pb(128,"tr"),d.Pb(129,"td",6),d.Pb(130,"b"),d.Ac(131,"[clrMandatory]"),d.Ob(),d.Pb(132,"div",8),d.Ac(133,"Type: boolean"),d.Ob(),d.Pb(134,"div",8),d.Ac(135,"Default: false"),d.Ob(),d.Ob(),d.Pb(136,"td",7),d.Ac(137,"boolean"),d.Ob(),d.Pb(138,"td",9),d.Ac(139,"false"),d.Ob(),d.Pb(140,"td",6),d.Ac(141,"Decides whether at least one option should be selected. If mandatory, the quick-list will always display at least one field. "),d.Ob(),d.Ob(),d.Pb(142,"tr"),d.Pb(143,"td",6),d.Pb(144,"b"),d.Ac(145,"(clrValuesChanged)"),d.Ob(),d.Pb(146,"div",8),d.Ac(147,"Type: String"),d.Ob(),d.Pb(148,"div",8),d.Ac(149,"Default: undefined"),d.Ob(),d.Ob(),d.Pb(150,"td",7),d.Ac(151,"List of ClrQuickListValue"),d.Ob(),d.Pb(152,"td",9),d.Ac(153,"undefined"),d.Ob(),d.Pb(154,"td",6),d.Ac(155,"Event which returns the user's selected options whenever the list changes"),d.Ob(),d.Ob(),d.Pb(156,"tr"),d.Pb(157,"td",6),d.Pb(158,"b"),d.Ac(159,"(clrEmptyOptionAdded)"),d.Ob(),d.Pb(160,"div",8),d.Ac(161,"Type: void"),d.Ob(),d.Pb(162,"div",8),d.Ac(163,"Default: undefined"),d.Ob(),d.Ob(),d.Pb(164,"td",7),d.Ac(165,"void"),d.Ob(),d.Pb(166,"td",9),d.Ac(167,"undefined"),d.Ob(),d.Pb(168,"td",6),d.Ac(169,"Event which triggers on the add button clicked"),d.Ob(),d.Ob(),d.Ob(),d.Ob(),d.Ob(),d.Pb(170,"div",10),d.Pb(171,"h3",11),d.Ac(172,"Code & Examples"),d.Ob(),d.Pb(173,"h4"),d.Ac(174,"Mandatory use-case"),d.Ob(),d.Pb(175,"form",12),d.Pb(176,"clr-quick-list",13),d.Pb(177,"label",14),d.Ac(178,"Mandatory list"),d.Ob(),d.Ob(),d.Ob(),d.Pb(179,"h4"),d.Ac(180,"Optional use-case"),d.Ob(),d.Pb(181,"form",12),d.Pb(182,"clr-quick-list",15),d.Pb(183,"label",16),d.Ac(184,"Optional list"),d.Ob(),d.Ob(),d.Ob(),d.Pb(185,"h4"),d.Ac(186,"Code snippet"),d.Ob(),d.Kb(187,"clr-code-snippet",17),d.Kb(188,"clr-code-snippet",18),d.Ob(),d.Pb(189,"h2"),d.Ac(190,"Generic Quick List"),d.Ob(),d.Pb(191,"h5",1),d.Ac(192,"The generic quick list provides the possibility to input the same data structure multiple times."),d.Ob(),d.Pb(193,"div",2),d.Pb(194,"h3",3),d.Ac(195,"Usage"),d.Ob(),d.Pb(196,"p"),d.Ac(197," This component provides a generic way to input a list of data. The components in a row are fully customizable by the user of the component. If you use standard clarity components all the features are fully enabled (validation, form support, ...). "),d.Ob(),d.Pb(198,"p"),d.Ac(199," To use the component you must use a type which inherits from the predefined type "),d.Pb(200,"code",4),d.Ac(201,"ClrGenericQuickListItem"),d.Ob(),d.Ac(202," for the values array. This type currently only requires an id, which will be filled with a random number on add. "),d.Ob(),d.Pb(203,"h3"),d.Ac(204,"Summary of Options"),d.Ob(),d.Pb(205,"table",5),d.Pb(206,"thead"),d.Pb(207,"tr"),d.Pb(208,"th",6),d.Ac(209,"Input/Output"),d.Ob(),d.Pb(210,"th",7),d.Ac(211,"Values"),d.Ob(),d.Pb(212,"th",9),d.Ac(213,"Default"),d.Ob(),d.Pb(214,"th",6),d.Ac(215,"Effect"),d.Ob(),d.Ob(),d.Ob(),d.Pb(216,"tbody"),d.Pb(217,"tr"),d.Pb(218,"td",6),d.Pb(219,"b"),d.Ac(220,"[clrAllItems]"),d.Ob(),d.Pb(221,"div",8),d.Ac(222,"Type: Array of T extends ClrGenericQuickListItem"),d.Ob(),d.Pb(223,"div",8),d.Ac(224,"Default: []"),d.Ob(),d.Ob(),d.Pb(225,"td",7),d.Ac(226,"Array of T extends ClrGenericQuickListItem"),d.Ob(),d.Pb(227,"td",9),d.Ac(228,"[]"),d.Ob(),d.Pb(229,"td",6),d.Ac(230,"All Items which will be shown in the generic quick list"),d.Ob(),d.Ob(),d.Pb(231,"tr"),d.Pb(232,"td",6),d.Pb(233,"b"),d.Ac(234,"[clrAddLabel]"),d.Ob(),d.Pb(235,"div",8),d.Ac(236,"Type: string"),d.Ob(),d.Pb(237,"div",8),d.Ac(238,"Default: ADD (Translate me)"),d.Ob(),d.Ob(),d.Pb(239,"td",7),d.Ac(240,"string"),d.Ob(),d.Pb(241,"td",9),d.Ac(242,"ADD (Translate me)"),d.Ob(),d.Pb(243,"td",6),d.Ac(244,"Label for the 'add' button"),d.Ob(),d.Ob(),d.Pb(245,"tr"),d.Pb(246,"td",6),d.Pb(247,"b"),d.Ac(248,"[clrAddPossible]"),d.Ob(),d.Pb(249,"div",8),d.Ac(250,"Type: boolean"),d.Ob(),d.Pb(251,"div",8),d.Ac(252,"Default: true"),d.Ob(),d.Ob(),d.Pb(253,"td",7),d.Ac(254,"boolean"),d.Ob(),d.Pb(255,"td",9),d.Ac(256,"true"),d.Ob(),d.Pb(257,"td",6),d.Ac(258,"Whether the 'add' button is enabled or disabled"),d.Ob(),d.Ob(),d.Pb(259,"tr"),d.Pb(260,"td",6),d.Pb(261,"b"),d.Ac(262,"[clrBlankItem]"),d.Ob(),d.Pb(263,"div",8),d.Ac(264,"Type: T extends ClrGenericQuickListItem"),d.Ob(),d.Pb(265,"div",8),d.Ac(266,"Default: {}"),d.Ob(),d.Ob(),d.Pb(267,"td",7),d.Ac(268,"T extends ClrGenericQuickListItem"),d.Ob(),d.Pb(269,"td",9),d.Ac(270,"{}"),d.Ob(),d.Pb(271,"td",6),d.Ac(272,"The item which will be added when clicking the 'add' button"),d.Ob(),d.Ob(),d.Pb(273,"tr"),d.Pb(274,"td",6),d.Pb(275,"b"),d.Ac(276,"[clrControlClasses]"),d.Ob(),d.Pb(277,"div",8),d.Ac(278,"Type: string"),d.Ob(),d.Pb(279,"div",8),d.Ac(280,'Default: ""'),d.Ob(),d.Ob(),d.Pb(281,"td",7),d.Ac(282,"string"),d.Ob(),d.Pb(283,"td",9),d.Ac(284,'""'),d.Ob(),d.Pb(285,"td",6),d.Ac(286,"CSS classes used for the controls"),d.Ob(),d.Ob(),d.Pb(287,"tr"),d.Pb(288,"td",6),d.Pb(289,"b"),d.Ac(290,"[clrMandatory]"),d.Ob(),d.Pb(291,"div",8),d.Ac(292,"Type: boolean"),d.Ob(),d.Pb(293,"div",8),d.Ac(294,"Default: false"),d.Ob(),d.Ob(),d.Pb(295,"td",7),d.Ac(296,"boolean"),d.Ob(),d.Pb(297,"td",9),d.Ac(298,"false"),d.Ob(),d.Pb(299,"td",6),d.Ac(300,"Decides whether at least one quick-list row needs to be present. If true, the generic quick-list will always display at least one row "),d.Ob(),d.Ob(),d.Pb(301,"tr"),d.Pb(302,"td",6),d.Pb(303,"b"),d.Ac(304,"(clrAdded)"),d.Ob(),d.Pb(305,"div",8),d.Ac(306,"Type: T extends ClrGenericQuickListItem"),d.Ob(),d.Kb(307,"div",8),d.Ob(),d.Pb(308,"td",7),d.Ac(309,"T extends ClrGenericQuickListItem"),d.Ob(),d.Kb(310,"td",9),d.Pb(311,"td",6),d.Ac(312,"Event which returns the newly added item"),d.Ob(),d.Ob(),d.Pb(313,"tr"),d.Pb(314,"td",6),d.Pb(315,"b"),d.Ac(316,"(clrRemoved)"),d.Ob(),d.Pb(317,"div",8),d.Ac(318,"Type: T extends ClrGenericQuickListItem"),d.Ob(),d.Kb(319,"div",8),d.Ob(),d.Pb(320,"td",7),d.Ac(321,"T extends ClrGenericQuickListItem"),d.Ob(),d.Kb(322,"td",9),d.Pb(323,"td",6),d.Ac(324,"Event which returns the removed item"),d.Ob(),d.Ob(),d.Ob(),d.Ob(),d.Ob(),d.Pb(325,"div",10),d.Pb(326,"h3",11),d.Ac(327,"Code & Examples"),d.Ob(),d.Pb(328,"h4"),d.Ac(329,"Mandatory use-case"),d.Ob(),d.Pb(330,"form",12,19),d.Pb(332,"clr-generic-quick-list",20),d.Pb(333,"label",21),d.Ac(334,"Generic Quick List"),d.Ob(),d.yc(335,p,14,8,"ng-template"),d.Ob(),d.Ob(),d.Pb(336,"h4"),d.Ac(337,"Code snippet"),d.Ob(),d.Kb(338,"clr-code-snippet",17),d.Kb(339,"clr-code-snippet",18),d.Ob(),d.Ob(),d.Ob()),2&e){const e=d.oc(331);d.gc("title",t.title),d.yb(176),d.gc("clrAddLabel",t.getAddLabel())("clrAllValues",t.possibleOptions)("clrBlankOption",t.BLANK_OPTION)("clrMandatory",!0)("clrValues",t.selectedOptionsMandatory),d.yb(6),d.gc("clrAddLabel",t.getAddLabel())("clrAllValues",t.possibleOptions)("clrBlankOption",t.BLANK_OPTION)("clrValues",t.selectedOptionsNotMandatory),d.yb(5),d.gc("clrCode",t.htmlExample1),d.yb(1),d.gc("clrCode",t.htmlExample2),d.yb(144),d.gc("clrAddLabel","ADD")("clrAddPossible",e.valid)("clrAllItems",t.allItemsGeneric)("clrMandatory","true"),d.yb(6),d.gc("clrCode",t.htmlExampleGeneric),d.yb(1),d.gc("clrCode",t.angularExampleGeneric)}},directives:[u.a,c.B,c.o,c.p,r.y,s.G,r.G,O.a,s.o,r.X,c.x,c.w,r.W,c.n,c.q,c.s,c.A,r.C,r.F,s.U,c.b,r.E,r.m],encapsulation:2}),e})(),m=(()=>{class e{}return e.\u0275mod=d.Hb({type:e}),e.\u0275inj=d.Gb({factory:function(t){return new(t||e)},imports:[[b.c,c.h,r.a,o.a,n.a,i.g.forChild([{path:"",component:h}]),s.b]]}),e})()}}]);