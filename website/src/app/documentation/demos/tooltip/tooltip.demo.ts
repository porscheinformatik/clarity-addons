/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const FIT_CONTENT_EXAMPLE = `<clr-tooltip>
  <cds-icon clrTooltipTrigger shape="info-standard"></cds-icon>
  <clr-tooltip-content clrTooltipFitContent *clrIfOpen>
    Short tip
  </clr-tooltip-content>
</clr-tooltip>`;

const CONDITIONAL_EXAMPLE = `<clr-tooltip>
  <cds-icon clrTooltipTrigger shape="info-standard"></cds-icon>
  <clr-tooltip-content [clrTooltipFitContent]="isFitContent" *clrIfOpen>
    Tooltip text
  </clr-tooltip-content>
</clr-tooltip>`;

const WITHOUT_EXAMPLE = `<!-- Default Clarity tooltip — fixed width -->
<clr-tooltip>
  <cds-icon clrTooltipTrigger shape="info-standard"></cds-icon>
  <clr-tooltip-content *clrIfOpen>
    Short tip
  </clr-tooltip-content>
</clr-tooltip>`;

@Component({
  selector: 'clr-tooltip-demo',
  templateUrl: './tooltip.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class TooltipDemo extends ClarityDocComponent {
  fitContentExample = FIT_CONTENT_EXAMPLE;
  conditionalExample = CONDITIONAL_EXAMPLE;
  withoutExample = WITHOUT_EXAMPLE;

  isFitContent = true;

  constructor() {
    super('tooltip');
  }
}
