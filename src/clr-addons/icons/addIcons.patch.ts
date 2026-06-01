/**
 * Problem:
 * ClarityIcons.addIcons from @clr/angular/icon merges icons into one global registry
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
 * ClarityIcons.addIcons with this wrapper which adds a flag to globalThis so the patch is singleton.
 *
 * When anything calls addIcons it checks the internal registry and filters existing ones.
 * If nothing remains, it returns without calling the
 * original addIcons, so there is no extra iconRegistry assignment and no duplicate CDS
 * state churn (same intent as the guard proposed in the issue).
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
