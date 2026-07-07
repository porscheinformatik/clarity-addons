import{a as J,b as K,c as Q}from"./chunk-DLNI4CEN.js";import"./chunk-S3DWPM3E.js";import{c as Z,d as G}from"./chunk-EBNTPG27.js";import{Uj as R,Vj as l,Wj as k,Xj as F,Zj as H,yk as Y}from"./chunk-RAI3VHOQ.js";import{Aa as M,Cb as V,Fa as _,Ga as z,I as B,J as w,La as c,Ma as n,Na as t,Oa as E,Qb as j,Xa as A,Ya as O,af as U,ah as W,d as y,gb as $,h as N,ib as q,kb as e,mb as I,na as d,ta as D,tc as X,va as g,wa as P,za as T}from"./chunk-Q5SJHFC4.js";import"./chunk-76DGGKHL.js";var m=class extends R{id;constructor(p){super(),this.id=p}equals(p){return this.id===p.id}},x=class extends R{id;name;code;constructor(p,o,r){super(),this.id=p,this.name=o,this.code=r}equals(p){return this.id===p.id&&this.name===p.name&&this.code===p.code}};var L=(()=>{class a extends F{searchPerformed$=new y(1);constructor(){super()}getLazyChildren(o){return o.id.id==="lazy"?N([new l(new m("lazyChild"),"Lazy child")]):N([])}searchPerformed(o){this.searchPerformed$.next(o)}getSearchPerformed(){return this.searchPerformed$}static \u0275fac=function(r){return new(r||a)};static \u0275prov=B({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})();var re=a=>({minCharacters:3,searchResultItemRef:a,placeholder:"My demo placeholder"});function ae(a,p){if(a&1&&(n(0,"span",16),e(1),t()),a&2){let o=O().$implicit;d(),I(" ",o.label)}}function le(a,p){if(a&1&&(e(0),_(1,ae,2,1,"span",16)),a&2){let o=p.$implicit;I(" ",o.name," "),d(),z(o.label?1:-1)}}var de=`
<clr-location-bar [clrRoots]="roots1"></clr-location-bar>
`,ce=`
private buildRoots1() {
  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1");
  const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1"), "L1.1");
  const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.1"), "L1.1.1");
  const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.2"), "L1.1.2");
  const l12 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.2"), "L1.2");
  const l121 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.2.1"), "L1.2.1");

  const l2 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l2"), "L2");
  const l21 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l2.1"), "L2.1");

  l12.setChildren([l121]);
  l11.setChildren([l111, l112]);
  l1.setChildren([l11, l12]);

  l2.setChildren([l21]);

  this.roots1 = [l1, l2];
}
`,se=`
export class DemoLocationBarNodeId extends NodeId {
  constructor(public id: string) {
    super();
  }

  equals(other: DemoLocationBarNodeId): boolean {
    return this.id === other.id;
  }
}
`,me=`
<clr-location-bar [clrRoots]="roots2"></clr-location-bar>
`,he=`
private buildRoots2() {
  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1", false, true);
  const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1"), "L1.1", true, true);
  const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.1"), "L1.1.1");
  const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.2"), "L1.1.2");

  l11.setChildren([l111, l112]);
  l1.setChildren([l11]);

  this.roots2 = [l1];
}
`,pe=`
<clr-location-bar [clrRoots]="rootsLazy"></clr-location-bar>
`,ue=`
private buildRootsLazy() {
  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1");
  const lazy = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("lazy"), "Not lazy");

  l1.setChildren([lazy]);

  this.rootsLazy = [l1];
}
`,Se=`
@Injectable({ providedIn: "root" })
export class DemoLocationBarContentProvider extends LocationBarContentProvider<DemoLocationBarNodeId> {
  constructor() {
    super();
  }

  getLazyChildren(node: LocationBarNode<DemoLocationBarNodeId>): Observable<LocationBarNode<DemoLocationBarNodeId>[]> {
    if (node.id.id === "lazy") {
      return of([new LocationBarNode(new DemoLocationBarNodeId("lazyChild"), "Lazy child")]);
    }
    return of([]);
  }
}
`,xe=`
@NgModule({
  ...
  providers: [{ provide: CONTENT_PROVIDER, useExisting: DemoLocationBarContentProvider }]
})
export class LocationBarDemoModule {}
`,Ee=`
<clr-location-bar [clrRoots]="searchableRoot"
                  [clrSearchRequest]="{ minCharacters: 3,
                          searchResultItemRef: searchResultItemRef,
                          placeholder: 'My demo placeholder'}"
                  [clrSearchResultItems]="searchResultItems"
                  (clrSearchItemChanged)="searchChanged($event)">
  <ng-template #searchResultItemRef let-searchResultItem>
   {{searchResultItem.name}}
   <span *ngIf="searchResultItem.label" class="label label-light-blue"> {{searchResultItem.label}}</span>
  </ng-template>
</clr-location-bar>
`,fe=`
 ngOnInit() {
    this.buildSearchableRoot();

    /* receive search event */
    this.contentProvider.getSearchPerformed().subscribe(response => this.onSearch(response));
  }

   private buildSearchableRoot(): void {
    const child1 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('1', 'Searchable child 1', 'child 1 code'), 'Searchable child 1');
    const child11 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('11', 'Searchable child 1 child 1', 'child 11 code'), 'Searchable child 1 child 1');
    const child12 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('12', 'Searchable child 1 child 2', 'child 12 code'), 'Searchable child 1 child 2');


    const child2 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('2', 'Searchable child 2', 'child 2 code'), 'Searchable child 2');
    const child21 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('21', 'Searchable child 2 child 1', 'child 21 code'), 'Searchable child 2 child 1');

    const root = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('0', 'Searchable root', 'root code'), 'Searchable root');

    child1.setChildren([child11, child12]);
    child2.setChildren([child21]);
    root.setChildren([child1, child2]);
    this.searchableRoot = [root]
  }
`,te={labelPrefix:"",value:""},be="",Le=`
 onSearch(response: SearchResponseModel<DemoLocationBarComplexNodeId>): void {
    if (!response?.text) {
      this.searchResultItems = [];
      return;
    }

    const resultItems: SearchResultModel[] = [];
    const searchNode = (node: LocationBarNode<DemoLocationBarComplexNodeId>, path: string): boolean => {
      if (!node) {
        return false;
      }

      const { id, name, code } = node.id;
      const attributes = [
        { value: name, labelPrefix: '' },
        { value: id, labelPrefix: 'Id' },
        { value: code, labelPrefix: 'Code' },
      ];
      const currentPath = path ? \`${be} / ${name}\` : name;
      const found = attributes.find(attr => attr.value.toUpperCase().includes(response.text.toUpperCase()));
      if (found) {
        resultItems.push({
          id: id,
          name: currentPath,
          code: code,
          label: found.labelPrefix ? \`${te.labelPrefix}: ${te.value}\` : '',
        });
      }

      // Recursively search the node's children
      if (node.getChildren()) {
        for (const child of node.getChildren()) {
          searchNode(child, currentPath);
        }
      }
      return !!found;
    };

    response.searchableNodes.forEach(node => searchNode(node, ''));
    this.searchResultItems = this.reduceSortedResultItems(resultItems);
  }

  private reduceSortedResultItems(resultItems: SearchResultModel[]): SearchResultModel[] {
    if (resultItems.length === 0) {
      return [];
    }

    resultItems.sort((r1, r2) => {
      return r1.name?.localeCompare(r2.name);
    });
    return resultItems.slice(0, 20);
  }

  searchChanged(item: SearchResultModel) {
    console.log("Searched item: " + item);
  }
`,Ce=`
@Injectable({ providedIn: "root" })
export class DemoLocationBarContentProvider extends LocationBarContentProvider<DemoLocationBarComplexNodeId> {
  private searchPerformed$ = new ReplaySubject<SearchResponseModel<DemoLocationBarComplexNodeId>>(1);

  constructor() {
    super();
  }

  getLazyChildren(node: LocationBarNode<DemoLocationBarComplexNodeId>): Observable<LocationBarNode<DemoLocationBarComplexNodeId>[]> {
    if (node.id.id === "lazy") {
      return of([new LocationBarNode(new DemoLocationBarComplexNodeId("lazyChild"), "Lazy child")]);
    }
    return of([]);
  }

  searchPerformed(response: SearchResponseModel<DemoLocationBarComplexNodeId>): void {
    this.searchPerformed$.next(response);
  }

  getSearchPerformed(): Observable<SearchResponseModel<DemoLocationBarComplexNodeId>> {
    return this.searchPerformed$;
  }
`,ne=(()=>{class a extends J{contentProvider;standardExample=de;standardTSExample=ce;standardIDExample=se;preExample=me;preTSExample=he;lazyExample=pe;lazyTSExample=ue;lazyContentProvider=Se;providerModule=xe;searchExample=Ee;searchTSExample=fe;searchAlgExample=Le;searchContentProvider=Ce;roots1;roots2;rootsLazy;searchableRoot;searchResultItems=[];constructor(o){super("location-bar"),this.contentProvider=o}ngOnInit(){this.buildRoots1(),this.buildRoots2(),this.buildRootsLazy(),this.buildSearchableRoot([]),this.contentProvider.getSearchPerformed().subscribe(o=>this.onSearch(o))}buildRoots1(){let o=new l(new m("l1"),"L1"),r=new l(new m("l1.1"),"L1.1"),i=new l(new m("l1.1.1"),"L1.1.1"),s=new l(new m("l1.1.2"),"L1.1.2"),u=new l(new m("l1.2"),"L1.2"),f=new l(new m("l1.2.1"),"L1.2.1"),S=new l(new m("l2"),"L2"),h=new l(new m("l2.1"),"L2.1");u.setChildren([f]),r.setChildren([i,s]),o.setChildren([r,u]),S.setChildren([h]),this.roots1=[o,S]}buildRoots2(){let o=new l(new m("l1"),"L1",!1,!0),r=new l(new m("l1.1"),"L1.1",!0,!0),i=new l(new m("l1.1.1"),"L1.1.1"),s=new l(new m("l1.1.2"),"L1.1.2");r.setChildren([i,s]),o.setChildren([r]),this.roots2=[o]}buildRootsLazy(){let o=new l(new m("l1"),"L1"),r=new l(new m("lazy"),"Not lazy");o.setChildren([r]),this.rootsLazy=[o]}buildSearchableRoot(o){let r=new l(new x("1","Searchable child 1","child 1 code"),"Searchable child 1",!0,o.some(h=>h==="1")),i=new l(new x("11","Searchable child 1 child 1","child 11 code"),"Searchable child 1 child 1",!0,o.some(h=>h==="11")),s=new l(new x("12","Searchable child 1 child 2","child 12 code"),"Searchable child 1 child 2",!0,o.some(h=>h==="12")),u=new l(new x("2","Searchable child 2","child 2 code"),"Searchable child 2",!0,o.some(h=>h==="2")),f=new l(new x("21","Searchable child 2 child 1","child 21 code"),"Searchable child 2 child 1",!0,o.some(h=>h==="21")),S=new l(new x("0","Searchable root","root code"),"Searchable root");r.setChildren([i,s]),u.setChildren([f]),S.setChildren([r,u]),this.searchableRoot=[S]}onSearch(o){if(!o?.text){this.searchResultItems=[];return}let r=[],i=(s,u)=>{if(!s)return!1;let{id:f,name:S,code:h}=s.id,oe=[{value:S,labelPrefix:""},{value:f,labelPrefix:"Id"},{value:h,labelPrefix:"Code"}],v=u?`${u} / ${S}`:S,b=oe.find(C=>C.value.toUpperCase().includes(o.text.toUpperCase()));if(b&&r.push({id:f,name:v,code:h,label:b.labelPrefix?`${b.labelPrefix}: ${b.value}`:""}),s.getChildren())for(let C of s.getChildren())i(C,v);return!!b};o.searchableNodes.forEach(s=>i(s,"")),this.searchResultItems=this.reduceSortedResultItems(r)}reduceSortedResultItems(o){return o.length===0?[]:(o.sort((r,i)=>r.name?.localeCompare(i.name)),o.slice(0,20))}searchChanged(o){console.log("Searched item:",JSON.stringify(o)),this.buildSearchableRoot(this.getSelectedNodes(this.searchableRoot[0],o))}getSelectedNodes(o,r){if(!o.getChildren())return[];for(let i of o.getChildren()){let s=this.getSelectedNodes(i,r);if(i.id.id===r.id||s.length>0)return s.push(i.id.id),s}return[]}static \u0275fac=function(r){return new(r||a)(D(L))};static \u0275cmp=g({type:a,selectors:[["clr-location-bar-demo"]],hostVars:4,hostBindings:function(r,i){r&2&&q("content-area",!0)("dox-content-panel",!0)},standalone:!1,features:[T],decls:369,vars:23,consts:[["searchResultItemRef",""],[3,"title"],[1,"component-summary"],["id","design-guidelines"],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],[1,"clr-hidden-xs-down"],["id","code-examples"],["id","examples"],[3,"clrRoots"],[3,"clrCode"],["clrLanguage","typescript",3,"clrCode"],[3,"clrSearchItemChanged","clrRoots","clrSearchRequest","clrSearchResultItems"],[1,"label","label-light-blue"]],template:function(r,i){if(r&1&&(n(0,"clr-doc-wrapper",1)(1,"article")(2,"h5",2),e(3,"The location bar is used to select a node in hierarchical data."),t(),n(4,"div",3)(5,"h3"),e(6,"Features"),t(),n(7,"p"),e(8," Preselection: Nodes can be preselected by simply setting their "),n(9,"code",4),e(10,"preselected"),t(),e(11," attribute to "),n(12,"code",4),e(13,"true"),t(),e(14,". "),t(),n(15,"p"),e(16," Unselectable nodes: Only makes sense in combination with preselection. Preselect some parent nodes and set them unselectable to give some context, without allowing the user to change it. Attribute "),n(17,"code",4),e(18,"selectable"),t(),e(19," controls this behavior. "),t(),n(20,"p"),e(21," Lazy Loading: When loading of all data in advance is too expensive, the component also supports lazy loading of children. As soon as a node has an undefined children array, it will try to lazy load its children via the injected "),n(22,"code",4),e(23,"LocationBarContentProvider"),t(),e(24,", which needs to be provided via injection token "),n(25,"code",4),e(26,"CONTENT_PROVIDER"),t(),e(27,". See example below for implementation details. "),t(),n(28,"h6"),e(29,"Search"),t(),n(30,"p"),e(31," Location bar offers node search. In order to enable search, "),n(32,"code",4),e(33,"SearchRequestModel"),t(),e(34," need to be defined. When the search is performed, "),n(35,"code",4),e(36,"LocationBarContentProvider"),t(),e(37,", offers the method "),n(38,"code",4),e(39,"searchPerformed"),t(),e(40," to notify client that search if performed. "),n(41,"code",4),e(42,"SearchResponseModel"),t(),e(43," is returned as a result of a user search. Client need to implement own search functionality and pass "),n(44,"code",4),e(45,"SearchResultModel"),t(),e(46," to the location-bar again. "),t(),n(47,"h3"),e(48,"Usage"),t(),n(49,"p"),e(50," The component uses "),n(51,"code",4),e(52,"LocationBarNode\u227AT extends NodeId\u227B "),t(),e(53," for its values. The generic type "),n(54,"code",4),e(55,"T"),t(),e(56," represents the id of a node. "),t(),n(57,"h4"),e(58,"LocationBarNode description"),t(),n(59,"table",5)(60,"thead")(61,"tr")(62,"th",6),e(63,"attribute"),t(),n(64,"th",7),e(65,"Values"),t(),n(66,"th",6),e(67,"Effect"),t()()(),n(68,"tbody")(69,"tr")(70,"td",6)(71,"b"),e(72,"id"),t(),n(73,"div",8),e(74,"Type: T"),t()(),n(75,"td",7)(76,"code",4),e(77,"T extends NodeId"),t()(),n(78,"td",6),e(79,"The generic identifier of a node"),t()(),n(80,"tr")(81,"td",6)(82,"b"),e(83,"label"),t(),n(84,"div",8),e(85,"Type: string"),t()(),n(86,"td",7),e(87,"string"),t(),n(88,"td",6),e(89,"The label that will be displayed for a node/td>"),t()(),n(90,"tr")(91,"td",6)(92,"b"),e(93,"preSelected"),t(),n(94,"div",8),e(95,"Type: boolean"),t()(),n(96,"td",7),e(97,"boolean"),t(),n(98,"td",6),e(99,"Whether the node is preselected"),t()(),n(100,"tr")(101,"td",6)(102,"b"),e(103,"selectable"),t(),n(104,"div",8),e(105,"Type: boolean"),t()(),n(106,"td",7),e(107,"boolean"),t(),n(108,"td",6),e(109,"Whether the node is selectable"),t()(),n(110,"tr")(111,"td",6)(112,"b"),e(113,"setChildren(children: LocationBarNode<T>[])"),t(),n(114,"div",8),e(115,"Type: method"),t()(),n(116,"td",7),e(117,"method"),t(),n(118,"td",6),e(119,"Sets the children for the node"),t()()()(),n(120,"h4"),e(121,"SearchRequestModel description"),t(),n(122,"table",5)(123,"thead")(124,"tr")(125,"th",6),e(126,"attribute"),t(),n(127,"th",7),e(128,"Values"),t(),n(129,"th",6),e(130,"Effect"),t()()(),n(131,"tbody")(132,"tr")(133,"td",6)(134,"b"),e(135,"placeholder"),t(),n(136,"div",8),e(137,"Type: string"),t()(),n(138,"td",7),e(139,"string"),t(),n(140,"td",6),e(141,"Placeholder for input field"),t()(),n(142,"tr")(143,"td",6)(144,"b"),e(145,"noResultsText"),t(),n(146,"div",8),e(147,"Type: string"),t()(),n(148,"td",7),e(149,"string"),t(),n(150,"td",6),e(151,"Text displays that no search result found"),t()(),n(152,"tr")(153,"td",6)(154,"b"),e(155,"minCharacters"),t(),n(156,"div",8),e(157,"Type: number"),t()(),n(158,"td",7),e(159,"number"),t(),n(160,"td",6),e(161,"How many characters is needed to start search"),t()(),n(162,"tr")(163,"td",6)(164,"b"),e(165,"minCharacterText"),t(),n(166,"div",8),e(167,"Type: string"),t()(),n(168,"td",7),e(169,"string"),t(),n(170,"td",6),e(171,"Warning that search not performed because minCharacters not satisfied"),t()(),n(172,"tr")(173,"td",6)(174,"b"),e(175,"searchResultItemRef"),t(),n(176,"div",8),e(177,"Type: TemplateRef"),t()(),n(178,"td",7),e(179,"TemplateRef"),t(),n(180,"td",6),e(181,"Custom display for search result"),t()()()(),n(182,"h4"),e(183,"SearchResponseModel description"),t(),n(184,"table",5)(185,"thead")(186,"tr")(187,"th",6),e(188,"attribute"),t(),n(189,"th",7),e(190,"Values"),t(),n(191,"th",6),e(192,"Effect"),t()()(),n(193,"tbody")(194,"tr")(195,"td",6)(196,"b"),e(197,"text"),t(),n(198,"div",8),e(199,"Type: string"),t()(),n(200,"td",7),e(201,"string"),t(),n(202,"td",6),e(203,"Search text"),t()(),n(204,"tr")(205,"td",6)(206,"b"),e(207,"searchableNodes"),t(),n(208,"div",8),e(209,"Type: LocationBarNode[]"),t()(),n(210,"td",7),e(211,"LocationBarNode[]"),t(),n(212,"td",6),e(213,"Which nodes should be filtered based on search text"),t()()()(),n(214,"h4"),e(215,"SearchResultModel description"),t(),n(216,"table",5)(217,"thead")(218,"tr")(219,"th",6),e(220,"attribute"),t(),n(221,"th",7),e(222,"Values"),t(),n(223,"th",6),e(224,"Effect"),t()()(),n(225,"tbody")(226,"tr")(227,"td",6)(228,"b"),e(229,"[key: string]"),t(),n(230,"div",8),e(231,"Type: [key: string]"),t()(),n(232,"td",7),e(233,"[key: string]"),t(),n(234,"td",6),e(235,"Attributes for display after search is performed"),t()()()(),n(236,"h3"),e(237,"Summary of Options"),t(),n(238,"table",5)(239,"thead")(240,"tr")(241,"th",6),e(242,"Parameter"),t(),n(243,"th",7),e(244,"Values"),t(),n(245,"th",9),e(246,"Default"),t(),n(247,"th",6),e(248,"Effect"),t()()(),n(249,"tbody")(250,"tr")(251,"td",6)(252,"b"),e(253,"[clrRoots]"),t(),n(254,"div",8),e(255,"Type: LocationBarNode<T>[]"),t(),n(256,"div",8),e(257,"Default: []"),t()(),n(258,"td",7),e(259,"LocationBarNode<T>[]"),t(),n(260,"td",9),e(261,"[]"),t(),n(262,"td",6),e(263,"Value binding for control represented by a list of LocationBarNode<T>."),t()(),n(264,"tr")(265,"td",6)(266,"b"),e(267,"[clrIconShape]"),t(),n(268,"div",8),e(269,"Type: string"),t(),n(270,"div",8),e(271,'Default: "organization"'),t()(),n(272,"td",7),e(273,"string"),t(),n(274,"td",9),e(275,'"organization"'),t(),n(276,"td",6),e(277,"Name of the shape displayed before the location bar. Can be null to hide the icon."),t()(),n(278,"tr")(279,"td",6)(280,"b"),e(281,"[clrIconTitle]"),t(),n(282,"div",8),e(283,"Type: string"),t(),n(284,"div",8),e(285,'Default: ""'),t()(),n(286,"td",7),e(287,"string"),t(),n(288,"td",9),e(289,'""'),t(),n(290,"td",6),e(291,"Title attribute of the icon displayed before the location bar."),t()(),n(292,"tr")(293,"td",6)(294,"b"),e(295,"[clrSearchRequest]"),t(),n(296,"div",8),e(297,"Type: SearchRequestModel"),t(),n(298,"div",8),e(299,"Default: undefined"),t()(),n(300,"td",7),e(301,"SearchRequestModel"),t(),n(302,"td",9),e(303,"undefined"),t(),n(304,"td",6),e(305,"Request attributes for search."),t()(),n(306,"tr")(307,"td",6)(308,"b"),e(309,"[clrSearchRequest]"),t(),n(310,"div",8),e(311,"Type: SearchRequestModel"),t(),n(312,"div",8),e(313,"Default: undefined"),t()(),n(314,"td",7),e(315,"SearchRequestModel"),t(),n(316,"td",9),e(317,"undefined"),t(),n(318,"td",6),e(319,"Request attributes for search."),t()(),n(320,"tr")(321,"td",6)(322,"b"),e(323,"[clrSearchResultItems]"),t(),n(324,"div",8),e(325,"Type: SearchResultModel"),t(),n(326,"div",8),e(327,"Default: []"),t()(),n(328,"td",7),e(329,"SearchResultModel"),t(),n(330,"td",9),e(331,"[]"),t(),n(332,"td",6),e(333,"Result of the performed search"),t()()()()(),n(334,"div",10)(335,"h3",11),e(336,"Code & Examples"),t(),n(337,"h4"),e(338,"Standard behavior"),t(),n(339,"div"),E(340,"clr-location-bar",12),t(),E(341,"clr-code-snippet",13)(342,"clr-code-snippet",14)(343,"clr-code-snippet",14),n(344,"h4"),e(345,"Preselected nodes"),t(),n(346,"div"),E(347,"clr-location-bar",12),t(),E(348,"clr-code-snippet",13)(349,"clr-code-snippet",14),n(350,"h4"),e(351,"Lazy loading children"),t(),n(352,"div"),E(353,"clr-location-bar",12),t(),E(354,"clr-code-snippet",13)(355,"clr-code-snippet",14)(356,"clr-code-snippet",14)(357,"clr-code-snippet",14),n(358,"h4"),e(359,"Search"),t(),n(360,"div")(361,"clr-location-bar",15),A("clrSearchItemChanged",function(u){return i.searchChanged(u)}),M(362,le,2,2,"ng-template",null,0,j),t()(),E(364,"clr-code-snippet",13)(365,"clr-code-snippet",14)(366,"clr-code-snippet",14)(367,"clr-code-snippet",14)(368,"clr-code-snippet",14),t()()()),r&2){let s=$(363);c("title",i.title),d(340),c("clrRoots",i.roots1),d(),c("clrCode",i.standardExample),d(),c("clrCode",i.standardTSExample),d(),c("clrCode",i.standardIDExample),d(4),c("clrRoots",i.roots2),d(),c("clrCode",i.preExample),d(),c("clrCode",i.preTSExample),d(4),c("clrRoots",i.rootsLazy),d(),c("clrCode",i.lazyExample),d(),c("clrCode",i.lazyTSExample),d(),c("clrCode",i.lazyContentProvider),d(),c("clrCode",i.providerModule),d(4),c("clrRoots",i.searchableRoot)("clrSearchRequest",V(21,re,s))("clrSearchResultItems",i.searchResultItems),d(3),c("clrCode",i.searchExample),d(),c("clrCode",i.searchTSExample),d(),c("clrCode",i.searchAlgExample),d(),c("clrCode",i.searchContentProvider),d(),c("clrCode",i.providerModule)}},dependencies:[H,Z,K],encapsulation:2})}return a})();var Xe=(()=>{class a{static \u0275fac=function(r){return new(r||a)};static \u0275mod=P({type:a});static \u0275inj=w({providers:[{provide:k,useExisting:L}],imports:[X,W,Y,G,Q,U.forChild([{path:"",component:ne}])]})}return a})();export{Xe as LocationBarDemoModule};
