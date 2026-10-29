import{a as M,b as u,c as F}from"./chunk-VMPJFRRM.js";import"./chunk-ZF3MJ7PP.js";import{c as w,d as g}from"./chunk-HYVD2MB3.js";import{Gk as L}from"./chunk-HKBEZELF.js";import"./chunk-SDVZG756.js";import{Aa as E,Db as l,Hh as m,I as y,Ma as i,Na as r,Oa as t,Pa as o,jf as C,kb as v,ma as n,mb as e,od as p,uc as d,va as S,wa as f}from"./chunk-D5GTBCL3.js";import"./chunk-76DGGKHL.js";var h=()=>[.6],I=()=>[.72],_=()=>["var(--cds-alias-status-success)"],N=()=>[.35],T=()=>["var(--cds-alias-status-info)"],D=()=>[.75,.4,.2],B=()=>["var(--cds-alias-status-success)","var(--cds-alias-status-info)","var(--cds-alias-status-warning)"],H=()=>[.9,.7,.5,.3],R=()=>["var(--cds-alias-status-info)","var(--cds-alias-status-success)"],A=()=>[.55],U=()=>["var(--cds-alias-status-danger)"],O=()=>[0],P=()=>[1.4],z=`
<clr-circle-progress-bar [progress]="[0.6]"></clr-circle-progress-bar>
`,G=`
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0.72]"
  [label]="0.72"
  [colors]="['var(--cds-alias-status-success)']">
</clr-circle-progress-bar>
`,W=`
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0.35]"
  [label]="'Loading'"
  [colors]="['var(--cds-alias-status-info)']">
</clr-circle-progress-bar>
`,Z=`
<clr-circle-progress-bar
  style="width: 180px; height: 180px"
  [progress]="[0.75, 0.4, 0.2]"
  [label]="'Layered'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-info)', 'var(--cds-alias-status-warning)']">
</clr-circle-progress-bar>
`,V=`
<clr-circle-progress-bar
  style="width: 200px; height: 200px"
  [progress]="[0.75, 0.4, 0.2]"
  [label]="'Concentric'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-info)', 'var(--cds-alias-status-warning)']"
  [layoutStrategy]="'concentric'">
</clr-circle-progress-bar>
`,j=`
<clr-circle-progress-bar
  style="width: 200px; height: 200px"
  [progress]="[0.9, 0.7, 0.5, 0.3]"
  [colors]="['var(--cds-alias-status-info)', 'var(--cds-alias-status-success)']"
  [layoutStrategy]="'concentric'">
</clr-circle-progress-bar>
`,Y=`
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0.55]"
  [label]="0.55"
  [colors]="['var(--cds-alias-status-danger)']"
  [backgroundColorCircle]="'var(--cds-alias-status-danger-tint)'">
</clr-circle-progress-bar>
`,K=`
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0]"
  [label]="0"
  [colors]="['var(--cds-alias-status-info)']">
</clr-circle-progress-bar>
`,q=`
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[1.4]"
  [label]="1"
  [colors]="['var(--cds-alias-status-success)']">
</clr-circle-progress-bar>
`,J=`
<clr-circle-progress-bar style="width: 80px; height: 80px"  [progress]="[0.6]"></clr-circle-progress-bar>
<clr-circle-progress-bar style="width: 140px; height: 140px" [progress]="[0.6]"></clr-circle-progress-bar>
<clr-circle-progress-bar style="width: 220px; height: 220px" [progress]="[0.6]"></clr-circle-progress-bar>
`,b=(()=>{class a extends F{htmlBasic=z;htmlNumericLabel=G;htmlStringLabel=W;htmlLayered=Z;htmlConcentric=V;htmlCyclingColors=j;htmlCustomBackground=Y;htmlZero=K;htmlFull=q;htmlSizes=J;constructor(){super("progress-circle")}static \u0275fac=function(c){return new(c||a)};static \u0275cmp=S({type:a,selectors:[["clr-progress-circle-demo"]],hostVars:4,hostBindings:function(c,s){c&2&&v("content-area",!0)("dox-content-panel",!0)},features:[E],decls:173,vars:61,consts:[[3,"title"],[1,"component-summary"],["id","design-guidelines"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-xs-down"],["id","code-examples"],["id","examples"],[3,"progress"],[3,"clrCode"],[2,"width","160px","height","160px",3,"progress","label","colors"],[2,"width","180px","height","180px",3,"progress","label","colors"],[2,"width","200px","height","200px",3,"progress","label","colors","layoutStrategy"],[2,"width","200px","height","200px",3,"progress","colors","layoutStrategy"],[2,"width","160px","height","160px",3,"progress","label","colors","backgroundColorCircle"],[2,"display","flex","align-items","center","gap","1rem"],[2,"width","80px","height","80px",3,"progress"],[2,"width","140px","height","140px",3,"progress"],[2,"width","220px","height","220px",3,"progress"]],template:function(c,s){c&1&&(r(0,"clr-doc-wrapper",0)(1,"article")(2,"h5",1),e(3," The progress circle renders one or more progress values (each between 0 and 1) as circular rings. Use the "),r(4,"b"),e(5,"layered"),t(),e(6," layout to stack rings on top of each other, or the "),r(7,"b"),e(8,"concentric"),t(),e(9," layout to draw them as nested rings with a reducing radius. "),t(),r(10,"div",2)(11,"h3"),e(12,"Summary of Options"),t(),r(13,"table",3)(14,"thead")(15,"tr")(16,"th",4),e(17,"Input"),t(),r(18,"th",5),e(19,"Type"),t(),r(20,"th",6),e(21,"Default"),t(),r(22,"th",4),e(23,"Effect"),t()()(),r(24,"tbody")(25,"tr")(26,"td",4)(27,"b"),e(28,"progress"),t()(),r(29,"td",5),e(30,"number[]"),t(),r(31,"td",6),e(32,"[0]"),t(),r(33,"td",4),e(34," Array of progress values between 0 and 1. Each entry becomes a ring. Values above 1 are capped at 100%. "),t()(),r(35,"tr")(36,"td",4)(37,"b"),e(38,"colors"),t()(),r(39,"td",5),e(40,"string[]"),t(),r(41,"td",6),e(42," ['var(--cds-global-color-green-100)', 'var(--cds-global-color-blue-100)', 'var(--cds-global-color-red-100)'] "),t(),r(43,"td",4),e(44," Colors for the rings. If there are fewer colors than progress values, the color array cycles. "),t()(),r(45,"tr")(46,"td",4)(47,"b"),e(48,"backgroundColorCircle"),t()(),r(49,"td",5),e(50,"string"),t(),r(51,"td",6),e(52,"var(--cds-global-color-gray-100)"),t(),r(53,"td",4),e(54,"Color of the background ring behind the progress ring(s)."),t()(),r(55,"tr")(56,"td",4)(57,"b"),e(58,"label"),t()(),r(59,"td",5),e(60,"number | string"),t(),r(61,"td",6),e(62,"undefined"),t(),r(63,"td",4),e(64," Text shown in the center of the circle. Numeric values are formatted as a percentage (e.g. "),r(65,"code"),e(66,'0.72 \u2192 "72%"'),t(),e(67,"). String values are shown as-is. If not set, no label is rendered. "),t()(),r(68,"tr")(69,"td",4)(70,"b"),e(71,"layoutStrategy"),t()(),r(72,"td",5),e(73,"'layered' | 'concentric'"),t(),r(74,"td",6),e(75,"'layered'"),t(),r(76,"td",4)(77,"b"),e(78,"layered"),t(),e(79,": all rings share the same radius and overlap. Best for comparing progress values against the same reference. "),r(80,"b"),e(81,"concentric"),t(),e(82,": rings are nested with reducing radius. Best for showing multiple independent progress values in one visual. "),t()(),r(83,"tr")(84,"td",4)(85,"b"),e(86,"Styling (CSS)"),t()(),r(87,"td",5),e(88,"width / height"),t(),r(89,"td",6),e(90,"100px / 100px"),t(),r(91,"td",4),e(92," Size the circle by setting "),r(93,"code"),e(94,"width"),t(),e(95," and "),r(96,"code"),e(97,"height"),t(),e(98," on the "),r(99,"code"),e(100,"clr-circle-progress-bar"),t(),e(101," element with plain CSS (any unit: px, %, rem, \u2026). Ring thickness is derived automatically from the size and layout. "),t()()()()(),r(102,"div",7)(103,"h3",8),e(104,"Code & Examples"),t(),r(105,"h4"),e(106,"Basic"),t(),r(107,"p"),e(108,"Minimal usage \u2014 a single progress value with defaults."),t(),o(109,"clr-circle-progress-bar",9)(110,"clr-code-snippet",10),r(111,"h4"),e(112,"Numeric label (auto-formatted as %)"),t(),r(113,"p"),e(114,"When "),r(115,"code"),e(116,"label"),t(),e(117," is a number, it is rendered as a percentage."),t(),o(118,"clr-circle-progress-bar",11)(119,"clr-code-snippet",10),r(120,"h4"),e(121,"Custom string label"),t(),r(122,"p"),e(123,"Any string can be shown in the center."),t(),o(124,"clr-circle-progress-bar",11)(125,"clr-code-snippet",10),r(126,"h4"),e(127,"Layered layout"),t(),r(128,"p"),e(129,"All rings share the same radius. Useful when comparing multiple values against the same reference."),t(),o(130,"clr-circle-progress-bar",12)(131,"clr-code-snippet",10),r(132,"h4"),e(133,"Concentric layout"),t(),r(134,"p"),e(135,"Rings are nested with reducing radius. Good for showing several independent metrics at once."),t(),o(136,"clr-circle-progress-bar",13)(137,"clr-code-snippet",10),r(138,"h4"),e(139,"Cycling colors"),t(),r(140,"p"),e(141,"If there are fewer colors than progress values, the color array cycles."),t(),o(142,"clr-circle-progress-bar",14)(143,"clr-code-snippet",10),r(144,"h4"),e(145,"Custom background color"),t(),r(146,"p"),e(147,"Match the background ring to your palette."),t(),o(148,"clr-circle-progress-bar",15)(149,"clr-code-snippet",10),r(150,"h4"),e(151,"Different sizes"),t(),r(152,"p"),e(153,"Ring thickness is derived automatically from the element's "),r(154,"code"),e(155,"width"),t(),e(156,"/"),r(157,"code"),e(158,"height"),t(),e(159,"."),t(),r(160,"div",16),o(161,"clr-circle-progress-bar",17)(162,"clr-circle-progress-bar",18)(163,"clr-circle-progress-bar",19),t(),o(164,"clr-code-snippet",10),r(165,"h4"),e(166,"Empty / zero state"),t(),o(167,"clr-circle-progress-bar",11)(168,"clr-code-snippet",10),r(169,"h4"),e(170,"Values above 1 are capped"),t(),o(171,"clr-circle-progress-bar",11)(172,"clr-code-snippet",10),t()()()),c&2&&(i("title",s.title),n(109),i("progress",l(41,h)),n(),i("clrCode",s.htmlBasic),n(8),i("progress",l(42,I))("label",.72)("colors",l(43,_)),n(),i("clrCode",s.htmlNumericLabel),n(5),i("progress",l(44,N))("label","Loading")("colors",l(45,T)),n(),i("clrCode",s.htmlStringLabel),n(5),i("progress",l(46,D))("label","Layered")("colors",l(47,B)),n(),i("clrCode",s.htmlLayered),n(5),i("progress",l(48,D))("label","Concentric")("colors",l(49,B))("layoutStrategy","concentric"),n(),i("clrCode",s.htmlConcentric),n(5),i("progress",l(50,H))("colors",l(51,R))("layoutStrategy","concentric"),n(),i("clrCode",s.htmlCyclingColors),n(5),i("progress",l(52,A))("label",.55)("colors",l(53,U))("backgroundColorCircle","var(--cds-alias-status-danger-tint)"),n(),i("clrCode",s.htmlCustomBackground),n(12),i("progress",l(54,h)),n(),i("progress",l(55,h)),n(),i("progress",l(56,h)),n(),i("clrCode",s.htmlSizes),n(3),i("progress",l(57,O))("label",0)("colors",l(58,T)),n(),i("clrCode",s.htmlZero),n(3),i("progress",l(59,P))("label",1)("colors",l(60,_)),n(),i("clrCode",s.htmlFull))},dependencies:[M,L,w,d,p,m,g,u],encapsulation:2})}return a})();var ue=(()=>{class a{static \u0275fac=function(c){return new(c||a)};static \u0275mod=f({type:a});static \u0275inj=y({imports:[d,p,m,g,u,C.forChild([{path:"",component:b}]),b]})}return a})();export{ue as ProgressCircleDemoModule};
