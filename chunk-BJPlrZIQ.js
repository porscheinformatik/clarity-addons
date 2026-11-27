import{n as P,r as ie,t as O$1}from"./chunk-agnf9ZDH.js";import{$n as T,Ba as j,Bn as Rhe,Bs as w5e,Ei as bS,Er as Vp,Fa as ih,Fs as vh,Gi as dS,Hr as Xe,I as C4,Ia as il,In as R1,Jt as L7,K as D7,Ko as q9,Lt as K4e,Ma as i_,Mo as oi,Ms as v,Mt as Jr,N as Boe,Na as ide,Ns as vS,O as B,Oa as hae,Oi as bi,Pa as ie$1,Pt as K,Ri as cS,St as IS,T as Ai,Ti as bB,Uo as q,Vn as Ri,Vt as Kde,Wa as je,Za as kj,Zo as qj,Zt as Lp,an as N,b as A,bn as PT,br as V4,ca as f4,cc as zR,cn as Nj,d as $,di as _de,dn as O$2,do as mr,ds as t3e,ea as ee,ec as y,en as MB,es as r_,gs as tde,ic as yh,ii as Zn,it as FR,jr as Wj,kn as Q4e,l as _e,la as fS,li as _5e,ln as Nl,lo as me,mr as Ud,no as lS,ns as ri,oi as Zoe,qs as x5e,rs as rt,s as O$3,sa as f,ui as _S,vo as na,xa as gt,xt as IB,yn as P5e,yo as nde,zs as w4}from"./main-MZS5HDZR.js";import{Ha as _7,Jt as Hp,Mn as L7$1,Ra as Zp,Xa as _o,Yc as n8,nt as Dp,rd as wp}from"./chunk-Dj4ysbNo.js";var x=()=>({updateOn:`blur`});function Ze(u,F){u&1&&(y(0,`clr-control-error`),ie$1(1,`Error message about being required`),v())}function Ke(u,F){u&1&&(y(0,`clr-control-error`),ie$1(1,`Error message about requiring 5 characters`),v())}function Qe(u,F){u&1&&(y(0,`clr-control-error`),ie$1(1,`Error message about being required`),v())}me.addIcons(t3e);var Ye=`
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
`;var $e=`
<form ... (submit)="onFormSubmit()">
    ...
    <input type="submit" style="display: none"> <!-- Not needed, if you already have a submit button-->
</form>
`;var el=`
onFormSubmit() {
    (<HTMLElement>document.activeElement).blur();
    ...
}
`;var ll=`
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
`;var tl=`
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
`;var rl=`
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
`;var ol=`
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
`;var nl=`
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
`;var O=(()=>{class u extends P{codeExampleFullForm=Ye;codeExampleFormSubmit=$e;codeExampleFormSubmitBlur=el;codeExampleFormSubmitGeneral=ll;codeExampleROHorizontal=tl;codeExampleROHorizontal2=rl;codeExampleROVertical=ol;codeExampleROVertical2=nl;inputText;textareaText;passwordText;toggleValue;checkboxValue;date;time;money;radioOption;selectOption;isDisabled;data=/* @__PURE__ */ new Map;data2=/* @__PURE__ */ new Map;inputTextSubmit;submittedText;constructor(){super(`forms`),this.data.set(`EN`,`english text`),this.data.set(`DE`,`deutscher text`),this.data.set(`FR`,`texte français`),this.data2.set(`EN`,`english text`),this.data2.set(`DE`,`deutscher text`),this.data2.set(`FR`,`texte français`)}onFormSubmit(){document.activeElement.blur(),this.submittedText=this.inputTextSubmit}static ɵfac=function(h){return new(h||u)};static ɵcmp=O$2({type:u,selectors:[[`clr-forms-demo`]],hostVars:4,hostBindings:function(h,o){h&2&&T(`content-area`,!0)(`dox-content-panel`,!0)},features:[ee],decls:270,vars:57,consts:[[3,`title`],[1,`component-summary`],[`href`,`https://clarity.design/documentation/forms`],[`id`,`design-guidelines`],[1,`clr-code`],[`id`,`code-examples`],[`id`,`examples`],[`clrForm`,``,`clrLayout`,`horizontal`,1,`clr-row`],[1,`clr-col-12`],[1,`clr-col-12`,`clr-col-sm-4`,`clr-col-md-3`,`clr-col-xl-2`,`clr-required-mark`],[`clrInput`,``,`type`,`text`,`name`,`inputName`,`required`,``,`minlength`,`5`,1,`clr-col-6`,`clr-col-md-5`,`clr-col-lg-4`,`clr-col-xl-3`,3,`ngModelChange`,`ngModel`,`ngModelOptions`],[4,`clrIfError`],[`clrTextarea`,``,`name`,`description`,`required`,``,1,`clr-col-6`,`clr-col-md-5`,`clr-col-lg-4`,`clr-col-xl-6`,2,`height`,`100px`,3,`ngModelChange`,`ngModel`,`ngModelOptions`],[1,`clr-col-12`,`clr-col-sm-4`,`clr-col-md-3`,`clr-col-xl-2`],[`clrPassword`,``,`placeholder`,`Password please!`,`type`,`text`,`name`,`passwordName`,1,`clr-col-6`,`clr-col-md-5`,`clr-col-lg-4`,`clr-col-xl-3`,3,`ngModelChange`,`ngModel`,`ngModelOptions`],[`clrSelect`,``,`name`,`options`,1,`clr-col-6`,`clr-col-sm-3`,`clr-col-md-2`,3,`ngModelChange`,`ngModel`],[`value`,`one`],[`value`,`two`],[`value`,`three`],[1,`clr-col-6`,`clr-col-sm-3`,`clr-col-md-2`],[3,`clrValue`],[`type`,`radio`,`clrRadio`,``,`name`,`options`,`value`,`1`,`required`,``,1,`clr-col-6`,`clr-col-md-5`,`clr-col-lg-4`,`clr-col-xl-3`,3,`ngModelChange`,`ngModel`],[`type`,`radio`,`clrRadio`,``,`name`,`options`,`value`,`2`,`required`,``,3,`ngModelChange`,`ngModel`],[`type`,`text`,`name`,`date`,`clrDate`,``,1,`clr-col-6`,`clr-col-md-5`,`clr-col-lg-4`,`clr-col-xl-3`,3,`ngModelChange`,`ngModel`,`ngModelOptions`],[`type`,`time`,`name`,`time`,`clrInput`,``,`clrTime`,``,1,`time-width`,3,`ngModelChange`,`ngModel`,`ngModelOptions`],[1,`clr-col-12`,`clr-row`],[`clrDate`,``,`type`,`text`,`name`,`date`,1,`clr-col-8`,3,`ngModelChange`,`ngModel`,`ngModelOptions`],[`type`,`time`,`name`,`time`,`clrTime`,``,3,`ngModelChange`,`ngModel`,`ngModelOptions`],[`clrInput`,``,`clrNumeric`,``,`type`,`text`,1,`clr-col-2`,3,`clrNumericValueChange`,`clrNumericValue`],[`clrInputSuffix`,``],[`clrCheckbox`,``,`type`,`checkbox`,`name`,`checkboxName`,1,`clr-col-6`,`clr-col-md-5`,`clr-col-lg-4`,`clr-col-xl-3`,3,`ngModelChange`,`ngModel`],[`type`,`checkbox`,`id`,`toggle`,`name`,`toggle`,`clrToggle`,``,1,`clr-col-6`,`clr-col-md-5`,`clr-col-lg-4`,`clr-col-xl-3`,3,`ngModelChange`,`ngModel`],[`for`,`toggle`,1,`clr-col-none`],[`clrSelectedLang`,`EN`,`clrRequiredAllMultilang`,``,`clrControlClasses`,`clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3`,`name`,`template`,1,`clr-col-12`,`clr-row`,3,`ngModelChange`,`ngModel`,`ngModelOptions`],[`clrSelectedLang`,`EN`,`clrRequiredAllMultilang`,``,`clrControlClasses`,`clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-6`,`name`,`template2`,1,`clr-col-12`,`clr-row`,3,`ngModelChange`,`ngModel`,`ngModelOptions`,`rows`],[3,`clrCode`],[`shape`,`display`],[`routerLink`,`/full-page-layouts/basepage-layout-sub1/forms`,`routerLinkActive`,`active`],[1,`nav-text`],[`routerLink`,`/full-page-layouts/basepage-layout-sub1/ves`,`routerLinkActive`,`active`],[`clrForm`,``,1,`clr-row`,3,`submit`],[1,`clr-col-12`,`clr-col-sm-4`,`clr-col-md-3`,`clr-col-xl-2`,`clr-col-md-2`],[`clrInput`,``,`type`,`text`,`name`,`inputNameSubmit`,1,`clr-col-2`,3,`ngModelChange`,`ngModel`,`ngModelOptions`],[`type`,`submit`,2,`display`,`none`],[`clrForm`,``,1,`clr-row`,3,`clrLayout`],[1,`clr-col-12`,`clr-form-control`,`clr-row`],[1,`clr-control-label`,`clr-col-xs-12`,`clr-col-sm-3`,`clr-col-lg-1`],[1,`clr-col-xs-12`,`clr-col-sm-9`,`clr-col-lg-10`],[1,`clr-col-6`,`clr-form-control`,`clr-row`],[1,`clr-control-label`,`clr-col-xs-12`,`clr-col-sm-3`,`clr-col-lg-2`],[`clrForm`,``,3,`clrLayout`],[1,`clr-form-control`],[1,`clr-control-label`],[1,`clr-form-control`,`clr-col-6`]],template:function(h,o){h&1&&(y(0,`clr-doc-wrapper`,0)(1,`article`)(2,`h5`,1),ie$1(3,`This describes clarity forms in more detail. Official documentation:`),v(),y(4,`p`)(5,`a`,2),ie$1(6,`Clarity Forms documentation`),v()(),y(7,`p`),ie$1(8,` Find below our recommendation how to use every input component.`),j(9,`br`),ie$1(10,` Please also check back frequently to get updates of the recommended way. `),v(),y(11,`div`,3)(12,`h3`),ie$1(13,`Usage`),v(),y(14,`ul`)(15,`li`)(16,`strong`),ie$1(17,`Don't mix core (webcomponents) and angular components inside a form, as they have different layout philosophies.`),v()(),y(18,`li`)(19,`strong`),ie$1(20,`Always use forms.`),v(),ie$1(21,` Don't display multiple labels and input fields outside of a form.`),v(),y(22,`li`),ie$1(23,`When adding subheaders inside a form, use `),y(24,`code`,4),ie$1(25,`h4`),v(),ie$1(26,` elements.`),v(),y(27,`li`),ie$1(28,` Control the width of labels and inputs by adding `),y(29,`code`,4),ie$1(30,`clr-col-*`),v(),ie$1(31,` classes inside the `),y(32,`code`,4),ie$1(33,`clr-*-container`),v(),ie$1(34,`. `),v(),y(35,`li`),ie$1(36,` Forms in a `),y(37,`code`,4),ie$1(38,`clr-view-edit-section`),v(),ie$1(39,` should also be displayed using the below examples. `),v(),y(40,`li`),ie$1(41,` Make your forms responsive. Use the correct `),y(42,`code`,4),ie$1(43,`clr-col-*`),v(),ie$1(44,` classes to make your forms fit every screen size. `),v(),y(45,`li`),ie$1(46,`Always use 1 column layouts on screen sizes below 768px. (md-breakpoint)`),v()()(),y(47,`div`,5)(48,`h3`,6),ie$1(49,`Code & Examples`),v(),y(50,`h4`),ie$1(51,`Standard form`),v(),y(52,`form`,7)(53,`clr-input-container`,8)(54,`label`,9),ie$1(55,`Input label`),v(),y(56,`input`,10),Ai(),oi(`ngModelChange`,function(r){return bi(o.inputText,r)||(o.inputText=r),r}),v(),y(57,`clr-control-helper`),ie$1(58,`Helper text that shows while it is pristine and valid`),v(),je(59,Ze,2,0,`clr-control-error`,11)(60,Ke,2,0,`clr-control-error`,11),v(),y(61,`clr-textarea-container`,8)(62,`label`,9),ie$1(63,`Textarea label`),v(),y(64,`textarea`,12),Ai(),oi(`ngModelChange`,function(r){return bi(o.textareaText,r)||(o.textareaText=r),r}),v(),je(65,Qe,2,0,`clr-control-error`,11),v(),y(66,`clr-password-container`,8)(67,`label`,13),ie$1(68,`Password label`),v(),y(69,`input`,14),Ai(),oi(`ngModelChange`,function(r){return bi(o.passwordText,r)||(o.passwordText=r),r}),v()(),y(70,`clr-select-container`,8)(71,`label`,9),ie$1(72,`Select label`),v(),y(73,`select`,15),Ai(),oi(`ngModelChange`,function(r){return bi(o.selectOption,r)||(o.selectOption=r),r}),y(74,`option`,16),ie$1(75,`One`),v(),y(76,`option`,17),ie$1(77,`Two`),v(),y(78,`option`,18),ie$1(79,`Three`),v()()(),y(80,`clr-combobox-container`,8)(81,`label`,13),ie$1(82,`Combobox label`),v(),y(83,`clr-combobox`,19)(84,`clr-options`)(85,`clr-option`,20),ie$1(86,`Option 1`),v(),y(87,`clr-option`,20),ie$1(88,`Option 2`),v(),y(89,`clr-option`,20),ie$1(90,`Option 3`),v()()()(),y(91,`clr-radio-container`,8)(92,`label`,9),ie$1(93,`Radio label`),v(),y(94,`clr-radio-wrapper`)(95,`input`,21),Ai(),oi(`ngModelChange`,function(r){return bi(o.radioOption,r)||(o.radioOption=r),r}),v(),y(96,`label`),ie$1(97,`Option 1`),v()(),y(98,`clr-radio-wrapper`)(99,`input`,22),Ai(),oi(`ngModelChange`,function(r){return bi(o.radioOption,r)||(o.radioOption=r),r}),v(),y(100,`label`),ie$1(101,`Option 2`),v()(),y(102,`clr-control-helper`),ie$1(103,`Helper text`),v(),y(104,`clr-control-error`),ie$1(105,`This field is required!`),v()(),y(106,`clr-date-container`,8)(107,`label`,13),ie$1(108,`Date label`),v(),y(109,`input`,23),Ai(),oi(`ngModelChange`,function(r){return bi(o.date,r)||(o.date=r),r}),v()(),y(110,`clr-input-container`,8)(111,`label`,13),ie$1(112,`Time label`),v(),y(113,`input`,24),Ai(),oi(`ngModelChange`,function(r){return bi(o.time,r)||(o.time=r),r}),v()(),y(114,`clr-date-time-container`,25)(115,`clr-date-container`)(116,`label`,13),ie$1(117,`Date & time label`),v(),y(118,`input`,26),Ai(),oi(`ngModelChange`,function(r){return bi(o.date,r)||(o.date=r),r}),v()(),y(119,`input`,27),Ai(),oi(`ngModelChange`,function(r){return bi(o.time,r)||(o.time=r),r}),v()(),y(120,`clr-input-container`,8)(121,`label`,13),ie$1(122,`Money label`),v(),y(123,`input`,28),oi(`clrNumericValueChange`,function(r){return bi(o.money,r)||(o.money=r),r}),v(),y(124,`span`,29),ie$1(125,`€`),v()(),y(126,`clr-checkbox-container`,8)(127,`label`,13),ie$1(128,`Checkbox label`),v(),y(129,`clr-checkbox-wrapper`)(130,`label`),ie$1(131,`Option`),v(),y(132,`input`,30),Ai(),oi(`ngModelChange`,function(r){return bi(o.checkboxValue,r)||(o.checkboxValue=r),r}),v()()(),y(133,`clr-toggle-container`,8)(134,`label`,13),ie$1(135,`Toggle label`),v(),y(136,`clr-toggle-wrapper`)(137,`input`,31),Ai(),oi(`ngModelChange`,function(r){return bi(o.toggleValue,r)||(o.toggleValue=r),r}),v(),j(138,`label`,32),v()(),y(139,`clr-multilingual-input`,33),Ai(),oi(`ngModelChange`,function(r){return bi(o.data,r)||(o.data=r),r}),y(140,`label`,9),ie$1(141,`Multilingual Input`),v(),y(142,`clr-control-error`),ie$1(143,`Please translate in every language!`),v(),y(144,`clr-control-helper`),ie$1(145,`Helper text`),v()(),y(146,`clr-multilingual-textarea`,34),Ai(),oi(`ngModelChange`,function(r){return bi(o.data2,r)||(o.data2=r),r}),y(147,`label`,9),ie$1(148,`Multilingual Textarea`),v(),y(149,`clr-control-error`),ie$1(150,`Please translate in every language!`),v(),y(151,`clr-control-helper`),ie$1(152,`Helper text`),v()()(),j(153,`br`)(154,`clr-code-snippet`,35),y(155,`h4`),ie$1(156,`Demo`),v(),y(157,`div`),j(158,`cds-icon`,36),ie$1(159,`\xA0 `),y(160,`a`,37)(161,`span`,38),ie$1(162,`Full Page Forms Layout`),v()()(),y(163,`div`),j(164,`cds-icon`,36),ie$1(165,`\xA0 `),y(166,`a`,39)(167,`span`,38),ie$1(168,`Full Page View Edit Section Layout`),v()()(),y(169,`h4`),ie$1(170,`Submit form on enter`),v(),y(171,`p`),ie$1(172,`To enable form submit on enter, following prerequisites need to be done:`),v(),y(173,`ul`)(174,`li`),ie$1(175,` Add hidden submit button to your form to activate 'enter' key handling in browser (only needed if you not already have one) `),v(),y(176,`li`),ie$1(177,`React to submit of form`),v()(),y(178,`form`,40),N(`submit`,function(){return o.onFormSubmit()}),y(179,`clr-input-container`,8)(180,`label`,41),ie$1(181,`Input label`),v(),y(182,`input`,42),Ai(),oi(`ngModelChange`,function(r){return bi(o.inputTextSubmit,r)||(o.inputTextSubmit=r),r}),v()(),j(183,`input`,43),v(),ie$1(184),j(185,`clr-code-snippet`,35),y(186,`h5`),ie$1(187,`Special case for updateOn: blur`),v(),y(188,`p`),ie$1(189,` Hitting the enter key doesn't trigger the blur event, so the form field is not up to date. To overcome this, blur the field manually. `),v(),j(190,`clr-code-snippet`,35),y(191,`h4`),ie$1(192,`General form submit pattern`),v(),j(193,`clr-code-snippet`,35),y(194,`h4`),ie$1(195,`Read-only fields (horizontal)`),v(),y(196,`form`,44)(197,`div`,45)(198,`label`,46),ie$1(199,`First name`),v(),y(200,`span`,47),ie$1(201,`John`),v()(),y(202,`div`,45)(203,`label`,46),ie$1(204,`Last name`),v(),y(205,`span`,47),ie$1(206,`Doe`),v()()(),j(207,`clr-code-snippet`,35),y(208,`h4`),ie$1(209,`Read-only fields (horizontal 2 columns)`),v(),y(210,`form`,44)(211,`div`,48)(212,`label`,49),ie$1(213,`First name`),v(),y(214,`span`,47),ie$1(215,`John`),v()(),y(216,`div`,48)(217,`label`,49),ie$1(218,`Last name`),v(),y(219,`span`,47),ie$1(220,`Doe`),v()(),y(221,`div`,48)(222,`label`,49),ie$1(223,`Email`),v(),y(224,`span`,47),ie$1(225,`john.doe@mail.com`),v()(),y(226,`div`,48)(227,`label`,49),ie$1(228,`Phone`),v(),y(229,`span`,47),ie$1(230,`1234567890123`),v()()(),j(231,`clr-code-snippet`,35),y(232,`h4`),ie$1(233,`Read-only fields (vertical)`),v(),y(234,`form`,50)(235,`div`,51)(236,`label`,52),ie$1(237,`First name`),v(),y(238,`span`),ie$1(239,`John`),v()(),y(240,`div`,51)(241,`label`,52),ie$1(242,`Lastname`),v(),y(243,`span`),ie$1(244,`Doe`),v()()(),j(245,`clr-code-snippet`,35),y(246,`h4`),ie$1(247,`Read-only fields (vertical 2 columns)`),v(),y(248,`form`,44)(249,`div`,53)(250,`label`,52),ie$1(251,`First name`),v(),y(252,`span`),ie$1(253,`John`),v()(),y(254,`div`,53)(255,`label`,52),ie$1(256,`Lastname`),v(),y(257,`span`),ie$1(258,`Doe`),v()(),y(259,`div`,53)(260,`label`,52),ie$1(261,`Email`),v(),y(262,`span`),ie$1(263,`john.doe@mail.com`),v()(),y(264,`div`,53)(265,`label`,52),ie$1(266,`Phone`),v(),y(267,`span`),ie$1(268,`1234567890123`),v()()(),j(269,`clr-code-snippet`,35),v()()()),h&2&&(A(`title`,o.title),f(56),ri(`ngModel`,o.inputText),A(`ngModelOptions`,PT(47,x)),Ri(),f(3),A(`clrIfError`,`required`),f(),A(`clrIfError`,`minlength`),f(4),ri(`ngModel`,o.textareaText),A(`ngModelOptions`,PT(48,x)),Ri(),f(),A(`clrIfError`,`required`),f(4),ri(`ngModel`,o.passwordText),A(`ngModelOptions`,PT(49,x)),Ri(),f(4),ri(`ngModel`,o.selectOption),Ri(),f(12),A(`clrValue`,`Option 1`),f(2),A(`clrValue`,`Option 2`),f(2),A(`clrValue`,`Option 3`),f(6),ri(`ngModel`,o.radioOption),Ri(),f(4),ri(`ngModel`,o.radioOption),Ri(),f(10),ri(`ngModel`,o.date),A(`ngModelOptions`,PT(50,x)),Ri(),f(4),ri(`ngModel`,o.time),A(`ngModelOptions`,PT(51,x)),Ri(),f(5),ri(`ngModel`,o.date),A(`ngModelOptions`,PT(52,x)),Ri(),f(),ri(`ngModel`,o.time),A(`ngModelOptions`,PT(53,x)),Ri(),f(4),ri(`clrNumericValue`,o.money),f(9),ri(`ngModel`,o.checkboxValue),Ri(),f(5),ri(`ngModel`,o.toggleValue),Ri(),f(2),ri(`ngModel`,o.data),A(`ngModelOptions`,PT(54,x)),Ri(),f(7),ri(`ngModel`,o.data2),A(`ngModelOptions`,PT(55,x))(`rows`,3),Ri(),f(8),A(`clrCode`,o.codeExampleFullForm),f(28),ri(`ngModel`,o.inputTextSubmit),A(`ngModelOptions`,PT(56,x)),Ri(),f(2),gt(` Submitted text (hit enter to submit): `,o.submittedText,` `),f(),A(`clrCode`,o.codeExampleFormSubmit),f(5),A(`clrCode`,o.codeExampleFormSubmitBlur),f(3),A(`clrCode`,o.codeExampleFormSubmitGeneral),f(3),A(`clrLayout`,`horizontal`),f(11),A(`clrCode`,o.codeExampleROHorizontal),f(3),A(`clrLayout`,`horizontal`),f(21),A(`clrCode`,o.codeExampleROHorizontal2),f(3),A(`clrLayout`,`vertical`),f(11),A(`clrCode`,o.codeExampleROVertical),f(3),A(`clrLayout`,`vertical`),f(21),A(`clrCode`,o.codeExampleROVertical2))},dependencies:[O$1,Zn,Boe,i_,r_,Jr,il,q9,L7,mr,Zoe,D7,FR,R1,zR,rt,Xe,Nj,kj,nde,tde,ide,q,na,dS,ih,_o,n8,_S,P5e,IB,bS,_5e,bB,w4,x5e,MB,cS,Kde,lS,qj,Wj,V4,yh,w5e,vh,vS,Q4e,fS,K4e,_7,L7$1,Dp,f4,Nl,_de,C4,Hp,wp,Zp,O$3,Ud,Vp,K,Rhe,hae,IS,_e,ie],encapsulation:2,changeDetection:1})}return u})();var Pl=(()=>{class u{static ɵfac=function(h){return new(h||u)};static ɵmod=$({type:u});static ɵinj=B({imports:[K,Zn,Rhe,IS,_e,ie,Lp.forChild([{path:``,component:O}]),O]})}return u})();export{Pl as FormsDemoModule};