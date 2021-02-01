(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"/lUI":function(e,t,n){"use strict";n.r(t),n.d(t,"NotificationDemoModule",function(){return A});var o=n("ofXK"),i=n("3Pt+"),c=n("8MG2"),b=n("6Y1o"),r=n("N+3j"),s=n("fXoL"),a=n("0G9f"),l=n("vAyd");function p(e,t){1&e&&(s.Nb(0,33),s.Ac(1," Danger "),s.Mb())}function u(e,t){1&e&&(s.Nb(0,33),s.Ac(1," Warning "),s.Mb())}function d(e,t){1&e&&(s.Nb(0,33),s.Ac(1," Info "),s.Mb())}function f(e,t){1&e&&(s.Nb(0,33),s.Ac(1," Success "),s.Mb())}function m(e,t){if(1&e){const e=s.Qb();s.Nb(0,33),s.Ac(1," Complex notification "),s.Pb(2,"button",22),s.Wb("click",function(){return s.sc(e),s.Yb().log()}),s.Ac(3,"Log console"),s.Ob(),s.Mb()}}let g=(()=>{class e extends r.a{constructor(e){super("notification"),this.notificationService=e,this.codeExample='\n\n<button class="btn" (click)="openNotify(example, { timeout: clrExampleTimeout, notificationType: clrExampleType,\n    dismissable: clrExampleDismissable, progressbar: clrExampleProgressbar })">Show Notification</button>\n<ng-template #example>\n    <ng-container clr-notification-message>\n        Some Information\n        <button class="btn btn-info-outline" (click)="showAlert()">Show Alert</button>\n    </ng-container>\n</ng-template>\n',this.codeExampleTS='\nonClose(): void {\n    console.log("notification closed");\n}\n\nopenNotify(content, options): void {\n    this.notificationService.openNotification(content, options).result.then(this.onClose);\n}\n',this.codeExampleString='\n<button class="btn" (click)="openString()">Show Notification from String</button>\n',this.codeExampleStringTS='\nopenString(): void {\n    this.notificationService.openNotification("This is a string message", {progressbar: true, dismissable: true});\n}\n',this.clrExampleTimeout=2e3,this.clrExampleType="info",this.clrExampleDismissable=!0,this.clrExampleProgressbar=!0}onClose(){console.log("notification closed")}openNotify(e,t){this.notificationService.openNotification(e,t).result.then(this.onClose)}openString(){this.notificationService.openNotification("This is a string message",{progressbar:!0,dismissable:!0})}log(){console.log("log from notification")}}return e.\u0275fac=function(t){return new(t||e)(s.Jb(b.z))},e.\u0275cmp=s.Db({type:e,selectors:[["clr-notification-demo-docu"]],hostVars:4,hostBindings:function(e,t){2&e&&s.Bb("content-area",!0)("dox-content-panel",!0)},features:[s.xb([b.z]),s.vb],decls:182,vars:11,consts:[[3,"title"],["id","generic-pager-header",1,"component-summary"],["id","design-guidelines"],[1,"btn","btn-danger",3,"click"],["exampleDanger",""],[1,"btn","btn-warning",3,"click"],["exampleWarning",""],[1,"btn","btn-primary",3,"click"],["exampleInfo",""],[1,"btn","btn-success",3,"click"],["exampleSuccess",""],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["id","code-examples"],["id","examples"],[3,"clrCode"],[3,"clrCode","clrLanguage"],[1,"btn-group"],[1,"btn",3,"click"],["clrForm","","clrLayout","vertical"],["clrInput","","type","number","id","clr-timeout","name","clr-timeout",3,"ngModel","ngModelChange"],["clrSelect","","id","clr-type","name","clr-type",3,"ngModel","ngModelChange"],["value","info"],["value","warning"],["value","success"],["value","danger"],["clrCheckbox","","type","checkbox","name","clr-dismissable",3,"ngModel","ngModelChange"],["clrCheckbox","","type","checkbox","name","clr-progressbar",3,"ngModel","ngModelChange"],["example",""],["clr-notification-message",""]],template:function(e,t){if(1&e){const e=s.Qb();s.Pb(0,"clr-doc-wrapper",0),s.Pb(1,"article"),s.Pb(2,"h5",1),s.Ac(3,"Notifications are shown to inform the user of a particular event or completed action."),s.Ob(),s.Pb(4,"div",2),s.Pb(5,"h3"),s.Ac(6,"Notification Types"),s.Ob(),s.Pb(7,"p"),s.Ac(8," There are four different sub-types of notifications: error, warning, info, and success. "),s.Ob(),s.Pb(9,"p"),s.Pb(10,"b"),s.Ac(11,"Error"),s.Ob(),s.Kb(12,"br"),s.Ac(13," Reserved for errors, malfunctions, as well as critical issues like license expiration. "),s.Kb(14,"br"),s.Pb(15,"button",3),s.Wb("click",function(){s.sc(e);const n=s.oc(18);return t.openNotify(n,{timeout:3e3,notificationType:"danger",dismissable:!1,progressbar:!1})}),s.Ac(16,"Show Error Notification"),s.Ob(),s.yc(17,p,2,0,"ng-template",null,4,s.zc),s.Ob(),s.Pb(19,"p"),s.Pb(20,"b"),s.Ac(21,"Warning"),s.Ob(),s.Kb(22,"br"),s.Ac(23," Reserved for warnings: a message that needs the user attention and aknowledgment but might not cause errors. "),s.Kb(24,"br"),s.Pb(25,"button",5),s.Wb("click",function(){s.sc(e);const n=s.oc(28);return t.openNotify(n,{timeout:3e3,notificationType:"warning",dismissable:!1,progressbar:!1})}),s.Ac(26,"Show Warning Notification"),s.Ob(),s.yc(27,u,2,0,"ng-template",null,6,s.zc),s.Ob(),s.Pb(29,"p"),s.Pb(30,"b"),s.Ac(31,"Info"),s.Ob(),s.Kb(32,"br"),s.Ac(33," Provides info to users in context. Shouldn\u2019t be overused to replace regular content. "),s.Kb(34,"br"),s.Pb(35,"button",7),s.Wb("click",function(){s.sc(e);const n=s.oc(38);return t.openNotify(n,{timeout:3e3,notificationType:"info",dismissable:!1,progressbar:!1})}),s.Ac(36,"Show Info Notification"),s.Ob(),s.yc(37,d,2,0,"ng-template",null,8,s.zc),s.Ob(),s.Pb(39,"p"),s.Pb(40,"b"),s.Ac(41,"Success"),s.Ob(),s.Kb(42,"br"),s.Ac(43," Reserved to provide to a static persistent success message. "),s.Kb(44,"br"),s.Pb(45,"button",9),s.Wb("click",function(){s.sc(e);const n=s.oc(48);return t.openNotify(n,{timeout:3e3,notificationType:"success",dismissable:!1,progressbar:!1})}),s.Ac(46,"Show Success Notification"),s.Ob(),s.yc(47,f,2,0,"ng-template",null,10,s.zc),s.Ob(),s.Pb(49,"h2"),s.Ac(50,"Angular Component"),s.Ob(),s.Pb(51,"p"),s.Ac(52," Notifications will be opened by a service, not by including the notification component in the markup. That way it's possible to use the same markup for multiple notification instances. "),s.Ob(),s.Pb(53,"p"),s.Ac(54," The service will be called with two parameters. The first one defines the content of the notification as a template or string. The second parameter defines the options for the notification, described below. "),s.Ob(),s.Pb(55,"p"),s.Ac(56," The service will return a "),s.Pb(57,"code",11),s.Ac(58,"ClrNotificationRef"),s.Ob(),s.Ac(59," containing a promise "),s.Pb(60,"code",11),s.Ac(61,"result"),s.Ob(),s.Ac(62," which will get resolved after the notification was closed. "),s.Ob(),s.Pb(63,"h3"),s.Ac(64,"Summary of Options"),s.Ob(),s.Pb(65,"table",12),s.Pb(66,"thead"),s.Pb(67,"tr"),s.Pb(68,"th",13),s.Ac(69,"Input"),s.Ob(),s.Pb(70,"th",14),s.Ac(71,"Values"),s.Ob(),s.Pb(72,"th",15),s.Ac(73,"Default"),s.Ob(),s.Pb(74,"th",13),s.Ac(75,"Effect"),s.Ob(),s.Ob(),s.Ob(),s.Pb(76,"tbody"),s.Pb(77,"tr"),s.Pb(78,"td",13),s.Pb(79,"b"),s.Ac(80,"timeout"),s.Ob(),s.Pb(81,"div",16),s.Ac(82,"Type: Number"),s.Ob(),s.Pb(83,"div",16),s.Ac(84,"Default: 2000"),s.Ob(),s.Ob(),s.Pb(85,"td",14),s.Ac(86,"Javascript Number"),s.Ob(),s.Pb(87,"td",15),s.Ac(88,"2000"),s.Ob(),s.Pb(89,"td",13),s.Ac(90,"Time in ms when the notification will be closed automatically. 0 means it stays open until user closes it manually."),s.Ob(),s.Ob(),s.Pb(91,"tr"),s.Pb(92,"td",13),s.Pb(93,"b"),s.Ac(94,"notificationType"),s.Ob(),s.Pb(95,"div",16),s.Ac(96,"Type: String"),s.Ob(),s.Pb(97,"div",16),s.Ac(98,'Default: "info"'),s.Ob(),s.Ob(),s.Pb(99,"td",14),s.Ac(100,'"info", "warning", "success", "danger"'),s.Ob(),s.Pb(101,"td",15),s.Ac(102,'"info"'),s.Ob(),s.Pb(103,"td",13),s.Ac(104," Defines the type of notification. "),s.Ob(),s.Ob(),s.Pb(105,"tr"),s.Pb(106,"td",13),s.Pb(107,"b"),s.Ac(108,"dismissable"),s.Ob(),s.Pb(109,"div",16),s.Ac(110,"Type: Boolean"),s.Ob(),s.Pb(111,"div",16),s.Ac(112,"Default: false"),s.Ob(),s.Ob(),s.Pb(113,"td",14),s.Ac(114,"true, false"),s.Ob(),s.Pb(115,"td",15),s.Ac(116,"false"),s.Ob(),s.Pb(117,"td",13),s.Ac(118," Defines whether the notification is closable by the user manually. "),s.Ob(),s.Ob(),s.Pb(119,"tr"),s.Pb(120,"td",13),s.Pb(121,"b"),s.Ac(122,"progressbar"),s.Ob(),s.Pb(123,"div",16),s.Ac(124,"Type: Boolean"),s.Ob(),s.Pb(125,"div",16),s.Ac(126,"Default: false"),s.Ob(),s.Ob(),s.Pb(127,"td",14),s.Ac(128,"true, false"),s.Ob(),s.Pb(129,"td",15),s.Ac(130,"false"),s.Ob(),s.Pb(131,"td",13),s.Ac(132," Defines whether the progressbar (until notification closes automatically) will be shown. "),s.Ob(),s.Ob(),s.Ob(),s.Ob(),s.Ob(),s.Pb(133,"div",17),s.Pb(134,"h3",18),s.Ac(135,"Code & Examples"),s.Ob(),s.Pb(136,"h4"),s.Ac(137,"Notification from String"),s.Ob(),s.Pb(138,"p"),s.Ac(139,"For simple messages a string can be provided to the notification service."),s.Ob(),s.Kb(140,"clr-code-snippet",19),s.Kb(141,"clr-code-snippet",20),s.Pb(142,"div",21),s.Pb(143,"button",22),s.Wb("click",function(){return t.openString()}),s.Ac(144,"Show Notification from String"),s.Ob(),s.Ob(),s.Pb(145,"h4"),s.Ac(146,"Notification from ng-template"),s.Ob(),s.Pb(147,"p"),s.Ac(148,"For more complex notifications (including buttons etc.) an instance to a TemplateRef can be provided as content."),s.Ob(),s.Kb(149,"clr-code-snippet",19),s.Kb(150,"clr-code-snippet",20),s.Pb(151,"form",23),s.Pb(152,"clr-input-container"),s.Pb(153,"label"),s.Ac(154,"Timeout"),s.Ob(),s.Pb(155,"input",24),s.Wb("ngModelChange",function(e){return t.clrExampleTimeout=e}),s.Ob(),s.Ob(),s.Pb(156,"clr-select-container"),s.Pb(157,"label"),s.Ac(158,"Type"),s.Ob(),s.Pb(159,"select",25),s.Wb("ngModelChange",function(e){return t.clrExampleType=e}),s.Pb(160,"option",26),s.Ac(161,"Info"),s.Ob(),s.Pb(162,"option",27),s.Ac(163,"Warning"),s.Ob(),s.Pb(164,"option",28),s.Ac(165,"Success"),s.Ob(),s.Pb(166,"option",29),s.Ac(167,"Danger"),s.Ob(),s.Ob(),s.Ob(),s.Kb(168,"br"),s.Pb(169,"clr-checkbox-wrapper"),s.Pb(170,"label"),s.Ac(171,"Dismissable"),s.Ob(),s.Pb(172,"input",30),s.Wb("ngModelChange",function(e){return t.clrExampleDismissable=e}),s.Ob(),s.Ob(),s.Pb(173,"clr-checkbox-wrapper"),s.Pb(174,"label"),s.Ac(175,"Progressbar"),s.Ob(),s.Pb(176,"input",31),s.Wb("ngModelChange",function(e){return t.clrExampleProgressbar=e}),s.Ob(),s.Ob(),s.Ob(),s.Pb(177,"div",21),s.Pb(178,"button",22),s.Wb("click",function(){s.sc(e);const n=s.oc(181);return t.openNotify(n,{timeout:t.clrExampleTimeout,notificationType:t.clrExampleType,dismissable:t.clrExampleDismissable,progressbar:t.clrExampleProgressbar})}),s.Ac(179,"Show Notification"),s.Ob(),s.Ob(),s.yc(180,m,4,0,"ng-template",null,32,s.zc),s.Ob(),s.Ob(),s.Ob()}2&e&&(s.gc("title",t.title),s.yb(140),s.gc("clrCode",t.codeExampleString),s.yb(1),s.gc("clrCode",t.codeExampleStringTS)("clrLanguage","typescript"),s.yb(8),s.gc("clrCode",t.codeExample),s.yb(1),s.gc("clrCode",t.codeExampleTS)("clrLanguage","typescript"),s.yb(5),s.gc("ngModel",t.clrExampleTimeout),s.yb(4),s.gc("ngModel",t.clrExampleType),s.yb(13),s.gc("ngModel",t.clrExampleDismissable),s.yb(4),s.gc("ngModel",t.clrExampleProgressbar))},directives:[a.a,l.a,i.B,i.o,i.p,c.y,c.H,c.F,c.G,b.U,i.t,i.b,c.E,i.n,i.q,c.X,i.x,c.W,i.s,i.A,c.j,i.a,c.h],styles:["#clr-type[_ngcontent-%COMP%]{width:160px}"]}),e})();var P=n("JsA7"),h=n("tyNb"),O=n("XPsC");let A=(()=>{class e{}return e.\u0275mod=s.Hb({type:e}),e.\u0275inj=s.Gb({factory:function(t){return new(t||e)},imports:[[o.c,c.a,b.b,O.a,P.a,h.g.forChild([{path:"",component:g}]),i.h]]}),e})()}}]);