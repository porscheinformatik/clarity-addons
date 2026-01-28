/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  ClrSummaryArea,
  ClrSummaryItem,
  ClrSummaryItemValue,
  ClrSummaryAreaError,
  ClrSummaryAreaLoading,
  ClrSummaryAreaWarning,
  ClrSummaryItemError,
  ClrSummaryItemLoading,
  ClrSummaryItemWarning,
  gasIcon,
} from '@porscheinformatik/clr-addons';
import { ClrIconModule, ClrModalModule } from '@clr/angular';
import {
  barsIcon,
  chatBubbleIcon,
  ClarityIcons,
  colorPaletteIcon,
  infoStandardIcon,
  pencilIcon,
  popOutIcon,
  wandIcon,
} from '@cds/core/icon';
import { ProgressItemComponent } from './progress-item/progress-item.component';

ClarityIcons.addIcons(
  pencilIcon,
  barsIcon,
  wandIcon,
  chatBubbleIcon,
  colorPaletteIcon,
  popOutIcon,
  gasIcon,
  infoStandardIcon
);

@Component({
  selector: 'my-app-summary-area-demo',
  templateUrl: './summary-area.demo.html',
  imports: [ClrSummaryArea, ClrSummaryItem, ClrSummaryItemValue, ClrIconModule, ProgressItemComponent, ClrModalModule],
})
export class SummaryAreaDemo implements OnInit {
  public showProgressDetails = false;

  public summaryAreaErrorState: ClrSummaryAreaError = {
    active: signal(false), // set to true to see the general error state of the summary area
    text: 'Critical error',
    linkText: 'Click here to resolve',
    click: () => this.handleAreaErrorClick(),
  };
  public summaryAreaWarningState: ClrSummaryAreaWarning = {
    active: signal(true), // set to true to see the general warning state of the summary area
    text: 'Check your data',
    linkText: 'Reload',
    click: () => this.handleAreaWarningClick(),
  };
  public summaryAreaLoadingState: ClrSummaryAreaLoading = { active: false, text: 'Loading...' };
  public itemLoadingState: ClrSummaryItemLoading = { active: true, text: 'Fetching...' };
  public itemErrorState: ClrSummaryItemError = {
    active: true,
    text: 'Click to handle error',
    click: () => this.handleItemErrorClick(this.itemErrorState),
  };
  public itemWarningState: ClrSummaryItemWarning = {
    active: true,
    text: 'Reload',
    click: () => {
      this.itemWarningState.active = false;
      alert('Handle warning clicked!');
    },
  };

  public handleAreaErrorClick(): void {
    this.summaryAreaErrorState.active.set(false);
    alert('Handle error clicked!');
  }

  public handleAreaWarningClick(): void {
    this.summaryAreaWarningState.active.set(false);
    alert('Handle warning clicked!');
  }

  private readonly router: Router = inject(Router);

  public ngOnInit(): void {
    // Simulate general loading state
    setTimeout(() => {
      this.summaryAreaLoadingState = { ...this.summaryAreaLoadingState, active: false };
    }, 2000);

    // Simulate item loading state
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

  public handleItemErrorClick(errorState: ClrSummaryItemError): void {
    this.itemErrorState = {
      ...errorState,
      active: false,
    };
    alert('An error occurred.');
  }

  public onEditClick = (): void => {
    alert('Edit clicked!');
  };

  public goToIconsPage(): void {
    this.router.navigate(['/icons']);
  }

  public goToPagerRoute(): void {
    this.router.navigate(['/pager']);
  }

  public goToClarityRoute(): void {
    this.router.navigate(['/clarity']);
  }

  public goToExternalApp(): void {
    window.open('https://external-app.example.com', '_blank');
  }

  public openProgressDetails() {
    this.showProgressDetails = true;
  }

  public closeProgressDetails() {
    this.showProgressDetails = false;
  }
}
