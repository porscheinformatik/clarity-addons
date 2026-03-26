import { toChartColor } from './color.utils';

describe('toChartColor()', () => {
  it('should return a hex color unchanged', () => {
    expect(toChartColor('#e57200')).toBe('#e57200');
  });

  it('should return an rgb() string unchanged', () => {
    expect(toChartColor('rgb(229,114,0)')).toBe('rgb(229,114,0)');
  });

  it('should wrap a CSS custom property in var()', () => {
    expect(toChartColor('--cds-global-color-lavender-1000')).toBe('var(--cds-global-color-lavender-1000)');
  });

  it('should wrap any --xxx token in var()', () => {
    expect(toChartColor('--clr-color-action-600')).toBe('var(--clr-color-action-600)');
  });

  it('should return empty string for undefined', () => {
    expect(toChartColor(undefined)).toBe('');
  });

  it('should return empty string for empty string', () => {
    expect(toChartColor('')).toBe('');
  });
});
