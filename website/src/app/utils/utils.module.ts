import { NgModule } from '@angular/core';

import { HashListener } from './hash-listener.directive';
import { ScrollSpy } from './scrollspy.directive';
import { ClarityModule } from '@clr/angular';
import { CodeSnippet } from './code-snippet';
import { CommonModule } from '@angular/common';
import { CodeHighlight } from './code-highlight';

@NgModule({
  imports: [CommonModule, ClarityModule],
  declarations: [HashListener, ScrollSpy, CodeSnippet, CodeHighlight],
  exports: [HashListener, ScrollSpy, CodeSnippet],
})
export class UtilsModule {}
