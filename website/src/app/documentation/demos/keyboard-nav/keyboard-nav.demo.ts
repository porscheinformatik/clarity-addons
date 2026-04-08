/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { share } from 'rxjs';
import { ClarityDocComponent } from '../clarity-doc';
import { ClarityIcons, homeIcon, cogIcon, userIcon, searchIcon, folderIcon, bellIcon } from '@cds/core/icon';
import {
  CTRL_ARROW_BASIC_EXAMPLE,
  ALT_MNEMONIC_BASIC_EXAMPLE,
  COMBINED_EXAMPLE,
  IMPORT_EXAMPLE,
} from './keyboard-nav-examples.demo';

ClarityIcons.addIcons(homeIcon, cogIcon, userIcon, searchIcon, folderIcon, bellIcon);

export interface TocEntry {
  id: string;
  label: string;
  children?: TocEntry[];
}

@Component({
  selector: 'clr-keyboard-nav-demo',
  templateUrl: './keyboard-nav.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class KeyboardNavDemo extends ClarityDocComponent implements OnInit {
  ctrlArrowExample = CTRL_ARROW_BASIC_EXAMPLE;
  altMnemonicExample = ALT_MNEMONIC_BASIC_EXAMPLE;
  combinedExample = COMBINED_EXAMPLE;
  importExample = IMPORT_EXAMPLE;

  overlayActive = false;
  activeVerticalNavItem = 'Home';

  protected activeFragment;
  tableOfContents: TocEntry[] = [];

  private headingSelector = 'h2[id],h3[id]';

  constructor(public route: ActivatedRoute, private elementRef: ElementRef) {
    super('keyboard-nav');
    this.activeFragment = this.route.fragment.pipe(share());
  }

  ngOnInit(): void {
    const headings = Array.from(
      this.elementRef.nativeElement.querySelectorAll(this.headingSelector)
    ) as HTMLHeadingElement[];
    this.tableOfContents = this.buildToc(headings);
  }

  private buildToc(headings: HTMLHeadingElement[]): TocEntry[] {
    const entries: TocEntry[] = [];
    for (const h of headings) {
      if (h.tagName === 'H2') {
        entries.push({ id: h.id, label: h.innerText, children: [] });
      } else if (h.tagName === 'H3' && entries.length) {
        entries[entries.length - 1].children!.push({ id: h.id, label: h.innerText });
      }
    }
    return entries;
  }
}
