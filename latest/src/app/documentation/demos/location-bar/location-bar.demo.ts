/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from "@angular/core";
import { LocationBarNode } from "@porscheinformatik/clr-addons";
import { ClarityDocComponent } from "../clarity-doc";
import { DemoLocationBarNodeId } from "./model";

const STANDARD_EXAMPLE = `
<clr-location-bar [clrRoots]="roots1"></clr-location-bar>
`;

const STANDARD_TS_EXAMPLE = `
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
`;

const PRE_EXAMPLE = `
<clr-location-bar [clrRoots]="roots2"></clr-location-bar>
`;

const PRE_TS_EXAMPLE = `
private buildRoots2() {
  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1", false, true);
  const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1"), "L1.1", true, true);
  const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.1"), "L1.1.1");
  const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.2"), "L1.1.2");

  l11.setChildren([l111, l112]);
  l1.setChildren([l11]);

  this.roots2 = [l1];
}
`;

const LAZY_EXAMPLE = `
<clr-location-bar [clrRoots]="rootsLazy"></clr-location-bar>
`;

const LAZY_TS_EXAMPLE = `
private buildRootsLazy() {
  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1");
  const lazy = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("lazy"), "Not lazy");

  l1.setChildren([lazy]);

  this.rootsLazy = [l1];
}
`;

const LAZY_CONTENT_PROVIDER = `
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
`;

const LAZY_PROVIDER_MODULE = `
@NgModule({
  ...
  providers: [{ provide: CONTENT_PROVIDER, useExisting: DemoLocationBarContentProvider }]
})
export class LocationBarDemoModule {}
`

@Component({
  selector: "clr-location-bar-demo",
  templateUrl: "./location-bar.demo.html",
  host: {
      "[class.content-area]": "true",
      "[class.dox-content-panel]": "true"
  }
})
export class LocationBarDemo extends ClarityDocComponent implements OnInit {
  standardExample = STANDARD_EXAMPLE;
  standardTSExample = STANDARD_TS_EXAMPLE;
  preExample = PRE_EXAMPLE;
  preTSExample = PRE_TS_EXAMPLE;
  lazyExample = LAZY_EXAMPLE;
  lazyTSExample = LAZY_TS_EXAMPLE;
  lazyContentProvider = LAZY_CONTENT_PROVIDER;
  lazyProviderModule = LAZY_PROVIDER_MODULE;

  roots1: LocationBarNode<DemoLocationBarNodeId>[];
  roots2: LocationBarNode<DemoLocationBarNodeId>[];
  rootsLazy: LocationBarNode<DemoLocationBarNodeId>[];

  constructor() {
    super("location-bar");
  }

  ngOnInit() {
    this.buildRoots1();
    this.buildRoots2();
    this.buildRootsLazy();
  }

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

  private buildRoots2() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1", false, true);
    const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1"), "L1.1", true, true);
    const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.1"), "L1.1.1");
    const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.2"), "L1.1.2");

    l11.setChildren([l111, l112]);
    l1.setChildren([l11]);

    this.roots2 = [l1];
  }

  private buildRootsLazy() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1");
    const lazy = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("lazy"), "Not lazy");

    l1.setChildren([lazy]);

    this.rootsLazy = [l1];
  }
}
