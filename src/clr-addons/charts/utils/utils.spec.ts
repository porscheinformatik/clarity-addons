import { percentage, d3percentFormat } from './utils';

describe('Chart Utils', () => {
  describe('percentage()', () => {
    it('should calculate percentage of a value against a total', () => {
      expect(percentage(50, 100)).toBe(50);
      expect(percentage(1, 4)).toBe(25);
      expect(percentage(0, 100)).toBe(0);
    });

    it('should round to the nearest integer', () => {
      expect(percentage(1, 3)).toBe(33);
      expect(percentage(2, 3)).toBe(67);
    });

    it('should return 100 when value equals total', () => {
      expect(percentage(5, 5)).toBe(100);
    });

    it('should return 0 when total is 0 (guards against Infinity/NaN)', () => {
      expect(percentage(42, 0)).toBe(0);
    });

    it('should return 0 when total is negative', () => {
      expect(percentage(10, -5)).toBe(0);
    });

    it('should clamp to 100 when value exceeds total', () => {
      expect(percentage(150, 100)).toBe(100);
    });

    it('should clamp to 0 when value is negative', () => {
      expect(percentage(-10, 100)).toBe(0);
    });
  });

  describe('d3percentFormat()', () => {
    it('should format 0 as "0.0%"', () => {
      expect(d3percentFormat(0)).toBe('0.0%');
    });

    it('should format 50 as "50.0%"', () => {
      expect(d3percentFormat(50)).toBe('50.0%');
    });

    it('should format 100 as "100.0%"', () => {
      expect(d3percentFormat(100)).toBe('100.0%');
    });

    it('should format fractional values with one decimal place', () => {
      expect(d3percentFormat(33.3)).toBe('33.3%');
    });
  });
});
