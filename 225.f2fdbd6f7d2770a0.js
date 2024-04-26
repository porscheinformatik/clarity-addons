"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[225],{37225:(w,d,a)=>{a.r(d),a.d(d,{MultilingualInputDemoModule:()=>b});var t=a(81180),m=a(36895),r=a(90433),Z=a(98592),s=a(11602),u=a(664),h=a(24603),T=a(62678),A=a(11489),e=a(94650),U=a(11330),_=a(29031);const p=function(){return{updateOn:"blur"}};let C=(()=>{class n extends A.K{constructor(){super("multilingual-input"),(0,t.Z)(this,"templateExample",'\n<clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data1"\n    [ngModelOptions]="{ updateOn: \'blur\' }" clrRequiredAllMultilang clrControlClasses="clr-col-md-5" name="template1">\n    <label class="clr-col-md-2 required">Template</label>\n    <clr-control-error>Please translate in every language!</clr-control-error>\n    <clr-control-helper>Helper text</clr-control-helper>\n</clr-multilingual-input>\n<clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data2"\n    [ngModelOptions]="{ updateOn: \'blur\' }" clrRequiredAllMultilang clrControlClasses="clr-col-md-5" name="template2">\n    <label class="clr-col-md-2 required">Template</label>\n    <clr-control-error>Please translate in every language!</clr-control-error>\n    <clr-control-helper>Helper text</clr-control-helper>\n</clr-multilingual-textarea>\n'),(0,t.Z)(this,"templateTSExample",'\ndata1 = new Map();\nthis.data1.set("EN", "english text");\nthis.data1.set("DE", "deutscher text");\nthis.data1.set("FR", "texte fran\xe7ais");\n'),(0,t.Z)(this,"reactiveExample",'\n<form clrForm [formGroup]="exampleForm">\n    <clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample1"\n        clrControlClasses="clr-col-md-5" name="reactive1">\n\n        <label class="clr-col-md-2 required">Reactive</label>\n        <clr-control-helper>Helper text</clr-control-helper>\n        <clr-control-error>Please translate in every language!</clr-control-error>\n    </clr-multilingual-input>\n    <clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample2"\n        clrControlClasses="clr-col-md-5" name="reactive2">\n\n        <label class="clr-col-md-2 required">Reactive</label>\n        <clr-control-helper>Helper text</clr-control-helper>\n        <clr-control-error>Please translate in every language!</clr-control-error>\n    </clr-multilingual-textarea>\n</form>\n'),(0,t.Z)(this,"reactiveTSExample",'\nreactiveData1 = new Map();\nthis.reactiveData1.set("EN", "english text");\nthis.reactiveData1.set("DE", "deutscher text");\nthis.reactiveData1.set("FR", "texte fran\xe7ais");\n\nexampleForm = new FormGroup({\n  sample1: new FormControl(this.reactiveData1, {\n    updateOn: "blur",\n    validators: [ClrMultilingualInputValidators.requiredAll()]\n  })\n});\n'),(0,t.Z)(this,"naExample",'\n<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="templateNA"\n  clrSelectedLang="EN" [(ngModel)]="templateNa" [clrLanguages]="languagesNa" clrMissingPrefix="<na> ">\n    <label class="clr-col-md-2">Missing Text</label>\n</clr-multilingual-input>\n'),(0,t.Z)(this,"naTSExample",'\ntemplateNa = new Map();\nlanguagesNa = ["EN", "DE"];\n\nthis.templateNa.set("EN", "english text");\n'),(0,t.Z)(this,"na2Example",'\n<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="templateNA2"\n  clrSelectedLang="EN" clrFallbackLang="FR" [(ngModel)]="templateNa2" [clrLanguages]="languagesNa2" clrMissingPrefix="<na> ">\n    <label class="clr-col-md-2">Missing Text hidden fallback</label>\n</clr-multilingual-input>\n'),(0,t.Z)(this,"na2TSExample",'\ntemplateNa2 = new Map();\nlanguagesNa2 = ["EN", "DE"];\n\nthis.templateNa2.set("EN", "english text");\nthis.templateNa2.set("FR", "texte fran\xe7ais");\n'),(0,t.Z)(this,"data1",new Map),(0,t.Z)(this,"data2",new Map),(0,t.Z)(this,"reactiveData1",new Map),(0,t.Z)(this,"reactiveData2",new Map),(0,t.Z)(this,"templateNa",new Map),(0,t.Z)(this,"templateNa2",new Map),(0,t.Z)(this,"languagesNa",["EN","DE"]),(0,t.Z)(this,"languagesNa2",["EN","DE"]),(0,t.Z)(this,"exampleForm",new r.cw({sample1:new r.NI(this.reactiveData1,{updateOn:"blur",validators:[u.M9p.requiredAll()]}),sample2:new r.NI(this.reactiveData2,{updateOn:"blur",validators:[u.M9p.requiredAll()]})}))}ngOnInit(){this.data1.set("EN","english text"),this.data1.set("DE","deutscher text"),this.data1.set("FR","texte fran\xe7ais"),this.data2.set("EN","english text\nSecond line with a little more text"),this.data2.set("DE","deutscher text\nZweite Zeile mit etwas mehr Text"),this.data2.set("FR","texte fran\xe7ais\nDeuxi\xe8me ligne avec un peu plus de texte"),this.reactiveData1.set("EN","english text"),this.reactiveData1.set("DE","deutscher text"),this.reactiveData1.set("FR","texte fran\xe7ais"),this.reactiveData2.set("EN","english text\nSecond line with a little more text"),this.reactiveData2.set("DE","deutscher text\nZweite Zeile mit etwas mehr Text"),this.reactiveData2.set("FR","texte fran\xe7ais\nDeuxi\xe8me ligne avec un peu plus de texte"),this.templateNa.set("EN","english text"),this.templateNa2.set("EN","english text"),this.templateNa2.set("FR","texte fran\xe7ais")}}return(0,t.Z)(n,"\u0275fac",function(i){return new(i||n)}),(0,t.Z)(n,"\u0275cmp",e.Xpm({type:n,selectors:[["clr-multilingual-demo"]],hostVars:4,hostBindings:function(i,l){2&i&&e.ekj("content-area",!0)("dox-content-panel",!0)},features:[e.qOj],decls:254,vars:32,consts:[[3,"title"],[1,"component-summary"],["id","code-examples"],["id","examples"],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["clrForm","",3,"formGroup"],["clrSelectedLang","EN","formControlName","sample1","clrControlClasses","clr-col-md-5","name","reactive1",1,"clr-col-12","clr-row"],[1,"clr-col-md-2","required"],["clrSelectedLang","EN","formControlName","sample2","clrControlClasses","clr-col-md-5","name","reactive2",1,"clr-col-12","clr-row"],[1,"clr-row"],[1,"clr-col-4"],[1,"clr-col-8"],[3,"clrCode"],["clrLanguage","typescript",3,"clrCode"],["clrForm",""],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-md-5","name","template1",1,"clr-col-12","clr-row",3,"ngModel","ngModelOptions","ngModelChange"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-md-5","name","template2",1,"clr-col-12","clr-row",3,"ngModel","ngModelOptions","ngModelChange"],["clrControlClasses","clr-col-md-5","name","templateNA","clrSelectedLang","EN","clrMissingPrefix","<na> ",1,"clr-col-12","clr-row",3,"ngModel","clrLanguages","ngModelChange"],[1,"clr-col-md-2"],["clrControlClasses","clr-col-md-5","name","templateNA2","clrSelectedLang","EN","clrFallbackLang","FR","clrMissingPrefix","<na> ",1,"clr-col-12","clr-row",3,"ngModel","clrLanguages","ngModelChange"]],template:function(i,l){1&i&&(e.TgZ(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e._uU(3," The multilingual input/textarea fields are used to enter texts in different languages. "),e.qZA(),e.TgZ(4,"div",2)(5,"h3",3),e._uU(6,"Code & Examples"),e.qZA(),e.TgZ(7,"p"),e._uU(8,"The multilingual input/textarea components require you to use custom validators:"),e.qZA(),e.TgZ(9,"ul")(10,"li"),e._uU(11,"Reactive forms: "),e.TgZ(12,"code",4),e._uU(13,"ClrMultilingualInputValidators"),e.qZA()(),e.TgZ(14,"li"),e._uU(15,"Template-driven forms: "),e.TgZ(16,"code",4),e._uU(17,"clrRequiredOneMultilang, clrRequiredAllMultilang"),e.qZA()()(),e.TgZ(18,"h2"),e._uU(19,"Angular Component"),e.qZA(),e.TgZ(20,"h3"),e._uU(21,"Summary of Options"),e.qZA(),e.TgZ(22,"table",5)(23,"thead")(24,"tr")(25,"th",6),e._uU(26,"Parameter"),e.qZA(),e.TgZ(27,"th",7),e._uU(28,"Values"),e.qZA(),e.TgZ(29,"th",8),e._uU(30,"Default"),e.qZA(),e.TgZ(31,"th",6),e._uU(32,"Effect"),e.qZA()()(),e.TgZ(33,"tbody")(34,"tr")(35,"td",6)(36,"b"),e._uU(37,"value binding (ngModel or reactive)"),e.qZA(),e.TgZ(38,"div",9),e._uU(39,"Type: Map<string, string>"),e.qZA(),e.TgZ(40,"div",9),e._uU(41,"Default: null"),e.qZA()(),e.TgZ(42,"td",7),e._uU(43,"Map of language and translation"),e.qZA(),e.TgZ(44,"td",8),e._uU(45,"null"),e.qZA(),e.TgZ(46,"td",6),e._uU(47," Value binding for control represented by a map of language as key and translation as value. "),e.qZA()(),e.TgZ(48,"tr")(49,"td",6)(50,"b"),e._uU(51,"[clrSelectedLang]"),e.qZA(),e.TgZ(52,"div",9),e._uU(53,"Type: String"),e.qZA(),e.TgZ(54,"div",9),e._uU(55,'Default: ""'),e.qZA()(),e.TgZ(56,"td",7),e._uU(57,"Javascript String"),e.qZA(),e.TgZ(58,"td",8),e._uU(59,'""'),e.qZA(),e.TgZ(60,"td",6),e._uU(61,"Defines the currently selected language."),e.qZA()(),e.TgZ(62,"tr")(63,"td",6)(64,"b"),e._uU(65,"[clrControlClasses]"),e.qZA(),e.TgZ(66,"div",9),e._uU(67,"Type: String"),e.qZA(),e.TgZ(68,"div",9),e._uU(69,'Default: "clr-col-md-10"'),e.qZA()(),e.TgZ(70,"td",7),e._uU(71,"Javascript String"),e.qZA(),e.TgZ(72,"td",8),e._uU(73,'"clr-col-md-10"'),e.qZA(),e.TgZ(74,"td",6),e._uU(75,"Defines the css classes applied to the input control."),e.qZA()(),e.TgZ(76,"tr")(77,"td",6)(78,"b"),e._uU(79,"[clrShowSingleLanguageSelector]"),e.qZA(),e.TgZ(80,"div",9),e._uU(81,"Type: boolean"),e.qZA(),e.TgZ(82,"div",9),e._uU(83,"Default: false"),e.qZA()(),e.TgZ(84,"td",7),e._uU(85,"Javascript boolean"),e.qZA(),e.TgZ(86,"td",8),e._uU(87,"false"),e.qZA(),e.TgZ(88,"td",6),e._uU(89,"Defines whether the language selector is shown when only one language is present."),e.qZA()(),e.TgZ(90,"tr")(91,"td",6)(92,"b"),e._uU(93,"[clrLanguages]"),e.qZA(),e.TgZ(94,"div",9),e._uU(95,"Type: string[]"),e.qZA(),e.TgZ(96,"div",9),e._uU(97,"Default: undefined"),e.qZA()(),e.TgZ(98,"td",7),e._uU(99,"Javascript string array"),e.qZA(),e.TgZ(100,"td",8),e._uU(101,"undefined"),e.qZA(),e.TgZ(102,"td",6),e._uU(103," Defines the languages to show in language selector independently from bound form model. "),e.qZA()(),e.TgZ(104,"tr")(105,"td",6)(106,"b"),e._uU(107,"[clrFallbackLang]"),e.qZA(),e.TgZ(108,"div",9),e._uU(109,"Type: string"),e.qZA(),e.TgZ(110,"div",9),e._uU(111,"Default: undefined"),e.qZA()(),e.TgZ(112,"td",7),e._uU(113,"Javascript string"),e.qZA(),e.TgZ(114,"td",8),e._uU(115,"undefined"),e.qZA(),e.TgZ(116,"td",6),e._uU(117," Defines the language to show text from when a text in a language is missing. "),e.TgZ(118,"code",4),e._uU(119,"clrMissingPrefix"),e.qZA(),e._uU(120," must be defined as a prerequisite. "),e.qZA()(),e.TgZ(121,"tr")(122,"td",6)(123,"b"),e._uU(124,"[clrMissingPrefix]"),e.qZA(),e.TgZ(125,"div",9),e._uU(126,"Type: string"),e.qZA(),e.TgZ(127,"div",9),e._uU(128,'Default: ""'),e.qZA()(),e.TgZ(129,"td",7),e._uU(130,"Javascript string"),e.qZA(),e.TgZ(131,"td",8),e._uU(132,'""'),e.qZA(),e.TgZ(133,"td",6),e._uU(134,"Defines the prefix which will be shown when a text in a language is missing."),e.qZA()()()(),e.TgZ(135,"h3"),e._uU(136,"Reactive forms"),e.qZA(),e.TgZ(137,"p"),e._uU(138,"Validation will happen on blur"),e.qZA(),e.TgZ(139,"form",10)(140,"clr-multilingual-input",11)(141,"label",12),e._uU(142,"Reactive"),e.qZA(),e.TgZ(143,"clr-control-helper"),e._uU(144,"Helper text"),e.qZA(),e.TgZ(145,"clr-control-error"),e._uU(146,"Please translate in every language!"),e.qZA()(),e.TgZ(147,"clr-multilingual-textarea",13)(148,"label",12),e._uU(149,"Reactive"),e.qZA(),e.TgZ(150,"clr-control-helper"),e._uU(151,"Helper text"),e.qZA(),e.TgZ(152,"clr-control-error"),e._uU(153,"Please translate in every language!"),e.qZA()(),e.TgZ(154,"h4"),e._uU(155,"Output texts"),e.qZA(),e.TgZ(156,"div",14)(157,"div",15)(158,"b"),e._uU(159,"Input"),e.qZA(),e._UZ(160,"br"),e._uU(161),e._UZ(162,"br"),e._uU(163),e._UZ(164,"br"),e._uU(165),e.qZA(),e.TgZ(166,"div",16)(167,"b"),e._uU(168,"Textarea"),e.qZA(),e._UZ(169,"br"),e._uU(170),e._UZ(171,"br"),e._uU(172),e._UZ(173,"br"),e._uU(174),e.qZA()()(),e._UZ(175,"clr-code-snippet",17)(176,"clr-code-snippet",18),e.TgZ(177,"h3"),e._uU(178,"Template driven"),e.qZA(),e.TgZ(179,"p"),e._uU(180,"Validation will happen on blur"),e.qZA(),e.TgZ(181,"form",19)(182,"clr-multilingual-input",20),e.NdJ("ngModelChange",function(o){return l.data1=o}),e.TgZ(183,"label",12),e._uU(184,"Template"),e.qZA(),e.TgZ(185,"clr-control-error"),e._uU(186,"Please translate in every language!"),e.qZA(),e.TgZ(187,"clr-control-helper"),e._uU(188,"Helper text"),e.qZA()(),e.TgZ(189,"clr-multilingual-textarea",21),e.NdJ("ngModelChange",function(o){return l.data2=o}),e.TgZ(190,"label",12),e._uU(191,"Template"),e.qZA(),e.TgZ(192,"clr-control-error"),e._uU(193,"Please translate in every language!"),e.qZA(),e.TgZ(194,"clr-control-helper"),e._uU(195,"Helper text"),e.qZA()(),e.TgZ(196,"h4"),e._uU(197,"Output texts"),e.qZA(),e.TgZ(198,"div",14)(199,"div",15)(200,"b"),e._uU(201,"Input"),e.qZA(),e._UZ(202,"br"),e._uU(203),e._UZ(204,"br"),e._uU(205),e._UZ(206,"br"),e._uU(207),e.qZA(),e.TgZ(208,"div",16)(209,"b"),e._uU(210,"Textarea"),e.qZA(),e._UZ(211,"br"),e._uU(212),e._UZ(213,"br"),e._uU(214),e._UZ(215,"br"),e._uU(216),e.qZA()(),e.TgZ(217,"h4"),e._uU(218,"Output texts"),e.qZA()(),e._UZ(219,"clr-code-snippet",17)(220,"clr-code-snippet",18),e.TgZ(221,"h3"),e._uU(222,"Missing texts handling"),e.qZA(),e.TgZ(223,"p"),e._uU(224," To not only show an empty string for missing texts in a given language, the component provides the possibility to define a prefix for missing texts with a fallback logic to show the text of another language. "),e.qZA(),e.TgZ(225,"p"),e._uU(226,"Fallback text logic:"),e.qZA(),e.TgZ(227,"ul")(228,"li"),e._uU(229,"Text from fallback language ("),e.TgZ(230,"code",4),e._uU(231,"clrFallbackLang"),e.qZA(),e._uU(232,")"),e.qZA(),e.TgZ(233,"li"),e._uU(234," Text of first shown (defined in "),e.TgZ(235,"code",4),e._uU(236,"clrLanguages"),e.qZA(),e._uU(237," if present) non-empty language ordered by language "),e.qZA(),e.TgZ(238,"li"),e._uU(239," Text of first hidden (not defined in "),e.TgZ(240,"code",4),e._uU(241,"clrLanguages"),e.qZA(),e._uU(242," if present) non-empty language ordered by language "),e.qZA()(),e.TgZ(243,"form",19)(244,"clr-multilingual-input",22),e.NdJ("ngModelChange",function(o){return l.templateNa=o}),e.TgZ(245,"label",23),e._uU(246,"Missing Text"),e.qZA()(),e._UZ(247,"clr-code-snippet",17)(248,"clr-code-snippet",18),e.TgZ(249,"clr-multilingual-input",24),e.NdJ("ngModelChange",function(o){return l.templateNa2=o}),e.TgZ(250,"label",23),e._uU(251,"Missing Text hidden fallback"),e.qZA()(),e._UZ(252,"clr-code-snippet",17)(253,"clr-code-snippet",18),e.qZA()()()()),2&i&&(e.Q6J("title",l.title),e.xp6(139),e.Q6J("formGroup",l.exampleForm),e.xp6(22),e.hij(" EN: ",l.exampleForm.get("sample1").value.get("EN"),""),e.xp6(2),e.hij(" DE: ",l.exampleForm.get("sample1").value.get("DE"),""),e.xp6(2),e.hij(" FR: ",l.exampleForm.get("sample1").value.get("FR")," "),e.xp6(5),e.hij(" EN: ",l.exampleForm.get("sample2").value.get("EN"),""),e.xp6(2),e.hij(" DE: ",l.exampleForm.get("sample2").value.get("DE"),""),e.xp6(2),e.hij(" FR: ",l.exampleForm.get("sample2").value.get("FR")," "),e.xp6(1),e.Q6J("clrCode",l.reactiveExample),e.xp6(1),e.Q6J("clrCode",l.reactiveTSExample),e.xp6(6),e.Q6J("ngModel",l.data1)("ngModelOptions",e.DdM(30,p)),e.xp6(7),e.Q6J("ngModel",l.data2)("ngModelOptions",e.DdM(31,p)),e.xp6(14),e.hij(" EN: ",l.data1.get("EN"),""),e.xp6(2),e.hij(" DE: ",l.data1.get("DE"),""),e.xp6(2),e.hij(" FR: ",l.data1.get("FR")," "),e.xp6(5),e.hij(" EN: ",l.data2.get("EN"),""),e.xp6(2),e.hij(" DE: ",l.data2.get("DE"),""),e.xp6(2),e.hij(" FR: ",l.data2.get("FR")," "),e.xp6(3),e.Q6J("clrCode",l.templateExample),e.xp6(1),e.Q6J("clrCode",l.templateTSExample),e.xp6(24),e.Q6J("ngModel",l.templateNa)("clrLanguages",l.languagesNa),e.xp6(3),e.Q6J("clrCode",l.naExample),e.xp6(1),e.Q6J("clrCode",l.naTSExample),e.xp6(1),e.Q6J("ngModel",l.templateNa2)("clrLanguages",l.languagesNa2),e.xp6(3),e.Q6J("clrCode",l.na2Example),e.xp6(1),e.Q6J("clrCode",l.na2TSExample))},dependencies:[r._Y,r.JJ,r.JL,r.On,r.F,r.sg,r.u,s.MgK,s.VqA,s.CM6,s.YAP,U.O,_.k,u.i2k,u.VNb,u.nKJ,u.$e1],encapsulation:2})),n})(),b=(()=>{class n{}return(0,t.Z)(n,"\u0275fac",function(i){return new(i||n)}),(0,t.Z)(n,"\u0275mod",e.oAB({type:n})),(0,t.Z)(n,"\u0275inj",e.cJS({imports:[m.ez,r.u5,r.UX,s.K6A,s.AnW,h.A,T.B,Z.Bz.forChild([{path:"",component:C}]),u.mmz]})),n})()}}]);