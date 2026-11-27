import{n as P,r as ie$1,t as O}from"./chunk-agnf9ZDH.js";import{$n as T,Ba as j,Bn as Rhe,Hr as Xe,In as R1,Mo as oi,Ms as v,N as Boe,O as B,Oi as bi,Pa as ie$2,Pi as c3e,Pt as K,St as IS,T as Ai,Vn as Ri,Za as kj,Zt as Lp,b as A,bn as PT,cc as zR,cn as Nj,d as $,dn as O$1,do as mr,ea as ee,ec as y$1,f as $9,ft as GR,gs as tde,ho as n3e,hs as t_,ii as Zn,is as s3e,l as _e,lo as me$1,mc as zoe,ms as tN,ns as ri,oi as Zoe,rs as rt,s as O$2,sa as f,xa as gt}from"./main-MZS5HDZR.js";import{Jt as Hp,Ra as Zp,Xa as _o,fo as b7,rd as wp}from"./chunk-Dj4ysbNo.js";var ie=()=>({updateOn:`blur`});var re=()=>[`EN`,`DE`,`FR`,`IT`];var oe=()=>[`EN`];me$1.addIcons(c3e,n3e,s3e);var se=`
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
`;var me=`
data1 = new Map();
this.data1.set("EN", "english text");
this.data1.set("DE", "deutscher text");
this.data1.set("FR", "texte fran\xE7ais");
`;var ge=`
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
`;var de=`
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
`;var ue=`
<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="templateNA"
  clrSelectedLang="EN" [(ngModel)]="templateNa" [clrLanguages]="languagesNa" clrMissingPrefix="<na> ">
    <label class="clr-col-md-2">Missing Text</label>
</clr-multilingual-input>
`;var pe=`
templateNa = new Map();
languagesNa = ["EN", "DE"];

this.templateNa.set("EN", "english text");
`;var Ee=`
<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="templateNA2"
  clrSelectedLang="EN" clrFallbackLang="FR" [(ngModel)]="templateNa2" [clrLanguages]="languagesNa2" clrMissingPrefix="<na> ">
    <label class="clr-col-md-2">Missing Text hidden fallback</label>
</clr-multilingual-input>
`;var xe=`
templateNa2 = new Map();
languagesNa2 = ["EN", "DE"];

this.templateNa2.set("EN", "english text");
this.templateNa2.set("FR", "texte fran\xE7ais");
`;var he=`
<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="iconsExample"
  clrSelectedLang="EN" [(ngModel)]="iconsData" [clrLanguages]="['EN', 'DE', 'FR', 'IT']" [clrLanguageIcons]="languageIcons">
    <label class="clr-col-md-2">Language Icons</label>
</clr-multilingual-input>
`;var Se=`
<clr-multilingual-textarea class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="iconsTextareaExample"
  clrSelectedLang="EN" [(ngModel)]="iconsTextareaData" [clrLanguages]="['EN', 'DE', 'FR', 'IT']" [clrLanguageIcons]="languageIcons" [rows]="3">
    <label class="clr-col-md-2">Language Icons Textarea</label>
</clr-multilingual-textarea>
`;var Me=`
<clr-multilingual-input class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="singleLanguageIconsExample"
  clrSelectedLang="EN" [(ngModel)]="singleLanguageIconsData" [clrLanguages]="['EN']" [clrLanguageIcons]="singleLanguageIcons">
    <label class="clr-col-md-2">Single Language Icon</label>
</clr-multilingual-input>
`;var fe=`
<clr-multilingual-textarea class="clr-col-12 clr-row" clrControlClasses="clr-col-md-5" name="singleLanguageIconsTextareaExample"
  clrSelectedLang="EN" [(ngModel)]="singleLanguageIconsTextareaData" [clrLanguages]="['EN']" [clrLanguageIcons]="singleLanguageIcons" [rows]="3">
    <label class="clr-col-md-2">Single Language Icon Textarea</label>
</clr-multilingual-textarea>
`;var Ce=`
iconsData = new Map();
iconsTextareaData = new Map();
languageIcons = new Map<string, string>();
singleLanguageIconsData = new Map();
singleLanguageIconsTextareaData = new Map();
singleLanguageIcons = new Map<string, string>();

this.iconsData.set("EN", "english text");
this.iconsData.set("DE", "deutscher text");
this.iconsData.set("FR", "texte fran\xE7ais");
this.iconsData.set("IT", "testo italiano");
this.iconsTextareaData.set("EN", "english text\\nsecond line");
this.iconsTextareaData.set("DE", "deutscher text\\nzweite zeile");
this.iconsTextareaData.set("FR", "texte fran\xE7ais\\ndeuxi\xE8me ligne");
this.iconsTextareaData.set("IT", "testo italiano\\nseconda riga");
this.languageIcons.set("DE", "link");
this.languageIcons.set("FR", "flag");
this.languageIcons.set("EN", "unlink");
this.languageIcons.set("IT", "link");
this.singleLanguageIconsData.set("EN", "english text");
this.singleLanguageIconsTextareaData.set("EN", "english text\\nsecond line");
this.singleLanguageIcons.set("EN", "unlink");
`;var y=(()=>{class g extends P{templateExample=se;templateTSExample=me;reactiveExample=ge;reactiveTSExample=de;naExample=ue;naTSExample=pe;na2Example=Ee;na2TSExample=xe;iconsExample=he;iconsTextareaExample=Se;singleLanguageIconsExample=Me;singleLanguageIconsTextareaExample=fe;iconsTSExample=Ce;data1=/* @__PURE__ */ new Map;data2=/* @__PURE__ */ new Map;reactiveData1=/* @__PURE__ */ new Map;reactiveData2=/* @__PURE__ */ new Map;templateNa=/* @__PURE__ */ new Map;templateNa2=/* @__PURE__ */ new Map;iconsData=/* @__PURE__ */ new Map;iconsTextareaData=/* @__PURE__ */ new Map;singleLanguageIconsData=/* @__PURE__ */ new Map([[`EN`,`english text`]]);singleLanguageIconsTextareaData=/* @__PURE__ */ new Map([[`EN`,`english text
second line`]]);languageIcons=/* @__PURE__ */ new Map;singleLanguageIcons=/* @__PURE__ */ new Map([[`EN`,`link`]]);languagesNa=[`EN`,`DE`];languagesNa2=[`EN`,`DE`];exampleForm=new $9({sample1:new t_(this.reactiveData1,{updateOn:`blur`,validators:[b7.requiredAll()]}),sample2:new t_(this.reactiveData2,{updateOn:`blur`,validators:[b7.requiredAll()]})});constructor(){super(`multilingual-input`)}ngOnInit(){this.data1.set(`EN`,`english text`),this.data1.set(`DE`,`deutscher text`),this.data1.set(`FR`,`texte français`),this.data2.set(`EN`,`english text
Second line with a little more text`),this.data2.set(`DE`,`deutscher text
Zweite Zeile mit etwas mehr Text`),this.data2.set(`FR`,`texte fran\xE7ais
Deuxi\xE8me ligne avec un peu plus de texte`),this.reactiveData1.set(`EN`,`english text`),this.reactiveData1.set(`DE`,`deutscher text`),this.reactiveData1.set(`FR`,`texte français`),this.reactiveData2.set(`EN`,`english text
Second line with a little more text`),this.reactiveData2.set(`DE`,`deutscher text
Zweite Zeile mit etwas mehr Text`),this.reactiveData2.set(`FR`,`texte fran\xE7ais
Deuxi\xE8me ligne avec un peu plus de texte`),this.templateNa.set(`EN`,`english text`),this.templateNa2.set(`EN`,`english text`),this.templateNa2.set(`FR`,`texte français`),this.iconsData.set(`EN`,`english text`),this.iconsData.set(`DE`,`deutscher text`),this.iconsData.set(`FR`,`texte français`),this.iconsData.set(`IT`,`testo italiano`),this.iconsTextareaData.set(`EN`,`english text
second line`),this.iconsTextareaData.set(`DE`,`deutscher text
zweite zeile`),this.iconsTextareaData.set(`FR`,`texte fran\xE7ais
deuxi\xE8me ligne`),this.iconsTextareaData.set(`IT`,`testo italiano
seconda riga`),this.languageIcons.set(`DE`,`link`),this.languageIcons.set(`FR`,`flag`),this.languageIcons.set(`EN`,`unlink`),this.languageIcons.set(`IT`,`link`)}static ɵfac=function(E){return new(E||g)};static ɵcmp=O$1({type:g,selectors:[[`clr-multilingual-demo`]],hostVars:4,hostBindings:function(E,n){E&2&&T(`content-area`,!0)(`dox-content-panel`,!0)},features:[ee],decls:295,vars:57,consts:[[3,`title`],[1,`component-summary`],[`id`,`code-examples`],[`id`,`examples`],[1,`clr-code`],[1,`table`],[1,`left`],[1,`left`,`clr-hidden-xs-down`],[1,`clr-hidden-xs-down`],[1,`clr-hidden-sm-up`],[`clrForm`,``,3,`formGroup`],[`clrSelectedLang`,`EN`,`formControlName`,`sample1`,`clrControlClasses`,`clr-col-md-5`,`name`,`reactive1`,1,`clr-col-12`,`clr-row`],[1,`clr-col-md-2`,`clr-required-mark`],[`clrSelectedLang`,`EN`,`formControlName`,`sample2`,`clrControlClasses`,`clr-col-md-7 clr-col-7`,`name`,`reactive2`,1,`clr-col-12`,`clr-row`,3,`rows`],[1,`clr-row`],[1,`clr-col-4`],[1,`clr-col-8`],[3,`clrCode`],[`clrLanguage`,`typescript`,3,`clrCode`],[`clrForm`,``],[`clrSelectedLang`,`EN`,`clrRequiredAllMultilang`,``,`clrControlClasses`,`clr-col-md-5`,`name`,`template1`,1,`clr-col-12`,`clr-row`,3,`ngModelChange`,`ngModel`,`ngModelOptions`],[`clrSelectedLang`,`EN`,`clrRequiredAllMultilang`,``,`clrControlClasses`,`clr-col-md-7 clr-col-7`,`name`,`template2`,1,`clr-col-12`,`clr-row`,3,`ngModelChange`,`ngModel`,`rows`,`ngModelOptions`],[`clrControlClasses`,`clr-col-md-5`,`name`,`templateNA`,`clrSelectedLang`,`EN`,`clrMissingPrefix`,`<na> `,1,`clr-col-12`,`clr-row`,3,`ngModelChange`,`ngModel`,`clrLanguages`],[1,`clr-col-md-2`],[`clrControlClasses`,`clr-col-md-5`,`name`,`templateNA2`,`clrSelectedLang`,`EN`,`clrFallbackLang`,`FR`,`clrMissingPrefix`,`<na> `,1,`clr-col-12`,`clr-row`,3,`ngModelChange`,`ngModel`,`clrLanguages`],[`clrControlClasses`,`clr-col-md-5`,`name`,`iconsExample`,`clrSelectedLang`,`EN`,1,`clr-col-12`,`clr-row`,3,`ngModelChange`,`ngModel`,`clrLanguages`,`clrLanguageIcons`],[`clrControlClasses`,`clr-col-md-5`,`name`,`iconsTextareaExample`,`clrSelectedLang`,`EN`,1,`clr-col-12`,`clr-row`,3,`ngModelChange`,`ngModel`,`clrLanguages`,`clrLanguageIcons`,`rows`],[`clrControlClasses`,`clr-col-md-5`,`name`,`singleLanguageIconsExample`,`clrSelectedLang`,`EN`,1,`clr-col-12`,`clr-row`,3,`ngModelChange`,`ngModel`,`clrLanguages`,`clrLanguageIcons`],[`clrControlClasses`,`clr-col-md-5`,`name`,`singleLanguageIconsTextareaExample`,`clrSelectedLang`,`EN`,1,`clr-col-12`,`clr-row`,3,`ngModelChange`,`ngModel`,`clrLanguages`,`clrLanguageIcons`,`rows`]],template:function(E,n){E&1&&(y$1(0,`clr-doc-wrapper`,0)(1,`article`)(2,`h5`,1),ie$2(3,` The multilingual input/textarea fields are used to enter texts in different languages. `),v(),y$1(4,`div`,2)(5,`h3`,3),ie$2(6,`Code & Examples`),v(),y$1(7,`p`),ie$2(8,`The multilingual input/textarea components require you to use custom validators:`),v(),y$1(9,`ul`)(10,`li`),ie$2(11,`Reactive forms: `),y$1(12,`code`,4),ie$2(13,`ClrMultilingualInputValidators`),v()(),y$1(14,`li`),ie$2(15,`Template-driven forms: `),y$1(16,`code`,4),ie$2(17,`clrRequiredOneMultilang, clrRequiredAllMultilang`),v()()(),y$1(18,`h2`),ie$2(19,`Angular Component`),v(),y$1(20,`h3`),ie$2(21,`Summary of Options`),v(),y$1(22,`table`,5)(23,`thead`)(24,`tr`)(25,`th`,6),ie$2(26,`Parameter`),v(),y$1(27,`th`,7),ie$2(28,`Values`),v(),y$1(29,`th`,8),ie$2(30,`Default`),v(),y$1(31,`th`,6),ie$2(32,`Effect`),v()()(),y$1(33,`tbody`)(34,`tr`)(35,`td`,6)(36,`b`),ie$2(37,`value binding (ngModel or reactive)`),v(),y$1(38,`div`,9),ie$2(39,`Type: Map<string, string>`),v(),y$1(40,`div`,9),ie$2(41,`Default: null`),v()(),y$1(42,`td`,7),ie$2(43,`Map of language and translation`),v(),y$1(44,`td`,8),ie$2(45,`null`),v(),y$1(46,`td`,6),ie$2(47,` Value binding for control represented by a map of language as key and translation as value. `),v()(),y$1(48,`tr`)(49,`td`,6)(50,`b`),ie$2(51,`[clrSelectedLang]`),v(),y$1(52,`div`,9),ie$2(53,`Type: String`),v(),y$1(54,`div`,9),ie$2(55,`Default: ""`),v()(),y$1(56,`td`,7),ie$2(57,`Javascript String`),v(),y$1(58,`td`,8),ie$2(59,`""`),v(),y$1(60,`td`,6),ie$2(61,`Defines the currently selected language.`),v()(),y$1(62,`tr`)(63,`td`,6)(64,`b`),ie$2(65,`[clrControlClasses]`),v(),y$1(66,`div`,9),ie$2(67,`Type: String`),v(),y$1(68,`div`,9),ie$2(69,`Default: "clr-col-md-10"`),v()(),y$1(70,`td`,7),ie$2(71,`Javascript String`),v(),y$1(72,`td`,8),ie$2(73,`"clr-col-md-10"`),v(),y$1(74,`td`,6),ie$2(75,`Defines the css classes applied to the input control.`),v()(),y$1(76,`tr`)(77,`td`,6)(78,`b`),ie$2(79,`[clrShowSingleLanguageSelector]`),v(),y$1(80,`div`,9),ie$2(81,`Type: boolean`),v(),y$1(82,`div`,9),ie$2(83,`Default: false`),v()(),y$1(84,`td`,7),ie$2(85,`Javascript boolean`),v(),y$1(86,`td`,8),ie$2(87,`false`),v(),y$1(88,`td`,6),ie$2(89,`Defines whether the language selector is shown when only one language is present.`),v()(),y$1(90,`tr`)(91,`td`,6)(92,`b`),ie$2(93,`[clrLanguages]`),v(),y$1(94,`div`,9),ie$2(95,`Type: string[]`),v(),y$1(96,`div`,9),ie$2(97,`Default: undefined`),v()(),y$1(98,`td`,7),ie$2(99,`Javascript string array`),v(),y$1(100,`td`,8),ie$2(101,`undefined`),v(),y$1(102,`td`,6),ie$2(103,` Defines the languages to show in language selector independently from bound form model. `),v()(),y$1(104,`tr`)(105,`td`,6)(106,`b`),ie$2(107,`[clrFallbackLang]`),v(),y$1(108,`div`,9),ie$2(109,`Type: string`),v(),y$1(110,`div`,9),ie$2(111,`Default: undefined`),v()(),y$1(112,`td`,7),ie$2(113,`Javascript string`),v(),y$1(114,`td`,8),ie$2(115,`undefined`),v(),y$1(116,`td`,6),ie$2(117,` Defines the language to show text from when a text in a language is missing. `),y$1(118,`code`,4),ie$2(119,`clrMissingPrefix`),v(),ie$2(120,` must be defined as a prerequisite. `),v()(),y$1(121,`tr`)(122,`td`,6)(123,`b`),ie$2(124,`[clrMissingPrefix]`),v(),y$1(125,`div`,9),ie$2(126,`Type: string`),v(),y$1(127,`div`,9),ie$2(128,`Default: ""`),v()(),y$1(129,`td`,7),ie$2(130,`Javascript string`),v(),y$1(131,`td`,8),ie$2(132,`""`),v(),y$1(133,`td`,6),ie$2(134,`Defines the prefix which will be shown when a text in a language is missing.`),v()(),y$1(135,`tr`)(136,`td`,6)(137,`b`),ie$2(138,`[clrLanguageIcons]`),v(),y$1(139,`div`,9),ie$2(140,`Type: Map<string, string>`),v(),y$1(141,`div`,9),ie$2(142,`Default: undefined`),v()(),y$1(143,`td`,7),ie$2(144,`Map of language and Clarity icon shape`),v(),y$1(145,`td`,8),ie$2(146,`undefined`),v(),y$1(147,`td`,6),ie$2(148,`Optionally defines an icon per language key to render in the language selector.`),v()()()(),y$1(149,`h3`),ie$2(150,`Reactive forms`),v(),y$1(151,`p`),ie$2(152,`Validation will happen on blur`),v(),y$1(153,`form`,10)(154,`clr-multilingual-input`,11),Ai(),y$1(155,`label`,12),ie$2(156,`Reactive`),v(),y$1(157,`clr-control-helper`),ie$2(158,`Helper text`),v(),y$1(159,`clr-control-error`),ie$2(160,`Please translate in every language!`),v()(),y$1(161,`clr-multilingual-textarea`,13),Ai(),y$1(162,`label`,12),ie$2(163,`Reactive`),v(),y$1(164,`clr-control-helper`),ie$2(165,`Helper text`),v(),y$1(166,`clr-control-error`),ie$2(167,`Please translate in every language!`),v()(),y$1(168,`h4`),ie$2(169,`Output texts`),v(),y$1(170,`div`,14)(171,`div`,15)(172,`b`),ie$2(173,`Input`),v(),j(174,`br`),ie$2(175),j(176,`br`),ie$2(177),j(178,`br`),ie$2(179),v(),y$1(180,`div`,16)(181,`b`),ie$2(182,`Textarea`),v(),j(183,`br`),ie$2(184),j(185,`br`),ie$2(186),j(187,`br`),ie$2(188),v()()(),j(189,`clr-code-snippet`,17)(190,`clr-code-snippet`,18),y$1(191,`h3`),ie$2(192,`Template driven`),v(),y$1(193,`p`),ie$2(194,`Validation will happen on blur`),v(),y$1(195,`form`,19)(196,`clr-multilingual-input`,20),Ai(),oi(`ngModelChange`,function(i){return bi(n.data1,i)||(n.data1=i),i}),y$1(197,`label`,12),ie$2(198,`Template`),v(),y$1(199,`clr-control-error`),ie$2(200,`Please translate in every language!`),v(),y$1(201,`clr-control-helper`),ie$2(202,`Helper text`),v()(),y$1(203,`clr-multilingual-textarea`,21),Ai(),oi(`ngModelChange`,function(i){return bi(n.data2,i)||(n.data2=i),i}),y$1(204,`label`,12),ie$2(205,`Template`),v(),y$1(206,`clr-control-error`),ie$2(207,`Please translate in every language!`),v(),y$1(208,`clr-control-helper`),ie$2(209,`Helper text`),v()(),y$1(210,`h4`),ie$2(211,`Output texts`),v(),y$1(212,`div`,14)(213,`div`,15)(214,`b`),ie$2(215,`Input`),v(),j(216,`br`),ie$2(217),j(218,`br`),ie$2(219),j(220,`br`),ie$2(221),v(),y$1(222,`div`,16)(223,`b`),ie$2(224,`Textarea`),v(),j(225,`br`),ie$2(226),j(227,`br`),ie$2(228),j(229,`br`),ie$2(230),v()(),y$1(231,`h4`),ie$2(232,`Output texts`),v()(),j(233,`clr-code-snippet`,17)(234,`clr-code-snippet`,18),y$1(235,`h3`),ie$2(236,`Missing texts handling`),v(),y$1(237,`p`),ie$2(238,` To not only show an empty string for missing texts in a given language, the component provides the possibility to define a prefix for missing texts with a fallback logic to show the text of another language. `),v(),y$1(239,`p`),ie$2(240,`Fallback text logic:`),v(),y$1(241,`ul`)(242,`li`),ie$2(243,`Text from fallback language (`),y$1(244,`code`,4),ie$2(245,`clrFallbackLang`),v(),ie$2(246,`)`),v(),y$1(247,`li`),ie$2(248,` Text of first shown (defined in `),y$1(249,`code`,4),ie$2(250,`clrLanguages`),v(),ie$2(251,` if present) non-empty language ordered by language `),v(),y$1(252,`li`),ie$2(253,` Text of first hidden (not defined in `),y$1(254,`code`,4),ie$2(255,`clrLanguages`),v(),ie$2(256,` if present) non-empty language ordered by language `),v()(),y$1(257,`form`,19)(258,`clr-multilingual-input`,22),Ai(),oi(`ngModelChange`,function(i){return bi(n.templateNa,i)||(n.templateNa=i),i}),y$1(259,`label`,23),ie$2(260,`Missing Text`),v()(),j(261,`clr-code-snippet`,17)(262,`clr-code-snippet`,18),y$1(263,`clr-multilingual-input`,24),Ai(),oi(`ngModelChange`,function(i){return bi(n.templateNa2,i)||(n.templateNa2=i),i}),y$1(264,`label`,23),ie$2(265,`Missing Text hidden fallback`),v()(),j(266,`clr-code-snippet`,17)(267,`clr-code-snippet`,18),v(),y$1(268,`h3`),ie$2(269,`Language icon support`),v(),y$1(270,`p`),ie$2(271,` You can optionally provide `),y$1(272,`code`,4),ie$2(273,`clrLanguageIcons`),v(),ie$2(274,` to render icons per language in the selector. `),v(),y$1(275,`p`),ie$2(276,` If only one language is configured and an icon exists for that language, the selector renders as a non-clickable icon-only status indicator. `),v(),y$1(277,`form`,19)(278,`clr-multilingual-input`,25),Ai(),oi(`ngModelChange`,function(i){return bi(n.iconsData,i)||(n.iconsData=i),i}),y$1(279,`label`,23),ie$2(280,`Language Icons`),v()(),y$1(281,`clr-multilingual-textarea`,26),Ai(),oi(`ngModelChange`,function(i){return bi(n.iconsTextareaData,i)||(n.iconsTextareaData=i),i}),y$1(282,`label`,23),ie$2(283,`Language Icons Textarea`),v()(),y$1(284,`clr-multilingual-input`,27),Ai(),oi(`ngModelChange`,function(i){return bi(n.singleLanguageIconsData,i)||(n.singleLanguageIconsData=i),i}),y$1(285,`label`,23),ie$2(286,`Single Language Icon`),v()(),y$1(287,`clr-multilingual-textarea`,28),Ai(),oi(`ngModelChange`,function(i){return bi(n.singleLanguageIconsTextareaData,i)||(n.singleLanguageIconsTextareaData=i),i}),y$1(288,`label`,23),ie$2(289,`Single Language Icon Textarea`),v()()(),j(290,`clr-code-snippet`,17)(291,`clr-code-snippet`,17)(292,`clr-code-snippet`,18)(293,`clr-code-snippet`,17)(294,`clr-code-snippet`,17),v()()()),E&2&&(A(`title`,n.title),f(153),A(`formGroup`,n.exampleForm),f(),Ri(),f(7),A(`rows`,3),Ri(),f(14),gt(` EN: `,n.exampleForm.get(`sample1`).value.get(`EN`)),f(2),gt(` DE: `,n.exampleForm.get(`sample1`).value.get(`DE`)),f(2),gt(` FR: `,n.exampleForm.get(`sample1`).value.get(`FR`),` `),f(5),gt(` EN: `,n.exampleForm.get(`sample2`).value.get(`EN`)),f(2),gt(` DE: `,n.exampleForm.get(`sample2`).value.get(`DE`)),f(2),gt(` FR: `,n.exampleForm.get(`sample2`).value.get(`FR`),` `),f(),A(`clrCode`,n.reactiveExample),f(),A(`clrCode`,n.reactiveTSExample),f(6),ri(`ngModel`,n.data1),A(`ngModelOptions`,PT(51,ie)),Ri(),f(7),ri(`ngModel`,n.data2),A(`rows`,3)(`ngModelOptions`,PT(52,ie)),Ri(),f(14),gt(` EN: `,n.data1.get(`EN`)),f(2),gt(` DE: `,n.data1.get(`DE`)),f(2),gt(` FR: `,n.data1.get(`FR`),` `),f(5),gt(` EN: `,n.data2.get(`EN`)),f(2),gt(` DE: `,n.data2.get(`DE`)),f(2),gt(` FR: `,n.data2.get(`FR`),` `),f(3),A(`clrCode`,n.templateExample),f(),A(`clrCode`,n.templateTSExample),f(24),ri(`ngModel`,n.templateNa),A(`clrLanguages`,n.languagesNa),Ri(),f(3),A(`clrCode`,n.naExample),f(),A(`clrCode`,n.naTSExample),f(),ri(`ngModel`,n.templateNa2),A(`clrLanguages`,n.languagesNa2),Ri(),f(3),A(`clrCode`,n.na2Example),f(),A(`clrCode`,n.na2TSExample),f(11),ri(`ngModel`,n.iconsData),A(`clrLanguages`,PT(53,re))(`clrLanguageIcons`,n.languageIcons),Ri(),f(3),ri(`ngModel`,n.iconsTextareaData),A(`clrLanguages`,PT(54,re))(`clrLanguageIcons`,n.languageIcons)(`rows`,3),Ri(),f(3),ri(`ngModel`,n.singleLanguageIconsData),A(`clrLanguages`,PT(55,oe))(`clrLanguageIcons`,n.singleLanguageIcons),Ri(),f(3),ri(`ngModel`,n.singleLanguageIconsTextareaData),A(`clrLanguages`,PT(56,oe))(`clrLanguageIcons`,n.singleLanguageIcons)(`rows`,3),Ri(),f(3),A(`clrCode`,n.iconsExample),f(),A(`clrCode`,n.iconsTextareaExample),f(),A(`clrCode`,n.iconsTSExample),f(),A(`clrCode`,n.singleLanguageIconsExample),f(),A(`clrCode`,n.singleLanguageIconsTextareaExample))},dependencies:[O,Zn,Boe,mr,Zoe,R1,zR,rt,Xe,Nj,kj,tde,zoe,GR,tN,Hp,_o,Zp,O$2,wp,K,Rhe,IS,_e,ie$1],encapsulation:2,changeDetection:1})}return g})();var Ge=(()=>{class g{static ɵfac=function(E){return new(E||g)};static ɵmod=$({type:g});static ɵinj=B({imports:[K,Zn,zoe,Rhe,IS,_e,ie$1,Lp.forChild([{path:``,component:y}]),y]})}return g})();export{Ge as MultilingualInputDemoModule};