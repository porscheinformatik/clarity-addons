/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, OnInit } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { ClarityIcons, checkIcon } from '@cds/core/icon';
import { share } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  CONTROL_ENTER_BASIC_EXAMPLE,
  CONTROL_ENTER_TRANSLATION_EXAMPLE,
  FOCUS_FIRST_INVALID_EXAMPLE,
} from './keyboard-operation-examples.demo';

ClarityIcons.addIcons(checkIcon);

export interface TableOfContentsEntry {
  id: string;
  label: string;
  children?: TableOfContentsEntry[];
}

@Component({
  selector: 'clr-keyboard-operation-demo',
  templateUrl: './keyboard-operation.demo.html',
  styleUrls: ['./keyboard-operation.demo.scss'],
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class KeyboardOperationDemo extends ClarityDocComponent implements OnInit {
  focusFirstInvalidExample = FOCUS_FIRST_INVALID_EXAMPLE;
  controlEnterBasicExample = CONTROL_ENTER_BASIC_EXAMPLE;
  controlEnterTranslationExample = CONTROL_ENTER_TRANSLATION_EXAMPLE;

  private headingSelector = 'h2[id],h3[id]';

  // Form 1 demo fields
  inputField: string;
  textAreaField: string;
  selectField: string;

  // Form 2 demo fields
  form1FirstName: string;
  form1LastName: string;

  // Form 3 demo fields
  form2Email: string;
  form2Phone: string;

  // Control Enter fields
  ctrlEnterModel: string;
  ctrlEnterForm1: string;
  ctrlEnterForm2: string;
  ctrlEnterSubmitted = false;
  ctrlEnterLastSubmitTime: string;
  ctrlEnterForm1Submitted = false;
  ctrlEnterForm2Submitted = false;
  protected activeFragment;
  tableOfContents;
  constructor(public route: ActivatedRoute, private elementRef: ElementRef) {
    super('keyboard-operation');
    const activeFragment = this.route.fragment.pipe(share());
    this.activeFragment = activeFragment;
  }
  ngOnInit(): void {
    const headingElements = Array.from(
      this.elementRef.nativeElement.querySelectorAll(this.headingSelector)
    ) as HTMLHeadingElement[];
    this.tableOfContents = this.getTableOfContents(headingElements);
  }

  getTableOfContents(headingElements: HTMLHeadingElement[]) {
    const flatEntries = headingElements.map(headingElement => ({
      id: headingElement.id,
      label: headingElement.innerText,
      tagName: headingElement.tagName,
    }));
    const entries: TableOfContentsEntry[] = [];

    for (const entry of flatEntries) {
      switch (entry.tagName) {
        case 'H2':
          entries.push({
            id: entry.id,
            label: entry.label,
            children: [],
          });
          break;
        case 'H3':
          entries[entries.length - 1]?.children?.push({
            id: entry.id,
            label: entry.label,
          });
          break;
      }
    }

    return entries;
  }

  onSubmit() {
    console.log('Form submitted');
  }

  onSubmitForm1() {
    console.log('Form 1 submitted');
  }

  onSubmitForm2() {
    console.log('Form 2 submitted');
  }

  onCtrlEnterSubmit() {
    console.log('Form  submitted');
    this.ctrlEnterSubmitted = true;
    this.ctrlEnterLastSubmitTime = new Date().toLocaleTimeString();
    setTimeout(() => (this.ctrlEnterSubmitted = false), 2000);
  }

  onCtrlEnterForm1Submit() {
    console.log('Form 1 submitted');
    this.ctrlEnterForm1Submitted = true;
    setTimeout(() => (this.ctrlEnterForm1Submitted = false), 2000);
  }

  onCtrlEnterForm2Submit() {
    console.log('Form 2 submitted');
    this.ctrlEnterForm2Submitted = true;
    setTimeout(() => (this.ctrlEnterForm2Submitted = false), 2000);
  }
}
