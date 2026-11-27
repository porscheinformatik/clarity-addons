import{n as P,r as ie,t as O}from"./chunk-agnf9ZDH.js";import{$n as T,Ai as bpe,B as Cs,Ba as j,Bn as Rhe,D as At,E as Ale,Hn as Rt$1,Ho as pr,Hr as Xe$1,I as C4,Js as x9e,Ls as vs,Mo as oi,Ms as v,Nt as Jt,O as B,Oi as bi,Pa as ie$1,Pt as K,Qn as Sv,Qt as M,Tr as Ve$1,Tt as Iz,Uo as q,Wa as je$1,Y as Dz,Zt as Lp,_s as te,an as N$1,b as A,bn as PT,bo as ne,ca as f4,d as $,di as _de,dn as O$1,dt as G1e,ea as ee,ec as y,fa as fs,ii as Zn,in as Mz,ja as iA,jo as oT,l as _e,ln as Nl,mo as mz,mt as H,ns as ri,oc as ype,rc as ye,ri as Ze$1,rs as rt$1,s as O$2,sa as f,sn as Ne,to as lD,xa as gt$1,yi as aA,zt as KE}from"./main-MZS5HDZR.js";import{Et as Fp,Jo as e2,M as Bp,Mr as Pp,Qt as I9,Xa as _o,Yc as n8,ba as Y4,ca as X7,ec as j7,ei as Rp,fc as k9,hi as T9,ot as E9,p as A3,t as $7,ur as Np,xr as Op,zd as zp}from"./chunk-Dj4ysbNo.js";function Xe(a,d){if(a&1){let i=ye();y(0,`clr-checkbox-wrapper`)(1,`input`,3),N$1(`change`,function(){let r=te(i).$implicit,x=M();return ne(x.toggleSelection(r.value))}),v(),y(2,`label`,4),ie$1(3),pr(4,`titlecase`),v()()}if(a&2){let i=d.$implicit,m=M();f(),A(`name`,i.key)(`checked`,m.isSelected(i.value)),f(),A(`for`,i.key),f(),Ve$1(vs(4,4,i.key))}}var N=(()=>{class a{RoleEnum=E;selectedRoles=Ne(/* @__PURE__ */ new Set);changes=x9e(this.selectedRoles).pipe(Ze$1(i=>Array.from(i)));isActive(){return this.selectedRoles().size>0}accepts(i){return this.isSelected(i?.value?.roleType)}isSelected(i){return this.selectedRoles().has(i)}toggleSelection(i){if(this.isSelected(i)){this.selectedRoles.update(m=>(m.delete(i),new Set(m)));return}this.selectedRoles.update(m=>(m.add(i),new Set(m)))}clearFilter(){this.selectedRoles.set(/* @__PURE__ */ new Set)}static ɵfac=function(m){return new(m||a)};static ɵcmp=O$1({type:a,selectors:[[`clr-role-type-filter`]],decls:6,vars:2,consts:[[1,`btn`,`btn-sm`,`btn-icon`,`btn-link`,`btn-trash`,3,`click`],[`shape`,`trash`],[`cds-layout`,`m-t:xs`],[`type`,`checkbox`,`clrCheckbox`,``,3,`change`,`name`,`checked`],[3,`for`]],template:function(m,r){m&1&&(y(0,`button`,0),N$1(`click`,function(){return r.clearFilter()}),j(1,`cds-icon`,1),v(),y(2,`clr-checkbox-container`,2),At(3,Xe,5,6,`clr-checkbox-wrapper`,null,KE),pr(5,`keyvalue`),v()),m&2&&(f(3),Rt$1(vs(5,0,r.RoleEnum)))},dependencies:[q,f4,Xe$1,Nl,_de,C4,n8,rt$1,_o,iA,aA],styles:[`.btn-trash[_ngcontent-%COMP%]{position:absolute;top:15px;right:40px;padding:0}`]})}return a})();var We=[`exportTreetable`];var Ve=()=>({hidden:!1});var Ge=()=>({hidden:!0});function Ke(a,d){if(a&1&&(y(0,`clr-tab-content`),j(1,`clr-code-snippet`,30),v()),a&2){let i=M();f(),A(`clrCode`,i.htmlExampleColumnResizing)}}function Ye(a,d){if(a&1&&(y(0,`clr-tab-content`),j(1,`clr-code-snippet`,86),v()),a&2){let i=M();f(),A(`clrCode`,i.tsExampleColumnResizing)(`clrLanguage`,`typescript`)}}function qe(a,d){if(a&1&&(y(0,`clr-tt-row`,87)(1,`clr-tt-cell`),ie$1(2),v(),y(3,`clr-tt-cell`),ie$1(4),v(),j(5,`clr-tt-cell`),v()),a&2){let i=d.$implicit,m=d.clrTtNode,r=d.isLeaf;A(`clrExpandable`,!r)(`clrExpanded`,!0)(`clrTtItem`,m),f(2),Ve$1(i.value?.name),f(2),Ve$1(i.value?.role)}}function je(a,d){if(a&1&&(y(0,`clr-tt-row`,87)(1,`clr-tt-cell`),ie$1(2),v(),y(3,`clr-tt-cell`),ie$1(4),v(),j(5,`clr-tt-cell`),v()),a&2){let i=d.$implicit,m=d.clrTtNode,r=d.isLeaf;A(`clrExpandable`,!r)(`clrExpanded`,!0)(`clrTtItem`,m),f(2),Ve$1(i.value?.name),f(2),Ve$1(i.value?.role)}}function Je(a,d){if(a&1&&(y(0,`clr-tt-row`,87)(1,`clr-tt-cell`),ie$1(2),v(),y(3,`clr-tt-cell`),ie$1(4),v(),y(5,`clr-tt-cell`),ie$1(6),pr(7,`titlecase`),v()()),a&2){let i=d.$implicit,m=d.clrTtNode,r=d.isLeaf;A(`clrExpandable`,!r)(`clrExpanded`,!0)(`clrTtItem`,m),f(2),Ve$1(i.value.name),f(2),Ve$1(i.value.role),f(2),Ve$1(vs(7,6,i.value.roleType))}}function Qe(a,d){if(a&1&&(y(0,`clr-tt-row`,87)(1,`clr-tt-cell`),ie$1(2),v(),y(3,`clr-tt-cell`),ie$1(4),v(),y(5,`clr-tt-cell`),ie$1(6),pr(7,`titlecase`),v()()),a&2){let i=d.$implicit,m=d.clrTtNode,r=d.isLeaf;A(`clrExpandable`,!r)(`clrExpanded`,!0)(`clrTtItem`,m),f(2),Ve$1(i.value.name),f(2),Ve$1(i.value.role),f(2),Ve$1(vs(7,6,i.value.roleType))}}function $e(a,d){if(a&1&&(y(0,`clr-tt-row`,87)(1,`clr-tt-cell`),ie$1(2),v(),y(3,`clr-tt-cell`),ie$1(4),v(),y(5,`clr-tt-cell`),ie$1(6),pr(7,`titlecase`),v()()),a&2){let i=d.$implicit,m=d.clrTtNode,r=d.isLeaf;A(`clrExpandable`,!r)(`clrExpanded`,!0)(`clrTtItem`,m),f(2),Ve$1(i.value.name),f(2),Ve$1(i.value.role),f(2),Ve$1(vs(7,6,i.value.roleType))}}function Ze(a,d){if(a&1&&(y(0,`clr-tt-row`,87)(1,`clr-tt-cell`),ie$1(2),v(),y(3,`clr-tt-cell`),ie$1(4),v(),y(5,`clr-tt-cell`),ie$1(6),pr(7,`titlecase`),v()()),a&2){let i=d.$implicit,m=d.clrTtNode,r=d.isLeaf;A(`clrExpandable`,!r)(`clrExpanded`,!0)(`clrTtItem`,m),f(2),Ve$1(i.value.name),f(2),Ve$1(i.value.role),f(2),Ve$1(vs(7,6,i.value.roleType))}}function et(a,d){if(a&1&&(y(0,`clr-tab-content`),j(1,`clr-code-snippet`,30),v()),a&2){let i=M();f(),A(`clrCode`,i.htmlExampleBuiltInFilter)}}function tt(a,d){if(a&1&&(y(0,`clr-tab-content`),j(1,`clr-code-snippet`,86),v()),a&2){let i=M();f(),A(`clrCode`,i.tsExampleBuiltInFilterFunction)(`clrLanguage`,`typescript`)}}function lt(a,d){if(a&1&&(y(0,`clr-tt-row`,87)(1,`clr-tt-cell`),ie$1(2),v(),y(3,`clr-tt-cell`),ie$1(4),v(),y(5,`clr-tt-cell`),ie$1(6),pr(7,`titlecase`),v()()),a&2){let i=d.$implicit,m=d.clrTtNode,r=d.isLeaf;A(`clrExpandable`,!r)(`clrExpanded`,!0)(`clrTtItem`,m),f(2),Ve$1(i.value.name),f(2),Ve$1(i.value.role),f(2),Ve$1(vs(7,6,i.value.roleType))}}function rt(a,d){if(a&1&&(y(0,`clr-tab-content`),j(1,`clr-code-snippet`,30),v()),a&2){let i=M();f(),A(`clrCode`,i.htmlExampleCustomFilter)}}function it(a,d){if(a&1&&(y(0,`clr-tab-content`),j(1,`clr-code-snippet`,86),v()),a&2){let i=M();f(),A(`clrCode`,i.tsExampleCustomFilter)(`clrLanguage`,`typescript`)}}function nt(a,d){a&1&&(Cs(0),ie$1(1,`Name`),fs())}function at(a,d){a&1&&ie$1(0,` Role `)}function ct(a,d){a&1&&(Cs(0),ie$1(1,`Type`),fs())}function ot(a,d){if(a&1&&(y(0,`clr-tt-row`,88)(1,`clr-tt-cell`),ie$1(2),v(),y(3,`clr-tt-cell`),ie$1(4),v(),y(5,`clr-tt-cell`),ie$1(6),pr(7,`titlecase`),v()()),a&2){let i=d.$implicit,m=d.clrTtNode;A(`clrExpandable`,!!i.children?.length)(`clrTtItem`,m),f(2),Ve$1(i.value.name),f(2),Ve$1(i.value.role),f(2),Ve$1(vs(7,5,i.value.roleType))}}var mt=`
<clr-treetable>
    <clr-tt-column>Name</clr-tt-column>
    <clr-tt-column>Role</clr-tt-column>
    <clr-tt-column>Random Number</clr-tt-column>
    <clr-tt-column>Random Date</clr-tt-column>

    <clr-tt-row>
        <clr-tt-cell>David Wallace</clr-tt-cell>
        <clr-tt-cell>CFO</clr-tt-cell>
        <clr-tt-cell>2</clr-tt-cell>
        <clr-tt-cell>2nd of August</clr-tt-cell>

        <clr-tt-row>
            <clr-tt-cell>Michael Scott</clr-tt-cell>
            <clr-tt-cell>Regional Manager</clr-tt-cell>
            <clr-tt-cell>19</clr-tt-cell>
            <clr-tt-cell>3rd of April</clr-tt-cell>

            <clr-tt-row>
                <clr-tt-cell>Dwight K. Schrute</clr-tt-cell>
                <clr-tt-cell>Assistant to the Regional Manager</clr-tt-cell>
                <clr-tt-cell>290</clr-tt-cell>
                <clr-tt-cell>17th of May</clr-tt-cell>
            </clr-tt-row>
            ...
        </clr-tt-row>
    </clr-tt-row>
</clr-treetable>`;var dt=`
<clr-treetable [clrClickableRows]="false">
    <clr-tt-column>Name</clr-tt-column>
    <clr-tt-column>Role</clr-tt-column>
    <clr-tt-column>Actor</clr-tt-column>

    <clr-tt-row [clrExpanded]="true">
        <clr-tt-cell>David Wallace</clr-tt-cell>
        <clr-tt-cell>CFO</clr-tt-cell>
        <clr-tt-cell><a target="_blank" href="https://www.google.com">Some actor</a></clr-tt-cell>
    </clr-tt-row>
    ...
</clr-treetable>`;var st=`
<clr-treetable>
    <clr-tt-column class="clr-col-9">Some column</clr-tt-column>
    <clr-tt-column class="clr-col-3">Some other column</clr-tt-column>
    <clr-tt-row clrExpandable="true">
        ...
    </clr-tt-row>
</clr-treetable>`;var pt=`
<clr-treetable>
  <clr-tt-column
    [clrTtColumnSize]="width()"
    (clrTtColumnResize)="onColumnResize($event)"
  >
    Some column
  </clr-tt-column>
  <clr-tt-column [clrTtColumnSize]="400"> Some other column </clr-tt-column>

  <clr-tt-row clrExpandable="true">
    <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>
    <clr-tt-cell>2</clr-tt-cell>

    <clr-tt-row>
      <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>
      <clr-tt-cell>3</clr-tt-cell>
    </clr-tt-row>
  </clr-tt-row>

  <clr-tt-row>
    <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>
    <clr-tt-cell>1</clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;var ut=`
