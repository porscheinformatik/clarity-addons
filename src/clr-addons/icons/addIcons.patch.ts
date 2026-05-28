/**
 * Problem:
 * ClarityIcons.addIcons from @cds/core/icon merges icons into one global registry
 * (GlobalStateService.state.iconRegistry). Many @clr/angular NgModule classes call
 * ClarityIcons.addIcons in their constructors the first time Angular constructs
 * that module (forms, tabs, vertical nav, datepicker, etc.). @porscheinformatik/clr-addons
 * and some Clarity helpers can call it as well.
 *
 * Each call assigns a newly merged iconRegistry object and notifies CDS global state
 * listeners. Profilers often record that as CDS_STATE_UPDATE;
 *
 * See issue: https://github.com/vmware-clarity/core/issues/332
 *
 * Fix (this function):
 * One-time monkey-patch: keep a reference to the real addIcons and replace
 * ClarityIcons.addIcons with a wrapper that maintains a registered set of shape names on
 * globalThis so the patch is singleton.
 *
 * registerCdsIcons runs immediately after this and performs the large startup
 * registration; every shape passed in is recorded in registered.
 *
 * When a Clr NgModule constructor calls addIcons again with only shapes already in
 * registered, the wrapper omits them. If nothing remains, it returns without calling the
 * original addIcons, so there is no extra iconRegistry assignment and no duplicate CDS
 * state churn (same intent as the guard proposed in the issue).
 *
 * Arguments that getShape cannot classify are still passed to the original addIcons
 * so unknown icon payload formats are not dropped.
 */
import { ClarityIcons, IconShapeTuple } from '@clr/angular/icon';

function patchClarityIconsAddIcons(): void {
  const patchedKey = '__serviceBaseClarityIconsAddIconsPatched';
  const g = globalThis as unknown as Record<string, unknown>;

  if (g[patchedKey]) {
    return;
  }
  g[patchedKey] = true;

  const originalAddIcons = ClarityIcons.addIcons.bind(ClarityIcons);

  // Keep the signature compatible with ClarityIcons.addIcons.
  const wrappedAddIcons: typeof ClarityIcons.addIcons = (...icons: IconShapeTuple[]) => {
    const currentRegistry = ClarityIcons.registry;
    const toRegister = icons.filter(([name]) => !currentRegistry[name]);

    if (toRegister.length === 0) {
      return;
    }

    return originalAddIcons(...toRegister);
  };

  ClarityIcons.addIcons = wrappedAddIcons;
}

patchClarityIconsAddIcons();
