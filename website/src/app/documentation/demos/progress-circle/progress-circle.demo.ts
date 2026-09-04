import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_BASIC = `
<cng-circle-progress-bar [progress]="[0.6]"></cng-circle-progress-bar>
`;

const HTML_NUMERIC_LABEL = `
<cng-circle-progress-bar
  [size]="160"
  [progress]="[0.72]"
  [label]="0.72"
  [colors]="['#4caf50']">
</cng-circle-progress-bar>
`;

const HTML_STRING_LABEL = `
<cng-circle-progress-bar
  [size]="160"
  [progress]="[0.35]"
  [label]="'Loading'"
  [colors]="['#1976d2']">
</cng-circle-progress-bar>
`;

const HTML_LAYERED = `
<cng-circle-progress-bar
  [size]="180"
  [progress]="[0.75, 0.4, 0.2]"
  [label]="'Layered'"
  [colors]="['#4caf50', '#2196f3', '#ff9800']">
</cng-circle-progress-bar>
`;

const HTML_CONCENTRIC = `
<cng-circle-progress-bar
  [size]="200"
  [progress]="[0.75, 0.4, 0.2]"
  [label]="'Concentric'"
  [colors]="['#4caf50', '#2196f3', '#ff9800']"
  [layoutStrategy]="'concentric'">
</cng-circle-progress-bar>
`;

const HTML_CYCLING_COLORS = `
<cng-circle-progress-bar
  [size]="200"
  [progress]="[0.9, 0.7, 0.5, 0.3]"
  [colors]="['#1976d2', '#4caf50']"
  [layoutStrategy]="'concentric'">
</cng-circle-progress-bar>
`;

const HTML_CUSTOM_BACKGROUND = `
<cng-circle-progress-bar
  [size]="160"
  [progress]="[0.55]"
  [label]="0.55"
  [colors]="['#f44336']"
  [backgroundColorCircle]="'#ffe0e0'">
</cng-circle-progress-bar>
`;

const HTML_ZERO = `
<cng-circle-progress-bar
  [size]="160"
  [progress]="[0]"
  [label]="0"
  [colors]="['#1976d2']">
</cng-circle-progress-bar>
`;

const HTML_FULL = `
<cng-circle-progress-bar
  [size]="160"
  [progress]="[1.4]"
  [label]="1"
  [colors]="['#4caf50']">
</cng-circle-progress-bar>
`;

const HTML_SIZES = `
<cng-circle-progress-bar [size]="80"  [progress]="[0.6]"></cng-circle-progress-bar>
<cng-circle-progress-bar [size]="140" [progress]="[0.6]"></cng-circle-progress-bar>
<cng-circle-progress-bar [size]="220" [progress]="[0.6]"></cng-circle-progress-bar>
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
