import { Component } from '@angular/core';
import { ClarityIcons, downloadIcon } from '@cds/core/icon';
import {
  logoCommissionModuleFavIcon,
  logoCommissionModuleIcon,
  logoCommissionModuleNegativeFavIcon,
  logoCommissionModuleNegativeIcon,
  logoCostApprovalFavIcon,
  logoCostApprovalIcon,
  logoCostApprovalNegativeFavIcon,
  logoCostApprovalNegativeIcon,
  logoCrossControllingFavIcon,
  logoCrossControllingIcon,
  logoCrossControllingNegativeFavIcon,
  logoCrossControllingNegativeIcon,
  logoDigitalServiceReceptionFavIcon,
  logoDigitalServiceReceptionIcon,
  logoDigitalServiceReceptionNegativeFavIcon,
  logoDigitalServiceReceptionNegativeIcon,
  logoDocFlowFavIcon,
  logoDocFlowIcon,
  logoDocFlowNegativeFavIcon,
  logoDocFlowNegativeIcon,
  logoDocScanFavIcon,
  logoDocScanIcon,
  logoDocScanNegativeFavIcon,
  logoDocScanNegativeIcon,
  logoDocStoreFavIcon,
  logoDocStoreIcon,
  logoDocStoreNegativeFavIcon,
  logoDocStoreNegativeIcon,
  logoEBillingFavIcon,
  logoEBillingIcon,
  logoEBillingNegativeFavIcon,
  logoEBillingNegativeIcon,
  logoEPaymentFavIcon,
  logoEPaymentIcon,
  logoEPaymentNegativeFavIcon,
  logoEPaymentNegativeIcon,
  logoMobilityPlannerFavIcon,
  logoMobilityPlannerIcon,
  logoMobilityPlannerNegativeFavIcon,
  logoMobilityPlannerNegativeIcon,
  logoPartsMobileFavIcon,
  logoPartsMobileIcon,
  logoPartsMobileNegativeFavIcon,
  logoPartsMobileNegativeIcon,
  logoSBOFavIcon,
  logoSBOIcon,
  logoSBONegativeFavIcon,
  logoSBONegativeIcon,
  logoServiceCubeFavIcon,
  logoServiceCubeIcon,
  logoServiceCubeNegativeFavIcon,
  logoServiceCubeNegativeIcon,
  logoWCPFavIcon,
  logoWCPIcon,
  logoWCPNegativeFavIcon,
  logoWCPNegativeIcon,
  logoWorkshopOrderTrackerFavIcon,
  logoWorkshopOrderTrackerIcon,
  logoWorkshopOrderTrackerNegativeFavIcon,
  logoWorkshopOrderTrackerNegativeIcon,
} from '@porscheinformatik/clr-addons';
import { debounceTime, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'clr-icons-logos',
  templateUrl: './icons-logos.component.html',
  styleUrl: 'icons-logos.component.scss',
  standalone: false,
})
export class IconsLogosComponent {
  icons = [
    logoCommissionModuleIcon,
    logoCommissionModuleNegativeIcon,
    logoCommissionModuleFavIcon,
    logoCommissionModuleNegativeFavIcon,
    logoCostApprovalIcon,
    logoCostApprovalNegativeIcon,
    logoCostApprovalFavIcon,
    logoCostApprovalNegativeFavIcon,
    logoCrossControllingIcon,
    logoCrossControllingNegativeIcon,
    logoCrossControllingFavIcon,
    logoCrossControllingNegativeFavIcon,
    logoDocFlowIcon,
    logoDocFlowNegativeIcon,
    logoDocFlowFavIcon,
    logoDocFlowNegativeFavIcon,
    logoDocScanIcon,
    logoDocScanNegativeIcon,
    logoDocScanFavIcon,
    logoDocScanNegativeFavIcon,
    logoDocStoreIcon,
    logoDocStoreNegativeIcon,
    logoDocStoreFavIcon,
    logoDocStoreNegativeFavIcon,
    logoEBillingIcon,
    logoEBillingNegativeIcon,
    logoEBillingFavIcon,
    logoEBillingNegativeFavIcon,
    logoEPaymentIcon,
    logoEPaymentNegativeIcon,
    logoEPaymentFavIcon,
    logoEPaymentNegativeFavIcon,
    logoMobilityPlannerIcon,
    logoMobilityPlannerNegativeIcon,
    logoMobilityPlannerFavIcon,
    logoMobilityPlannerNegativeFavIcon,
    logoDigitalServiceReceptionIcon,
    logoDigitalServiceReceptionNegativeIcon,
    logoDigitalServiceReceptionFavIcon,
    logoDigitalServiceReceptionNegativeFavIcon,
    logoPartsMobileIcon,
    logoPartsMobileNegativeIcon,
    logoPartsMobileFavIcon,
    logoPartsMobileNegativeFavIcon,
    logoSBOIcon,
    logoSBONegativeIcon,
    logoSBOFavIcon,
    logoSBONegativeFavIcon,
    logoServiceCubeIcon,
    logoServiceCubeNegativeIcon,
    logoServiceCubeFavIcon,
    logoServiceCubeNegativeFavIcon,
    logoWCPIcon,
    logoWCPNegativeIcon,
    logoWCPFavIcon,
    logoWCPNegativeFavIcon,
    logoWorkshopOrderTrackerIcon,
    logoWorkshopOrderTrackerNegativeIcon,
    logoWorkshopOrderTrackerFavIcon,
    logoWorkshopOrderTrackerNegativeFavIcon,
  ];
  shapes: string[] = this.icons.map(item => item[0]).sort();

  private searched$ = new Subject<string>();
  destroy$ = new Subject<void>();
  selectedShape = '';

  constructor() {
    ClarityIcons.addIcons(...this.icons, downloadIcon);
  }

  ngOnInit() {
    this.searched$
      .pipe(takeUntil(this.destroy$))
      .pipe(debounceTime(400))
      .subscribe((searchText: string) => {
        this.filterEntries(searchText.toLowerCase());
      });
  }

  filterEntries(searchText: string) {
    this.shapes = this.icons
      .map(item => item[0])
      .filter(entry => this.matchSearch(entry, searchText))
      .sort();
  }

  matchSearch(entry: string, searchText: string): boolean {
    return entry.toLocaleLowerCase().includes(searchText);
  }

  changeSearchText(searchText): void {
    this.searched$.next(searchText);
  }

  download(filename: string) {
    let svgData = this.icons.find(item => (item[0] as string) === filename);
    const data = this.encode(String(svgData[1]));

    const blob = new Blob([data]);

    this.saveBlob(blob, filename + '.svg');
  }

  private saveBlob(blob: Blob, filename: string) {
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', blobUrl);
    link.setAttribute('download', filename);
    const event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
    link.dispatchEvent(event);

    URL.revokeObjectURL(blobUrl);
  }

  private encode(s: string): Uint8Array {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(s);
  }

  getCode() {
    return '<cds-icon shape="' + this.selectedShape + '"></cds-icon>';
  }
}
