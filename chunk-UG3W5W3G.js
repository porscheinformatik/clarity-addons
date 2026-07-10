import{c as X,d as q}from"./chunk-BVYDJZUK.js";import{a as H,b as J}from"./chunk-3BNK6FVJ.js";import{$j as z,Bk as V,_ as j,b as W,j as B,k as G,y as O}from"./chunk-7O7TFQOW.js";import{Bf as C,Cf as y,Df as f,Ef as E,Ff as S,Hf as h,If as w,Jf as D,Jg as I,K as m,Kf as k,Kg as F,Lf as M,Lg as L,Na as i,Ng as P,Oa as e,Og as v,Pa as l,Pg as A,Qa as t,Qg as T,Sg as N,Wg as R,hf as u,hh as U,mb as c,oa as n,wa as s,wc as d,wf as b,xa as p,xf as x,zf as g}from"./chunk-KXNV7YWY.js";import"./chunk-76DGGKHL.js";var Z=`
<form clrForm [clrLayout]="'horizontal'" class="clr-row">
    <h4 class="clr-col-12">Personal Data</h4>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">First name</label>
        <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-input-container>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Last name</label>
        <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-input-container>
    <clr-radio-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Gender</label>
        <clr-radio-wrapper>
            <label>Male</label>
            <input clrRadio class="clr-col-12 clr-col-sm-4 clr-col-lg-6" type="radio" name="gender"/>
        </clr-radio-wrapper>
        <clr-radio-wrapper>
            <label>Female</label>
            <input clrRadio class="clr-col-12 clr-col-sm-4 clr-col-lg-6" type="radio" name="gender"/>
        </clr-radio-wrapper>
    </clr-radio-container>
    <clr-select-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Country</label>
        <select clrSelect class="clr-col-12 clr-col-sm-3 clr-col-lg-5">
            <option>Austria</option>
            <option>Germany</option>
            <option>United States of America</option>
        </select>
    </clr-select-container>
    <clr-date-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Date of Birth</label>
        <input clrDate type="text" class="clr-col-12 clr-col-sm-6 clr-col-lg-6"/>
    </clr-date-container>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">E-Mail</label>
        <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-input-container>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Phone</label>
        <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-input-container>

    <h4 class="clr-col-12">User Data</h4>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Username</label>
        <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-input-container>
    <clr-password-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Password</label>
        <input clrPassword type="password" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-password-container>

    <h4 class="clr-col-12">Other Data</h4>
    <clr-date-time-container class="clr-col-12 clr-col-lg-6 clr-row">
        <clr-date-container>
            <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Start date & time</label>
            <input clrDate type="text" class="clr-col-12 clr-col-sm-10 clr-col-lg-9"/>
        </clr-date-container>
        <input clrTime type="time" />
    </clr-date-time-container>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">End time</label>
        <input clrInput type="time" class="clr-col-12 clr-col-sm-3 clr-col-lg-5"/>
    </clr-input-container>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Daily Donation</label>
        <input clrInput clrNumeric type="text" class="clr-col-12 clr-col-sm-3 clr-col-lg-5"/>
        <span clrInputSuffix>\u20AC</span>
    </clr-input-container>
    <clr-checkbox-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Newsletter Subscriptions</label>
        <clr-checkbox-wrapper>
            <label>Weekly</label>
            <input clrCheckbox class="clr-col-12 clr-col-sm-6 clr-col-lg-6" type="checkbox"/>
        </clr-checkbox-wrapper>
        <clr-checkbox-wrapper>
            <label>Monthly</label>
            <input clrCheckbox class="clr-col-12 clr-col-sm-6 clr-col-lg-6" type="checkbox"/>
        </clr-checkbox-wrapper>
    </clr-checkbox-container>
    <clr-textarea-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Comment / Feedback</label>
        <textarea clrTextarea type="text" class="clr-col-12 clr-col-sm-10 clr-col-lg-9"></textarea>
    </clr-textarea-container>
</form>
`,K=(()=>{class r{codeExample=Z;static \u0275fac=function(o){return new(o||r)};static \u0275cmp=s({type:r,selectors:[["clr-forms-layout-demo"]],standalone:!1,decls:99,vars:2,consts:[[1,"content-header"],[1,"content-container"],[1,"content-area"],["clrForm","",1,"clr-row",3,"clrLayout"],[1,"clr-col-12"],[1,"clr-col-12","clr-col-lg-6"],[1,"clr-col-12","clr-col-sm-2","clr-col-lg-3"],["clrInput","","type","text",1,"clr-col-12","clr-col-sm-4","clr-col-lg-6"],["clrRadio","","type","radio","name","gender",1,"clr-col-12","clr-col-sm-4","clr-col-lg-6"],["clrSelect","",1,"clr-col-12","clr-col-sm-3","clr-col-lg-5"],["clrDate","","type","text",1,"clr-col-12","clr-col-sm-6","clr-col-lg-6"],["clrPassword","","type","password",1,"clr-col-12","clr-col-sm-4","clr-col-lg-6"],[1,"clr-col-12","clr-col-lg-6","clr-row"],["clrDate","","type","text",1,"clr-col-12","clr-col-sm-10","clr-col-lg-9"],["clrTime","","type","time"],["clrInput","","type","time",1,"clr-col-12","clr-col-sm-3","clr-col-lg-5"],["clrInput","","clrNumeric","","type","text",1,"clr-col-12","clr-col-sm-3","clr-col-lg-5"],["clrInputSuffix",""],["clrCheckbox","","type","checkbox",1,"clr-col-12","clr-col-sm-6","clr-col-lg-6"],["clrTextarea","","type","text",1,"clr-col-12","clr-col-sm-10","clr-col-lg-9"],[1,"clr-row"],[1,"clr-col-8",3,"clrCode"]],template:function(o,Q){o&1&&(e(0,"clr-main-container"),t(1,"clr-demo-menu"),e(2,"div",0),t(3,"clr-back-button"),e(4,"h2"),c(5,"Forms Layout"),l()(),e(6,"div",1)(7,"div",2)(8,"form",3)(9,"h4",4),c(10,"Personal Data"),l(),e(11,"clr-input-container",5)(12,"label",6),c(13,"First name"),l(),t(14,"input",7),l(),e(15,"clr-input-container",5)(16,"label",6),c(17,"Last name"),l(),t(18,"input",7),l(),e(19,"clr-radio-container",5)(20,"label",6),c(21,"Gender"),l(),e(22,"clr-radio-wrapper")(23,"label"),c(24,"Male"),l(),t(25,"input",8),l(),e(26,"clr-radio-wrapper")(27,"label"),c(28,"Female"),l(),t(29,"input",8),l()(),e(30,"clr-select-container",5)(31,"label",6),c(32,"Country"),l(),e(33,"select",9)(34,"option"),c(35,"Austria"),l(),e(36,"option"),c(37,"Germany"),l(),e(38,"option"),c(39,"United States of America"),l()()(),e(40,"clr-date-container",5)(41,"label",6),c(42,"Date of Birth"),l(),t(43,"input",10),l(),e(44,"clr-input-container",5)(45,"label",6),c(46,"E-Mail"),l(),t(47,"input",7),l(),e(48,"clr-input-container",5)(49,"label",6),c(50,"Phone"),l(),t(51,"input",7),l(),e(52,"h4",4),c(53,"User Data"),l(),e(54,"clr-input-container",5)(55,"label",6),c(56,"Username"),l(),t(57,"input",7),l(),e(58,"clr-password-container",5)(59,"label",6),c(60,"Password"),l(),t(61,"input",11),l(),e(62,"h4",4),c(63,"Other Data"),l(),e(64,"clr-date-time-container",12)(65,"clr-date-container")(66,"label",6),c(67,"Start date & time"),l(),t(68,"input",13),l(),t(69,"input",14),l(),e(70,"clr-input-container",5)(71,"label",6),c(72,"End time"),l(),t(73,"input",15),l(),e(74,"clr-input-container",5)(75,"label",6),c(76,"Daily Donation"),l(),t(77,"input",16),e(78,"span",17),c(79,"\u20AC"),l()(),e(80,"clr-checkbox-container",5)(81,"label",6),c(82,"Newsletter Subscriptions"),l(),e(83,"clr-checkbox-wrapper")(84,"label"),c(85,"Weekly"),l(),t(86,"input",18),l(),e(87,"clr-checkbox-wrapper")(88,"label"),c(89,"Monthly"),l(),t(90,"input",18),l()(),e(91,"clr-textarea-container",5)(92,"label",6),c(93,"Comment / Feedback"),l(),t(94,"textarea",19),l()(),e(95,"h3"),c(96,"Source Code"),l(),e(97,"div",20),t(98,"clr-code-snippet",21),l()()()()),o&2&&(n(8),i("clrLayout","horizontal"),n(90),i("clrCode",Q.codeExample))},dependencies:[b,x,g,w,D,h,F,I,L,y,C,v,P,E,S,f,M,k,T,A,R,N,H,W,O,B,G,j,z,X],encapsulation:2})}return r})();var fl=(()=>{class r{static \u0275fac=function(o){return new(o||r)};static \u0275mod=p({type:r});static \u0275inj=m({imports:[d,U,J,u.forChild([{path:"",component:K,outlet:"fullpage"}]),V,q]})}return r})();export{fl as FormsLayoutDemoModule};
