"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[366],{53366:(J,b,a)=>{a.r(b),a.d(b,{FlowBarLayoutDemoModule:()=>k});var i=a(81180),d=a(36895),S=a(98592),u=a(11602),r=a(39646),f=a(91577),v=a(70305),t=a(94650),g=a(23497),s=a(664);const _=["flowBar"];function w(o,l){if(1&o&&(t.TgZ(0,"h3"),t._uU(1),t.ALo(2,"async"),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.AsE(" ",t.lcZ(2,2,null==e.activeStep?null:e.activeStep.title)," ",e.flowBarSteps.indexOf(e.activeStep)+1," ")}}function y(o,l){if(1&o&&(t.TgZ(0,"h3"),t._uU(1),t.ALo(2,"async"),t.ALo(3,"async"),t.qZA()),2&o){const e=t.oxw();t.xp6(1),t.lnq(" ",t.lcZ(2,3,null==e.activeStep?null:e.activeStep.title)," ",e.flowBarSteps.indexOf(e.activeStep)+1," - ",t.lcZ(3,5,null==e.activeStep.activeSubStep?null:e.activeStep.activeSubStep.title)," ")}}function Z(o,l){1&o&&(t.TgZ(0,"p"),t._uU(1," Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. "),t.qZA())}function A(o,l){if(1&o){const e=t.EpF();t.TgZ(0,"button",17),t.NdJ("click",function(){t.CHM(e),t.oxw();const c=t.MAs(12);return t.KtG(c.previous())}),t._uU(1," Previous "),t.qZA()}}function F(o,l){if(1&o){const e=t.EpF();t.TgZ(0,"button",23),t.NdJ("click",function(){const m=t.CHM(e).$implicit;t.oxw(3);const p=t.MAs(12);return t.KtG(p.changeActiveSubStep(m))}),t._uU(1),t.ALo(2,"async"),t.qZA()}if(2&o){const e=l.$implicit;t.xp6(1),t.hij(" ",t.lcZ(2,1,e.title)," ")}}function B(o,l){if(1&o&&(t.TgZ(0,"clr-dropdown-menu",21),t.YNc(1,F,3,3,"button",22),t.qZA()),2&o){const e=t.oxw(2);t.xp6(1),t.Q6J("ngForOf",null==e.activeStep?null:e.activeStep.subSteps)}}function L(o,l){if(1&o&&(t.TgZ(0,"clr-dropdown")(1,"button",18),t._uU(2),t.ALo(3,"async"),t._UZ(4,"cds-icon",19),t.qZA(),t.YNc(5,B,2,1,"clr-dropdown-menu",20),t.qZA()),2&o){const e=t.oxw();t.xp6(2),t.hij(" ",t.lcZ(3,1,null==e.activeStep.activeSubStep?null:e.activeStep.activeSubStep.title)," ")}}function h(o,l){if(1&o){const e=t.EpF();t.TgZ(0,"button",24),t.NdJ("click",function(){t.CHM(e),t.oxw();const c=t.MAs(12);return t.KtG(c.next())}),t._uU(1," Next "),t.qZA()}if(2&o){t.oxw();const e=t.MAs(12);t.Q6J("disabled",!e.isNextAvailable())}}function T(o,l){1&o&&(t.TgZ(0,"button",25),t._uU(1,"Finish"),t.qZA())}const x=function(){return[1,2,3,4,5,6,7,8]};f.Q.addIcons(v.i);let D=(()=>{class o{constructor(){(0,i.Z)(this,"flowBar",void 0),(0,i.Z)(this,"activeStep",void 0),(0,i.Z)(this,"flowBarSteps",[{title:(0,r.of)("Step"),enabled:!0,subSteps:[{title:(0,r.of)("Sub Step 1/3"),enabled:!0},{title:(0,r.of)("Sub Step 2/3"),enabled:!0},{title:(0,r.of)("Sub Step 3/3"),enabled:!0}]},{title:(0,r.of)("Step"),enabled:!0,subSteps:[{title:(0,r.of)("Sub Step 1/2"),enabled:!0},{title:(0,r.of)("Sub Step 2/2"),enabled:!0}]},{title:(0,r.of)("Step"),enabled:!0},{title:(0,r.of)("Step"),enabled:!0,subSteps:[{title:(0,r.of)("Sub Step 1/2"),enabled:!0},{title:(0,r.of)("Sub Step 2/2"),enabled:!0}]}])}setActiveStep(e){this.activeStep=e}setActiveSubStep(e){this.flowBar.changeActiveSubStep(e)}}return(0,i.Z)(o,"\u0275fac",function(e){return new(e||o)}),(0,i.Z)(o,"\u0275cmp",t.Xpm({type:o,selectors:[["clr-flow-bar-layout-demo"]],viewQuery:function(e,n){if(1&e&&t.Gf(_,7),2&e){let c;t.iGM(c=t.CRH())&&(n.flowBar=c.first)}},decls:33,vars:12,consts:[[1,"content-header"],[1,"command-bar",3,"clrMenuPosition"],[3,"click"],[3,"clrInMenu"],[3,"clrSteps","clrActiveStep","clrActiveStepChange"],["flowBar",""],[4,"ngIf"],[4,"ngFor","ngForOf"],[1,"clr-row","clr-flex-fill","clr-justify-content-between","clr-align-items-center"],[1,"clr-col"],[1,"clr-col-auto"],["type","button","class","btn btn-link",3,"click",4,"ngIf"],["type","button","class","btn btn-primary",3,"disabled","click",4,"ngIf"],["type","button","class","btn btn-success",4,"ngIf"],["contentPanel",""],["clr-content-panel-title",""],["clr-content-panel-content",""],["type","button",1,"btn","btn-link",3,"click"],["type","button","clrDropdownTrigger","",1,"btn","btn-outline-primary"],["shape","angle","direction","down"],["clrPosition","top-left",4,"clrIfOpen"],["clrPosition","top-left"],["class","btn","clrDropdownItem","",3,"click",4,"ngFor","ngForOf"],["clrDropdownItem","",1,"btn",3,"click"],["type","button",1,"btn","btn-primary",3,"disabled","click"],["type","button",1,"btn","btn-success"]],template:function(e,n){if(1&e){const c=t.EpF();t.TgZ(0,"clr-main-container"),t._UZ(1,"clr-demo-menu"),t.TgZ(2,"div",0),t._UZ(3,"clr-back-button"),t.TgZ(4,"h2"),t._uU(5,"Flow Bar Layout with sticky footer"),t.qZA(),t.TgZ(6,"clr-button-group",1)(7,"clr-button",2),t.NdJ("click",function(){t.CHM(c);const p=t.MAs(28);return t.KtG(p.toggle())}),t._uU(8,"Show/Hide Right"),t.qZA(),t.TgZ(9,"clr-button",3),t._uU(10,"Command1"),t.qZA()()(),t.TgZ(11,"clr-flow-bar",4,5),t.NdJ("clrActiveStepChange",function(p){return n.setActiveStep(p)}),t.qZA(),t.TgZ(13,"clr-content-panel-container")(14,"clr-content-panel-container-content"),t.YNc(15,w,3,4,"h3",6),t.YNc(16,y,4,7,"h3",6),t.YNc(17,Z,2,0,"p",7),t.qZA(),t.TgZ(18,"clr-content-panel-container-footer")(19,"div",8)(20,"div",9),t._uU(21,"Current Step Info"),t.qZA(),t.TgZ(22,"div",10),t.YNc(23,A,2,0,"button",11),t.YNc(24,L,6,3,"clr-dropdown",6),t.YNc(25,h,2,1,"button",12),t.YNc(26,T,2,0,"button",13),t.qZA()()(),t.TgZ(27,"clr-content-panel",null,14),t.ynx(29,15),t._uU(30,"Right Content Panel"),t.BQk(),t.ynx(31,16),t._uU(32,"Content"),t.BQk(),t.qZA()()()}if(2&e){const c=t.MAs(12);t.xp6(6),t.Q6J("clrMenuPosition","bottom-right"),t.xp6(3),t.Q6J("clrInMenu",!0),t.xp6(2),t.Q6J("clrSteps",n.flowBarSteps)("clrActiveStep",n.activeStep),t.xp6(4),t.Q6J("ngIf",!(null!=n.activeStep&&n.activeStep.subSteps)||0===(null==n.activeStep||null==n.activeStep.subSteps?null:n.activeStep.subSteps.length)),t.xp6(1),t.Q6J("ngIf",(null==n.activeStep?null:n.activeStep.subSteps)&&(null==n.activeStep||null==n.activeStep.subSteps?null:n.activeStep.subSteps.length)>0),t.xp6(1),t.Q6J("ngForOf",t.DdM(11,x)),t.xp6(6),t.Q6J("ngIf",c.isPreviousAvailable()),t.xp6(1),t.Q6J("ngIf",(null==n.activeStep||null==n.activeStep.subSteps?null:n.activeStep.subSteps.length)>0),t.xp6(1),t.Q6J("ngIf",!c.isLastStep()),t.xp6(1),t.Q6J("ngIf",c.isLastStep())}},dependencies:[d.sg,d.O5,u.nkF,u.nqY,u.JOM,u.uEX,u.QoI,u.zuD,u.f_W,u.zwp,u.ZUS,u.lU3,g.M,s.lwH,s.H5c,s.gQC,s.EJq,s.w9C,s.k31,s.Qci,d.Ov],encapsulation:2})),o})();var M=a(19976);let k=(()=>{class o{}return(0,i.Z)(o,"\u0275fac",function(e){return new(e||o)}),(0,i.Z)(o,"\u0275mod",t.oAB({type:o})),(0,i.Z)(o,"\u0275inj",t.cJS({imports:[d.ez,u.K6A,M.J,S.Bz.forChild([{path:"",component:D,outlet:"fullpage"}]),s.mmz]})),o})()}}]);