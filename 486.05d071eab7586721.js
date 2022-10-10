"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[486],{68486:(b,a,t)=>{t.r(a),t.d(a,{TreetableDemoModule:()=>w});var u=t(69808),n=t(65909),c=t(21298),i=t(66630),g=t(24603),s=t(52382),T=t(62678),A=t(11489),l=t(31223),d=t(29031),U=t(71884);let p=(()=>{class e extends A.K{constructor(){super("treetable"),this.htmlExampleClickableRows="\n<clr-treetable>\n    <clr-tt-column>Name</clr-tt-column>\n    <clr-tt-column>Role</clr-tt-column>\n    <clr-tt-column>Random Number</clr-tt-column>\n    <clr-tt-column>Random Date</clr-tt-column>\n\n    <clr-tt-row>\n        <clr-tt-cell>David Wallace</clr-tt-cell>\n        <clr-tt-cell>CFO</clr-tt-cell>\n        <clr-tt-cell>2</clr-tt-cell>\n        <clr-tt-cell>2nd of August</clr-tt-cell>\n\n        <clr-tt-row>\n            <clr-tt-cell>Michael Scott</clr-tt-cell>\n            <clr-tt-cell>Regional Manager</clr-tt-cell>\n            <clr-tt-cell>19</clr-tt-cell>\n            <clr-tt-cell>3rd of April</clr-tt-cell>\n\n            <clr-tt-row>\n                <clr-tt-cell>Dwight K. Schrute</clr-tt-cell>\n                <clr-tt-cell>Assistant to the Regional Manager</clr-tt-cell>\n                <clr-tt-cell>290</clr-tt-cell>\n                <clr-tt-cell>17th of May</clr-tt-cell>\n            </clr-tt-row>\n            ...\n        </clr-tt-row>\n    </clr-tt-row>\n</clr-treetable>",this.htmlExampleClickableCaret='\n<clr-treetable [clrClickableRows]="false">\n    <clr-tt-column>Name</clr-tt-column>\n    <clr-tt-column>Role</clr-tt-column>\n    <clr-tt-column>Actor</clr-tt-column>\n\n    <clr-tt-row [clrExpanded]="true">\n        <clr-tt-cell>David Wallace</clr-tt-cell>\n        <clr-tt-cell>CFO</clr-tt-cell>\n        <clr-tt-cell><a target="_blank" href="https://www.google.com">Some actor</a></clr-tt-cell>\n    </clr-tt-row>\n    ...\n</clr-treetable>',this.htmlExampleCustomSize='\n<clr-treetable>\n    <clr-tt-column class="clr-col-9">Some column</clr-tt-column>\n    <clr-tt-column class="clr-col-3">Some other column</clr-tt-column>\n    <clr-tt-row clrExpandable="true">\n        ...\n    </clr-tt-row>\n</clr-treetable>',this.htmlExampleSingleRowAction='\n<clr-treetable>\n  <clr-tt-column>Some column</clr-tt-column>\n  <clr-tt-column>Some other column</clr-tt-column>\n  <clr-tt-row clrExpandable="true">\n    <clr-tt-action-overflow>\n      <button class="action-item">Test Action</button>\n    </clr-tt-action-overflow>\n    <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>\n    <clr-tt-cell>2</clr-tt-cell>\n    <clr-tt-row>\n      <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>\n      <clr-tt-cell>3</clr-tt-cell>\n    </clr-tt-row>\n  </clr-tt-row>\n  <clr-tt-row>\n    <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>\n    <clr-tt-cell>1</clr-tt-cell>\n  </clr-tt-row>\n</clr-treetable>\n'}}return e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=l.Xpm({type:e,selectors:[["clr-treetable-demo"]],hostVars:4,hostBindings:function(r,o){2&r&&l.ekj("content-area",!0)("dox-content-panel",!0)},features:[l.qOj],decls:535,vars:7,consts:[[3,"title"],[1,"component-summary"],["id","design-guidelines"],[1,"list"],["href","https://clarity.design/documentation/tree-view"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],["id","examples"],["clrExpandable","true"],[3,"clrCode"],[1,"clr-code"],[3,"clrClickableRows"],["clrExpandable","true",3,"clrExpanded"],["target","_blank","href","https://www.google.com"],[1,"action-item"],[1,"clr-col-9"],[1,"clr-col-3"]],template:function(r,o){1&r&&(l.TgZ(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),l._uU(3,"Treetables are for organizing hierarchical data with multiple columns."),l.qZA(),l.TgZ(4,"div",2)(5,"h3"),l._uU(6,"Use When"),l.qZA(),l.TgZ(7,"p"),l._uU(8," Use this component when you need to display a hierarchichal data structure with multiple columns per entry. Make sure all entries use the same columns. E.g. the parent has a name and a description column, the child cannot have a name and a date column. "),l.qZA(),l.TgZ(9,"h3"),l._uU(10,"Do not use"),l.qZA(),l.TgZ(11,"p"),l._uU(12,"Avoid using this component in any of the following cases:"),l.qZA(),l.TgZ(13,"ul",3)(14,"li"),l._uU(15,"You require using a pagination. The treetable does not support paging."),l.qZA(),l.TgZ(16,"li"),l._uU(17," The entries in your datastructure do not have multiple values (columns). Consider using a "),l.TgZ(18,"a",4),l._uU(19,"TreeView"),l.qZA(),l._uU(20,". "),l.qZA(),l.TgZ(21,"li"),l._uU(22," Your elements need to be sorted. Since the data-rows are indented, a change of the order would cause confusion. "),l.qZA()(),l.TgZ(23,"h3"),l._uU(24,"Behavior"),l.qZA(),l.TgZ(25,"p"),l._uU(26," Each entry can have none, one or multiple descendants. The first column of a descendant-row is indentend to visualize the hierarchy. Parent rows are collapsed, i.e. all children rows are hidden initially. To display the children the user can either click on the leading caret-icon or the whole parent row, depending on the row-selection mode. Avoid the row-selection mode when the row contains individually clickable items. "),l.qZA(),l.TgZ(27,"h4"),l._uU(28,"Sorting"),l.qZA(),l._uU(29," The treetable cannot be sorted by the user. Display the entries in alphabetical order. Consider collapsing either all or none of the parent nodes. "),l.TgZ(30,"h3"),l._uU(31,"Technical limitations"),l.qZA(),l.TgZ(32,"p"),l._uU(33,"Note that up to 6 levels of nesting are supported."),l.qZA(),l.TgZ(34,"h3"),l._uU(35,"Summary of Options"),l.qZA(),l.TgZ(36,"h4"),l._uU(37,"clr-treetable"),l.qZA(),l.TgZ(38,"table",5)(39,"thead")(40,"tr")(41,"th",6),l._uU(42,"Input/Output"),l.qZA(),l.TgZ(43,"th",7),l._uU(44,"Values"),l.qZA(),l.TgZ(45,"th",8),l._uU(46,"Default"),l.qZA(),l.TgZ(47,"th",6),l._uU(48,"Effect"),l.qZA()()(),l.TgZ(49,"tbody")(50,"tr")(51,"td",6)(52,"b"),l._uU(53,"[clrClickableRows]"),l.qZA(),l.TgZ(54,"div",9),l._uU(55,"Type: boolean"),l.qZA(),l.TgZ(56,"div",9),l._uU(57,"Default: true"),l.qZA()(),l.TgZ(58,"td",7),l._uU(59,"boolean"),l.qZA(),l.TgZ(60,"td",8),l._uU(61,"true"),l.qZA(),l.TgZ(62,"td",6),l._uU(63,"Sets the [clrClickable] for every row"),l.qZA()(),l.TgZ(64,"tr")(65,"td",6)(66,"b"),l._uU(67,"[clrHideHeader]"),l.qZA(),l.TgZ(68,"div",9),l._uU(69,"Type: boolean"),l.qZA(),l.TgZ(70,"div",9),l._uU(71,"Default: false"),l.qZA()(),l.TgZ(72,"td",7),l._uU(73,"boolean"),l.qZA(),l.TgZ(74,"td",8),l._uU(75,"false"),l.qZA(),l.TgZ(76,"td",6),l._uU(77,"Hides the header row"),l.qZA()()()(),l.TgZ(78,"h4"),l._uU(79,"clr-tt-row"),l.qZA(),l.TgZ(80,"table",5)(81,"thead")(82,"tr")(83,"th",6),l._uU(84,"Input/Output"),l.qZA(),l.TgZ(85,"th",7),l._uU(86,"Values"),l.qZA(),l.TgZ(87,"th",8),l._uU(88,"Default"),l.qZA(),l.TgZ(89,"th",6),l._uU(90,"Effect"),l.qZA()()(),l.TgZ(91,"tbody")(92,"tr")(93,"td",6)(94,"b"),l._uU(95,"[clrExpanded]"),l.qZA(),l.TgZ(96,"div",9),l._uU(97,"Type: boolean"),l.qZA(),l.TgZ(98,"div",9),l._uU(99,"Default: false"),l.qZA()(),l.TgZ(100,"td",7),l._uU(101,"boolean"),l.qZA(),l.TgZ(102,"td",8),l._uU(103,"false"),l.qZA(),l.TgZ(104,"td",6),l._uU(105,"Whether the row is expanded or not"),l.qZA()(),l.TgZ(106,"tr")(107,"td",6)(108,"b"),l._uU(109,"[clrClickable]"),l.qZA(),l.TgZ(110,"div",9),l._uU(111,"Type: boolean"),l.qZA(),l.TgZ(112,"div",9),l._uU(113,"Default: true"),l.qZA()(),l.TgZ(114,"td",7),l._uU(115,"boolean"),l.qZA(),l.TgZ(116,"td",8),l._uU(117,"true"),l.qZA(),l.TgZ(118,"td",6),l._uU(119,"Whether the whole row is clickable to expand it"),l.qZA()(),l.TgZ(120,"tr")(121,"td",6)(122,"b"),l._uU(123,"[clrExpandable]"),l.qZA(),l.TgZ(124,"div",9),l._uU(125,"Type: boolean"),l.qZA(),l.TgZ(126,"div",9),l._uU(127,"Default: false"),l.qZA()(),l.TgZ(128,"td",7),l._uU(129,"boolean"),l.qZA(),l.TgZ(130,"td",8),l._uU(131,"false"),l.qZA(),l.TgZ(132,"td",6),l._uU(133,"Whether the row is expandable (also shows caret icons)"),l.qZA()()()()(),l.TgZ(134,"div",10)(135,"h3"),l._uU(136,"Code & Examples"),l.qZA(),l.TgZ(137,"h4"),l._uU(138,"Treetable with clickable rows"),l.qZA(),l.TgZ(139,"p"),l._uU(140,"Click on a row to display its children."),l.qZA(),l.TgZ(141,"clr-treetable")(142,"clr-tt-column"),l._uU(143,"Name"),l.qZA(),l.TgZ(144,"clr-tt-column"),l._uU(145,"Role"),l.qZA(),l.TgZ(146,"clr-tt-column"),l._uU(147,"Random Number"),l.qZA(),l.TgZ(148,"clr-tt-column"),l._uU(149,"Random Date"),l.qZA(),l.TgZ(150,"clr-tt-row",11)(151,"clr-tt-cell"),l._uU(152,"David Wallace"),l.qZA(),l.TgZ(153,"clr-tt-cell"),l._uU(154,"CFO"),l.qZA(),l.TgZ(155,"clr-tt-cell"),l._uU(156,"2"),l.qZA(),l.TgZ(157,"clr-tt-cell"),l._uU(158,"2nd of August"),l.qZA(),l.TgZ(159,"clr-tt-row",11)(160,"clr-tt-cell"),l._uU(161,"Michael Scott"),l.qZA(),l.TgZ(162,"clr-tt-cell"),l._uU(163,"Regional Manager"),l.qZA(),l.TgZ(164,"clr-tt-cell"),l._uU(165,"19"),l.qZA(),l.TgZ(166,"clr-tt-cell"),l._uU(167,"3rd of April"),l.qZA(),l.TgZ(168,"clr-tt-row")(169,"clr-tt-cell"),l._uU(170,"Dwight K. Schrute"),l.qZA(),l.TgZ(171,"clr-tt-cell"),l._uU(172,"Assistant to the Regional Manager"),l.qZA(),l.TgZ(173,"clr-tt-cell"),l._uU(174,"290"),l.qZA(),l.TgZ(175,"clr-tt-cell"),l._uU(176,"17th of May"),l.qZA()(),l.TgZ(177,"clr-tt-row",11)(178,"clr-tt-cell"),l._uU(179,"Jim Halpert"),l.qZA(),l.TgZ(180,"clr-tt-cell"),l._uU(181,"Head of Sales"),l.qZA(),l.TgZ(182,"clr-tt-cell"),l._uU(183,"Lucky 7"),l.qZA(),l.TgZ(184,"clr-tt-cell"),l._uU(185,"21st of December"),l.qZA(),l.TgZ(186,"clr-tt-row")(187,"clr-tt-cell"),l._uU(188,"Andy Bernard"),l.qZA(),l._UZ(189,"clr-tt-cell"),l.TgZ(190,"clr-tt-cell"),l._uU(191,"13"),l.qZA(),l.TgZ(192,"clr-tt-cell"),l._uU(193,"1st of December"),l.qZA()(),l.TgZ(194,"clr-tt-row")(195,"clr-tt-cell"),l._uU(196,"Stanley Hudson"),l.qZA(),l._UZ(197,"clr-tt-cell"),l.TgZ(198,"clr-tt-cell"),l._uU(199,"3"),l.qZA(),l.TgZ(200,"clr-tt-cell"),l._uU(201,"15th of November"),l.qZA()(),l.TgZ(202,"clr-tt-row")(203,"clr-tt-cell"),l._uU(204,"Phyllis Vance"),l.qZA(),l._UZ(205,"clr-tt-cell")(206,"clr-tt-cell")(207,"clr-tt-cell"),l.qZA(),l.TgZ(208,"clr-tt-row")(209,"clr-tt-cell"),l._uU(210,"Todd Packer"),l.qZA(),l.TgZ(211,"clr-tt-cell"),l._uU(212,"The Packman"),l.qZA(),l.TgZ(213,"clr-tt-cell"),l._uU(214,"96"),l.qZA(),l.TgZ(215,"clr-tt-cell"),l._uU(216,"6th of September"),l.qZA()()(),l.TgZ(217,"clr-tt-row",11)(218,"clr-tt-cell"),l._uU(219,"Angela Martin"),l.qZA(),l.TgZ(220,"clr-tt-cell"),l._uU(221,"Head of Accounting"),l.qZA(),l.TgZ(222,"clr-tt-cell"),l._uU(223,"29"),l.qZA(),l.TgZ(224,"clr-tt-cell"),l._uU(225,"7th of September"),l.qZA(),l.TgZ(226,"clr-tt-row")(227,"clr-tt-cell"),l._uU(228,"Kevin Malone"),l.qZA(),l._UZ(229,"clr-tt-cell"),l.TgZ(230,"clr-tt-cell"),l._uU(231,"10"),l.qZA(),l.TgZ(232,"clr-tt-cell"),l._uU(233,"4th of June"),l.qZA()(),l.TgZ(234,"clr-tt-row")(235,"clr-tt-cell"),l._uU(236,"Oscar Martinez"),l.qZA(),l._UZ(237,"clr-tt-cell"),l.TgZ(238,"clr-tt-cell"),l._uU(239,"11"),l.qZA(),l.TgZ(240,"clr-tt-cell"),l._uU(241,"9th of June"),l.qZA()()(),l.TgZ(242,"clr-tt-row",11)(243,"clr-tt-cell"),l._uU(244,"Kelly Kapoor"),l.qZA(),l.TgZ(245,"clr-tt-cell"),l._uU(246,"Head of Customer Service"),l.qZA(),l.TgZ(247,"clr-tt-cell"),l._uU(248,"1"),l.qZA(),l._UZ(249,"clr-tt-cell"),l.TgZ(250,"clr-tt-row")(251,"clr-tt-cell"),l._uU(252,"Ryan Howard"),l.qZA(),l.TgZ(253,"clr-tt-cell"),l._uU(254,"Temp"),l.qZA(),l._UZ(255,"clr-tt-cell")(256,"clr-tt-cell"),l.qZA()(),l.TgZ(257,"clr-tt-row")(258,"clr-tt-cell"),l._uU(259,"Creed Bratton"),l.qZA(),l.TgZ(260,"clr-tt-cell"),l._uU(261,"Quality Assurance"),l.qZA(),l.TgZ(262,"clr-tt-cell"),l._uU(263,"3"),l.qZA(),l.TgZ(264,"clr-tt-cell"),l._uU(265,"Early 1900s"),l.qZA()(),l.TgZ(266,"clr-tt-row")(267,"clr-tt-cell"),l._uU(268,"Meredith Palmer"),l.qZA(),l.TgZ(269,"clr-tt-cell"),l._uU(270,"Supplier Relations"),l.qZA(),l._UZ(271,"clr-tt-cell")(272,"clr-tt-cell"),l.qZA(),l.TgZ(273,"clr-tt-row")(274,"clr-tt-cell"),l._uU(275,"Toby Flenderson"),l.qZA(),l.TgZ(276,"clr-tt-cell"),l._uU(277,"Human Resources"),l.qZA(),l.TgZ(278,"clr-tt-cell"),l._uU(279,"0"),l.qZA(),l.TgZ(280,"clr-tt-cell"),l._uU(281,"Ugh..."),l.qZA()(),l.TgZ(282,"clr-tt-row")(283,"clr-tt-cell"),l._uU(284,"Pam Beesly"),l.qZA(),l.TgZ(285,"clr-tt-cell"),l._uU(286,"Reception"),l.qZA(),l.TgZ(287,"clr-tt-cell"),l._uU(288,"10"),l.qZA(),l.TgZ(289,"clr-tt-cell"),l._uU(290,"4th of July"),l.qZA()(),l.TgZ(291,"clr-tt-row")(292,"clr-tt-cell"),l._uU(293,"Darryl Philbin"),l.qZA(),l.TgZ(294,"clr-tt-cell"),l._uU(295,"Warehouse"),l.qZA(),l.TgZ(296,"clr-tt-cell"),l._uU(297,"99"),l.qZA(),l.TgZ(298,"clr-tt-cell"),l._uU(299,"31st of August"),l.qZA()()()(),l.TgZ(300,"clr-tt-row")(301,"clr-tt-cell"),l._uU(302,"Some Dude - you probably know him, but he definitely knows you!"),l.qZA(),l.TgZ(303,"clr-tt-cell"),l._uU(304,"N/A"),l.qZA(),l.TgZ(305,"clr-tt-cell"),l._uU(306,"-1"),l.qZA(),l.TgZ(307,"clr-tt-cell"),l._uU(308,"1st of April"),l.qZA()()(),l._UZ(309,"clr-code-snippet",12),l.TgZ(310,"h4"),l._uU(311,"Treetable with clickable carets and expanded rows"),l.qZA(),l.TgZ(312,"p"),l._uU(313," Sometimes you might want to have links or buttons inside your rows. Click event bubbling might prevent clicking on said links without expanding or contracting that row. Additionally, you can have rows that are expanded by default using the "),l.TgZ(314,"code",13),l._uU(315,"clrExpanded"),l.qZA(),l._uU(316," input property. "),l.qZA(),l.TgZ(317,"clr-treetable",14)(318,"clr-tt-column"),l._uU(319,"Name"),l.qZA(),l.TgZ(320,"clr-tt-column"),l._uU(321,"Role"),l.qZA(),l.TgZ(322,"clr-tt-column"),l._uU(323,"Actor"),l.qZA(),l.TgZ(324,"clr-tt-row",15)(325,"clr-tt-cell"),l._uU(326,"David Wallace"),l.qZA(),l.TgZ(327,"clr-tt-cell"),l._uU(328,"CFO"),l.qZA(),l.TgZ(329,"clr-tt-cell")(330,"a",16),l._uU(331,"Some actor"),l.qZA()(),l.TgZ(332,"clr-tt-row",11)(333,"clr-tt-cell"),l._uU(334,"Michael Scott"),l.qZA(),l.TgZ(335,"clr-tt-cell"),l._uU(336,"Regional Manager"),l.qZA(),l.TgZ(337,"clr-tt-cell")(338,"a",16),l._uU(339,"Some actor"),l.qZA()(),l.TgZ(340,"clr-tt-row")(341,"clr-tt-cell"),l._uU(342,"Dwight K. Schrute"),l.qZA(),l.TgZ(343,"clr-tt-cell"),l._uU(344,"Assistant to the Regional Manager"),l.qZA(),l.TgZ(345,"clr-tt-cell")(346,"a",16),l._uU(347,"Some actor"),l.qZA()()(),l.TgZ(348,"clr-tt-row")(349,"clr-tt-cell"),l._uU(350,"Jim Halpert"),l.qZA(),l.TgZ(351,"clr-tt-cell"),l._uU(352,"Head of Sales"),l.qZA(),l.TgZ(353,"clr-tt-cell")(354,"a",16),l._uU(355,"Some actor"),l.qZA()(),l.TgZ(356,"clr-tt-row")(357,"clr-tt-cell"),l._uU(358,"Andy Bernard"),l.qZA(),l._UZ(359,"clr-tt-cell"),l.TgZ(360,"clr-tt-cell")(361,"a",16),l._uU(362,"Some actor"),l.qZA()()(),l.TgZ(363,"clr-tt-row")(364,"clr-tt-cell"),l._uU(365,"Stanley Hudson"),l.qZA(),l._UZ(366,"clr-tt-cell"),l.TgZ(367,"clr-tt-cell")(368,"a",16),l._uU(369,"Some actor"),l.qZA()()(),l.TgZ(370,"clr-tt-row")(371,"clr-tt-cell"),l._uU(372,"Phyllis Vance"),l.qZA(),l._UZ(373,"clr-tt-cell"),l.TgZ(374,"clr-tt-cell")(375,"a",16),l._uU(376,"Some actor"),l.qZA()()(),l.TgZ(377,"clr-tt-row")(378,"clr-tt-cell"),l._uU(379,"Todd Packer"),l.qZA(),l.TgZ(380,"clr-tt-cell"),l._uU(381,"The Packman"),l.qZA(),l.TgZ(382,"clr-tt-cell")(383,"a",16),l._uU(384,"Some actor"),l.qZA()()()(),l.TgZ(385,"clr-tt-row",11)(386,"clr-tt-cell"),l._uU(387,"Angela Martin"),l.qZA(),l.TgZ(388,"clr-tt-cell"),l._uU(389,"Head of Accounting"),l.qZA(),l.TgZ(390,"clr-tt-cell")(391,"a",16),l._uU(392,"Some actor"),l.qZA()(),l.TgZ(393,"clr-tt-row")(394,"clr-tt-cell"),l._uU(395,"Kevin Malone"),l.qZA(),l._UZ(396,"clr-tt-cell"),l.TgZ(397,"clr-tt-cell")(398,"a",16),l._uU(399,"Some actor"),l.qZA()()(),l.TgZ(400,"clr-tt-row")(401,"clr-tt-cell"),l._uU(402,"Oscar Martinez"),l.qZA(),l._UZ(403,"clr-tt-cell"),l.TgZ(404,"clr-tt-cell")(405,"a",16),l._uU(406,"Some actor"),l.qZA()()()(),l.TgZ(407,"clr-tt-row",11)(408,"clr-tt-cell"),l._uU(409,"Kelly Kapoor"),l.qZA(),l.TgZ(410,"clr-tt-cell"),l._uU(411,"Head of Customer Service"),l.qZA(),l.TgZ(412,"clr-tt-cell")(413,"a",16),l._uU(414,"Some actor"),l.qZA()(),l.TgZ(415,"clr-tt-row")(416,"clr-tt-cell"),l._uU(417,"Ryan Howard"),l.qZA(),l.TgZ(418,"clr-tt-cell"),l._uU(419,"Temp"),l.qZA(),l.TgZ(420,"clr-tt-cell")(421,"a",16),l._uU(422,"Some actor"),l.qZA()()()(),l.TgZ(423,"clr-tt-row")(424,"clr-tt-cell"),l._uU(425,"Creed Bratton"),l.qZA(),l.TgZ(426,"clr-tt-cell"),l._uU(427,"Quality Assurance"),l.qZA(),l.TgZ(428,"clr-tt-cell")(429,"a",16),l._uU(430,"Some actor"),l.qZA()()(),l.TgZ(431,"clr-tt-row")(432,"clr-tt-cell"),l._uU(433,"Meredith Palmer"),l.qZA(),l.TgZ(434,"clr-tt-cell"),l._uU(435,"Supplier Relations"),l.qZA(),l.TgZ(436,"clr-tt-cell")(437,"a",16),l._uU(438,"Some actor"),l.qZA()()(),l.TgZ(439,"clr-tt-row")(440,"clr-tt-cell"),l._uU(441,"Toby Flenderson"),l.qZA(),l.TgZ(442,"clr-tt-cell"),l._uU(443,"Human Resources"),l.qZA(),l.TgZ(444,"clr-tt-cell")(445,"a",16),l._uU(446,"Some actor"),l.qZA()()(),l.TgZ(447,"clr-tt-row")(448,"clr-tt-cell"),l._uU(449,"Pam Beesly"),l.qZA(),l.TgZ(450,"clr-tt-cell"),l._uU(451,"Reception"),l.qZA(),l.TgZ(452,"clr-tt-cell")(453,"a",16),l._uU(454,"Some actor"),l.qZA()()(),l.TgZ(455,"clr-tt-row")(456,"clr-tt-cell"),l._uU(457,"Darryl Philbin"),l.qZA(),l.TgZ(458,"clr-tt-cell"),l._uU(459,"Warehouse"),l.qZA(),l.TgZ(460,"clr-tt-cell")(461,"a",16),l._uU(462,"Some actor"),l.qZA()()()()(),l.TgZ(463,"clr-tt-row")(464,"clr-tt-cell"),l._uU(465,"Some Dude"),l.qZA(),l.TgZ(466,"clr-tt-cell"),l._uU(467,"N/A"),l.qZA(),l.TgZ(468,"clr-tt-cell"),l._uU(469,"You know him, nothing more to see"),l.qZA()()(),l._UZ(470,"clr-code-snippet",12),l.TgZ(471,"h4"),l._uU(472,"Treetable with single row actions"),l.qZA(),l.TgZ(473,"p"),l._uU(474," To show single row actions add "),l.TgZ(475,"code",13),l._uU(476,"clr-tt-action-overflow"),l.qZA(),l._uU(477," inside a "),l.TgZ(478,"code",13),l._uU(479,"clr-tt-row"),l.qZA()(),l.TgZ(480,"clr-treetable")(481,"clr-tt-column"),l._uU(482,"Some column"),l.qZA(),l.TgZ(483,"clr-tt-column"),l._uU(484,"Some other column"),l.qZA(),l.TgZ(485,"clr-tt-row",11)(486,"clr-tt-action-overflow")(487,"button",17),l._uU(488,"Test Action"),l.qZA()(),l.TgZ(489,"clr-tt-cell"),l._uU(490,"Lorem ipsum dolor sit amet"),l.qZA(),l.TgZ(491,"clr-tt-cell"),l._uU(492,"2"),l.qZA(),l.TgZ(493,"clr-tt-row")(494,"clr-tt-cell"),l._uU(495,"Lorem ipsum dolor sit amet"),l.qZA(),l.TgZ(496,"clr-tt-cell"),l._uU(497,"3"),l.qZA()()(),l.TgZ(498,"clr-tt-row")(499,"clr-tt-cell"),l._uU(500,"Lorem ipsum dolor sit amet"),l.qZA(),l.TgZ(501,"clr-tt-cell"),l._uU(502,"1"),l.qZA()()(),l._UZ(503,"clr-code-snippet",12),l.TgZ(504,"h4"),l._uU(505,"Custom column sizing"),l.qZA(),l.TgZ(506,"p"),l._uU(507," For custom column widths use the "),l.TgZ(508,"code",13),l._uU(509,"clr-col-"),l.qZA(),l._uU(510," classes on the header columns "),l.TgZ(511,"code",13),l._uU(512,"clr-tt-column"),l.qZA(),l._uU(513,". The cells in the body will adjust accordingly automatically. "),l.qZA(),l.TgZ(514,"clr-treetable")(515,"clr-tt-column",18),l._uU(516,"Some column"),l.qZA(),l.TgZ(517,"clr-tt-column",19),l._uU(518,"Some other column"),l.qZA(),l.TgZ(519,"clr-tt-row",11)(520,"clr-tt-cell"),l._uU(521,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi delectus dignissimos, ducimus..."),l.qZA(),l.TgZ(522,"clr-tt-cell"),l._uU(523,"2"),l.qZA(),l.TgZ(524,"clr-tt-row")(525,"clr-tt-cell"),l._uU(526,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, at atque dignissimos ..."),l.qZA(),l.TgZ(527,"clr-tt-cell"),l._uU(528,"3"),l.qZA()()(),l.TgZ(529,"clr-tt-row")(530,"clr-tt-cell"),l._uU(531,"Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut cumque ex libero, minus ..."),l.qZA(),l.TgZ(532,"clr-tt-cell"),l._uU(533,"1"),l.qZA()()(),l._UZ(534,"clr-code-snippet",12),l.qZA()()()),2&r&&(l.Q6J("title",o.title),l.xp6(309),l.Q6J("clrCode",o.htmlExampleClickableRows),l.xp6(8),l.Q6J("clrClickableRows",!1),l.xp6(7),l.Q6J("clrExpanded",!0),l.xp6(146),l.Q6J("clrCode",o.htmlExampleClickableCaret),l.xp6(33),l.Q6J("clrCode",o.htmlExampleSingleRowAction),l.xp6(31),l.Q6J("clrCode",o.htmlExampleCustomSize))},directives:[d.k,c.Hdp,c.Yzu,c.RPD,c.rQB,c.gcd,c.QWT,c.dtB,c.p9H,U.O,c.lRe],encapsulation:2}),e})(),w=(()=>{class e{}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=l.oAB({type:e}),e.\u0275inj=l.cJS({imports:[[u.ez,g.A,T.B,n.Bz.forChild([{path:"",component:p}]),s.u5,i.K6A,c.mmz]]}),e})()}}]);