/*
 * Copyright (c) 2016 - 2017 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CodeHighlight } from './code-highlight';
import { ClarityIcons, copyIcon } from '@cds/core/icon';

ClarityIcons.addIcons(copyIcon);

@Component({
  selector: 'clr-code-snippet',
  template: `
    <ng-container *ngIf="!disablePrism">
      <pre><code [clr-code-highlight]="'language-'+language">{{ code.trim() }}</code></pre>
    </ng-container>
    <ng-container *ngIf="disablePrism">
      <pre><code class="clr-code">{{ code.trim() }}</code></pre>
    </ng-container>
    <div class="code-addons">
      <button (click)="copyToClipboard()" class="btn btn-link">
        <cds-icon shape="copy"></cds-icon>
        {{ buttonText }}
      </button>
    </div>
  `,
  standalone: false,
})
export class CodeSnippet implements AfterViewInit {
  @ViewChild(CodeHighlight) codeHighlight: CodeHighlight;

  @Input('clrCode') public code: string;
  @Input('clrLanguage') public language: string = 'html';
  @Input('clrDisablePrism') public disablePrism: boolean = false;
  public buttonText: string = 'copy code';

  ngAfterViewInit(): void {
    if (this.codeHighlight) {
      this.codeHighlight.redraw();
    }
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.code.trim()).then(
      () => {
        this.buttonText = 'Copied!';
        setTimeout(() => (this.buttonText = 'copy code'), 2000);
      },
      err => {
        console.error('Failed to copy code: ', err);
      }
    );
  }
}
