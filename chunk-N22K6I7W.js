import{a as $,b as ee,c as te}from"./chunk-GPK5UE5M.js";import"./chunk-S3DWPM3E.js";import{c as K,d as Q}from"./chunk-TUZ33UU7.js";import{$j as U,Bk as Y,t as S,u as z,v as Z,w as j}from"./chunk-OGHORG6L.js";import{$c as h,Ad as P,Eb as E,H as f,He as k,Le as O,Na as r,Oa as t,Oe as W,Pa as l,Qa as o,Sg as G,Xc as w,Yc as y,Zc as b,_c as T,ad as I,bd as L,fd as _,gd as F,if as q,ih as J,kb as D,la as a,mb as e,ob as m,pd as R,qd as A,tb as d,ua as M,ub as p,uf as X,va as v,vb as g,vc as N,vf as V,xf as H,yf as B,za as C}from"./chunk-VHWVC5SD.js";import"./chunk-76DGGKHL.js";var le=()=>({updateOn:"blur"});P.addIcons(W,k,O);var ie=`
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
`,re=`
data1 = new Map();
this.data1.set("EN", "english text");
this.data1.set("DE", "deutscher text");
this.data1.set("FR", "texte fran\xE7ais");
`,oe=`
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
`,me=`
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
`,se=`
<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="templateNA"
  clrSelectedLang="EN" [(ngModel)]="templateNa" [clrLanguages]="languagesNa" clrMissingPrefix="<na> ">
    <label class="clr-col-md-2">Missing Text</label>
</clr-multilingual-input>
`,ce=`
templateNa = new Map();
languagesNa = ["EN", "DE"];

this.templateNa.set("EN", "english text");
`,de=`
<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="templateNA2"
  clrSelectedLang="EN" clrFallbackLang="FR" [(ngModel)]="templateNa2" [clrLanguages]="languagesNa2" clrMissingPrefix="<na> ">
    <label class="clr-col-md-2">Missing Text hidden fallback</label>
</clr-multilingual-input>
`,pe=`
templateNa2 = new Map();
languagesNa2 = ["EN", "DE"];

this.templateNa2.set("EN", "english text");
this.templateNa2.set("FR", "texte fran\xE7ais");
`,ge=`
<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="iconsExample"
  clrSelectedLang="EN" [(ngModel)]="iconsData" [clrLanguageIcons]="languageIcons">
    <label class="clr-col-md-2">Language Icons</label>
</clr-multilingual-input>
`,ue=`
<clr-multilingual-textarea class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="iconsTextareaExample"
  clrSelectedLang="EN" [(ngModel)]="iconsTextareaData" [clrLanguageIcons]="languageIcons" [rows]="3">
    <label class="clr-col-md-2">Language Icons Textarea</label>
</clr-multilingual-textarea>
`,xe=`
iconsData = new Map();
iconsTextareaData = new Map();
languageIcons = new Map<string, string>();

this.iconsData.set("EN", "english text");
this.iconsData.set("DE", "deutscher text");
this.iconsData.set("FR", "texte fran\xE7ais");
this.iconsTextareaData.set("EN", "english text\\nsecond line");
this.iconsTextareaData.set("DE", "deutscher text\\nzweite zeile");
this.iconsTextareaData.set("FR", "texte fran\xE7ais\\ndeuxi\xE8me ligne");
this.languageIcons.set("DE", "link");
this.languageIcons.set("FR", "flag");
this.languageIcons.set("EN", "unlink");
`,ne=(()=>{class s extends ${templateExample=ie;templateTSExample=re;reactiveExample=oe;reactiveTSExample=me;naExample=se;naTSExample=ce;na2Example=de;na2TSExample=pe;iconsExample=ge;iconsTextareaExample=ue;iconsTSExample=xe;data1=new Map;data2=new Map;reactiveData1=new Map;reactiveData2=new Map;templateNa=new Map;templateNa2=new Map;iconsData=new Map;iconsTextareaData=new Map;languageIcons=new Map;languagesNa=["EN","DE"];languagesNa2=["EN","DE"];exampleForm=new b({sample1:new h(this.reactiveData1,{updateOn:"blur",validators:[S.requiredAll()]}),sample2:new h(this.reactiveData2,{updateOn:"blur",validators:[S.requiredAll()]})});constructor(){super("multilingual-input")}ngOnInit(){this.data1.set("EN","english text"),this.data1.set("DE","deutscher text"),this.data1.set("FR","texte fran\xE7ais"),this.data2.set("EN",`english text
Second line with a little more text`),this.data2.set("DE",`deutscher text
Zweite Zeile mit etwas mehr Text`),this.data2.set("FR",`texte fran\xE7ais
Deuxi\xE8me ligne avec un peu plus de texte`),this.reactiveData1.set("EN","english text"),this.reactiveData1.set("DE","deutscher text"),this.reactiveData1.set("FR","texte fran\xE7ais"),this.reactiveData2.set("EN",`english text
Second line with a little more text`),this.reactiveData2.set("DE",`deutscher text
Zweite Zeile mit etwas mehr Text`),this.reactiveData2.set("FR",`texte fran\xE7ais
Deuxi\xE8me ligne avec un peu plus de texte`),this.templateNa.set("EN","english text"),this.templateNa2.set("EN","english text"),this.templateNa2.set("FR","texte fran\xE7ais"),this.iconsData.set("EN","english text"),this.iconsData.set("DE","deutscher text"),this.iconsData.set("FR","texte fran\xE7ais"),this.iconsTextareaData.set("EN",`english text
second line`),this.iconsTextareaData.set("DE",`deutscher text
zweite zeile`),this.iconsTextareaData.set("FR",`texte fran\xE7ais
deuxi\xE8me ligne`),this.languageIcons.set("DE","link"),this.languageIcons.set("FR","flag"),this.languageIcons.set("EN","unlink")}static \u0275fac=function(c){return new(c||s)};static \u0275cmp=M({type:s,selectors:[["clr-multilingual-demo"]],hostVars:4,hostBindings:function(c,n){c&2&&D("content-area",!0)("dox-content-panel",!0)},standalone:!1,features:[C],decls:285,vars:42,consts:[[3,"title"],[1,"component-summary"],["id","code-examples"],["id","examples"],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["clrForm","",3,"formGroup"],["clrSelectedLang","EN","formControlName","sample1","clrControlClasses","clr-col-md-5","name","reactive1",1,"clr-col-12","clr-row"],[1,"clr-col-md-2","clr-required-mark"],["clrSelectedLang","EN","formControlName","sample2","clrControlClasses","clr-col-md-7 clr-col-7","name","reactive2",1,"clr-col-12","clr-row",3,"rows"],[1,"clr-row"],[1,"clr-col-4"],[1,"clr-col-8"],[3,"clrCode"],["clrLanguage","typescript",3,"clrCode"],["clrForm",""],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-md-5","name","template1",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","ngModelOptions"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-md-7 clr-col-7","name","template2",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","rows","ngModelOptions"],["clrControlClasses","clr-col-md-5","name","templateNA","clrSelectedLang","EN","clrMissingPrefix","<na> ",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","clrLanguages"],[1,"clr-col-md-2"],["clrControlClasses","clr-col-md-5","name","templateNA2","clrSelectedLang","EN","clrFallbackLang","FR","clrMissingPrefix","<na> ",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","clrLanguages"],["clrControlClasses","clr-col-md-5","name","iconsExample","clrSelectedLang","EN",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","clrLanguageIcons"],["clrControlClasses","clr-col-md-5","name","iconsTextareaExample","clrSelectedLang","EN",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","clrLanguageIcons","rows"]],template:function(c,n){c&1&&(t(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e(3," The multilingual input/textarea fields are used to enter texts in different languages. "),l(),t(4,"div",2)(5,"h3",3),e(6,"Code & Examples"),l(),t(7,"p"),e(8,"The multilingual input/textarea components require you to use custom validators:"),l(),t(9,"ul")(10,"li"),e(11,"Reactive forms: "),t(12,"code",4),e(13,"ClrMultilingualInputValidators"),l()(),t(14,"li"),e(15,"Template-driven forms: "),t(16,"code",4),e(17,"clrRequiredOneMultilang, clrRequiredAllMultilang"),l()()(),t(18,"h2"),e(19,"Angular Component"),l(),t(20,"h3"),e(21,"Summary of Options"),l(),t(22,"table",5)(23,"thead")(24,"tr")(25,"th",6),e(26,"Parameter"),l(),t(27,"th",7),e(28,"Values"),l(),t(29,"th",8),e(30,"Default"),l(),t(31,"th",6),e(32,"Effect"),l()()(),t(33,"tbody")(34,"tr")(35,"td",6)(36,"b"),e(37,"value binding (ngModel or reactive)"),l(),t(38,"div",9),e(39,"Type: Map<string, string>"),l(),t(40,"div",9),e(41,"Default: null"),l()(),t(42,"td",7),e(43,"Map of language and translation"),l(),t(44,"td",8),e(45,"null"),l(),t(46,"td",6),e(47," Value binding for control represented by a map of language as key and translation as value. "),l()(),t(48,"tr")(49,"td",6)(50,"b"),e(51,"[clrSelectedLang]"),l(),t(52,"div",9),e(53,"Type: String"),l(),t(54,"div",9),e(55,'Default: ""'),l()(),t(56,"td",7),e(57,"Javascript String"),l(),t(58,"td",8),e(59,'""'),l(),t(60,"td",6),e(61,"Defines the currently selected language."),l()(),t(62,"tr")(63,"td",6)(64,"b"),e(65,"[clrControlClasses]"),l(),t(66,"div",9),e(67,"Type: String"),l(),t(68,"div",9),e(69,'Default: "clr-col-md-10"'),l()(),t(70,"td",7),e(71,"Javascript String"),l(),t(72,"td",8),e(73,'"clr-col-md-10"'),l(),t(74,"td",6),e(75,"Defines the css classes applied to the input control."),l()(),t(76,"tr")(77,"td",6)(78,"b"),e(79,"[clrShowSingleLanguageSelector]"),l(),t(80,"div",9),e(81,"Type: boolean"),l(),t(82,"div",9),e(83,"Default: false"),l()(),t(84,"td",7),e(85,"Javascript boolean"),l(),t(86,"td",8),e(87,"false"),l(),t(88,"td",6),e(89,"Defines whether the language selector is shown when only one language is present."),l()(),t(90,"tr")(91,"td",6)(92,"b"),e(93,"[clrLanguages]"),l(),t(94,"div",9),e(95,"Type: string[]"),l(),t(96,"div",9),e(97,"Default: undefined"),l()(),t(98,"td",7),e(99,"Javascript string array"),l(),t(100,"td",8),e(101,"undefined"),l(),t(102,"td",6),e(103," Defines the languages to show in language selector independently from bound form model. "),l()(),t(104,"tr")(105,"td",6)(106,"b"),e(107,"[clrFallbackLang]"),l(),t(108,"div",9),e(109,"Type: string"),l(),t(110,"div",9),e(111,"Default: undefined"),l()(),t(112,"td",7),e(113,"Javascript string"),l(),t(114,"td",8),e(115,"undefined"),l(),t(116,"td",6),e(117," Defines the language to show text from when a text in a language is missing. "),t(118,"code",4),e(119,"clrMissingPrefix"),l(),e(120," must be defined as a prerequisite. "),l()(),t(121,"tr")(122,"td",6)(123,"b"),e(124,"[clrMissingPrefix]"),l(),t(125,"div",9),e(126,"Type: string"),l(),t(127,"div",9),e(128,'Default: ""'),l()(),t(129,"td",7),e(130,"Javascript string"),l(),t(131,"td",8),e(132,'""'),l(),t(133,"td",6),e(134,"Defines the prefix which will be shown when a text in a language is missing."),l()(),t(135,"tr")(136,"td",6)(137,"b"),e(138,"[clrLanguageIcons]"),l(),t(139,"div",9),e(140,"Type: Map<string, string>"),l(),t(141,"div",9),e(142,"Default: undefined"),l()(),t(143,"td",7),e(144,"Map of language and Clarity icon shape"),l(),t(145,"td",8),e(146,"undefined"),l(),t(147,"td",6),e(148,"Optionally defines an icon per language key to render in the language selector."),l()()()(),t(149,"h3"),e(150,"Reactive forms"),l(),t(151,"p"),e(152,"Validation will happen on blur"),l(),t(153,"form",10)(154,"clr-multilingual-input",11)(155,"label",12),e(156,"Reactive"),l(),t(157,"clr-control-helper"),e(158,"Helper text"),l(),t(159,"clr-control-error"),e(160,"Please translate in every language!"),l()(),t(161,"clr-multilingual-textarea",13)(162,"label",12),e(163,"Reactive"),l(),t(164,"clr-control-helper"),e(165,"Helper text"),l(),t(166,"clr-control-error"),e(167,"Please translate in every language!"),l()(),t(168,"h4"),e(169,"Output texts"),l(),t(170,"div",14)(171,"div",15)(172,"b"),e(173,"Input"),l(),o(174,"br"),e(175),o(176,"br"),e(177),o(178,"br"),e(179),l(),t(180,"div",16)(181,"b"),e(182,"Textarea"),l(),o(183,"br"),e(184),o(185,"br"),e(186),o(187,"br"),e(188),l()()(),o(189,"clr-code-snippet",17)(190,"clr-code-snippet",18),t(191,"h3"),e(192,"Template driven"),l(),t(193,"p"),e(194,"Validation will happen on blur"),l(),t(195,"form",19)(196,"clr-multilingual-input",20),g("ngModelChange",function(i){return p(n.data1,i)||(n.data1=i),i}),t(197,"label",12),e(198,"Template"),l(),t(199,"clr-control-error"),e(200,"Please translate in every language!"),l(),t(201,"clr-control-helper"),e(202,"Helper text"),l()(),t(203,"clr-multilingual-textarea",21),g("ngModelChange",function(i){return p(n.data2,i)||(n.data2=i),i}),t(204,"label",12),e(205,"Template"),l(),t(206,"clr-control-error"),e(207,"Please translate in every language!"),l(),t(208,"clr-control-helper"),e(209,"Helper text"),l()(),t(210,"h4"),e(211,"Output texts"),l(),t(212,"div",14)(213,"div",15)(214,"b"),e(215,"Input"),l(),o(216,"br"),e(217),o(218,"br"),e(219),o(220,"br"),e(221),l(),t(222,"div",16)(223,"b"),e(224,"Textarea"),l(),o(225,"br"),e(226),o(227,"br"),e(228),o(229,"br"),e(230),l()(),t(231,"h4"),e(232,"Output texts"),l()(),o(233,"clr-code-snippet",17)(234,"clr-code-snippet",18),t(235,"h3"),e(236,"Missing texts handling"),l(),t(237,"p"),e(238," To not only show an empty string for missing texts in a given language, the component provides the possibility to define a prefix for missing texts with a fallback logic to show the text of another language. "),l(),t(239,"p"),e(240,"Fallback text logic:"),l(),t(241,"ul")(242,"li"),e(243,"Text from fallback language ("),t(244,"code",4),e(245,"clrFallbackLang"),l(),e(246,")"),l(),t(247,"li"),e(248," Text of first shown (defined in "),t(249,"code",4),e(250,"clrLanguages"),l(),e(251," if present) non-empty language ordered by language "),l(),t(252,"li"),e(253," Text of first hidden (not defined in "),t(254,"code",4),e(255,"clrLanguages"),l(),e(256," if present) non-empty language ordered by language "),l()(),t(257,"form",19)(258,"clr-multilingual-input",22),g("ngModelChange",function(i){return p(n.templateNa,i)||(n.templateNa=i),i}),t(259,"label",23),e(260,"Missing Text"),l()(),o(261,"clr-code-snippet",17)(262,"clr-code-snippet",18),t(263,"clr-multilingual-input",24),g("ngModelChange",function(i){return p(n.templateNa2,i)||(n.templateNa2=i),i}),t(264,"label",23),e(265,"Missing Text hidden fallback"),l()(),o(266,"clr-code-snippet",17)(267,"clr-code-snippet",18),l(),t(268,"h3"),e(269,"Language icon support"),l(),t(270,"p"),e(271," You can optionally provide "),t(272,"code",4),e(273,"clrLanguageIcons"),l(),e(274," to render icons per language in the selector. "),l(),t(275,"form",19)(276,"clr-multilingual-input",25),g("ngModelChange",function(i){return p(n.iconsData,i)||(n.iconsData=i),i}),t(277,"label",23),e(278,"Language Icons"),l()(),t(279,"clr-multilingual-textarea",26),g("ngModelChange",function(i){return p(n.iconsTextareaData,i)||(n.iconsTextareaData=i),i}),t(280,"label",23),e(281,"Language Icons Textarea"),l()()(),o(282,"clr-code-snippet",17)(283,"clr-code-snippet",17)(284,"clr-code-snippet",18),l()()()),c&2&&(r("title",n.title),a(153),r("formGroup",n.exampleForm),a(8),r("rows",3),a(14),m(" EN: ",n.exampleForm.get("sample1").value.get("EN")),a(2),m(" DE: ",n.exampleForm.get("sample1").value.get("DE")),a(2),m(" FR: ",n.exampleForm.get("sample1").value.get("FR")," "),a(5),m(" EN: ",n.exampleForm.get("sample2").value.get("EN")),a(2),m(" DE: ",n.exampleForm.get("sample2").value.get("DE")),a(2),m(" FR: ",n.exampleForm.get("sample2").value.get("FR")," "),a(),r("clrCode",n.reactiveExample),a(),r("clrCode",n.reactiveTSExample),a(6),d("ngModel",n.data1),r("ngModelOptions",E(40,le)),a(7),d("ngModel",n.data2),r("rows",3)("ngModelOptions",E(41,le)),a(14),m(" EN: ",n.data1.get("EN")),a(2),m(" DE: ",n.data1.get("DE")),a(2),m(" FR: ",n.data1.get("FR")," "),a(5),m(" EN: ",n.data2.get("EN")),a(2),m(" DE: ",n.data2.get("DE")),a(2),m(" FR: ",n.data2.get("FR")," "),a(3),r("clrCode",n.templateExample),a(),r("clrCode",n.templateTSExample),a(24),d("ngModel",n.templateNa),r("clrLanguages",n.languagesNa),a(3),r("clrCode",n.naExample),a(),r("clrCode",n.naTSExample),a(),d("ngModel",n.templateNa2),r("clrLanguages",n.languagesNa2),a(3),r("clrCode",n.na2Example),a(),r("clrCode",n.na2TSExample),a(9),d("ngModel",n.iconsData),r("clrLanguageIcons",n.languageIcons),a(3),d("ngModel",n.iconsTextareaData),r("clrLanguageIcons",n.languageIcons)("rows",3),a(3),r("clrCode",n.iconsExample),a(),r("clrCode",n.iconsTextareaExample),a(),r("clrCode",n.iconsTSExample))},dependencies:[L,w,y,I,T,F,_,H,X,V,B,K,ee,Z,j,z,U],encapsulation:2})}return s})();var Ae=(()=>{class s{static \u0275fac=function(c){return new(c||s)};static \u0275mod=v({type:s});static \u0275inj=f({imports:[N,R,A,J,G,Q,te,q.forChild([{path:"",component:ne}]),Y]})}return s})();export{Ae as MultilingualInputDemoModule};