export class TreetableDemo {
  protected readonly width = signal(400);

  protected onColumnResize(width: number): void {
    // width is the new column width in px (min 48px)
    this.width.set(width);
  }
}`;var Et=`
<clr-treetable>
  <clr-tt-column>Some column</clr-tt-column>
  <clr-tt-column>Some other column</clr-tt-column>
  <clr-tt-row clrExpandable="true">
    <clr-tt-action-overflow>
      <button class="action-item">Test Action</button>
    </clr-tt-action-overflow>
    <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>
    <clr-tt-cell>2</clr-tt-cell>
    <clr-tt-row>
      <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>
      <clr-tt-cell>3</clr-tt-cell>
    </clr-tt-row>
  </clr-tt-row>
  <clr-tt-row>
    <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>
    <clr-tt-cell>1</clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;var xt=`
<clr-treetable>
  <clr-tt-column>Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let employee of hierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ employee.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ employee.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;var St=`
<clr-treetable [(clrTtSelected)]="selected">
  <clr-tt-column>Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let employee of hierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ employee.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ employee.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;var ht=`
<clr-treetable [(clrTtSelected)]="selected" [clrTtAutoParentSelection]="false">
  <clr-tt-column>Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let employee of hierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ employee.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ employee.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;var bt=`
<clr-treetable>
  <clr-tt-column [clrTtSortBy]="nameComparator" [(clrTtSortOrder)]="sortOrder">Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let employee of hierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ employee.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ employee.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;var Tt=`
<clr-treetable>
  <clr-tt-column [clrTtSortBy]="nameComparator" [(clrTtSortOrder)]="descOrder">Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let employee of hierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ employee.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ employee.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;var ft=`
<clr-treetable>
  <clr-tt-column>
    Name
    <clr-tt-string-filter [clrTtStringFilter]="nameFilter" [clrTtFilterPlaceholder]="'Name'"></clr-tt-string-filter>
  </clr-tt-column>
  <clr-tt-column>
    Role
    <clr-tt-string-filter [clrTtStringFilter]="roleFilter" [clrTtFilterPlaceholder]="'Role'"></clr-tt-string-filter>
  </clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let member of orgUnitHierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ member.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ member.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;var yt=`
nameFilter: ClrTreetableStringFilterFunction<OrganizationUnitMember> = (item: OrganizationUnitMember, search: string): boolean =>
  item?.value?.name?.toLowerCase().includes(search.toLowerCase());

roleFilter: ClrTreetableStringFilterFunction<OrganizationUnitMember> = (item: OrganizationUnitMember, search: string): boolean =>
  item?.value?.role?.toLowerCase().includes(search.toLowerCase());
`;var gt=`
<clr-treetable>
  <clr-tt-column>Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>
    Type
    <clr-tt-filter [clrTtFilter]="roleTypeFilter">
      <clr-role-type-filter #roleTypeFilter />
    </clr-tt-filter>
  </clr-tt-column>

  <clr-tt-row
    *clrTtItems="let member of orgUnitMemberHierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ member.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ member.value.role }}</clr-tt-cell>
    <clr-tt-cell>{{ member.value.roleType | titlecase }}</clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;var wt=`
<clr-treetable>
  <clr-tt-column>Name</clr-tt-column>
</clr-treetable>
`;var Ct=`
<clr-treetable>
  <clr-tt-column>Name</clr-tt-column>
  <clr-tt-placeholder>No entries found</clr-tt-placeholder>
</clr-treetable>
`;var vt=`
<clr-treetable class="treetable-placeholder-wide">
  <clr-tt-column>Name</clr-tt-column>
</clr-treetable>
`;var _t=`
<clr-export-treetable-button [treetable]="treetable()" [treetableRef]="treetableRef()" exportTitlePrefix="employees" />

