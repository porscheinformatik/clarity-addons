# Data Test ID Attribute Binding Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace interpolated `data-testid="...{{ ... }}..."` usages with Angular attribute binding syntax so `ng build` no longer fails with `NG8002: Can't bind to 'testid'`.

**Architecture:** Keep behavior unchanged and only refactor template syntax from interpolation-in-attribute to `[attr.data-testid]` string expressions. Apply the same conversion pattern to HTML templates and inline templates in `.ts` components. Validate with targeted search plus full library build.

**Tech Stack:** Angular 21, TypeScript, HTML templates, npm scripts (`npm run build`)

---

### Task 1: Capture failing baseline and lock conversion rule

**Files:**

- Modify: none
- Test: build output (`npm run build`)

- [ ] **Step 1: Run failing build and capture failure signature**

```bash
npm run build
```

Expected: FAIL with one or more `NG8002: Can't bind to 'testid'` errors.

- [ ] **Step 2: Confirm only interpolated `data-testid` values are in scope**

```bash
grep -RIn 'data-testid=\"[^\"]*{{[^\"]*\"' src/clr-addons | head -n 20
```

Expected: lines show `data-testid` values containing `{{ ... }}`.

- [ ] **Step 3: Document conversion rule in code review notes (no file change)**

```text
Rule: data-testid="prefix-{{ expr }}"  ->  [attr.data-testid]="'prefix-' + expr"
Rule: data-testid="{{ expr }}-suffix"  ->  [attr.data-testid]="expr + '-suffix'"
Rule: data-testid="prefix-{{ a || b }}" -> [attr.data-testid]="'prefix-' + (a || b)"
```

- [ ] **Step 4: Commit checkpoint**

```bash
# No code changes expected in Task 1; skip commit if nothing changed.
```

### Task 2: Convert interpolated `data-testid` in HTML template files

**Files:**

- Modify:
  - `src/clr-addons/breadcrumb/breadcrumb.html`
  - `src/clr-addons/charts/bar-chart/bar-chart.component.html`
  - `src/clr-addons/charts/funnel-chart/funnel-chart.component.html`
  - `src/clr-addons/charts/shared/chart-skeleton.component.html`
  - `src/clr-addons/datagrid/enum-filter/enum-filter.component.html`
  - `src/clr-addons/daterangepicker/directives/daterangepicker-container/daterangepicker-container.component.html`
  - `src/clr-addons/dot-pager/dot-pager.html`
  - `src/clr-addons/flow-bar/flow-bar.html`
  - `src/clr-addons/generic-quick-list/generic-quick-list.html`
  - `src/clr-addons/history/history-pinned.html`
  - `src/clr-addons/history/history.html`
  - `src/clr-addons/image-gallery/image-carousel.html`
  - `src/clr-addons/image-gallery/image-gallery.html`
  - `src/clr-addons/location-bar/location-bar-node/location-bar-node.component.html`
  - `src/clr-addons/main-nav-group/main-nav-group.html`
  - `src/clr-addons/multilingual/multilingual-input/multilingual-input.html`
  - `src/clr-addons/multilingual/multilingual-textarea/multilingual-textarea.html`
  - `src/clr-addons/paged-search-result-list/paged-search-result-list.html`
  - `src/clr-addons/pager/pager.html`
  - `src/clr-addons/quick-list/add-option.html`
  - `src/clr-addons/quick-list/quick-list.html`
  - `src/clr-addons/summary-area/summary-item/summary-item.html`
  - `src/clr-addons/treetable/treetable-row.html`
- Test: search command + build command

- [ ] **Step 1: Convert simple interpolations**

```html
<!-- before -->
<button data-testid="pager-page-{{ pageNum }}">{{pageNum}}</button>

<!-- after -->
<button [attr.data-testid]="'pager-page-' + pageNum">{{pageNum}}</button>
```

- [ ] **Step 2: Convert expressions with fallback or operators using parentheses**

```html
<!-- before -->
<div data-testid="quick-list-option-row-{{ value.id || i }}">
  <!-- after -->
  <div [attr.data-testid]="'quick-list-option-row-' + (value.id || i)"></div>
</div>
```

- [ ] **Step 3: Convert all remaining interpolated `data-testid` in listed HTML files**

```bash
grep -RIn 'data-testid=\"[^\"]*{{[^\"]*\"' \
  src/clr-addons/breadcrumb \
  src/clr-addons/charts \
  src/clr-addons/datagrid \
  src/clr-addons/daterangepicker \
  src/clr-addons/dot-pager \
  src/clr-addons/flow-bar \
  src/clr-addons/generic-quick-list \
  src/clr-addons/history \
  src/clr-addons/image-gallery \
  src/clr-addons/location-bar \
  src/clr-addons/main-nav-group \
  src/clr-addons/multilingual \
  src/clr-addons/paged-search-result-list \
  src/clr-addons/pager \
  src/clr-addons/quick-list \
  src/clr-addons/summary-area \
  src/clr-addons/treetable
```

