"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[245],{97309:(U,s,i)=>{i.r(s),i.d(s,{ProgressSpinnerDemoModule:()=>S});var a=i(52382),d=i(69808),c=i(66630),p=i(11489),e=i(31223),u=i(29031),l=i(21298),g=i(71884);let h=(()=>{class n extends p.K{constructor(){super("progress-spinner"),this.htmlExample='\n<div class="clr-row">\n    <div class="clr-col-6">\n        <div class="card">\n            <clr-progress-spinner [clrShowSpinner]="cardLoadingState"></clr-progress-spinner>\n            ...\n        </div>\n    </div>\n</div>\n<button class="btn btn-primary" (click)="cardLoadingState = !cardLoadingState">Toggle Loading</button>\n',this.htmlExample2='\n<div>\n  <clr-progress-spinner [clrShowSpinner]="loadingState" clrSize="md"></clr-progress-spinner>\n  <h2>Content Title</h2>\n    <p>...</p>\n</div>\n\n<button class="btn btn-primary" (click)="loadingState = !loadingState">Toggle Loading</button>\n'}}return n.\u0275fac=function(r){return new(r||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["clr-progress-spinner-demo"]],hostVars:4,hostBindings:function(r,o){2&r&&e.ekj("content-area",!0)("dox-content-panel",!0)},features:[e.qOj],decls:85,vars:5,consts:[[3,"title"],[1,"component-summary"],["id","design-guidelines"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["id","code-examples"],["id","examples"],[1,"clr-row"],[1,"clr-col-6"],[1,"card"],[3,"clrShowSpinner"],[1,"card-header"],[1,"card-block"],[1,"card-title"],[1,"card-text"],[1,"card-footer"],[1,"btn","btn-primary",3,"click"],[3,"clrCode"],[2,"position","relative","background-color","#ddd","padding","1rem","margin-top","1rem"],["clrSize","md",3,"clrShowSpinner"],[2,"margin-top","0"]],template:function(r,o){1&r&&(e.TgZ(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e._uU(3," The progress spinner of Clarity Addons extends the default progress spinner by an Angular Component which allows the developer to toggle the loading state depending on a boolean input. "),e.qZA(),e.TgZ(4,"div",2)(5,"h3"),e._uU(6,"Summary of Options"),e.qZA(),e.TgZ(7,"table",3)(8,"thead")(9,"tr")(10,"th",4),e._uU(11,"Input"),e.qZA(),e.TgZ(12,"th",5),e._uU(13,"Values"),e.qZA(),e.TgZ(14,"th",6),e._uU(15,"Default"),e.qZA(),e.TgZ(16,"th",4),e._uU(17,"Effect"),e.qZA()()(),e.TgZ(18,"tbody")(19,"tr")(20,"td",4)(21,"b"),e._uU(22,"clrShowSpinner"),e.qZA(),e.TgZ(23,"div",7),e._uU(24,"Type: boolean"),e.qZA(),e.TgZ(25,"div",7),e._uU(26,"Default: false"),e.qZA()(),e.TgZ(27,"td",5),e._uU(28,"true, false"),e.qZA(),e.TgZ(29,"td",6),e._uU(30,"false"),e.qZA(),e.TgZ(31,"td",4),e._uU(32,"Controls if the spinner is shown"),e.qZA()(),e.TgZ(33,"tr")(34,"td",4)(35,"b"),e._uU(36,"clrSize"),e.qZA(),e.TgZ(37,"div",7),e._uU(38,"Type: String"),e.qZA(),e.TgZ(39,"div",7),e._uU(40,'Default: "sm"'),e.qZA()(),e.TgZ(41,"td",5),e._uU(42,"sm, md, lg"),e.qZA(),e.TgZ(43,"td",6),e._uU(44,'"sm"'),e.qZA(),e.TgZ(45,"td",4),e._uU(46,"Defines the size of progress spinner"),e.qZA()()()()(),e.TgZ(47,"div",8)(48,"h3",9),e._uU(49,"Code & Examples"),e.qZA(),e.TgZ(50,"h4"),e._uU(51,"The progress spinner on top of any card"),e.qZA(),e.TgZ(52,"p"),e._uU(53," When having multiple cards which can be loaded independently, it is possible show a progress spinner on any specific card: "),e.qZA(),e.TgZ(54,"div",10)(55,"div",11)(56,"div",12),e._UZ(57,"clr-progress-spinner",13),e.TgZ(58,"div",14),e._uU(59,"Header"),e.qZA(),e.TgZ(60,"div",15)(61,"div",16),e._uU(62,"Block"),e.qZA(),e.TgZ(63,"div",17),e._uU(64," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias officiis temporibus quod inventore, minus commodi similique corrupti repellat saepe facere aliquam minima deserunt esse nemo, vel illum optio necessitatibus deleniti. "),e.qZA()(),e.TgZ(65,"div",18),e._uU(66,"Footer"),e.qZA()()()(),e.TgZ(67,"button",19),e.NdJ("click",function(){return o.cardLoadingState=!o.cardLoadingState}),e._uU(68,"Toggle Loading"),e.qZA(),e._UZ(69,"clr-code-snippet",20),e.TgZ(70,"h4"),e._uU(71,"The progress spinner on top of any content"),e.qZA(),e.TgZ(72,"p"),e._uU(73," When having multiple areas in your applicatoin which can be loaded indepedently, it is possible to show a progress spinner on any specific area: "),e.qZA(),e.TgZ(74,"div",21),e._UZ(75,"clr-progress-spinner",22),e.TgZ(76,"h2",23),e._uU(77,"Content Title"),e.qZA(),e.TgZ(78,"p"),e._uU(79," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias officiis temporibus quod inventore, minus commodi similique corrupti repellat saepe facere aliquam minima deserunt esse nemo, vel illum optio necessitatibus deleniti. "),e.qZA(),e.TgZ(80,"p"),e._uU(81," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias officiis temporibus quod inventore, minus commodi similique corrupti repellat saepe facere aliquam minima deserunt esse nemo, vel illum optio necessitatibus deleniti. "),e.qZA()(),e.TgZ(82,"button",19),e.NdJ("click",function(){return o.loadingState=!o.loadingState}),e._uU(83,"Toggle Loading"),e.qZA(),e._UZ(84,"clr-code-snippet",20),e.qZA()()()),2&r&&(e.Q6J("title",o.title),e.xp6(57),e.Q6J("clrShowSpinner",o.cardLoadingState),e.xp6(12),e.Q6J("clrCode",o.htmlExample),e.xp6(6),e.Q6J("clrShowSpinner",o.loadingState),e.xp6(9),e.Q6J("clrCode",o.htmlExample2))},directives:[u.k,l.xxt,g.O],encapsulation:2}),n})();var T=i(62678),f=i(65909),v=i(24603);let S=(()=>{class n{}return n.\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[d.ez,a.u5,c.K6A,v.A,T.B,f.Bz.forChild([{path:"",component:h}]),l.mmz]]}),n})()}}]);