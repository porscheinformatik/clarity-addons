import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_BASIC = `
<cng-circle-progress-bar [progress]="[0.6]"></cng-circle-progress-bar>
`;

const HTML_NUMERIC_LABEL = `
<cng-circle-progress-bar
  style="--cng-circle-progress-bar-size: 160px"
  [progress]="[0.72]"
  [label]="0.72"
  [colors]="['var(--cds-alias-status-success)']">
</cng-circle-progress-bar>
`;

const HTML_STRING_LABEL = `
<cng-circle-progress-bar
  style="--cng-circle-progress-bar-size: 160px"
  [progress]="[0.35]"
  [label]="'Loading'"
  [colors]="['var(--cds-alias-status-info)']">
</cng-circle-progress-bar>
`;

const HTML_LAYERED = `
<cng-circle-progress-bar
  style="--cng-circle-progress-bar-size: 160px"
  [progress]="[0.75, 0.4, 0.2]"
  [label]="'Layered'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-info)', 'var(--cds-alias-status-warning)']">
</cng-circle-progress-bar>
`;

const HTML_CONCENTRIC = `
<cng-circle-progress-bar
  style="--cng-circle-progress-bar-size: 200px"
  [progress]="[0.75, 0.4, 0.2]"
  [label]="'Concentric'"
  [colors]="['var(--cds-alias-status-success)', 'var(--cds-alias-status-info)', 'var(--cds-alias-status-warning)']"
  [layoutStrategy]="'concentric'">
</cng-circle-progress-bar>
`;

const HTML_CYCLING_COLORS = `
<cng-circle-progress-bar
  style="--cng-circle-progress-bar-size: 200px"
  [progress]="[0.9, 0.7, 0.5, 0.3]"
  [colors]="['var(--cds-alias-status-info)', 'var(--cds-alias-status-success)']"
  [layoutStrategy]="'concentric'">
</cng-circle-progress-bar>
`;

const HTML_CUSTOM_BACKGROUND = `
<cng-circle-progress-bar
  style="--cng-circle-progress-bar-size: 160px"
  [progress]="[0.55]"
  [label]="0.55"
  [colors]="['var(--cds-alias-status-danger)']"
  [backgroundColorCircle]="'var(--cds-alias-status-danger-tint)'">
</cng-circle-progress-bar>
`;

const HTML_ZERO = `
<cng-circle-progress-bar
  style="--cng-circle-progress-bar-size: 160px"
  [progress]="[0]"
  [label]="0"
  [colors]="['var(--cds-alias-status-info)']">
</cng-circle-progress-bar>
`;

const HTML_FULL = `
<cng-circle-progress-bar
  style="--cng-circle-progress-bar-size: 160px"
  [progress]="[1.4]"
  [label]="1"
  [colors]="['var(--cds-alias-status-success)']">
</cng-circle-progress-bar>
`;

const HTML_SIZES = `
<cng-circle-progress-bar style="--cng-circle-progress-bar-size: 80px"  [progress]="[0.6]"></cng-circle-progress-bar>
<cng-circle-progress-bar style="--cng-circle-progress-bar-size: 140px" [progress]="[0.6]"></cng-circle-progress-bar>
<cng-circle-progress-bar style="--cng-circle-progress-bar-size: 220px" [progress]="[0.6]"></cng-circle-progress-bar>
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
