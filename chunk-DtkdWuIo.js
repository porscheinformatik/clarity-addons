import{Ba as j,Bn as Rhe,Bs as w5e,Ei as bS,Fa as ih,Fs as vh,Gi as dS,H as Cz,Hr as Xe,I as C4,Lt as K4e,Ms as v,Na as ide,Ns as vS,O as B,Oo as oD,Pa as ie,Pt as K,Ti as bB,Zt as Lp,b as A,br as V4,ca as f4,d as $,di as _de,dn as O,ec as y,en as MB,gs as tde,ia as epe,ic as yh,kn as Q4e,l as _e,la as fS,li as _5e,ln as Nl,os as sD,qs as x5e,rs as rt,s as O$1,sa as f,ui as _S,vo as na,xt as IB,yn as P5e,zs as w4}from"./main-MZS5HDZR.js";import{n as xe,t as X}from"./chunk-tzPgqVzY.js";import{Ha as _7,Mn as L7,Mu as up,Xa as _o,Yc as n8,nt as Dp}from"./chunk-Dj4ysbNo.js";var nl=`
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
`;var a=(()=>{class r{codeExample=nl;static ɵfac=function(o){return new(o||r)};static ɵcmp=O({type:r,selectors:[[`clr-forms-layout-demo`]],decls:99,vars:2,consts:[[1,`content-header`],[1,`content-container`],[1,`content-area`],[`clrForm`,``,1,`clr-row`,3,`clrLayout`],[1,`clr-col-12`],[1,`clr-col-12`,`clr-col-lg-6`],[1,`clr-col-12`,`clr-col-sm-2`,`clr-col-lg-3`],[`clrInput`,``,`type`,`text`,1,`clr-col-12`,`clr-col-sm-4`,`clr-col-lg-6`],[`clrRadio`,``,`type`,`radio`,`name`,`gender`,1,`clr-col-12`,`clr-col-sm-4`,`clr-col-lg-6`],[`clrSelect`,``,1,`clr-col-12`,`clr-col-sm-3`,`clr-col-lg-5`],[`clrDate`,``,`type`,`text`,1,`clr-col-12`,`clr-col-sm-6`,`clr-col-lg-6`],[`clrPassword`,``,`type`,`password`,1,`clr-col-12`,`clr-col-sm-4`,`clr-col-lg-6`],[1,`clr-col-12`,`clr-col-lg-6`,`clr-row`],[`clrDate`,``,`type`,`text`,1,`clr-col-12`,`clr-col-sm-10`,`clr-col-lg-9`],[`clrTime`,``,`type`,`time`],[`clrInput`,``,`type`,`time`,1,`clr-col-12`,`clr-col-sm-3`,`clr-col-lg-5`],[`clrInput`,``,`clrNumeric`,``,`type`,`text`,1,`clr-col-12`,`clr-col-sm-3`,`clr-col-lg-5`],[`clrInputSuffix`,``],[`clrCheckbox`,``,`type`,`checkbox`,1,`clr-col-12`,`clr-col-sm-6`,`clr-col-lg-6`],[`clrTextarea`,``,`type`,`text`,1,`clr-col-12`,`clr-col-sm-10`,`clr-col-lg-9`],[1,`clr-row`],[1,`clr-col-8`,3,`clrCode`]],template:function(o,rl){o&1&&(y(0,`clr-main-container`),j(1,`clr-demo-menu`),y(2,`div`,0),j(3,`clr-back-button`),y(4,`h2`),ie(5,`Forms Layout`),v()(),y(6,`div`,1)(7,`div`,2)(8,`form`,3)(9,`h4`,4),ie(10,`Personal Data`),v(),y(11,`clr-input-container`,5)(12,`label`,6),ie(13,`First name`),v(),j(14,`input`,7),v(),y(15,`clr-input-container`,5)(16,`label`,6),ie(17,`Last name`),v(),j(18,`input`,7),v(),y(19,`clr-radio-container`,5)(20,`label`,6),ie(21,`Gender`),v(),y(22,`clr-radio-wrapper`)(23,`label`),ie(24,`Male`),v(),j(25,`input`,8),v(),y(26,`clr-radio-wrapper`)(27,`label`),ie(28,`Female`),v(),j(29,`input`,8),v()(),y(30,`clr-select-container`,5)(31,`label`,6),ie(32,`Country`),v(),y(33,`select`,9)(34,`option`),ie(35,`Austria`),v(),y(36,`option`),ie(37,`Germany`),v(),y(38,`option`),ie(39,`United States of America`),v()()(),y(40,`clr-date-container`,5)(41,`label`,6),ie(42,`Date of Birth`),v(),j(43,`input`,10),v(),y(44,`clr-input-container`,5)(45,`label`,6),ie(46,`E-Mail`),v(),j(47,`input`,7),v(),y(48,`clr-input-container`,5)(49,`label`,6),ie(50,`Phone`),v(),j(51,`input`,7),v(),y(52,`h4`,4),ie(53,`User Data`),v(),y(54,`clr-input-container`,5)(55,`label`,6),ie(56,`Username`),v(),j(57,`input`,7),v(),y(58,`clr-password-container`,5)(59,`label`,6),ie(60,`Password`),v(),j(61,`input`,11),v(),y(62,`h4`,4),ie(63,`Other Data`),v(),y(64,`clr-date-time-container`,12)(65,`clr-date-container`)(66,`label`,6),ie(67,`Start date & time`),v(),j(68,`input`,13),v(),j(69,`input`,14),v(),y(70,`clr-input-container`,5)(71,`label`,6),ie(72,`End time`),v(),j(73,`input`,15),v(),y(74,`clr-input-container`,5)(75,`label`,6),ie(76,`Daily Donation`),v(),j(77,`input`,16),y(78,`span`,17),ie(79,`€`),v()(),y(80,`clr-checkbox-container`,5)(81,`label`,6),ie(82,`Newsletter Subscriptions`),v(),y(83,`clr-checkbox-wrapper`)(84,`label`),ie(85,`Weekly`),v(),j(86,`input`,18),v(),y(87,`clr-checkbox-wrapper`)(88,`label`),ie(89,`Monthly`),v(),j(90,`input`,18),v()(),y(91,`clr-textarea-container`,5)(92,`label`,6),ie(93,`Comment / Feedback`),v(),j(94,`textarea`,19),v()(),y(95,`h3`),ie(96,`Source Code`),v(),y(97,`div`,20),j(98,`clr-code-snippet`,21),v()()()()),o&2&&(f(8),A(`clrLayout`,`horizontal`),f(90),A(`clrCode`,rl.codeExample))},dependencies:[sD,epe,oD,Cz,X,up,rt,Xe,tde,ide,na,dS,ih,_o,n8,V4,yh,w5e,vh,w4,x5e,MB,vS,Q4e,fS,K4e,bS,_5e,bB,L7,_7,Dp,f4,Nl,_de,C4,_S,P5e,IB,O$1],encapsulation:2,changeDetection:1})}return r})();var Fl=(()=>{class r{static ɵfac=function(o){return new(o||r)};static ɵmod=$({type:r});static ɵinj=B({imports:[K,Rhe,xe,Lp.forChild([{path:``,component:a,outlet:`fullpage`}]),_e,a]})}return r})();export{Fl as FormsLayoutDemoModule};