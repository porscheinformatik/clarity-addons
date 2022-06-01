/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { LocationBarNode } from '@porscheinformatik/clr-addons';
import { DemoLocationBarNodeId } from './model';

@Component({
  selector: 'clr-location-bar-demo',
  templateUrl: './location-bar.demo.html',
})
export class LocationBarDemo implements OnInit {
  roots1: LocationBarNode<DemoLocationBarNodeId>[];
  roots2: LocationBarNode<DemoLocationBarNodeId>[];
  rootsLazy: LocationBarNode<DemoLocationBarNodeId>[];
  rootsLongTexts: LocationBarNode<DemoLocationBarNodeId>[];

  ngOnInit() {
    this.buildRoots1();
    this.buildRoots2();
    this.buildRootsLazy();
    this.buildRootsLongTexts();
  }

  private buildRoots1() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1'), 'L1');
    const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1'), 'L1.1');
    const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1.1'), 'L1.1.1');
    const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1.2'), 'L1.1.2');
    const l12 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.2'), 'L1.2');
    const l121 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.2.1'), 'L1.2.1');

    const l2 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l2'), 'L2');
    const l21 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l2.1'), 'L2.1');

    l12.setChildren([l121]);
    l11.setChildren([l111, l112]);
    l1.setChildren([l11, l12]);

    l2.setChildren([l21]);

    this.roots1 = [l1, l2];
  }

  private buildRoots2() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1'), 'L1', false, true);
    const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1'), 'L1.1', false, true);
    const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1.1'), 'L1.1.1');
    const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1.2'), 'L1.1.2');

    l11.setChildren([l111, l112]);
    l1.setChildren([l11]);

    this.roots2 = [l1];
  }

  private buildRootsLazy() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1'), 'L1');
    const lazy = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('lazy'), 'Lazy');

    l1.setChildren([lazy]);

    this.rootsLazy = [l1];
  }

  private buildRootsLongTexts() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(
      new DemoLocationBarNodeId('long1'),
      'L1 This is a pretty long text to show that we should also handle this case',
      false,
      true
    );
    const l11 = new LocationBarNode<DemoLocationBarNodeId>(
      new DemoLocationBarNodeId('long1.1'),
      'L1.1 This is another pretty long text to show that we should also handle this case'
    );
    const l12 = new LocationBarNode<DemoLocationBarNodeId>(
      new DemoLocationBarNodeId('long1.2'),
      'L1.2 This is another pretty long text to show that we should also handle this case'
    );
    const l112 = new LocationBarNode<DemoLocationBarNodeId>(
      new DemoLocationBarNodeId('long1.1.2'),
      'L1.1.2 This is a pretty long text to show that we should also handle this case'
    );

    l11.setChildren([l112]);
    l1.setChildren([l11, l12]);

    this.rootsLongTexts = [l1];
  }
}
