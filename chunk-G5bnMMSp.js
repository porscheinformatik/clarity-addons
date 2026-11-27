import{n as P$1,r as ie,t as O$1}from"./chunk-ByHoAxhQ.js";import{As as v,D as B$1,Gt as K$1,Ka as j$1,Va as ie$1,Y as E,Zs as xhe,an as Lp,d as $,di as Zn,ec as y,l as _e,la as ee,ma as f,rt as FT,s as O$3,xn as O$2,y as A$1}from"./main-H7HK7CIU.js";import{Vc as mM}from"./chunk-DYdAqUlK.js";var h=()=>[.6];var I=()=>[.72];var _=()=>[`var(--cds-alias-status-success)`];var N=()=>[.35];var D=()=>[`var(--cds-alias-status-info)`];var T=()=>[.75,.4,.2];var B=()=>[`var(--cds-alias-status-success)`,`var(--cds-alias-status-info)`,`var(--cds-alias-status-warning)`];var H=()=>[.9,.7,.5,.3];var R=()=>[`var(--cds-alias-status-info)`,`var(--cds-alias-status-success)`];var A=()=>[.55];var U=()=>[`var(--cds-alias-status-danger)`];var O=()=>[0];var P=()=>[1.4];var z=`
<clr-circle-progress-bar [progress]="[0.6]"></clr-circle-progress-bar>
`;var G=`
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0.72]"
  [label]="0.72"
  [colors]="['var(--cds-alias-status-success)']">
</clr-circle-progress-bar>
`;var W=`
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0.35]"
  [label]="'Loading'"
  [colors]="['var(--cds-alias-status-info)']">
</clr-circle-progress-bar>
`;var Z=`
<clr-circle-progress-bar
  style="width: 180px; height: 180px"
  [progress]="[0.75, 0.4, 0.2]"
  [label]="'Layered'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-info)', 'var(--cds-alias-status-warning)']">
</clr-circle-progress-bar>
`;var V=`
<clr-circle-progress-bar
  style="width: 200px; height: 200px"
  [progress]="[0.75, 0.4, 0.2]"
  [label]="'Concentric'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-info)', 'var(--cds-alias-status-warning)']"
  [layoutStrategy]="'concentric'">
</clr-circle-progress-bar>
`;var j=`
<clr-circle-progress-bar
  style="width: 200px; height: 200px"
  [progress]="[0.9, 0.7, 0.5, 0.3]"
  [colors]="['var(--cds-alias-status-info)', 'var(--cds-alias-status-success)']"
  [layoutStrategy]="'concentric'">
</clr-circle-progress-bar>
`;var Y=`
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0.55]"
  [label]="0.55"
  [colors]="['var(--cds-alias-status-danger)']"
  [backgroundColorCircle]="'var(--cds-alias-status-danger-tint)'">
</clr-circle-progress-bar>
`;var K=`
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0]"
  [label]="0"
  [colors]="['var(--cds-alias-status-info)']">
</clr-circle-progress-bar>
`;var q=`
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[1.4]"
  [label]="1"
  [colors]="['var(--cds-alias-status-success)']">
</clr-circle-progress-bar>
`;var J=`
<clr-circle-progress-bar style="width: 80px; height: 80px"  [progress]="[0.6]"></clr-circle-progress-bar>
<clr-circle-progress-bar style="width: 140px; height: 140px" [progress]="[0.6]"></clr-circle-progress-bar>
<clr-circle-progress-bar style="width: 220px; height: 220px" [progress]="[0.6]"></clr-circle-progress-bar>
`;var b=(()=>{class a extends P$1{htmlBasic=z;htmlNumericLabel=G;htmlStringLabel=W;htmlLayered=Z;htmlConcentric=V;htmlCyclingColors=j;htmlCustomBackground=Y;htmlZero=K;htmlFull=q;htmlSizes=J;constructor(){super(`progress-circle`)}static ɵfac=function(c){return new(c||a)};static ɵcmp=O$2({type:a,selectors:[[`clr-progress-circle-demo`]],hostVars:4,hostBindings:function(c,s){c&2&&E(`content-area`,!0)(`dox-content-panel`,!0)},features:[ee],decls:173,vars:61,consts:[[3,`title`],[1,`component-summary`],[`id`,`design-guidelines`],[1,`table`],[1,`left`],[1,`left`,`clr-hidden-xs-down`],[1,`clr-hidden-xs-down`],[`id`,`code-examples`],[`id`,`examples`],[3,`progress`],[3,`clrCode`],[2,`width`,`160px`,`height`,`160px`,3,`progress`,`label`,`colors`],[2,`width`,`180px`,`height`,`180px`,3,`progress`,`label`,`colors`],[2,`width`,`200px`,`height`,`200px`,3,`progress`,`label`,`colors`,`layoutStrategy`],[2,`width`,`200px`,`height`,`200px`,3,`progress`,`colors`,`layoutStrategy`],[2,`width`,`160px`,`height`,`160px`,3,`progress`,`label`,`colors`,`backgroundColorCircle`],[2,`display`,`flex`,`align-items`,`center`,`gap`,`1rem`],[2,`width`,`80px`,`height`,`80px`,3,`progress`],[2,`width`,`140px`,`height`,`140px`,3,`progress`],[2,`width`,`220px`,`height`,`220px`,3,`progress`]],template:function(c,s){c&1&&(y(0,`clr-doc-wrapper`,0)(1,`article`)(2,`h5`,1),ie$1(3,` The progress circle renders one or more progress values (each between 0 and 1) as circular rings. Use the `),y(4,`b`),ie$1(5,`layered`),v(),ie$1(6,` layout to stack rings on top of each other, or the `),y(7,`b`),ie$1(8,`concentric`),v(),ie$1(9,` layout to draw them as nested rings with a reducing radius. `),v(),y(10,`div`,2)(11,`h3`),ie$1(12,`Summary of Options`),v(),y(13,`table`,3)(14,`thead`)(15,`tr`)(16,`th`,4),ie$1(17,`Input`),v(),y(18,`th`,5),ie$1(19,`Type`),v(),y(20,`th`,6),ie$1(21,`Default`),v(),y(22,`th`,4),ie$1(23,`Effect`),v()()(),y(24,`tbody`)(25,`tr`)(26,`td`,4)(27,`b`),ie$1(28,`progress`),v()(),y(29,`td`,5),ie$1(30,`number[]`),v(),y(31,`td`,6),ie$1(32,`[0]`),v(),y(33,`td`,4),ie$1(34,` Array of progress values between 0 and 1. Each entry becomes a ring. Values above 1 are capped at 100%. `),v()(),y(35,`tr`)(36,`td`,4)(37,`b`),ie$1(38,`colors`),v()(),y(39,`td`,5),ie$1(40,`string[]`),v(),y(41,`td`,6),ie$1(42,` ['var(--cds-global-color-green-100)', 'var(--cds-global-color-blue-100)', 'var(--cds-global-color-red-100)'] `),v(),y(43,`td`,4),ie$1(44,` Colors for the rings. If there are fewer colors than progress values, the color array cycles. `),v()(),y(45,`tr`)(46,`td`,4)(47,`b`),ie$1(48,`backgroundColorCircle`),v()(),y(49,`td`,5),ie$1(50,`string`),v(),y(51,`td`,6),ie$1(52,`var(--cds-global-color-gray-100)`),v(),y(53,`td`,4),ie$1(54,`Color of the background ring behind the progress ring(s).`),v()(),y(55,`tr`)(56,`td`,4)(57,`b`),ie$1(58,`label`),v()(),y(59,`td`,5),ie$1(60,`number | string`),v(),y(61,`td`,6),ie$1(62,`undefined`),v(),y(63,`td`,4),ie$1(64,` Text shown in the center of the circle. Numeric values are formatted as a percentage (e.g. `),y(65,`code`),ie$1(66,`0.72 → "72%"`),v(),ie$1(67,`). String values are shown as-is. If not set, no label is rendered. `),v()(),y(68,`tr`)(69,`td`,4)(70,`b`),ie$1(71,`layoutStrategy`),v()(),y(72,`td`,5),ie$1(73,`'layered' | 'concentric'`),v(),y(74,`td`,6),ie$1(75,`'layered'`),v(),y(76,`td`,4)(77,`b`),ie$1(78,`layered`),v(),ie$1(79,`: all rings share the same radius and overlap. Best for comparing progress values against the same reference. `),y(80,`b`),ie$1(81,`concentric`),v(),ie$1(82,`: rings are nested with reducing radius. Best for showing multiple independent progress values in one visual. `),v()(),y(83,`tr`)(84,`td`,4)(85,`b`),ie$1(86,`Styling (CSS)`),v()(),y(87,`td`,5),ie$1(88,`width / height`),v(),y(89,`td`,6),ie$1(90,`100px / 100px`),v(),y(91,`td`,4),ie$1(92,` Size the circle by setting `),y(93,`code`),ie$1(94,`width`),v(),ie$1(95,` and `),y(96,`code`),ie$1(97,`height`),v(),ie$1(98,` on the `),y(99,`code`),ie$1(100,`clr-circle-progress-bar`),v(),ie$1(101,` element with plain CSS (any unit: px, %, rem, …). Ring thickness is derived automatically from the size and layout. `),v()()()()(),y(102,`div`,7)(103,`h3`,8),ie$1(104,`Code & Examples`),v(),y(105,`h4`),ie$1(106,`Basic`),v(),y(107,`p`),ie$1(108,`Minimal usage — a single progress value with defaults.`),v(),j$1(109,`clr-circle-progress-bar`,9)(110,`clr-code-snippet`,10),y(111,`h4`),ie$1(112,`Numeric label (auto-formatted as %)`),v(),y(113,`p`),ie$1(114,`When `),y(115,`code`),ie$1(116,`label`),v(),ie$1(117,` is a number, it is rendered as a percentage.`),v(),j$1(118,`clr-circle-progress-bar`,11)(119,`clr-code-snippet`,10),y(120,`h4`),ie$1(121,`Custom string label`),v(),y(122,`p`),ie$1(123,`Any string can be shown in the center.`),v(),j$1(124,`clr-circle-progress-bar`,11)(125,`clr-code-snippet`,10),y(126,`h4`),ie$1(127,`Layered layout`),v(),y(128,`p`),ie$1(129,`All rings share the same radius. Useful when comparing multiple values against the same reference.`),v(),j$1(130,`clr-circle-progress-bar`,12)(131,`clr-code-snippet`,10),y(132,`h4`),ie$1(133,`Concentric layout`),v(),y(134,`p`),ie$1(135,`Rings are nested with reducing radius. Good for showing several independent metrics at once.`),v(),j$1(136,`clr-circle-progress-bar`,13)(137,`clr-code-snippet`,10),y(138,`h4`),ie$1(139,`Cycling colors`),v(),y(140,`p`),ie$1(141,`If there are fewer colors than progress values, the color array cycles.`),v(),j$1(142,`clr-circle-progress-bar`,14)(143,`clr-code-snippet`,10),y(144,`h4`),ie$1(145,`Custom background color`),v(),y(146,`p`),ie$1(147,`Match the background ring to your palette.`),v(),j$1(148,`clr-circle-progress-bar`,15)(149,`clr-code-snippet`,10),y(150,`h4`),ie$1(151,`Different sizes`),v(),y(152,`p`),ie$1(153,`Ring thickness is derived automatically from the element's `),y(154,`code`),ie$1(155,`width`),v(),ie$1(156,`/`),y(157,`code`),ie$1(158,`height`),v(),ie$1(159,`.`),v(),y(160,`div`,16),j$1(161,`clr-circle-progress-bar`,17)(162,`clr-circle-progress-bar`,18)(163,`clr-circle-progress-bar`,19),v(),j$1(164,`clr-code-snippet`,10),y(165,`h4`),ie$1(166,`Empty / zero state`),v(),j$1(167,`clr-circle-progress-bar`,11)(168,`clr-code-snippet`,10),y(169,`h4`),ie$1(170,`Values above 1 are capped`),v(),j$1(171,`clr-circle-progress-bar`,11)(172,`clr-code-snippet`,10),v()()()),c&2&&(A$1(`title`,s.title),f(109),A$1(`progress`,FT(41,h)),f(),A$1(`clrCode`,s.htmlBasic),f(8),A$1(`progress`,FT(42,I))(`label`,.72)(`colors`,FT(43,_)),f(),A$1(`clrCode`,s.htmlNumericLabel),f(5),A$1(`progress`,FT(44,N))(`label`,`Loading`)(`colors`,FT(45,D)),f(),A$1(`clrCode`,s.htmlStringLabel),f(5),A$1(`progress`,FT(46,T))(`label`,`Layered`)(`colors`,FT(47,B)),f(),A$1(`clrCode`,s.htmlLayered),f(5),A$1(`progress`,FT(48,T))(`label`,`Concentric`)(`colors`,FT(49,B))(`layoutStrategy`,`concentric`),f(),A$1(`clrCode`,s.htmlConcentric),f(5),A$1(`progress`,FT(50,H))(`colors`,FT(51,R))(`layoutStrategy`,`concentric`),f(),A$1(`clrCode`,s.htmlCyclingColors),f(5),A$1(`progress`,FT(52,A))(`label`,.55)(`colors`,FT(53,U))(`backgroundColorCircle`,`var(--cds-alias-status-danger-tint)`),f(),A$1(`clrCode`,s.htmlCustomBackground),f(12),A$1(`progress`,FT(54,h)),f(),A$1(`progress`,FT(55,h)),f(),A$1(`progress`,FT(56,h)),f(),A$1(`clrCode`,s.htmlSizes),f(3),A$1(`progress`,FT(57,O))(`label`,0)(`colors`,FT(58,D)),f(),A$1(`clrCode`,s.htmlZero),f(3),A$1(`progress`,FT(59,P))(`label`,1)(`colors`,FT(60,_)),f(),A$1(`clrCode`,s.htmlFull))},dependencies:[O$1,mM,O$3,K$1,Zn,xhe,_e,ie],encapsulation:2,changeDetection:1})}return a})();var ue=(()=>{class a{static ɵfac=function(c){return new(c||a)};static ɵmod=$({type:a});static ɵinj=B$1({imports:[K$1,Zn,xhe,_e,ie,Lp.forChild([{path:``,component:b}]),b]})}return a})();export{ue as ProgressCircleDemoModule};