import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_BASIC = `
<clr-multi-progress-bar [progress]="[0.6]"></clr-multi-progress-bar>
`;

const HTML_NUMERIC_LABEL = `
<clr-multi-progress-bar
  style="width: 240px; height: 14px"
  [progress]="[0.72]"
  [label]="0.72"
  [colors]="['var(--cds-alias-status-success)']">
</clr-multi-progress-bar>
`;

const HTML_STRING_LABEL = `
<clr-multi-progress-bar
style="width: 350px; height: 20px"
  [progress]="[0.99]"
  [label]="'Uploading…'"
  [colors]="['var(--cds-alias-status-info)']">
</clr-multi-progress-bar>
`;

const HTML_STACKED = `
<clr-multi-progress-bar
style="width: 400px; height: 35px"
  [progress]="[0.45, 0.2, 0.15]"
  [label]="'3 / 5 tasks'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-warning)', 'var(--cds-alias-status-danger)']">
</clr-multi-progress-bar>
`;

const HTML_MULTILINE = `
<clr-multi-progress-bar
style="width: 280px; height: 60px"
  [progress]="[0.33, 0.5, 0.8]"
  [label]="'Progress overview'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-info)', 'var(--cds-alias-status-warning)']"
  [layoutStrategy]="'horizontal-multiline'">
</clr-multi-progress-bar>
`;

const HTML_CYCLING_COLORS = `
<clr-multi-progress-bar
style="width: 280px; height: 16px"
  [progress]="[0.2, 0.2, 0.2, 0.2]"
  [colors]="['var(--cds-alias-status-info)', 'var(--cds-alias-status-success)']">
</clr-multi-progress-bar>
`;

const HTML_CUSTOM_BACKGROUND = `
<clr-multi-progress-bar
style="width: 280px; height: 16px"
  [progress]="[0.55]"
  [label]="0.55"
  [colors]="['var(--cds-alias-status-danger)']"
  [backgroundColor]="'var(--cds-alias-status-danger-tint)'">
</clr-multi-progress-bar>
`;

const HTML_CUSTOM_FONT = `
<clr-multi-progress-bar
style="width: 280px; height: 16px"
  [progress]="[0.8]"
  [label]="0.8"
  [colors]="['var(--cds-alias-status-success)']"
  [fontSize]="18"
  [labelColor]="'var(--cds-alias-status-success-shade)'">
</clr-multi-progress-bar>
`;

const HTML_ZERO = `
<clr-multi-progress-bar
style="width: 240px; height: 14px"
  [progress]="[0]"
  [label]="0"
  [colors]="['var(--cds-alias-status-info)']">
</clr-multi-progress-bar>
`;

const HTML_FULL = `
<clr-multi-progress-bar
style="width: 240px; height: 14px"
  [progress]="[1.4]"
  [label]="1"
  [colors]="['var(--cds-alias-status-success)']">
</clr-multi-progress-bar>
`;

const HTML_SIZES = `
<clr-multi-progress-bar style="width: 120px; height: 6px"  [progress]="[0.6]"></clr-multi-progress-bar>
<clr-multi-progress-bar style="width: 240px; height: 12px" [progress]="[0.6]"></clr-multi-progress-bar>
<clr-multi-progress-bar style="width: 360px; height: 20px" [progress]="[0.6]"></clr-multi-progress-bar>
`;

@Component({
  selector: 'clr-progress-bar-demo',
  templateUrl: './progress-bar.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class ProgressBarDemo extends ClarityDocComponent {
  htmlBasic = HTML_BASIC;
  htmlNumericLabel = HTML_NUMERIC_LABEL;
  htmlStringLabel = HTML_STRING_LABEL;
  htmlStacked = HTML_STACKED;
  htmlMultiline = HTML_MULTILINE;
  htmlCyclingColors = HTML_CYCLING_COLORS;
  htmlCustomBackground = HTML_CUSTOM_BACKGROUND;
  htmlCustomFont = HTML_CUSTOM_FONT;
  htmlZero = HTML_ZERO;
  htmlFull = HTML_FULL;
  htmlSizes = HTML_SIZES;

  constructor() {
    super('progress-bar');
  }
}
