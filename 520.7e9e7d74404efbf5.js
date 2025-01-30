"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[520],{45520:(A,r,a)=>{a.r(r),a.d(r,{CardsDemoModule:()=>w});var v=a(84341),o=a(60177),s=a(50468),h=a(2985),F=a(63324),m=a(25740),c=a(54438),p=a(87620),u=a(91464),n=a(36366);function E(e,i){1&e&&(c.j41(0,"div",7),c.EFF(1,"Click to select me"),c.k0s())}function k(e,i){1&e&&(c.j41(0,"div",7),c.EFF(1,"I am the selected card"),c.k0s())}function f(e,i){if(1&e){const d=c.RV6();c.j41(0,"div",4)(1,"div",20),c.bIt("click",function(){const l=c.eBV(d).index,x=c.XpG();return c.Njj(x.activateCard(l))}),c.j41(2,"div",6),c.EFF(3),c.k0s(),c.DNE(4,E,2,0,"div",21)(5,k,2,0,"div",21),c.k0s()()}if(2&e){const d=i.$implicit;c.R7$(),c.AVh("card-active",d.active),c.R7$(2),c.JRh(d.title),c.R7$(),c.Y8G("ngIf",!d.active),c.R7$(),c.Y8G("ngIf",d.active)}}function b(e,i){1&e&&(c.j41(0,"clr-dropdown-menu",22)(1,"button",23),c.EFF(2,"Edit"),c.k0s(),c.j41(3,"button",23),c.EFF(4,"Duplicate"),c.k0s(),c.j41(5,"button",23),c.EFF(6,"Delete"),c.k0s()())}F.h.addIcons(m.z);let g=(()=>{class e extends h.S{htmlExample='\n<div class="clr-row">\n    <div class="clr-col-4">\n        <div class="card card-active clickable">\n            <div class="card-header">\n                I am an active card\n            </div>\n            <div class="card-block">\n                I am also clickable\n            </div>\n        </div>\n    </div>\n    <div class="clr-col-4">\n        <div class="card clickable">\n            <div class="card-header">\n                I am a non active card\n            </div>\n            <div class="card-block">\n                But I am clickable\n            </div>\n        </div>\n    </div>\n    <div class="clr-col-4">\n        <div class="card">\n            <div class="card-header">\n                I am a non active card\n            </div>\n            <div class="card-block">\n                And I am also not clickable\n            </div>\n        </div>\n    </div>\n</div>\n';htmlExamplePlaceholder='\n<div class="card card-placeholder">\n    <div class="card-header">\n        Placeholder card\n    </div>\n    <div class="card-block">\n        Card block\n        <div>\n            <a class="btn btn-link">Action</a>\n        </div>\n    </div>\n</div>\n';htmlExampleCustomActions='\n<div class="card">\n    <div class="card-header">\n        Card header with custom actions\n        <clr-dropdown class="card-actions">\n            <button type="button" class="btn btn-icon btn-link card-action dropdown-toggle" clrDropdownTrigger>\n                <cds-icon shape="ellipsis-vertical"></cds-icon>\n            </button>\n            <clr-dropdown-menu clrPosition="bottom-right" *clrIfOpen>\n                ...\n            </clr-dropdown-menu>\n        </clr-dropdown>\n    </div>\n    <div class="card-block">\n        Card Block\n    </div>\n</div>\n';cards=[{title:"Selectable card",active:!0},{title:"Selectable card",active:!1},{title:"Selectable card",active:!1}];activateCard(d){for(let t of this.cards)t.active=!1;this.cards[d].active=!0}constructor(){super("cards")}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=c.VBU({type:e,selectors:[["clr-cards-demo"]],hostVars:4,hostBindings:function(t,l){2&t&&c.AVh("content-area",!0)("dox-content-panel",!0)},standalone:!1,features:[c.Vt3],decls:85,vars:5,consts:[[3,"title"],["id","cards-header",1,"component-summary"],["id","design-guidelines"],[1,"clr-row"],[1,"clr-col-4"],[1,"card","clickable"],[1,"card-header"],[1,"card-block"],["href","https://clarity.design/documentation/cards"],["class","clr-col-4",4,"ngFor","ngForOf"],[1,"clr-code"],["id","examples"],[3,"clrCode"],[1,"card","card-placeholder"],[1,"btn","btn-link"],[1,"card"],[1,"card-actions"],["type","button","clrDropdownTrigger","",1,"btn","btn-icon","btn-link","card-action","dropdown-toggle"],["shape","ellipsis-vertical"],["clrPosition","bottom-right",4,"clrIfOpen"],[1,"card","selectable",3,"click"],["class","card-block",4,"ngIf"],["clrPosition","bottom-right"],["type","button","clrDropdownItem",""]],template:function(t,l){1&t&&(c.j41(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),c.EFF(3," The Addons extend the default Clarity cards by providing following additional types: "),c.k0s(),c.j41(4,"ul")(5,"li"),c.EFF(6,"Selectable card. The selected stays visually highlighted."),c.k0s(),c.j41(7,"li"),c.EFF(8,"Placeholder card. Represents an empty card which can be filled by user actions."),c.k0s()(),c.j41(9,"h2"),c.EFF(10,"Selectable card"),c.k0s(),c.j41(11,"div",2)(12,"h3"),c.EFF(13,"Behavior"),c.k0s(),c.j41(14,"p"),c.EFF(15," Only one card at the time can have the selection indicator. Compare this behavior to a radio button. Note the different hover style in the example below. "),c.k0s(),c.j41(16,"h6"),c.EFF(17,"Default clickable card (Standard Clarity)"),c.k0s(),c.j41(18,"div",3)(19,"div",4)(20,"div",5)(21,"div",6),c.EFF(22,"Default card"),c.k0s(),c.j41(23,"div",7),c.EFF(24," See the official "),c.j41(25,"a",8),c.EFF(26,"Clarity documentation"),c.k0s(),c.EFF(27," for details. "),c.k0s()()()(),c.j41(28,"h6"),c.EFF(29,"Selectable card (Clarity Addons)"),c.k0s(),c.j41(30,"div",3),c.DNE(31,f,6,5,"div",9),c.k0s(),c.j41(32,"h3"),c.EFF(33,"Usage"),c.k0s(),c.j41(34,"p"),c.EFF(35," On contrast to the default clickable-cards, the selectable card does not start an action, it is only marked as selected. Note that multiple selection is not supported. If you depend on multi-selection, use a different element such as a checkbox. A selectable card should have the class "),c.j41(36,"code",10),c.EFF(37,"selectable"),c.k0s(),c.EFF(38," instead of the clarity-default "),c.j41(39,"code",10),c.EFF(40,"clickable"),c.k0s(),c.EFF(41," class. Use the "),c.j41(42,"code",10),c.EFF(43,"card-active"),c.k0s(),c.EFF(44," class to mark the currently selected one. "),c.k0s()(),c.j41(45,"div",11),c.nrm(46,"clr-code-snippet",12),c.k0s(),c.j41(47,"h2"),c.EFF(48,"Placeholder card"),c.k0s(),c.EFF(49," The placeholder card represents an empty card by a dashed border. The style is provided by class "),c.j41(50,"code",10),c.EFF(51,"card-placeholder"),c.k0s(),c.EFF(52,". All buttons inside a placeholder card should be flat (btn-link). "),c.j41(53,"div",3)(54,"div",4)(55,"div",13)(56,"div",6),c.EFF(57,"Placeholder card"),c.k0s(),c.j41(58,"div",7),c.EFF(59," Card block "),c.j41(60,"div")(61,"a",14),c.EFF(62,"Action"),c.k0s()()()()()(),c.nrm(63,"clr-code-snippet",12),c.j41(64,"h2"),c.EFF(65,"Card with custom actions"),c.k0s(),c.EFF(66," To use a card with custom actions, use the classes "),c.j41(67,"code",10),c.EFF(68,"card-actions"),c.k0s(),c.EFF(69," on the dropdown itself and "),c.j41(70,"code",10),c.EFF(71,"card-action"),c.k0s(),c.EFF(72," on the dropdown-toggle. "),c.j41(73,"div",3)(74,"div",4)(75,"div",15)(76,"div",6),c.EFF(77," Card header with custom actions "),c.j41(78,"clr-dropdown",16)(79,"button",17),c.nrm(80,"cds-icon",18),c.k0s(),c.DNE(81,b,7,0,"clr-dropdown-menu",19),c.k0s()(),c.j41(82,"div",7),c.EFF(83,"Card Block"),c.k0s()()()(),c.nrm(84,"clr-code-snippet",12),c.k0s()()),2&t&&(c.Y8G("title",l.title),c.R7$(31),c.Y8G("ngForOf",l.cards),c.R7$(15),c.Y8G("clrCode",l.htmlExample),c.R7$(17),c.Y8G("clrCode",l.htmlExamplePlaceholder),c.R7$(21),c.Y8G("clrCode",l.htmlExampleCustomActions))},dependencies:[o.Sq,o.bT,s.BlU,s.vEc,s.TZW,s.e3J,s.jWx,s.wIE,p.z,u.u,n.ohx],encapsulation:2})}return e})();var D=a(20786),T=a(5928),I=a(63275);let w=(()=>{class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=c.$C({type:e});static \u0275inj=c.G2t({imports:[o.MD,v.YN,s.PuD,I.u,D.g,T.iI.forChild([{path:"",component:g}]),n.P8i]})}return e})()}}]);