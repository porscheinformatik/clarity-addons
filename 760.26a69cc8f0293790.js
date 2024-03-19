"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[760],{75760:(S,u,a)=>{a.r(u),a.d(u,{MultilingualInputDemoModule:()=>T});var m=a(60177),r=a(84341),p=a(338),o=a(57519),i=a(69002),F=a(63275),E=a(20786),h=a(2985),e=a(54438),k=a(87620),f=a(91464);const g=()=>({updateOn:"blur"});let R=(()=>{class n extends h.S{templateExample='\n<clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data1"\n    [ngModelOptions]="{ updateOn: \'blur\' }" clrRequiredAllMultilang clrControlClasses="clr-col-md-5" name="template1">\n    <label class="clr-col-md-2 clr-required-mark">Template</label>\n    <clr-control-error>Please translate in every language!</clr-control-error>\n    <clr-control-helper>Helper text</clr-control-helper>\n</clr-multilingual-input>\n<clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data2"\n    [ngModelOptions]="{ updateOn: \'blur\' }" clrRequiredAllMultilang clrControlClasses="clr-col-md-5" name="template2">\n    <label class="clr-col-md-2 clr-required-mark">Template</label>\n    <clr-control-error>Please translate in every language!</clr-control-error>\n    <clr-control-helper>Helper text</clr-control-helper>\n</clr-multilingual-textarea>\n';templateTSExample='\ndata1 = new Map();\nthis.data1.set("EN", "english text");\nthis.data1.set("DE", "deutscher text");\nthis.data1.set("FR", "texte fran\xe7ais");\n';reactiveExample='\n<form clrForm [formGroup]="exampleForm">\n    <clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample1"\n        clrControlClasses="clr-col-md-5" name="reactive1">\n\n        <label class="clr-col-md-2 clr-required-mark">Reactive</label>\n        <clr-control-helper>Helper text</clr-control-helper>\n        <clr-control-error>Please translate in every language!</clr-control-error>\n    </clr-multilingual-input>\n    <clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample2"\n        clrControlClasses="clr-col-md-5" name="reactive2">\n\n        <label class="clr-col-md-2 clr-required-mark">Reactive</label>\n        <clr-control-helper>Helper text</clr-control-helper>\n        <clr-control-error>Please translate in every language!</clr-control-error>\n    </clr-multilingual-textarea>\n</form>\n';reactiveTSExample='\nreactiveData1 = new Map();\nthis.reactiveData1.set("EN", "english text");\nthis.reactiveData1.set("DE", "deutscher text");\nthis.reactiveData1.set("FR", "texte fran\xe7ais");\n\nexampleForm = new FormGroup({\n  sample1: new FormControl(this.reactiveData1, {\n    updateOn: "blur",\n    validators: [ClrMultilingualInputValidators.requiredAll()]\n  })\n});\n';naExample='\n<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="templateNA"\n  clrSelectedLang="EN" [(ngModel)]="templateNa" [clrLanguages]="languagesNa" clrMissingPrefix="<na> ">\n    <label class="clr-col-md-2">Missing Text</label>\n</clr-multilingual-input>\n';naTSExample='\ntemplateNa = new Map();\nlanguagesNa = ["EN", "DE"];\n\nthis.templateNa.set("EN", "english text");\n';na2Example='\n<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="templateNA2"\n  clrSelectedLang="EN" clrFallbackLang="FR" [(ngModel)]="templateNa2" [clrLanguages]="languagesNa2" clrMissingPrefix="<na> ">\n    <label class="clr-col-md-2">Missing Text hidden fallback</label>\n</clr-multilingual-input>\n';na2TSExample='\ntemplateNa2 = new Map();\nlanguagesNa2 = ["EN", "DE"];\n\nthis.templateNa2.set("EN", "english text");\nthis.templateNa2.set("FR", "texte fran\xe7ais");\n';data1=new Map;data2=new Map;reactiveData1=new Map;reactiveData2=new Map;templateNa=new Map;templateNa2=new Map;languagesNa=["EN","DE"];languagesNa2=["EN","DE"];exampleForm=new r.gE({sample1:new r.MJ(this.reactiveData1,{updateOn:"blur",validators:[i.o5u.requiredAll()]}),sample2:new r.MJ(this.reactiveData2,{updateOn:"blur",validators:[i.o5u.requiredAll()]})});constructor(){super("multilingual-input")}ngOnInit(){this.data1.set("EN","english text"),this.data1.set("DE","deutscher text"),this.data1.set("FR","texte fran\xe7ais"),this.data2.set("EN","english text\nSecond line with a little more text"),this.data2.set("DE","deutscher text\nZweite Zeile mit etwas mehr Text"),this.data2.set("FR","texte fran\xe7ais\nDeuxi\xe8me ligne avec un peu plus de texte"),this.reactiveData1.set("EN","english text"),this.reactiveData1.set("DE","deutscher text"),this.reactiveData1.set("FR","texte fran\xe7ais"),this.reactiveData2.set("EN","english text\nSecond line with a little more text"),this.reactiveData2.set("DE","deutscher text\nZweite Zeile mit etwas mehr Text"),this.reactiveData2.set("FR","texte fran\xe7ais\nDeuxi\xe8me ligne avec un peu plus de texte"),this.templateNa.set("EN","english text"),this.templateNa2.set("EN","english text"),this.templateNa2.set("FR","texte fran\xe7ais")}static \u0275fac=function(s){return new(s||n)};static \u0275cmp=e.VBU({type:n,selectors:[["clr-multilingual-demo"]],hostVars:4,hostBindings:function(s,l){2&s&&e.AVh("content-area",!0)("dox-content-panel",!0)},features:[e.Vt3],decls:254,vars:32,consts:[[3,"title"],[1,"component-summary"],["id","code-examples"],["id","examples"],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["clrForm","",3,"formGroup"],["clrSelectedLang","EN","formControlName","sample1","clrControlClasses","clr-col-md-5","name","reactive1",1,"clr-col-12","clr-row"],[1,"clr-col-md-2","clr-required-mark"],["clrSelectedLang","EN","formControlName","sample2","clrControlClasses","clr-col-md-5","name","reactive2",1,"clr-col-12","clr-row"],[1,"clr-row"],[1,"clr-col-4"],[1,"clr-col-8"],[3,"clrCode"],["clrLanguage","typescript",3,"clrCode"],["clrForm",""],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-md-5","name","template1",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","ngModelOptions"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-md-5","name","template2",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","ngModelOptions"],["clrControlClasses","clr-col-md-5","name","templateNA","clrSelectedLang","EN","clrMissingPrefix","<na> ",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","clrLanguages"],[1,"clr-col-md-2"],["clrControlClasses","clr-col-md-5","name","templateNA2","clrSelectedLang","EN","clrFallbackLang","FR","clrMissingPrefix","<na> ",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","clrLanguages"]],template:function(s,l){1&s&&(e.j41(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e.EFF(3," The multilingual input/textarea fields are used to enter texts in different languages. "),e.k0s(),e.j41(4,"div",2)(5,"h3",3),e.EFF(6,"Code & Examples"),e.k0s(),e.j41(7,"p"),e.EFF(8,"The multilingual input/textarea components require you to use custom validators:"),e.k0s(),e.j41(9,"ul")(10,"li"),e.EFF(11,"Reactive forms: "),e.j41(12,"code",4),e.EFF(13,"ClrMultilingualInputValidators"),e.k0s()(),e.j41(14,"li"),e.EFF(15,"Template-driven forms: "),e.j41(16,"code",4),e.EFF(17,"clrRequiredOneMultilang, clrRequiredAllMultilang"),e.k0s()()(),e.j41(18,"h2"),e.EFF(19,"Angular Component"),e.k0s(),e.j41(20,"h3"),e.EFF(21,"Summary of Options"),e.k0s(),e.j41(22,"table",5)(23,"thead")(24,"tr")(25,"th",6),e.EFF(26,"Parameter"),e.k0s(),e.j41(27,"th",7),e.EFF(28,"Values"),e.k0s(),e.j41(29,"th",8),e.EFF(30,"Default"),e.k0s(),e.j41(31,"th",6),e.EFF(32,"Effect"),e.k0s()()(),e.j41(33,"tbody")(34,"tr")(35,"td",6)(36,"b"),e.EFF(37,"value binding (ngModel or reactive)"),e.k0s(),e.j41(38,"div",9),e.EFF(39,"Type: Map<string, string>"),e.k0s(),e.j41(40,"div",9),e.EFF(41,"Default: null"),e.k0s()(),e.j41(42,"td",7),e.EFF(43,"Map of language and translation"),e.k0s(),e.j41(44,"td",8),e.EFF(45,"null"),e.k0s(),e.j41(46,"td",6),e.EFF(47," Value binding for control represented by a map of language as key and translation as value. "),e.k0s()(),e.j41(48,"tr")(49,"td",6)(50,"b"),e.EFF(51,"[clrSelectedLang]"),e.k0s(),e.j41(52,"div",9),e.EFF(53,"Type: String"),e.k0s(),e.j41(54,"div",9),e.EFF(55,'Default: ""'),e.k0s()(),e.j41(56,"td",7),e.EFF(57,"Javascript String"),e.k0s(),e.j41(58,"td",8),e.EFF(59,'""'),e.k0s(),e.j41(60,"td",6),e.EFF(61,"Defines the currently selected language."),e.k0s()(),e.j41(62,"tr")(63,"td",6)(64,"b"),e.EFF(65,"[clrControlClasses]"),e.k0s(),e.j41(66,"div",9),e.EFF(67,"Type: String"),e.k0s(),e.j41(68,"div",9),e.EFF(69,'Default: "clr-col-md-10"'),e.k0s()(),e.j41(70,"td",7),e.EFF(71,"Javascript String"),e.k0s(),e.j41(72,"td",8),e.EFF(73,'"clr-col-md-10"'),e.k0s(),e.j41(74,"td",6),e.EFF(75,"Defines the css classes applied to the input control."),e.k0s()(),e.j41(76,"tr")(77,"td",6)(78,"b"),e.EFF(79,"[clrShowSingleLanguageSelector]"),e.k0s(),e.j41(80,"div",9),e.EFF(81,"Type: boolean"),e.k0s(),e.j41(82,"div",9),e.EFF(83,"Default: false"),e.k0s()(),e.j41(84,"td",7),e.EFF(85,"Javascript boolean"),e.k0s(),e.j41(86,"td",8),e.EFF(87,"false"),e.k0s(),e.j41(88,"td",6),e.EFF(89,"Defines whether the language selector is shown when only one language is present."),e.k0s()(),e.j41(90,"tr")(91,"td",6)(92,"b"),e.EFF(93,"[clrLanguages]"),e.k0s(),e.j41(94,"div",9),e.EFF(95,"Type: string[]"),e.k0s(),e.j41(96,"div",9),e.EFF(97,"Default: undefined"),e.k0s()(),e.j41(98,"td",7),e.EFF(99,"Javascript string array"),e.k0s(),e.j41(100,"td",8),e.EFF(101,"undefined"),e.k0s(),e.j41(102,"td",6),e.EFF(103," Defines the languages to show in language selector independently from bound form model. "),e.k0s()(),e.j41(104,"tr")(105,"td",6)(106,"b"),e.EFF(107,"[clrFallbackLang]"),e.k0s(),e.j41(108,"div",9),e.EFF(109,"Type: string"),e.k0s(),e.j41(110,"div",9),e.EFF(111,"Default: undefined"),e.k0s()(),e.j41(112,"td",7),e.EFF(113,"Javascript string"),e.k0s(),e.j41(114,"td",8),e.EFF(115,"undefined"),e.k0s(),e.j41(116,"td",6),e.EFF(117," Defines the language to show text from when a text in a language is missing. "),e.j41(118,"code",4),e.EFF(119,"clrMissingPrefix"),e.k0s(),e.EFF(120," must be defined as a prerequisite. "),e.k0s()(),e.j41(121,"tr")(122,"td",6)(123,"b"),e.EFF(124,"[clrMissingPrefix]"),e.k0s(),e.j41(125,"div",9),e.EFF(126,"Type: string"),e.k0s(),e.j41(127,"div",9),e.EFF(128,'Default: ""'),e.k0s()(),e.j41(129,"td",7),e.EFF(130,"Javascript string"),e.k0s(),e.j41(131,"td",8),e.EFF(132,'""'),e.k0s(),e.j41(133,"td",6),e.EFF(134,"Defines the prefix which will be shown when a text in a language is missing."),e.k0s()()()(),e.j41(135,"h3"),e.EFF(136,"Reactive forms"),e.k0s(),e.j41(137,"p"),e.EFF(138,"Validation will happen on blur"),e.k0s(),e.j41(139,"form",10)(140,"clr-multilingual-input",11)(141,"label",12),e.EFF(142,"Reactive"),e.k0s(),e.j41(143,"clr-control-helper"),e.EFF(144,"Helper text"),e.k0s(),e.j41(145,"clr-control-error"),e.EFF(146,"Please translate in every language!"),e.k0s()(),e.j41(147,"clr-multilingual-textarea",13)(148,"label",12),e.EFF(149,"Reactive"),e.k0s(),e.j41(150,"clr-control-helper"),e.EFF(151,"Helper text"),e.k0s(),e.j41(152,"clr-control-error"),e.EFF(153,"Please translate in every language!"),e.k0s()(),e.j41(154,"h4"),e.EFF(155,"Output texts"),e.k0s(),e.j41(156,"div",14)(157,"div",15)(158,"b"),e.EFF(159,"Input"),e.k0s(),e.nrm(160,"br"),e.EFF(161),e.nrm(162,"br"),e.EFF(163),e.nrm(164,"br"),e.EFF(165),e.k0s(),e.j41(166,"div",16)(167,"b"),e.EFF(168,"Textarea"),e.k0s(),e.nrm(169,"br"),e.EFF(170),e.nrm(171,"br"),e.EFF(172),e.nrm(173,"br"),e.EFF(174),e.k0s()()(),e.nrm(175,"clr-code-snippet",17)(176,"clr-code-snippet",18),e.j41(177,"h3"),e.EFF(178,"Template driven"),e.k0s(),e.j41(179,"p"),e.EFF(180,"Validation will happen on blur"),e.k0s(),e.j41(181,"form",19)(182,"clr-multilingual-input",20),e.mxI("ngModelChange",function(t){return e.DH7(l.data1,t)||(l.data1=t),t}),e.j41(183,"label",12),e.EFF(184,"Template"),e.k0s(),e.j41(185,"clr-control-error"),e.EFF(186,"Please translate in every language!"),e.k0s(),e.j41(187,"clr-control-helper"),e.EFF(188,"Helper text"),e.k0s()(),e.j41(189,"clr-multilingual-textarea",21),e.mxI("ngModelChange",function(t){return e.DH7(l.data2,t)||(l.data2=t),t}),e.j41(190,"label",12),e.EFF(191,"Template"),e.k0s(),e.j41(192,"clr-control-error"),e.EFF(193,"Please translate in every language!"),e.k0s(),e.j41(194,"clr-control-helper"),e.EFF(195,"Helper text"),e.k0s()(),e.j41(196,"h4"),e.EFF(197,"Output texts"),e.k0s(),e.j41(198,"div",14)(199,"div",15)(200,"b"),e.EFF(201,"Input"),e.k0s(),e.nrm(202,"br"),e.EFF(203),e.nrm(204,"br"),e.EFF(205),e.nrm(206,"br"),e.EFF(207),e.k0s(),e.j41(208,"div",16)(209,"b"),e.EFF(210,"Textarea"),e.k0s(),e.nrm(211,"br"),e.EFF(212),e.nrm(213,"br"),e.EFF(214),e.nrm(215,"br"),e.EFF(216),e.k0s()(),e.j41(217,"h4"),e.EFF(218,"Output texts"),e.k0s()(),e.nrm(219,"clr-code-snippet",17)(220,"clr-code-snippet",18),e.j41(221,"h3"),e.EFF(222,"Missing texts handling"),e.k0s(),e.j41(223,"p"),e.EFF(224," To not only show an empty string for missing texts in a given language, the component provides the possibility to define a prefix for missing texts with a fallback logic to show the text of another language. "),e.k0s(),e.j41(225,"p"),e.EFF(226,"Fallback text logic:"),e.k0s(),e.j41(227,"ul")(228,"li"),e.EFF(229,"Text from fallback language ("),e.j41(230,"code",4),e.EFF(231,"clrFallbackLang"),e.k0s(),e.EFF(232,")"),e.k0s(),e.j41(233,"li"),e.EFF(234," Text of first shown (defined in "),e.j41(235,"code",4),e.EFF(236,"clrLanguages"),e.k0s(),e.EFF(237," if present) non-empty language ordered by language "),e.k0s(),e.j41(238,"li"),e.EFF(239," Text of first hidden (not defined in "),e.j41(240,"code",4),e.EFF(241,"clrLanguages"),e.k0s(),e.EFF(242," if present) non-empty language ordered by language "),e.k0s()(),e.j41(243,"form",19)(244,"clr-multilingual-input",22),e.mxI("ngModelChange",function(t){return e.DH7(l.templateNa,t)||(l.templateNa=t),t}),e.j41(245,"label",23),e.EFF(246,"Missing Text"),e.k0s()(),e.nrm(247,"clr-code-snippet",17)(248,"clr-code-snippet",18),e.j41(249,"clr-multilingual-input",24),e.mxI("ngModelChange",function(t){return e.DH7(l.templateNa2,t)||(l.templateNa2=t),t}),e.j41(250,"label",23),e.EFF(251,"Missing Text hidden fallback"),e.k0s()(),e.nrm(252,"clr-code-snippet",17)(253,"clr-code-snippet",18),e.k0s()()()()),2&s&&(e.Y8G("title",l.title),e.R7$(139),e.Y8G("formGroup",l.exampleForm),e.R7$(22),e.SpI(" EN: ",l.exampleForm.get("sample1").value.get("EN"),""),e.R7$(2),e.SpI(" DE: ",l.exampleForm.get("sample1").value.get("DE"),""),e.R7$(2),e.SpI(" FR: ",l.exampleForm.get("sample1").value.get("FR")," "),e.R7$(5),e.SpI(" EN: ",l.exampleForm.get("sample2").value.get("EN"),""),e.R7$(2),e.SpI(" DE: ",l.exampleForm.get("sample2").value.get("DE"),""),e.R7$(2),e.SpI(" FR: ",l.exampleForm.get("sample2").value.get("FR")," "),e.R7$(),e.Y8G("clrCode",l.reactiveExample),e.R7$(),e.Y8G("clrCode",l.reactiveTSExample),e.R7$(6),e.R50("ngModel",l.data1),e.Y8G("ngModelOptions",e.lJ4(30,g)),e.R7$(7),e.R50("ngModel",l.data2),e.Y8G("ngModelOptions",e.lJ4(31,g)),e.R7$(14),e.SpI(" EN: ",l.data1.get("EN"),""),e.R7$(2),e.SpI(" DE: ",l.data1.get("DE"),""),e.R7$(2),e.SpI(" FR: ",l.data1.get("FR")," "),e.R7$(5),e.SpI(" EN: ",l.data2.get("EN"),""),e.R7$(2),e.SpI(" DE: ",l.data2.get("DE"),""),e.R7$(2),e.SpI(" FR: ",l.data2.get("FR")," "),e.R7$(3),e.Y8G("clrCode",l.templateExample),e.R7$(),e.Y8G("clrCode",l.templateTSExample),e.R7$(24),e.R50("ngModel",l.templateNa),e.Y8G("clrLanguages",l.languagesNa),e.R7$(3),e.Y8G("clrCode",l.naExample),e.R7$(),e.Y8G("clrCode",l.naTSExample),e.R7$(),e.R50("ngModel",l.templateNa2),e.Y8G("clrLanguages",l.languagesNa2),e.R7$(3),e.Y8G("clrCode",l.na2Example),e.R7$(),e.Y8G("clrCode",l.na2TSExample))},dependencies:[r.qT,r.BC,r.cb,r.vS,r.cV,r.j4,r.JD,o.aZZ,o.Hpg,o.bnk,o.mDd,k.z,f.u,i.X03,i.V3k,i.Zoj,i.b2Q],encapsulation:2})}return n})(),T=(()=>{class n{static \u0275fac=function(s){return new(s||n)};static \u0275mod=e.$C({type:n});static \u0275inj=e.G2t({imports:[m.MD,r.YN,r.X1,o.PuD,o.t5G,F.u,E.g,p.iI.forChild([{path:"",component:R}]),i.P8i]})}return n})()}}]);