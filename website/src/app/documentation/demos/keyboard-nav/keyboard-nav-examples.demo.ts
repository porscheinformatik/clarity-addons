/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export const CTRL_ARROW_BASIC_EXAMPLE = `<!-- Add clrKeyboardNavCtrlArrow to any Clarity navigation host -->

<!-- Horizontal tabs: Ctrl+Left / Ctrl+Right cycle through tabs -->
<clr-tabs clrKeyboardNavCtrlArrow clrNavOrientation="horizontal">
  <clr-tab>
    <button clrTabLink>Category 1</button>
    <clr-tab-content *clrIfActive="true">...</clr-tab-content>
  </clr-tab>
  <clr-tab>
    <button clrTabLink>Category 2</button>
    <clr-tab-content *clrIfActive>...</clr-tab-content>
  </clr-tab>
  <clr-tab>
    <button clrTabLink>Category 3</button>
    <clr-tab-content *clrIfActive>...</clr-tab-content>
  </clr-tab>
</clr-tabs>

<!-- Vertical sidebar: Ctrl+Up / Ctrl+Down cycle through links -->
<clr-vertical-nav clrKeyboardNavCtrlArrow clrNavOrientation="vertical">
  <a clrVerticalNavLink routerLink="./a" routerLinkActive="active">Item A</a>
  <a clrVerticalNavLink routerLink="./b" routerLinkActive="active">Item B</a>
</clr-vertical-nav>

<!-- Disable while an overlay or modal is open -->
<clr-tabs clrKeyboardNavCtrlArrow [clrNavDisabled]="isOverlayOpen">...</clr-tabs>

<!-- Custom item selector (any host element) -->
<div clrKeyboardNavCtrlArrow clrNavItemSelector=".my-nav-btn">...</div>`;

export const ALT_MNEMONIC_BASIC_EXAMPLE = `<!-- Add clrKeyboardNavAltMnemonic to any Clarity navigation host -->

<!-- Tabs: hold Alt to reveal badges, then press the digit -->
<clr-tabs clrKeyboardNavAltMnemonic>
  <clr-tab>
    <button clrTabLink>Alpha</button>
    <clr-tab-content *clrIfActive="true">...</clr-tab-content>
  </clr-tab>
  <clr-tab>
    <button clrTabLink>Beta</button>
    <clr-tab-content *clrIfActive>...</clr-tab-content>
  </clr-tab>
  <!-- Items 10, 11, ... require two digits: Alt + 1 + 0, Alt + 1 + 1 -->
</clr-tabs>

<!-- Vertical nav with icons — icon is swapped in-place by the badge (no layout shift) -->
<clr-vertical-nav clrKeyboardNavAltMnemonic>
  <a clrVerticalNavLink routerLink="./home" routerLinkActive="active">
    <cds-icon clrVerticalNavIcon shape="home"></cds-icon>
    Home
  </a>
  <a clrVerticalNavLink routerLink="./settings" routerLinkActive="active">
    <cds-icon clrVerticalNavIcon shape="cog"></cds-icon>
    Settings
  </a>
</clr-vertical-nav>

<!-- Disable while an overlay is open -->
<clr-tabs clrKeyboardNavAltMnemonic [clrNavDisabled]="isOverlayOpen">...</clr-tabs>`;

export const COMBINED_EXAMPLE = `<!-- Both directives can be applied to the same host element -->
<!-- Use Ctrl+Arrow OR Alt+digit interchangeably -->
<clr-tabs
  clrKeyboardNavCtrlArrow
  clrKeyboardNavAltMnemonic
  clrNavOrientation="horizontal"
  [clrNavDisabled]="overlayActive">
  <clr-tab>
    <button clrTabLink>Service</button>
    <clr-tab-content *clrIfActive="true">...</clr-tab-content>
  </clr-tab>
  <clr-tab>
    <button clrTabLink>Parts</button>
    <clr-tab-content *clrIfActive>...</clr-tab-content>
  </clr-tab>
  <clr-tab>
    <button clrTabLink>Package</button>
    <clr-tab-content *clrIfActive>...</clr-tab-content>
  </clr-tab>
</clr-tabs>

<!-- Overlay guard: disable both shortcuts while a modal / overlay is open -->
<label>
  <input type="checkbox" [(ngModel)]="overlayActive" />
  Overlay active
</label>`;

export const IMPORT_EXAMPLE = `// app.module.ts  (or any NgModule / standalone component)
import {
  ClrKeyboardNavCtrlArrowDirective,
  ClrKeyboardNavAltMnemonicDirective,
} from '@porscheinformatik/clr-addons';

@NgModule({
  imports: [
    ClrKeyboardNavCtrlArrowDirective,
    ClrKeyboardNavAltMnemonicDirective,
    // … or simply import ClrAddonsModule
  ],
})
export class AppModule {}`;
