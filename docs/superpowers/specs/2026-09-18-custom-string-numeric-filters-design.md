# Custom String & Numeric Datagrid Filters with Clear Button

- **Ticket:** [C3DEV-697052](https://jira.porscheinformatik.com/jira/browse/C3DEV-697052)
- **Date:** 2026-09-18
- **Status:** Approved

## Context

Clarity's built-in `clr-dg-string-filter` and `clr-dg-numeric-filter` have no way to
clear their values other than manually deleting the text/numbers — there is no "clear"
button. Christian Köberl proposed a fix for this upstream in 2022
([ng-clarity#246](https://github.com/vmware-clarity/ng-clarity/pull/246)), but it was
never merged. Clarity Addons already ships custom replacements for Clarity's date and
enum filters (`ClrDateFilterComponent`, `ClrEnumFilterComponent`) that include a trash
button to clear the filter. This ticket asks for the same treatment for the two
remaining built-in filter types: string ("text") and numeric.

## Scope

This spec covers **only** the `clarity-addons` repository:

- Two new filter components: `ClrStringFilterComponent` and `ClrNumericFilterComponent`.
- Shared-code extraction across all four custom filters (date, enum, string, numeric).
- Documentation with a small demo on the Clarity Addons docs website.

**Out of scope** (tracked separately, not part of this spec/plan):

- Rolling the new filters out to the 7 consuming CoCap applications (Configuration,
  Scheduler, Datahub, Systemmanagement, Communicator, Outputmanager, Dashboard). Each
  of those lives in its own repository and will be migrated in follow-up work once the
  new components are published.
- A linting rule to auto-enforce use of the string filter when no filter is configured
  (ticket's "technical analysis" notes this as a "think about" item, not a requirement).
  Noted below as a follow-up idea.

## Goals

- Provide a drop-in custom string filter and numeric filter, matching the UX of the
  existing `ClrDateFilterComponent`, including:
  - A trash/clear button that resets the filter value without closing the popover.
  - Debounced input (500ms) so filtering doesn't fire on every keystroke.
  - The popover only closes when the user explicitly clicks the `X` close button
    (this is already the default `ClrDatagridFilter` behavior — no extra work needed).
  - Working persistence/restore via the existing `ClrDatagridStatePersistenceModule`.
- Reduce duplication across the four custom filters where it can be done safely.
- Document both new filters on the Clarity Addons documentation website with a demo.

## Non-Goals

- Changing the behavior or public API of the existing `ClrDateFilterComponent` or
  `ClrEnumFilterComponent` beyond a shared-helper import path change.
- Cross-field validation for the numeric filter (e.g. rejecting `low > high`) — Clarity's
  own built-in numeric filter has no such validation either; a `low > high` range simply
  matches nothing, which is acceptable.
- Any changes outside the `clarity-addons` repository.

## Architecture

Two new components are added under `src/clr-addons/datagrid/`, following the exact
structural pattern already established by `ClrDateFilterComponent`:

```
src/clr-addons/datagrid/
  string-filter/
    string-filter.component.ts
    string-filter.component.html
    string-filter.component.scss
    string-filter.component.spec.ts
    string-filter.module.ts
    index.ts
  numeric-filter/
    numeric-filter.component.ts
    numeric-filter.component.html
    numeric-filter.component.scss
    numeric-filter.component.spec.ts
    numeric-filter.module.ts
    index.ts
  util/
    nested-property.ts          (moved from date-filter/nested-property.ts)
    filter-clear-button/        (new shared trash-button partial)
```

Both new components:

- Implement `ClrDatagridFilterInterface<T>` and register with `ClrDatagridFilter` via
  `filterContainer.setFilter(this)` in their constructor, exactly like
  `ClrDateFilterComponent`.
- Are declared `standalone: false` with their own `NgModule`
  (`ClrStringFilterModule`, `ClrNumericFilterModule`), matching existing conventions.
- Are exported from `clr-addons.module.ts` and `datagrid/index.ts`.

### Shared-code extraction

Per the ticket's technical-analysis note to check for shareable code across the four
custom filters (date, enum, string, numeric), the following pragmatic extraction is
made — chosen over introducing an abstract base class, to avoid touching the internals
of the two already-shipped filters beyond a trivial import path change:

1. **`NestedProperty`** moves from `date-filter/nested-property.ts` to a new shared
   location `datagrid/util/nested-property.ts`. `date-filter` and the two new filters
   import it from there; `enum-filter` does not use nested properties today and is left
   unchanged. No logic changes — this is a pure relocation plus import updates.
2. **Trash + close button markup** is extracted into a small shared partial (a tiny
   presentational component, e.g. `ClrFilterClearButtonComponent` with a
   `(clear)` output) used by both new filters. `date-filter` and `enum-filter` keep
   their current inline markup for this iteration (no forced migration of shipped
   components), but the new shared component is written so a future cleanup pass can
   adopt it there too.
3. **`ClarityIcons.addIcons(trashIcon)`** — each filter module currently repeats this
   call. The new filters call it once too (registration is idempotent), so no shared
   registration module is introduced; this is a cosmetic duplication that isn't worth
   the coupling of a shared side-effect import for this ticket.

## Components & API

### `ClrStringFilterComponent` (selector `clr-string-filter`)

| Input/Output                                  | Type     | Notes                                                                                           |
| --------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `[clrProperty]`                               | `string` | Supports nested paths (e.g. `'address.city'`) via shared `NestedProperty`, same as date-filter. |
| `[clrFilterValue]` / `(clrFilterValueChange)` | `string` | Two-way bindable; restorable via `ClrDatagridStatePersistenceModule`.                           |
| `[clrFilterPlaceholder]`                      | `string` | Defaults to `commonStrings.keys.filterItems` ("Filter items"), matching the mockup.             |

Behavior:

- Text input is bound via `ngModel` for immediate visual feedback, but the actual
  filter value (and thus `accepts()`/`changes`/`filterValueChange`) updates only after
  a 500ms debounce with `distinctUntilChanged()`, so the datagrid doesn't re-filter on
  every keystroke.
- Matching is case-insensitive substring match, mirroring Clarity's built-in
  `DatagridStringFilterImpl` (`value.toLowerCase().trim()` compared against the
  lower-cased property value).
- `clearFilter()` (trash button handler): resets value to `''` and emits immediately,
  bypassing the debounce for instant feedback. Does not close the popover.
- `isActive()`: `true` when the (debounced) value is non-empty.
- `state` getter returns `{ property, value }`, matching the shape
  `ClrDatagridStatePersistenceModule` already expects from `date-filter`/`enum-filter`.

### `ClrNumericFilterComponent` (selector `clr-numeric-filter`)

| Input/Output                                  | Type               | Notes                                                         |
| --------------------------------------------- | ------------------ | ------------------------------------------------------------- |
| `[clrProperty]`                               | `string`           | Nested-property supported.                                    |
| `[clrFilterValue]` / `(clrFilterValueChange)` | `[number, number]` | From/to tuple.                                                |
| `[clrFilterMinPlaceholder]`                   | `string`           | Mirrors `ClrDateFilterComponent`'s `clrFilterMinPlaceholder`. |
| `[clrFilterMaxPlaceholder]`                   | `string`           | Mirrors `ClrDateFilterComponent`'s `clrFilterMaxPlaceholder`. |

Behavior:

- Uses Clarity's existing `clr-number-input-container` / `[clrNumberInput]` for the
  from/to inputs (native +/− steppers), matching the mockup — no new input control is
  built.
- Both from and to inputs are independently debounced (500ms), same rationale as the
  string filter.
- `clearFilter()`: resets both from and to to `null`, emits immediately (no debounce).
- `isActive()`: `true` when either from or to is non-null.
- No cross-field validation between from/to (see Non-Goals).
- `state` getter returns `{ property, low, high }`, matching Clarity's own
  `DatagridNumericFilterImpl` state shape for consistency.

Both components render the shared trash-button partial, which calls `clearFilter()`.
The `X` close button is **not** rendered by these components at all — it is native
chrome already provided by Clarity's own `<clr-dg-filter>` wrapper (confirmed in
`@clr/angular`'s `ClrDatagridFilter` source: a `clrPopoverCloseButton` with a
`window-close` icon is always rendered as part of its popover). This is exactly the
"default `ClrDatagridFilter` behavior, no extra work" the ticket's technical analysis
refers to.

## Data Flow & Persistence

1. User types or adjusts values → local `ngModel` state updates immediately (responsive
   UI).
2. A debounced RxJS pipeline (500ms, `distinctUntilChanged`) is the only path that calls
   `_changes.next(...)` and emits `(clrFilterValueChange)`, which is what the Clarity
   datagrid subscribes to for actual filtering. This ensures filtering (and any
   expensive re-render) only happens after the user pauses.
3. `ClrDatagridStatePersistenceModule` reads `filter.state` to persist filter values to
   storage, and restores them via the `[clrFilterValue]` input setter on init — this is
   the exact mechanism already used by `ClrDateFilterComponent`/`ClrEnumFilterComponent`,
   so no changes to the persistence module are required.
4. Trash-button clicks bypass the debounce entirely and emit immediately, for instant
   visible feedback when clearing.

## Error Handling

No new error states are introduced. Clarity's native `clrNumberInput` control already
rejects non-numeric keyboard input at the DOM level. The numeric filter does not need
`ClrDateFilterComponent`'s from/to cross-validation (`valError`), since an inverted
range (`low > high`) simply matches no rows — the same behavior as Clarity's built-in
numeric filter.

## Testing

- `string-filter.component.spec.ts` and `numeric-filter.component.spec.ts`
  (TestBed-based, following the existing `date-filter.component.spec.ts` /
  `enum-filter.component.spec.ts` patterns), covering:
  - Component construction and registration with `ClrDatagridFilter`.
  - `accepts()` matching logic (substring/case-insensitive for string; range for
    numeric).
  - Debounce timing using `fakeAsync`/`tick(500)` — verifying no emission before 500ms
    and correct emission after.
  - `clearFilter()` resets values and emits immediately (bypassing debounce).
  - `isActive()` correctness.
  - Nested-property support (`clrProperty` with dotted paths).
  - `state` getter shape and restore-from-persisted-value round-trip.
- Relocating `nested-property.ts` carries its existing behavior forward unchanged; add
  a dedicated spec for it under `util/` if one doesn't already exist for the current
  `date-filter/nested-property.ts`.
- Documentation website demo (see below) needs no automated test beyond the existing
  site build passing.

## Documentation

A new page is added to the Clarity Addons documentation website (following the same
pattern as the existing `numericfield` demo page — `demo.ts` / `demo.module.ts` /
`demo.html`, registered as a route in `documentation-routing.module.ts`), showing both
the string and numeric filter in a sample datagrid with clear/debounce behavior visible.
This closes the current documentation gap — note that today neither `ClrDateFilterComponent`
nor `ClrEnumFilterComponent` has a website page either (only internal `src/dev` demos
exist for them); this ticket only commits to documenting the two _new_ filters.

## Follow-ups (explicitly out of scope here)

- Rollout to the 7 consuming CoCap applications (Configuration, Scheduler, Datahub,
  Systemmanagement, Communicator, Outputmanager, Dashboard) — separate tickets/PRs per
  application once the new components are published.
- A possible ESLint/schematic rule to auto-suggest/enforce the (addon) string filter
  when a datagrid column has no filter configured — flagged by the ticket's technical
  analysis as a "think about" item, not committed to here.
- Adopting the new shared trash-button partial in the existing `date-filter` and
  `enum-filter` components (currently left with their inline markup to avoid touching
  shipped components in this change).
