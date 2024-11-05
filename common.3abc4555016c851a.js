"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[76],{20786:(m,u,a)=>{a.d(u,{g:()=>C});var e=a(60177),n=a(62491),s=a(63275),h=a(5928),c=a(93953);let C=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=c.$C({type:i});static \u0275inj=c.G2t({imports:[e.MD,n.PuD,s.u,h.iI]})}return i})()},91464:(m,u,a)=>{a.d(u,{u:()=>l});var e=a(93953),n=a(60177),s=a(5928);let h=(()=>{class t{route;platformId;constructor(o,r){this.route=o,this.platformId=r,this.sub=this.route.fragment.subscribe(d=>{this.scrollToAnchor(d,!1)})}sub;ngOnInit(){this.scrollToAnchor(this.route.snapshot.fragment,!1)}scrollToAnchor(o,r=!0){if(o&&(0,n.UE)(this.platformId)){const d=document.querySelector("#"+o);d&&d.scrollIntoView({behavior:r?"smooth":"instant",block:"start"})}}ngOnDestroy(){this.sub.unsubscribe()}static \u0275fac=function(r){return new(r||t)(e.rXU(s.nX),e.rXU(e.Agw))};static \u0275dir=e.FsC({type:t,selectors:[["","hash-listener",""]]})}return t})(),c=(()=>{class t{renderer;constructor(o){this.renderer=o}scrollable;anchors=[];sub;set links(o){this.anchors=o.map(r=>"#"+r.fragment),this.sub=o.changes.subscribe(()=>{this.anchors=o.map(r=>"#"+r.fragment)})}linkElements;throttle=!1;scrollPosition;handleEvent(){this.scrollPosition=this.scrollable.scrollTop,this.throttle||window.requestAnimationFrame(()=>{let o=this.findCurrentAnchor()||0;this.linkElements.forEach((r,d)=>{d===o?this.renderer.addClass(r.nativeElement,"active"):this.renderer.removeClass(r.nativeElement,"active")}),this.throttle=!1}),this.throttle=!0}findCurrentAnchor(){for(let o=this.anchors.length-1;o>=0;o--){let r=this.anchors[o];if(this.scrollable.querySelector(r)&&this.scrollable.querySelector(r).offsetTop<=this.scrollPosition)return o}}ngOnInit(){this.scrollable.addEventListener("scroll",this)}ngOnDestroy(){this.scrollable&&this.scrollable.removeEventListener("scroll",this),this.sub&&this.sub.unsubscribe()}static \u0275fac=function(r){return new(r||t)(e.rXU(e.sFG))};static \u0275dir=e.FsC({type:t,selectors:[["","scrollspy",""]],contentQueries:function(r,d,M){if(1&r&&(e.wni(M,s.Wk,5),e.wni(M,s.Wk,5,e.aKT)),2&r){let g;e.mGM(g=e.lsd())&&(d.links=g),e.mGM(g=e.lsd())&&(d.linkElements=g)}},inputs:{scrollable:[0,"scrollspy","scrollable"]}})}return t})();const C=["*"];function i(t,H){1&t&&(e.j41(0,"span",11),e.EFF(1," Deprecated "),e.j41(2,"span",12),e.EFF(3,"v7.0"),e.k0s()())}function f(t,H){if(1&t&&(e.j41(0,"h5"),e.EFF(1),e.k0s()),2&t){const o=e.XpG();e.R7$(),e.JRh(o.description)}}let l=(()=>{class t{title="";description="";deprecated=!1;static \u0275fac=function(r){return new(r||t)};static \u0275cmp=e.VBU({type:t,selectors:[["clr-doc-wrapper"]],hostVars:2,hostBindings:function(r,d){2&r&&e.AVh("dox-wrapper",!0)},inputs:{title:"title",description:"description",deprecated:"deprecated"},ngContentSelectors:C,decls:19,vars:4,consts:[["scrollable",""],[1,"dox-wrapper","dox-header","new-component-layout"],["class","label label-warning clr-align-middle",4,"ngIf"],[4,"ngIf"],[1,"dox-tabs"],[1,"list-unstyled",3,"scrollspy"],["routerLink",".","routerLinkActive","active","fragment","top","id","topTabLink",1,"clrweb-tablink"],["routerLink",".","routerLinkActive","active","fragment","examples","id","guidelinesTabLink",1,"clrweb-tablink"],["hash-listener","",1,"dox-content"],[1,"dox-content-wrapper"],["id","top"],[1,"label","label-warning","clr-align-middle"],[1,"badge","badge-warning"]],template:function(r,d){if(1&r&&(e.NAR(),e.j41(0,"div",1)(1,"section")(2,"h1"),e.EFF(3),e.DNE(4,i,4,0,"span",2),e.k0s(),e.DNE(5,f,2,1,"h5",3),e.j41(6,"div",4)(7,"ul",5)(8,"li")(9,"a",6),e.EFF(10," Design Guidelines "),e.k0s()(),e.j41(11,"li")(12,"a",7),e.EFF(13," Code & Examples "),e.k0s()()()()()(),e.j41(14,"section",8,0)(16,"div",9),e.nrm(17,"a",10),e.SdG(18),e.k0s()()),2&r){const M=e.sdS(15);e.R7$(3),e.SpI(" ",d.title," "),e.R7$(),e.Y8G("ngIf",d.deprecated),e.R7$(),e.Y8G("ngIf",d.description),e.R7$(2),e.Y8G("scrollspy",M)}},dependencies:[n.bT,h,c,s.Wk,s.wQ],encapsulation:2})}return t})()},2985:(m,u,a)=>{a.d(u,{S:()=>h});const e=a(97932),n=new Map;for(let c of e.list)n.set(c.url,c);class h{title="";constructor(C){let i=n.get(C);this.populateComponentDetails(i.text)}populateComponentDetails(C){this.title=C}}},91095:(m,u,a)=>{a.d(u,{P:()=>C});var e=a(60177),n=a(5928),s=a(62491),h=a(36366),c=a(93953);let C=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=c.$C({type:i});static \u0275inj=c.G2t({imports:[e.MD,n.iI,s.PuD,h.P8i]})}return i})()},54627:(m,u,a)=>{a.d(u,{T:()=>F});var e=a(60177),n=a(63324),s=a(7827),h=a(947);const C=["applications",(0,h.s)({outline:'<path d="M10 10H4V12H12V4H10V10ZM10 20H4V22H12V14H10V20ZM20 20H14V22H22V14H20V20ZM10 30H4V32H12V24H10V30ZM20 30H14V32H22V24H20V30ZM30 4V10H24V12H32V4H30ZM20 10H14V12H22V4H20V10ZM30 20H24V22H32V14H30V20ZM30 30H24V32H32V24H30V30Z"/>',outlineAlerted:'<path d="M26.9039 1.64621L21.2222 11.1159C20.9526 11.4984 20.9281 11.9949 21.1588 12.4005C21.3896 12.806 21.8363 13.0519 22.3148 13.0367H33.6881C34.1666 13.0519 34.6134 12.806 34.8441 12.4005C35.0748 11.9949 35.0503 11.4984 34.7808 11.1159L29.0991 1.64621C28.8711 1.26913 28.4532 1.03735 28.0015 1.03735C27.5497 1.03735 27.1319 1.26913 26.9039 1.64621Z"/><path d="M30 15.0367H32V22H24V20H30V15.0367Z"/><path d="M20 14.1312C20.5436 14.6495 21.2526 14.9641 22 15.026V22H14V20H20V14.1312Z"/><path d="M22 5.9323V4H20V9.26568L22 5.9323Z"/><path d="M19.5594 10L19.5362 10.0387C19.1449 10.6284 18.9663 11.3177 19.0073 12H14V10H19.5594Z"/><path d="M4 10H10V4H12V12H4V10Z"/><path d="M4 20H10V14H12V22H4V20Z"/><path d="M4 30H10V24H12V32H4V30Z"/><path d="M14 30H20V24H22V32H14V30Z"/><path d="M24 30H30V24H32V32H24V30Z"/>',outlineBadged:'<path d="M30 11C32.7614 11 35 8.76142 35 6C35 3.23858 32.7614 1 30 1C27.2386 1 25 3.23858 25 6C25 8.76142 27.2386 11 30 11Z"/><path d="M24.2547 10C24.8179 10.8074 25.5469 11.4905 26.3924 12H24V10H24.2547Z"/><path d="M4 10H10V4H12V12H4V10Z"/><path d="M4 20H10V14H12V22H4V20Z"/><path d="M14 20H20V14H22V22H14V20Z"/><path d="M4 30H10V24H12V32H4V30Z"/><path d="M14 30H20V24H22V32H14V30Z"/><path d="M14 10H20V4H22V12H14V10Z"/><path d="M24 20H30V14H32V22H24V20Z"/><path d="M24 30H30V24H32V32H24V30Z"/>',solid:'<path d="M4 12H12V4H4V12ZM14 32H22V24H14V32ZM4 32H12V24H4V32ZM4 22H12V14H4V22ZM24 32H32V24H24V32ZM24 4V12H32V4H24ZM24 22H32V14H24V22ZM14 22H22V14H14V22ZM14 12H22V4H14V12Z"/>',solidAlerted:'<path d="M26.9039 1.64621L21.2222 11.1159C20.9526 11.4984 20.9281 11.9949 21.1588 12.4005C21.3896 12.806 21.8363 13.0519 22.3148 13.0367H33.6881C34.1666 13.0519 34.6134 12.806 34.8441 12.4005C35.0748 11.9949 35.0503 11.4984 34.7808 11.1159L29.0991 1.64621C28.8711 1.26913 28.4532 1.03735 28.0015 1.03735C27.5497 1.03735 27.1319 1.26913 26.9039 1.64621Z"/><path d="M24 15.0367H32V22H24V15.0367Z"/><path d="M19.87 14C20.4279 14.5963 21.1914 14.959 22 15.026V22H14V14H19.87Z"/><path d="M22 5.9323L19.5362 10.0387C19.1449 10.6284 18.9663 11.3177 19.0073 12H14V4H22V5.9323Z"/><path d="M12 12H4V4H12V12Z"/><path d="M22 32H14V24H22V32Z"/><path d="M12 32H4V24H12V32Z"/><path d="M12 22H4V14H12V22Z"/><path d="M32 32H24V24H32V32Z"/>',solidBadged:'<path d="M30 11C32.7614 11 35 8.76142 35 6C35 3.23858 32.7614 1 30 1C27.2386 1 25 3.23858 25 6C25 8.76142 27.2386 11 30 11Z"/><path d="M24 9.60759C24.5901 10.5869 25.4131 11.4099 26.3924 12H24V9.60759Z"/><path d="M12 12H4V4H12V12Z"/><path d="M22 32H14V24H22V32Z"/><path d="M12 32H4V24H12V32Z"/><path d="M12 22H4V14H12V22Z"/><path d="M32 32H24V24H32V32Z"/><path d="M32 22H24V14H32V22Z"/><path d="M22 22H14V14H22V22Z"/><path d="M22 12H14V4H22V12Z"/>'})];var i=a(72699);const l=["user",(0,h.s)({outline:'<path d="M18 18.0451C21.86 18.0451 25 14.895 25 11.0226C25 7.15013 21.86 4 18 4C14.14 4 11 7.15013 11 11.0226C11 14.895 14.14 18.0451 18 18.0451ZM18 6.00645C20.76 6.00645 23 8.25367 23 11.0226C23 13.7915 20.76 16.0387 18 16.0387C15.24 16.0387 13 13.7915 13 11.0226C13 8.25367 15.24 6.00645 18 6.00645ZM29.79 24.8169C29.64 24.6263 26.03 20.0516 18 20.0516C9.97 20.0516 6.36 24.6263 6.21 24.8169C6.08 24.9875 6 25.2082 6 25.4289V30.9968C6 31.5485 6.45 32 7 32C7.55 32 8 31.5485 8 30.9968V25.8101C8.81 24.9373 11.93 22.058 18 22.058C24.07 22.058 27.2 24.9373 28 25.8101V30.9968C28 31.5485 28.45 32 29 32C29.55 32 30 31.5485 30 30.9968V25.4289C30 25.2082 29.93 24.9875 29.79 24.8169Z"/>',outlineAlerted:'<path d="M26.9039 1.64621L21.2222 11.1159C20.9526 11.4984 20.9281 11.9949 21.1588 12.4005C21.3896 12.806 21.8363 13.0519 22.3148 13.0367H33.6881C34.1666 13.0519 34.6134 12.806 34.8441 12.4005C35.0748 11.9949 35.0503 11.4984 34.7808 11.1159L29.0991 1.64621C28.8711 1.26913 28.4532 1.03735 28.0015 1.03735C27.5497 1.03735 27.1319 1.26913 26.9039 1.64621Z"/><path d="M22.2786 5.46793C21.0948 4.54804 19.61 4 18 4C14.14 4 11 7.15013 11 11.0226C11 14.895 14.14 18.0451 18 18.0451C20.3734 18.0451 22.4746 16.8542 23.741 15.0367H22.3395C21.954 15.0444 21.5735 14.9845 21.2148 14.8636C20.3455 15.5968 19.2238 16.0387 18 16.0387C15.24 16.0387 13 13.7915 13 11.0226C13 8.25367 15.24 6.00645 18 6.00645C19.2349 6.00645 20.3658 6.45636 21.2384 7.2016L22.2786 5.46793Z"/><path d="M18 20.0516C26.03 20.0516 29.64 24.6263 29.79 24.8169C29.93 24.9875 30 25.2082 30 25.4289V30.9968C30 31.5485 29.55 32 29 32C28.45 32 28 31.5485 28 30.9968V25.8101C27.2 24.9373 24.07 22.058 18 22.058C11.93 22.058 8.81 24.9373 8 25.8101V30.9968C8 31.5485 7.55 32 7 32C6.45 32 6 31.5485 6 30.9968V25.4289C6 25.2082 6.08 24.9875 6.21 24.8169C6.36 24.6263 9.97 20.0516 18 20.0516Z"/>',outlineBadged:'<path d="M30 11C32.7614 11 35 8.76142 35 6C35 3.23858 32.7614 1 30 1C27.2386 1 25 3.23858 25 6C25 8.76142 27.2386 11 30 11Z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M23.0009 5.36327C23.0304 7.22515 23.7869 8.91048 24.9989 10.1479C24.9996 10.1894 25 10.2309 25 10.2726C25 14.145 21.86 17.2951 18 17.2951C14.14 17.2951 11 14.145 11 10.2726C11 6.40013 14.14 3.25 18 3.25C19.9573 3.25 21.7294 4.05993 23.0009 5.36327ZM23 10.2726C23 7.50367 20.76 5.25645 18 5.25645C15.24 5.25645 13 7.50367 13 10.2726C13 13.0415 15.24 15.2887 18 15.2887C20.76 15.2887 23 13.0415 23 10.2726Z"/><path d="M18 19.3016C26.03 19.3016 29.64 23.8763 29.79 24.0669C29.93 24.2375 30 24.4582 30 24.6789V30.2468C30 30.7985 29.55 31.25 29 31.25C28.45 31.25 28 30.7985 28 30.2468V25.0601C27.2 24.1873 24.07 21.308 18 21.308C11.93 21.308 8.81 24.1873 8 25.0601V30.2468C8 30.7985 7.55 31.25 7 31.25C6.45 31.25 6 30.7985 6 30.2468V24.6789C6 24.4582 6.08 24.2375 6.21 24.0669C6.36 23.8763 9.97 19.3016 18 19.3016Z"/>',solid:'<path d="M18 18.0451C21.86 18.0451 25 14.895 25 11.0226C25 7.15013 21.86 4 18 4C14.14 4 11 7.15013 11 11.0226C11 14.895 14.14 18.0451 18 18.0451ZM29.79 24.8169C29.64 24.6263 26.03 20.0516 18 20.0516C9.97 20.0516 6.36 24.6263 6.21 24.8169C6.08 24.9875 6 25.2082 6 25.4289V30.9968C6 31.5485 6.45 32 7 32H29C29.55 32 30 31.5485 30 30.9968V25.4289C30 25.2082 29.93 24.9875 29.79 24.8169Z"/>',solidAlerted:'<path d="M26.9039 1.64621L21.2222 11.1159C20.9526 11.4984 20.9281 11.9949 21.1588 12.4005C21.3896 12.806 21.8363 13.0519 22.3148 13.0367H33.6881C34.1666 13.0519 34.6134 12.806 34.8441 12.4005C35.0748 11.9949 35.0503 11.4984 34.7808 11.1159L29.0991 1.64621C28.8711 1.26913 28.4532 1.03735 28.0015 1.03735C27.5497 1.03735 27.1319 1.26913 26.9039 1.64621Z"/><path d="M22.2786 5.46793L19.5362 10.0387C18.8703 11.0423 18.8204 12.3342 19.4206 13.3893C20.0233 14.4489 21.1577 15.0604 22.3395 15.0367H23.741C22.4746 16.8542 20.3734 18.0451 18 18.0451C14.14 18.0451 11 14.895 11 11.0226C11 7.15013 14.14 4 18 4C19.61 4 21.0948 4.54804 22.2786 5.46793Z"/><path d="M18 20.0516C26.03 20.0516 29.64 24.6263 29.79 24.8169C29.93 24.9875 30 25.2082 30 25.4289V30.9968C30 31.5485 29.55 32 29 32H7C6.45 32 6 31.5485 6 30.9968V25.4289C6 25.2082 6.08 24.9875 6.21 24.8169C6.36 24.6263 9.97 20.0516 18 20.0516Z"/>',solidBadged:'<path d="M30 11C32.7614 11 35 8.76142 35 6C35 3.23858 32.7614 1 30 1C27.2386 1 25 3.23858 25 6C25 8.76142 27.2386 11 30 11Z"/><path d="M23.0009 6.11327C23.0304 7.97515 23.7869 9.66048 24.9989 10.8979C24.9996 10.9394 25 10.9809 25 11.0226C25 14.895 21.86 18.0451 18 18.0451C14.14 18.0451 11 14.895 11 11.0226C11 7.15013 14.14 4 18 4C19.9573 4 21.7294 4.80993 23.0009 6.11327Z"/><path d="M18 20.0516C26.03 20.0516 29.64 24.6263 29.79 24.8169C29.93 24.9875 30 25.2082 30 25.4289V30.9968C30 31.5485 29.55 32 29 32H7C6.45 32 6 31.5485 6 30.9968V25.4289C6 25.2082 6.08 24.9875 6.21 24.8169C6.36 24.6263 9.97 20.0516 18 20.0516Z"/>'})];var t=a(93953),H=a(5928),o=a(62491),r=a(36366);function d(p,Z){if(1&p){const V=t.RV6();t.j41(0,"button",33),t.bIt("click",function(){const E=t.eBV(V).$implicit,L=t.XpG(2);return t.Njj(L.setTheme(E))}),t.EFF(1),t.k0s()}if(2&p){const V=Z.$implicit;t.R7$(),t.SpI(" ",V.name," ")}}function M(p,Z){if(1&p&&(t.j41(0,"clr-dropdown-menu",31),t.DNE(1,d,2,1,"button",32),t.k0s()),2&p){const V=t.XpG();t.R7$(),t.Y8G("ngForOf",V.themes)}}function g(p,Z){1&p&&(t.j41(0,"clr-dropdown-menu",31)(1,"a",34),t.EFF(2,"Application 1"),t.k0s(),t.j41(3,"a",34),t.EFF(4,"Application 2"),t.k0s(),t.j41(5,"a",34),t.EFF(6,"Application 3"),t.k0s()())}function k(p,Z){1&p&&(t.j41(0,"clr-dropdown-menu",31)(1,"h4",35),t.EFF(2,"John Doe"),t.k0s(),t.j41(3,"a",34),t.EFF(4,"Support"),t.k0s(),t.j41(5,"a",34),t.EFF(6,"User Settings"),t.k0s(),t.j41(7,"a",34),t.EFF(8,"Logout"),t.k0s()())}n.h.addIcons(s.F,C,i.D,l);let F=(()=>{class p{document;themes=[{name:"PHS",cdsTheme:"phs"},{name:"Clarity (light)",cdsTheme:"light"},{name:"Clarity (dark)",cdsTheme:"dark"}];constructor(V){this.document=V}setTheme(V){this.document.body.setAttribute("cds-theme",V.cdsTheme)}static \u0275fac=function(v){return new(v||p)(t.rXU(e.qQ))};static \u0275cmp=t.VBU({type:p,selectors:[["clr-demo-menu"]],decls:52,vars:1,consts:[[1,"header-5"],[1,"branding"],["routerLink","/",1,"logo-and-title"],[1,"cds-icon","clarity-logo"],[1,"title"],[1,"divider"],[1,"header-nav",3,"clr-nav-level"],[1,"header-overflow"],["routerLink","/full-page-layouts/basepage-layout-command","routerLinkActive","active",1,"nav-link"],[1,"nav-text"],["clrTitle","Layouts","routerLinkActive","active"],["routerLink","/full-page-layouts/basepage-layout","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],["routerLink","/full-page-layouts/sidebarpage-layout","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],["routerLink","/full-page-layouts/content-panel","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],["routerLink","/full-page-layouts/action-panel","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],["routerLink","/full-page-layouts/flow-bar","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],["routerLink","/full-page-layouts/sticky-footer","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],["routerLink","/full-page-layouts/content-with-history","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],["clrTitle","Forms","routerLinkActive","active"],["routerLink","/full-page-layouts/basepage-layout-sub1/forms","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],["routerLink","/full-page-layouts/basepage-layout-sub1/ves","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],["clrTitle","Menu 4","routerLinkActive","active"],["routerLink","/full-page-layouts/basepage-layout-sub2/five","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],["routerLink","/full-page-layouts/basepage-layout-sub2/six","routerLinkActive","active","clrMainNavGroupItem","",1,"nav-link"],[1,"header-actions"],["type","button","clrDropdownTrigger","",1,"nav-icon","dropdown-toggle"],["shape","cog"],["clrPosition","bottom-right",4,"clrIfOpen"],["shape","applications","solid",""],["shape","angle","direction","down"],["shape","user"],["clrPosition","bottom-right"],["type","button","clrDropdownItem","",3,"click",4,"ngFor","ngForOf"],["type","button","clrDropdownItem","",3,"click"],["onClick","return false;","href","#","clrDropdownItem",""],[1,"dropdown-header"]],template:function(v,E){1&v&&(t.j41(0,"clr-header",0)(1,"div",1)(2,"a",2),t.nrm(3,"span",3),t.j41(4,"span",4),t.EFF(5,"Project title"),t.k0s()()(),t.nrm(6,"div",5),t.j41(7,"div",6)(8,"div",7)(9,"a",8)(10,"span",9),t.EFF(11,"Command bar"),t.k0s()(),t.j41(12,"clr-main-nav-group",10)(13,"a",11),t.EFF(14,"Base Pagelayout"),t.k0s(),t.j41(15,"a",12),t.EFF(16,"Sidebar Pagelayout"),t.k0s(),t.j41(17,"a",13),t.EFF(18,"Content Panel Layout"),t.k0s(),t.j41(19,"a",14),t.EFF(20,"Action Panel Layout"),t.k0s(),t.j41(21,"a",15),t.EFF(22,"Flow Bar Layout"),t.k0s(),t.j41(23,"a",16),t.EFF(24,"Sticky Footer Layout"),t.k0s(),t.j41(25,"a",17),t.EFF(26,"Content Panel Layout with History"),t.k0s()(),t.j41(27,"clr-main-nav-group",18)(28,"a",19),t.EFF(29,"Form Layout"),t.k0s(),t.j41(30,"a",20),t.EFF(31,"View Edit Section"),t.k0s()(),t.j41(32,"clr-main-nav-group",21)(33,"a",22),t.EFF(34,"Submenu 5"),t.k0s(),t.j41(35,"a",23),t.EFF(36,"Submenu 6"),t.k0s()()()(),t.j41(37,"div",24)(38,"clr-dropdown")(39,"button",25),t.nrm(40,"cds-icon",26),t.k0s(),t.DNE(41,M,2,1,"clr-dropdown-menu",27),t.k0s(),t.j41(42,"clr-dropdown")(43,"button",25),t.nrm(44,"cds-icon",28)(45,"cds-icon",29),t.k0s(),t.DNE(46,g,7,0,"clr-dropdown-menu",27),t.k0s(),t.j41(47,"clr-dropdown")(48,"button",25),t.nrm(49,"cds-icon",30)(50,"cds-icon",29),t.k0s(),t.DNE(51,k,9,0,"clr-dropdown-menu",27),t.k0s()()()),2&v&&(t.R7$(7),t.Y8G("clr-nav-level",1))},dependencies:[e.Sq,H.Wk,H.wQ,o.BlU,o.vEc,o.Z2Z,o.ndX,o.ZNj,o.TZW,o.e3J,o.jWx,o.wIE,r.xmQ,r.Mcz,r.ohx],encapsulation:2})}return p})()},87620:(m,u,a)=>{a.d(u,{z:()=>C});var e=a(60177),n=a(93953);let s=(()=>{class i{_el;renderer;platformId;_highlight="";constructor(l,t,H){this._el=l,this.renderer=t,this.platformId=H}ngAfterContentInit(){this.redraw()}redraw(){Prism&&this._el&&this._el.nativeElement&&(0,e.UE)(this.platformId)&&Prism.highlightElement(this._el.nativeElement)}set highlight(l){l&&""!==l.trim()&&(this._highlight=l,this.renderer.addClass(this._el.nativeElement,this._highlight))}get highlight(){return this._highlight}static \u0275fac=function(t){return new(t||i)(n.rXU(n.aKT),n.rXU(n.sFG),n.rXU(n.Agw))};static \u0275dir=n.FsC({type:i,selectors:[["code","clr-code-highlight",""]],inputs:{highlight:[0,"clr-code-highlight","highlight"]}})}return i})();function h(i,f){if(1&i&&(n.qex(0),n.j41(1,"pre")(2,"code",1),n.EFF(3),n.k0s()(),n.bVm()),2&i){const l=n.XpG();n.R7$(2),n.Y8G("clr-code-highlight","language-"+l.language),n.R7$(),n.JRh(l.code.trim())}}function c(i,f){if(1&i&&(n.qex(0),n.j41(1,"pre")(2,"code",2),n.EFF(3),n.k0s()(),n.bVm()),2&i){const l=n.XpG();n.R7$(3),n.JRh(l.code.trim())}}let C=(()=>{class i{codeHighlight;code;language="html";disablePrism=!1;ngAfterViewInit(){this.codeHighlight&&this.codeHighlight.redraw()}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=n.VBU({type:i,selectors:[["clr-code-snippet"]],viewQuery:function(t,H){if(1&t&&n.GBs(s,5),2&t){let o;n.mGM(o=n.lsd())&&(H.codeHighlight=o.first)}},inputs:{code:[0,"clrCode","code"],language:[0,"clrLanguage","language"],disablePrism:[0,"clrDisablePrism","disablePrism"]},decls:2,vars:2,consts:[[4,"ngIf"],[3,"clr-code-highlight"],[1,"clr-code"]],template:function(t,H){1&t&&n.DNE(0,h,4,2,"ng-container",0)(1,c,4,1,"ng-container",0),2&t&&(n.Y8G("ngIf",!H.disablePrism),n.R7$(),n.Y8G("ngIf",H.disablePrism))},dependencies:[e.bT,s],encapsulation:2})}return i})()},25690:(m,u,a)=>{a.d(u,{i:()=>s});const s=["display",(0,a(947).s)({outline:'<path d="M24.9928 30H10.9972C10.4474 30 9.9975 30.45 9.9975 31C9.9975 31.55 10.4474 32 10.9972 32H24.9928C25.5426 32 25.9925 31.55 25.9925 31C25.9925 30.45 25.5426 30 24.9928 30ZM7.59825 9.6H28.1218L29.9313 8H5.99875V24H7.59825V9.6ZM32.4905 4H3.49953C2.66979 4 2 4.67 2 5.5V26.5C2 27.33 2.66979 28 3.49953 28H11.627H13.8063H22.1937H24.373H32.5005C33.3302 28 34 27.33 34 26.5V5.5C34 4.67 33.3302 4 32.5005 4H32.4905ZM31.9906 26H3.99938V6H31.9906V26Z"/>',outlineAlerted:'<path d="M26.9039 1.64621L21.2222 11.1159C20.9526 11.4984 20.9281 11.9949 21.1588 12.4005C21.3896 12.806 21.8363 13.0519 22.3148 13.0367H33.6881C34.1666 13.0519 34.6134 12.806 34.8441 12.4005C35.0748 11.9949 35.0503 11.4984 34.7808 11.1159L29.0991 1.64621C28.8711 1.26913 28.4532 1.03735 28.0015 1.03735C27.5497 1.03735 27.1319 1.26913 26.9039 1.64621Z"/><path d="M23.1594 4H3.49953C2.66979 4 2 4.67 2 5.5V26.5C2 27.33 2.66979 28 3.49953 28H32.5005C33.3302 28 34 27.33 34 26.5V15.0263C33.8886 15.0354 33.7763 15.0389 33.6637 15.0367H31.9906V26H3.99938V6H21.9594L23.1594 4Z"/><path d="M20.7594 8H5.99875V24H7.59825V9.6H19.7994L20.7594 8Z"/><path d="M10.9972 30H24.9928C25.5426 30 25.9925 30.45 25.9925 31C25.9925 31.55 25.5426 32 24.9928 32H10.9972C10.4474 32 9.9975 31.55 9.9975 31C9.9975 30.45 10.4474 30 10.9972 30Z"/>',outlineBadged:'<path d="M30 11C32.7614 11 35 8.76142 35 6C35 3.23858 32.7614 1 30 1C27.2386 1 25 3.23858 25 6C25 8.76142 27.2386 11 30 11Z"/><path d="M23.2899 8C23.4585 8.56674 23.6971 9.1034 23.9954 9.6H7.59825V24H5.99875V8H23.2899Z"/><path d="M31.9906 12.7129V26H3.99938V6H23C23 5.30503 23.1013 4.63371 23.2899 4H3.49953C2.66979 4 2 4.67 2 5.5V26.5C2 27.33 2.66979 28 3.49953 28H32.5005C33.3302 28 34 27.33 34 26.5V11.7453C33.3934 12.1684 32.7166 12.498 31.9906 12.7129Z"/><path d="M10.9972 30H24.9928C25.5426 30 25.9925 30.45 25.9925 31C25.9925 31.55 25.5426 32 24.9928 32H10.9972C10.4474 32 9.9975 31.55 9.9975 31C9.9975 30.45 10.4474 30 10.9972 30Z"/>',solid:'<path d="M24.9928 30H10.9972C10.4474 30 9.9975 30.45 9.9975 31C9.9975 31.55 10.4474 32 10.9972 32H24.9928C25.5426 32 25.9925 31.55 25.9925 31C25.9925 30.45 25.5426 30 24.9928 30ZM32.4905 4H3.49953C2.66979 4 2 4.67 2 5.5V26.5C2 27.33 2.66979 28 3.49953 28H11.627H13.8063H22.1937H24.373H32.5005C33.3302 28 34 27.33 34 26.5V5.5C34 4.67 33.3302 4 32.5005 4H32.4905ZM29.9913 24H5.99875V8H29.9913V24Z"/>',solidAlerted:'<path d="M26.9039 1.64621L21.2222 11.1159C20.9526 11.4984 20.9281 11.9949 21.1588 12.4005C21.3896 12.806 21.8363 13.0519 22.3148 13.0367H33.6881C34.1666 13.0519 34.6134 12.806 34.8441 12.4005C35.0748 11.9949 35.0503 11.4984 34.7808 11.1159L29.0991 1.64621C28.8711 1.26913 28.4532 1.03735 28.0015 1.03735C27.5497 1.03735 27.1319 1.26913 26.9039 1.64621Z"/><path d="M23.1528 4H3.49953C2.66979 4 2 4.67 2 5.5V26.5C2 27.33 2.66979 28 3.49953 28H32.5005C33.3302 28 34 27.33 34 26.5V15.0255C33.8854 15.0352 33.7698 15.039 33.6538 15.0367H29.9913V24H5.99875V8H20.7535L23.1528 4Z"/><path d="M10.9972 30H24.9928C25.5426 30 25.9925 30.45 25.9925 31C25.9925 31.55 25.5426 32 24.9928 32H10.9972C10.4474 32 9.9975 31.55 9.9975 31C9.9975 30.45 10.4474 30 10.9972 30Z"/>',solidBadged:'<path d="M30 11C32.7614 11 35 8.76142 35 6C35 3.23858 32.7614 1 30 1C27.2386 1 25 3.23858 25 6C25 8.76142 27.2386 11 30 11Z"/><path d="M34 11.7383C32.8646 12.5335 31.4824 13 29.9913 13V24H5.99875V8H23.2832C23.0947 7.36629 22.9934 6.69497 22.9934 6C22.9934 5.30503 23.0947 4.63371 23.2832 4H3.49953C2.66979 4 2 4.67 2 5.5V26.5C2 27.33 2.66979 28 3.49953 28H32.5005C33.3302 28 34 27.33 34 26.5V11.7383Z"/><path d="M10.9972 30H24.9928C25.5426 30 25.9925 30.45 25.9925 31C25.9925 31.55 25.5426 32 24.9928 32H10.9972C10.4474 32 9.9975 31.55 9.9975 31C9.9975 30.45 10.4474 30 10.9972 30Z"/>'})]}}]);