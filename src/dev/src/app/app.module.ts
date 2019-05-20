/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule, ClrNotificationService } from '@porscheinformatik/clr-addons';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { BackButtonDemoModule } from './back-button/back-button.demo.module';
import { BreadcrumbDemoModule } from './breadcrumb/breadcrumb.demo.module';
import { CardsDemoModule } from './cards/cards.demo.module';
import { CollapseExpandSectionDemoModule } from './collapse-expand-section/collapse-expand-section.demo.module';
import { AppContentContainerComponent } from './content-container.component';
import { ContentPanelDemoModule } from './content-panel/content-panel.demo.module';
import { DateTimeContainerDemoModule } from './date-time-container/date-time-container.demo.module';
import { DotPagerDemoModule } from './dot-pager/dot-pager.demo.module';
import { FlowBarContentPanelDemoModule } from './flow-bar-content-panel/flow-bar-content-panel.demo.module';
import { FlowBarDemoModule } from './flow-bar/flow-bar.demo.module';
import { LandingComponent } from './landing.component';
import { LetterAvatarDemoModule } from './letter-avatar/letter-avatar.demo.module';
import { MultilingualInputDemoModule } from './multilingual-input/multilingual-input.demo.module';
import { NotificationDemoModule } from './notification/notification.demo.module';
import { NumericFieldDemoModule } from './numericfield/numericfield.demo.module';
import { PagedSearchResultListDemoModule } from './paged-search-result-list/paged-search-result-list.demo.module';
import { PagerDemoModule } from './pager/pager.demo.module';
import { ProgressSpinnerDemoModule } from './progress-spinner/progress-spinner.demo.module';
import { QuickListModule } from './quick-list/quick-list.demo.module';
import { ReadonlyDemoModule } from './readonly/readonly.demo.module';
import { SearchFieldDemoModule } from './searchfield/searchfield.demo.module';
import { TreetableDemoModule } from './treetable/treetable.demo.module';
import { ViewEditSectionDemoModule } from './view-edit-section/view-edit-section.demo.module';

@NgModule({
  declarations: [AppComponent, LandingComponent, AppContentContainerComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ClarityModule,
    ClrAddonsModule,
    ROUTING,
    ViewEditSectionDemoModule,
    PagerDemoModule,
    DotPagerDemoModule,
    PagedSearchResultListDemoModule,
    CollapseExpandSectionDemoModule,
    ContentPanelDemoModule,
    BreadcrumbDemoModule,
    NotificationDemoModule,
    FlowBarDemoModule,
    FlowBarContentPanelDemoModule,
    CardsDemoModule,
    ProgressSpinnerDemoModule,
    BackButtonDemoModule,
    NumericFieldDemoModule,
    SearchFieldDemoModule,
    TreetableDemoModule,
    ReadonlyDemoModule,
    DateTimeContainerDemoModule,
    QuickListModule,
    LetterAvatarDemoModule,
    MultilingualInputDemoModule,
  ],
  bootstrap: [AppComponent],
  providers: [ClrNotificationService],
})
export class AppModule {}
