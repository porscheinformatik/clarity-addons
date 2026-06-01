import{a as z,b as K,c as Q}from"./chunk-ZWOZOTSY.js";import"./chunk-53GF5SVT.js";import{c as j,d as U}from"./chunk-DN6L23IV.js";import{Yj as J,t as h,u as X,v as G,w as B,yk as Z}from"./chunk-YDQMSJCF.js";import{$c as L,Bb as E,J as f,La as r,Ma as t,Na as l,Oa as a,Qe as P,Qg as H,Vc as w,Wc as y,Xc as D,Yc as F,Zc as S,_c as T,af as O,bf as q,dd as _,df as k,ed as R,ef as W,ib as N,kb as e,mb as m,na as i,nd as A,od as I,qb as s,rb as p,sb as u,tc as b,va as v,wa as M,yg as V,za as C}from"./chunk-MAQU7QF7.js";import"./chunk-UKNGC2Y4.js";var Y=()=>({updateOn:"blur"}),te=`
<clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data1"
    [ngModelOptions]="{ updateOn: 'blur' }" clrRequiredAllMultilang clrControlClasses="clr-col-md-5" name="template1">
    <label class="clr-col-md-2 clr-required-mark">Template</label>
    <clr-control-error>Please translate in every language!</clr-control-error>
    <clr-control-helper>Helper text</clr-control-helper>
</clr-multilingual-input>
<clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data2"
    [ngModelOptions]="{ updateOn: 'blur' }" clrRequiredAllMultilang clrControlClasses="clr-col-md-5" name="template2">
    <label class="clr-col-md-2 clr-required-mark">Template</label>
    <clr-control-error>Please translate in every language!</clr-control-error>
    <clr-control-helper>Helper text</clr-control-helper>
</clr-multilingual-textarea>
`,le=`
data1 = new Map();
this.data1.set("EN", "english text");
this.data1.set("DE", "deutscher text");
this.data1.set("FR", "texte fran\xE7ais");
`,ne=`
<form clrForm [formGroup]="exampleForm">
    <clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample1"
        clrControlClasses="clr-col-md-5" name="reactive1">

        <label class="clr-col-md-2 clr-required-mark">Reactive</label>
        <clr-control-helper>Helper text</clr-control-helper>
        <clr-control-error>Please translate in every language!</clr-control-error>
    </clr-multilingual-input>
    <clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample2"
        clrControlClasses="clr-col-md-5" name="reactive2">

        <label class="clr-col-md-2 clr-required-mark">Reactive</label>
        <clr-control-helper>Helper text</clr-control-helper>
        <clr-control-error>Please translate in every language!</clr-control-error>
    </clr-multilingual-textarea>
</form>
`,ie=`
reactiveData1 = new Map();
this.reactiveData1.set("EN", "english text");
this.reactiveData1.set("DE", "deutscher text");
this.reactiveData1.set("FR", "texte fran\xE7ais");

exampleForm = new FormGroup({
  sample1: new FormControl(this.reactiveData1, {
    updateOn: "blur",
    validators: [ClrMultilingualInputValidators.requiredAll()]
  })
});
`,ae=`
<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="templateNA"
  clrSelectedLang="EN" [(ngModel)]="templateNa" [clrLanguages]="languagesNa" clrMissingPrefix="<na> ">
    <label class="clr-col-md-2">Missing Text</label>
</clr-multilingual-input>
`,re=`
templateNa = new Map();
languagesNa = ["EN", "DE"];

this.templateNa.set("EN", "english text");
`,oe=`
<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="templateNA2"
  clrSelectedLang="EN" clrFallbackLang="FR" [(ngModel)]="templateNa2" [clrLanguages]="languagesNa2" clrMissingPrefix="<na> ">
    <label class="clr-col-md-2">Missing Text hidden fallback</label>
</clr-multilingual-input>
`,me=`
templateNa2 = new Map();
languagesNa2 = ["EN", "DE"];

this.templateNa2.set("EN", "english text");
this.templateNa2.set("FR", "texte fran\xE7ais");
`,$=(()=>{class d extends z{templateExample=te;templateTSExample=le;reactiveExample=ne;reactiveTSExample=ie;naExample=ae;naTSExample=re;na2Example=oe;na2TSExample=me;data1=new Map;data2=new Map;reactiveData1=new Map;reactiveData2=new Map;templateNa=new Map;templateNa2=new Map;languagesNa=["EN","DE"];languagesNa2=["EN","DE"];exampleForm=new D({sample1:new S(this.reactiveData1,{updateOn:"blur",validators:[h.requiredAll()]}),sample2:new S(this.reactiveData2,{updateOn:"blur",validators:[h.requiredAll()]})});constructor(){super("multilingual-input")}ngOnInit(){this.data1.set("EN","english text"),this.data1.set("DE","deutscher text"),this.data1.set("FR","texte fran\xE7ais"),this.data2.set("EN",`english text
Second line with a little more text`),this.data2.set("DE",`deutscher text
Zweite Zeile mit etwas mehr Text`),this.data2.set("FR",`texte fran\xE7ais
Deuxi\xE8me ligne avec un peu plus de texte`),this.reactiveData1.set("EN","english text"),this.reactiveData1.set("DE","deutscher text"),this.reactiveData1.set("FR","texte fran\xE7ais"),this.reactiveData2.set("EN",`english text
Second line with a little more text`),this.reactiveData2.set("DE",`deutscher text
Zweite Zeile mit etwas mehr Text`),this.reactiveData2.set("FR",`texte fran\xE7ais
Deuxi\xE8me ligne avec un peu plus de texte`),this.templateNa.set("EN","english text"),this.templateNa2.set("EN","english text"),this.templateNa2.set("FR","texte fran\xE7ais")}static \u0275fac=function(c){return new(c||d)};static \u0275cmp=v({type:d,selectors:[["clr-multilingual-demo"]],hostVars:4,hostBindings:function(c,n){c&2&&N("content-area",!0)("dox-content-panel",!0)},standalone:!1,features:[C],decls:254,vars:34,consts:[[3,"title"],[1,"component-summary"],["id","code-examples"],["id","examples"],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["clrForm","",3,"formGroup"],["clrSelectedLang","EN","formControlName","sample1","clrControlClasses","clr-col-md-5","name","reactive1",1,"clr-col-12","clr-row"],[1,"clr-col-md-2","clr-required-mark"],["clrSelectedLang","EN","formControlName","sample2","clrControlClasses","clr-col-md-7 clr-col-7","name","reactive2",1,"clr-col-12","clr-row",3,"rows"],[1,"clr-row"],[1,"clr-col-4"],[1,"clr-col-8"],[3,"clrCode"],["clrLanguage","typescript",3,"clrCode"],["clrForm",""],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-md-5","name","template1",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","ngModelOptions"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-md-7 clr-col-7","name","template2",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","rows","ngModelOptions"],["clrControlClasses","clr-col-md-5","name","templateNA","clrSelectedLang","EN","clrMissingPrefix","<na> ",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","clrLanguages"],[1,"clr-col-md-2"],["clrControlClasses","clr-col-md-5","name","templateNA2","clrSelectedLang","EN","clrFallbackLang","FR","clrMissingPrefix","<na> ",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","clrLanguages"]],template:function(c,n){c&1&&(t(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e(3," The multilingual input/textarea fields are used to enter texts in different languages. "),l(),t(4,"div",2)(5,"h3",3),e(6,"Code & Examples"),l(),t(7,"p"),e(8,"The multilingual input/textarea components require you to use custom validators:"),l(),t(9,"ul")(10,"li"),e(11,"Reactive forms: "),t(12,"code",4),e(13,"ClrMultilingualInputValidators"),l()(),t(14,"li"),e(15,"Template-driven forms: "),t(16,"code",4),e(17,"clrRequiredOneMultilang, clrRequiredAllMultilang"),l()()(),t(18,"h2"),e(19,"Angular Component"),l(),t(20,"h3"),e(21,"Summary of Options"),l(),t(22,"table",5)(23,"thead")(24,"tr")(25,"th",6),e(26,"Parameter"),l(),t(27,"th",7),e(28,"Values"),l(),t(29,"th",8),e(30,"Default"),l(),t(31,"th",6),e(32,"Effect"),l()()(),t(33,"tbody")(34,"tr")(35,"td",6)(36,"b"),e(37,"value binding (ngModel or reactive)"),l(),t(38,"div",9),e(39,"Type: Map<string, string>"),l(),t(40,"div",9),e(41,"Default: null"),l()(),t(42,"td",7),e(43,"Map of language and translation"),l(),t(44,"td",8),e(45,"null"),l(),t(46,"td",6),e(47," Value binding for control represented by a map of language as key and translation as value. "),l()(),t(48,"tr")(49,"td",6)(50,"b"),e(51,"[clrSelectedLang]"),l(),t(52,"div",9),e(53,"Type: String"),l(),t(54,"div",9),e(55,'Default: ""'),l()(),t(56,"td",7),e(57,"Javascript String"),l(),t(58,"td",8),e(59,'""'),l(),t(60,"td",6),e(61,"Defines the currently selected language."),l()(),t(62,"tr")(63,"td",6)(64,"b"),e(65,"[clrControlClasses]"),l(),t(66,"div",9),e(67,"Type: String"),l(),t(68,"div",9),e(69,'Default: "clr-col-md-10"'),l()(),t(70,"td",7),e(71,"Javascript String"),l(),t(72,"td",8),e(73,'"clr-col-md-10"'),l(),t(74,"td",6),e(75,"Defines the css classes applied to the input control."),l()(),t(76,"tr")(77,"td",6)(78,"b"),e(79,"[clrShowSingleLanguageSelector]"),l(),t(80,"div",9),e(81,"Type: boolean"),l(),t(82,"div",9),e(83,"Default: false"),l()(),t(84,"td",7),e(85,"Javascript boolean"),l(),t(86,"td",8),e(87,"false"),l(),t(88,"td",6),e(89,"Defines whether the language selector is shown when only one language is present."),l()(),t(90,"tr")(91,"td",6)(92,"b"),e(93,"[clrLanguages]"),l(),t(94,"div",9),e(95,"Type: string[]"),l(),t(96,"div",9),e(97,"Default: undefined"),l()(),t(98,"td",7),e(99,"Javascript string array"),l(),t(100,"td",8),e(101,"undefined"),l(),t(102,"td",6),e(103," Defines the languages to show in language selector independently from bound form model. "),l()(),t(104,"tr")(105,"td",6)(106,"b"),e(107,"[clrFallbackLang]"),l(),t(108,"div",9),e(109,"Type: string"),l(),t(110,"div",9),e(111,"Default: undefined"),l()(),t(112,"td",7),e(113,"Javascript string"),l(),t(114,"td",8),e(115,"undefined"),l(),t(116,"td",6),e(117," Defines the language to show text from when a text in a language is missing. "),t(118,"code",4),e(119,"clrMissingPrefix"),l(),e(120," must be defined as a prerequisite. "),l()(),t(121,"tr")(122,"td",6)(123,"b"),e(124,"[clrMissingPrefix]"),l(),t(125,"div",9),e(126,"Type: string"),l(),t(127,"div",9),e(128,'Default: ""'),l()(),t(129,"td",7),e(130,"Javascript string"),l(),t(131,"td",8),e(132,'""'),l(),t(133,"td",6),e(134,"Defines the prefix which will be shown when a text in a language is missing."),l()()()(),t(135,"h3"),e(136,"Reactive forms"),l(),t(137,"p"),e(138,"Validation will happen on blur"),l(),t(139,"form",10)(140,"clr-multilingual-input",11)(141,"label",12),e(142,"Reactive"),l(),t(143,"clr-control-helper"),e(144,"Helper text"),l(),t(145,"clr-control-error"),e(146,"Please translate in every language!"),l()(),t(147,"clr-multilingual-textarea",13)(148,"label",12),e(149,"Reactive"),l(),t(150,"clr-control-helper"),e(151,"Helper text"),l(),t(152,"clr-control-error"),e(153,"Please translate in every language!"),l()(),t(154,"h4"),e(155,"Output texts"),l(),t(156,"div",14)(157,"div",15)(158,"b"),e(159,"Input"),l(),a(160,"br"),e(161),a(162,"br"),e(163),a(164,"br"),e(165),l(),t(166,"div",16)(167,"b"),e(168,"Textarea"),l(),a(169,"br"),e(170),a(171,"br"),e(172),a(173,"br"),e(174),l()()(),a(175,"clr-code-snippet",17)(176,"clr-code-snippet",18),t(177,"h3"),e(178,"Template driven"),l(),t(179,"p"),e(180,"Validation will happen on blur"),l(),t(181,"form",19)(182,"clr-multilingual-input",20),u("ngModelChange",function(o){return p(n.data1,o)||(n.data1=o),o}),t(183,"label",12),e(184,"Template"),l(),t(185,"clr-control-error"),e(186,"Please translate in every language!"),l(),t(187,"clr-control-helper"),e(188,"Helper text"),l()(),t(189,"clr-multilingual-textarea",21),u("ngModelChange",function(o){return p(n.data2,o)||(n.data2=o),o}),t(190,"label",12),e(191,"Template"),l(),t(192,"clr-control-error"),e(193,"Please translate in every language!"),l(),t(194,"clr-control-helper"),e(195,"Helper text"),l()(),t(196,"h4"),e(197,"Output texts"),l(),t(198,"div",14)(199,"div",15)(200,"b"),e(201,"Input"),l(),a(202,"br"),e(203),a(204,"br"),e(205),a(206,"br"),e(207),l(),t(208,"div",16)(209,"b"),e(210,"Textarea"),l(),a(211,"br"),e(212),a(213,"br"),e(214),a(215,"br"),e(216),l()(),t(217,"h4"),e(218,"Output texts"),l()(),a(219,"clr-code-snippet",17)(220,"clr-code-snippet",18),t(221,"h3"),e(222,"Missing texts handling"),l(),t(223,"p"),e(224," To not only show an empty string for missing texts in a given language, the component provides the possibility to define a prefix for missing texts with a fallback logic to show the text of another language. "),l(),t(225,"p"),e(226,"Fallback text logic:"),l(),t(227,"ul")(228,"li"),e(229,"Text from fallback language ("),t(230,"code",4),e(231,"clrFallbackLang"),l(),e(232,")"),l(),t(233,"li"),e(234," Text of first shown (defined in "),t(235,"code",4),e(236,"clrLanguages"),l(),e(237," if present) non-empty language ordered by language "),l(),t(238,"li"),e(239," Text of first hidden (not defined in "),t(240,"code",4),e(241,"clrLanguages"),l(),e(242," if present) non-empty language ordered by language "),l()(),t(243,"form",19)(244,"clr-multilingual-input",22),u("ngModelChange",function(o){return p(n.templateNa,o)||(n.templateNa=o),o}),t(245,"label",23),e(246,"Missing Text"),l()(),a(247,"clr-code-snippet",17)(248,"clr-code-snippet",18),t(249,"clr-multilingual-input",24),u("ngModelChange",function(o){return p(n.templateNa2,o)||(n.templateNa2=o),o}),t(250,"label",23),e(251,"Missing Text hidden fallback"),l()(),a(252,"clr-code-snippet",17)(253,"clr-code-snippet",18),l()()()()),c&2&&(r("title",n.title),i(139),r("formGroup",n.exampleForm),i(8),r("rows",3),i(14),m(" EN: ",n.exampleForm.get("sample1").value.get("EN")),i(2),m(" DE: ",n.exampleForm.get("sample1").value.get("DE")),i(2),m(" FR: ",n.exampleForm.get("sample1").value.get("FR")," "),i(5),m(" EN: ",n.exampleForm.get("sample2").value.get("EN")),i(2),m(" DE: ",n.exampleForm.get("sample2").value.get("DE")),i(2),m(" FR: ",n.exampleForm.get("sample2").value.get("FR")," "),i(),r("clrCode",n.reactiveExample),i(),r("clrCode",n.reactiveTSExample),i(6),s("ngModel",n.data1),r("ngModelOptions",E(32,Y)),i(7),s("ngModel",n.data2),r("rows",3)("ngModelOptions",E(33,Y)),i(14),m(" EN: ",n.data1.get("EN")),i(2),m(" DE: ",n.data1.get("DE")),i(2),m(" FR: ",n.data1.get("FR")," "),i(5),m(" EN: ",n.data2.get("EN")),i(2),m(" DE: ",n.data2.get("DE")),i(2),m(" FR: ",n.data2.get("FR")," "),i(3),r("clrCode",n.templateExample),i(),r("clrCode",n.templateTSExample),i(24),s("ngModel",n.templateNa),r("clrLanguages",n.languagesNa),i(3),r("clrCode",n.naExample),i(),r("clrCode",n.naTSExample),i(),s("ngModel",n.templateNa2),r("clrLanguages",n.languagesNa2),i(3),r("clrCode",n.na2Example),i(),r("clrCode",n.na2TSExample))},dependencies:[L,w,y,T,F,R,_,k,O,q,W,j,K,G,B,X,J],encapsulation:2})}return d})();var ye=(()=>{class d{static \u0275fac=function(c){return new(c||d)};static \u0275mod=M({type:d});static \u0275inj=f({imports:[b,A,I,H,V,U,Q,P.forChild([{path:"",component:$}]),Z]})}return d})();export{ye as MultilingualInputDemoModule};
