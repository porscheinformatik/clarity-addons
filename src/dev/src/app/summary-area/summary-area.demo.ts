import {
  ClrSummaryAreaError,
  ClrSummaryAreaLoading,
  ClrSummaryAreaWarning,
} from '../../../../clr-addons/summary-area/summary-area/summary-area.model';
import {
  ClrSummaryItemError,
  ClrSummaryItemLoading,
  ClrSummaryItemWarning,
} from '../../../../clr-addons/summary-area/summary-item/summary-item.model';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClrSummaryAreaComponent } from '../../../../clr-addons/summary-area/summary-area/summary-area.component';
import { ClrSummaryItemComponent } from '../../../../clr-addons/summary-area/summary-item/summary-item.component';
import { ClrSummaryItemValueComponent } from '../../../../clr-addons/summary-area/summary-item-value/summary-item-value.component';
import { ClrIconModule } from '@clr/angular';
import { barsIcon, chatBubbleIcon, ClarityIcons, colorPaletteIcon, pencilIcon, wandIcon } from '@cds/core/icon';
import { CustomAlert } from './custom-alert';

ClarityIcons.addIcons(pencilIcon, barsIcon, wandIcon, chatBubbleIcon, colorPaletteIcon);

@Component({
  selector: 'my-app-summary-area-demo',
  templateUrl: './summary-area.demo.html',
  imports: [ClrSummaryAreaComponent, ClrSummaryItemComponent, ClrSummaryItemValueComponent, ClrIconModule, CustomAlert],
})
export class SummaryAreaDemo implements OnInit {
  public summaryAreaErrorState: ClrSummaryAreaError = {
    active: false, // set to true to see the general error state of the summary area
    text: 'Critical error',
    linkText: 'Reload',
    click: () => {
      this.summaryAreaErrorState.active = false;
      alert('Handle error clicked!');
    },
  };
  public summaryAreaWarningState: ClrSummaryAreaWarning = {
    active: false, // set to true to see the general warning state of the summary area
    text: 'Check your data',
    linkText: 'Reload',
    click: () => {
      this.summaryAreaWarningState.active = false;
      alert('Handle warning clicked!');
    },
  };
  public summaryAreaLoadingState: ClrSummaryAreaLoading = { active: true };
  public itemLoadingState: ClrSummaryItemLoading = { active: true };
  public itemErrorState: ClrSummaryItemError = {
    active: false,
    text: 'Click to handle error',
    click: () => this.handleErrorClick(this.itemErrorState),
  };
  public itemWarningState: ClrSummaryItemWarning = {
    active: false,
    text: 'Click to handle warning',
    click: () => alert('Warning clicked!'),
  };
  public errorState: ClrSummaryAreaError = {
    active: false,
    text: 'Critical error',
    linkText: 'Reload',
    click: () => {
      this.errorState.active = false;
      alert('Handle error clicked!');
    },
  };

  public showCustomAlert = false;

  private readonly router: Router = inject(Router);

  public ngOnInit(): void {
    // Simulate loading
    setTimeout(() => {
      this.summaryAreaLoadingState = { ...this.summaryAreaLoadingState, active: false };
    }, 1000);

    setTimeout(() => {
      this.itemLoadingState = { ...this.itemLoadingState, active: false };
    }, 5000);
  }

  public handleCustomLogicValueClick(): void {
    alert('Custom logic for value click executed!');
  }

  public handleSummaryItemIconClick(): void {
    alert('Wuhu, you clicked the icon!');
  }

  public goToInternalRoute(): void {
    this.router.navigate(['/clarity']);
  }

  public handleErrorClick(errorState: ClrSummaryAreaError): void {
    this.itemErrorState = {
      ...errorState,
      active: false,
    };
    alert('An error occurred.');
  }

  public onEditClick = (): void => {
    alert('Edit clicked!');
  };

  public goToExternalApp(): void {
    globalThis.location.href = 'https://external-app.example.com';
  }

  public handleCustomLogic(): void {
    this.showCustomAlert = true;
  }

  public closeCustomAlert(): void {
    this.showCustomAlert = false;
  }
}
