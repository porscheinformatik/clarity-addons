!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,n){return(t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,n)}function n(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=o(e);if(t){var c=o(this).constructor;n=Reflect.construct(r,arguments,c)}else n=r.apply(this,arguments);return i(this,n)}}function i(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function o(e){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{"I4/O":function(i,o,r){"use strict";r.r(o),r.d(o,"ProgressSpinnerDemoModule",(function(){return v}));var c,s,a=r("3Pt+"),l=r("ofXK"),b=r("8MG2"),d=r("N+3j"),p=r("fXoL"),u=r("0G9f"),f=r("6Y1o"),S=r("vAyd"),m=((c=function(i){!function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&t(e,n)}(r,i);var o=n(r);function r(){var t;return e(this,r),(t=o.call(this,"progress-spinner")).htmlExample='\n<div class="clr-row">\n    <div class="clr-col-6">\n        <div class="card">\n            <clr-progress-spinner [clrShowSpinner]="cardLoadingState"></clr-progress-spinner>\n            ...\n        </div>\n    </div>\n</div>\n<button class="btn btn-primary" (click)="cardLoadingState = !cardLoadingState">Toggle Loading</button>\n',t.htmlExample2='\n<div>\n  <clr-progress-spinner [clrShowSpinner]="loadingState" clrSize="md"></clr-progress-spinner>\n  <h2>Content Title</h2>\n    <p>...</p>\n</div>\n\n<button class="btn btn-primary" (click)="loadingState = !loadingState">Toggle Loading</button>\n',t}return r}(d.a)).\u0275fac=function(e){return new(e||c)},c.\u0275cmp=p.Hb({type:c,selectors:[["clr-progress-spinner-demo"]],hostVars:4,hostBindings:function(e,t){2&e&&p.Eb("content-area",!0)("dox-content-panel",!0)},features:[p.yb],decls:85,vars:8,consts:[[3,"ng","ui","title","newLayout"],[1,"component-summary"],["id","design-guidelines"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["id","code-examples"],["id","examples"],[1,"clr-row"],[1,"clr-col-6"],[1,"card"],[3,"clrShowSpinner"],[1,"card-header"],[1,"card-block"],[1,"card-title"],[1,"card-text"],[1,"card-footer"],[1,"btn","btn-primary",3,"click"],[3,"clrCode"],[2,"position","relative","background-color","#ddd","padding","1rem","margin-top","1rem"],["clrSize","md",3,"clrShowSpinner"],[2,"margin-top","0"]],template:function(e,t){1&e&&(p.Tb(0,"clr-doc-wrapper",0),p.Tb(1,"article"),p.Tb(2,"h5",1),p.Fc(3,"The progress spinner of Clarity Addons extends the default progress spinner by an Angular Component which allows the developer to toggle the loading state depending on a boolean input."),p.Sb(),p.Tb(4,"div",2),p.Tb(5,"h3"),p.Fc(6,"Summary of Options"),p.Sb(),p.Tb(7,"table",3),p.Tb(8,"thead"),p.Tb(9,"tr"),p.Tb(10,"th",4),p.Fc(11,"Input"),p.Sb(),p.Tb(12,"th",5),p.Fc(13,"Values"),p.Sb(),p.Tb(14,"th",6),p.Fc(15,"Default"),p.Sb(),p.Tb(16,"th",4),p.Fc(17,"Effect"),p.Sb(),p.Sb(),p.Sb(),p.Tb(18,"tbody"),p.Tb(19,"tr"),p.Tb(20,"td",4),p.Tb(21,"b"),p.Fc(22,"clrShowSpinner"),p.Sb(),p.Tb(23,"div",7),p.Fc(24,"Type: boolean"),p.Sb(),p.Tb(25,"div",7),p.Fc(26,"Default: false"),p.Sb(),p.Sb(),p.Tb(27,"td",5),p.Fc(28,"true, false"),p.Sb(),p.Tb(29,"td",6),p.Fc(30,"false"),p.Sb(),p.Tb(31,"td",4),p.Fc(32,"Controls if the spinner is shown"),p.Sb(),p.Sb(),p.Tb(33,"tr"),p.Tb(34,"td",4),p.Tb(35,"b"),p.Fc(36,"clrSize"),p.Sb(),p.Tb(37,"div",7),p.Fc(38,"Type: String"),p.Sb(),p.Tb(39,"div",7),p.Fc(40,'Default: "sm"'),p.Sb(),p.Sb(),p.Tb(41,"td",5),p.Fc(42,"sm, md, lg"),p.Sb(),p.Tb(43,"td",6),p.Fc(44,'"sm"'),p.Sb(),p.Tb(45,"td",4),p.Fc(46,"Defines the size of progress spinner"),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Tb(47,"div",8),p.Tb(48,"h3",9),p.Fc(49,"Code & Examples"),p.Sb(),p.Tb(50,"h4"),p.Fc(51,"The progress spinner on top of any card"),p.Sb(),p.Tb(52,"p"),p.Fc(53,"When having multiple cards which can be loaded independently, it is possible show a progress spinner on any specific card:"),p.Sb(),p.Tb(54,"div",10),p.Tb(55,"div",11),p.Tb(56,"div",12),p.Ob(57,"clr-progress-spinner",13),p.Tb(58,"div",14),p.Fc(59,"Header"),p.Sb(),p.Tb(60,"div",15),p.Tb(61,"div",16),p.Fc(62," Block "),p.Sb(),p.Tb(63,"div",17),p.Fc(64," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias officiis temporibus quod inventore, minus commodi similique corrupti repellat saepe facere aliquam minima deserunt esse nemo, vel illum optio necessitatibus deleniti. "),p.Sb(),p.Sb(),p.Tb(65,"div",18),p.Fc(66," Footer "),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Tb(67,"button",19),p.bc("click",(function(){return t.cardLoadingState=!t.cardLoadingState})),p.Fc(68,"Toggle Loading"),p.Sb(),p.Ob(69,"clr-code-snippet",20),p.Tb(70,"h4"),p.Fc(71,"The progress spinner on top of any content"),p.Sb(),p.Tb(72,"p"),p.Fc(73,"When having multiple areas in your applicatoin which can be loaded indepedently, it is possible to show a progress spinner on any specific area:"),p.Sb(),p.Tb(74,"div",21),p.Ob(75,"clr-progress-spinner",22),p.Tb(76,"h2",23),p.Fc(77,"Content Title"),p.Sb(),p.Tb(78,"p"),p.Fc(79,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias officiis temporibus quod inventore, minus commodi similique corrupti repellat saepe facere aliquam minima deserunt esse nemo, vel illum optio necessitatibus deleniti."),p.Sb(),p.Tb(80,"p"),p.Fc(81,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias officiis temporibus quod inventore, minus commodi similique corrupti repellat saepe facere aliquam minima deserunt esse nemo, vel illum optio necessitatibus deleniti."),p.Sb(),p.Sb(),p.Tb(82,"button",19),p.bc("click",(function(){return t.loadingState=!t.loadingState})),p.Fc(83,"Toggle Loading"),p.Sb(),p.Ob(84,"clr-code-snippet",20),p.Sb(),p.Sb(),p.Sb()),2&e&&(p.lc("ng",t.ng)("ui",t.ui)("title",t.title)("newLayout",t.newLayout),p.Bb(57),p.lc("clrShowSpinner",t.cardLoadingState),p.Bb(12),p.lc("clrCode",t.htmlExample),p.Bb(6),p.lc("clrShowSpinner",t.loadingState),p.Bb(9),p.lc("clrCode",t.htmlExample2))},directives:[u.a,f.J,S.a],encapsulation:2}),c),h=r("JsA7"),g=r("tyNb"),T=r("XPsC"),v=((s=function t(){e(this,t)}).\u0275mod=p.Lb({type:s}),s.\u0275inj=p.Kb({factory:function(e){return new(e||s)},imports:[[l.c,a.h,b.a,T.a,h.a,g.g.forChild([{path:"",component:m}]),f.b]]}),s)}}])}();