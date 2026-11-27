import{n as P,r as ie$1,t as O}from"./chunk-agnf9ZDH.js";import{$n as T,Ba as j,Bn as Rhe,Ms as v,Nt as Jt,O as B,Pa as ie$2,Pt as K,Qt as M,Ut as Kr,Wa as je,Wn as S,Zt as Lp,an as N,b as A,d as $,dn as O$1,ea as ee,ec as y,ga as ge,l as _e,na as en,s as O$2,sa as f,v as $n,vr as V,vt as I,ws as u,xa as gt}from"./main-MZS5HDZR.js";import{Bt as Gy,Gu as vo,Vn as Lo,f as $y,zi as Uy}from"./chunk-Dj4ysbNo.js";var m=class extends Uy{id;constructor(p){super(),this.id=p}equals(p){return this.id===p.id}};var x=class extends Uy{id;name;code;constructor(p,o,r){super(),this.id=p,this.name=o,this.code=r}equals(p){return this.id===p.id&&this.name===p.name&&this.code===p.code}};var R=(()=>{class a extends Gy{searchPerformed$=new $n(1);constructor(){super()}getLazyChildren(o){return o.id.id===`lazy`?ge([new vo(new m(`lazyChild`),`Lazy child`)]):ge([])}searchPerformed(o){this.searchPerformed$.next(o)}getSearchPerformed(){return this.searchPerformed$}static ɵfac=function(r){return new(r||a)};static ɵprov=V({token:a,factory:a.ɵfac,providedIn:`root`})}return a})();var ie=a=>({minCharacters:3,searchResultItemRef:a,placeholder:`My demo placeholder`});function re(a,p){if(a&1&&(y(0,`span`,16),ie$2(1),v()),a&2){let o=M().$implicit;f(),gt(` `,o.label)}}function ae(a,p){if(a&1&&(ie$2(0),I(1,re,2,1,`span`,16)),a&2){let o=p.$implicit;gt(` `,o.name,` `),f(),S(o.label?1:-1)}}var le=`
<clr-location-bar [clrRoots]="roots1"></clr-location-bar>
`;var de=`
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
`;var ce=`
export class DemoLocationBarNodeId extends NodeId {
  constructor(public id: string) {
    super();
  }

  equals(other: DemoLocationBarNodeId): boolean {
    return this.id === other.id;
  }
}
`;var se=`
<clr-location-bar [clrRoots]="roots2"></clr-location-bar>
`;var me=`
private buildRoots2() {
  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1", false, true);
  const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1"), "L1.1", true, true);
  const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.1"), "L1.1.1");
  const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.2"), "L1.1.2");

  l11.setChildren([l111, l112]);
  l1.setChildren([l11]);

  this.roots2 = [l1];
}
`;var he=`
<clr-location-bar [clrRoots]="rootsLazy"></clr-location-bar>
`;var pe=`
private buildRootsLazy() {
  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1");
  const lazy = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("lazy"), "Not lazy");

  l1.setChildren([lazy]);

  this.rootsLazy = [l1];
}
`;var ue=`
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
`;var Se=`
@NgModule({
  ...
  providers: [{ provide: CONTENT_PROVIDER, useExisting: DemoLocationBarContentProvider }]
})
export class LocationBarDemoModule {}
`;var xe=`
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
`;var Ee=`
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
`;var te={labelPrefix:``,value:``};var be=`
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
      const currentPath = path ? \` / ${name}\` : name;
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
`;var Le=`
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
`;var D=(()=>{class a extends P{contentProvider;standardExample=le;standardTSExample=de;standardIDExample=ce;preExample=se;preTSExample=me;lazyExample=he;lazyTSExample=pe;lazyContentProvider=ue;providerModule=Se;searchExample=xe;searchTSExample=Ee;searchAlgExample=be;searchContentProvider=Le;roots1;roots2;rootsLazy;searchableRoot;searchResultItems=[];constructor(o){super(`location-bar`),this.contentProvider=o}ngOnInit(){this.buildRoots1(),this.buildRoots2(),this.buildRootsLazy(),this.buildSearchableRoot([]),this.contentProvider.getSearchPerformed().subscribe(o=>this.onSearch(o))}buildRoots1(){let o=new vo(new m(`l1`),`L1`),r=new vo(new m(`l1.1`),`L1.1`),i=new vo(new m(`l1.1.1`),`L1.1.1`),s=new vo(new m(`l1.1.2`),`L1.1.2`),u=new vo(new m(`l1.2`),`L1.2`),f=new vo(new m(`l1.2.1`),`L1.2.1`),S=new vo(new m(`l2`),`L2`),h=new vo(new m(`l2.1`),`L2.1`);u.setChildren([f]),r.setChildren([i,s]),o.setChildren([r,u]),S.setChildren([h]),this.roots1=[o,S]}buildRoots2(){let o=new vo(new m(`l1`),`L1`,!1,!0),r=new vo(new m(`l1.1`),`L1.1`,!0,!0),i=new vo(new m(`l1.1.1`),`L1.1.1`),s=new vo(new m(`l1.1.2`),`L1.1.2`);r.setChildren([i,s]),o.setChildren([r]),this.roots2=[o]}buildRootsLazy(){let o=new vo(new m(`l1`),`L1`),r=new vo(new m(`lazy`),`Not lazy`);o.setChildren([r]),this.rootsLazy=[o]}buildSearchableRoot(o){let r=new vo(new x(`1`,`Searchable child 1`,`child 1 code`),`Searchable child 1`,!0,o.some(h=>h===`1`)),i=new vo(new x(`11`,`Searchable child 1 child 1`,`child 11 code`),`Searchable child 1 child 1`,!0,o.some(h=>h===`11`)),s=new vo(new x(`12`,`Searchable child 1 child 2`,`child 12 code`),`Searchable child 1 child 2`,!0,o.some(h=>h===`12`)),u=new vo(new x(`2`,`Searchable child 2`,`child 2 code`),`Searchable child 2`,!0,o.some(h=>h===`2`)),f=new vo(new x(`21`,`Searchable child 2 child 1`,`child 21 code`),`Searchable child 2 child 1`,!0,o.some(h=>h===`21`)),S=new vo(new x(`0`,`Searchable root`,`root code`),`Searchable root`);r.setChildren([i,s]),u.setChildren([f]),S.setChildren([r,u]),this.searchableRoot=[S]}onSearch(o){if(!o?.text){this.searchResultItems=[];return}let r=[],i=(s,u)=>{if(!s)return!1;let{id:f,name:S,code:h}=s.id,ne=[{value:S,labelPrefix:``},{value:f,labelPrefix:`Id`},{value:h,labelPrefix:`Code`}],g=u?`${u} / ${S}`:S,b=ne.find(v=>v.value.toUpperCase().includes(o.text.toUpperCase()));if(b&&r.push({id:f,name:g,code:h,label:b.labelPrefix?`${b.labelPrefix}: ${b.value}`:``}),s.getChildren())for(let v of s.getChildren())i(v,g);return!!b};o.searchableNodes.forEach(s=>i(s,``)),this.searchResultItems=this.reduceSortedResultItems(r)}reduceSortedResultItems(o){return o.length===0?[]:(o.sort((r,i)=>r.name?.localeCompare(i.name)),o.slice(0,20))}searchChanged(o){console.log(`Searched item:`,JSON.stringify(o)),this.buildSearchableRoot(this.getSelectedNodes(this.searchableRoot[0],o))}getSelectedNodes(o,r){if(!o.getChildren())return[];for(let i of o.getChildren()){let s=this.getSelectedNodes(i,r);if(i.id.id===r.id||s.length>0)return s.push(i.id.id),s}return[]}static ɵfac=function(r){return new(r||a)(u(R))};static ɵcmp=O$1({type:a,selectors:[[`clr-location-bar-demo`]],hostVars:4,hostBindings:function(r,i){r&2&&T(`content-area`,!0)(`dox-content-panel`,!0)},features:[ee],decls:369,vars:23,consts:[[`searchResultItemRef`,``],[3,`title`],[1,`component-summary`],[`id`,`design-guidelines`],[1,`clr-code`],[1,`table`],[1,`left`],[1,`left`,`clr-hidden-xs-down`],[1,`clr-hidden-sm-up`],[1,`clr-hidden-xs-down`],[`id`,`code-examples`],[`id`,`examples`],[3,`clrRoots`],[3,`clrCode`],[`clrLanguage`,`typescript`,3,`clrCode`],[3,`clrSearchItemChanged`,`clrRoots`,`clrSearchRequest`,`clrSearchResultItems`],[1,`label`,`label-light-blue`]],template:function(r,i){if(r&1&&(y(0,`clr-doc-wrapper`,1)(1,`article`)(2,`h5`,2),ie$2(3,`The location bar is used to select a node in hierarchical data.`),v(),y(4,`div`,3)(5,`h3`),ie$2(6,`Features`),v(),y(7,`p`),ie$2(8,` Preselection: Nodes can be preselected by simply setting their `),y(9,`code`,4),ie$2(10,`preselected`),v(),ie$2(11,` attribute to `),y(12,`code`,4),ie$2(13,`true`),v(),ie$2(14,`. `),v(),y(15,`p`),ie$2(16,` Unselectable nodes: Only makes sense in combination with preselection. Preselect some parent nodes and set them unselectable to give some context, without allowing the user to change it. Attribute `),y(17,`code`,4),ie$2(18,`selectable`),v(),ie$2(19,` controls this behavior. `),v(),y(20,`p`),ie$2(21,` Lazy Loading: When loading of all data in advance is too expensive, the component also supports lazy loading of children. As soon as a node has an undefined children array, it will try to lazy load its children via the injected `),y(22,`code`,4),ie$2(23,`LocationBarContentProvider`),v(),ie$2(24,`, which needs to be provided via injection token `),y(25,`code`,4),ie$2(26,`CONTENT_PROVIDER`),v(),ie$2(27,`. See example below for implementation details. `),v(),y(28,`h6`),ie$2(29,`Search`),v(),y(30,`p`),ie$2(31,` Location bar offers node search. In order to enable search, `),y(32,`code`,4),ie$2(33,`SearchRequestModel`),v(),ie$2(34,` need to be defined. When the search is performed, `),y(35,`code`,4),ie$2(36,`LocationBarContentProvider`),v(),ie$2(37,`, offers the method `),y(38,`code`,4),ie$2(39,`searchPerformed`),v(),ie$2(40,` to notify client that search if performed. `),y(41,`code`,4),ie$2(42,`SearchResponseModel`),v(),ie$2(43,` is returned as a result of a user search. Client need to implement own search functionality and pass `),y(44,`code`,4),ie$2(45,`SearchResultModel`),v(),ie$2(46,` to the location-bar again. `),v(),y(47,`h3`),ie$2(48,`Usage`),v(),y(49,`p`),ie$2(50,` The component uses `),y(51,`code`,4),ie$2(52,`LocationBarNode≺T extends NodeId≻ `),v(),ie$2(53,` for its values. The generic type `),y(54,`code`,4),ie$2(55,`T`),v(),ie$2(56,` represents the id of a node. `),v(),y(57,`h4`),ie$2(58,`LocationBarNode description`),v(),y(59,`table`,5)(60,`thead`)(61,`tr`)(62,`th`,6),ie$2(63,`attribute`),v(),y(64,`th`,7),ie$2(65,`Values`),v(),y(66,`th`,6),ie$2(67,`Effect`),v()()(),y(68,`tbody`)(69,`tr`)(70,`td`,6)(71,`b`),ie$2(72,`id`),v(),y(73,`div`,8),ie$2(74,`Type: T`),v()(),y(75,`td`,7)(76,`code`,4),ie$2(77,`T extends NodeId`),v()(),y(78,`td`,6),ie$2(79,`The generic identifier of a node`),v()(),y(80,`tr`)(81,`td`,6)(82,`b`),ie$2(83,`label`),v(),y(84,`div`,8),ie$2(85,`Type: string`),v()(),y(86,`td`,7),ie$2(87,`string`),v(),y(88,`td`,6),ie$2(89,`The label that will be displayed for a node/td>`),v()(),y(90,`tr`)(91,`td`,6)(92,`b`),ie$2(93,`preSelected`),v(),y(94,`div`,8),ie$2(95,`Type: boolean`),v()(),y(96,`td`,7),ie$2(97,`boolean`),v(),y(98,`td`,6),ie$2(99,`Whether the node is preselected`),v()(),y(100,`tr`)(101,`td`,6)(102,`b`),ie$2(103,`selectable`),v(),y(104,`div`,8),ie$2(105,`Type: boolean`),v()(),y(106,`td`,7),ie$2(107,`boolean`),v(),y(108,`td`,6),ie$2(109,`Whether the node is selectable`),v()(),y(110,`tr`)(111,`td`,6)(112,`b`),ie$2(113,`setChildren(children: LocationBarNode<T>[])`),v(),y(114,`div`,8),ie$2(115,`Type: method`),v()(),y(116,`td`,7),ie$2(117,`method`),v(),y(118,`td`,6),ie$2(119,`Sets the children for the node`),v()()()(),y(120,`h4`),ie$2(121,`SearchRequestModel description`),v(),y(122,`table`,5)(123,`thead`)(124,`tr`)(125,`th`,6),ie$2(126,`attribute`),v(),y(127,`th`,7),ie$2(128,`Values`),v(),y(129,`th`,6),ie$2(130,`Effect`),v()()(),y(131,`tbody`)(132,`tr`)(133,`td`,6)(134,`b`),ie$2(135,`placeholder`),v(),y(136,`div`,8),ie$2(137,`Type: string`),v()(),y(138,`td`,7),ie$2(139,`string`),v(),y(140,`td`,6),ie$2(141,`Placeholder for input field`),v()(),y(142,`tr`)(143,`td`,6)(144,`b`),ie$2(145,`noResultsText`),v(),y(146,`div`,8),ie$2(147,`Type: string`),v()(),y(148,`td`,7),ie$2(149,`string`),v(),y(150,`td`,6),ie$2(151,`Text displays that no search result found`),v()(),y(152,`tr`)(153,`td`,6)(154,`b`),ie$2(155,`minCharacters`),v(),y(156,`div`,8),ie$2(157,`Type: number`),v()(),y(158,`td`,7),ie$2(159,`number`),v(),y(160,`td`,6),ie$2(161,`How many characters is needed to start search`),v()(),y(162,`tr`)(163,`td`,6)(164,`b`),ie$2(165,`minCharacterText`),v(),y(166,`div`,8),ie$2(167,`Type: string`),v()(),y(168,`td`,7),ie$2(169,`string`),v(),y(170,`td`,6),ie$2(171,`Warning that search not performed because minCharacters not satisfied`),v()(),y(172,`tr`)(173,`td`,6)(174,`b`),ie$2(175,`searchResultItemRef`),v(),y(176,`div`,8),ie$2(177,`Type: TemplateRef`),v()(),y(178,`td`,7),ie$2(179,`TemplateRef`),v(),y(180,`td`,6),ie$2(181,`Custom display for search result`),v()()()(),y(182,`h4`),ie$2(183,`SearchResponseModel description`),v(),y(184,`table`,5)(185,`thead`)(186,`tr`)(187,`th`,6),ie$2(188,`attribute`),v(),y(189,`th`,7),ie$2(190,`Values`),v(),y(191,`th`,6),ie$2(192,`Effect`),v()()(),y(193,`tbody`)(194,`tr`)(195,`td`,6)(196,`b`),ie$2(197,`text`),v(),y(198,`div`,8),ie$2(199,`Type: string`),v()(),y(200,`td`,7),ie$2(201,`string`),v(),y(202,`td`,6),ie$2(203,`Search text`),v()(),y(204,`tr`)(205,`td`,6)(206,`b`),ie$2(207,`searchableNodes`),v(),y(208,`div`,8),ie$2(209,`Type: LocationBarNode[]`),v()(),y(210,`td`,7),ie$2(211,`LocationBarNode[]`),v(),y(212,`td`,6),ie$2(213,`Which nodes should be filtered based on search text`),v()()()(),y(214,`h4`),ie$2(215,`SearchResultModel description`),v(),y(216,`table`,5)(217,`thead`)(218,`tr`)(219,`th`,6),ie$2(220,`attribute`),v(),y(221,`th`,7),ie$2(222,`Values`),v(),y(223,`th`,6),ie$2(224,`Effect`),v()()(),y(225,`tbody`)(226,`tr`)(227,`td`,6)(228,`b`),ie$2(229,`[key: string]`),v(),y(230,`div`,8),ie$2(231,`Type: [key: string]`),v()(),y(232,`td`,7),ie$2(233,`[key: string]`),v(),y(234,`td`,6),ie$2(235,`Attributes for display after search is performed`),v()()()(),y(236,`h3`),ie$2(237,`Summary of Options`),v(),y(238,`table`,5)(239,`thead`)(240,`tr`)(241,`th`,6),ie$2(242,`Parameter`),v(),y(243,`th`,7),ie$2(244,`Values`),v(),y(245,`th`,9),ie$2(246,`Default`),v(),y(247,`th`,6),ie$2(248,`Effect`),v()()(),y(249,`tbody`)(250,`tr`)(251,`td`,6)(252,`b`),ie$2(253,`[clrRoots]`),v(),y(254,`div`,8),ie$2(255,`Type: LocationBarNode<T>[]`),v(),y(256,`div`,8),ie$2(257,`Default: []`),v()(),y(258,`td`,7),ie$2(259,`LocationBarNode<T>[]`),v(),y(260,`td`,9),ie$2(261,`[]`),v(),y(262,`td`,6),ie$2(263,`Value binding for control represented by a list of LocationBarNode<T>.`),v()(),y(264,`tr`)(265,`td`,6)(266,`b`),ie$2(267,`[clrIconShape]`),v(),y(268,`div`,8),ie$2(269,`Type: string`),v(),y(270,`div`,8),ie$2(271,`Default: "organization"`),v()(),y(272,`td`,7),ie$2(273,`string`),v(),y(274,`td`,9),ie$2(275,`"organization"`),v(),y(276,`td`,6),ie$2(277,`Name of the shape displayed before the location bar. Can be null to hide the icon.`),v()(),y(278,`tr`)(279,`td`,6)(280,`b`),ie$2(281,`[clrIconTitle]`),v(),y(282,`div`,8),ie$2(283,`Type: string`),v(),y(284,`div`,8),ie$2(285,`Default: ""`),v()(),y(286,`td`,7),ie$2(287,`string`),v(),y(288,`td`,9),ie$2(289,`""`),v(),y(290,`td`,6),ie$2(291,`Title attribute of the icon displayed before the location bar.`),v()(),y(292,`tr`)(293,`td`,6)(294,`b`),ie$2(295,`[clrSearchRequest]`),v(),y(296,`div`,8),ie$2(297,`Type: SearchRequestModel`),v(),y(298,`div`,8),ie$2(299,`Default: undefined`),v()(),y(300,`td`,7),ie$2(301,`SearchRequestModel`),v(),y(302,`td`,9),ie$2(303,`undefined`),v(),y(304,`td`,6),ie$2(305,`Request attributes for search.`),v()(),y(306,`tr`)(307,`td`,6)(308,`b`),ie$2(309,`[clrSearchRequest]`),v(),y(310,`div`,8),ie$2(311,`Type: SearchRequestModel`),v(),y(312,`div`,8),ie$2(313,`Default: undefined`),v()(),y(314,`td`,7),ie$2(315,`SearchRequestModel`),v(),y(316,`td`,9),ie$2(317,`undefined`),v(),y(318,`td`,6),ie$2(319,`Request attributes for search.`),v()(),y(320,`tr`)(321,`td`,6)(322,`b`),ie$2(323,`[clrSearchResultItems]`),v(),y(324,`div`,8),ie$2(325,`Type: SearchResultModel`),v(),y(326,`div`,8),ie$2(327,`Default: []`),v()(),y(328,`td`,7),ie$2(329,`SearchResultModel`),v(),y(330,`td`,9),ie$2(331,`[]`),v(),y(332,`td`,6),ie$2(333,`Result of the performed search`),v()()()()(),y(334,`div`,10)(335,`h3`,11),ie$2(336,`Code & Examples`),v(),y(337,`h4`),ie$2(338,`Standard behavior`),v(),y(339,`div`),j(340,`clr-location-bar`,12),v(),j(341,`clr-code-snippet`,13)(342,`clr-code-snippet`,14)(343,`clr-code-snippet`,14),y(344,`h4`),ie$2(345,`Preselected nodes`),v(),y(346,`div`),j(347,`clr-location-bar`,12),v(),j(348,`clr-code-snippet`,13)(349,`clr-code-snippet`,14),y(350,`h4`),ie$2(351,`Lazy loading children`),v(),y(352,`div`),j(353,`clr-location-bar`,12),v(),j(354,`clr-code-snippet`,13)(355,`clr-code-snippet`,14)(356,`clr-code-snippet`,14)(357,`clr-code-snippet`,14),y(358,`h4`),ie$2(359,`Search`),v(),y(360,`div`)(361,`clr-location-bar`,15),N(`clrSearchItemChanged`,function(u){return i.searchChanged(u)}),je(362,ae,2,2,`ng-template`,null,0,en),v()(),j(364,`clr-code-snippet`,13)(365,`clr-code-snippet`,14)(366,`clr-code-snippet`,14)(367,`clr-code-snippet`,14)(368,`clr-code-snippet`,14),v()()()),r&2){let s=Jt(363);A(`title`,i.title),f(340),A(`clrRoots`,i.roots1),f(),A(`clrCode`,i.standardExample),f(),A(`clrCode`,i.standardTSExample),f(),A(`clrCode`,i.standardIDExample),f(4),A(`clrRoots`,i.roots2),f(),A(`clrCode`,i.preExample),f(),A(`clrCode`,i.preTSExample),f(4),A(`clrRoots`,i.rootsLazy),f(),A(`clrCode`,i.lazyExample),f(),A(`clrCode`,i.lazyTSExample),f(),A(`clrCode`,i.lazyContentProvider),f(),A(`clrCode`,i.providerModule),f(4),A(`clrRoots`,i.searchableRoot)(`clrSearchRequest`,Kr(21,ie,s))(`clrSearchResultItems`,i.searchResultItems),f(3),A(`clrCode`,i.searchExample),f(),A(`clrCode`,i.searchTSExample),f(),A(`clrCode`,i.searchAlgExample),f(),A(`clrCode`,i.searchContentProvider),f(),A(`clrCode`,i.providerModule)}},dependencies:[O,$y,O$2,K,Rhe,_e,ie$1],encapsulation:2,changeDetection:1})}return a})();var We=(()=>{class a{static ɵfac=function(r){return new(r||a)};static ɵmod=$({type:a});static ɵinj=B({providers:[{provide:Lo,useExisting:R}],imports:[K,Rhe,_e,ie$1,Lp.forChild([{path:``,component:D}]),D]})}return a})();export{We as LocationBarDemoModule};