<clr-treetable #exportTreetable [(clrTtSelected)]="selectedForExport">
  <clr-tt-column clrTtField="value.name">Name</clr-tt-column>
  <clr-tt-column clrTtField="value.role">Role</clr-tt-column>
  <clr-tt-column clrTtField="value.roleType">Type</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let member of orgUnitMemberHierarchy; getChildren: getChildren; clrTtNode as item"
    [clrExpandable]="!!member.children?.length"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ member.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ member.value.role }}</clr-tt-cell>
    <clr-tt-cell>{{ member.value.roleType }}</clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;var Lt=`
export class MyComponent {
  readonly treetable = viewChild<ClrTreetable<OrganizationUnitMember>>('exportTreetable');
  readonly treetableRef = viewChild('exportTreetable', { read: ElementRef });
}
`;var Rt=`
<clr-treetable>
  <clr-tt-column>
    <ng-container *clrTtHideableColumn="{ hidden: false }">Name</ng-container>
  </clr-tt-column>
  <clr-tt-column>
    <ng-template [clrTtHideableColumn]="{ hidden: false }" (clrTtHiddenChange)="log('HiddenChange', $event)">
      Role
    </ng-template>
  </clr-tt-column>
  <clr-tt-column>
    <ng-container *clrTtHideableColumn="{ hidden: true }">Type</ng-container>
  </clr-tt-column>

  <clr-tt-row clrExpandable="true">
    <clr-tt-cell>Bob</clr-tt-cell>
    <clr-tt-cell>CEO</clr-tt-cell>
    <clr-tt-cell>Lead</clr-tt-cell>

    <clr-tt-row clrExpandable="true">
      <clr-tt-cell>Alice</clr-tt-cell>
      <clr-tt-cell>Head of Sales</clr-tt-cell>
      <clr-tt-cell>Lead</clr-tt-cell>

      <clr-tt-row>
        <clr-tt-cell>Frank</clr-tt-cell>
        <clr-tt-cell>Sales Manager 1</clr-tt-cell>
        <clr-tt-cell>Manager</clr-tt-cell>
      </clr-tt-row>

      <clr-tt-row>
        <clr-tt-cell>Charlie</clr-tt-cell>
        <clr-tt-cell>Sales Manager 2</clr-tt-cell>
        <clr-tt-cell>Manager</clr-tt-cell>
      </clr-tt-row>
    </clr-tt-row>

    <clr-tt-row clrExpandable="true">
      <clr-tt-cell>Grace</clr-tt-cell>
      <clr-tt-cell>Head of Engineering</clr-tt-cell>
      <clr-tt-cell>Lead</clr-tt-cell>

      <clr-tt-row>
        <clr-tt-cell>Hank</clr-tt-cell>
        <clr-tt-cell>Engineering Manager 1</clr-tt-cell>
        <clr-tt-cell>Manager</clr-tt-cell>
      </clr-tt-row>

      <clr-tt-row>
        <clr-tt-cell>Karen</clr-tt-cell>
        <clr-tt-cell>Engineering Manager 2</clr-tt-cell>
        <clr-tt-cell>Manager</clr-tt-cell>
      </clr-tt-row>
    </clr-tt-row>
  </clr-tt-row>

  <clr-tt-footer></clr-tt-footer>
</clr-treetable>
`;var Mt=`
const RoleEnum = {
  Ceo: 'CEO',
  Lead: 'LEAD',
  Manager: 'MANAGER',
  Employee: 'EMPLOYEE',
} as const satisfies Record<string, string>;
type Role = (typeof RoleEnum)[keyof typeof RoleEnum];

@Component({
  selector: 'clr-role-type-filter',
  template: \`
    <button class="btn btn-sm btn-icon btn-link btn-trash" (click)="clearFilter()">
      <cds-icon shape="trash"></cds-icon>
    </button>
    <clr-checkbox-container cds-layout="m-t:xs">
      @for (role of RoleEnum | keyvalue; track $index) {
        <clr-checkbox-wrapper>
          <input
            type="checkbox"
            clrCheckbox
            [name]="role.key"
            [checked]="isSelected(role.value)"
            (change)="toggleSelection(role.value)"
          />
          <label [for]="role.key">{{ role.key | titlecase }}</label>
        </clr-checkbox-wrapper>
      }
    </clr-checkbox-container>
  \`,
  styles: \`
    .btn-trash {
      position: absolute;
      top: 10px;
      right: 40px;
      padding: 0;
    }
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreetableRoleTypeFilterComponent implements ClrTreetableFilterInterface<OrganizationUnitMember, Role[]> {
  protected readonly RoleEnum = RoleEnum;

  protected readonly selectedRoles = signal<Set<Role>>(new Set());
  readonly changes: Observable<Role[]> = toObservable(this.selectedRoles).pipe(
    map((roleSet) => Array.from(roleSet)),
  );

  isActive(): boolean {
    return this.selectedRoles().size > 0;
  }

  accepts(item: OrganizationUnitMember): boolean {
    return this.isSelected(item?.value?.roleType);
  }

  protected isSelected(role: Role) {
    return this.selectedRoles().has(role);
  }

  protected toggleSelection(role: Role) {
    if (this.isSelected(role)) {
      this.selectedRoles.update((current) => {
        current.delete(role);
        return new Set<Role>(current);
      });
      return;
    }

    this.selectedRoles.update((current) => {
      current.add(role);
      return new Set<Role>(current);
    });
  }

  protected clearFilter(): void {
    this.selectedRoles.set(new Set())
  }
}
`;var E={Ceo:`CEO`,Lead:`LEAD`,Manager:`MANAGER`,Employee:`EMPLOYEE`};var U=class{compare(d,i){return d.value.name.localeCompare(i.value.name)}};var W=(()=>{class a extends P{htmlExampleClickableRows=mt;htmlExampleClickableCaret=dt;htmlExampleCustomSize=st;htmlExampleColumnResizing=pt;tsExampleColumnResizing=ut;htmlExampleSingleRowAction=Et;htmlExampleSmartIterator=xt;htmlExampleSelection=St;htmlExampleNoAutoParentSelection=ht;htmlExampleCustomSorting=bt;htmlExamplePresorting=Tt;htmlExampleBuiltInFilter=ft;tsExampleBuiltInFilterFunction=yt;htmlExampleCustomFilter=gt;tsExampleCustomFilter=Mt;htmlExampleHideShow=Rt;htmlExampleEmptyPlaceholder=wt;htmlExampleEmptyPlaceholderWide=vt;htmlExampleEmptyPlaceholderContent=Ct;htmlExampleExport=_t;tsExampleExport=Lt;treetable=G1e(`exportTreetable`);treetableRef=G1e(`exportTreetable`,{read:H});constructor(){super(`treetable`)}orgUnitMemberHierarchy=[{id:`ceo`,value:{role:`CEO`,roleType:E.Ceo,name:`Bob`},children:[{id:`sales`,value:{role:`Head of Sales`,roleType:E.Lead,name:`Alice`},parent:{role:`CEO`,roleType:E.Ceo,name:`Bob`},children:[{id:`sales1`,value:{role:`Sales Manager 1`,roleType:E.Manager,name:`Frank`},parent:{role:`Head of Sales`,roleType:E.Lead,name:`Alice`},children:[]},{id:`sales2`,value:{role:`Sales Manager 2`,roleType:E.Manager,name:`Charlie`},parent:{role:`Head of Sales`,roleType:E.Lead,name:`Alice`},children:[]}]},{id:`engineering`,value:{role:`Head of Engineering`,roleType:E.Lead,name:`Grace`},parent:{role:`CEO`,roleType:E.Ceo,name:`Bob`},children:[{id:`eng1`,value:{role:`Engineering Manager 1`,roleType:E.Manager,name:`Hank`},parent:{role:`Head of Engineering`,roleType:E.Lead,name:`Grace`},children:[]},{id:`eng2`,value:{role:`Engineering Manager 2`,roleType:E.Manager,name:`Karen`},parent:{role:`Head of Engineering`,roleType:E.Lead,name:`Grace`},children:[]}]}]}];selected=[];selectedForExport=[];nameComparator=new U;sortOrder=0;descOrder=e2.DESC;width=Ne(400);getChildren=i=>i?.children??[];orgUnitMemberNameFilter=(i,m)=>i?.value?.name?.toLowerCase().includes(m.toLowerCase());orgUnitMemberRoleFilter=(i,m)=>i?.value?.role?.toLowerCase().includes(m.toLowerCase());onColumnResize(i){this.width.set(i)}onResetResize(){this.width.set(400)}log(i,...m){console.log(`Log: ${i}`,...m)}static ɵfac=function(m){return new(m||a)};static ɵcmp=O$1({type:a,selectors:[[`clr-treetable-demo`]],viewQuery:function(m,r){m&1&&Sv(r.treetable,We,5)(r.treetableRef,We,5,H),m&2&&oT(2)},hostVars:4,hostBindings:function(m,r){m&2&&T(`content-area`,!0)(`dox-content-panel`,!0)},features:[ee],decls:1288,vars:61,consts:[[`roleTypeFilter`,``],[`exportTreetable`,``],[3,`title`],[1,`component-summary`],[`id`,`design-guidelines`],[`aria-labelledby`,`use-when`],[`id`,`use-when`],[`aria-labelledby`,`do-not-use`],[`id`,`do-not-use`],[1,`list`],[`href`,`https://clarity.design/documentation/tree-view`],[`aria-labelledby`,`behavior`],[`id`,`behavior`],[`aria-labelledby`,`behavior-sorting`],[`id`,`behavior-sorting`],[`aria-labelledby`,`behavior-filtering`],[`id`,`behavior-filtering`],[`aria-labelledby`,`technical-limitations`],[`id`,`technical-limitations`],[`aria-labelledby`,`summary-of-options`],[`id`,`summary-of-options`],[1,`table`],[1,`left`],[1,`left`,`clr-hidden-xs-down`],[1,`clr-hidden-xs-down`],[1,`clr-hidden-sm-up`],[`id`,`examples`],[`aria-labelledby`,`clickable-rows`],[`id`,`clickable-rows`],[`clrExpandable`,`true`],[3,`clrCode`],[`aria-labelledby`,`clickable-carets`],[`id`,`clickable-carets`],[1,`clr-code`],[3,`clrClickableRows`],[`clrExpandable`,`true`,3,`clrExpanded`],[`target`,`_blank`,`href`,`https://www.google.com`],[`aria-labelledby`,`single-row-actions`],[`id`,`single-row-actions`],[1,`action-item`],[`aria-labelledby`,`custom-column-sizing`],[`id`,`custom-column-sizing`],[1,`clr-col-9`],[1,`clr-col-3`],[`aria-labelledby`,`custom-column-resizing`],[`id`,`custom-column-resizing`],[3,`clrTtColumnResize`,`clrTtColumnSize`],[3,`clrTtColumnSize`],[`cds-layout`,`m-t:md`],[`cds-layout`,`m-t:sm`,1,`btn`,`btn-sm`,`btn-secondary`,3,`click`],[`clrTabLink`,``],[4,`clrIfActive`],[`aria-labelledby`,`smart-iterator`],[`id`,`smart-iterator`],[3,`clrExpandable`,`clrExpanded`,`clrTtItem`,4,`clrTtItems`,`clrTtItemsOf`,`clrTtItemsGetChildren`],[`aria-labelledby`,`selection`],[`id`,`selection`],[3,`clrTtSelectedChange`,`clrTtSelected`],[`aria-labelledby`,`auto-parent-selection`],[`id`,`auto-parent-selection`],[3,`clrTtSelectedChange`,`clrTtSelected`,`clrTtAutoParentSelection`],[`aria-labelledby`,`custom-sorting`],[`id`,`custom-sorting`],[1,`btn`,`btn-secondary`,3,`click`,`disabled`],[3,`clrTtSortOrderChange`,`clrTtSortBy`,`clrTtSortOrder`],[`aria-labelledby`,`pre-sorted`],[`id`,`pre-sorted`],[`aria-labelledby`,`filtering`],[`id`,`filtering`],[3,`clrTtStringFilter`,`clrTtFilterPlaceholder`],[`cds-layout`,`m-t:lg`],[3,`clrTtFilter`],[`aria-labelledby`,`empty-placeholder`],[`id`,`empty-placeholder`],[1,`treetable-placeholder-wide`],[`aria-labelledby`,`hide-show`],[`id`,`hide-show`],[4,`clrTtHideableColumn`],[3,`clrTtHiddenChange`,`clrTtHideableColumn`],[`aria-labelledby`,`export-treetable-button`],[`id`,`export-treetable-button`],[`exportTitlePrefix`,`employees`,3,`treetable`,`treetableRef`],[`clrTtField`,`value.name`],[`clrTtField`,`value.role`],[`clrTtField`,`value.roleType`],[3,`clrExpandable`,`clrTtItem`,4,`clrTtItems`,`clrTtItemsOf`,`clrTtItemsGetChildren`],[3,`clrCode`,`clrLanguage`],[3,`clrExpandable`,`clrExpanded`,`clrTtItem`],[3,`clrExpandable`,`clrTtItem`]],template:function(m,r){if(m&1){let x=ye();y(0,`clr-doc-wrapper`,2)(1,`article`)(2,`h5`,3),ie$1(3,`Treetables are for organizing hierarchical data with multiple columns.`),v(),y(4,`section`,4)(5,`section`,5)(6,`h3`,6),ie$1(7,`Use When`),v(),y(8,`p`),ie$1(9,` Use this component when you need to display a hierarchical data structure with multiple columns per entry. Make sure all entries use the same columns. E.g. the parent has a name and a description column, the child cannot have a name and a date column. `),v()(),y(10,`section`,7)(11,`h3`,8),ie$1(12,`Do not use`),v(),y(13,`p`),ie$1(14,`Avoid using this component in any of the following cases:`),v(),y(15,`ul`,9)(16,`li`),ie$1(17,`You require using a pagination. The treetable does not support paging.`),v(),y(18,`li`),ie$1(19,` The entries in your datastructure do not have multiple values (columns). Consider using a `),y(20,`a`,10),ie$1(21,`TreeView`),v(),ie$1(22,`. `),v(),y(23,`li`),ie$1(24,` Your elements need to be sorted. Since the data-rows are indented, a change of the order would cause confusion. `),v()()(),y(25,`section`,11)(26,`h3`,12),ie$1(27,`Behavior`),v(),y(28,`p`),ie$1(29,` Each entry can have none, one or multiple descendants. The first column of a descendant-row is indented to visualize the hierarchy. Parent rows are collapsed, i.e. all children rows are hidden initially. To display the children the user can either click on the leading caret-icon or the whole parent row, depending on the row-selection mode. Avoid the row-selection mode when the row contains individually clickable items. `),v(),y(30,`section`,13)(31,`h4`,14),ie$1(32,`Sorting`),v(),y(33,`p`),ie$1(34,` You can enable custom sorting by using recursive rendering. A treetable can have multiple root rows (top level). Sorting only occurs within the same level under the same parent: root rows are sorted among themselves and siblings are only sorted against each other. `),v()(),y(35,`section`,15)(36,`h4`,16),ie$1(37,`Filtering`),v(),y(38,`p`),ie$1(39,` You can enable filtering by using recursive rendering. A filter or multiple filters will be applied to all nodes. The lowest level node clearing the filters is relevant in this case, because it and all its' ancestors will be displayed in the treetable. Descendents will be cut off. `),v()()(),y(40,`section`,17)(41,`h3`,18),ie$1(42,`Technical limitations`),v(),y(43,`p`),ie$1(44,`Note that up to 6 levels of nesting are supported.`),v()(),y(45,`section`,19)(46,`h3`,20),ie$1(47,`Summary of Options`),v(),y(48,`h4`),ie$1(49,`clr-treetable`),v(),y(50,`table`,21)(51,`thead`)(52,`tr`)(53,`th`,22),ie$1(54,`Input/Output`),v(),y(55,`th`,23),ie$1(56,`Values`),v(),y(57,`th`,24),ie$1(58,`Default`),v(),y(59,`th`,22),ie$1(60,`Effect`),v()()(),y(61,`tbody`)(62,`tr`)(63,`td`,22)(64,`strong`),ie$1(65,`[clrClickableRows]`),v(),y(66,`div`,25),ie$1(67,`Type: boolean`),v(),y(68,`div`,25),ie$1(69,`Default: true`),v()(),y(70,`td`,23),ie$1(71,`boolean`),v(),y(72,`td`,24),ie$1(73,`true`),v(),y(74,`td`,22),ie$1(75,`Sets the [clrClickable] for every row`),v()(),y(76,`tr`)(77,`td`,22)(78,`strong`),ie$1(79,`[clrHideHeader]`),v(),y(80,`div`,25),ie$1(81,`Type: boolean`),v(),y(82,`div`,25),ie$1(83,`Default: false`),v()(),y(84,`td`,23),ie$1(85,`boolean`),v(),y(86,`td`,24),ie$1(87,`false`),v(),y(88,`td`,22),ie$1(89,`Hides the header row`),v()(),y(90,`tr`)(91,`td`,22)(92,`strong`),ie$1(93,`[clrTtLoading]`),v(),y(94,`div`,25),ie$1(95,`Type: boolean`),v(),y(96,`div`,25),ie$1(97,`Default: false`),v()(),y(98,`td`,23),ie$1(99,`boolean`),v(),y(100,`td`,24),ie$1(101,`false`),v(),y(102,`td`,22),ie$1(103,`Displays a loading spinner/state`),v()(),y(104,`tr`)(105,`td`,22)(106,`strong`),ie$1(107,`[(clrTtSelected)]`),v(),y(108,`div`,25),ie$1(109,`Type: T[]`),v(),y(110,`div`,25),ie$1(111,`Default: undefined`),v()(),y(112,`td`,23),ie$1(113,`T[]`),v(),y(114,`td`,24),ie$1(115,`undefined`),v(),y(116,`td`,22),ie$1(117,`An array of all selected items`),v()(),y(118,`tr`)(119,`td`,22)(120,`strong`),ie$1(121,`[clrTtAutoParentSelection]`),v(),y(122,`div`,25),ie$1(123,`Type: boolean`),v(),y(124,`div`,25),ie$1(125,`Default: true`),v()(),y(126,`td`,23),ie$1(127,`boolean`),v(),y(128,`td`,24),ie$1(129,`true`),v(),y(130,`td`,22),ie$1(131,` Set false to disable automatic selection of parent row, if all child rows where manually selected `),v()(),y(132,`tr`)(133,`td`,22)(134,`strong`),ie$1(135,`(clrTtRefresh)`),v(),y(136,`div`,25),ie$1(137,`Type: ClrTreetableState<T>`),v(),y(138,`div`,25),ie$1(139,`Default: n/a`),v()(),y(140,`td`,23),ie$1(141,`ClrTreetableState<T>`),v(),y(142,`td`,24),ie$1(143,`n/a`),v(),y(144,`td`,22),ie$1(145,` Output emitted whenever the data needs to be refreshed, based on user action or external ones `),v()()()(),y(146,`h4`),ie$1(147,`clr-tt-column`),v(),y(148,`table`,21)(149,`thead`)(150,`tr`)(151,`th`,22),ie$1(152,`Input/Output`),v(),y(153,`th`,23),ie$1(154,`Values`),v(),y(155,`th`,24),ie$1(156,`Default`),v(),y(157,`th`,22),ie$1(158,`Effect`),v()()(),y(159,`tbody`)(160,`tr`)(161,`td`,22)(162,`strong`),ie$1(163,`[clrTtSortBy]`),v(),y(164,`div`,25),ie$1(165,`Type: ClrTreetableComparatorInterface<T>`),v(),y(166,`div`,25),ie$1(167,`Default: null`),v()(),y(168,`td`,23),ie$1(169,`ClrTreetableComparatorInterface<T>`),v(),y(170,`td`,24),ie$1(171,`null`),v(),y(172,`td`,22),ie$1(173,`Comparator used to compare the column cells`),v()(),y(174,`tr`)(175,`td`,22)(176,`strong`),ie$1(177,`[(clrTtSortOrder)]`),v(),y(178,`div`,25),ie$1(179,`Type: ClrTreetableSortOrder`),v(),y(180,`div`,25),ie$1(181,`Default: ClrTreetableSortOrder.UNSORTED`),v()(),y(182,`td`,23),ie$1(183,`ClrTreetableSortOrder`),v(),y(184,`td`,24),ie$1(185,`ClrTreetableSortOrder.UNSORTED`),v(),y(186,`td`,22),ie$1(187,`The order the column is sorted in`),v()(),y(188,`tr`)(189,`td`,22)(190,`strong`),ie$1(191,`[clrTtField]`),v(),y(192,`div`,25),ie$1(193,`Type: string`),v(),y(194,`div`,25),ie$1(195,`Default: null`),v()(),y(196,`td`,23),ie$1(197,`string`),v(),y(198,`td`,24),ie$1(199,`null`),v(),y(200,`td`,22),ie$1(201,` Property path of the item rendered in this column, e.g. `),y(202,`code`),ie$1(203,`name`),v(),ie$1(204,` or `),y(205,`code`),ie$1(206,`address.city`),v(),ie$1(207,`. Not used for rendering, it is metadata consumed by `),y(208,`code`),ie$1(209,`clr-export-treetable-button`),v(),ie$1(210,`. Setting it is the opt-in for the export: only columns that declare `),y(211,`code`),ie$1(212,`clrTtField`),v(),ie$1(213,` are exported, a column without it is omitted entirely. `),v()(),y(214,`tr`)(215,`td`,22)(216,`strong`),ie$1(217,`[clrTtColType]`),v(),y(218,`div`,25),ie$1(219,`Type: 'string' | 'number'`),v(),y(220,`div`,25),ie$1(221,`Default: 'string'`),v()(),y(222,`td`,23),ie$1(223,`'string' | 'number'`),v(),y(224,`td`,24),ie$1(225,`'string'`),v(),y(226,`td`,22),ie$1(227,` Type of the values of this column. Only used as metadata by `),y(228,`code`),ie$1(229,`clr-export-treetable-button`),v(),ie$1(230,`, where it determines the type of the exported cells. Unlike the Clarity datagrid, it has no effect on filtering or sorting. `),v()(),y(231,`tr`)(232,`td`,22)(233,`strong`),ie$1(234,`(clrTtColumnResize)`),v(),y(235,`div`,25),ie$1(236,`Type: number`),v(),y(237,`div`,25),ie$1(238,`Default: n/a`),v()(),y(239,`td`,23),ie$1(240,`number`),v(),y(241,`td`,24),ie$1(242,`n/a`),v(),y(243,`td`,22),ie$1(244,`Emitted with the new column width (px) when the column is resized (min width 48px)`),v()()()(),y(245,`h4`),ie$1(246,`clr-tt-row`),v(),y(247,`table`,21)(248,`thead`)(249,`tr`)(250,`th`,22),ie$1(251,`Input/Output`),v(),y(252,`th`,23),ie$1(253,`Values`),v(),y(254,`th`,24),ie$1(255,`Default`),v(),y(256,`th`,22),ie$1(257,`Effect`),v()()(),y(258,`tbody`)(259,`tr`)(260,`td`,22)(261,`strong`),ie$1(262,`[(clrExpanded)]`),v(),y(263,`div`,25),ie$1(264,`Type: boolean`),v(),y(265,`div`,25),ie$1(266,`Default: false`),v()(),y(267,`td`,23),ie$1(268,`boolean`),v(),y(269,`td`,24),ie$1(270,`false`),v(),y(271,`td`,22),ie$1(272,`Whether the row is expanded or not`),v()(),y(273,`tr`)(274,`td`,22)(275,`strong`),ie$1(276,`[clrExpandable]`),v(),y(277,`div`,25),ie$1(278,`Type: boolean`),v(),y(279,`div`,25),ie$1(280,`Default: false`),v()(),y(281,`td`,23),ie$1(282,`boolean`),v(),y(283,`td`,24),ie$1(284,`false`),v(),y(285,`td`,22),ie$1(286,`Whether the row is expandable (also shows caret icons)`),v()(),y(287,`tr`)(288,`td`,22)(289,`strong`),ie$1(290,`[clrClickable]`),v(),y(291,`div`,25),ie$1(292,`Type: boolean`),v(),y(293,`div`,25),ie$1(294,`Default: true`),v()(),y(295,`td`,23),ie$1(296,`boolean`),v(),y(297,`td`,24),ie$1(298,`true`),v(),y(299,`td`,22),ie$1(300,`Whether the whole row is clickable to expand it`),v()(),y(301,`tr`)(302,`td`,22)(303,`strong`),ie$1(304,`[clrTtItem]`),v(),y(305,`div`,25),ie$1(306,`Type: TreetableTreeNode<T>`),v(),y(307,`div`,25),ie$1(308,`Default: undefined`),v()(),y(309,`td`,23),ie$1(310,`TreetableTreeNode<T>`),v(),y(311,`td`,24),ie$1(312,`undefined`),v(),y(313,`td`,22),ie$1(314,`A model of the row, used for selection, filtering, sorting and recursive rendering.`),v()()()()()(),y(315,`section`,26)(316,`h3`),ie$1(317,`Code & Examples`),v(),y(318,`section`,27)(319,`h4`,28),ie$1(320,`Treetable with clickable rows`),v(),y(321,`p`),ie$1(322,`Click on a row to display its children.`),v(),y(323,`clr-treetable`)(324,`clr-tt-column`),ie$1(325,`Name`),v(),y(326,`clr-tt-column`),ie$1(327,`Role`),v(),y(328,`clr-tt-column`),ie$1(329,`Random Number`),v(),y(330,`clr-tt-column`),ie$1(331,`Random Date`),v(),y(332,`clr-tt-row`,29)(333,`clr-tt-cell`),ie$1(334,`David Wallace`),v(),y(335,`clr-tt-cell`),ie$1(336,`CFO`),v(),y(337,`clr-tt-cell`),ie$1(338,`2`),v(),y(339,`clr-tt-cell`),ie$1(340,`2nd of August`),v(),y(341,`clr-tt-row`,29)(342,`clr-tt-cell`),ie$1(343,`Michael Scott`),v(),y(344,`clr-tt-cell`),ie$1(345,`Regional Manager`),v(),y(346,`clr-tt-cell`),ie$1(347,`19`),v(),y(348,`clr-tt-cell`),ie$1(349,`3rd of April`),v(),y(350,`clr-tt-row`)(351,`clr-tt-cell`),ie$1(352,`Dwight K. Schrute`),v(),y(353,`clr-tt-cell`),ie$1(354,`Assistant to the Regional Manager`),v(),y(355,`clr-tt-cell`),ie$1(356,`290`),v(),y(357,`clr-tt-cell`),ie$1(358,`17th of May`),v()(),y(359,`clr-tt-row`,29)(360,`clr-tt-cell`),ie$1(361,`Jim Halpert`),v(),y(362,`clr-tt-cell`),ie$1(363,`Head of Sales`),v(),y(364,`clr-tt-cell`),ie$1(365,`Lucky 7`),v(),y(366,`clr-tt-cell`),ie$1(367,`21st of December`),v(),y(368,`clr-tt-row`)(369,`clr-tt-cell`),ie$1(370,`Andy Bernard`),v(),j(371,`clr-tt-cell`),y(372,`clr-tt-cell`),ie$1(373,`13`),v(),y(374,`clr-tt-cell`),ie$1(375,`1st of December`),v()(),y(376,`clr-tt-row`)(377,`clr-tt-cell`),ie$1(378,`Stanley Hudson`),v(),j(379,`clr-tt-cell`),y(380,`clr-tt-cell`),ie$1(381,`3`),v(),y(382,`clr-tt-cell`),ie$1(383,`15th of November`),v()(),y(384,`clr-tt-row`)(385,`clr-tt-cell`),ie$1(386,`Phyllis Vance`),v(),j(387,`clr-tt-cell`)(388,`clr-tt-cell`)(389,`clr-tt-cell`),v(),y(390,`clr-tt-row`)(391,`clr-tt-cell`),ie$1(392,`Todd Packer`),v(),y(393,`clr-tt-cell`),ie$1(394,`The Packman`),v(),y(395,`clr-tt-cell`),ie$1(396,`96`),v(),y(397,`clr-tt-cell`),ie$1(398,`6th of September`),v()()(),y(399,`clr-tt-row`,29)(400,`clr-tt-cell`),ie$1(401,`Angela Martin`),v(),y(402,`clr-tt-cell`),ie$1(403,`Head of Accounting`),v(),y(404,`clr-tt-cell`),ie$1(405,`29`),v(),y(406,`clr-tt-cell`),ie$1(407,`7th of September`),v(),y(408,`clr-tt-row`)(409,`clr-tt-cell`),ie$1(410,`Kevin Malone`),v(),j(411,`clr-tt-cell`),y(412,`clr-tt-cell`),ie$1(413,`10`),v(),y(414,`clr-tt-cell`),ie$1(415,`4th of June`),v()(),y(416,`clr-tt-row`)(417,`clr-tt-cell`),ie$1(418,`Oscar Martinez`),v(),j(419,`clr-tt-cell`),y(420,`clr-tt-cell`),ie$1(421,`11`),v(),y(422,`clr-tt-cell`),ie$1(423,`9th of June`),v()()(),y(424,`clr-tt-row`,29)(425,`clr-tt-cell`),ie$1(426,`Kelly Kapoor`),v(),y(427,`clr-tt-cell`),ie$1(428,`Head of Customer Service`),v(),y(429,`clr-tt-cell`),ie$1(430,`1`),v(),j(431,`clr-tt-cell`),y(432,`clr-tt-row`)(433,`clr-tt-cell`),ie$1(434,`Ryan Howard`),v(),y(435,`clr-tt-cell`),ie$1(436,`Temp`),v(),j(437,`clr-tt-cell`)(438,`clr-tt-cell`),v()(),y(439,`clr-tt-row`)(440,`clr-tt-cell`),ie$1(441,`Creed Bratton`),v(),y(442,`clr-tt-cell`),ie$1(443,`Quality Assurance`),v(),y(444,`clr-tt-cell`),ie$1(445,`3`),v(),y(446,`clr-tt-cell`),ie$1(447,`Early 1900s`),v()(),y(448,`clr-tt-row`)(449,`clr-tt-cell`),ie$1(450,`Meredith Palmer`),v(),y(451,`clr-tt-cell`),ie$1(452,`Supplier Relations`),v(),j(453,`clr-tt-cell`)(454,`clr-tt-cell`),v(),y(455,`clr-tt-row`)(456,`clr-tt-cell`),ie$1(457,`Toby Flenderson`),v(),y(458,`clr-tt-cell`),ie$1(459,`Human Resources`),v(),y(460,`clr-tt-cell`),ie$1(461,`0`),v(),y(462,`clr-tt-cell`),ie$1(463,`Ugh...`),v()(),y(464,`clr-tt-row`)(465,`clr-tt-cell`),ie$1(466,`Pam Beesly`),v(),y(467,`clr-tt-cell`),ie$1(468,`Reception`),v(),y(469,`clr-tt-cell`),ie$1(470,`10`),v(),y(471,`clr-tt-cell`),ie$1(472,`4th of July`),v()(),y(473,`clr-tt-row`)(474,`clr-tt-cell`),ie$1(475,`Darryl Philbin`),v(),y(476,`clr-tt-cell`),ie$1(477,`Warehouse`),v(),y(478,`clr-tt-cell`),ie$1(479,`99`),v(),y(480,`clr-tt-cell`),ie$1(481,`31st of August`),v()()()(),y(482,`clr-tt-row`)(483,`clr-tt-cell`),ie$1(484,`Some Dude - you probably know him, but he definitely knows you!`),v(),y(485,`clr-tt-cell`),ie$1(486,`N/A`),v(),y(487,`clr-tt-cell`),ie$1(488,`-1`),v(),y(489,`clr-tt-cell`),ie$1(490,`1st of April`),v()()(),j(491,`clr-code-snippet`,30),v(),y(492,`section`,31)(493,`h4`,32),ie$1(494,`Treetable with clickable carets and expanded rows`),v(),y(495,`p`),ie$1(496,` Sometimes you might want to have links or buttons inside your rows. Click event bubbling might prevent clicking on said links without expanding or contracting that row. Additionally, you can have rows that are expanded by default using the `),y(497,`code`,33),ie$1(498,`clrExpanded`),v(),ie$1(499,` input property. `),v(),y(500,`clr-treetable`,34)(501,`clr-tt-column`),ie$1(502,`Name`),v(),y(503,`clr-tt-column`),ie$1(504,`Role`),v(),y(505,`clr-tt-column`),ie$1(506,`Actor`),v(),y(507,`clr-tt-row`,35)(508,`clr-tt-cell`),ie$1(509,`David Wallace`),v(),y(510,`clr-tt-cell`),ie$1(511,`CFO`),v(),y(512,`clr-tt-cell`)(513,`a`,36),ie$1(514,`Some actor`),v()(),y(515,`clr-tt-row`,29)(516,`clr-tt-cell`),ie$1(517,`Michael Scott`),v(),y(518,`clr-tt-cell`),ie$1(519,`Regional Manager`),v(),y(520,`clr-tt-cell`)(521,`a`,36),ie$1(522,`Some actor`),v()(),y(523,`clr-tt-row`)(524,`clr-tt-cell`),ie$1(525,`Dwight K. Schrute`),v(),y(526,`clr-tt-cell`),ie$1(527,`Assistant to the Regional Manager`),v(),y(528,`clr-tt-cell`)(529,`a`,36),ie$1(530,`Some actor`),v()()(),y(531,`clr-tt-row`)(532,`clr-tt-cell`),ie$1(533,`Jim Halpert`),v(),y(534,`clr-tt-cell`),ie$1(535,`Head of Sales`),v(),y(536,`clr-tt-cell`)(537,`a`,36),ie$1(538,`Some actor`),v()(),y(539,`clr-tt-row`)(540,`clr-tt-cell`),ie$1(541,`Andy Bernard`),v(),j(542,`clr-tt-cell`),y(543,`clr-tt-cell`)(544,`a`,36),ie$1(545,`Some actor`),v()()(),y(546,`clr-tt-row`)(547,`clr-tt-cell`),ie$1(548,`Stanley Hudson`),v(),j(549,`clr-tt-cell`),y(550,`clr-tt-cell`)(551,`a`,36),ie$1(552,`Some actor`),v()()(),y(553,`clr-tt-row`)(554,`clr-tt-cell`),ie$1(555,`Phyllis Vance`),v(),j(556,`clr-tt-cell`),y(557,`clr-tt-cell`)(558,`a`,36),ie$1(559,`Some actor`),v()()(),y(560,`clr-tt-row`)(561,`clr-tt-cell`),ie$1(562,`Todd Packer`),v(),y(563,`clr-tt-cell`),ie$1(564,`The Packman`),v(),y(565,`clr-tt-cell`)(566,`a`,36),ie$1(567,`Some actor`),v()()()(),y(568,`clr-tt-row`,29)(569,`clr-tt-cell`),ie$1(570,`Angela Martin`),v(),y(571,`clr-tt-cell`),ie$1(572,`Head of Accounting`),v(),y(573,`clr-tt-cell`)(574,`a`,36),ie$1(575,`Some actor`),v()(),y(576,`clr-tt-row`)(577,`clr-tt-cell`),ie$1(578,`Kevin Malone`),v(),j(579,`clr-tt-cell`),y(580,`clr-tt-cell`)(581,`a`,36),ie$1(582,`Some actor`),v()()(),y(583,`clr-tt-row`)(584,`clr-tt-cell`),ie$1(585,`Oscar Martinez`),v(),j(586,`clr-tt-cell`),y(587,`clr-tt-cell`)(588,`a`,36),ie$1(589,`Some actor`),v()()()(),y(590,`clr-tt-row`,29)(591,`clr-tt-cell`),ie$1(592,`Kelly Kapoor`),v(),y(593,`clr-tt-cell`),ie$1(594,`Head of Customer Service`),v(),y(595,`clr-tt-cell`)(596,`a`,36),ie$1(597,`Some actor`),v()(),y(598,`clr-tt-row`)(599,`clr-tt-cell`),ie$1(600,`Ryan Howard`),v(),y(601,`clr-tt-cell`),ie$1(602,`Temp`),v(),y(603,`clr-tt-cell`)(604,`a`,36),ie$1(605,`Some actor`),v()()()(),y(606,`clr-tt-row`)(607,`clr-tt-cell`),ie$1(608,`Creed Bratton`),v(),y(609,`clr-tt-cell`),ie$1(610,`Quality Assurance`),v(),y(611,`clr-tt-cell`)(612,`a`,36),ie$1(613,`Some actor`),v()()(),y(614,`clr-tt-row`)(615,`clr-tt-cell`),ie$1(616,`Meredith Palmer`),v(),y(617,`clr-tt-cell`),ie$1(618,`Supplier Relations`),v(),y(619,`clr-tt-cell`)(620,`a`,36),ie$1(621,`Some actor`),v()()(),y(622,`clr-tt-row`)(623,`clr-tt-cell`),ie$1(624,`Toby Flenderson`),v(),y(625,`clr-tt-cell`),ie$1(626,`Human Resources`),v(),y(627,`clr-tt-cell`)(628,`a`,36),ie$1(629,`Some actor`),v()()(),y(630,`clr-tt-row`)(631,`clr-tt-cell`),ie$1(632,`Pam Beesly`),v(),y(633,`clr-tt-cell`),ie$1(634,`Reception`),v(),y(635,`clr-tt-cell`)(636,`a`,36),ie$1(637,`Some actor`),v()()(),y(638,`clr-tt-row`)(639,`clr-tt-cell`),ie$1(640,`Darryl Philbin`),v(),y(641,`clr-tt-cell`),ie$1(642,`Warehouse`),v(),y(643,`clr-tt-cell`)(644,`a`,36),ie$1(645,`Some actor`),v()()()()(),y(646,`clr-tt-row`)(647,`clr-tt-cell`),ie$1(648,`Some Dude`),v(),y(649,`clr-tt-cell`),ie$1(650,`N/A`),v(),y(651,`clr-tt-cell`),ie$1(652,`You know him, nothing more to see`),v()()(),j(653,`clr-code-snippet`,30),v(),y(654,`section`,37)(655,`h4`,38),ie$1(656,`Treetable with single row actions`),v(),y(657,`p`),ie$1(658,` To show single row actions add `),y(659,`code`,33),ie$1(660,`clr-tt-action-overflow`),v(),ie$1(661,` inside a `),y(662,`code`,33),ie$1(663,`clr-tt-row`),v()(),y(664,`clr-treetable`)(665,`clr-tt-column`),ie$1(666,`Some column`),v(),y(667,`clr-tt-column`),ie$1(668,`Some other column`),v(),y(669,`clr-tt-row`,29)(670,`clr-tt-action-overflow`)(671,`button`,39),ie$1(672,`Test Action`),v()(),y(673,`clr-tt-cell`),ie$1(674,`Lorem ipsum dolor sit amet`),v(),y(675,`clr-tt-cell`),ie$1(676,`2`),v(),y(677,`clr-tt-row`)(678,`clr-tt-cell`),ie$1(679,`Lorem ipsum dolor sit amet`),v(),y(680,`clr-tt-cell`),ie$1(681,`3`),v()()(),y(682,`clr-tt-row`)(683,`clr-tt-cell`),ie$1(684,`Lorem ipsum dolor sit amet`),v(),y(685,`clr-tt-cell`),ie$1(686,`1`),v()()(),j(687,`clr-code-snippet`,30),v(),y(688,`section`,40)(689,`h4`,41),ie$1(690,`Custom column sizing`),v(),y(691,`p`),ie$1(692,` For custom column widths use the `),y(693,`code`,33),ie$1(694,`clr-col-`),v(),ie$1(695,` classes on the header columns `),y(696,`code`,33),ie$1(697,`clr-tt-column`),v(),ie$1(698,`. The cells in the body will adjust accordingly automatically. `),v(),y(699,`clr-treetable`)(700,`clr-tt-column`,42),ie$1(701,`Some column`),v(),y(702,`clr-tt-column`,43),ie$1(703,`Some other column`),v(),y(704,`clr-tt-row`,29)(705,`clr-tt-cell`),ie$1(706,`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi delectus dignissimos, ducimus... `),v(),y(707,`clr-tt-cell`),ie$1(708,`2`),v(),y(709,`clr-tt-row`)(710,`clr-tt-cell`),ie$1(711,`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, at atque dignissimos ... `),v(),y(712,`clr-tt-cell`),ie$1(713,`3`),v()()(),y(714,`clr-tt-row`)(715,`clr-tt-cell`),ie$1(716,`Lorem ipsum dolor sit amet, consectetur adipisicing elit. At aut cumque ex libero, minus ... `),v(),y(717,`clr-tt-cell`),ie$1(718,`1`),v()()(),j(719,`clr-code-snippet`,30),v(),y(720,`section`,44)(721,`h4`,45),ie$1(722,`Column resizing`),v(),y(723,`p`),ie$1(724,` The `),y(725,`code`,33),ie$1(726,`clr-tt-column`),v(),ie$1(727,` but the last displayed component automatically renders a resize handle. Users can resize columns via drag-and-drop or by using the arrow keys while the handle is focused. Columns will not shrink below their `),y(728,`code`,33),ie$1(729,`min-content`),v(),ie$1(730,` width, with an absolute minimum of `),y(731,`code`,33),ie$1(732,`48px`),v(),ie$1(733,`. `),v(),y(734,`p`),ie$1(735,` To set a custom (initial/max) width use `),y(736,`code`,33),ie$1(737,`[clrTtColumnSize]`),v(),ie$1(738,` on the `),y(739,`code`,33),ie$1(740,`clr-tt-column`),v(),ie$1(741,`. The cells in the body will adjust accordingly automatically. To react to resizing, use the `),y(742,`code`,33),ie$1(743,`(clrTtColumnResize)`),v(),ie$1(744,` output on the same element. It emits the new column width in px as a `),y(745,`code`,33),ie$1(746,`number`),v(),ie$1(747,`. `),v(),y(748,`clr-treetable`)(749,`clr-tt-column`,46),N$1(`clrTtColumnResize`,function(p){return r.onColumnResize(p)}),ie$1(750,` Some column `),v(),y(751,`clr-tt-column`,47),ie$1(752,` Some other column`),v(),y(753,`clr-tt-row`,29)(754,`clr-tt-cell`),ie$1(755,`Lorem ipsum dolor sit amet`),v(),y(756,`clr-tt-cell`),ie$1(757,`2`),v(),y(758,`clr-tt-row`)(759,`clr-tt-cell`),ie$1(760,`Lorem ipsum dolor sit amet`),v(),y(761,`clr-tt-cell`),ie$1(762,`3`),v()()(),y(763,`clr-tt-row`)(764,`clr-tt-cell`),ie$1(765,`Lorem ipsum dolor sit amet`),v(),y(766,`clr-tt-cell`),ie$1(767,`1`),v()()(),y(768,`p`,48),ie$1(769),v(),y(770,`button`,49),N$1(`click`,function(){return r.onResetResize()}),ie$1(771,`Reset`),v(),y(772,`div`,48)(773,`clr-tabs`)(774,`clr-tab`)(775,`button`,50),ie$1(776,`HTML`),v(),je$1(777,Ke,2,1,`clr-tab-content`,51),v(),y(778,`clr-tab`)(779,`button`,50),ie$1(780,`TS`),v(),je$1(781,Ye,2,2,`clr-tab-content`,51),v()()()(),y(782,`section`,52)(783,`h4`,53),ie$1(784,`Recursive smart iterator`),v(),y(785,`p`),ie$1(786,` If you want to let the treetable handle data processing needed by its various features, you will need to use the `),y(787,`code`,33),ie$1(788,`*clrTtItems`),v(),ie$1(789,` structural directive instead of creating a template and looping over it. This directive makes it possible to recursively render trees and enables features like sorting, filtering & selection for the rendered dataset. `),j(790,`br`),ie$1(791,` It has the same syntax as `),y(792,`code`,33),ie$1(793,`*ngFor`),v(),ie$1(794,` and accepts an additional `),y(795,`code`,33),ie$1(796,`getChildren`),v(),ie$1(797,` parameter that receives a node and should return its children. Like `),y(798,`code`,33),ie$1(799,`*ngFor`),v(),ie$1(800,`s `),y(801,`code`,33),ie$1(802,`index`),v(),ie$1(803,` exported value, `),y(804,`code`,33),ie$1(805,`*clrTtItems`),v(),ie$1(806,` also provides exported values. `),j(807,`br`),ie$1(808,` The following exported values can be aliased to local variables: `),v(),y(809,`ul`)(810,`li`)(811,`code`,33),ie$1(812,`$implicit: T`),v(),ie$1(813,`: The value of the individual items in the iterable (`),y(814,`code`,33),ie$1(815,`clrTtItemsOf`),v(),ie$1(816,`) `),v(),y(817,`li`)(818,`code`,33),ie$1(819,`clrTtNode`),v(),ie$1(820,`: The value of the model of the row. This needs to be passed to the `),y(821,`code`,33),ie$1(822,`[clrTtItem]`),v(),ie$1(823,` input of the treetable-row, to further render the child rows. `),v(),y(824,`li`)(825,`code`,33),ie$1(826,`isLeaf`),v(),ie$1(827,`: True if the current node is a leaf and has no children.`),v()(),j(828,`br`),y(829,`clr-treetable`)(830,`clr-tt-column`),ie$1(831,`Name`),v(),y(832,`clr-tt-column`),ie$1(833,`Role`),v(),y(834,`clr-tt-column`),ie$1(835,`Supervisor`),v(),je$1(836,qe,6,5,`clr-tt-row`,54),v(),j(837,`clr-code-snippet`,30),v(),y(838,`section`,55)(839,`h4`,56),ie$1(840,`Selection`),v(),y(841,`p`),ie$1(842,` To allow actions on multiple items at once, the treetable provides the ability for the user to select rows. To make rows selectable in your treetable, you need to use `),y(843,`code`,33),ie$1(844,`*clrTtItems`),v(),ie$1(845,` and do the following: `),v(),y(846,`ul`)(847,`li`),ie$1(848,` Add a `),y(849,`code`,33),ie$1(850,`[clrTtItem]`),v(),ie$1(851,` input on each `),y(852,`code`,33),ie$1(853,`<clr-tt-row>`),v(),ie$1(854,` component `),v(),y(855,`li`),ie$1(856,` Add a `),y(857,`code`,33),ie$1(858,`[(clrTtSelected)]`),v(),ie$1(859,` two-way binding on the treetable itself, to have access to the list of currently selected items. Note that by adding items to this list yourself, you can dynamically select elements if you need to. `),v()(),y(860,`p`),ie$1(861,` This will enable the default Clarity selection model used in the `),y(862,`a`,10),ie$1(863,`TreeView`),v(),ie$1(864,`. Parent rows will be automatically selected, if all of its child rows are selected. `),v(),y(865,`clr-treetable`,57),oi(`clrTtSelectedChange`,function(p){return te(x),bi(r.selected,p)||(r.selected=p),ne(p)}),y(866,`clr-tt-column`),ie$1(867,`Name`),v(),y(868,`clr-tt-column`),ie$1(869,`Role`),v(),y(870,`clr-tt-column`),ie$1(871,`Supervisor`),v(),je$1(872,je,6,5,`clr-tt-row`,54),v(),j(873,`clr-code-snippet`,30),v(),y(874,`section`,58)(875,`h4`,59),ie$1(876,`Selection without automatic parent selection`),v(),y(877,`p`),ie$1(878,` If needed this selection behaviour can be changed, to no longer automatically select parent rows, if all the child rows are selected. To achieve this the `),y(879,`code`,33),ie$1(880,`[clrTtAutoParentSelection]`),v(),ie$1(881,` input of the treetable must be set to `),y(882,`code`,33),ie$1(883,`false`),v(),ie$1(884,`. Now the parent row will stay in status `),y(885,`code`,33),ie$1(886,`INDETERMINATE`),v(),ie$1(887,` when all of its children are selected as long as the parent was not manually selected. `),v(),y(888,`clr-treetable`,60),oi(`clrTtSelectedChange`,function(p){return te(x),bi(r.selected,p)||(r.selected=p),ne(p)}),y(889,`clr-tt-column`),ie$1(890,`Name`),v(),y(891,`clr-tt-column`),ie$1(892,`Role`),v(),y(893,`clr-tt-column`),ie$1(894,`Type`),v(),je$1(895,Je,8,8,`clr-tt-row`,54),v(),j(896,`clr-code-snippet`,30),v(),y(897,`section`,61)(898,`h4`,62),ie$1(899,`Custom Sorting`),v(),y(900,`p`),ie$1(901,` This can be done by providing a comparator, which implements `),y(902,`code`,33),ie$1(903,` ClrTreetableComparatorInterface`),v(),ie$1(904,`, through the `),y(905,`code`,33),ie$1(906,`[clrTtSortBy]`),v(),ie$1(907,` input. `),v(),y(908,`p`)(909,`button`,63),N$1(`click`,function(){return r.sortOrder=1}),ie$1(910,` Sort ascendingly `),v(),y(911,`button`,63),N$1(`click`,function(){return r.sortOrder=-1}),ie$1(912,` Sort descendingly `),v(),y(913,`button`,63),N$1(`click`,function(){return r.sortOrder=0}),ie$1(914,`Clear sort`),v()(),y(915,`clr-treetable`)(916,`clr-tt-column`,64),oi(`clrTtSortOrderChange`,function(p){return te(x),bi(r.sortOrder,p)||(r.sortOrder=p),ne(p)}),ie$1(917,`Name`),v(),y(918,`clr-tt-column`),ie$1(919,`Role`),v(),y(920,`clr-tt-column`),ie$1(921,`Type`),v(),je$1(922,Qe,8,8,`clr-tt-row`,54),v(),j(923,`clr-code-snippet`,30),v(),y(924,`section`,65)(925,`h4`,66),ie$1(926,`Pre-Sorted Columns`),v(),y(927,`p`),ie$1(928,` Columns can be pre-sorted ascending or descending by declaring the `),y(929,`code`,33),ie$1(930,`[(clrTtSortOrder)]`),v(),ie$1(931,` input on `),y(932,`code`,33),ie$1(933,`clr-tt-column`),v(),ie$1(934,`. Use the `),y(935,`code`,33),ie$1(936,`ClrTreetableSortOrder`),v(),ie$1(937,` enum for such a scenario. `),v(),y(938,`clr-treetable`)(939,`clr-tt-column`,64),oi(`clrTtSortOrderChange`,function(p){return te(x),bi(r.descOrder,p)||(r.descOrder=p),ne(p)}),ie$1(940,`Name`),v(),y(941,`clr-tt-column`),ie$1(942,`Role`),v(),y(943,`clr-tt-column`),ie$1(944,`Type`),v(),je$1(945,$e,8,8,`clr-tt-row`,54),v(),j(946,`clr-code-snippet`,30),v(),y(947,`section`,67)(948,`h4`,68),ie$1(949,`Filtering`),v(),y(950,`p`),ie$1(951,` This can be done by providing either a built-in filter or a custom filter, which implements `),y(952,`code`,33),ie$1(953,`ClrTreetableFilterInterface`),v(),ie$1(954,`. `),j(955,`br`),ie$1(956,` Currently there is only one built-in filter component, a string filter. This component requires that a `),y(957,`code`,33),ie$1(958,`ClrTreetableStringFilterFunction`),v(),ie$1(959,` is passed to it. This is needed to determine which field on the original object has to be filtered for. `),v(),y(960,`clr-treetable`)(961,`clr-tt-column`),ie$1(962,` Name `),j(963,`clr-tt-string-filter`,69),v(),y(964,`clr-tt-column`),ie$1(965,` Role `),j(966,`clr-tt-string-filter`,69),v(),y(967,`clr-tt-column`),ie$1(968,`Type`),v(),je$1(969,Ze,8,8,`clr-tt-row`,54),v(),y(970,`div`,70)(971,`clr-tabs`)(972,`clr-tab`)(973,`button`,50),ie$1(974,`HTML`),v(),je$1(975,et,2,1,`clr-tab-content`,51),v(),y(976,`clr-tab`)(977,`button`,50),ie$1(978,`TS`),v(),je$1(979,tt,2,2,`clr-tab-content`,51),v()()(),y(980,`p`),ie$1(981,` A custom filter can be created by implementing the `),y(982,`code`,33),ie$1(983,`ClrTreetableFilterInterface`),v(),ie$1(984,`. The custom implementation then has to be passed as an `),y(985,`code`,33),ie$1(986,`[clrTtFilter]`),v(),ie$1(987,` for a treetable-filter element to add it to a treetable-column. The filter will be applied to the dataset. If you want to make this filter server driven, then you have to return true in the `),y(988,`code`,33),ie$1(989,`accept()`),v(),ie$1(990,` method in the interface and react to the filter state changes in the `),y(991,`code`,33),ie$1(992,`(clrTtRefresh)`),v(),ie$1(993,` output of the treetable. `),v(),y(994,`clr-treetable`)(995,`clr-tt-column`),ie$1(996,`Name`),v(),y(997,`clr-tt-column`),ie$1(998,`Role`),v(),y(999,`clr-tt-column`),ie$1(1e3,` Type `),y(1001,`clr-tt-filter`,71),j(1002,`clr-role-type-filter`,null,0),v()(),je$1(1004,lt,8,8,`clr-tt-row`,54),v(),y(1005,`div`,48)(1006,`clr-tabs`)(1007,`clr-tab`)(1008,`button`,50),ie$1(1009,`HTML`),v(),je$1(1010,rt,2,1,`clr-tab-content`,51),v(),y(1011,`clr-tab`)(1012,`button`,50),ie$1(1013,`TS`),v(),je$1(1014,it,2,2,`clr-tab-content`,51),v()()()(),y(1015,`section`,72)(1016,`h4`,73),ie$1(1017,`Empty placeholder`),v(),y(1018,`p`),ie$1(1019,` An empty treetable shows a compact placeholder (icon and text side by side) by default, consistent with the datagrid. To use the regular placeholder, add the class `),y(1020,`code`,33),ie$1(1021,`treetable-placeholder-wide`),v(),ie$1(1022,` to the `),y(1023,`code`,33),ie$1(1024,`clr-treetable`),v(),ie$1(1025,`. `),v(),y(1026,`clr-treetable`)(1027,`clr-tt-column`),ie$1(1028,`Name`),v()(),j(1029,`clr-code-snippet`,30),y(1030,`clr-treetable`)(1031,`clr-tt-column`),ie$1(1032,`Name`),v(),y(1033,`clr-tt-placeholder`),ie$1(1034,`No entries found`),v()(),j(1035,`clr-code-snippet`,30),y(1036,`clr-treetable`,74)(1037,`clr-tt-column`),ie$1(1038,`Name`),v()(),j(1039,`clr-code-snippet`,30),v(),y(1040,`section`,75)(1041,`h4`,76),ie$1(1042,`Hide/Show Columns`),v(),y(1043,`p`),ie$1(1044,` Treetable columns are hideable with the `),y(1045,`code`,33),ie$1(1046,`*clrTtHideableColumn`),v(),ie$1(1047,` structural directive. Because this is a structural directive it cannot be used on the `),y(1048,`code`,33),ie$1(1049,`clr-tt-column`),v(),ie$1(1050,` component directly. Instead, use `),y(1051,`code`,33),ie$1(1052,`*clrTtHideableColumn`),v(),ie$1(1053,` on an `),y(1054,`code`,33),ie$1(1055,`ng-container`),v(),ie$1(1056,` inside your `),y(1057,`code`,33),ie$1(1058,`clr-tt-column`),v(),ie$1(1059,`. The structural directive renders the column title in both the column header and the column manager toggle list. `),v(),y(1060,`p`),ie$1(1061,` The directive accepts an object with a `),y(1062,`code`,33),ie$1(1063,`hidden`),v(),ie$1(1064,` property property. `),y(1065,`code`,33),ie$1(1066,`hidden`),v(),ie$1(1067,` controls whether the column is currently visible. `),v(),y(1068,`p`),ie$1(1069,` To react to visibility changes—for example (e.g., for local storage syncing) you must wrap the column title in an `),y(1070,`code`,33),ie$1(1071,`ng-template`),v(),ie$1(1072,` instead. Apply the directive as an attribute `),y(1073,`code`,33),ie$1(1074,`[clrTtHideableColumn]`),v(),ie$1(1075,` and listen for state changes using the `),y(1076,`code`,33),ie$1(1077,`(clrTtHiddenChange)`),v(),ie$1(1078,` output event. `),v(),y(1079,`p`),ie$1(1080,` The column manager is rendered automatically inside `),y(1081,`code`,33),ie$1(1082,`clr-tt-footer`),v(),ie$1(1083,` whenever at least one column has the `),y(1084,`code`,33),ie$1(1085,`*clrTtHideableColumn`),v(),ie$1(1086,` directive applied. No additional configuration is required — simply add `),y(1087,`code`,33),ie$1(1088,`<clr-tt-footer>`),v(),ie$1(1089,` to the treetable. `),v(),y(1090,`p`),ie$1(1091,` In the manager the visibility of all hideable columns can be toggled. Additionally the `),y(1092,`code`,33),ie$1(1093,`SELECT ALL`),v(),ie$1(1094,` button makes all columns visible. `),v(),j(1095,`br`),y(1096,`clr-treetable`)(1097,`clr-tt-column`),je$1(1098,nt,2,0,`ng-container`,77),v(),y(1099,`clr-tt-column`),je$1(1100,at,1,0,`ng-template`,78),N$1(`clrTtHiddenChange`,function(p){return r.log(`HiddenChange`,p)}),v(),y(1101,`clr-tt-column`),je$1(1102,ct,2,0,`ng-container`,77),v(),y(1103,`clr-tt-row`,29)(1104,`clr-tt-cell`),ie$1(1105,`Bob`),v(),y(1106,`clr-tt-cell`),ie$1(1107,`CEO`),v(),y(1108,`clr-tt-cell`),ie$1(1109,`Lead`),v(),y(1110,`clr-tt-row`,29)(1111,`clr-tt-cell`),ie$1(1112,`Alice`),v(),y(1113,`clr-tt-cell`),ie$1(1114,`Head of Sales`),v(),y(1115,`clr-tt-cell`),ie$1(1116,`Lead`),v(),y(1117,`clr-tt-row`)(1118,`clr-tt-cell`),ie$1(1119,`Frank`),v(),y(1120,`clr-tt-cell`),ie$1(1121,`Sales Manager 1`),v(),y(1122,`clr-tt-cell`),ie$1(1123,`Manager`),v()(),y(1124,`clr-tt-row`)(1125,`clr-tt-cell`),ie$1(1126,`Charlie`),v(),y(1127,`clr-tt-cell`),ie$1(1128,`Sales Manager 2`),v(),y(1129,`clr-tt-cell`),ie$1(1130,`Manager`),v()()(),y(1131,`clr-tt-row`,29)(1132,`clr-tt-cell`),ie$1(1133,`Grace`),v(),y(1134,`clr-tt-cell`),ie$1(1135,`Head of Engineering`),v(),y(1136,`clr-tt-cell`),ie$1(1137,`Lead`),v(),y(1138,`clr-tt-row`)(1139,`clr-tt-cell`),ie$1(1140,`Hank`),v(),y(1141,`clr-tt-cell`),ie$1(1142,`Engineering Manager 1`),v(),y(1143,`clr-tt-cell`),ie$1(1144,`Manager`),v()(),y(1145,`clr-tt-row`)(1146,`clr-tt-cell`),ie$1(1147,`Karen`),v(),y(1148,`clr-tt-cell`),ie$1(1149,`Engineering Manager 2`),v(),y(1150,`clr-tt-cell`),ie$1(1151,`Manager`),v()()()(),j(1152,`clr-tt-footer`),v(),j(1153,`clr-code-snippet`,30),v(),y(1154,`section`,79)(1155,`h3`,80),ie$1(1156,`Export Treetable Button`),v(),y(1157,`p`),ie$1(1158,` The `),y(1159,`code`,33),ie$1(1160,`clr-export-treetable-button`),v(),ie$1(1161,` component provides an excel export button for the treetable. It is placed as a sibling of the treetable and receives the treetable instance and its `),y(1162,`code`),ie$1(1163,`ElementRef`),v(),ie$1(1164,`. It is standalone and part of `),y(1165,`code`),ie$1(1166,`CLR_TREETABLE_DIRECTIVES`),v(),ie$1(1167,`; import `),y(1168,`code`),ie$1(1169,`ExportTreetableButtonComponent`),v(),ie$1(1170,` or the whole set into your component. `),v(),y(1171,`p`),ie$1(1172,`The button offers the same export types as the datagrid export button:`),v(),y(1173,`ul`)(1174,`li`)(1175,`code`),ie$1(1176,`ALL`),v(),ie$1(1177,`: all rows, ignoring active filters. The active sort is applied.`),v(),y(1178,`li`)(1179,`code`),ie$1(1180,`FILTERED`),v(),ie$1(1181,`: the rows that pass the active filters. Only offered while at least one filter is active, because it is identical to `),y(1182,`code`),ie$1(1183,`ALL`),v(),ie$1(1184,` otherwise. `),v(),y(1185,`li`)(1186,`code`),ie$1(1187,`SELECTED`),v(),ie$1(1188,`: the currently selected rows. Only offered while at least one row is selected. Selection is tracked on the displayed rows, so a selected row that is hidden by an active filter is not part of the export. `),v()(),y(1189,`p`),ie$1(1190,` The rows are written in the same depth-first order in which they are rendered, without an additional hierarchy indicator. `),v(),y(1191,`p`)(1192,`strong`)(1193,`code`),ie$1(1194,`clrTtField`),v(),ie$1(1195,` is the opt-in for the export: only columns that declare it are exported.`),v(),ie$1(1196,` A column without `),y(1197,`code`),ie$1(1198,`clrTtField`),v(),ie$1(1199,` is omitted from the export entirely, header and values alike. Hidden columns are excluded as well. `),v(),y(1200,`p`),ie$1(1201,` Column titles are read from the rendered treetable. Cell values are resolved via the `),y(1202,`code`),ie$1(1203,`clrTtField`),v(),ie$1(1204,` property path of the corresponding column, which may be nested, e.g. `),y(1205,`code`),ie$1(1206,`address.city`),v(),ie$1(1207,`. The type of the exported cells is taken from `),y(1208,`code`),ie$1(1209,`clrTtColType`),v(),ie$1(1210,` of the column, which is `),y(1211,`code`),ie$1(1212,`string`),v(),ie$1(1213,` by default. `),v(),y(1214,`p`),ie$1(1215,`The export requires the optional `),y(1216,`code`),ie$1(1217,`zipcelx`),v(),ie$1(1218,` dependency (`),y(1219,`code`),ie$1(1220,`npm install zipcelx`),v(),ie$1(1221,`).`),v(),y(1222,`ul`)(1223,`li`)(1224,`b`),ie$1(1225,`Inputs:`),v(),y(1226,`ul`)(1227,`li`)(1228,`code`),ie$1(1229,`treetable`),v(),ie$1(1230,`: Reference to the `),y(1231,`code`),ie$1(1232,`ClrTreetable`),v(),ie$1(1233,` instance.`),v(),y(1234,`li`)(1235,`code`),ie$1(1236,`treetableRef`),v(),ie$1(1237,`: `),y(1238,`code`),ie$1(1239,`ElementRef`),v(),ie$1(1240,` of the same treetable.`),v(),y(1241,`li`)(1242,`code`),ie$1(1243,`exportTypesToShow`),v(),ie$1(1244,`: Array of export types to show (ALL, FILTERED, SELECTED). For each type a custom display value (e.g. a translated label) can be provided. `),v(),y(1245,`li`)(1246,`code`),ie$1(1247,`isBackendExport`),v(),ie$1(1248,`: If true, emits an event for backend export; if false, exports on the client. `),v(),y(1249,`li`)(1250,`code`),ie$1(1251,`exportTitlePrefix`),v(),ie$1(1252,`: File name of the exported file. Default is `),y(1253,`code`),ie$1(1254,`export-treetable`),v(),ie$1(1255,`. `),v(),y(1256,`li`)(1257,`code`),ie$1(1258,`exportButtonPosition`),v(),ie$1(1259,`: Position of the export button ('left' or 'right').`),v(),y(1260,`li`)(1261,`code`),ie$1(1262,`exportButtonText`),v(),ie$1(1263,`: Custom or translated text of the button, the default is 'EXPORT'.`),v()()(),y(1264,`li`)(1265,`b`),ie$1(1266,`Outputs:`),v(),y(1267,`ul`)(1268,`li`)(1269,`code`),ie$1(1270,`backendExport`),v(),ie$1(1271,`: Emitted when export is triggered and `),y(1272,`code`),ie$1(1273,`isBackendExport`),v(),ie$1(1274,` is true. The event provides the requested export type. `),v()()()(),j(1275,`clr-export-treetable-button`,81),y(1276,`clr-treetable`,57,1),oi(`clrTtSelectedChange`,function(p){return te(x),bi(r.selectedForExport,p)||(r.selectedForExport=p),ne(p)}),y(1278,`clr-tt-column`,82),ie$1(1279,`Name`),v(),y(1280,`clr-tt-column`,83),ie$1(1281,`Role`),v(),y(1282,`clr-tt-column`,84),ie$1(1283,`Type`),v(),je$1(1284,ot,8,7,`clr-tt-row`,85),j(1285,`clr-tt-footer`),v(),j(1286,`clr-code-snippet`,30)(1287,`clr-code-snippet`,30),v()()()()}if(m&2){let x=Jt(1003);A(`title`,r.title),f(491),A(`clrCode`,r.htmlExampleClickableRows),f(9),A(`clrClickableRows`,!1),f(7),A(`clrExpanded`,!0),f(146),A(`clrCode`,r.htmlExampleClickableCaret),f(34),A(`clrCode`,r.htmlExampleSingleRowAction),f(32),A(`clrCode`,r.htmlExampleCustomSize),f(30),A(`clrTtColumnSize`,r.width()),f(2),A(`clrTtColumnSize`,400),f(18),gt$1(`Last resized width: `,r.width(),`px`),f(67),A(`clrTtItemsOf`,r.orgUnitMemberHierarchy)(`clrTtItemsGetChildren`,r.getChildren),f(),A(`clrCode`,r.htmlExampleSmartIterator),f(28),ri(`clrTtSelected`,r.selected),f(7),A(`clrTtItemsOf`,r.orgUnitMemberHierarchy)(`clrTtItemsGetChildren`,r.getChildren),f(),A(`clrCode`,r.htmlExampleSelection),f(15),ri(`clrTtSelected`,r.selected),A(`clrTtAutoParentSelection`,!1),f(7),A(`clrTtItemsOf`,r.orgUnitMemberHierarchy)(`clrTtItemsGetChildren`,r.getChildren),f(),A(`clrCode`,r.htmlExampleNoAutoParentSelection),f(13),A(`disabled`,r.sortOrder===1),f(2),A(`disabled`,r.sortOrder===-1),f(2),A(`disabled`,r.sortOrder===0),f(3),A(`clrTtSortBy`,r.nameComparator),ri(`clrTtSortOrder`,r.sortOrder),f(6),A(`clrTtItemsOf`,r.orgUnitMemberHierarchy)(`clrTtItemsGetChildren`,r.getChildren),f(),A(`clrCode`,r.htmlExampleCustomSorting),f(16),A(`clrTtSortBy`,r.nameComparator),ri(`clrTtSortOrder`,r.descOrder),f(6),A(`clrTtItemsOf`,r.orgUnitMemberHierarchy)(`clrTtItemsGetChildren`,r.getChildren),f(),A(`clrCode`,r.htmlExamplePresorting),f(17),A(`clrTtStringFilter`,r.orgUnitMemberNameFilter)(`clrTtFilterPlaceholder`,`Name`),f(3),A(`clrTtStringFilter`,r.orgUnitMemberRoleFilter)(`clrTtFilterPlaceholder`,`Role`),f(3),A(`clrTtItemsOf`,r.orgUnitMemberHierarchy)(`clrTtItemsGetChildren`,r.getChildren),f(32),A(`clrTtFilter`,x),f(3),A(`clrTtItemsOf`,r.orgUnitMemberHierarchy)(`clrTtItemsGetChildren`,r.getChildren),f(25),A(`clrCode`,r.htmlExampleEmptyPlaceholder),f(6),A(`clrCode`,r.htmlExampleEmptyPlaceholderContent),f(4),A(`clrCode`,r.htmlExampleEmptyPlaceholderWide),f(59),A(`clrTtHideableColumn`,PT(58,Ve)),f(2),A(`clrTtHideableColumn`,PT(59,Ve)),f(2),A(`clrTtHideableColumn`,PT(60,Ge)),f(51),A(`clrCode`,r.htmlExampleHideShow),f(122),A(`treetable`,r.treetable())(`treetableRef`,r.treetableRef()),f(),ri(`clrTtSelected`,r.selectedForExport),f(8),A(`clrTtItemsOf`,r.orgUnitMemberHierarchy)(`clrTtItemsGetChildren`,r.getChildren),f(2),A(`clrCode`,r.htmlExampleExport),f(),A(`clrCode`,r.tsExampleExport)}},dependencies:[O,j7,Np,Y4,T9,I9,E9,zp,k9,O$2,A3,lD,mz,Iz,ype,Mz,Dz,bpe,Ale,Rp,Bp,X7,N,$7,Op,Fp,Pp,K,_e,ie,Zn,Rhe,iA],encapsulation:2,changeDetection:1})}return a})();var xl=(()=>{class a{static ɵfac=function(m){return new(m||a)};static ɵmod=$({type:a});static ɵinj=B({imports:[K,_e,ie,Lp.forChild([{path:``,component:W}]),Zn,Rhe,W,N]})}return a})();export{xl as TreetableDemoModule};