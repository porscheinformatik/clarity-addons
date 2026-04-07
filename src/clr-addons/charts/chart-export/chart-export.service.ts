import { Injectable } from '@angular/core';
import { ChartLegendItem } from '../chart-legend/chart-legend.component';

// ── Legend layout constants (mirror chart-legend.component styles) ─────────────
const LEGEND_PADDING_TOP = 12;
const LEGEND_PADDING_H = 4;
const LEGEND_ITEM_HEIGHT = 22;
const LEGEND_COLOR_SIZE = 10;
const LEGEND_FONT_SIZE = 11;
const LEGEND_TEXT_COLOR = '#666666';
/** Approximate pixel width reserved per legend item (color square + gap + label). */
const LEGEND_APPROX_ITEM_WIDTH = 130;

@Injectable({ providedIn: 'root' })
export class ChartExportService {
  exportSvg(svgEl: SVGSVGElement, filename: string, legendItems?: ChartLegendItem[]): void {
    const root = this.buildExportSvg(svgEl, legendItems);
    const svgStr = new XMLSerializer().serializeToString(root);
    this.download(new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' }), `${filename}.svg`);
  }

  exportPng(svgEl: SVGSVGElement, filename: string, legendItems?: ChartLegendItem[]): void {
    const root = this.buildExportSvg(svgEl, legendItems);
    this.toCanvas(root).then(canvas => canvas.toBlob(blob => this.download(blob, `${filename}.png`), 'image/png'));
  }

  // ── Core builder ──────────────────────────────────────────────────────────────

  private buildExportSvg(svgEl: SVGSVGElement, legendItems?: ChartLegendItem[]): SVGSVGElement {
    const w = svgEl.clientWidth || Number(svgEl.getAttribute('width')) || 800;
    const chartH = svgEl.clientHeight || Number(svgEl.getAttribute('height')) || 600;
    const fontFamily = this.getDocumentFontFamily();

    const itemsToRender = legendItems?.length ? legendItems : [];
    const legendH = itemsToRender.length
      ? LEGEND_PADDING_TOP +
        Math.ceil(itemsToRender.length / this.legendItemsPerRow(w, itemsToRender)) * LEGEND_ITEM_HEIGHT
      : 0;

    const totalH = chartH + legendH;
    const ns = 'http://www.w3.org/2000/svg';

    // Root SVG
    const root = document.createElementNS(ns, 'svg') as SVGSVGElement;
    root.setAttribute('xmlns', ns);
    root.setAttribute('width', String(w));
    root.setAttribute('height', String(totalH));
    root.style.background = '#ffffff';
    if (fontFamily) {
      root.setAttribute('font-family', fontFamily);
    }

    // Chart contents – clone, resolve CSS vars, inline fonts, then wrap in <g>
    const chartClone = svgEl.cloneNode(true) as SVGSVGElement;
    chartClone.querySelectorAll('.domain').forEach(el => el.remove());
    this.resolveStyleVariables(chartClone);
    this.inlineFontFamily(chartClone, fontFamily);
    const chartGroup = document.createElementNS(ns, 'g');
    Array.from(chartClone.childNodes).forEach(n => chartGroup.appendChild(n.cloneNode(true)));
    root.appendChild(chartGroup);

    // Legend group below the chart
    if (itemsToRender.length) {
      root.appendChild(this.buildLegendGroup(itemsToRender, w, chartH, fontFamily));
    }

    return root;
  }

  // ── Legend SVG builder ────────────────────────────────────────────────────────

  private buildLegendGroup(items: ChartLegendItem[], width: number, offsetY: number, fontFamily: string): SVGGElement {
    const ns = 'http://www.w3.org/2000/svg';
    const g = document.createElementNS(ns, 'g');
    g.setAttribute('transform', `translate(0,${offsetY + LEGEND_PADDING_TOP})`);

    const perRow = this.legendItemsPerRow(width, items);
    const colWidth = Math.floor((width - 2 * LEGEND_PADDING_H) / perRow);
    let col = 0;
    let row = 0;

    for (const item of items) {
      const x = LEGEND_PADDING_H + col * colWidth;
      const y = row * LEGEND_ITEM_HEIGHT;

      // Color square
      const rect = document.createElementNS(ns, 'rect');
      rect.setAttribute('x', String(x));
      rect.setAttribute('y', String(y));
      rect.setAttribute('width', String(LEGEND_COLOR_SIZE));
      rect.setAttribute('height', String(LEGEND_COLOR_SIZE));
      rect.setAttribute('rx', '2');
      rect.setAttribute('ry', '2');
      rect.setAttribute('fill', this.resolveColor(item.color));
      g.appendChild(rect);

      // Label text – vertically centred with the square
      const text = document.createElementNS(ns, 'text');
      text.setAttribute('x', String(x + LEGEND_COLOR_SIZE + 5));
      text.setAttribute('y', String(y + LEGEND_COLOR_SIZE - 1));
      text.setAttribute('font-size', String(LEGEND_FONT_SIZE));
      text.setAttribute('fill', LEGEND_TEXT_COLOR);
      if (fontFamily) {
        text.setAttribute('font-family', fontFamily);
      }
      text.textContent = item.label;
      g.appendChild(text);

      col++;
      if (col >= perRow) {
        col = 0;
        row++;
      }
    }

    return g;
  }

  private legendItemsPerRow(width: number, items: ChartLegendItem[]): number {
    const usable = width - 2 * LEGEND_PADDING_H;
    const perRow = Math.max(1, Math.floor(usable / LEGEND_APPROX_ITEM_WIDTH));
    return Math.min(perRow, items.length);
  }

  // ── Canvas / PNG ──────────────────────────────────────────────────────────────

  private toCanvas(svgEl: SVGSVGElement): Promise<HTMLCanvasElement> {
    return new Promise(resolve => {
      const w = Number(svgEl.getAttribute('width')) || 800;
      const h = Number(svgEl.getAttribute('height')) || 600;
      const url = URL.createObjectURL(
        new Blob([new XMLSerializer().serializeToString(svgEl)], { type: 'image/svg+xml;charset=utf-8' })
      );
      const img = new Image();
      img.onload = () => {
        const scale = 2; // 2× for retina quality
        const canvas = document.createElement('canvas');
        canvas.width = w * scale;
        canvas.height = h * scale;
        const ctx = canvas.getContext('2d');
        ctx.scale(scale, scale);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        resolve(canvas);
      };
      img.src = url;
    });
  }

  // ── CSS variable resolution ───────────────────────────────────────────────────

  /** Recursively resolves `var(--x)` references in inline style and presentation attributes. */
  private resolveStyleVariables(el: Element): void {
    const style = el.getAttribute('style');
    if (style) {
      el.setAttribute('style', this.resolveVarsInString(style));
    }
    for (const attr of ['fill', 'stroke', 'color', 'background-color']) {
      const val = el.getAttribute(attr);
      if (val) {
        el.setAttribute(attr, this.resolveVarsInString(val));
      }
    }
    // Also resolve CSS var() in inline style properties directly set via D3 .style()
    const inlineStyle = (el as HTMLElement).style;
    if (inlineStyle) {
      const fill = inlineStyle.fill;
      if (fill?.includes('var(')) {
        inlineStyle.fill = this.resolveVarsInString(fill);
      }
      const stroke = inlineStyle.stroke;
      if (stroke?.includes('var(')) {
        inlineStyle.stroke = this.resolveVarsInString(stroke);
      }
    }
    Array.from(el.children).forEach(child => this.resolveStyleVariables(child));
  }

  /** Inlines `font-family` on every `<text>` / `<tspan>` element that doesn't already have one. */
  private inlineFontFamily(el: Element, fontFamily: string): void {
    if (!fontFamily) {
      return;
    }
    if (el.tagName === 'text' || el.tagName === 'tspan') {
      if (!el.getAttribute('font-family')) {
        el.setAttribute('font-family', fontFamily);
      }
    }
    Array.from(el.children).forEach(child => this.inlineFontFamily(child, fontFamily));
  }

  private resolveVarsInString(value: string): string {
    return value.replace(/var\(\s*(--[^,)]+?)\s*(?:,\s*([^)]+?))?\s*\)/g, (_match, varName, fallback) => {
      const computed = getComputedStyle(document.documentElement).getPropertyValue(varName.trim()).trim();
      return computed || fallback?.trim() || '';
    });
  }

  private resolveColor(color: string): string {
    if (!color) {
      return '#cccccc';
    }
    if (color.startsWith('--')) {
      const computed = getComputedStyle(document.documentElement).getPropertyValue(color).trim();
      return computed || '#cccccc';
    }
    // Handle var(...) wrapper
    if (color.startsWith('var(')) {
      return this.resolveVarsInString(color) || '#cccccc';
    }
    return color;
  }

  private getDocumentFontFamily(): string {
    return getComputedStyle(document.body).fontFamily || 'sans-serif';
  }

  // ── Download ──────────────────────────────────────────────────────────────────

  private download(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
}
