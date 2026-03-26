import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ClrDropdownModule, ClrIconModule } from '@clr/angular';
import { ChartExportService } from './chart-export.service';
import { ClarityIcons, downloadIcon } from '@cds/core/icon';

ClarityIcons.addIcons(downloadIcon);
@Component({
  selector: 'cng-chart-export-button',
  template: `
    <clr-dropdown>
      <button class="btn btn-sm btn-icon btn-link export-trigger" clrDropdownTrigger title="Export chart">
        <cds-icon shape="download" size="16"></cds-icon>
      </button>
      <clr-dropdown-menu *clrIfOpen clrPosition="bottom-left">
        <button clrDropdownItem (click)="export('svg')">SVG</button>
        <button clrDropdownItem (click)="export('png')">PNG</button>
      </clr-dropdown-menu>
    </clr-dropdown>
  `,
  styles: [
    `
      :host {
        position: absolute;
        bottom: -15px;
        left: -5px;
        z-index: 10;
        opacity: 1;
        pointer-events: auto;
      }
    `,
  ],
  imports: [ClrDropdownModule, ClrIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartExportButtonComponent {
  public readonly svgRef = input<SVGSVGElement | undefined>(undefined);
  public readonly filename = input<string>('chart');

  private readonly exportService = inject(ChartExportService);

  public export(format: 'svg' | 'png'): void {
    const svg = this.svgRef();
    if (!svg) {
      return;
    }
    switch (format) {
      case 'svg':
        this.exportService.exportSvg(svg, this.filename());
        break;
      case 'png':
        this.exportService.exportPng(svg, this.filename());
        break;
    }
  }
}
