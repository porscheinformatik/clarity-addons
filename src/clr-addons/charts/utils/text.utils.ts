export class TextRenderer {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private cachedFont = '';
  private cachedEllipsisWidth = 0;

  public constructor() {
    this.canvas = document.createElement('canvas');
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('2D context error');
    }
    this.context = ctx;
  }

  public render(
    text: string,
    availableHeight: number,
    availableWidth: number,
    fontSize: string = '12px',
    fontFamily: string = 'Arial'
  ): string {
    const font = `${fontSize} ${fontFamily}`;
    if (this.cachedFont !== font) {
      this.context.font = font;
      this.cachedEllipsisWidth = this.context.measureText('...').width;
      this.cachedFont = font;
    } else {
      this.context.font = font;
    }

    const textMetrics = this.context.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = Math.abs(textMetrics.actualBoundingBoxAscent) + Math.abs(textMetrics.actualBoundingBoxDescent);

    if (textWidth <= availableWidth && textHeight <= availableHeight) {
      return text;
    }

    let remainingWidth = availableWidth - this.cachedEllipsisWidth;
    let truncatedText = '';

    for (const char of text) {
      const charWidth = this.context.measureText(char).width;
      if (remainingWidth - charWidth >= 0) {
        truncatedText += char;
        remainingWidth -= charWidth;
      } else {
        break;
      }
    }

    truncatedText = truncatedText.trim();

    if (truncatedText.length === 0) {
      return '';
    }

    return truncatedText + '...';
  }
}