Expected: no matches in edited HTML files.

- [ ] **Step 4: Commit checkpoint**

```bash
git add src/clr-addons/breadcrumb/breadcrumb.html \
  src/clr-addons/charts/bar-chart/bar-chart.component.html \
  src/clr-addons/charts/funnel-chart/funnel-chart.component.html \
  src/clr-addons/charts/shared/chart-skeleton.component.html \
  src/clr-addons/datagrid/enum-filter/enum-filter.component.html \
  src/clr-addons/daterangepicker/directives/daterangepicker-container/daterangepicker-container.component.html \
  src/clr-addons/dot-pager/dot-pager.html \
  src/clr-addons/flow-bar/flow-bar.html \
  src/clr-addons/generic-quick-list/generic-quick-list.html \
  src/clr-addons/history/history-pinned.html \
  src/clr-addons/history/history.html \
  src/clr-addons/image-gallery/image-carousel.html \
  src/clr-addons/image-gallery/image-gallery.html \
  src/clr-addons/location-bar/location-bar-node/location-bar-node.component.html \
  src/clr-addons/main-nav-group/main-nav-group.html \
  src/clr-addons/multilingual/multilingual-input/multilingual-input.html \
  src/clr-addons/multilingual/multilingual-textarea/multilingual-textarea.html \
  src/clr-addons/paged-search-result-list/paged-search-result-list.html \
  src/clr-addons/pager/pager.html \
  src/clr-addons/quick-list/add-option.html \
  src/clr-addons/quick-list/quick-list.html \
  src/clr-addons/summary-area/summary-item/summary-item.html \
  src/clr-addons/treetable/treetable-row.html
git commit -m "fix: replace interpolated data-testid in HTML templates"
```

### Task 3: Convert interpolated `data-testid` in inline TypeScript templates

**Files:**

- Modify:
  - `src/clr-addons/charts/chart-legend/chart-legend.component.ts`
  - `src/clr-addons/multilingual/multilingual-selector.ts`
  - `src/clr-addons/treetable/treetable-column-manager-menu.component.ts`
  - `src/clr-addons/treetable/treetable-column-separator.ts`
  - `src/clr-addons/treetable/treetable-column.ts`
- Test: search command

- [ ] **Step 1: Convert inline-template attributes**

```ts
// before
`<span data-testid="chart-legend-label-{{ item.label }}">{{ item.label }}</span>`
// after
`<span [attr.data-testid]="'chart-legend-label-' + item.label">{{ item.label }}</span>`;
```

- [ ] **Step 2: Keep existing valid host bindings unchanged**

```ts
// keep this pattern as-is (already correct)
host: {
  '[attr.data-testid]': '"treetable-column-" + columnId',
}
```

- [ ] **Step 3: Verify no interpolated `data-testid` remains in TS templates**

```bash
grep -RIn 'data-testid=\"[^\"]*{{[^\"]*\"' \
  src/clr-addons/charts/chart-legend/chart-legend.component.ts \
  src/clr-addons/multilingual/multilingual-selector.ts \
  src/clr-addons/treetable/treetable-column-manager-menu.component.ts \
  src/clr-addons/treetable/treetable-column-separator.ts \
  src/clr-addons/treetable/treetable-column.ts
```

Expected: no matches.

- [ ] **Step 4: Commit checkpoint**

```bash
git add src/clr-addons/charts/chart-legend/chart-legend.component.ts \
  src/clr-addons/multilingual/multilingual-selector.ts \
  src/clr-addons/treetable/treetable-column-manager-menu.component.ts \
  src/clr-addons/treetable/treetable-column-separator.ts \
  src/clr-addons/treetable/treetable-column.ts
git commit -m "fix: replace interpolated data-testid in inline templates"
```

### Task 4: Validate build and guard against regressions

**Files:**

- Modify: none (unless fixups required)
- Test: repository-wide search + `npm run build`

- [ ] **Step 1: Run repository-wide guard search**

```bash
grep -RIn 'data-testid=\"[^\"]*{{[^\"]*\"' src/clr-addons
```

Expected: no output.

- [ ] **Step 2: Run full build**

```bash
npm run build
```

Expected: PASS without `NG8002: Can't bind to 'testid'`.

- [ ] **Step 3: Confirm clean working tree after successful build**

```bash
git --no-pager status --short
```

Expected: no output.
