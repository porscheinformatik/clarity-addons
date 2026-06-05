import{a as ke,b as Ie,c as Pe}from"./chunk-TL2N2RC7.js";import"./chunk-53GF5SVT.js";import{c as We,d as Re}from"./chunk-D7R3U4E3.js";import{Y as Te,Yj as Le,j as Ce,k as we,u as _e,v as Oe,w as ve,y as Fe,yk as De}from"./chunk-C3RSNUGJ.js";import{$c as R,$e as j,$g as Me,Aa as h,Af as ie,Bb as u,Be as J,Bf as ae,Bg as ge,Cf as ce,Cg as be,Df as me,Dg as xe,Fg as he,Gg as ye,Hg as Ee,Ig as fe,J as E,Jg as Se,La as i,Ma as e,Na as l,Oa as p,Qc as v,Rc as F,Vc as T,Wc as L,Xa as C,Yc as D,Ye as U,Ze as X,_c as W,bd as k,fd as I,gd as P,hd as V,ib as w,jd as A,kb as t,ld as N,lf as G,mb as _,mf as Z,na as n,nd as q,of as K,pf as Q,qb as a,qf as Y,qg as se,rb as c,rf as $,sb as m,sg as de,tc as O,tf as ee,tg as pe,uf as le,ug as ue,va as f,vd as B,vf as te,wa as S,wd as H,wf as re,xd as z,xf as oe,za as M,zf as ne}from"./chunk-RVAFCAEY.js";import"./chunk-UKNGC2Y4.js";var g=()=>({updateOn:"blur"});function Ne(d,y){d&1&&(e(0,"clr-control-error"),t(1,"Error message about being required"),l())}function qe(d,y){d&1&&(e(0,"clr-control-error"),t(1,"Error message about requiring 5 characters"),l())}function Be(d,y){d&1&&(e(0,"clr-control-error"),t(1,"Error message about being required"),l())}H.addIcons(J);var He=`
<form clrForm clrLayout="horizontal" class="clr-row">
    <clr-input-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 clr-required-mark">Input label</label>
        <input clrInput class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" type="text"
               [(ngModel)]="inputText" [ngModelOptions]="{ updateOn: 'blur' }"
               name="inputName" required minlength="5"/>
        <clr-control-helper>Helper text that shows while it is pristine and valid</clr-control-helper>
        <clr-control-error *clrIfError="'required'">Error message about being required</clr-control-error>
        <clr-control-error *clrIfError="'minlength'">Error message about requiring 5 characters
        </clr-control-error>
    </clr-input-container>
    <clr-textarea-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 clr-required-mark">Textarea label</label>
        <textarea clrTextarea class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"
                  [(ngModel)]="textareaText" [ngModelOptions]="{ updateOn: 'blur' }"
                  name="description" required></textarea>
        <clr-control-error *clrIfError="'required'">Error message about being required</clr-control-error>
    </clr-textarea-container>
    <clr-password-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Password label</label>
        <input clrPassword class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"
               placeholder="Password please!" type="text"
               [(ngModel)]="passwordText" [ngModelOptions]="{ updateOn: 'blur' }" name="passwordName"/>
    </clr-password-container>
    <clr-select-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 clr-required-mark">Select label</label>
        <select clrSelect class="clr-col-6 clr-col-sm-3 clr-col-md-2" name="options"
                [(ngModel)]="selectOption">
            <option value="one">One</option>
            <option value="two">Two</option>
            <option value="three">Three</option>
        </select>
    </clr-select-container>
    <clr-combobox-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Combobox label</label>
        <clr-combobox class="clr-col-6 clr-col-sm-3 clr-col-md-2">
            <clr-options>
                <clr-option [clrValue]="'Option 1'">Option 1</clr-option>
                <clr-option [clrValue]="'Option 2'">Option 2</clr-option>
                <clr-option [clrValue]="'Option 3'">Option 3</clr-option>
            </clr-options>
        </clr-combobox>
    </clr-combobox-container>
    <clr-radio-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 clr-required-mark">Radio label</label>
        <clr-radio-wrapper>
            <input type="radio" class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"
                clrRadio name="options" value="1" required [(ngModel)]="radioOption"/>
            <label>Option 1</label>
        </clr-radio-wrapper>
        <clr-radio-wrapper>
            <input type="radio" clrRadio name="options" value="2" required [(ngModel)]="radioOption"/>
            <label>Option 2</label>
        </clr-radio-wrapper>
        <clr-control-helper>Helper text</clr-control-helper>
        <clr-control-error>This field is required!</clr-control-error>
    </clr-radio-container>
    <clr-date-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Date label</label>
        <input class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" type="text" [(ngModel)]="date"
               [ngModelOptions]="{ updateOn: 'blur' }" name="date" clrDate>
    </clr-date-container>
    <clr-input-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Time label</label>
        <input class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" type="time" [(ngModel)]="time"
               [ngModelOptions]="{ updateOn: 'blur' }" name="time" clrInput>
    </clr-input-container>
    <clr-date-time-container class="clr-col-12 clr-row">
        <clr-date-container>
            <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Date & time label</label>
            <input class="clr-col-8" clrDate type="text" [(ngModel)]="date"
                   [ngModelOptions]="{ updateOn: 'blur' }" name="date">
        </clr-date-container>
        <input type="time" [(ngModel)]="time" [ngModelOptions]="{ updateOn: 'blur' }" name="time" clrTime>
    </clr-date-time-container>
    <clr-input-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Money label</label>
        <input class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" clrInput clrNumeric
               class="clr-col-2" type="text" [(clrNumericValue)]="money" />
        <span clrInputSuffix>\u20AC</span>
    </clr-input-container>
    <clr-checkbox-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Checkbox label</label>
        <clr-checkbox-wrapper>
            <label>Option</label>
            <input clrCheckbox class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"
                type="checkbox" [(ngModel)]="checkboxValue" name="checkboxName"/>
        </clr-checkbox-wrapper>
    </clr-checkbox-container>
    <clr-toggle-container class="clr-col-12">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Toggle label</label>
        <clr-toggle-wrapper>
            <input type="checkbox" class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"
                id="toggle" name="toggle" [(ngModel)]="toggleValue" clrToggle/>
            <label for="toggle" class="clr-col-none"></label>
        </clr-toggle-wrapper>
    </clr-toggle-container>
    <clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data"
                            [ngModelOptions]="{ updateOn: 'blur' }"
                            clrRequiredAllMultilang
                            clrControlClasses="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"
                            name="template">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 clr-required-mark">Multilingual Input</label>
        <clr-control-error>Please translate in every language!</clr-control-error>
        <clr-control-helper>Helper text</clr-control-helper>
    </clr-multilingual-input>
    <clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data2"
                               [ngModelOptions]="{ updateOn: 'blur' }"
                               clrRequiredAllMultilang
                               clrControlClasses="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"
                               name="template2">
        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 clr-required-mark">Multilingual Input</label>
        <clr-control-error>Please translate in every language!</clr-control-error>
        <clr-control-helper>Helper text</clr-control-helper>
    </clr-multilingual-textarea>
</form>
`,ze=`
<form ... (submit)="onFormSubmit()">
    ...
    <input type="submit" style="display: none"> <!-- Not needed, if you already have a submit button-->
</form>
`,Je=`
onFormSubmit() {
    (<HTMLElement>document.activeElement).blur();
    ...
}
`,Ue=`
@ViewChild(ClrForm, { static: true }) clrForm: ClrForm;

onFormSubmit() {
    (<HTMLElement>document.activeElement).blur(); // to correctly handle invalid inputs when hitting enter
    this.form.updateValueAndValidity(); // form is the instance to the FormGroup (reactive) or ngForm (template)

    if (this.form.valid) {
      // save the form
    } else {
      this.clrForm.markAsTouched(); // to show validation errors for not-touched fields
    }
}
`,Xe=`
<form clrForm [clrLayout]="'horizontal'" class="clr-row">
    <div class="clr-col-12 clr-form-control clr-row">
        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">First name</label>
        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">John</span>
    </div>

    <div class="clr-col-12 clr-form-control clr-row">
        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">Lastname</label>
        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">Doe</span>
    </div>
</form>
`,je=`
<form clrForm [clrLayout]="'horizontal'" class="clr-row">
    <div class="clr-col-6 clr-form-control clr-row">
        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-1">First name</label>
        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">John</span>
    </div>
    <div class="clr-col-6 clr-form-control clr-row">
        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-1">Last name</label>
        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">Doe</span>
    </div>
    <div class="clr-col-6 clr-form-control clr-row">
        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">Email</label>
        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">john.doe@mail.com</span>
    </div>
    <div class="clr-col-6 clr-form-control clr-row">
        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">Phone</label>
        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">1234567890123</span>
    </div>
</form>
`,Ge=`
<form clrForm [clrLayout]="'vertical'">
    <div class="clr-form-control">
        <label class="clr-control-label">First name</label>
        <span>John</span>
    </div>
    <div class="clr-form-control">
        <label class="clr-control-label">Lastname</label>
        <span>Doe</span>
    </div>
</form>
`,Ze=`
<form clrForm [clrLayout]="'vertical'" class="clr-row">
    <div class="clr-form-control clr-col-6">
        <label class="clr-control-label">First name</label>
        <span>John</span>
    </div>
    <div class="clr-form-control clr-col-6">
        <label class="clr-control-label">Lastname</label>
        <span>Doe</span>
    </div>
    <div class="clr-form-control clr-col-6">
        <label class="clr-control-label">Email</label>
        <span>john.doe@mail.com</span>
    </div>
    <div class="clr-form-control clr-col-6">
        <label class="clr-control-label">Phone</label>
        <span>1234567890123</span>
    </div>
</form>
`,Ve=(()=>{class d extends ke{codeExampleFullForm=He;codeExampleFormSubmit=ze;codeExampleFormSubmitBlur=Je;codeExampleFormSubmitGeneral=Ue;codeExampleROHorizontal=Xe;codeExampleROHorizontal2=je;codeExampleROVertical=Ge;codeExampleROVertical2=Ze;inputText;textareaText;passwordText;toggleValue;checkboxValue;date;time;money;radioOption;selectOption;isDisabled;data=new Map;data2=new Map;inputTextSubmit;submittedText;constructor(){super("forms"),this.data.set("EN","english text"),this.data.set("DE","deutscher text"),this.data.set("FR","texte fran\xE7ais"),this.data2.set("EN","english text"),this.data2.set("DE","deutscher text"),this.data2.set("FR","texte fran\xE7ais")}onFormSubmit(){document.activeElement.blur(),this.submittedText=this.inputTextSubmit}static \u0275fac=function(b){return new(b||d)};static \u0275cmp=f({type:d,selectors:[["clr-forms-demo"]],hostVars:4,hostBindings:function(b,o){b&2&&w("content-area",!0)("dox-content-panel",!0)},standalone:!1,features:[M],decls:270,vars:57,consts:[[3,"title"],[1,"component-summary"],["href","https://clarity.design/documentation/forms"],["id","design-guidelines"],[1,"clr-code"],["id","code-examples"],["id","examples"],["clrForm","","clrLayout","horizontal",1,"clr-row"],[1,"clr-col-12"],[1,"clr-col-12","clr-col-sm-4","clr-col-md-3","clr-col-xl-2","clr-required-mark"],["clrInput","","type","text","name","inputName","required","","minlength","5",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModelChange","ngModel","ngModelOptions"],[4,"clrIfError"],["clrTextarea","","name","description","required","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-6",2,"height","100px",3,"ngModelChange","ngModel","ngModelOptions"],[1,"clr-col-12","clr-col-sm-4","clr-col-md-3","clr-col-xl-2"],["clrPassword","","placeholder","Password please!","type","text","name","passwordName",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModelChange","ngModel","ngModelOptions"],["clrSelect","","name","options",1,"clr-col-6","clr-col-sm-3","clr-col-md-2",3,"ngModelChange","ngModel"],["value","one"],["value","two"],["value","three"],[1,"clr-col-6","clr-col-sm-3","clr-col-md-2"],[3,"clrValue"],["type","radio","clrRadio","","name","options","value","1","required","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModelChange","ngModel"],["type","radio","clrRadio","","name","options","value","2","required","",3,"ngModelChange","ngModel"],["type","text","name","date","clrDate","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModelChange","ngModel","ngModelOptions"],["type","time","name","time","clrInput","",1,"time-width",3,"ngModelChange","ngModel","ngModelOptions"],[1,"clr-col-12","clr-row"],["clrDate","","type","text","name","date",1,"clr-col-8",3,"ngModelChange","ngModel","ngModelOptions"],["type","time","name","time","clrTime","",3,"ngModelChange","ngModel","ngModelOptions"],["clrInput","","clrNumeric","","type","text",1,"clr-col-2",3,"clrNumericValueChange","clrNumericValue"],["clrInputSuffix",""],["clrCheckbox","","type","checkbox","name","checkboxName",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModelChange","ngModel"],["type","checkbox","id","toggle","name","toggle","clrToggle","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModelChange","ngModel"],["for","toggle",1,"clr-col-none"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3","name","template",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","ngModelOptions"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-6","name","template2",1,"clr-col-12","clr-row",3,"ngModelChange","ngModel","ngModelOptions","rows"],[3,"clrCode"],["shape","display"],["routerLink","/full-page-layouts/basepage-layout-sub1/forms","routerLinkActive","active"],[1,"nav-text"],["routerLink","/full-page-layouts/basepage-layout-sub1/ves","routerLinkActive","active"],["clrForm","",1,"clr-row",3,"submit"],[1,"clr-col-12","clr-col-sm-4","clr-col-md-3","clr-col-xl-2","clr-col-md-2"],["clrInput","","type","text","name","inputNameSubmit",1,"clr-col-2",3,"ngModelChange","ngModel","ngModelOptions"],["type","submit",2,"display","none"],["clrForm","",1,"clr-row",3,"clrLayout"],[1,"clr-col-12","clr-form-control","clr-row"],[1,"clr-control-label","clr-col-xs-12","clr-col-sm-3","clr-col-lg-1"],[1,"clr-col-xs-12","clr-col-sm-9","clr-col-lg-10"],[1,"clr-col-6","clr-form-control","clr-row"],[1,"clr-control-label","clr-col-xs-12","clr-col-sm-3","clr-col-lg-2"],["clrForm","",3,"clrLayout"],[1,"clr-form-control"],[1,"clr-control-label"],[1,"clr-form-control","clr-col-6"]],template:function(b,o){b&1&&(e(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),t(3,"This describes clarity forms in more detail. Official documentation:"),l(),e(4,"p")(5,"a",2),t(6,"Clarity Forms documentation"),l()(),e(7,"p"),t(8," Find below our recommendation how to use every input component."),p(9,"br"),t(10," Please also check back frequently to get updates of the recommended way. "),l(),e(11,"div",3)(12,"h3"),t(13,"Usage"),l(),e(14,"ul")(15,"li")(16,"strong"),t(17,"Don't mix core (webcomponents) and angular components inside a form, as they have different layout philosophies."),l()(),e(18,"li")(19,"strong"),t(20,"Always use forms."),l(),t(21," Don't display multiple labels and input fields outside of a form."),l(),e(22,"li"),t(23,"When adding subheaders inside a form, use "),e(24,"code",4),t(25,"h4"),l(),t(26," elements."),l(),e(27,"li"),t(28," Control the width of labels and inputs by adding "),e(29,"code",4),t(30,"clr-col-*"),l(),t(31," classes inside the "),e(32,"code",4),t(33,"clr-*-container"),l(),t(34,". "),l(),e(35,"li"),t(36," Forms in a "),e(37,"code",4),t(38,"clr-view-edit-section"),l(),t(39," should also be displayed using the below examples. "),l(),e(40,"li"),t(41," Make your forms responsive. Use the correct "),e(42,"code",4),t(43,"clr-col-*"),l(),t(44," classes to make your forms fit every screen size. "),l(),e(45,"li"),t(46,"Always use 1 column layouts on screen sizes below 768px. (md-breakpoint)"),l()()(),e(47,"div",5)(48,"h3",6),t(49,"Code & Examples"),l(),e(50,"h4"),t(51,"Standard form"),l(),e(52,"form",7)(53,"clr-input-container",8)(54,"label",9),t(55,"Input label"),l(),e(56,"input",10),m("ngModelChange",function(r){return c(o.inputText,r)||(o.inputText=r),r}),l(),e(57,"clr-control-helper"),t(58,"Helper text that shows while it is pristine and valid"),l(),h(59,Ne,2,0,"clr-control-error",11)(60,qe,2,0,"clr-control-error",11),l(),e(61,"clr-textarea-container",8)(62,"label",9),t(63,"Textarea label"),l(),e(64,"textarea",12),m("ngModelChange",function(r){return c(o.textareaText,r)||(o.textareaText=r),r}),l(),h(65,Be,2,0,"clr-control-error",11),l(),e(66,"clr-password-container",8)(67,"label",13),t(68,"Password label"),l(),e(69,"input",14),m("ngModelChange",function(r){return c(o.passwordText,r)||(o.passwordText=r),r}),l()(),e(70,"clr-select-container",8)(71,"label",9),t(72,"Select label"),l(),e(73,"select",15),m("ngModelChange",function(r){return c(o.selectOption,r)||(o.selectOption=r),r}),e(74,"option",16),t(75,"One"),l(),e(76,"option",17),t(77,"Two"),l(),e(78,"option",18),t(79,"Three"),l()()(),e(80,"clr-combobox-container",8)(81,"label",13),t(82,"Combobox label"),l(),e(83,"clr-combobox",19)(84,"clr-options")(85,"clr-option",20),t(86,"Option 1"),l(),e(87,"clr-option",20),t(88,"Option 2"),l(),e(89,"clr-option",20),t(90,"Option 3"),l()()()(),e(91,"clr-radio-container",8)(92,"label",9),t(93,"Radio label"),l(),e(94,"clr-radio-wrapper")(95,"input",21),m("ngModelChange",function(r){return c(o.radioOption,r)||(o.radioOption=r),r}),l(),e(96,"label"),t(97,"Option 1"),l()(),e(98,"clr-radio-wrapper")(99,"input",22),m("ngModelChange",function(r){return c(o.radioOption,r)||(o.radioOption=r),r}),l(),e(100,"label"),t(101,"Option 2"),l()(),e(102,"clr-control-helper"),t(103,"Helper text"),l(),e(104,"clr-control-error"),t(105,"This field is required!"),l()(),e(106,"clr-date-container",8)(107,"label",13),t(108,"Date label"),l(),e(109,"input",23),m("ngModelChange",function(r){return c(o.date,r)||(o.date=r),r}),l()(),e(110,"clr-input-container",8)(111,"label",13),t(112,"Time label"),l(),e(113,"input",24),m("ngModelChange",function(r){return c(o.time,r)||(o.time=r),r}),l()(),e(114,"clr-date-time-container",25)(115,"clr-date-container")(116,"label",13),t(117,"Date & time label"),l(),e(118,"input",26),m("ngModelChange",function(r){return c(o.date,r)||(o.date=r),r}),l()(),e(119,"input",27),m("ngModelChange",function(r){return c(o.time,r)||(o.time=r),r}),l()(),e(120,"clr-input-container",8)(121,"label",13),t(122,"Money label"),l(),e(123,"input",28),m("clrNumericValueChange",function(r){return c(o.money,r)||(o.money=r),r}),l(),e(124,"span",29),t(125,"\u20AC"),l()(),e(126,"clr-checkbox-container",8)(127,"label",13),t(128,"Checkbox label"),l(),e(129,"clr-checkbox-wrapper")(130,"label"),t(131,"Option"),l(),e(132,"input",30),m("ngModelChange",function(r){return c(o.checkboxValue,r)||(o.checkboxValue=r),r}),l()()(),e(133,"clr-toggle-container",8)(134,"label",13),t(135,"Toggle label"),l(),e(136,"clr-toggle-wrapper")(137,"input",31),m("ngModelChange",function(r){return c(o.toggleValue,r)||(o.toggleValue=r),r}),l(),p(138,"label",32),l()(),e(139,"clr-multilingual-input",33),m("ngModelChange",function(r){return c(o.data,r)||(o.data=r),r}),e(140,"label",9),t(141,"Multilingual Input"),l(),e(142,"clr-control-error"),t(143,"Please translate in every language!"),l(),e(144,"clr-control-helper"),t(145,"Helper text"),l()(),e(146,"clr-multilingual-textarea",34),m("ngModelChange",function(r){return c(o.data2,r)||(o.data2=r),r}),e(147,"label",9),t(148,"Multilingual Textarea"),l(),e(149,"clr-control-error"),t(150,"Please translate in every language!"),l(),e(151,"clr-control-helper"),t(152,"Helper text"),l()()(),p(153,"br")(154,"clr-code-snippet",35),e(155,"h4"),t(156,"Demo"),l(),e(157,"div"),p(158,"cds-icon",36),t(159,"\xA0 "),e(160,"a",37)(161,"span",38),t(162,"Full Page Forms Layout"),l()()(),e(163,"div"),p(164,"cds-icon",36),t(165,"\xA0 "),e(166,"a",39)(167,"span",38),t(168,"Full Page View Edit Section Layout"),l()()(),e(169,"h4"),t(170,"Submit form on enter"),l(),e(171,"p"),t(172,"To enable form submit on enter, following prerequisites need to be done:"),l(),e(173,"ul")(174,"li"),t(175," Add hidden submit button to your form to activate 'enter' key handling in browser (only needed if you not already have one) "),l(),e(176,"li"),t(177,"React to submit of form"),l()(),e(178,"form",40),C("submit",function(){return o.onFormSubmit()}),e(179,"clr-input-container",8)(180,"label",41),t(181,"Input label"),l(),e(182,"input",42),m("ngModelChange",function(r){return c(o.inputTextSubmit,r)||(o.inputTextSubmit=r),r}),l()(),p(183,"input",43),l(),t(184),p(185,"clr-code-snippet",35),e(186,"h5"),t(187,"Special case for updateOn: blur"),l(),e(188,"p"),t(189," Hitting the enter key doesn't trigger the blur event, so the form field is not up to date. To overcome this, blur the field manually. "),l(),p(190,"clr-code-snippet",35),e(191,"h4"),t(192,"General form submit pattern"),l(),p(193,"clr-code-snippet",35),e(194,"h4"),t(195,"Read-only fields (horizontal)"),l(),e(196,"form",44)(197,"div",45)(198,"label",46),t(199,"First name"),l(),e(200,"span",47),t(201,"John"),l()(),e(202,"div",45)(203,"label",46),t(204,"Last name"),l(),e(205,"span",47),t(206,"Doe"),l()()(),p(207,"clr-code-snippet",35),e(208,"h4"),t(209,"Read-only fields (horizontal 2 columns)"),l(),e(210,"form",44)(211,"div",48)(212,"label",49),t(213,"First name"),l(),e(214,"span",47),t(215,"John"),l()(),e(216,"div",48)(217,"label",49),t(218,"Last name"),l(),e(219,"span",47),t(220,"Doe"),l()(),e(221,"div",48)(222,"label",49),t(223,"Email"),l(),e(224,"span",47),t(225,"john.doe@mail.com"),l()(),e(226,"div",48)(227,"label",49),t(228,"Phone"),l(),e(229,"span",47),t(230,"1234567890123"),l()()(),p(231,"clr-code-snippet",35),e(232,"h4"),t(233,"Read-only fields (vertical)"),l(),e(234,"form",50)(235,"div",51)(236,"label",52),t(237,"First name"),l(),e(238,"span"),t(239,"John"),l()(),e(240,"div",51)(241,"label",52),t(242,"Lastname"),l(),e(243,"span"),t(244,"Doe"),l()()(),p(245,"clr-code-snippet",35),e(246,"h4"),t(247,"Read-only fields (vertical 2 columns)"),l(),e(248,"form",44)(249,"div",53)(250,"label",52),t(251,"First name"),l(),e(252,"span"),t(253,"John"),l()(),e(254,"div",53)(255,"label",52),t(256,"Lastname"),l(),e(257,"span"),t(258,"Doe"),l()(),e(259,"div",53)(260,"label",52),t(261,"Email"),l(),e(262,"span"),t(263,"john.doe@mail.com"),l()(),e(264,"div",53)(265,"label",52),t(266,"Phone"),l(),e(267,"span"),t(268,"1234567890123"),l()()(),p(269,"clr-code-snippet",35),l()()()),b&2&&(i("title",o.title),n(56),a("ngModel",o.inputText),i("ngModelOptions",u(47,g)),n(3),i("clrIfError","required"),n(),i("clrIfError","minlength"),n(4),a("ngModel",o.textareaText),i("ngModelOptions",u(48,g)),n(),i("clrIfError","required"),n(4),a("ngModel",o.passwordText),i("ngModelOptions",u(49,g)),n(4),a("ngModel",o.selectOption),n(12),i("clrValue","Option 1"),n(2),i("clrValue","Option 2"),n(2),i("clrValue","Option 3"),n(6),a("ngModel",o.radioOption),n(4),a("ngModel",o.radioOption),n(10),a("ngModel",o.date),i("ngModelOptions",u(50,g)),n(4),a("ngModel",o.time),i("ngModelOptions",u(51,g)),n(5),a("ngModel",o.date),i("ngModelOptions",u(52,g)),n(),a("ngModel",o.time),i("ngModelOptions",u(53,g)),n(4),a("clrNumericValue",o.money),n(9),a("ngModel",o.checkboxValue),n(5),a("ngModel",o.toggleValue),n(2),a("ngModel",o.data),i("ngModelOptions",u(54,g)),n(7),a("ngModel",o.data2),i("ngModelOptions",u(55,g))("rows",3),n(8),i("clrCode",o.codeExampleFullForm),n(28),a("ngModel",o.inputTextSubmit),i("ngModelOptions",u(56,g)),n(2),_(" Submitted text (hit enter to submit): ",o.submittedText," "),n(),i("clrCode",o.codeExampleFormSubmit),n(5),i("clrCode",o.codeExampleFormSubmitBlur),n(3),i("clrCode",o.codeExampleFormSubmitGeneral),n(3),i("clrLayout","horizontal"),n(11),i("clrCode",o.codeExampleROHorizontal),n(3),i("clrLayout","horizontal"),n(21),i("clrCode",o.codeExampleROHorizontal2),n(3),i("clrLayout","vertical"),n(11),i("clrCode",o.codeExampleROVertical),n(3),i("clrLayout","vertical"),n(21),i("clrCode",o.codeExampleROVertical2))},dependencies:[R,P,V,F,v,I,k,T,L,A,N,W,D,z,B,K,G,Z,Y,Q,$,ie,ae,ne,ue,se,pe,de,be,ge,xe,le,ee,ye,he,re,oe,te,me,ce,fe,Ee,Fe,Ce,we,Oe,ve,_e,Te,Le,We,Ie,U,X],encapsulation:2})}return d})();var Ml=(()=>{class d{static \u0275fac=function(b){return new(b||d)};static \u0275mod=S({type:d});static \u0275inj=E({imports:[O,q,Me,Se,De,Re,Pe,j.forChild([{path:"",component:Ve}])]})}return d})();export{Ml as FormsDemoModule};
