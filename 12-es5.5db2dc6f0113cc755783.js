!function(){function l(l,c){if(!(l instanceof c))throw new TypeError("Cannot call a class as a function")}function c(l,c){for(var e=0;e<c.length;e++){var r=c[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(l,r.key,r)}}function e(l,c){return(e=Object.setPrototypeOf||function(l,c){return l.__proto__=c,l})(l,c)}function r(l){var c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(l){return!1}}();return function(){var e,r=n(l);if(c){var t=n(this).constructor;e=Reflect.construct(r,arguments,t)}else e=r.apply(this,arguments);return o(this,e)}}function o(l,c){return!c||"object"!=typeof c&&"function"!=typeof c?function(l){if(void 0===l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l}(l):c}function n(l){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(l){return l.__proto__||Object.getPrototypeOf(l)})(l)}(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{"H8/O":function(o,n,t){"use strict";t.r(n),t.d(n,"FormsDemoModule",function(){return w});var a=t("ofXK"),i=t("3Pt+"),b=t("tyNb"),s=t("8MG2"),d=t("6Y1o"),u=t("XPsC"),p=t("JsA7"),m=t("N+3j"),g=t("fXoL"),O=t("0G9f"),h=t("vAyd");function f(l,c){1&l&&(g.Pb(0,"clr-control-error"),g.Ac(1,"Error message about being required"),g.Ob())}function P(l,c){1&l&&(g.Pb(0,"clr-control-error"),g.Ac(1,"Error message about requiring 5 characters "),g.Ob())}function x(l,c){1&l&&(g.Pb(0,"clr-control-error"),g.Ac(1,"Error message about being required"),g.Ob())}var y,M,A=function(){return{updateOn:"blur"}},v=((M=function(o){!function(l,c){if("function"!=typeof c&&null!==c)throw new TypeError("Super expression must either be null or a function");l.prototype=Object.create(c&&c.prototype,{constructor:{value:l,writable:!0,configurable:!0}}),c&&e(l,c)}(b,o);var n,t,a,i=r(b);function b(){var c;return l(this,b),(c=i.call(this,"forms")).codeExampleFullForm='\n<form clrForm clrLayout="horizontal" class="clr-row">\n    <clr-input-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Input label</label>\n        <input clrInput class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" type="text"\n               [(ngModel)]="inputText" [ngModelOptions]="{ updateOn: \'blur\' }"\n               name="inputName" required minlength="5"/>\n        <clr-control-helper>Helper text that shows while it is pristine and valid</clr-control-helper>\n        <clr-control-error *clrIfError="\'required\'">Error message about being required</clr-control-error>\n        <clr-control-error *clrIfError="\'minlength\'">Error message about requiring 5 characters\n        </clr-control-error>\n    </clr-input-container>\n    <clr-textarea-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Textarea label</label>\n        <textarea clrTextarea class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                  [(ngModel)]="textareaText" [ngModelOptions]="{ updateOn: \'blur\' }"\n                  name="description" required></textarea>\n        <clr-control-error *clrIfError="\'required\'">Error message about being required</clr-control-error>\n    </clr-textarea-container>\n    <clr-password-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Password label</label>\n        <input clrPassword class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n               placeholder="Password please!" type="text"\n               [(ngModel)]="passwordText" [ngModelOptions]="{ updateOn: \'blur\' }" name="passwordName"/>\n    </clr-password-container>\n    <clr-select-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Select label</label>\n        <select clrSelect class="clr-col-6 clr-col-sm-3 clr-col-md-2" name="options"\n                [(ngModel)]="selectOption">\n            <option value="one">One</option>\n            <option value="two">Two</option>\n            <option value="three">Three</option>\n        </select>\n    </clr-select-container>\n    <clr-combobox-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Combobox label</label>\n        <clr-combobox>\n            <clr-options>\n                <clr-option [clrValue]="\'Option 1\'">Option 1</clr-option>\n                <clr-option [clrValue]="\'Option 2\'">Option 2</clr-option>\n                <clr-option [clrValue]="\'Option 3\'">Option 3</clr-option>\n            </clr-options>\n        </clr-combobox>\n    </clr-combobox-container>\n    <clr-radio-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Radio label</label>\n        <clr-radio-wrapper>\n            <input type="radio" class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" \n                clrRadio name="options" value="1" required [(ngModel)]="radioOption"/>\n            <label>Option 1</label>\n        </clr-radio-wrapper>\n        <clr-radio-wrapper>\n            <input type="radio" clrRadio name="options" value="2" required [(ngModel)]="radioOption"/>\n            <label>Option 2</label>\n        </clr-radio-wrapper>\n        <clr-control-helper>Helper text</clr-control-helper>\n        <clr-control-error>This field is required!</clr-control-error>\n    </clr-radio-container>\n    <clr-date-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Date label</label>\n        <input class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" type="text" [(ngModel)]="date"\n               [ngModelOptions]="{ updateOn: \'blur\' }" name="date" clrDate>\n    </clr-date-container>\n    <clr-input-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Time label</label>\n        <input class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" type="time" [(ngModel)]="time"\n               [ngModelOptions]="{ updateOn: \'blur\' }" name="time" clrInput>\n    </clr-input-container>\n    <clr-date-time-container class="clr-col-12 clr-row">\n        <clr-date-container>\n            <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Date & time label</label>\n            <input class="clr-col-8" clrDate type="text" [(ngModel)]="date"\n                   [ngModelOptions]="{ updateOn: \'blur\' }" name="date">\n        </clr-date-container>\n        <input type="time" [(ngModel)]="time" [ngModelOptions]="{ updateOn: \'blur\' }" name="time" clrTime>\n    </clr-date-time-container>\n    <clr-input-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Money label</label>\n        <input class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" clrInput clrNumeric\n               class="clr-col-2" type="text" [(clrNumericValue)]="money" clrUnit="\u20ac"/>\n    </clr-input-container>\n    <clr-checkbox-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Checkbox label</label>\n        <clr-checkbox-wrapper>\n            <label>Option</label>\n            <input clrCheckbox class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                type="checkbox" [(ngModel)]="checkboxValue" name="checkboxName"/>\n        </clr-checkbox-wrapper>\n    </clr-checkbox-container>\n    <clr-toggle-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Toggle label</label>\n        <clr-toggle-wrapper>\n            <input type="checkbox" class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                id="toggle" name="toggle" [(ngModel)]="toggleValue" clrToggle/>\n            <label for="toggle" class="clr-col-none"></label>\n        </clr-toggle-wrapper>\n    </clr-toggle-container>\n    <clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data"\n                            [ngModelOptions]="{ updateOn: \'blur\' }"\n                            clrRequiredAllMultilang\n                            clrControlClasses="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                            name="template">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Multilingual Input</label>\n        <clr-control-error>Please translate in every language!</clr-control-error>\n        <clr-control-helper>Helper text</clr-control-helper>\n    </clr-multilingual-input>\n    <clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data2"\n                               [ngModelOptions]="{ updateOn: \'blur\' }"\n                               clrRequiredAllMultilang\n                               clrControlClasses="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                               name="template2">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Multilingual Input</label>\n        <clr-control-error>Please translate in every language!</clr-control-error>\n        <clr-control-helper>Helper text</clr-control-helper>\n    </clr-multilingual-textarea>\n</form>\n',c.codeExampleFormSubmit='\n<form ... (submit)="onFormSubmit()">\n    ...\n    <input type="submit" style="display: none"> \x3c!-- Not needed, if you already have a submit button--\x3e\n</form>\n',c.codeExampleFormSubmitBlur="\nonFormSubmit() {\n    (<HTMLElement>document.activeElement).blur();\n    ...\n}\n",c.codeExampleFormSubmitGeneral="\n@ViewChild(ClrForm, { static: true }) clrForm: ClrForm;\n\nonFormSubmit() {\n    (<HTMLElement>document.activeElement).blur(); // to correctly handle invalid inputs when hitting enter\n    this.form.updateValueAndValidity(); // form is the instance to the FormGroup (reactive) or ngForm (template)\n\n    if (this.form.valid) {\n      // save the form\n    } else {\n      this.clrForm.markAsTouched(); // to show validation errors for not-touched fields\n    }\n}\n",c.codeExampleROHorizontal='\n<form clrForm [clrLayout]="\'horizontal\'" class="clr-row">\n    <div class="clr-col-12 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">First name</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">John</span>\n    </div>\n\n    <div class="clr-col-12 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">Lastname</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">Doe</span>\n    </div>\n</form>\n',c.codeExampleROHorizontal2='\n<form clrForm [clrLayout]="\'horizontal\'" class="clr-row">\n    <div class="clr-col-6 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-1">First name</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">John</span>\n    </div>\n    <div class="clr-col-6 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-1">Last name</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">Doe</span>\n    </div>\n    <div class="clr-col-6 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">Email</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">john.doe@mail.com</span>\n    </div>\n    <div class="clr-col-6 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">Phone</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">1234567890123</span>\n    </div>\n</form>\n',c.codeExampleROVertical='\n<form clrForm [clrLayout]="\'vertical\'">\n    <div class="clr-form-control">\n        <label class="clr-control-label">First name</label>\n        <span>John</span>\n    </div>\n    <div class="clr-form-control">\n        <label class="clr-control-label">Lastname</label>\n        <span>Doe</span>\n    </div>\n</form>\n',c.codeExampleROVertical2='\n<form clrForm [clrLayout]="\'vertical\'" class="clr-row">\n    <div class="clr-form-control clr-col-6">\n        <label class="clr-control-label">First name</label>\n        <span>John</span>\n    </div>\n    <div class="clr-form-control clr-col-6">\n        <label class="clr-control-label">Lastname</label>\n        <span>Doe</span>\n    </div>\n    <div class="clr-form-control clr-col-6">\n        <label class="clr-control-label">Email</label>\n        <span>john.doe@mail.com</span>\n    </div>\n    <div class="clr-form-control clr-col-6">\n        <label class="clr-control-label">Phone</label>\n        <span>1234567890123</span>\n    </div>\n</form>\n',c.data=new Map,c.data2=new Map,c.data.set("EN","english text"),c.data.set("DE","deutscher text"),c.data.set("FR","texte fran\xe7ais"),c.data2.set("EN","english text"),c.data2.set("DE","deutscher text"),c.data2.set("FR","texte fran\xe7ais"),c}return n=b,(t=[{key:"onFormSubmit",value:function(){document.activeElement.blur(),this.submittedText=this.inputTextSubmit}}])&&c(n.prototype,t),a&&c(n,a),b}(m.a)).\u0275fac=function(l){return new(l||M)},M.\u0275cmp=g.Db({type:M,selectors:[["clr-forms-demo"]],hostVars:4,hostBindings:function(l,c){2&l&&g.Bb("content-area",!0)("dox-content-panel",!0)},features:[g.vb],decls:267,vars:56,consts:[[3,"title"],[1,"component-summary"],["href","https://clarity.design/documentation/forms"],["id","design-guidelines"],[1,"clr-code"],["id","code-examples"],["id","examples"],["clrForm","","clrLayout","horizontal",1,"clr-row"],[1,"clr-col-12"],[1,"clr-col-12","clr-col-sm-4","clr-col-md-3","clr-col-xl-2","required"],["clrInput","","type","text","name","inputName","required","","minlength","5",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelOptions","ngModelChange"],[4,"clrIfError"],["clrTextarea","","name","description","required","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelOptions","ngModelChange"],[1,"clr-col-12","clr-col-sm-4","clr-col-md-3","clr-col-xl-2"],["clrPassword","","placeholder","Password please!","type","text","name","passwordName",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelOptions","ngModelChange"],["clrSelect","","name","options",1,"clr-col-6","clr-col-sm-3","clr-col-md-2",3,"ngModel","ngModelChange"],["value","one"],["value","two"],["value","three"],[3,"clrValue"],["type","radio","clrRadio","","name","options","value","1","required","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelChange"],["type","radio","clrRadio","","name","options","value","2","required","",3,"ngModel","ngModelChange"],["type","text","name","date","clrDate","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelOptions","ngModelChange"],["type","time","name","time","clrInput","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelOptions","ngModelChange"],[1,"clr-col-12","clr-row"],["clrDate","","type","text","name","date",1,"clr-col-8",3,"ngModel","ngModelOptions","ngModelChange"],["type","time","name","time","clrTime","",3,"ngModel","ngModelOptions","ngModelChange"],["clrInput","","clrNumeric","","type","text","clrUnit","\u20ac",1,"clr-col-2",3,"clrNumericValue","clrNumericValueChange"],["clrCheckbox","","type","checkbox","name","checkboxName",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelChange"],["type","checkbox","id","toggle","name","toggle","clrToggle","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelChange"],["for","toggle",1,"clr-col-none"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3","name","template",1,"clr-col-12","clr-row",3,"ngModel","ngModelOptions","ngModelChange"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3","name","template2",1,"clr-col-12","clr-row",3,"ngModel","ngModelOptions","ngModelChange"],[3,"clrCode"],["shape","display"],["routerLink","/full-page-layouts/basepage-layout-sub1/forms","routerLinkActive","active",1,"nav-link"],[1,"nav-text"],["routerLink","/full-page-layouts/basepage-layout-sub1/ves","routerLinkActive","active",1,"nav-link"],["clrForm","",1,"clr-row",3,"submit"],[1,"clr-col-12","clr-col-sm-4","clr-col-md-3","clr-col-xl-2","clr-col-md-2"],["clrInput","","type","text","name","inputNameSubmit",1,"clr-col-2",3,"ngModel","ngModelOptions","ngModelChange"],["type","submit",2,"display","none"],["clrForm","",1,"clr-row",3,"clrLayout"],[1,"clr-col-12","clr-form-control","clr-row"],[1,"clr-control-label","clr-col-xs-12","clr-col-sm-3","clr-col-lg-1"],[1,"clr-col-xs-12","clr-col-sm-9","clr-col-lg-10"],[1,"clr-col-6","clr-form-control","clr-row"],[1,"clr-control-label","clr-col-xs-12","clr-col-sm-3","clr-col-lg-2"],["clrForm","",3,"clrLayout"],[1,"clr-form-control"],[1,"clr-control-label"],[1,"clr-form-control","clr-col-6"]],template:function(l,c){1&l&&(g.Pb(0,"clr-doc-wrapper",0),g.Pb(1,"article"),g.Pb(2,"h5",1),g.Ac(3,"This describes clarity forms in more detail. Official documentation: "),g.Pb(4,"a",2),g.Ac(5,"Clarity Forms documentation"),g.Ob(),g.Ob(),g.Pb(6,"p"),g.Ac(7,"Find below our recommendation how to use every input component."),g.Kb(8,"br"),g.Ac(9," Please also check back frequently to get updates of the recommended way."),g.Ob(),g.Pb(10,"div",3),g.Pb(11,"h3"),g.Ac(12,"Usage"),g.Ob(),g.Pb(13,"ul"),g.Pb(14,"li"),g.Pb(15,"strong"),g.Ac(16,"Don't mix core (webcomponents) and angular components inside a form, as they have different layout philosophies."),g.Ob(),g.Ob(),g.Pb(17,"li"),g.Pb(18,"strong"),g.Ac(19,"Always use forms."),g.Ob(),g.Ac(20," Don't display multiple labels and input fields outside of a form."),g.Ob(),g.Pb(21,"li"),g.Ac(22,"When adding subheaders inside a form, use "),g.Pb(23,"code",4),g.Ac(24,"h4"),g.Ob(),g.Ac(25," elements."),g.Ob(),g.Pb(26,"li"),g.Ac(27,"Control the width of labels and inputs by adding "),g.Pb(28,"code",4),g.Ac(29,"clr-col-*"),g.Ob(),g.Ac(30," classes inside the "),g.Pb(31,"code",4),g.Ac(32,"clr-*-container"),g.Ob(),g.Ac(33,". "),g.Ob(),g.Pb(34,"li"),g.Ac(35,"Forms in a "),g.Pb(36,"code",4),g.Ac(37,"clr-view-edit-section"),g.Ob(),g.Ac(38," should also be displayed using the below examples. "),g.Ob(),g.Pb(39,"li"),g.Ac(40,"Make your forms responsive. Use the correct "),g.Pb(41,"code",4),g.Ac(42,"clr-col-*"),g.Ob(),g.Ac(43," classes to make your forms fit every screen size. "),g.Ob(),g.Pb(44,"li"),g.Ac(45,"Always use 1 column layouts on screen sizes below 768px. (md-breakpoint)"),g.Ob(),g.Ob(),g.Ob(),g.Pb(46,"div",5),g.Pb(47,"h3",6),g.Ac(48,"Code & Examples"),g.Ob(),g.Pb(49,"h4"),g.Ac(50,"Standard form"),g.Ob(),g.Pb(51,"form",7),g.Pb(52,"clr-input-container",8),g.Pb(53,"label",9),g.Ac(54,"Input label"),g.Ob(),g.Pb(55,"input",10),g.Wb("ngModelChange",function(l){return c.inputText=l}),g.Ob(),g.Pb(56,"clr-control-helper"),g.Ac(57,"Helper text that shows while it is pristine and valid"),g.Ob(),g.yc(58,f,2,0,"clr-control-error",11),g.yc(59,P,2,0,"clr-control-error",11),g.Ob(),g.Pb(60,"clr-textarea-container",8),g.Pb(61,"label",9),g.Ac(62,"Textarea label"),g.Ob(),g.Pb(63,"textarea",12),g.Wb("ngModelChange",function(l){return c.textareaText=l}),g.Ob(),g.yc(64,x,2,0,"clr-control-error",11),g.Ob(),g.Pb(65,"clr-password-container",8),g.Pb(66,"label",13),g.Ac(67,"Password label"),g.Ob(),g.Pb(68,"input",14),g.Wb("ngModelChange",function(l){return c.passwordText=l}),g.Ob(),g.Ob(),g.Pb(69,"clr-select-container",8),g.Pb(70,"label",9),g.Ac(71,"Select label"),g.Ob(),g.Pb(72,"select",15),g.Wb("ngModelChange",function(l){return c.selectOption=l}),g.Pb(73,"option",16),g.Ac(74,"One"),g.Ob(),g.Pb(75,"option",17),g.Ac(76,"Two"),g.Ob(),g.Pb(77,"option",18),g.Ac(78,"Three"),g.Ob(),g.Ob(),g.Ob(),g.Pb(79,"clr-combobox-container",8),g.Pb(80,"label",13),g.Ac(81,"Combobox label"),g.Ob(),g.Pb(82,"clr-combobox"),g.Pb(83,"clr-options"),g.Pb(84,"clr-option",19),g.Ac(85,"Option 1"),g.Ob(),g.Pb(86,"clr-option",19),g.Ac(87,"Option 2"),g.Ob(),g.Pb(88,"clr-option",19),g.Ac(89,"Option 3"),g.Ob(),g.Ob(),g.Ob(),g.Ob(),g.Pb(90,"clr-radio-container",8),g.Pb(91,"label",9),g.Ac(92,"Radio label"),g.Ob(),g.Pb(93,"clr-radio-wrapper"),g.Pb(94,"input",20),g.Wb("ngModelChange",function(l){return c.radioOption=l}),g.Ob(),g.Pb(95,"label"),g.Ac(96,"Option 1"),g.Ob(),g.Ob(),g.Pb(97,"clr-radio-wrapper"),g.Pb(98,"input",21),g.Wb("ngModelChange",function(l){return c.radioOption=l}),g.Ob(),g.Pb(99,"label"),g.Ac(100,"Option 2"),g.Ob(),g.Ob(),g.Pb(101,"clr-control-helper"),g.Ac(102,"Helper text"),g.Ob(),g.Pb(103,"clr-control-error"),g.Ac(104,"This field is required!"),g.Ob(),g.Ob(),g.Pb(105,"clr-date-container",8),g.Pb(106,"label",13),g.Ac(107,"Date label"),g.Ob(),g.Pb(108,"input",22),g.Wb("ngModelChange",function(l){return c.date=l}),g.Ob(),g.Ob(),g.Pb(109,"clr-input-container",8),g.Pb(110,"label",13),g.Ac(111,"Time label"),g.Ob(),g.Pb(112,"input",23),g.Wb("ngModelChange",function(l){return c.time=l}),g.Ob(),g.Ob(),g.Pb(113,"clr-date-time-container",24),g.Pb(114,"clr-date-container"),g.Pb(115,"label",13),g.Ac(116,"Date & time label"),g.Ob(),g.Pb(117,"input",25),g.Wb("ngModelChange",function(l){return c.date=l}),g.Ob(),g.Ob(),g.Pb(118,"input",26),g.Wb("ngModelChange",function(l){return c.time=l}),g.Ob(),g.Ob(),g.Pb(119,"clr-input-container",8),g.Pb(120,"label",13),g.Ac(121,"Money label"),g.Ob(),g.Pb(122,"input",27),g.Wb("clrNumericValueChange",function(l){return c.money=l}),g.Ob(),g.Ob(),g.Pb(123,"clr-checkbox-container",8),g.Pb(124,"label",13),g.Ac(125,"Checkbox label"),g.Ob(),g.Pb(126,"clr-checkbox-wrapper"),g.Pb(127,"label"),g.Ac(128,"Option"),g.Ob(),g.Pb(129,"input",28),g.Wb("ngModelChange",function(l){return c.checkboxValue=l}),g.Ob(),g.Ob(),g.Ob(),g.Pb(130,"clr-toggle-container",8),g.Pb(131,"label",13),g.Ac(132,"Toggle label"),g.Ob(),g.Pb(133,"clr-toggle-wrapper"),g.Pb(134,"input",29),g.Wb("ngModelChange",function(l){return c.toggleValue=l}),g.Ob(),g.Kb(135,"label",30),g.Ob(),g.Ob(),g.Pb(136,"clr-multilingual-input",31),g.Wb("ngModelChange",function(l){return c.data=l}),g.Pb(137,"label",9),g.Ac(138,"Multilingual Input"),g.Ob(),g.Pb(139,"clr-control-error"),g.Ac(140,"Please translate in every language!"),g.Ob(),g.Pb(141,"clr-control-helper"),g.Ac(142,"Helper text"),g.Ob(),g.Ob(),g.Pb(143,"clr-multilingual-textarea",32),g.Wb("ngModelChange",function(l){return c.data2=l}),g.Pb(144,"label",9),g.Ac(145,"Multilingual Input"),g.Ob(),g.Pb(146,"clr-control-error"),g.Ac(147,"Please translate in every language!"),g.Ob(),g.Pb(148,"clr-control-helper"),g.Ac(149,"Helper text"),g.Ob(),g.Ob(),g.Ob(),g.Kb(150,"br"),g.Kb(151,"clr-code-snippet",33),g.Pb(152,"h4"),g.Ac(153,"Demo"),g.Ob(),g.Pb(154,"div"),g.Kb(155,"clr-icon",34),g.Ac(156,"\xa0 "),g.Pb(157,"a",35),g.Pb(158,"span",36),g.Ac(159,"Full Page Forms Layout"),g.Ob(),g.Ob(),g.Ob(),g.Pb(160,"div"),g.Kb(161,"clr-icon",34),g.Ac(162,"\xa0 "),g.Pb(163,"a",37),g.Pb(164,"span",36),g.Ac(165,"Full Page View Edit Section Layout"),g.Ob(),g.Ob(),g.Ob(),g.Pb(166,"h4"),g.Ac(167,"Submit form on enter"),g.Ob(),g.Pb(168,"p"),g.Ac(169,"To enable form submit on enter, following prerequisites need to be done:"),g.Ob(),g.Pb(170,"ul"),g.Pb(171,"li"),g.Ac(172,"Add hidden submit button to your form to activate 'enter' key handling in browser (only needed if you not already have one) "),g.Ob(),g.Pb(173,"li"),g.Ac(174,"React to submit of form"),g.Ob(),g.Ob(),g.Pb(175,"form",38),g.Wb("submit",function(){return c.onFormSubmit()}),g.Pb(176,"clr-input-container",8),g.Pb(177,"label",39),g.Ac(178,"Input label"),g.Ob(),g.Pb(179,"input",40),g.Wb("ngModelChange",function(l){return c.inputTextSubmit=l}),g.Ob(),g.Ob(),g.Kb(180,"input",41),g.Ob(),g.Ac(181),g.Kb(182,"clr-code-snippet",33),g.Pb(183,"h5"),g.Ac(184,"Special case for updateOn: blur"),g.Ob(),g.Pb(185,"p"),g.Ac(186,"Hitting the enter key doesn't trigger the blur event, so the form field is not up to date. To overcome this, blur the field manually."),g.Ob(),g.Kb(187,"clr-code-snippet",33),g.Pb(188,"h4"),g.Ac(189,"General form submit pattern"),g.Ob(),g.Kb(190,"clr-code-snippet",33),g.Pb(191,"h4"),g.Ac(192,"Read-only fields (horizontal)"),g.Ob(),g.Pb(193,"form",42),g.Pb(194,"div",43),g.Pb(195,"label",44),g.Ac(196,"First name"),g.Ob(),g.Pb(197,"span",45),g.Ac(198,"John"),g.Ob(),g.Ob(),g.Pb(199,"div",43),g.Pb(200,"label",44),g.Ac(201,"Last name"),g.Ob(),g.Pb(202,"span",45),g.Ac(203,"Doe"),g.Ob(),g.Ob(),g.Ob(),g.Kb(204,"clr-code-snippet",33),g.Pb(205,"h4"),g.Ac(206,"Read-only fields (horizontal 2 columns)"),g.Ob(),g.Pb(207,"form",42),g.Pb(208,"div",46),g.Pb(209,"label",47),g.Ac(210,"First name"),g.Ob(),g.Pb(211,"span",45),g.Ac(212,"John"),g.Ob(),g.Ob(),g.Pb(213,"div",46),g.Pb(214,"label",47),g.Ac(215,"Last name"),g.Ob(),g.Pb(216,"span",45),g.Ac(217,"Doe"),g.Ob(),g.Ob(),g.Pb(218,"div",46),g.Pb(219,"label",47),g.Ac(220,"Email"),g.Ob(),g.Pb(221,"span",45),g.Ac(222,"john.doe@mail.com"),g.Ob(),g.Ob(),g.Pb(223,"div",46),g.Pb(224,"label",47),g.Ac(225,"Phone"),g.Ob(),g.Pb(226,"span",45),g.Ac(227,"1234567890123"),g.Ob(),g.Ob(),g.Ob(),g.Kb(228,"clr-code-snippet",33),g.Pb(229,"h4"),g.Ac(230,"Read-only fields (vertical)"),g.Ob(),g.Pb(231,"form",48),g.Pb(232,"div",49),g.Pb(233,"label",50),g.Ac(234,"First name"),g.Ob(),g.Pb(235,"span"),g.Ac(236,"John"),g.Ob(),g.Ob(),g.Pb(237,"div",49),g.Pb(238,"label",50),g.Ac(239,"Lastname"),g.Ob(),g.Pb(240,"span"),g.Ac(241,"Doe"),g.Ob(),g.Ob(),g.Ob(),g.Kb(242,"clr-code-snippet",33),g.Pb(243,"h4"),g.Ac(244,"Read-only fields (vertical 2 columns)"),g.Ob(),g.Pb(245,"form",42),g.Pb(246,"div",51),g.Pb(247,"label",50),g.Ac(248,"First name"),g.Ob(),g.Pb(249,"span"),g.Ac(250,"John"),g.Ob(),g.Ob(),g.Pb(251,"div",51),g.Pb(252,"label",50),g.Ac(253,"Lastname"),g.Ob(),g.Pb(254,"span"),g.Ac(255,"Doe"),g.Ob(),g.Ob(),g.Pb(256,"div",51),g.Pb(257,"label",50),g.Ac(258,"Email"),g.Ob(),g.Pb(259,"span"),g.Ac(260,"john.doe@mail.com"),g.Ob(),g.Ob(),g.Pb(261,"div",51),g.Pb(262,"label",50),g.Ac(263,"Phone"),g.Ob(),g.Pb(264,"span"),g.Ac(265,"1234567890123"),g.Ob(),g.Ob(),g.Ob(),g.Kb(266,"clr-code-snippet",33),g.Ob(),g.Ob(),g.Ob()),2&l&&(g.gc("title",c.title),g.yb(55),g.gc("ngModel",c.inputText)("ngModelOptions",g.kc(46,A)),g.yb(3),g.gc("clrIfError","required"),g.yb(1),g.gc("clrIfError","minlength"),g.yb(4),g.gc("ngModel",c.textareaText)("ngModelOptions",g.kc(47,A)),g.yb(1),g.gc("clrIfError","required"),g.yb(4),g.gc("ngModel",c.passwordText)("ngModelOptions",g.kc(48,A)),g.yb(4),g.gc("ngModel",c.selectOption),g.yb(12),g.gc("clrValue","Option 1"),g.yb(2),g.gc("clrValue","Option 2"),g.yb(2),g.gc("clrValue","Option 3"),g.yb(6),g.gc("ngModel",c.radioOption),g.yb(4),g.gc("ngModel",c.radioOption),g.yb(10),g.gc("ngModel",c.date)("ngModelOptions",g.kc(49,A)),g.yb(4),g.gc("ngModel",c.time)("ngModelOptions",g.kc(50,A)),g.yb(5),g.gc("ngModel",c.date)("ngModelOptions",g.kc(51,A)),g.yb(1),g.gc("ngModel",c.time)("ngModelOptions",g.kc(52,A)),g.yb(4),g.gc("clrNumericValue",c.money),g.yb(7),g.gc("ngModel",c.checkboxValue),g.yb(5),g.gc("ngModel",c.toggleValue),g.yb(2),g.gc("ngModel",c.data)("ngModelOptions",g.kc(53,A)),g.yb(7),g.gc("ngModel",c.data2)("ngModelOptions",g.kc(54,A)),g.yb(8),g.gc("clrCode",c.codeExampleFullForm),g.yb(28),g.gc("ngModel",c.inputTextSubmit)("ngModelOptions",g.kc(55,A)),g.yb(2),g.Cc(" Submitted text (hit enter to submit): ",c.submittedText," "),g.yb(1),g.gc("clrCode",c.codeExampleFormSubmit),g.yb(5),g.gc("clrCode",c.codeExampleFormSubmitBlur),g.yb(3),g.gc("clrCode",c.codeExampleFormSubmitGeneral),g.yb(3),g.gc("clrLayout","horizontal"),g.yb(11),g.gc("clrCode",c.codeExampleROHorizontal),g.yb(3),g.gc("clrLayout","horizontal"),g.yb(21),g.gc("clrCode",c.codeExampleROHorizontal2),g.yb(3),g.gc("clrLayout","vertical"),g.yb(11),g.gc("clrCode",c.codeExampleROVertical),g.yb(3),g.gc("clrLayout","vertical"),g.yb(21),g.gc("clrCode",c.codeExampleROVertical2))},directives:[O.a,i.B,i.o,i.p,s.y,s.H,s.F,s.G,i.b,s.E,i.w,i.j,i.n,i.q,s.n,s.C,s.ab,s.Z,s.N,s.M,s.X,i.x,s.W,i.s,i.A,s.l,s.k,s.L,s.K,s.U,s.V,i.u,s.T,s.m,s.s,s.t,d.k,d.J,d.A,s.i,s.j,i.a,s.h,d.v,d.H,d.y,h.a,s.B,b.f,b.e],encapsulation:2}),M),w=((y=function c(){l(this,c)}).\u0275mod=g.Hb({type:y}),y.\u0275inj=g.Gb({factory:function(l){return new(l||y)},imports:[[a.c,i.h,s.a,s.z,d.B,d.l,d.x,u.a,p.a,b.g.forChild([{path:"",component:v}])]]}),y)}}])}();