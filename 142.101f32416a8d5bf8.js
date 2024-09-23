"use strict";(self.webpackChunkclarity=self.webpackChunkclarity||[]).push([[142],{72142:(J,b,l)=>{l.r(b),l.d(b,{LocationBarDemoModule:()=>q});var L=l(60177),I=l(5928),N=l(42663),r=l(36366),C=l(63275),B=l(20786),S=l(92771),f=l(7673);class n extends r.WSw{id;constructor(c){super(),this.id=c}equals(c){return this.id===c.id}}class F extends r.WSw{id;name;code;constructor(c,o,a){super(),this.id=c,this.name=o,this.code=a}equals(c){return this.id===c.id&&this.name===c.name&&this.code===c.code}}var e=l(54438);let j=(()=>{class s extends r.TJJ{searchPerformed$=new S.m(1);constructor(){super()}getLazyChildren(o){return(0,f.of)("lazy"===o.id.id?[new r.V1P(new n("lazyChild"),"Lazy child")]:[])}searchPerformed(o){this.searchPerformed$.next(o)}getSearchPerformed(){return this.searchPerformed$}static \u0275fac=function(a){return new(a||s)};static \u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"root"})}return s})();var v=l(2985),y=l(87620),w=l(91464);const D=s=>({minCharacters:3,searchResultItemRef:s,placeholder:"My demo placeholder"});function P(s,c){if(1&s&&(e.j41(0,"span",17),e.EFF(1),e.k0s()),2&s){const o=e.XpG().$implicit;e.R7$(),e.SpI(" ",o.label,"")}}function g(s,c){if(1&s&&(e.EFF(0),e.DNE(1,P,2,1,"span",16)),2&s){const o=c.$implicit;e.SpI(" ",o.name," "),e.R7$(),e.Y8G("ngIf",o.label)}}const U=`\n onSearch(response: SearchResponseModel<DemoLocationBarComplexNodeId>): void {\n    if (!response?.text) {\n      this.searchResultItems = [];\n      return;\n    }\n\n    const resultItems: SearchResultModel[] = [];\n    const searchNode = (node: LocationBarNode<DemoLocationBarComplexNodeId>, path: string): boolean => {\n      if (!node) {\n        return false;\n      }\n\n      const { id, name, code } = node.id;\n      const attributes = [\n        { value: name, labelPrefix: '' },\n        { value: id, labelPrefix: 'Id' },\n        { value: code, labelPrefix: 'Code' },\n      ];\n      const currentPath = path ? \` / ${name}\` : name;\n      const found = attributes.find(attr => attr.value.toUpperCase().includes(response.text.toUpperCase()));\n      if (found) {\n        resultItems.push({\n          id: id,\n          name: currentPath,\n          code: code,\n          label: found.labelPrefix ? \`: \` : '',\n        });\n      }\n\n      // Recursively search the node's children\n      if (node.getChildren()) {\n        for (const child of node.getChildren()) {\n          searchNode(child, currentPath);\n        }\n      }\n      return !!found;\n    };\n\n    response.searchableNodes.forEach(node => searchNode(node, ''));\n    this.searchResultItems = this.reduceSortedResultItems(resultItems);\n  }\n\n  private reduceSortedResultItems(resultItems: SearchResultModel[]): SearchResultModel[] {\n    if (resultItems.length === 0) {\n      return [];\n    }\n\n    resultItems.sort((r1, r2) => {\n      return r1.name?.localeCompare(r2.name);\n    });\n    return resultItems.slice(0, 20);\n  }\n\n  searchChanged(item: SearchResultModel) {\n    console.log("Searched item: " + item);\n  }\n`;let H=(()=>{class s extends v.S{contentProvider;standardExample='\n<clr-location-bar [clrRoots]="roots1"></clr-location-bar>\n';standardTSExample='\nprivate buildRoots1() {\n  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1");\n  const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1"), "L1.1");\n  const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.1"), "L1.1.1");\n  const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.2"), "L1.1.2");\n  const l12 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.2"), "L1.2");\n  const l121 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.2.1"), "L1.2.1");\n\n  const l2 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l2"), "L2");\n  const l21 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l2.1"), "L2.1");\n\n  l12.setChildren([l121]);\n  l11.setChildren([l111, l112]);\n  l1.setChildren([l11, l12]);\n\n  l2.setChildren([l21]);\n\n  this.roots1 = [l1, l2];\n}\n';standardIDExample="\nexport class DemoLocationBarNodeId extends NodeId {\n  constructor(public id: string) {\n    super();\n  }\n\n  equals(other: DemoLocationBarNodeId): boolean {\n    return this.id === other.id;\n  }\n}\n";preExample='\n<clr-location-bar [clrRoots]="roots2"></clr-location-bar>\n';preTSExample='\nprivate buildRoots2() {\n  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1", false, true);\n  const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1"), "L1.1", true, true);\n  const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.1"), "L1.1.1");\n  const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.2"), "L1.1.2");\n\n  l11.setChildren([l111, l112]);\n  l1.setChildren([l11]);\n\n  this.roots2 = [l1];\n}\n';lazyExample='\n<clr-location-bar [clrRoots]="rootsLazy"></clr-location-bar>\n';lazyTSExample='\nprivate buildRootsLazy() {\n  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1");\n  const lazy = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("lazy"), "Not lazy");\n\n  l1.setChildren([lazy]);\n\n  this.rootsLazy = [l1];\n}\n';lazyContentProvider='\n@Injectable({ providedIn: "root" })\nexport class DemoLocationBarContentProvider extends LocationBarContentProvider<DemoLocationBarNodeId> {\n  constructor() {\n    super();\n  }\n\n  getLazyChildren(node: LocationBarNode<DemoLocationBarNodeId>): Observable<LocationBarNode<DemoLocationBarNodeId>[]> {\n    if (node.id.id === "lazy") {\n      return of([new LocationBarNode(new DemoLocationBarNodeId("lazyChild"), "Lazy child")]);\n    }\n    return of([]);\n  }\n}\n';providerModule="\n@NgModule({\n  ...\n  providers: [{ provide: CONTENT_PROVIDER, useExisting: DemoLocationBarContentProvider }]\n})\nexport class LocationBarDemoModule {}\n";searchExample='\n<clr-location-bar [clrRoots]="searchableRoot"\n                  [clrSearchRequest]="{ minCharacters: 3,\n                          searchResultItemRef: searchResultItemRef,\n                          placeholder: \'My demo placeholder\'}"\n                  [clrSearchResultItems]="searchResultItems"\n                  (clrSearchItemChanged)="searchChanged($event)">\n  <ng-template #searchResultItemRef let-searchResultItem>\n   {{searchResultItem.name}}\n   <span *ngIf="searchResultItem.label" class="label label-light-blue"> {{searchResultItem.label}}</span>\n  </ng-template>\n</clr-location-bar>\n';searchTSExample="\n ngOnInit() {\n    this.buildSearchableRoot();\n    \n    /* receive search event */\n    this.contentProvider.getSearchPerformed().subscribe(response => this.onSearch(response));\n  }\n  \n   private buildSearchableRoot(): void {\n    const child1 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('1', 'Searchable child 1', 'child 1 code'), 'Searchable child 1');\n    const child11 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('11', 'Searchable child 1 child 1', 'child 11 code'), 'Searchable child 1 child 1');\n    const child12 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('12', 'Searchable child 1 child 2', 'child 12 code'), 'Searchable child 1 child 2');\n\n\n    const child2 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('2', 'Searchable child 2', 'child 2 code'), 'Searchable child 2');\n    const child21 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('21', 'Searchable child 2 child 1', 'child 21 code'), 'Searchable child 2 child 1');\n\n    const root = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('0', 'Searchable root', 'root code'), 'Searchable root');\n\n    child1.setChildren([child11, child12]);\n    child2.setChildren([child21]);\n    root.setChildren([child1, child2]);\n    this.searchableRoot = [root]\n  }\n";searchAlgExample=U;searchContentProvider='\n@Injectable({ providedIn: "root" })\nexport class DemoLocationBarContentProvider extends LocationBarContentProvider<DemoLocationBarComplexNodeId> {\n  private searchPerformed$ = new ReplaySubject<SearchResponseModel<DemoLocationBarComplexNodeId>>(1);\n\n  constructor() {\n    super();\n  }\n\n  getLazyChildren(node: LocationBarNode<DemoLocationBarComplexNodeId>): Observable<LocationBarNode<DemoLocationBarComplexNodeId>[]> {\n    if (node.id.id === "lazy") {\n      return of([new LocationBarNode(new DemoLocationBarComplexNodeId("lazyChild"), "Lazy child")]);\n    }\n    return of([]);\n  }\n\n  searchPerformed(response: SearchResponseModel<DemoLocationBarComplexNodeId>): void {\n    this.searchPerformed$.next(response);\n  }\n\n  getSearchPerformed(): Observable<SearchResponseModel<DemoLocationBarComplexNodeId>> {\n    return this.searchPerformed$;\n  }\n';roots1;roots2;rootsLazy;searchableRoot;searchResultItems=[];constructor(o){super("location-bar"),this.contentProvider=o}ngOnInit(){this.buildRoots1(),this.buildRoots2(),this.buildRootsLazy(),this.buildSearchableRoot(),this.contentProvider.getSearchPerformed().subscribe(o=>this.onSearch(o))}buildRoots1(){const o=new r.V1P(new n("l1"),"L1"),a=new r.V1P(new n("l1.1"),"L1.1"),t=new r.V1P(new n("l1.1.1"),"L1.1.1"),d=new r.V1P(new n("l1.1.2"),"L1.1.2"),h=new r.V1P(new n("l1.2"),"L1.2"),i=new r.V1P(new n("l1.2.1"),"L1.2.1"),m=new r.V1P(new n("l2"),"L2"),p=new r.V1P(new n("l2.1"),"L2.1");h.setChildren([i]),a.setChildren([t,d]),o.setChildren([a,h]),m.setChildren([p]),this.roots1=[o,m]}buildRoots2(){const o=new r.V1P(new n("l1"),"L1",!1,!0),a=new r.V1P(new n("l1.1"),"L1.1",!0,!0),t=new r.V1P(new n("l1.1.1"),"L1.1.1"),d=new r.V1P(new n("l1.1.2"),"L1.1.2");a.setChildren([t,d]),o.setChildren([a]),this.roots2=[o]}buildRootsLazy(){const o=new r.V1P(new n("l1"),"L1"),a=new r.V1P(new n("lazy"),"Not lazy");o.setChildren([a]),this.rootsLazy=[o]}buildSearchableRoot(){const o=new r.V1P(new F("1","Searchable child 1","child 1 code"),"Searchable child 1"),a=new r.V1P(new F("11","Searchable child 1 child 1","child 11 code"),"Searchable child 1 child 1"),t=new r.V1P(new F("12","Searchable child 1 child 2","child 12 code"),"Searchable child 1 child 2"),d=new r.V1P(new F("2","Searchable child 2","child 2 code"),"Searchable child 2"),h=new r.V1P(new F("21","Searchable child 2 child 1","child 21 code"),"Searchable child 2 child 1"),i=new r.V1P(new F("0","Searchable root","root code"),"Searchable root");o.setChildren([a,t]),d.setChildren([h]),i.setChildren([o,d]),this.searchableRoot=[i]}onSearch(o){if(!o?.text)return void(this.searchResultItems=[]);const a=[],t=(d,h)=>{if(!d)return!1;const{id:i,name:m,code:p}=d.id,R=h?`${h} / ${m}`:m,u=[{value:m,labelPrefix:""},{value:i,labelPrefix:"Id"},{value:p,labelPrefix:"Code"}].find(E=>E.value.toUpperCase().includes(o.text.toUpperCase()));if(u&&a.push({id:i,name:R,code:p,label:u.labelPrefix?`${u.labelPrefix}: ${u.value}`:""}),d.getChildren())for(const E of d.getChildren())t(E,R);return!!u};o.searchableNodes.forEach(d=>t(d,"")),this.searchResultItems=this.reduceSortedResultItems(a)}reduceSortedResultItems(o){return 0===o.length?[]:(o.sort((a,t)=>a.name?.localeCompare(t.name)),o.slice(0,20))}searchChanged(o){console.log("Searched item: "+o)}static \u0275fac=function(a){return new(a||s)(e.rXU(j))};static \u0275cmp=e.VBU({type:s,selectors:[["clr-location-bar-demo"]],hostVars:4,hostBindings:function(a,t){2&a&&e.AVh("content-area",!0)("dox-content-panel",!0)},features:[e.Vt3],decls:369,vars:23,consts:[["searchResultItemRef",""],[3,"title"],[1,"component-summary"],["id","design-guidelines"],[1,"clr-code"],[1,"table"],[1,"left"],[1,"left","clr-hidden-xs-down"],[1,"clr-hidden-sm-up"],[1,"clr-hidden-xs-down"],["id","code-examples"],["id","examples"],[3,"clrRoots"],[3,"clrCode"],["clrLanguage","typescript",3,"clrCode"],[3,"clrSearchItemChanged","clrRoots","clrSearchRequest","clrSearchResultItems"],["class","label label-light-blue",4,"ngIf"],[1,"label","label-light-blue"]],template:function(a,t){if(1&a){const d=e.RV6();e.j41(0,"clr-doc-wrapper",1)(1,"article")(2,"h5",2),e.EFF(3,"The location bar is used to select a node in hierarchical data."),e.k0s(),e.j41(4,"div",3)(5,"h3"),e.EFF(6,"Features"),e.k0s(),e.j41(7,"p"),e.EFF(8," Preselection: Nodes can be preselected by simply setting their "),e.j41(9,"code",4),e.EFF(10,"preselected"),e.k0s(),e.EFF(11," attribute to "),e.j41(12,"code",4),e.EFF(13,"true"),e.k0s(),e.EFF(14,". "),e.k0s(),e.j41(15,"p"),e.EFF(16," Unselectable nodes: Only makes sense in combination with preselection. Preselect some parent nodes and set them unselectable to give some context, without allowing the user to change it. Attribute "),e.j41(17,"code",4),e.EFF(18,"selectable"),e.k0s(),e.EFF(19," controls this behavior. "),e.k0s(),e.j41(20,"p"),e.EFF(21," Lazy Loading: When loading of all data in advance is too expensive, the component also supports lazy loading of children. As soon as a node has an undefined children array, it will try to lazy load its children via the injected "),e.j41(22,"code",4),e.EFF(23,"LocationBarContentProvider"),e.k0s(),e.EFF(24,", which needs to be provided via injection token "),e.j41(25,"code",4),e.EFF(26,"CONTENT_PROVIDER"),e.k0s(),e.EFF(27,". See example below for implementation details. "),e.k0s(),e.j41(28,"h6"),e.EFF(29,"Search"),e.k0s(),e.j41(30,"p"),e.EFF(31," Location bar offers node search. In order to enable search, "),e.j41(32,"code",4),e.EFF(33,"SearchRequestModel"),e.k0s(),e.EFF(34," need to be defined. When the search is performed, "),e.j41(35,"code",4),e.EFF(36,"LocationBarContentProvider"),e.k0s(),e.EFF(37,", offers the method "),e.j41(38,"code",4),e.EFF(39,"searchPerformed"),e.k0s(),e.EFF(40," to notify client that search if performed. "),e.j41(41,"code",4),e.EFF(42,"SearchResponseModel"),e.k0s(),e.EFF(43," is returned as a result of a user search. Client need to implement own search functionality and pass "),e.j41(44,"code",4),e.EFF(45,"SearchResultModel"),e.k0s(),e.EFF(46," to the location-bar again. "),e.k0s(),e.j41(47,"h3"),e.EFF(48,"Usage"),e.k0s(),e.j41(49,"p"),e.EFF(50," The component uses "),e.j41(51,"code",4),e.EFF(52,"LocationBarNode\u227aT extends NodeId\u227b "),e.k0s(),e.EFF(53," for its values. The generic type "),e.j41(54,"code",4),e.EFF(55,"T"),e.k0s(),e.EFF(56," represents the id of a node. "),e.k0s(),e.j41(57,"h4"),e.EFF(58,"LocationBarNode description"),e.k0s(),e.j41(59,"table",5)(60,"thead")(61,"tr")(62,"th",6),e.EFF(63,"attribute"),e.k0s(),e.j41(64,"th",7),e.EFF(65,"Values"),e.k0s(),e.j41(66,"th",6),e.EFF(67,"Effect"),e.k0s()()(),e.j41(68,"tbody")(69,"tr")(70,"td",6)(71,"b"),e.EFF(72,"id"),e.k0s(),e.j41(73,"div",8),e.EFF(74,"Type: T"),e.k0s()(),e.j41(75,"td",7)(76,"code",4),e.EFF(77,"T extends NodeId"),e.k0s()(),e.j41(78,"td",6),e.EFF(79,"The generic identifier of a node"),e.k0s()(),e.j41(80,"tr")(81,"td",6)(82,"b"),e.EFF(83,"label"),e.k0s(),e.j41(84,"div",8),e.EFF(85,"Type: string"),e.k0s()(),e.j41(86,"td",7),e.EFF(87,"string"),e.k0s(),e.j41(88,"td",6),e.EFF(89,"The label that will be displayed for a node/td>"),e.k0s()(),e.j41(90,"tr")(91,"td",6)(92,"b"),e.EFF(93,"preSelected"),e.k0s(),e.j41(94,"div",8),e.EFF(95,"Type: boolean"),e.k0s()(),e.j41(96,"td",7),e.EFF(97,"boolean"),e.k0s(),e.j41(98,"td",6),e.EFF(99,"Whether the node is preselected"),e.k0s()(),e.j41(100,"tr")(101,"td",6)(102,"b"),e.EFF(103,"selectable"),e.k0s(),e.j41(104,"div",8),e.EFF(105,"Type: boolean"),e.k0s()(),e.j41(106,"td",7),e.EFF(107,"boolean"),e.k0s(),e.j41(108,"td",6),e.EFF(109,"Whether the node is selectable"),e.k0s()(),e.j41(110,"tr")(111,"td",6)(112,"b"),e.EFF(113,"setChildren(children: LocationBarNode<T>[])"),e.k0s(),e.j41(114,"div",8),e.EFF(115,"Type: method"),e.k0s()(),e.j41(116,"td",7),e.EFF(117,"method"),e.k0s(),e.j41(118,"td",6),e.EFF(119,"Sets the children for the node"),e.k0s()()()(),e.j41(120,"h4"),e.EFF(121,"SearchRequestModel description"),e.k0s(),e.j41(122,"table",5)(123,"thead")(124,"tr")(125,"th",6),e.EFF(126,"attribute"),e.k0s(),e.j41(127,"th",7),e.EFF(128,"Values"),e.k0s(),e.j41(129,"th",6),e.EFF(130,"Effect"),e.k0s()()(),e.j41(131,"tbody")(132,"tr")(133,"td",6)(134,"b"),e.EFF(135,"placeholder"),e.k0s(),e.j41(136,"div",8),e.EFF(137,"Type: string"),e.k0s()(),e.j41(138,"td",7),e.EFF(139,"string"),e.k0s(),e.j41(140,"td",6),e.EFF(141,"Placeholder for input field"),e.k0s()(),e.j41(142,"tr")(143,"td",6)(144,"b"),e.EFF(145,"noResultsText"),e.k0s(),e.j41(146,"div",8),e.EFF(147,"Type: string"),e.k0s()(),e.j41(148,"td",7),e.EFF(149,"string"),e.k0s(),e.j41(150,"td",6),e.EFF(151,"Text displays that no search result found"),e.k0s()(),e.j41(152,"tr")(153,"td",6)(154,"b"),e.EFF(155,"minCharacters"),e.k0s(),e.j41(156,"div",8),e.EFF(157,"Type: number"),e.k0s()(),e.j41(158,"td",7),e.EFF(159,"number"),e.k0s(),e.j41(160,"td",6),e.EFF(161,"How many characters is needed to start search"),e.k0s()(),e.j41(162,"tr")(163,"td",6)(164,"b"),e.EFF(165,"minCharacterText"),e.k0s(),e.j41(166,"div",8),e.EFF(167,"Type: string"),e.k0s()(),e.j41(168,"td",7),e.EFF(169,"string"),e.k0s(),e.j41(170,"td",6),e.EFF(171,"Warning that search not performed because minCharacters not satisfied"),e.k0s()(),e.j41(172,"tr")(173,"td",6)(174,"b"),e.EFF(175,"searchResultItemRef"),e.k0s(),e.j41(176,"div",8),e.EFF(177,"Type: TemplateRef"),e.k0s()(),e.j41(178,"td",7),e.EFF(179,"TemplateRef"),e.k0s(),e.j41(180,"td",6),e.EFF(181,"Custom display for search result"),e.k0s()()()(),e.j41(182,"h4"),e.EFF(183,"SearchResponseModel description"),e.k0s(),e.j41(184,"table",5)(185,"thead")(186,"tr")(187,"th",6),e.EFF(188,"attribute"),e.k0s(),e.j41(189,"th",7),e.EFF(190,"Values"),e.k0s(),e.j41(191,"th",6),e.EFF(192,"Effect"),e.k0s()()(),e.j41(193,"tbody")(194,"tr")(195,"td",6)(196,"b"),e.EFF(197,"text"),e.k0s(),e.j41(198,"div",8),e.EFF(199,"Type: string"),e.k0s()(),e.j41(200,"td",7),e.EFF(201,"string"),e.k0s(),e.j41(202,"td",6),e.EFF(203,"Search text"),e.k0s()(),e.j41(204,"tr")(205,"td",6)(206,"b"),e.EFF(207,"searchableNodes"),e.k0s(),e.j41(208,"div",8),e.EFF(209,"Type: LocationBarNode[]"),e.k0s()(),e.j41(210,"td",7),e.EFF(211,"LocationBarNode[]"),e.k0s(),e.j41(212,"td",6),e.EFF(213,"Which nodes should be filtered based on search text"),e.k0s()()()(),e.j41(214,"h4"),e.EFF(215,"SearchResultModel description"),e.k0s(),e.j41(216,"table",5)(217,"thead")(218,"tr")(219,"th",6),e.EFF(220,"attribute"),e.k0s(),e.j41(221,"th",7),e.EFF(222,"Values"),e.k0s(),e.j41(223,"th",6),e.EFF(224,"Effect"),e.k0s()()(),e.j41(225,"tbody")(226,"tr")(227,"td",6)(228,"b"),e.EFF(229,"[key: string]"),e.k0s(),e.j41(230,"div",8),e.EFF(231,"Type: [key: string]"),e.k0s()(),e.j41(232,"td",7),e.EFF(233,"[key: string]"),e.k0s(),e.j41(234,"td",6),e.EFF(235,"Attributes for display after search is performed"),e.k0s()()()(),e.j41(236,"h3"),e.EFF(237,"Summary of Options"),e.k0s(),e.j41(238,"table",5)(239,"thead")(240,"tr")(241,"th",6),e.EFF(242,"Parameter"),e.k0s(),e.j41(243,"th",7),e.EFF(244,"Values"),e.k0s(),e.j41(245,"th",9),e.EFF(246,"Default"),e.k0s(),e.j41(247,"th",6),e.EFF(248,"Effect"),e.k0s()()(),e.j41(249,"tbody")(250,"tr")(251,"td",6)(252,"b"),e.EFF(253,"[clrRoots]"),e.k0s(),e.j41(254,"div",8),e.EFF(255,"Type: LocationBarNode<T>[]"),e.k0s(),e.j41(256,"div",8),e.EFF(257,"Default: []"),e.k0s()(),e.j41(258,"td",7),e.EFF(259,"LocationBarNode<T>[]"),e.k0s(),e.j41(260,"td",9),e.EFF(261,"[]"),e.k0s(),e.j41(262,"td",6),e.EFF(263,"Value binding for control represented by a list of LocationBarNode<T>."),e.k0s()(),e.j41(264,"tr")(265,"td",6)(266,"b"),e.EFF(267,"[clrIconShape]"),e.k0s(),e.j41(268,"div",8),e.EFF(269,"Type: string"),e.k0s(),e.j41(270,"div",8),e.EFF(271,'Default: "organization"'),e.k0s()(),e.j41(272,"td",7),e.EFF(273,"string"),e.k0s(),e.j41(274,"td",9),e.EFF(275,'"organization"'),e.k0s(),e.j41(276,"td",6),e.EFF(277,"Name of the shape displayed before the location bar. Can be null to hide the icon."),e.k0s()(),e.j41(278,"tr")(279,"td",6)(280,"b"),e.EFF(281,"[clrIconTitle]"),e.k0s(),e.j41(282,"div",8),e.EFF(283,"Type: string"),e.k0s(),e.j41(284,"div",8),e.EFF(285,'Default: ""'),e.k0s()(),e.j41(286,"td",7),e.EFF(287,"string"),e.k0s(),e.j41(288,"td",9),e.EFF(289,'""'),e.k0s(),e.j41(290,"td",6),e.EFF(291,"Title attribute of the icon displayed before the location bar."),e.k0s()(),e.j41(292,"tr")(293,"td",6)(294,"b"),e.EFF(295,"[clrSearchRequest]"),e.k0s(),e.j41(296,"div",8),e.EFF(297,"Type: SearchRequestModel"),e.k0s(),e.j41(298,"div",8),e.EFF(299,"Default: undefined"),e.k0s()(),e.j41(300,"td",7),e.EFF(301,"SearchRequestModel"),e.k0s(),e.j41(302,"td",9),e.EFF(303,"undefined"),e.k0s(),e.j41(304,"td",6),e.EFF(305,"Request attributes for search."),e.k0s()(),e.j41(306,"tr")(307,"td",6)(308,"b"),e.EFF(309,"[clrSearchRequest]"),e.k0s(),e.j41(310,"div",8),e.EFF(311,"Type: SearchRequestModel"),e.k0s(),e.j41(312,"div",8),e.EFF(313,"Default: undefined"),e.k0s()(),e.j41(314,"td",7),e.EFF(315,"SearchRequestModel"),e.k0s(),e.j41(316,"td",9),e.EFF(317,"undefined"),e.k0s(),e.j41(318,"td",6),e.EFF(319,"Request attributes for search."),e.k0s()(),e.j41(320,"tr")(321,"td",6)(322,"b"),e.EFF(323,"[clrSearchResultItems]"),e.k0s(),e.j41(324,"div",8),e.EFF(325,"Type: SearchResultModel"),e.k0s(),e.j41(326,"div",8),e.EFF(327,"Default: []"),e.k0s()(),e.j41(328,"td",7),e.EFF(329,"SearchResultModel"),e.k0s(),e.j41(330,"td",9),e.EFF(331,"[]"),e.k0s(),e.j41(332,"td",6),e.EFF(333,"Result of the performed search"),e.k0s()()()()(),e.j41(334,"div",10)(335,"h3",11),e.EFF(336,"Code & Examples"),e.k0s(),e.j41(337,"h4"),e.EFF(338,"Standard behavior"),e.k0s(),e.j41(339,"div"),e.nrm(340,"clr-location-bar",12),e.k0s(),e.nrm(341,"clr-code-snippet",13)(342,"clr-code-snippet",14)(343,"clr-code-snippet",14),e.j41(344,"h4"),e.EFF(345,"Preselected nodes"),e.k0s(),e.j41(346,"div"),e.nrm(347,"clr-location-bar",12),e.k0s(),e.nrm(348,"clr-code-snippet",13)(349,"clr-code-snippet",14),e.j41(350,"h4"),e.EFF(351,"Lazy loading children"),e.k0s(),e.j41(352,"div"),e.nrm(353,"clr-location-bar",12),e.k0s(),e.nrm(354,"clr-code-snippet",13)(355,"clr-code-snippet",14)(356,"clr-code-snippet",14)(357,"clr-code-snippet",14),e.j41(358,"h4"),e.EFF(359,"Search"),e.k0s(),e.j41(360,"div")(361,"clr-location-bar",15),e.bIt("clrSearchItemChanged",function(i){return e.eBV(d),e.Njj(t.searchChanged(i))}),e.DNE(362,g,2,2,"ng-template",null,0,e.C5r),e.k0s()(),e.nrm(364,"clr-code-snippet",13)(365,"clr-code-snippet",14)(366,"clr-code-snippet",14)(367,"clr-code-snippet",14)(368,"clr-code-snippet",14),e.k0s()()()}if(2&a){const d=e.sdS(363);e.Y8G("title",t.title),e.R7$(340),e.Y8G("clrRoots",t.roots1),e.R7$(),e.Y8G("clrCode",t.standardExample),e.R7$(),e.Y8G("clrCode",t.standardTSExample),e.R7$(),e.Y8G("clrCode",t.standardIDExample),e.R7$(4),e.Y8G("clrRoots",t.roots2),e.R7$(),e.Y8G("clrCode",t.preExample),e.R7$(),e.Y8G("clrCode",t.preTSExample),e.R7$(4),e.Y8G("clrRoots",t.rootsLazy),e.R7$(),e.Y8G("clrCode",t.lazyExample),e.R7$(),e.Y8G("clrCode",t.lazyTSExample),e.R7$(),e.Y8G("clrCode",t.lazyContentProvider),e.R7$(),e.Y8G("clrCode",t.providerModule),e.R7$(4),e.Y8G("clrRoots",t.searchableRoot)("clrSearchRequest",e.eq3(21,D,d))("clrSearchResultItems",t.searchResultItems),e.R7$(3),e.Y8G("clrCode",t.searchExample),e.R7$(),e.Y8G("clrCode",t.searchTSExample),e.R7$(),e.Y8G("clrCode",t.searchAlgExample),e.R7$(),e.Y8G("clrCode",t.searchContentProvider),e.R7$(),e.Y8G("clrCode",t.providerModule)}},dependencies:[L.bT,r.scU,y.z,w.u],encapsulation:2})}return s})(),q=(()=>{class s{static \u0275fac=function(a){return new(a||s)};static \u0275mod=e.$C({type:s});static \u0275inj=e.G2t({providers:[{provide:r.MI7,useExisting:j}],imports:[L.MD,N.PuD,r.P8i,C.u,B.g,I.iI.forChild([{path:"",component:H}])]})}return s})()}}]);