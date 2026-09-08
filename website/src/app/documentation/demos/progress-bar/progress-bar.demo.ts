import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_BASIC = `
<cng-progress-bar [progress]="[0.6]"></clr-progress-bar>
`;

const HTML_NUMERIC_LABEL = `
<cng-progress-bar
  style="--cng-progress-bar-width: 240px; --cng-progress-bar-height: 14px"
  [progress]="[0.72]"
  [label]="0.72"
  [colors]="['var(--cds-alias-status-success)']">
</clr-progress-bar>
`;

const HTML_STRING_LABEL = `
<cng-progress-bar
style="--cng-progress-bar-width: 240px; --cng-progress-bar-height: 14px"
  [progress]="[0.35]"
  [label]="'Uploading…'"
  [colors]="['var(--cds-alias-status-info)']">
</clr-progress-bar>
`;

const HTML_STACKED = `
<cng-progress-bar
style="--cng-progress-bar-width: 280px; --cng-progress-bar-height: 18px"
  [progress]="[0.45, 0.2, 0.15]"
  [label]="'3 / 5 tasks'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-warning)', 'var(--cds-alias-status-danger)']">
</clr-progress-bar>
`;

const HTML_MULTILINE = `
<cng-progress-bar
style="--cng-progress-bar-width: 280px; --cng-progress-bar-height: 12px"
  [progress]="[0.33, 0.5, 0.8]"
  [label]="'Progress overview'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-info)', 'var(--cds-alias-status-warning)']"
  [layoutStrategy]="'horizontal-multiline'">
</clr-progress-bar>
`;

const HTML_CYCLING_COLORS = `
<cng-progress-bar
style="--cng-progress-bar-width: 280px; --cng-progress-bar-height: 16px"
  [progress]="[0.2, 0.2, 0.2, 0.2]"
  [colors]="['var(--cds-alias-status-info)', 'var(--cds-alias-status-success)']">
</clr-progress-bar>
`;

const HTML_CUSTOM_BACKGROUND = `
<cng-progress-bar
style="--cng-progress-bar-width: 280px; --cng-progress-bar-height: 14px"
  [progress]="[0.55]"
  [label]="0.55"
  [colors]="['var(--cds-alias-status-danger)']"
  [backgroundColor]="'var(--cds-alias-status-danger-tint)'">
</clr-progress-bar>
`;

const HTML_CUSTOM_FONT = `
<cng-progress-bar
style="--cng-progress-bar-width: 280px; --cng-progress-bar-height: 16px"
  [progress]="[0.8]"
  [label]="0.8"
  [colors]="['var(--cds-alias-status-success)']"
  [fontSize]="18"
  [labelColor]="'var(--cds-alias-status-success-shade)'">
</clr-progress-bar>
`;

const HTML_ZERO = `
<cng-progress-bar
style="--cng-progress-bar-width: 240px; --cng-progress-bar-height: 14px"
  [progress]="[0]"
  [label]="0"
  [colors]="['var(--cds-alias-status-info)']">
</clr-progress-bar>
`;

const HTML_FULL = `
<cng-progress-bar
style="--cng-progress-bar-width: 240px; --cng-progress-bar-height: 14px"
  [progress]="[1.4]"
  [label]="1"
  [colors]="['var(--cds-alias-status-success)']">
</clr-progress-bar>
`;

const HTML_SIZES = `
<cng-progress-bar style="--cng-progress-bar-width: 120px; --cng-progress-bar-height: 6px"  [progress]="[0.6]"></clr-progress-bar>
<cng-progress-bar style="--cng-progress-bar-width: 240px; --cng-progress-bar-height: 12px" [progress]="[0.6]"></clr-progress-bar>
<cng-progress-bar style="--cng-progress-bar-width: 360px; --cng-progress-bar-height: 20px" [progress]="[0.6]"></clr-progress-bar>
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
