import{a as W,b as q,c as z}from"./chunk-5AY2OIY6.js";import"./chunk-S3DWPM3E.js";import{c as $,d as j}from"./chunk-MYW62TDG.js";import{Bk as X,m as R}from"./chunk-4NVQLP33.js";import{Aa as C,Ad as P,Ba as E,Ha as m,I as h,Ia as p,Jd as O,Ka as S,La as y,Ma as w,Na as o,Oa as t,P as u,Pa as i,Q as f,Qa as c,Xa as _,Xe as F,Za as k,_a as g,ff as L,fh as U,kb as v,ma as l,mb as e,nb as D,ng as B,od as T,og as H,pg as N,qg as V,uc as I,va as b,wa as x,yd as M,zd as A}from"./chunk-UJVCHAS2.js";import"./chunk-76DGGKHL.js";function Q(a,s){a&1&&(t(0,"div",7),e(1,"Click to select me"),i())}function Y(a,s){a&1&&(t(0,"div",7),e(1,"I am the selected card"),i())}function Z(a,s){if(a&1){let r=_();t(0,"div",4)(1,"div",19),k("click",function(){let n=u(r).$index,J=g();return f(J.activateCard(n))}),t(2,"div",6),e(3),i(),m(4,Q,2,0,"div",7),m(5,Y,2,0,"div",7),i()()}if(a&2){let r=s.$implicit;l(),v("card-active",r.active),l(2),D(r.title),l(),p(r.active?-1:4),l(),p(r.active?5:-1)}}function ee(a,s){a&1&&(t(0,"clr-dropdown-menu",20)(1,"button",21),e(2,"Edit"),i(),t(3,"button",21),e(4,"Duplicate"),i(),t(5,"button",21),e(6,"Delete"),i()())}var te=`
<div class="clr-row">
    <div class="clr-col-4">
        <div class="card card-active clickable">
            <div class="card-header">
                I am an active card
            </div>
            <div class="card-block">
                I am also clickable
            </div>
        </div>
    </div>
    <div class="clr-col-4">
        <div class="card clickable">
            <div class="card-header">
                I am a non active card
            </div>
            <div class="card-block">
                But I am clickable
            </div>
        </div>
    </div>
    <div class="clr-col-4">
        <div class="card">
            <div class="card-header">
                I am a non active card
            </div>
            <div class="card-block">
                And I am also not clickable
            </div>
        </div>
    </div>
</div>
`,ie=`
<div class="card card-placeholder">
    <div class="card-header">
        Placeholder card
    </div>
    <div class="card-block">
        Card block
        <div>
            <a class="btn btn-link">Action</a>
        </div>
    </div>
</div>
`,ae=`
<div class="card">
    <div class="card-header">
        Card header with custom actions
        <clr-dropdown class="card-actions">
            <button type="button" class="btn btn-icon btn-link card-action dropdown-toggle" clrDropdownTrigger>
                <cds-icon shape="ellipsis-vertical"></cds-icon>
            </button>
            <clr-dropdown-menu clrPosition="bottom-right" *clrIfOpen>
                ...
            </clr-dropdown-menu>
        </clr-dropdown>
    </div>
    <div class="card-block">
        Card Block
    </div>
</div>
`;A.addIcons(O);var G=(()=>{class a extends W{htmlExample=te;htmlExamplePlaceholder=ie;htmlExampleCustomActions=ae;cards=[{title:"Selectable card",active:!0},{title:"Selectable card",active:!1},{title:"Selectable card",active:!1}];activateCard(r){for(let d of this.cards)d.active=!1;this.cards[r].active=!0}constructor(){super("cards")}static \u0275fac=function(d){return new(d||a)};static \u0275cmp=b({type:a,selectors:[["clr-cards-demo"]],hostVars:4,hostBindings:function(d,n){d&2&&v("content-area",!0)("dox-content-panel",!0)},standalone:!1,features:[C],decls:86,vars:4,consts:[[3,"title"],["id","cards-header",1,"component-summary"],["id","design-guidelines"],[1,"clr-row"],[1,"clr-col-4"],[1,"card","clickable"],[1,"card-header"],[1,"card-block"],["href","https://clarity.design/documentation/card"],[1,"clr-code"],["id","examples"],[3,"clrCode"],[1,"card","card-placeholder"],[1,"btn","btn-link"],[1,"card"],[1,"card-actions"],["type","button","clrDropdownTrigger","",1,"btn","btn-icon","btn-link","card-action","dropdown-toggle"],["shape","ellipsis-vertical"],["clrPosition","bottom-right",4,"clrIfOpen"],[1,"card","selectable",3,"click"],["clrPosition","bottom-right"],["type","button","clrDropdownItem",""]],template:function(d,n){d&1&&(t(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e(3," The Addons extend the default Clarity cards by providing following additional types: "),i(),t(4,"ul")(5,"li"),e(6,"Selectable card. The selected stays visually highlighted."),i(),t(7,"li"),e(8,"Placeholder card. Represents an empty card which can be filled by user actions."),i()(),t(9,"h2"),e(10,"Selectable card"),i(),t(11,"div",2)(12,"h3"),e(13,"Behavior"),i(),t(14,"p"),e(15," Only one card at the time can have the selection indicator. Compare this behavior to a radio button. Note the different hover style in the example below. "),i(),t(16,"h6"),e(17,"Default clickable card (Standard Clarity)"),i(),t(18,"div",3)(19,"div",4)(20,"div",5)(21,"div",6),e(22,"Default card"),i(),t(23,"div",7),e(24," See the official "),t(25,"a",8),e(26,"Clarity documentation"),i(),e(27," for details. "),i()()()(),t(28,"h6"),e(29,"Selectable card (Clarity Addons)"),i(),t(30,"div",3),y(31,Z,6,5,"div",4,S),i(),t(33,"h3"),e(34,"Usage"),i(),t(35,"p"),e(36," On contrast to the default clickable-cards, the selectable card does not start an action, it is only marked as selected. Note that multiple selection is not supported. If you depend on multi-selection, use a different element such as a checkbox. A selectable card should have the class "),t(37,"code",9),e(38,"selectable"),i(),e(39," instead of the clarity-default "),t(40,"code",9),e(41,"clickable"),i(),e(42," class. Use the "),t(43,"code",9),e(44,"card-active"),i(),e(45," class to mark the currently selected one. "),i()(),t(46,"div",10),c(47,"clr-code-snippet",11),i(),t(48,"h2"),e(49,"Placeholder card"),i(),e(50," The placeholder card represents an empty card by a dashed border. The style is provided by class "),t(51,"code",9),e(52,"card-placeholder"),i(),e(53,". All buttons inside a placeholder card should be flat (btn-link). "),t(54,"div",3)(55,"div",4)(56,"div",12)(57,"div",6),e(58,"Placeholder card"),i(),t(59,"div",7),e(60," Card block "),t(61,"div")(62,"a",13),e(63,"Action"),i()()()()()(),c(64,"clr-code-snippet",11),t(65,"h2"),e(66,"Card with custom actions"),i(),e(67," To use a card with custom actions, use the classes "),t(68,"code",9),e(69,"card-actions"),i(),e(70," on the dropdown itself and "),t(71,"code",9),e(72,"card-action"),i(),e(73," on the dropdown-toggle. "),t(74,"div",3)(75,"div",4)(76,"div",14)(77,"div",6),e(78," Card header with custom actions "),t(79,"clr-dropdown",15)(80,"button",16),c(81,"cds-icon",17),i(),E(82,ee,7,0,"clr-dropdown-menu",18),i()(),t(83,"div",7),e(84,"Card Block"),i()()()(),c(85,"clr-code-snippet",11),i()()),d&2&&(o("title",n.title),l(31),w(n.cards),l(16),o("clrCode",n.htmlExample),l(17),o("clrCode",n.htmlExamplePlaceholder),l(21),o("clrCode",n.htmlExampleCustomActions))},dependencies:[P,M,B,H,N,V,F,$,q,R],encapsulation:2})}return a})();var Se=(()=>{class a{static \u0275fac=function(d){return new(d||a)};static \u0275mod=x({type:a});static \u0275inj=h({imports:[I,T,U,j,z,L.forChild([{path:"",component:G}]),X]})}return a})();export{Se as CardsDemoModule};
