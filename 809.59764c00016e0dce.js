"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[809],{10809:(b,d,r)=>{r.r(d),r.d(d,{BrandAvatarDemoModule:()=>k});var l=r(84341),i=r(60177),c=r(42663),v=r(2985),a=r(54438),m=r(87620),h=r(91464),o=r(36366);let f=(()=>{class e extends v.S{htmlExample='\n<div class="parent">\n    <clr-brand-avatar class="demo-avatar" [clrBrand]="\'Volkswagen\'"></clr-brand-avatar>\n    <a href="#">Volkswagen</a>\n</div>\n\n.parent {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n}\n\n.demo-avatar {\n    margin-right: .5rem;\n}\n';htmlExampleLarger='\n<div class="parent">\n    <clr-brand-avatar class="demo-avatar" [clrSize]="48" [clrBrand]="\'Volkswagen\'"></clr-brand-avatar>\n    <a href="#">Volkswagen</a>\n</div>\n\n.parent {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n}\n\n.demo-avatar {\n    margin-right: .5rem;\n}\n';htmlExample2='\n<div class="parent">\n    <clr-brand-avatar class="demo-avatar"></clr-brand-avatar>\n    <a href="#">No brand set</a>\n</div>\n';constructor(){super("brand-avatar")}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=a.VBU({type:e,selectors:[["clr-brand-avatar-demo"]],hostVars:4,hostBindings:function(t,n){2&t&&a.AVh("content-area",!0)("dox-content-panel",!0)},features:[a.Vt3],decls:80,vars:7,consts:[[3,"title"],[1,"component-summary"],["id","design-guidelines"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["id","code-examples"],["id","examples"],[2,"display","flex"],[1,"parent"],[1,"demo-avatar",3,"clrBrand"],["href","#"],[3,"clrCode"],[1,"demo-avatar",3,"clrSize","clrBrand"],[1,"demo-avatar"]],template:function(t,n){1&t&&(a.j41(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),a.EFF(3,"The brand avatar is used to display logo of a brand."),a.k0s(),a.j41(4,"div",2)(5,"h3"),a.EFF(6,"Summary of Options"),a.k0s(),a.j41(7,"table",3)(8,"thead")(9,"tr")(10,"th",4),a.EFF(11,"Input"),a.k0s(),a.j41(12,"th",5),a.EFF(13,"Values"),a.k0s(),a.j41(14,"th",6),a.EFF(15,"Default"),a.k0s(),a.j41(16,"th",4),a.EFF(17,"Effect"),a.k0s()()(),a.j41(18,"tbody")(19,"tr")(20,"td",4)(21,"b"),a.EFF(22,"clrBrand"),a.k0s(),a.j41(23,"div",7),a.EFF(24,"Type: string"),a.k0s(),a.j41(25,"div",7),a.EFF(26,"Default: undefined"),a.k0s()(),a.j41(27,"td",5),a.EFF(28,"String"),a.k0s(),a.j41(29,"td",6),a.EFF(30,"undefined"),a.k0s(),a.j41(31,"td",4),a.EFF(32," The brand of the logo that should be displayed. (Case insensitive, spaces, dashes & underscores will be ignored) "),a.k0s()(),a.j41(33,"tr")(34,"td",4)(35,"b"),a.EFF(36,"clrSize"),a.k0s(),a.j41(37,"div",7),a.EFF(38,"Type: Number"),a.k0s(),a.j41(39,"div",7),a.EFF(40,"Default: 24"),a.k0s()(),a.j41(41,"td",5),a.EFF(42,"Number"),a.k0s(),a.j41(43,"td",6),a.EFF(44,"24"),a.k0s(),a.j41(45,"td",4),a.EFF(46,"Defines the size of the brand avatar in px"),a.k0s()()()()(),a.j41(47,"div",8)(48,"h3",9),a.EFF(49,"Code & Examples"),a.k0s(),a.j41(50,"h4"),a.EFF(51,"Standard behaviour"),a.k0s(),a.j41(52,"p"),a.EFF(53," The brand avatar gets a hover effect when hovering over anything inside his direct parent. See it in action by hovering over the name. "),a.k0s(),a.j41(54,"div",10)(55,"div",11),a.nrm(56,"clr-brand-avatar",12),a.j41(57,"a",13),a.EFF(58,"Volkswagen"),a.k0s()()(),a.nrm(59,"clr-code-snippet",14),a.j41(60,"h4"),a.EFF(61,"Larger behaviour"),a.k0s(),a.j41(62,"p"),a.EFF(63," The brand avatar gets a hover effect when hovering over anything inside his direct parent. See it in action by hovering over the name. "),a.k0s(),a.j41(64,"div",10)(65,"div",11),a.nrm(66,"clr-brand-avatar",15),a.j41(67,"a",13),a.EFF(68,"Volkswagen"),a.k0s()()(),a.nrm(69,"clr-code-snippet",14),a.j41(70,"h4"),a.EFF(71,"No brand or unknown brand"),a.k0s(),a.j41(72,"p"),a.EFF(73,"If clrBrand is not set or an unknown brand is set, a car icon will be displayed instead of the brand logo"),a.k0s(),a.j41(74,"div",10)(75,"div",11),a.nrm(76,"clr-brand-avatar",16),a.j41(77,"a",13),a.EFF(78,"No brand set"),a.k0s()()(),a.nrm(79,"clr-code-snippet",14),a.k0s()()()),2&t&&(a.Y8G("title",n.title),a.R7$(56),a.Y8G("clrBrand","Volkswagen"),a.R7$(3),a.Y8G("clrCode",n.htmlExample),a.R7$(7),a.Y8G("clrSize",48)("clrBrand","Volkswagen"),a.R7$(3),a.Y8G("clrCode",n.htmlExampleLarger),a.R7$(10),a.Y8G("clrCode",n.htmlExample2))},dependencies:[m.z,h.u,o.ELi],styles:[".parent[_ngcontent-%COMP%]{cursor:pointer;display:flex;align-items:center}.demo-avatar[_ngcontent-%COMP%]{margin-right:.5rem}"]})}return e})();var g=r(20786),u=r(5928),j=r(63275);let k=(()=>{class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=a.$C({type:e});static \u0275inj=a.G2t({imports:[i.MD,l.YN,c.PuD,j.u,g.g,u.iI.forChild([{path:"",component:f}]),o.P8i]})}return e})()}}]);