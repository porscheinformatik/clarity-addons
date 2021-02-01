!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var l=0;l<t.length;l++){var r=t[l];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function r(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var l,r=n(e);if(t){var c=n(this).constructor;l=Reflect.construct(r,arguments,c)}else l=r.apply(this,arguments);return a(this,l)}}function a(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{Qy6K:function(a,n,c){"use strict";c.r(n),c.d(n,"MultilingualInputDemoModule",function(){return x});var o,i,b=c("ofXK"),s=c("3Pt+"),u=c("tyNb"),p=c("8MG2"),d=c("6Y1o"),m=c("XPsC"),g=c("JsA7"),O=c("N+3j"),f=c("fXoL"),h=c("0G9f"),P=c("vAyd"),v=function(){return{updateOn:"blur"}},A=((i=function(a){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(b,a);var n,c,o,i=r(b);function b(){var t;return e(this,b),(t=i.call(this,"multilingual-input")).templateExample='\n<clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data1"\n    [ngModelOptions]="{ updateOn: \'blur\' }" clrRequiredAllMultilang clrControlClasses="clr-col-md-5" name="template1">\n    <label class="clr-col-md-2 required">Template</label>\n    <clr-control-error>Please translate in every language!</clr-control-error>\n    <clr-control-helper>Helper text</clr-control-helper>\n</clr-multilingual-input>\n<clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data2"\n    [ngModelOptions]="{ updateOn: \'blur\' }" clrRequiredAllMultilang clrControlClasses="clr-col-md-5" name="template2">\n    <label class="clr-col-md-2 required">Template</label>\n    <clr-control-error>Please translate in every language!</clr-control-error>\n    <clr-control-helper>Helper text</clr-control-helper>\n</clr-multilingual-textarea>\n',t.templateTSExample='\ndata1 = new Map();\nthis.data1.set("EN", "english text");\nthis.data1.set("DE", "deutscher text");\nthis.data1.set("FR", "texte fran\xe7ais");\n',t.reactiveExample='\n<form clrForm [formGroup]="exampleForm">\n    <clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample1"\n        clrControlClasses="clr-col-md-5" name="reactive1">\n\n        <label class="clr-col-md-2 required">Reactive</label>\n        <clr-control-helper>Helper text</clr-control-helper>\n        <clr-control-error>Please translate in every language!</clr-control-error>\n    </clr-multilingual-input>\n    <clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample2"\n        clrControlClasses="clr-col-md-5" name="reactive2">\n\n        <label class="clr-col-md-2 required">Reactive</label>\n        <clr-control-helper>Helper text</clr-control-helper>\n        <clr-control-error>Please translate in every language!</clr-control-error>\n    </clr-multilingual-textarea>\n</form>\n',t.reactiveTSExample='\nreactiveData1 = new Map();\nthis.reactiveData1.set("EN", "english text");\nthis.reactiveData1.set("DE", "deutscher text");\nthis.reactiveData1.set("FR", "texte fran\xe7ais");\n\nexampleForm = new FormGroup({\n  sample1: new FormControl(this.reactiveData1, {\n    updateOn: "blur",\n    validators: [ClrMultilingualInputValidators.requiredAll()]\n  })\n});\n',t.data1=new Map,t.data2=new Map,t.reactiveData1=new Map,t.reactiveData2=new Map,t.exampleForm=new s.e({sample1:new s.c(t.reactiveData1,{updateOn:"blur",validators:[d.w.requiredAll()]}),sample2:new s.c(t.reactiveData2,{updateOn:"blur",validators:[d.w.requiredAll()]})}),t}return n=b,(c=[{key:"ngOnInit",value:function(){this.data1.set("EN","english text"),this.data1.set("DE","deutscher text"),this.data1.set("FR","texte fran\xe7ais"),this.data2.set("EN","english text\nSecond line with a little more text"),this.data2.set("DE","deutscher text\nZweite Zeile mit etwas mehr Text"),this.data2.set("FR","texte fran\xe7ais\nDeuxi\xe8me ligne avec un peu plus de texte"),this.reactiveData1.set("EN","english text"),this.reactiveData1.set("DE","deutscher text"),this.reactiveData1.set("FR","texte fran\xe7ais"),this.reactiveData2.set("EN","english text\nSecond line with a little more text"),this.reactiveData2.set("DE","deutscher text\nZweite Zeile mit etwas mehr Text"),this.reactiveData2.set("FR","texte fran\xe7ais\nDeuxi\xe8me ligne avec un peu plus de texte")}}])&&t(n.prototype,c),o&&t(n,o),b}(O.a)).\u0275fac=function(e){return new(e||i)},i.\u0275cmp=f.Db({type:i,selectors:[["clr-multilingual-demo"]],hostVars:4,hostBindings:function(e,t){2&e&&f.Bb("content-area",!0)("dox-content-panel",!0)},features:[f.vb],decls:162,vars:24,consts:[[3,"title"],[1,"component-summary"],["id","code-examples"],["id","examples"],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["clrForm","",3,"formGroup"],["clrSelectedLang","EN","formControlName","sample1","clrControlClasses","clr-col-md-5","name","reactive1",1,"clr-col-12","clr-row"],[1,"clr-col-md-2","required"],["clrSelectedLang","EN","formControlName","sample2","clrControlClasses","clr-col-md-5","name","reactive2",1,"clr-col-12","clr-row"],[1,"clr-row"],[1,"clr-col-4"],[1,"clr-col-8"],[3,"clrCode"],["clrLanguage","typescript",3,"clrCode"],["clrForm",""],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-md-5","name","template1",1,"clr-col-12","clr-row",3,"ngModel","ngModelOptions","ngModelChange"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-md-5","name","template2",1,"clr-col-12","clr-row",3,"ngModel","ngModelOptions","ngModelChange"]],template:function(e,t){1&e&&(f.Pb(0,"clr-doc-wrapper",0),f.Pb(1,"article"),f.Pb(2,"h5",1),f.Ac(3,"The multilingual input/textarea fields are used to enter texts in different languages."),f.Ob(),f.Pb(4,"div",2),f.Pb(5,"h3",3),f.Ac(6,"Code & Examples"),f.Ob(),f.Pb(7,"p"),f.Ac(8," The multilingual input/textarea components require you to use custom validators: "),f.Ob(),f.Pb(9,"ul"),f.Pb(10,"li"),f.Ac(11," Reactive forms: "),f.Pb(12,"code",4),f.Ac(13,"ClrMultilingualInputValidators"),f.Ob(),f.Ob(),f.Pb(14,"li"),f.Ac(15," Template-driven forms: "),f.Pb(16,"code",4),f.Ac(17,"clrRequiredOneMultilang, clrRequiredAllMultilang"),f.Ob(),f.Ob(),f.Ob(),f.Pb(18,"h2"),f.Ac(19,"Angular Component"),f.Ob(),f.Pb(20,"h3"),f.Ac(21,"Summary of Options"),f.Ob(),f.Pb(22,"table",5),f.Pb(23,"thead"),f.Pb(24,"tr"),f.Pb(25,"th",6),f.Ac(26,"Parameter"),f.Ob(),f.Pb(27,"th",7),f.Ac(28,"Values"),f.Ob(),f.Pb(29,"th",8),f.Ac(30,"Default"),f.Ob(),f.Pb(31,"th",6),f.Ac(32,"Effect"),f.Ob(),f.Ob(),f.Ob(),f.Pb(33,"tbody"),f.Pb(34,"tr"),f.Pb(35,"td",6),f.Pb(36,"b"),f.Ac(37,"value binding (ngModel or reactive)"),f.Ob(),f.Pb(38,"div",9),f.Ac(39,"Type: Map<string, string>"),f.Ob(),f.Pb(40,"div",9),f.Ac(41,"Default: null"),f.Ob(),f.Ob(),f.Pb(42,"td",7),f.Ac(43,"Map of language and translation"),f.Ob(),f.Pb(44,"td",8),f.Ac(45,"null"),f.Ob(),f.Pb(46,"td",6),f.Ac(47,"Value binding for control represented by a map of language as key and translation as value."),f.Ob(),f.Ob(),f.Pb(48,"tr"),f.Pb(49,"td",6),f.Pb(50,"b"),f.Ac(51,"[clrSelectedLang]"),f.Ob(),f.Pb(52,"div",9),f.Ac(53,"Type: String"),f.Ob(),f.Pb(54,"div",9),f.Ac(55,'Default: ""'),f.Ob(),f.Ob(),f.Pb(56,"td",7),f.Ac(57,"Javascript String"),f.Ob(),f.Pb(58,"td",8),f.Ac(59,'""'),f.Ob(),f.Pb(60,"td",6),f.Ac(61,"Defines the currently selected language."),f.Ob(),f.Ob(),f.Pb(62,"tr"),f.Pb(63,"td",6),f.Pb(64,"b"),f.Ac(65,"[clrControlClasses]"),f.Ob(),f.Pb(66,"div",9),f.Ac(67,"Type: String"),f.Ob(),f.Pb(68,"div",9),f.Ac(69,'Default: "clr-col-md-10"'),f.Ob(),f.Ob(),f.Pb(70,"td",7),f.Ac(71,"Javascript String"),f.Ob(),f.Pb(72,"td",8),f.Ac(73,'"clr-col-md-10"'),f.Ob(),f.Pb(74,"td",6),f.Ac(75,"Defines the css classes applied to the input control."),f.Ob(),f.Ob(),f.Ob(),f.Ob(),f.Pb(76,"h3"),f.Ac(77,"Reactive forms"),f.Ob(),f.Pb(78,"p"),f.Ac(79,"Validation will happen on blur"),f.Ob(),f.Pb(80,"form",10),f.Pb(81,"clr-multilingual-input",11),f.Pb(82,"label",12),f.Ac(83,"Reactive"),f.Ob(),f.Pb(84,"clr-control-helper"),f.Ac(85,"Helper text"),f.Ob(),f.Pb(86,"clr-control-error"),f.Ac(87,"Please translate in every language!"),f.Ob(),f.Ob(),f.Pb(88,"clr-multilingual-textarea",13),f.Pb(89,"label",12),f.Ac(90,"Reactive"),f.Ob(),f.Pb(91,"clr-control-helper"),f.Ac(92,"Helper text"),f.Ob(),f.Pb(93,"clr-control-error"),f.Ac(94,"Please translate in every language!"),f.Ob(),f.Ob(),f.Pb(95,"h4"),f.Ac(96,"Output texts"),f.Ob(),f.Pb(97,"div",14),f.Pb(98,"div",15),f.Pb(99,"b"),f.Ac(100,"Input"),f.Ob(),f.Kb(101,"br"),f.Ac(102),f.Kb(103,"br"),f.Ac(104),f.Kb(105,"br"),f.Ac(106),f.Ob(),f.Pb(107,"div",16),f.Pb(108,"b"),f.Ac(109,"Textarea"),f.Ob(),f.Kb(110,"br"),f.Ac(111),f.Kb(112,"br"),f.Ac(113),f.Kb(114,"br"),f.Ac(115),f.Ob(),f.Ob(),f.Ob(),f.Kb(116,"clr-code-snippet",17),f.Kb(117,"clr-code-snippet",18),f.Pb(118,"h3"),f.Ac(119,"Template driven"),f.Ob(),f.Pb(120,"p"),f.Ac(121,"Validation will happen on blur"),f.Ob(),f.Pb(122,"form",19),f.Pb(123,"clr-multilingual-input",20),f.Wb("ngModelChange",function(e){return t.data1=e}),f.Pb(124,"label",12),f.Ac(125,"Template"),f.Ob(),f.Pb(126,"clr-control-error"),f.Ac(127,"Please translate in every language!"),f.Ob(),f.Pb(128,"clr-control-helper"),f.Ac(129,"Helper text"),f.Ob(),f.Ob(),f.Pb(130,"clr-multilingual-textarea",21),f.Wb("ngModelChange",function(e){return t.data2=e}),f.Pb(131,"label",12),f.Ac(132,"Template"),f.Ob(),f.Pb(133,"clr-control-error"),f.Ac(134,"Please translate in every language!"),f.Ob(),f.Pb(135,"clr-control-helper"),f.Ac(136,"Helper text"),f.Ob(),f.Ob(),f.Pb(137,"h4"),f.Ac(138,"Output texts"),f.Ob(),f.Pb(139,"div",14),f.Pb(140,"div",15),f.Pb(141,"b"),f.Ac(142,"Input"),f.Ob(),f.Kb(143,"br"),f.Ac(144),f.Kb(145,"br"),f.Ac(146),f.Kb(147,"br"),f.Ac(148),f.Ob(),f.Pb(149,"div",16),f.Pb(150,"b"),f.Ac(151,"Textarea"),f.Ob(),f.Kb(152,"br"),f.Ac(153),f.Kb(154,"br"),f.Ac(155),f.Kb(156,"br"),f.Ac(157),f.Ob(),f.Ob(),f.Pb(158,"h4"),f.Ac(159,"Output texts"),f.Ob(),f.Ob(),f.Kb(160,"clr-code-snippet",17),f.Kb(161,"clr-code-snippet",18),f.Ob(),f.Ob(),f.Ob()),2&e&&(f.gc("title",t.title),f.yb(80),f.gc("formGroup",t.exampleForm),f.yb(22),f.Cc(" EN: ",t.exampleForm.get("sample1").value.get("EN"),""),f.yb(2),f.Cc(" DE: ",t.exampleForm.get("sample1").value.get("DE"),""),f.yb(2),f.Cc(" FR: ",t.exampleForm.get("sample1").value.get("FR")," "),f.yb(5),f.Cc(" EN: ",t.exampleForm.get("sample2").value.get("EN"),""),f.yb(2),f.Cc(" DE: ",t.exampleForm.get("sample2").value.get("DE"),""),f.yb(2),f.Cc(" FR: ",t.exampleForm.get("sample2").value.get("FR")," "),f.yb(1),f.gc("clrCode",t.reactiveExample),f.yb(1),f.gc("clrCode",t.reactiveTSExample),f.yb(6),f.gc("ngModel",t.data1)("ngModelOptions",f.kc(22,v)),f.yb(7),f.gc("ngModel",t.data2)("ngModelOptions",f.kc(23,v)),f.yb(14),f.Cc(" EN: ",t.data1.get("EN"),""),f.yb(2),f.Cc(" DE: ",t.data1.get("DE"),""),f.yb(2),f.Cc(" FR: ",t.data1.get("FR")," "),f.yb(5),f.Cc(" EN: ",t.data2.get("EN"),""),f.yb(2),f.Cc(" DE: ",t.data2.get("DE"),""),f.yb(2),f.Cc(" FR: ",t.data2.get("FR")," "),f.yb(3),f.gc("clrCode",t.templateExample),f.yb(1),f.gc("clrCode",t.templateTSExample))},directives:[h.a,s.B,s.o,p.y,s.f,d.v,s.n,s.d,p.G,p.n,p.m,d.y,P.a,s.p,d.H,s.q],encapsulation:2}),i),x=((o=function t(){e(this,t)}).\u0275mod=f.Hb({type:o}),o.\u0275inj=f.Gb({factory:function(e){return new(e||o)},imports:[[b.c,s.h,s.v,p.a,p.z,m.a,g.a,u.g.forChild([{path:"",component:A}]),d.b]]}),o)}}])}();