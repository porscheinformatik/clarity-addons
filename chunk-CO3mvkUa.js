import{n as P,r as ie$1,t as O}from"./chunk-agnf9ZDH.js";import{$n as T,Ba as j,Bn as Rhe,Ca as h2,D as At,Ds as u8e,Hn as Rt,Jo as q_,Ms as v,O as B,Oa as hae,Pa as ie$2,Pt as K,Qt as M,Tr as Ve,Uo as q,Wa as je,Wn as S,Z as EB,Zt as Lp,_s as te$1,an as N,b as A,bo as ne,d as $,dn as O$1,ea as ee$1,ec as y,ii as Zn,l as _e,lo as me,nr as TB,or as Tj,pi as _h,rc as ye,s as O$2,sa as f,si as Zt,vt as I}from"./main-MZS5HDZR.js";import{jd as z0}from"./chunk-Dj4ysbNo.js";function Q(r,s){r&1&&(y(0,`div`,7),ie$2(1,`Click to select me`),v())}function Y(r,s){r&1&&(y(0,`div`,7),ie$2(1,`I am the selected card`),v())}function Z(r,s){if(r&1){let a=ye();y(0,`div`,4)(1,`div`,19),N(`click`,function(){let n=te$1(a).$index,J=M();return ne(J.activateCard(n))}),y(2,`div`,6),ie$2(3),v(),I(4,Q,2,0,`div`,7),I(5,Y,2,0,`div`,7),v()()}if(r&2){let a=s.$implicit;f(),T(`card-active`,a.active),f(2),Ve(a.title),f(),S(a.active?-1:4),f(),S(a.active?5:-1)}}function ee(r,s){r&1&&(y(0,`clr-dropdown-menu`,20)(1,`button`,21),ie$2(2,`Edit`),v(),y(3,`button`,21),ie$2(4,`Duplicate`),v(),y(5,`button`,21),ie$2(6,`Delete`),v()())}var te=`
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
`;var ie=`
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
`;var re=`
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
`;me.addIcons(q_);var x=(()=>{class r extends P{htmlExample=te;htmlExamplePlaceholder=ie;htmlExampleCustomActions=re;cards=[{title:`Selectable card`,active:!0},{title:`Selectable card`,active:!1},{title:`Selectable card`,active:!1}];activateCard(a){for(let l of this.cards)l.active=!1;this.cards[a].active=!0}constructor(){super(`cards`)}static ɵfac=function(l){return new(l||r)};static ɵcmp=O$1({type:r,selectors:[[`clr-cards-demo`]],hostVars:4,hostBindings:function(l,n){l&2&&T(`content-area`,!0)(`dox-content-panel`,!0)},features:[ee$1],decls:86,vars:4,consts:[[3,`title`],[`id`,`cards-header`,1,`component-summary`],[`id`,`design-guidelines`],[1,`clr-row`],[1,`clr-col-4`],[1,`card`,`clickable`],[1,`card-header`],[1,`card-block`],[`href`,`https://clarity.design/documentation/card`],[1,`clr-code`],[`id`,`examples`],[3,`clrCode`],[1,`card`,`card-placeholder`],[1,`btn`,`btn-link`],[1,`card`],[1,`card-actions`],[`type`,`button`,`clrDropdownTrigger`,``,1,`btn`,`btn-icon`,`btn-link`,`card-action`,`dropdown-toggle`],[`shape`,`ellipsis-vertical`],[`clrPosition`,`bottom-right`,4,`clrIfOpen`],[1,`card`,`selectable`,3,`click`],[`clrPosition`,`bottom-right`],[`type`,`button`,`clrDropdownItem`,``]],template:function(l,n){l&1&&(y(0,`clr-doc-wrapper`,0)(1,`article`)(2,`h5`,1),ie$2(3,` The Addons extend the default Clarity cards by providing following additional types: `),v(),y(4,`ul`)(5,`li`),ie$2(6,`Selectable card. The selected stays visually highlighted.`),v(),y(7,`li`),ie$2(8,`Placeholder card. Represents an empty card which can be filled by user actions.`),v()(),y(9,`h2`),ie$2(10,`Selectable card`),v(),y(11,`div`,2)(12,`h3`),ie$2(13,`Behavior`),v(),y(14,`p`),ie$2(15,` Only one card at the time can have the selection indicator. Compare this behavior to a radio button. Note the different hover style in the example below. `),v(),y(16,`h6`),ie$2(17,`Default clickable card (Standard Clarity)`),v(),y(18,`div`,3)(19,`div`,4)(20,`div`,5)(21,`div`,6),ie$2(22,`Default card`),v(),y(23,`div`,7),ie$2(24,` See the official `),y(25,`a`,8),ie$2(26,`Clarity documentation`),v(),ie$2(27,` for details. `),v()()()(),y(28,`h6`),ie$2(29,`Selectable card (Clarity Addons)`),v(),y(30,`div`,3),At(31,Z,6,5,`div`,4,Zt),v(),y(33,`h3`),ie$2(34,`Usage`),v(),y(35,`p`),ie$2(36,` On contrast to the default clickable-cards, the selectable card does not start an action, it is only marked as selected. Note that multiple selection is not supported. If you depend on multi-selection, use a different element such as a checkbox. A selectable card should have the class `),y(37,`code`,9),ie$2(38,`selectable`),v(),ie$2(39,` instead of the clarity-default `),y(40,`code`,9),ie$2(41,`clickable`),v(),ie$2(42,` class. Use the `),y(43,`code`,9),ie$2(44,`card-active`),v(),ie$2(45,` class to mark the currently selected one. `),v()(),y(46,`div`,10),j(47,`clr-code-snippet`,11),v(),y(48,`h2`),ie$2(49,`Placeholder card`),v(),ie$2(50,` The placeholder card represents an empty card by a dashed border. The style is provided by class `),y(51,`code`,9),ie$2(52,`card-placeholder`),v(),ie$2(53,`. All buttons inside a placeholder card should be flat (btn-link). `),y(54,`div`,3)(55,`div`,4)(56,`div`,12)(57,`div`,6),ie$2(58,`Placeholder card`),v(),y(59,`div`,7),ie$2(60,` Card block `),y(61,`div`)(62,`a`,13),ie$2(63,`Action`),v()()()()()(),j(64,`clr-code-snippet`,11),y(65,`h2`),ie$2(66,`Card with custom actions`),v(),ie$2(67,` To use a card with custom actions, use the classes `),y(68,`code`,9),ie$2(69,`card-actions`),v(),ie$2(70,` on the dropdown itself and `),y(71,`code`,9),ie$2(72,`card-action`),v(),ie$2(73,` on the dropdown-toggle. `),y(74,`div`,3)(75,`div`,4)(76,`div`,14)(77,`div`,6),ie$2(78,` Card header with custom actions `),y(79,`clr-dropdown`,15)(80,`button`,16),j(81,`cds-icon`,17),v(),je(82,ee,7,0,`clr-dropdown-menu`,18),v()(),y(83,`div`,7),ie$2(84,`Card Block`),v()()()(),j(85,`clr-code-snippet`,11),v()()),l&2&&(A(`title`,n.title),f(31),Rt(n.cards),f(16),A(`clrCode`,n.htmlExample),f(17),A(`clrCode`,n.htmlExamplePlaceholder),f(21),A(`clrCode`,n.htmlExampleCustomActions))},dependencies:[O,O$2,h2,_h,EB,u8e,TB,Tj,q,z0,K,Zn,Rhe,hae,_e,ie$1],encapsulation:2,changeDetection:1})}return r})();var ke=(()=>{class r{static ɵfac=function(l){return new(l||r)};static ɵmod=$({type:r});static ɵinj=B({imports:[K,Zn,Rhe,_e,ie$1,Lp.forChild([{path:``,component:x}]),x]})}return r})();export{ke as CardsDemoModule};