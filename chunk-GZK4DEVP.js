import{a as z,b as h,c as G}from"./chunk-VMPJFRRM.js";import"./chunk-ZF3MJ7PP.js";import{c as j,d as u}from"./chunk-HYVD2MB3.js";import{l as q}from"./chunk-HKBEZELF.js";import"./chunk-SDVZG756.js";import{Aa as k,Ad as L,Ba as D,Bd as B,Ga as f,Ha as C,Hh as v,I as E,Ja as g,Ka as I,Kd as H,La as M,Ma as n,Na as t,Oa as i,Pa as c,Q as S,R as y,Tf as V,Uf as R,Vf as W,Wa as T,Wf as X,Xf as $,Ya as P,_a as A,_e as N,jf as U,kb as b,ma as d,mb as e,nb as O,od as p,uc as m,va as w,wa as _,zd as F}from"./chunk-D5GTBCL3.js";import"./chunk-76DGGKHL.js";function Q(r,s){r&1&&(t(0,"div",7),e(1,"Click to select me"),i())}function Y(r,s){r&1&&(t(0,"div",7),e(1,"I am the selected card"),i())}function Z(r,s){if(r&1){let a=T();t(0,"div",4)(1,"div",19),P("click",function(){let o=S(a).$index,J=A();return y(J.activateCard(o))}),t(2,"div",6),e(3),i(),f(4,Q,2,0,"div",7),f(5,Y,2,0,"div",7),i()()}if(r&2){let a=s.$implicit;d(),b("card-active",a.active),d(2),O(a.title),d(),C(a.active?-1:4),d(),C(a.active?5:-1)}}function ee(r,s){r&1&&(t(0,"clr-dropdown-menu",20)(1,"button",21),e(2,"Edit"),i(),t(3,"button",21),e(4,"Duplicate"),i(),t(5,"button",21),e(6,"Delete"),i()())}var te=`
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
`,re=`
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
`;L.addIcons(H);var x=(()=>{class r extends G{htmlExample=te;htmlExamplePlaceholder=ie;htmlExampleCustomActions=re;cards=[{title:"Selectable card",active:!0},{title:"Selectable card",active:!1},{title:"Selectable card",active:!1}];activateCard(a){for(let l of this.cards)l.active=!1;this.cards[a].active=!0}constructor(){super("cards")}static \u0275fac=function(l){return new(l||r)};static \u0275cmp=w({type:r,selectors:[["clr-cards-demo"]],hostVars:4,hostBindings:function(l,o){l&2&&b("content-area",!0)("dox-content-panel",!0)},features:[k],decls:86,vars:4,consts:[[3,"title"],["id","cards-header",1,"component-summary"],["id","design-guidelines"],[1,"clr-row"],[1,"clr-col-4"],[1,"card","clickable"],[1,"card-header"],[1,"card-block"],["href","https://clarity.design/documentation/card"],[1,"clr-code"],["id","examples"],[3,"clrCode"],[1,"card","card-placeholder"],[1,"btn","btn-link"],[1,"card"],[1,"card-actions"],["type","button","clrDropdownTrigger","",1,"btn","btn-icon","btn-link","card-action","dropdown-toggle"],["shape","ellipsis-vertical"],["clrPosition","bottom-right",4,"clrIfOpen"],[1,"card","selectable",3,"click"],["clrPosition","bottom-right"],["type","button","clrDropdownItem",""]],template:function(l,o){l&1&&(t(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e(3," The Addons extend the default Clarity cards by providing following additional types: "),i(),t(4,"ul")(5,"li"),e(6,"Selectable card. The selected stays visually highlighted."),i(),t(7,"li"),e(8,"Placeholder card. Represents an empty card which can be filled by user actions."),i()(),t(9,"h2"),e(10,"Selectable card"),i(),t(11,"div",2)(12,"h3"),e(13,"Behavior"),i(),t(14,"p"),e(15," Only one card at the time can have the selection indicator. Compare this behavior to a radio button. Note the different hover style in the example below. "),i(),t(16,"h6"),e(17,"Default clickable card (Standard Clarity)"),i(),t(18,"div",3)(19,"div",4)(20,"div",5)(21,"div",6),e(22,"Default card"),i(),t(23,"div",7),e(24," See the official "),t(25,"a",8),e(26,"Clarity documentation"),i(),e(27," for details. "),i()()()(),t(28,"h6"),e(29,"Selectable card (Clarity Addons)"),i(),t(30,"div",3),I(31,Z,6,5,"div",4,g),i(),t(33,"h3"),e(34,"Usage"),i(),t(35,"p"),e(36," On contrast to the default clickable-cards, the selectable card does not start an action, it is only marked as selected. Note that multiple selection is not supported. If you depend on multi-selection, use a different element such as a checkbox. A selectable card should have the class "),t(37,"code",9),e(38,"selectable"),i(),e(39," instead of the clarity-default "),t(40,"code",9),e(41,"clickable"),i(),e(42," class. Use the "),t(43,"code",9),e(44,"card-active"),i(),e(45," class to mark the currently selected one. "),i()(),t(46,"div",10),c(47,"clr-code-snippet",11),i(),t(48,"h2"),e(49,"Placeholder card"),i(),e(50," The placeholder card represents an empty card by a dashed border. The style is provided by class "),t(51,"code",9),e(52,"card-placeholder"),i(),e(53,". All buttons inside a placeholder card should be flat (btn-link). "),t(54,"div",3)(55,"div",4)(56,"div",12)(57,"div",6),e(58,"Placeholder card"),i(),t(59,"div",7),e(60," Card block "),t(61,"div")(62,"a",13),e(63,"Action"),i()()()()()(),c(64,"clr-code-snippet",11),t(65,"h2"),e(66,"Card with custom actions"),i(),e(67," To use a card with custom actions, use the classes "),t(68,"code",9),e(69,"card-actions"),i(),e(70," on the dropdown itself and "),t(71,"code",9),e(72,"card-action"),i(),e(73," on the dropdown-toggle. "),t(74,"div",3)(75,"div",4)(76,"div",14)(77,"div",6),e(78," Card header with custom actions "),t(79,"clr-dropdown",15)(80,"button",16),c(81,"cds-icon",17),i(),D(82,ee,7,0,"clr-dropdown-menu",18),i()(),t(83,"div",7),e(84,"Card Block"),i()()()(),c(85,"clr-code-snippet",11),i()()),l&2&&(n("title",o.title),d(31),M(o.cards),d(16),n("clrCode",o.htmlExample),d(17),n("clrCode",o.htmlExamplePlaceholder),d(21),n("clrCode",o.htmlExampleCustomActions))},dependencies:[z,j,$,V,R,W,X,N,B,q,m,p,v,F,u,h],encapsulation:2})}return r})();var ge=(()=>{class r{static \u0275fac=function(l){return new(l||r)};static \u0275mod=_({type:r});static \u0275inj=E({imports:[m,p,v,u,h,U.forChild([{path:"",component:x}]),x]})}return r})();export{ge as CardsDemoModule};
