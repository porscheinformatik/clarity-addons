/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';
import {
  bellIcon,
  blocksGroupIcon,
  boltIcon,
  calendarIcon,
  circleIcon,
  ClarityIcons,
  ClarityModule,
  clockIcon,
  ClrCommonFormsModule,
  ClrIcon,
  ClrIfActive,
  ClrTabsModule,
  ClrVerticalNavModule,
  cogIcon,
  flagIcon,
  folderIcon,
  fuelIcon,
  heartIcon,
  homeIcon,
  inboxIcon,
  mapIcon,
  searchIcon,
  shieldIcon,
  starIcon,
  terminalIcon,
  userIcon,
  wrenchIcon,
} from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { share } from 'rxjs';
import { ClarityDocComponent } from '../clarity-doc';
import {
  ALT_MNEMONIC_BASIC_EXAMPLE,
  COMBINED_EXAMPLE,
  CTRL_ARROW_BASIC_EXAMPLE,
  IMPORT_EXAMPLE,
} from './keyboard-nav-examples.demo';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { CodeSnippet } from '../../../utils/code-snippet';
import {
  ClrKeyboardNavCtrlArrowDirective,
  ClrKeyboardNavAltMnemonicDirective,
  ClrAddonsLabel,
  ClrAutocompleteOff,
} from '@porscheinformatik/clr-addons';
import { FormsModule } from '@angular/forms';

ClarityIcons.addIcons(
  homeIcon,
  cogIcon,
  userIcon,
  searchIcon,
  folderIcon,
  bellIcon,
  starIcon,
  heartIcon,
  boltIcon,
  flagIcon,
  calendarIcon,
  mapIcon,
  terminalIcon,
  shieldIcon,
  clockIcon,
  wrenchIcon,
  blocksGroupIcon,
  inboxIcon,
  circleIcon,
  fuelIcon
);

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
  imports: [
    DocWrapper,
    NgTemplateOutlet,
    CodeSnippet,
    ClrTabsModule,
    ClrKeyboardNavCtrlArrowDirective,
    ClrIcon,
    ClrIfActive,
    ClrKeyboardNavAltMnemonicDirective,
    ClrVerticalNavModule,
    ClrCommonFormsModule,
    ClrAddonsLabel,
    ClrAutocompleteOff,
    FormsModule,
    RouterLink,
    CommonModule,
    ClarityModule,
    UtilsModule,
    DocWrapperModule,
    AsyncPipe,
  ],
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

  constructor(
    public route: ActivatedRoute,
    private elementRef: ElementRef
  ) {
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
