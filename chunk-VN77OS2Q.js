import{a as D,b,c as T}from"./chunk-ER22NYHM.js";import"./chunk-53GF5SVT.js";import{c as I,d as M}from"./chunk-6QZXPPOC.js";import{p as g,yk as C}from"./chunk-AFTLHFUU.js";import{J as c,La as l,Ma as e,Na as i,Oa as r,af as E,ah as y,ib as v,kb as t,na as m,nd as S,tc as h,va as s,wa as p,wd as x,we as u,za as f}from"./chunk-JYJ7XIUC.js";import"./chunk-UKNGC2Y4.js";var P=`
<div class="parent">
    <clr-icon-avatar class="demo-avatar"></clr-icon-avatar>
    <span>John Doe</span>
</div>

.parent {
    display: flex;
    align-items: center;
}

.demo-avatar {
    margin-right: .5rem;
}
`,w=`
<div class="parent">
    <clr-icon-avatar class="demo-avatar avatar-large" clrSize="48"></clr-icon-avatar>
    <span>John Doe</span>
</div>
`,L=`
<div class="parent">
    <clr-icon-avatar class="demo-avatar avatar-large" clrSize="48" clrShape="factory"></clr-icon-avatar>
    <span>Smith Inc.</span>
</div>
`,F=`
import { ClarityIcons, factoryIcon } from '@clr/angular/icon';

ClarityIcons.addIcons(factoryIcon);
`;x.addIcons(u);var z=(()=>{class a extends D{htmlExample=P;htmlExample2=w;htmlExample3=L;tsExample1=F;constructor(){super("icon-avatar")}static \u0275fac=function(n){return new(n||a)};static \u0275cmp=s({type:a,selectors:[["clr-icon-avatar-demo"]],hostVars:4,hostBindings:function(n,o){n&2&&v("content-area",!0)("dox-content-panel",!0)},standalone:!1,features:[f],decls:89,vars:5,consts:[[3,"title"],[1,"component-summary"],["id","design-guidelines"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["id","code-examples"],["id","examples"],[2,"display","flex"],[1,"parent"],[1,"demo-avatar"],["href","#"],[3,"clrCode"],[1,"clr-code"],["clrSize","48",1,"demo-avatar","avatar-large"],["clrSize","48","clrShape","factory",1,"demo-avatar","avatar-large"],["clrLanguage","typescript",3,"clrCode"]],template:function(n,o){n&1&&(e(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),t(3,"The icon avatar is used to display an avatar containing a Clarity icon."),i(),e(4,"div",2)(5,"h3"),t(6,"Summary of Options"),i(),e(7,"table",3)(8,"thead")(9,"tr")(10,"th",4),t(11,"Input"),i(),e(12,"th",5),t(13,"Values"),i(),e(14,"th",6),t(15,"Default"),i(),e(16,"th",4),t(17,"Effect"),i()()(),e(18,"tbody")(19,"tr")(20,"td",4)(21,"b"),t(22,"clrShape"),i(),e(23,"div",7),t(24,"Type: string"),i(),e(25,"div",7),t(26,"Default: 'user'"),i()(),e(27,"td",5),t(28,"String"),i(),e(29,"td",6),t(30,"undefined"),i(),e(31,"td",4),t(32,"The shape of the Clarity icon that gets displayed"),i()(),e(33,"tr")(34,"td",4)(35,"b"),t(36,"clrSize"),i(),e(37,"div",7),t(38,"Type: Number"),i(),e(39,"div",7),t(40,"Default: 24"),i()(),e(41,"td",5),t(42,"Number"),i(),e(43,"td",6),t(44,"24"),i(),e(45,"td",4),t(46,"Defines the size of the icon avatar in px"),i()()()()(),e(47,"div",8)(48,"h3",9),t(49,"Code & Examples"),i(),e(50,"h4"),t(51,"Standard behaviour"),i(),e(52,"p"),t(53,' The icon avatar gets a hover effect when hovering over anything inside his direct parent. See it in action by hovering over the name. Default icon shape is "user". '),i(),e(54,"div",10)(55,"div",11),r(56,"clr-icon-avatar",12),e(57,"a",13),t(58,"John Doe"),i()()(),r(59,"clr-code-snippet",14),e(60,"h4"),t(61,"Larger size"),i(),e(62,"p"),t(63,"For a larger size of the avatar set the "),e(64,"code",15),t(65,"clrSize"),i(),t(66," attribute."),i(),e(67,"div",10)(68,"div",11),r(69,"clr-icon-avatar",16),e(70,"a",13),t(71,"John Doe"),i()()(),r(72,"clr-code-snippet",14),e(73,"h4"),t(74,"Setting a different shape"),i(),e(75,"p"),t(76,"For a different shape of the avatar set the "),e(77,"code",15),t(78,"clrShape"),i(),t(79," attribute"),i(),e(80,"div",10)(81,"div",11),r(82,"clr-icon-avatar",17),e(83,"a",13),t(84,"Smith Inc."),i()()(),r(85,"clr-code-snippet",14),e(86,"p"),t(87,"In order to use icons which are not part of the Core Clarity Icons, import the icon as follows:"),i(),r(88,"clr-code-snippet",18),i()()()),n&2&&(l("title",o.title),m(59),l("clrCode",o.htmlExample),m(13),l("clrCode",o.htmlExample2),m(13),l("clrCode",o.htmlExample3),m(3),l("clrCode",o.tsExample1))},dependencies:[I,b,g],styles:[".parent[_ngcontent-%COMP%]{cursor:pointer;display:flex;align-items:center}.demo-avatar[_ngcontent-%COMP%]{margin-right:.5rem}.avatar-large[_ngcontent-%COMP%]{font-size:1rem}"]})}return a})();var q=(()=>{class a{static \u0275fac=function(n){return new(n||a)};static \u0275mod=p({type:a});static \u0275inj=c({imports:[h,S,y,M,T,E.forChild([{path:"",component:z}]),C]})}return a})();export{q as IconAvatarDemoModule};
