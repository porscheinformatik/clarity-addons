!function(){function l(l,c){if(!(l instanceof c))throw new TypeError("Cannot call a class as a function")}function c(l,c){for(var e=0;e<c.length;e++){var r=c[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(l,r.key,r)}}function e(l,c){return(e=Object.setPrototypeOf||function(l,c){return l.__proto__=c,l})(l,c)}function r(l){var c=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(l){return!1}}();return function(){var e,r=n(l);if(c){var t=n(this).constructor;e=Reflect.construct(r,arguments,t)}else e=r.apply(this,arguments);return o(this,e)}}function o(l,c){return!c||"object"!=typeof c&&"function"!=typeof c?function(l){if(void 0===l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l}(l):c}function n(l){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(l){return l.__proto__||Object.getPrototypeOf(l)})(l)}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"H8/O":function(o,n,t){"use strict";t.r(n),t.d(n,"FormsDemoModule",(function(){return O}));var a=t("ofXK"),i=t("3Pt+"),b=t("tyNb"),s=t("8MG2"),d=t("6Y1o"),u=t("XPsC"),p=t("JsA7"),m=t("N+3j"),g=t("fXoL"),T=t("0G9f"),h=t("vAyd");function S(l,c){1&l&&(g.Tb(0,"clr-control-error"),g.Fc(1,"Error message about being required"),g.Sb())}function f(l,c){1&l&&(g.Tb(0,"clr-control-error"),g.Fc(1,"Error message about requiring 5 characters "),g.Sb())}function x(l,c){1&l&&(g.Tb(0,"clr-control-error"),g.Fc(1,"Error message about being required"),g.Sb())}var F,M,y=function(){return{updateOn:"blur"}},v=((M=function(o){!function(l,c){if("function"!=typeof c&&null!==c)throw new TypeError("Super expression must either be null or a function");l.prototype=Object.create(c&&c.prototype,{constructor:{value:l,writable:!0,configurable:!0}}),c&&e(l,c)}(b,o);var n,t,a,i=r(b);function b(){var c;return l(this,b),(c=i.call(this,"forms")).codeExampleFullForm='\n<form clrForm clrLayout="horizontal" class="clr-row">\n    <clr-input-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Input label</label>\n        <input clrInput class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" type="text"\n               [(ngModel)]="inputText" [ngModelOptions]="{ updateOn: \'blur\' }"\n               name="inputName" required minlength="5"/>\n        <clr-control-helper>Helper text that shows while it is pristine and valid</clr-control-helper>\n        <clr-control-error *clrIfError="\'required\'">Error message about being required</clr-control-error>\n        <clr-control-error *clrIfError="\'minlength\'">Error message about requiring 5 characters\n        </clr-control-error>\n    </clr-input-container>\n    <clr-textarea-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Textarea label</label>\n        <textarea clrTextarea class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                  [(ngModel)]="textareaText" [ngModelOptions]="{ updateOn: \'blur\' }"\n                  name="description" required></textarea>\n        <clr-control-error *clrIfError="\'required\'">Error message about being required</clr-control-error>\n    </clr-textarea-container>\n    <clr-password-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Password label</label>\n        <input clrPassword class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n               placeholder="Password please!" type="text"\n               [(ngModel)]="passwordText" [ngModelOptions]="{ updateOn: \'blur\' }" name="passwordName"/>\n    </clr-password-container>\n    <clr-select-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Select label</label>\n        <select clrSelect class="clr-col-6 clr-col-sm-3 clr-col-md-2" name="options"\n                [(ngModel)]="selectOption">\n            <option value="one">One</option>\n            <option value="two">Two</option>\n            <option value="three">Three</option>\n        </select>\n    </clr-select-container>\n    <clr-combobox class="clr-col-12 clr-row"\n                  clrControlClasses="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                  [clrAllowUserEntry]="true">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Combobox label</label>\n        <clr-options>\n            <clr-option [clrValue]="\'Option 1\'">Option 1</clr-option>\n            <clr-option [clrValue]="\'Option 2\'">Option 2</clr-option>\n            <clr-option [clrValue]="\'Option 3\'">Option 3</clr-option>\n            <div class="clr-no-results">No search results found</div>\n        </clr-options>\n    </clr-combobox>\n    <clr-radio-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Radio label</label>\n        <clr-radio-wrapper>\n            <input type="radio" class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" \n                clrRadio name="options" value="1" required [(ngModel)]="radioOption"/>\n            <label>Option 1</label>\n        </clr-radio-wrapper>\n        <clr-radio-wrapper>\n            <input type="radio" clrRadio name="options" value="2" required [(ngModel)]="radioOption"/>\n            <label>Option 2</label>\n        </clr-radio-wrapper>\n        <clr-control-helper>Helper text</clr-control-helper>\n        <clr-control-error>This field is required!</clr-control-error>\n    </clr-radio-container>\n    <clr-date-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Date label</label>\n        <input class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" type="text" [(ngModel)]="date"\n               [ngModelOptions]="{ updateOn: \'blur\' }" name="date" clrDate>\n    </clr-date-container>\n    <clr-input-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Time label</label>\n        <input class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" type="time" [(ngModel)]="time"\n               [ngModelOptions]="{ updateOn: \'blur\' }" name="time" clrInput>\n    </clr-input-container>\n    <clr-date-time-container class="clr-col-12 clr-row">\n        <clr-date-container>\n            <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Date & time label</label>\n            <input class="clr-col-8" clrDate type="text" [(ngModel)]="date"\n                   [ngModelOptions]="{ updateOn: \'blur\' }" name="date">\n        </clr-date-container>\n        <input type="time" [(ngModel)]="time" [ngModelOptions]="{ updateOn: \'blur\' }" name="time" clrTime>\n    </clr-date-time-container>\n    <clr-input-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Money label</label>\n        <input class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3" clrInput clrNumeric\n               class="clr-col-2" type="text" [(clrNumericValue)]="money" clrUnit="\u20ac"/>\n    </clr-input-container>\n    <clr-checkbox-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 ">Checkbox label</label>\n        <clr-checkbox-wrapper>\n            <label>Option</label>\n            <input clrCheckbox class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                type="checkbox" [(ngModel)]="checkboxValue" name="checkboxName"/>\n        </clr-checkbox-wrapper>\n    </clr-checkbox-container>\n    <clr-toggle-container class="clr-col-12">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2">Toggle label</label>\n        <clr-toggle-wrapper>\n            <input type="checkbox" class="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                id="toggle" name="toggle" [(ngModel)]="toggleValue" clrToggle/>\n            <label for="toggle" class="clr-col-none"></label>\n        </clr-toggle-wrapper>\n    </clr-toggle-container>\n    <clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data"\n                            [ngModelOptions]="{ updateOn: \'blur\' }"\n                            clrRequiredAllMultilang\n                            clrControlClasses="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                            name="template">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Multilingual Input</label>\n        <clr-control-error>Please translate in every language!</clr-control-error>\n        <clr-control-helper>Helper text</clr-control-helper>\n    </clr-multilingual-input>\n    <clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data2"\n                               [ngModelOptions]="{ updateOn: \'blur\' }"\n                               clrRequiredAllMultilang\n                               clrControlClasses="clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3"\n                               name="template2">\n        <label class="clr-col-12 clr-col-sm-4 clr-col-md-3 clr-col-xl-2 required">Multilingual Input</label>\n        <clr-control-error>Please translate in every language!</clr-control-error>\n        <clr-control-helper>Helper text</clr-control-helper>\n    </clr-multilingual-textarea>\n</form>\n',c.codeExampleFormSubmit='\n<form ... (submit)="onFormSubmit()">\n    ...\n    <input type="submit" style="display: none"> \x3c!-- Not needed, if you already have a submit button--\x3e\n</form>\n',c.codeExampleFormSubmitBlur="\nonFormSubmit() {\n    (<HTMLElement>document.activeElement).blur();\n    ...\n}\n",c.codeExampleFormSubmitGeneral="\n@ViewChild(ClrForm, { static: true }) clrForm: ClrForm;\n\nonFormSubmit() {\n    (<HTMLElement>document.activeElement).blur(); // to correctly handle invalid inputs when hitting enter\n    this.form.updateValueAndValidity(); // form is the instance to the FormGroup (reactive) or ngForm (template)\n\n    if (this.form.valid) {\n      // save the form\n    } else {\n      this.clrForm.markAsTouched(); // to show validation errors for not-touched fields\n    }\n}\n",c.codeExampleROHorizontal='\n<form clrForm [clrLayout]="\'horizontal\'" class="clr-row">\n    <div class="clr-col-12 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">First name</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">John</span>\n    </div>\n\n    <div class="clr-col-12 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">Lastname</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">Doe</span>\n    </div>\n</form>\n',c.codeExampleROHorizontal2='\n<form clrForm [clrLayout]="\'horizontal\'" class="clr-row">\n    <div class="clr-col-6 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-1">First name</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">John</span>\n    </div>\n    <div class="clr-col-6 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-1">Last name</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">Doe</span>\n    </div>\n    <div class="clr-col-6 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">Email</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">john.doe@mail.com</span>\n    </div>\n    <div class="clr-col-6 clr-form-control clr-row">\n        <label class="clr-control-label clr-col-xs-12 clr-col-sm-3 clr-col-lg-2">Phone</label>\n        <span class="clr-col-xs-12 clr-col-sm-9 clr-col-lg-10">1234567890123</span>\n    </div>\n</form>\n',c.codeExampleROVertical='\n<form clrForm [clrLayout]="\'vertical\'">\n    <div class="clr-form-control">\n        <label class="clr-control-label">First name</label>\n        <span>John</span>\n    </div>\n    <div class="clr-form-control">\n        <label class="clr-control-label">Lastname</label>\n        <span>Doe</span>\n    </div>\n</form>\n',c.codeExampleROVertical2='\n<form clrForm [clrLayout]="\'vertical\'" class="clr-row">\n    <div class="clr-form-control clr-col-6">\n        <label class="clr-control-label">First name</label>\n        <span>John</span>\n    </div>\n    <div class="clr-form-control clr-col-6">\n        <label class="clr-control-label">Lastname</label>\n        <span>Doe</span>\n    </div>\n    <div class="clr-form-control clr-col-6">\n        <label class="clr-control-label">Email</label>\n        <span>john.doe@mail.com</span>\n    </div>\n    <div class="clr-form-control clr-col-6">\n        <label class="clr-control-label">Phone</label>\n        <span>1234567890123</span>\n    </div>\n</form>\n',c.data=new Map,c.data2=new Map,c.data.set("EN","english text"),c.data.set("DE","deutscher text"),c.data.set("FR","texte fran\xe7ais"),c.data2.set("EN","english text"),c.data2.set("DE","deutscher text"),c.data2.set("FR","texte fran\xe7ais"),c}return n=b,(t=[{key:"onFormSubmit",value:function(){document.activeElement.blur(),this.submittedText=this.inputTextSubmit}}])&&c(n.prototype,t),a&&c(n,a),b}(m.a)).\u0275fac=function(l){return new(l||M)},M.\u0275cmp=g.Hb({type:M,selectors:[["clr-forms-demo"]],hostVars:4,hostBindings:function(l,c){2&l&&g.Eb("content-area",!0)("dox-content-panel",!0)},features:[g.yb],decls:265,vars:60,consts:[[3,"ng","ui","title","newLayout"],[1,"component-summary"],["href","https://clarity.design/documentation/forms"],["id","design-guidelines"],[1,"clr-code"],["id","code-examples"],["id","examples"],["clrForm","","clrLayout","horizontal",1,"clr-row"],[1,"clr-col-12"],[1,"clr-col-12","clr-col-sm-4","clr-col-md-3","clr-col-xl-2","required"],["clrInput","","type","text","name","inputName","required","","minlength","5",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelOptions","ngModelChange"],[4,"clrIfError"],["clrTextarea","","name","description","required","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelOptions","ngModelChange"],[1,"clr-col-12","clr-col-sm-4","clr-col-md-3","clr-col-xl-2"],["clrPassword","","placeholder","Password please!","type","text","name","passwordName",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelOptions","ngModelChange"],["clrSelect","","name","options",1,"clr-col-6","clr-col-sm-3","clr-col-md-2",3,"ngModel","ngModelChange"],["value","one"],["value","two"],["value","three"],["clrControlClasses","clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3",1,"clr-col-12","clr-row",3,"clrAllowUserEntry"],[3,"clrValue"],[1,"clr-no-results"],["type","radio","clrRadio","","name","options","value","1","required","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelChange"],["type","radio","clrRadio","","name","options","value","2","required","",3,"ngModel","ngModelChange"],["type","text","name","date","clrDate","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelOptions","ngModelChange"],["type","time","name","time","clrInput","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelOptions","ngModelChange"],[1,"clr-col-12","clr-row"],["clrDate","","type","text","name","date",1,"clr-col-8",3,"ngModel","ngModelOptions","ngModelChange"],["type","time","name","time","clrTime","",3,"ngModel","ngModelOptions","ngModelChange"],["clrInput","","clrNumeric","","type","text","clrUnit","\u20ac",1,"clr-col-2",3,"clrNumericValue","clrNumericValueChange"],["clrCheckbox","","type","checkbox","name","checkboxName",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelChange"],["type","checkbox","id","toggle","name","toggle","clrToggle","",1,"clr-col-6","clr-col-md-5","clr-col-lg-4","clr-col-xl-3",3,"ngModel","ngModelChange"],["for","toggle",1,"clr-col-none"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3","name","template",1,"clr-col-12","clr-row",3,"ngModel","ngModelOptions","ngModelChange"],["clrSelectedLang","EN","clrRequiredAllMultilang","","clrControlClasses","clr-col-6 clr-col-md-5 clr-col-lg-4 clr-col-xl-3","name","template2",1,"clr-col-12","clr-row",3,"ngModel","ngModelOptions","ngModelChange"],[3,"clrCode"],["shape","display"],["routerLink","/full-page-layouts/basepage-layout-sub1/forms","routerLinkActive","active",1,"nav-link"],[1,"nav-text"],["routerLink","/full-page-layouts/basepage-layout-sub1/ves","routerLinkActive","active",1,"nav-link"],["clrForm","",1,"clr-row",3,"submit"],[1,"clr-col-12","clr-col-sm-4","clr-col-md-3","clr-col-xl-2","clr-col-md-2"],["clrInput","","type","text","name","inputNameSubmit",1,"clr-col-2",3,"ngModel","ngModelOptions","ngModelChange"],["type","submit",2,"display","none"],["clrForm","",1,"clr-row",3,"clrLayout"],[1,"clr-col-12","clr-form-control","clr-row"],[1,"clr-control-label","clr-col-xs-12","clr-col-sm-3","clr-col-lg-1"],[1,"clr-col-xs-12","clr-col-sm-9","clr-col-lg-10"],[1,"clr-col-6","clr-form-control","clr-row"],[1,"clr-control-label","clr-col-xs-12","clr-col-sm-3","clr-col-lg-2"],["clrForm","",3,"clrLayout"],[1,"clr-form-control"],[1,"clr-control-label"],[1,"clr-form-control","clr-col-6"]],template:function(l,c){1&l&&(g.Tb(0,"clr-doc-wrapper",0),g.Tb(1,"article"),g.Tb(2,"h5",1),g.Fc(3,"This describes clarity forms in more detail. Official documentation: "),g.Tb(4,"a",2),g.Fc(5,"Clarity Forms documentation"),g.Sb(),g.Sb(),g.Tb(6,"p"),g.Fc(7,"Find below our recommendation how to use every input component."),g.Ob(8,"br"),g.Fc(9," Please also check back frequently to get updates of the recommended way."),g.Sb(),g.Tb(10,"div",3),g.Tb(11,"h3"),g.Fc(12,"Usage"),g.Sb(),g.Tb(13,"ul"),g.Tb(14,"li"),g.Tb(15,"b"),g.Fc(16,"Always use forms."),g.Sb(),g.Fc(17," Don't display multiple labels and input fields outside of a form."),g.Sb(),g.Tb(18,"li"),g.Fc(19,"When adding subheaders inside a form, use "),g.Tb(20,"code",4),g.Fc(21,"h4"),g.Sb(),g.Fc(22," elements."),g.Sb(),g.Tb(23,"li"),g.Fc(24,"Control the width of labels and inputs by adding "),g.Tb(25,"code",4),g.Fc(26,"clr-col-*"),g.Sb(),g.Fc(27," classes inside the "),g.Tb(28,"code",4),g.Fc(29,"clr-*-container"),g.Sb(),g.Fc(30,". "),g.Sb(),g.Tb(31,"li"),g.Fc(32,"Forms in a "),g.Tb(33,"code",4),g.Fc(34,"clr-view-edit-section"),g.Sb(),g.Fc(35," should also be displayed using the below examples. "),g.Sb(),g.Tb(36,"li"),g.Fc(37,"Make your forms responsive. Use the correct "),g.Tb(38,"code",4),g.Fc(39,"clr-col-*"),g.Sb(),g.Fc(40," classes to make your forms fit every screen size. "),g.Sb(),g.Tb(41,"li"),g.Fc(42,"Always use 1 column layouts on screen sizes below 768px. (md-breakpoint)"),g.Sb(),g.Sb(),g.Sb(),g.Tb(43,"div",5),g.Tb(44,"h3",6),g.Fc(45,"Code & Examples"),g.Sb(),g.Tb(46,"h4"),g.Fc(47,"Standard form"),g.Sb(),g.Tb(48,"form",7),g.Tb(49,"clr-input-container",8),g.Tb(50,"label",9),g.Fc(51,"Input label"),g.Sb(),g.Tb(52,"input",10),g.bc("ngModelChange",(function(l){return c.inputText=l})),g.Sb(),g.Tb(53,"clr-control-helper"),g.Fc(54,"Helper text that shows while it is pristine and valid"),g.Sb(),g.Dc(55,S,2,0,"clr-control-error",11),g.Dc(56,f,2,0,"clr-control-error",11),g.Sb(),g.Tb(57,"clr-textarea-container",8),g.Tb(58,"label",9),g.Fc(59,"Textarea label"),g.Sb(),g.Tb(60,"textarea",12),g.bc("ngModelChange",(function(l){return c.textareaText=l})),g.Sb(),g.Dc(61,x,2,0,"clr-control-error",11),g.Sb(),g.Tb(62,"clr-password-container",8),g.Tb(63,"label",13),g.Fc(64,"Password label"),g.Sb(),g.Tb(65,"input",14),g.bc("ngModelChange",(function(l){return c.passwordText=l})),g.Sb(),g.Sb(),g.Tb(66,"clr-select-container",8),g.Tb(67,"label",9),g.Fc(68,"Select label"),g.Sb(),g.Tb(69,"select",15),g.bc("ngModelChange",(function(l){return c.selectOption=l})),g.Tb(70,"option",16),g.Fc(71,"One"),g.Sb(),g.Tb(72,"option",17),g.Fc(73,"Two"),g.Sb(),g.Tb(74,"option",18),g.Fc(75,"Three"),g.Sb(),g.Sb(),g.Sb(),g.Tb(76,"clr-combobox",19),g.Tb(77,"label",13),g.Fc(78,"Combobox label"),g.Sb(),g.Tb(79,"clr-options"),g.Tb(80,"clr-option",20),g.Fc(81,"Option 1"),g.Sb(),g.Tb(82,"clr-option",20),g.Fc(83,"Option 2"),g.Sb(),g.Tb(84,"clr-option",20),g.Fc(85,"Option 3"),g.Sb(),g.Tb(86,"div",21),g.Fc(87,"No search results found"),g.Sb(),g.Sb(),g.Sb(),g.Tb(88,"clr-radio-container",8),g.Tb(89,"label",9),g.Fc(90,"Radio label"),g.Sb(),g.Tb(91,"clr-radio-wrapper"),g.Tb(92,"input",22),g.bc("ngModelChange",(function(l){return c.radioOption=l})),g.Sb(),g.Tb(93,"label"),g.Fc(94,"Option 1"),g.Sb(),g.Sb(),g.Tb(95,"clr-radio-wrapper"),g.Tb(96,"input",23),g.bc("ngModelChange",(function(l){return c.radioOption=l})),g.Sb(),g.Tb(97,"label"),g.Fc(98,"Option 2"),g.Sb(),g.Sb(),g.Tb(99,"clr-control-helper"),g.Fc(100,"Helper text"),g.Sb(),g.Tb(101,"clr-control-error"),g.Fc(102,"This field is required!"),g.Sb(),g.Sb(),g.Tb(103,"clr-date-container",8),g.Tb(104,"label",13),g.Fc(105,"Date label"),g.Sb(),g.Tb(106,"input",24),g.bc("ngModelChange",(function(l){return c.date=l})),g.Sb(),g.Sb(),g.Tb(107,"clr-input-container",8),g.Tb(108,"label",13),g.Fc(109,"Time label"),g.Sb(),g.Tb(110,"input",25),g.bc("ngModelChange",(function(l){return c.time=l})),g.Sb(),g.Sb(),g.Tb(111,"clr-date-time-container",26),g.Tb(112,"clr-date-container"),g.Tb(113,"label",13),g.Fc(114,"Date & time label"),g.Sb(),g.Tb(115,"input",27),g.bc("ngModelChange",(function(l){return c.date=l})),g.Sb(),g.Sb(),g.Tb(116,"input",28),g.bc("ngModelChange",(function(l){return c.time=l})),g.Sb(),g.Sb(),g.Tb(117,"clr-input-container",8),g.Tb(118,"label",13),g.Fc(119,"Money label"),g.Sb(),g.Tb(120,"input",29),g.bc("clrNumericValueChange",(function(l){return c.money=l})),g.Sb(),g.Sb(),g.Tb(121,"clr-checkbox-container",8),g.Tb(122,"label",13),g.Fc(123,"Checkbox label"),g.Sb(),g.Tb(124,"clr-checkbox-wrapper"),g.Tb(125,"label"),g.Fc(126,"Option"),g.Sb(),g.Tb(127,"input",30),g.bc("ngModelChange",(function(l){return c.checkboxValue=l})),g.Sb(),g.Sb(),g.Sb(),g.Tb(128,"clr-toggle-container",8),g.Tb(129,"label",13),g.Fc(130,"Toggle label"),g.Sb(),g.Tb(131,"clr-toggle-wrapper"),g.Tb(132,"input",31),g.bc("ngModelChange",(function(l){return c.toggleValue=l})),g.Sb(),g.Ob(133,"label",32),g.Sb(),g.Sb(),g.Tb(134,"clr-multilingual-input",33),g.bc("ngModelChange",(function(l){return c.data=l})),g.Tb(135,"label",9),g.Fc(136,"Multilingual Input"),g.Sb(),g.Tb(137,"clr-control-error"),g.Fc(138,"Please translate in every language!"),g.Sb(),g.Tb(139,"clr-control-helper"),g.Fc(140,"Helper text"),g.Sb(),g.Sb(),g.Tb(141,"clr-multilingual-textarea",34),g.bc("ngModelChange",(function(l){return c.data2=l})),g.Tb(142,"label",9),g.Fc(143,"Multilingual Input"),g.Sb(),g.Tb(144,"clr-control-error"),g.Fc(145,"Please translate in every language!"),g.Sb(),g.Tb(146,"clr-control-helper"),g.Fc(147,"Helper text"),g.Sb(),g.Sb(),g.Sb(),g.Ob(148,"br"),g.Ob(149,"clr-code-snippet",35),g.Tb(150,"h4"),g.Fc(151,"Demo"),g.Sb(),g.Tb(152,"div"),g.Ob(153,"clr-icon",36),g.Fc(154,"\xa0 "),g.Tb(155,"a",37),g.Tb(156,"span",38),g.Fc(157,"Full Page Forms Layout"),g.Sb(),g.Sb(),g.Sb(),g.Tb(158,"div"),g.Ob(159,"clr-icon",36),g.Fc(160,"\xa0 "),g.Tb(161,"a",39),g.Tb(162,"span",38),g.Fc(163,"Full Page View Edit Section Layout"),g.Sb(),g.Sb(),g.Sb(),g.Tb(164,"h4"),g.Fc(165,"Submit form on enter"),g.Sb(),g.Tb(166,"p"),g.Fc(167,"To enable form submit on enter, following prerequisites need to be done:"),g.Sb(),g.Tb(168,"ul"),g.Tb(169,"li"),g.Fc(170,"Add hidden submit button to your form to activate 'enter' key handling in browser (only needed if you not already have one) "),g.Sb(),g.Tb(171,"li"),g.Fc(172,"React to submit of form"),g.Sb(),g.Sb(),g.Tb(173,"form",40),g.bc("submit",(function(){return c.onFormSubmit()})),g.Tb(174,"clr-input-container",8),g.Tb(175,"label",41),g.Fc(176,"Input label"),g.Sb(),g.Tb(177,"input",42),g.bc("ngModelChange",(function(l){return c.inputTextSubmit=l})),g.Sb(),g.Sb(),g.Ob(178,"input",43),g.Sb(),g.Fc(179),g.Ob(180,"clr-code-snippet",35),g.Tb(181,"h5"),g.Fc(182,"Special case for updateOn: blur"),g.Sb(),g.Tb(183,"p"),g.Fc(184,"Hitting the enter key doesn't trigger the blur event, so the form field is not up to date. To overcome this, blur the field manually."),g.Sb(),g.Ob(185,"clr-code-snippet",35),g.Tb(186,"h4"),g.Fc(187,"General form submit pattern"),g.Sb(),g.Ob(188,"clr-code-snippet",35),g.Tb(189,"h4"),g.Fc(190,"Read-only fields (horizontal)"),g.Sb(),g.Tb(191,"form",44),g.Tb(192,"div",45),g.Tb(193,"label",46),g.Fc(194,"First name"),g.Sb(),g.Tb(195,"span",47),g.Fc(196,"John"),g.Sb(),g.Sb(),g.Tb(197,"div",45),g.Tb(198,"label",46),g.Fc(199,"Last name"),g.Sb(),g.Tb(200,"span",47),g.Fc(201,"Doe"),g.Sb(),g.Sb(),g.Sb(),g.Ob(202,"clr-code-snippet",35),g.Tb(203,"h4"),g.Fc(204,"Read-only fields (horizontal 2 columns)"),g.Sb(),g.Tb(205,"form",44),g.Tb(206,"div",48),g.Tb(207,"label",49),g.Fc(208,"First name"),g.Sb(),g.Tb(209,"span",47),g.Fc(210,"John"),g.Sb(),g.Sb(),g.Tb(211,"div",48),g.Tb(212,"label",49),g.Fc(213,"Last name"),g.Sb(),g.Tb(214,"span",47),g.Fc(215,"Doe"),g.Sb(),g.Sb(),g.Tb(216,"div",48),g.Tb(217,"label",49),g.Fc(218,"Email"),g.Sb(),g.Tb(219,"span",47),g.Fc(220,"john.doe@mail.com"),g.Sb(),g.Sb(),g.Tb(221,"div",48),g.Tb(222,"label",49),g.Fc(223,"Phone"),g.Sb(),g.Tb(224,"span",47),g.Fc(225,"1234567890123"),g.Sb(),g.Sb(),g.Sb(),g.Ob(226,"clr-code-snippet",35),g.Tb(227,"h4"),g.Fc(228,"Read-only fields (vertical)"),g.Sb(),g.Tb(229,"form",50),g.Tb(230,"div",51),g.Tb(231,"label",52),g.Fc(232,"First name"),g.Sb(),g.Tb(233,"span"),g.Fc(234,"John"),g.Sb(),g.Sb(),g.Tb(235,"div",51),g.Tb(236,"label",52),g.Fc(237,"Lastname"),g.Sb(),g.Tb(238,"span"),g.Fc(239,"Doe"),g.Sb(),g.Sb(),g.Sb(),g.Ob(240,"clr-code-snippet",35),g.Tb(241,"h4"),g.Fc(242,"Read-only fields (vertical 2 columns)"),g.Sb(),g.Tb(243,"form",44),g.Tb(244,"div",53),g.Tb(245,"label",52),g.Fc(246,"First name"),g.Sb(),g.Tb(247,"span"),g.Fc(248,"John"),g.Sb(),g.Sb(),g.Tb(249,"div",53),g.Tb(250,"label",52),g.Fc(251,"Lastname"),g.Sb(),g.Tb(252,"span"),g.Fc(253,"Doe"),g.Sb(),g.Sb(),g.Tb(254,"div",53),g.Tb(255,"label",52),g.Fc(256,"Email"),g.Sb(),g.Tb(257,"span"),g.Fc(258,"john.doe@mail.com"),g.Sb(),g.Sb(),g.Tb(259,"div",53),g.Tb(260,"label",52),g.Fc(261,"Phone"),g.Sb(),g.Tb(262,"span"),g.Fc(263,"1234567890123"),g.Sb(),g.Sb(),g.Sb(),g.Ob(264,"clr-code-snippet",35),g.Sb(),g.Sb(),g.Sb()),2&l&&(g.lc("ng",c.ng)("ui",c.ui)("title",c.title)("newLayout",c.newLayout),g.Bb(52),g.lc("ngModel",c.inputText)("ngModelOptions",g.pc(50,y)),g.Bb(3),g.lc("clrIfError","required"),g.Bb(1),g.lc("clrIfError","minlength"),g.Bb(4),g.lc("ngModel",c.textareaText)("ngModelOptions",g.pc(51,y)),g.Bb(1),g.lc("clrIfError","required"),g.Bb(4),g.lc("ngModel",c.passwordText)("ngModelOptions",g.pc(52,y)),g.Bb(4),g.lc("ngModel",c.selectOption),g.Bb(7),g.lc("clrAllowUserEntry",!0),g.Bb(4),g.lc("clrValue","Option 1"),g.Bb(2),g.lc("clrValue","Option 2"),g.Bb(2),g.lc("clrValue","Option 3"),g.Bb(8),g.lc("ngModel",c.radioOption),g.Bb(4),g.lc("ngModel",c.radioOption),g.Bb(10),g.lc("ngModel",c.date)("ngModelOptions",g.pc(53,y)),g.Bb(4),g.lc("ngModel",c.time)("ngModelOptions",g.pc(54,y)),g.Bb(5),g.lc("ngModel",c.date)("ngModelOptions",g.pc(55,y)),g.Bb(1),g.lc("ngModel",c.time)("ngModelOptions",g.pc(56,y)),g.Bb(4),g.lc("clrNumericValue",c.money),g.Bb(7),g.lc("ngModel",c.checkboxValue),g.Bb(5),g.lc("ngModel",c.toggleValue),g.Bb(2),g.lc("ngModel",c.data)("ngModelOptions",g.pc(57,y)),g.Bb(7),g.lc("ngModel",c.data2)("ngModelOptions",g.pc(58,y)),g.Bb(8),g.lc("clrCode",c.codeExampleFullForm),g.Bb(28),g.lc("ngModel",c.inputTextSubmit)("ngModelOptions",g.pc(59,y)),g.Bb(2),g.Hc(" Submitted text (hit enter to submit): ",c.submittedText," "),g.Bb(1),g.lc("clrCode",c.codeExampleFormSubmit),g.Bb(5),g.lc("clrCode",c.codeExampleFormSubmitBlur),g.Bb(3),g.lc("clrCode",c.codeExampleFormSubmitGeneral),g.Bb(3),g.lc("clrLayout","horizontal"),g.Bb(11),g.lc("clrCode",c.codeExampleROHorizontal),g.Bb(3),g.lc("clrLayout","horizontal"),g.Bb(21),g.lc("clrCode",c.codeExampleROHorizontal2),g.Bb(3),g.lc("clrLayout","vertical"),g.Bb(11),g.lc("clrCode",c.codeExampleROVertical),g.Bb(3),g.lc("clrLayout","vertical"),g.Bb(21),g.lc("clrCode",c.codeExampleROVertical2))},directives:[T.a,i.A,i.n,i.o,s.u,s.E,s.C,s.D,i.b,s.B,i.v,i.i,i.m,i.p,s.j,s.z,s.Q,s.P,s.I,s.H,s.O,i.w,s.N,i.r,i.z,d.g,d.G,d.F,s.L,s.M,i.t,s.K,s.i,s.o,s.p,d.m,d.N,d.C,s.g,s.h,i.a,s.f,d.x,d.L,d.A,h.a,s.x,b.f,b.e],encapsulation:2}),M),O=((F=function c(){l(this,c)}).\u0275mod=g.Lb({type:F}),F.\u0275inj=g.Kb({factory:function(l){return new(l||F)},imports:[[a.c,i.h,s.a,s.v,d.D,d.n,d.h,d.z,u.a,p.a,b.g.forChild([{path:"",component:v}])]]}),F)}}])}();