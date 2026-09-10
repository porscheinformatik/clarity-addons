import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_BASIC = `
<clr-circle-progress-bar [progress]="[0.6]"></clr-circle-progress-bar>
`;

const HTML_NUMERIC_LABEL = `
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0.72]"
  [label]="0.72"
  [colors]="['var(--cds-alias-status-success)']">
</clr-circle-progress-bar>
`;

const HTML_STRING_LABEL = `
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0.35]"
  [label]="'Loading'"
  [colors]="['var(--cds-alias-status-info)']">
</clr-circle-progress-bar>
`;

const HTML_LAYERED = `
<clr-circle-progress-bar
  style="width: 180px; height: 180px"
  [progress]="[0.75, 0.4, 0.2]"
  [label]="'Layered'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-info)', 'var(--cds-alias-status-warning)']">
</clr-circle-progress-bar>
`;

const HTML_CONCENTRIC = `
<clr-circle-progress-bar
  style="width: 200px; height: 200px"
  [progress]="[0.75, 0.4, 0.2]"
  [label]="'Concentric'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-info)', 'var(--cds-alias-status-warning)']"
  [layoutStrategy]="'concentric'">
</clr-circle-progress-bar>
`;

const HTML_CYCLING_COLORS = `
<clr-circle-progress-bar
  style="width: 200px; height: 200px"
  [progress]="[0.9, 0.7, 0.5, 0.3]"
  [colors]="['var(--cds-alias-status-info)', 'var(--cds-alias-status-success)']"
  [layoutStrategy]="'concentric'">
</clr-circle-progress-bar>
`;

const HTML_CUSTOM_BACKGROUND = `
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0.55]"
  [label]="0.55"
  [colors]="['var(--cds-alias-status-danger)']"
  [backgroundColorCircle]="'var(--cds-alias-status-danger-tint)'">
</clr-circle-progress-bar>
`;

const HTML_ZERO = `
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[0]"
  [label]="0"
  [colors]="['var(--cds-alias-status-info)']">
</clr-circle-progress-bar>
`;

const HTML_FULL = `
<clr-circle-progress-bar
  style="width: 160px; height: 160px"
  [progress]="[1.4]"
  [label]="1"
  [colors]="['var(--cds-alias-status-success)']">
</clr-circle-progress-bar>
`;

const HTML_SIZES = `
<clr-circle-progress-bar style="width: 80px; height: 80px"  [progress]="[0.6]"></clr-circle-progress-bar>
<clr-circle-progress-bar style="width: 140px; height: 140px" [progress]="[0.6]"></clr-circle-progress-bar>
<clr-circle-progress-bar style="width: 220px; height: 220px" [progress]="[0.6]"></clr-circle-progress-bar>
`;

@Component({
  selector: 'clr-progress-circle-demo',
  templateUrl: './progress-circle.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class ProgressCircleDemo extends ClarityDocComponent {
  htmlBasic = HTML_BASIC;
  htmlNumericLabel = HTML_NUMERIC_LABEL;
  htmlStringLabel = HTML_STRING_LABEL;
  htmlLayered = HTML_LAYERED;
  htmlConcentric = HTML_CONCENTRIC;
  htmlCyclingColors = HTML_CYCLING_COLORS;
  htmlCustomBackground = HTML_CUSTOM_BACKGROUND;
  htmlZero = HTML_ZERO;
  htmlFull = HTML_FULL;
  htmlSizes = HTML_SIZES;

  constructor() {
    super('progress-circle');
  }
}
