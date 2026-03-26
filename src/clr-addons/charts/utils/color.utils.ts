/**
 * Converts a chart color value to a CSS-compatible string.
 *
 * Supports:
 *  - Hex values:        '#e57200'                        → returned as-is
 *  - CSS custom props:  '--cds-global-color-lavender-1000' → wrapped in var(...)
 *  - Any other string:  'rgb(...)' / 'hsl(...)'          → returned as-is
 */
export function toChartColor(color: string | undefined): string {
  if (!color) {
    return '';
  }
  return color.startsWith('--') ? `var(${color})` : color;
}
