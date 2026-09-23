import { NestedProperty } from './nested-property';

describe('NestedProperty', () => {
  it('reads a top-level property', () => {
    const prop = new NestedProperty('name');

    expect(prop.getPropValue({ name: 'Alpha' })).toBe('Alpha');
  });

  it('reads a nested property via dot notation', () => {
    const prop = new NestedProperty('address.city');

    expect(prop.getPropValue({ address: { city: 'Vienna' } })).toBe('Vienna');
  });

  it('returns undefined when an intermediate property is missing', () => {
    const prop = new NestedProperty('address.city');

    expect(prop.getPropValue({ address: null })).toBeUndefined();
    expect(prop.getPropValue({})).toBeUndefined();
  });

  it('exposes the original prop string', () => {
    const prop = new NestedProperty('address.city');

    expect(prop.prop).toBe('address.city');
  });
});
