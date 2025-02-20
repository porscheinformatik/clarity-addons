"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[871],{85871:(y,d,r)=>{r.r(d),r.d(d,{BreadcrumbDemoModule:()=>E});var n=r(60177),i=r(61180),o=r(36366),l=r(2985),e=r(93953),u=r(87620),m=r(91464);let p=(()=>{class t extends l.S{breadcrumbService;htmlExample="\n<clr-breadcrumb></clr-breadcrumb>\n";angularExample='\nconst breadcrumb1: ClrBreadcrumbModel = { label: "Home", url: "/" }\nconst breadcrumb2: ClrBreadcrumbModel = { label: "Parent", url: "/" }\nconst breadcrumb3: ClrBreadcrumbModel = { label: "Current Page" }\nthis.breadcrumbService.updateBreadcrumb([\n    breadcrumb1, breadcrumb2, breadcrumb3\n]);\n';constructor(c){super("breadcrumb"),this.breadcrumbService=c}ngOnInit(){this.breadcrumbService.updateBreadcrumb([{label:"Home",url:"/"},{label:"Parent",url:"/"},{label:"Current Page"}])}static \u0275fac=function(a){return new(a||t)(e.rXU(o.U$8))};static \u0275cmp=e.VBU({type:t,selectors:[["clr-breadcrumb-demo"]],hostVars:4,hostBindings:function(a,s){2&a&&e.AVh("content-area",!0)("dox-content-panel",!0)},features:[e.Vt3],decls:73,vars:4,consts:[[3,"title"],["id","generic-pager-header",1,"component-summary"],["id","design-guidelines"],[1,"row"],[1,"col-md-12","col-lg-6"],[1,"clrweb-DoxMedia","is-do-block"],[1,"clrweb-DoxMedia-block"],[1,"clrweb-DoxMedia-img","breadcrumb-demo"],[1,"clrweb-DoxMedia-text"],[1,"clrweb-DoxMedia-do-dont"],[1,"clrweb-DoxMedia","is-dont-block"],[1,"clrweb-DoxMedia-img","breadcrumb-demo-long"],[1,"breadcrumb"],[1,"breadcrumb-item"],["href","/"],["id","code-examples"],["id","examples"],[1,"clr-code"],[1,"clrweb-DoxMedia"],[3,"clrCode","clrLanguage"],[3,"clrCode"]],template:function(a,s){1&a&&(e.j41(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e.EFF(3," Breadcrumbs are a type of secondary navigation scheme that reveals the user\u2019s location in a site or web app. "),e.k0s(),e.j41(4,"div",2)(5,"h3"),e.EFF(6,"Design Guidelines"),e.k0s(),e.j41(7,"p"),e.EFF(8," The use of breadcrumbs have been widely discussed in several ui/ux communities. Some users stick to them, others don't even recognize them. "),e.k0s(),e.j41(9,"p"),e.EFF(10," For complex business applications, that provide a clear hierarchical structure (with parent-child relation between pages, which are probably deeply nested) the use can be justified. "),e.k0s(),e.j41(11,"p"),e.EFF(12," Avoided should be solutions with historical breadcrumbs, since they are very seldom used, may lead to cycles inside the breadcrumb-trail and basically duplicate the browser's back functionality. "),e.k0s(),e.j41(13,"h3"),e.EFF(14,"Use when"),e.k0s(),e.j41(15,"p"),e.EFF(16," Your application provides a clear hierarchical structure. "),e.nrm(17,"br"),e.EFF(18," The site structure is deeply nested and the primary navigation scheme is not sufficient. "),e.k0s(),e.j41(19,"h3"),e.EFF(20,"Don't use when"),e.k0s(),e.j41(21,"p"),e.EFF(22," Your information architecture represent a network instead of a hierarchical tree of pages."),e.nrm(23,"br"),e.EFF(24," In that case you can not clearly name the current page's parent, and the breadcrumb trail can not represent the path the user has been taken through the application. "),e.k0s()(),e.j41(25,"div",3)(26,"div",4)(27,"div",5)(28,"div",6)(29,"div",7),e.nrm(30,"clr-breadcrumb"),e.k0s()(),e.j41(31,"div",8)(32,"h6",9),e.EFF(33,"Do"),e.k0s(),e.j41(34,"p"),e.EFF(35,"Use breadcrumbs as hierarchical path to the current displayed page."),e.k0s()()()(),e.j41(36,"div",4)(37,"div",10)(38,"div",6)(39,"div",11)(40,"ol",12)(41,"li",13)(42,"a",14),e.EFF(43,"Page before last"),e.k0s()(),e.j41(44,"li",13)(45,"a",14),e.EFF(46,"Last page"),e.k0s()(),e.j41(47,"li",13),e.EFF(48,"Current Page"),e.k0s()()()(),e.j41(49,"div",8)(50,"h6",9),e.EFF(51,"Don't"),e.k0s(),e.j41(52,"p"),e.EFF(53,"Don't use historical breadcrumbs as browsing history."),e.k0s()()()()(),e.j41(54,"div",15)(55,"h3",16),e.EFF(56,"Code & Examples"),e.k0s(),e.j41(57,"p"),e.EFF(58," To set the breadcrumbs, the service "),e.j41(59,"code",17),e.EFF(60,"ClrBreadcrumbService"),e.k0s(),e.EFF(61," in conjunction with "),e.j41(62,"code",17),e.EFF(63,"ClrBreadcrumbModel"),e.k0s(),e.EFF(64," has to be used. "),e.k0s(),e.j41(65,"div",18)(66,"div",6)(67,"div",7),e.nrm(68,"clr-breadcrumb"),e.k0s()()(),e.nrm(69,"clr-code-snippet",19),e.j41(70,"p"),e.EFF(71,"To display the breadcrumbs simply place the angular component anywhere needed."),e.k0s(),e.nrm(72,"clr-code-snippet",20),e.k0s()()()),2&a&&(e.Y8G("title",s.title),e.R7$(69),e.Y8G("clrCode",s.angularExample)("clrLanguage","typescript"),e.R7$(3),e.Y8G("clrCode",s.htmlExample))},dependencies:[u.z,m.u,o.ztQ],styles:[".breadcrumb-demo[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{display:block;margin-top:-12px}",".breadcrumb-demo-long[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin-top:-12px}",".clrweb-DoxMedia-block[_ngcontent-%COMP%]{min-height:60px}"]})}return t})();var F=r(20786),g=r(5928),v=r(63275);let E=(()=>{class t{static \u0275fac=function(a){return new(a||t)};static \u0275mod=e.$C({type:t});static \u0275inj=e.G2t({imports:[n.MD,v.u,F.g,g.iI.forChild([{path:"",component:p}]),i.PuD,o.P8i]})}return t})()}}]);