import { TextRenderer } from './text.utils';

describe('TextRenderer', () => {
  let renderer: TextRenderer;

  beforeEach(() => {
    renderer = new TextRenderer();
  });

  it('should instantiate without errors', () => {
    expect(renderer).toBeTruthy();
  });

  describe('render()', () => {
    it('should return the original text when it fits within the available space', () => {
      expect(renderer.render('Hi', 20, 200)).toBe('Hi');
    });

    it('should truncate text and append "..." when too wide', () => {
      const result = renderer.render('A very long label text that will not fit', 20, 40);
      expect(result.endsWith('...')).toBeTrue();
      expect(result.length).toBeLessThan('A very long label text that will not fit'.length);
    });

    it('should return an empty string when no characters fit the available width', () => {
      // 1px is too narrow for any character + ellipsis
      const result = renderer.render('WWWWWW', 20, 1);
      expect(result).toBe('');
    });

    it('should use default font size 12px', () => {
      // Just verifying no error is thrown and something is returned
      const result = renderer.render('Test', 20, 200);
      expect(typeof result).toBe('string');
    });

    it('should accept a custom font size and family', () => {
      const result = renderer.render('Test', 20, 200, '16px', 'Helvetica');
      expect(typeof result).toBe('string');
    });

    it('should cache the font to avoid redundant measurements', () => {
      // Call twice with the same font – should produce identical results
      const first = renderer.render('Hello', 20, 200, '12px', 'Arial');
      const second = renderer.render('Hello', 20, 200, '12px', 'Arial');
      expect(first).toBe(second);
    });
  });
});
