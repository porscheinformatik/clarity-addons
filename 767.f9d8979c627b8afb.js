"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[767],{83767:(A,s,n)=>{n.r(s),n.d(s,{NavigationDemoModule:()=>U});var u=n(69808),r=n(66630),c=n(11489),e=n(31223),d=n(29031),l=n(65909),g=n(71884);let Z=(()=>{class t extends c.K{constructor(){super("navigation"),this.contentPanelCodeExample='\n<div class="btn-group">\n    <button class="btn" (click)="contentPanel.toggle()">Show/Hide</button>\n</div>\n\n<clr-content-panel-container>\n    <h2>This is the page title</h2>\n    <span>This is the page content</span>\n    <clr-content-panel #contentPanel>\n        <ng-container clr-content-panel-title>Content Panel</ng-container>\n        <ng-container clr-content-panel-content>Content</ng-container>\n    </clr-content-panel>\n</clr-content-panel-container>\n',this.mainNavHtmlExample='\n<clr-main-nav-group clrTitle="Layouts" routerLinkActive="active">\n    <a class="nav-link" routerLink="/full-page-layouts/basepage-layout" routerLinkActive="active" clrMainNavGroupItem>Base Pagelayout</a>\n    <a class="nav-link" routerLink="/full-page-layouts/sidebarpage-layout" routerLinkActive="active" clrMainNavGroupItem>Sidebar Pagelayout</a>\n    <a class="nav-link" routerLink="/full-page-layouts/content-panel" routerLinkActive="active" clrMainNavGroupItem>Content Panel Layout</a>\n</clr-main-nav-group>\n'}}return t.\u0275fac=function(a){return new(a||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["clr-navigation-demo-docu"]],hostVars:4,hostBindings:function(a,i){2&a&&e.ekj("content-area",!0)("dox-content-panel",!0)},features:[e.qOj],decls:201,vars:3,consts:[[3,"title"],[1,"component-summary"],["id","design-guidelines"],[1,"list"],["id","code-examples"],["id","examples"],["shape","display"],["routerLink","/full-page-layouts/content-panel","routerLinkActive","active"],[1,"clr-code"],[3,"clrCode"],["id","generic-pager-header",1,"component-summary"],["href","https://clarity.design/documentation/navigation"],["href","https://clarity.design/documentation/header"],["href","https://material.io/design/components/bottom-navigation.html"],["href","https://material.io/design/components/navigation-drawer.html"],["routerLink","/full-page-layouts/basepage-layout","routerLinkActive","active",1,"nav-link"],[1,"nav-text"]],template:function(a,i){1&a&&(e.TgZ(0,"clr-doc-wrapper",0)(1,"article")(2,"h2"),e._uU(3,"Content Panel"),e.qZA(),e.TgZ(4,"h5",1),e._uU(5," The Content Panel provides additional, in most cases contextual information to the content-area. "),e.qZA(),e.TgZ(6,"h3"),e._uU(7,"Responsive Bahavior"),e.qZA(),e.TgZ(8,"p"),e._uU(9," The sidebar uses on mobile devices the full page width. It is displayed as modal layer above the main content on larger screens. On medium sized desktops and above, the sidebar is a column next to the content. Note that it is always possible to hide or display the panel. "),e.qZA(),e.TgZ(10,"div",2)(11,"h3"),e._uU(12,"Usage"),e.qZA(),e.TgZ(13,"ul",3)(14,"li"),e._uU(15,"Use to display supplemental content and features"),e.qZA()(),e.TgZ(16,"h3"),e._uU(17,"Behavior"),e.qZA(),e.TgZ(18,"ul",3)(19,"li"),e._uU(20," The content panel is not always visible, it appears on the right side next to the content-area and can be shown or hidden according to users needs. "),e.qZA()(),e.TgZ(21,"h3"),e._uU(22,"Responsive Behavior"),e.qZA(),e.TgZ(23,"p"),e._uU(24,"\u22651200 px (Desktop, fullscreen)"),e.qZA(),e.TgZ(25,"ul",3)(26,"li"),e._uU(27,"Content panel is displayed on the right-side next to the content-area"),e.qZA(),e.TgZ(28,"li"),e._uU(29,"The content panel remains visible while the user interacts with the primary content."),e.qZA(),e.TgZ(30,"li"),e._uU(31," According to business needs the content panel can be shown automatically on resize or on user interaction, depending whether the content area or the content panel poses more important information to the user. "),e.qZA()(),e.TgZ(32,"p"),e._uU(33,"\u2265768 px (Tablet, landscape)"),e.qZA(),e.TgZ(34,"ul",3)(35,"li"),e._uU(36," The content panel is displayed on the right-side overlapping the content-area and invoking a backdrop over the content-area. "),e.qZA()(),e.TgZ(37,"p"),e._uU(38,"default: \u2264 768px (Tablet, portrait)"),e.qZA(),e.TgZ(39,"ul",3)(40,"li"),e._uU(41,"The content panel is shown maximized, consuming the content-area's space."),e.qZA()()(),e.TgZ(42,"div",4)(43,"h3",5),e._uU(44,"Code & Examples"),e.qZA(),e.TgZ(45,"h4"),e._uU(46,"Demo"),e.qZA(),e.TgZ(47,"div"),e._UZ(48,"clr-icon",6),e._uU(49,"\xa0 "),e.TgZ(50,"a",7)(51,"span"),e._uU(52,"Base Pagelayout with Content Panel"),e.qZA()()(),e.TgZ(53,"p"),e._uU(54," When implementing a content panel on your page, you will want to replace your default container div with a "),e.TgZ(55,"code",8),e._uU(56,"clr-content-panel-container"),e.qZA(),e._uU(57,". Inside of it, you can place any content you want to - including one or multiple "),e.TgZ(58,"code",8),e._uU(59,"clr-content-panel"),e.qZA(),e._uU(60,". "),e.qZA(),e.TgZ(61,"p"),e._uU(62," You can use the "),e.TgZ(63,"code",8),e._uU(64,"@ViewChild()"),e.qZA(),e._uU(65," annotation to get a reference of your "),e.TgZ(66,"code",8),e._uU(67,"ClrContentPanel"),e.qZA(),e._uU(68,", which will allow you to call its methods: "),e.qZA(),e.TgZ(69,"ul",3)(70,"li")(71,"code",8),e._uU(72,"open()"),e.qZA(),e._uU(73," - opens the content panel."),e.qZA(),e.TgZ(74,"li")(75,"code",8),e._uU(76,"close()"),e.qZA(),e._uU(77," - closes the content panel."),e.qZA(),e.TgZ(78,"li")(79,"code",8),e._uU(80,"toggle()"),e.qZA(),e._uU(81," - convenience method, either opens or closes the content panel depending on the current state of it. "),e.qZA(),e.TgZ(82,"li")(83,"code",8),e._uU(84,"isOpen()"),e.qZA(),e._uU(85," - returns true if the content panel is open."),e.qZA()(),e.TgZ(86,"p"),e._uU(87,"Following inputs & outputs are available:"),e.qZA(),e.TgZ(88,"ul",3)(89,"li")(90,"code",8),e._uU(91,"(clrClosed)"),e.qZA(),e._uU(92," is fired every time the content panel is closed."),e.qZA(),e.TgZ(93,"li")(94,"code",8),e._uU(95,"(clrOpened)"),e.qZA(),e._uU(96," is fired every time the content panel is opened."),e.qZA(),e.TgZ(97,"li"),e._uU(98," Adding any HTML with the attribute "),e.TgZ(99,"code",8),e._uU(100,"clr-content-panel-title"),e.qZA(),e._uU(101," will set the title of the content panel. "),e.qZA(),e.TgZ(102,"li"),e._uU(103," Adding any HTML with the attribute "),e.TgZ(104,"code",8),e._uU(105,"clr-content-panel-content"),e.qZA(),e._uU(106," will set the content of the content panel. "),e.qZA()(),e._UZ(107,"clr-code-snippet",9),e.qZA(),e.TgZ(108,"h2"),e._uU(109,"Main Navigation"),e.qZA(),e.TgZ(110,"h5",10),e._uU(111," The Main Navigation consists of a classic mainmenu bar with dropdown submenus. "),e.qZA(),e.TgZ(112,"div",2)(113,"h3"),e._uU(114,"Design Guidelines"),e.qZA(),e.TgZ(115,"p"),e._uU(116," The Main Navigation is an additional "),e.TgZ(117,"a",11),e._uU(118,"Navigation"),e.qZA(),e._uU(119," pattern, it enhances Clarity's "),e.TgZ(120,"a",12),e._uU(121,"Header Nav"),e.qZA(),e._uU(122," with dropdown submenus. "),e.qZA(),e.TgZ(123,"h3"),e._uU(124,"Behavior"),e.qZA(),e.TgZ(125,"ul",3)(126,"li"),e._uU(127," A Header Navigation item can either lead directly to a page, or contain a submenu dropdown that leads to a list of navigation links. "),e.qZA(),e.TgZ(128,"li"),e._uU(129," First and second navigation level are covered in the Main Navigation, responsive accessible in the hamburger-menu on the left side. "),e.qZA(),e.TgZ(130,"li"),e._uU(131,"Clarity supports responsive navigation for two levels of navigation."),e.qZA(),e.TgZ(132,"li"),e._uU(133,"Main Navigation adds a third responsive navigation level (see Sidebar Pagelayout)"),e.qZA()(),e.TgZ(134,"h3"),e._uU(135,"Use when"),e.qZA(),e.TgZ(136,"ul",3)(137,"li"),e._uU(138,"Your application is commonly used on desktop devices"),e.qZA(),e.TgZ(139,"li"),e._uU(140," You have a dense information hierarchy, and need more than two levels of navigation responsive accessible "),e.qZA()(),e.TgZ(141,"h3"),e._uU(142,"Don't use when"),e.qZA(),e.TgZ(143,"ul",3)(144,"li"),e._uU(145,"You are building a MobileFirst application with a fairly flat information hierarchy"),e.qZA(),e.TgZ(146,"ul",3)(147,"li"),e._uU(148,"Consider using "),e.TgZ(149,"a",12),e._uU(150,"Header Nav"),e.qZA()(),e.TgZ(151,"li"),e._uU(152," Consider using Material Design for a MobileFirst approach: "),e.TgZ(153,"a",13),e._uU(154,"Bottom-navigation"),e.qZA(),e._uU(155," or "),e.TgZ(156,"a",14),e._uU(157,"navigation-drawer"),e.qZA(),e._uU(158," should be preferred. "),e.qZA()(),e.TgZ(159,"li"),e._uU(160,"Don't combine Main Navigation with Subnav Pattern."),e.qZA()()(),e.TgZ(161,"div",4)(162,"h3",5),e._uU(163,"Code & Examples"),e.qZA(),e.TgZ(164,"h4"),e._uU(165,"Demo"),e.qZA(),e.TgZ(166,"div"),e._UZ(167,"clr-icon",6),e._uU(168,"\xa0 "),e.TgZ(169,"a",15)(170,"span",16),e._uU(171,"Main Navigation in Base Pagelayout"),e.qZA()()(),e.TgZ(172,"p"),e._uU(173,"Following interactions are available:"),e.qZA(),e.TgZ(174,"ul")(175,"li"),e._uU(176,"To define the title of the group add a "),e.TgZ(177,"code",8),e._uU(178,"[clrTitle]"),e.qZA(),e._uU(179," input to the component."),e.qZA(),e.TgZ(180,"li"),e._uU(181," To add keyboard navigation to the elements in a group add "),e.TgZ(182,"code",8),e._uU(183,"clrMainNavGroupItem"),e.qZA(),e._uU(184," to every navigatable item. "),e.qZA()(),e.TgZ(185,"p"),e._uU(186," It is crucial to set "),e.TgZ(187,"code",8),e._uU(188,'routerLinkActive="active"'),e.qZA(),e._uU(189," on the component itself, to highlight the title as soon as a sublink is active. "),e.qZA(),e.TgZ(190,"p"),e._uU(191," On the links itself the class "),e.TgZ(192,"code",8),e._uU(193,"nav-link"),e.qZA(),e._uU(194," has to be set for correct styling. Furthermore "),e.TgZ(195,"code",8),e._uU(196,'routerLinkActive="active"'),e.qZA(),e._uU(197," should be set to highlight the links in the menu when they are active. "),e.qZA(),e.TgZ(198,"p"),e._uU(199,"Examples can be found in all of the page layouts. Sample usage shown below:"),e.qZA(),e._UZ(200,"clr-code-snippet",9),e.qZA()()()),2&a&&(e.Q6J("title",i.title),e.xp6(107),e.Q6J("clrCode",i.contentPanelCodeExample),e.xp6(93),e.Q6J("clrCode",i.mainNavHtmlExample))},directives:[d.k,r.qvL,l.yS,l.Od,g.O],encapsulation:2}),t})();var v=n(62678),m=n(24603);let U=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[u.ez,r.K6A,m.A,v.B,l.Bz.forChild([{path:"",component:Z}])]]}),t})()}}]);