import { TestBed } from '@angular/core/testing';
import { ChartExportService } from './chart-export.service';
import { ChartLegendItem } from '../chart-legend/chart-legend.component';

function makeSvg(width = 200, height = 100): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  return svg;
}

const LEGEND_ITEMS: ChartLegendItem[] = [
  { label: 'Revenue', color: '#e57200' },
  { label: 'Costs', color: '#00828b' },
];

describe('ChartExportService', () => {
  let service: ChartExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── exportSvg() ────────────────────────────────────────────────────────────

  describe('exportSvg()', () => {
    it('should call download with an SVG blob and the correct filename', () => {
      const downloadSpy = spyOn<any>(service, 'download');
      service.exportSvg(makeSvg(), 'my-chart');
      expect(downloadSpy).toHaveBeenCalledOnceWith(jasmine.any(Blob), 'my-chart.svg');
    });

    it('should call download with an SVG blob when legend items are provided', () => {
      const downloadSpy = spyOn<any>(service, 'download');
      service.exportSvg(makeSvg(), 'my-chart', LEGEND_ITEMS);
      expect(downloadSpy).toHaveBeenCalledOnceWith(jasmine.any(Blob), 'my-chart.svg');
    });
  });

  // ── exportPng() ────────────────────────────────────────────────────────────

  describe('exportPng()', () => {
    it('should call toCanvas with the combined SVG element', async () => {
      const canvas = document.createElement('canvas');
      canvas.width = 10;
      canvas.height = 10;
      const toCanvasSpy = spyOn<any>(service, 'toCanvas').and.returnValue(Promise.resolve(canvas));
      spyOn<any>(service, 'download');

      service.exportPng(makeSvg(), 'my-chart');

      expect(toCanvasSpy).toHaveBeenCalledOnceWith(jasmine.any(SVGSVGElement));
    });

    it('should call download with a PNG blob after canvas is resolved', async () => {
      const blob = new Blob([''], { type: 'image/png' });
      const canvas = document.createElement('canvas');
      canvas.width = 10;
      canvas.height = 10;
      spyOn(canvas, 'toBlob').and.callFake((cb: BlobCallback) => cb(blob));
      spyOn<any>(service, 'toCanvas').and.returnValue(Promise.resolve(canvas));
      const downloadSpy = spyOn<any>(service, 'download');

      service.exportPng(makeSvg(), 'my-chart');
      await new Promise(r => setTimeout(r, 0));

      expect(downloadSpy).toHaveBeenCalledOnceWith(blob, 'my-chart.png');
    });
  });

  // ── buildExportSvg() ───────────────────────────────────────────────────────

  describe('buildExportSvg()', () => {
    it('should set explicit width and height on the root SVG', () => {
      const root: SVGSVGElement = (service as any).buildExportSvg(makeSvg(300, 150));
      expect(root.getAttribute('width')).toBe('300');
      expect(root.getAttribute('height')).toBe('150');
    });

    it('should set a white background on the root SVG', () => {
      const root: SVGSVGElement = (service as any).buildExportSvg(makeSvg(200, 100));
      expect(root.style.background).toBe('rgb(255, 255, 255)');
    });

    it('should remove .domain paths from the cloned chart SVG', () => {
      const svg = makeSvg(100, 100);
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const domain = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      domain.setAttribute('class', 'domain');
      domain.setAttribute('stroke', 'currentColor');
      g.appendChild(domain);
      svg.appendChild(g);

      const root: SVGSVGElement = (service as any).buildExportSvg(svg);
      expect(root.querySelector('.domain')).toBeNull();
    });

    it('should copy chart child nodes into a <g> inside the root SVG', () => {
      const svg = makeSvg(100, 100);
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      svg.appendChild(rect);
      const root: SVGSVGElement = (service as any).buildExportSvg(svg);
      expect(root.querySelector('rect')).toBeTruthy();
    });

    it('should increase the total height when legend items are provided', () => {
      const root: SVGSVGElement = (service as any).buildExportSvg(makeSvg(200, 100), LEGEND_ITEMS);
      const totalH = Number(root.getAttribute('height'));
      expect(totalH).toBeGreaterThan(100);
    });

    it('should not increase the height when no legend items are provided', () => {
      const root: SVGSVGElement = (service as any).buildExportSvg(makeSvg(200, 100));
      expect(Number(root.getAttribute('height'))).toBe(100);
    });

    it('should append a legend group below the chart when legend items are provided', () => {
      const root: SVGSVGElement = (service as any).buildExportSvg(makeSvg(200, 100), LEGEND_ITEMS);
      const groups = root.querySelectorAll('g');
      // At least one group for the chart contents and one for the legend
      expect(groups.length).toBeGreaterThanOrEqual(2);
    });
  });

  // ── buildLegendGroup() ─────────────────────────────────────────────────────

  describe('buildLegendGroup()', () => {
    it('should render one color rect and one text element per legend item', () => {
      const g: SVGGElement = (service as any).buildLegendGroup(LEGEND_ITEMS, 400, 0, 'sans-serif');
      const rects = g.querySelectorAll('rect');
      const texts = g.querySelectorAll('text');
      expect(rects.length).toBe(LEGEND_ITEMS.length);
      expect(texts.length).toBe(LEGEND_ITEMS.length);
    });

    it('should set the correct fill on each color rect', () => {
      const g: SVGGElement = (service as any).buildLegendGroup(LEGEND_ITEMS, 400, 0, 'sans-serif');
      const rects = Array.from(g.querySelectorAll('rect'));
      expect(rects[0].getAttribute('fill')).toBe('#e57200');
      expect(rects[1].getAttribute('fill')).toBe('#00828b');
    });

    it('should set the correct label text content', () => {
      const g: SVGGElement = (service as any).buildLegendGroup(LEGEND_ITEMS, 400, 0, 'sans-serif');
      const texts = Array.from(g.querySelectorAll('text'));
      expect(texts[0].textContent).toBe('Revenue');
      expect(texts[1].textContent).toBe('Costs');
    });

    it('should apply the font-family to text elements', () => {
      const g: SVGGElement = (service as any).buildLegendGroup(LEGEND_ITEMS, 400, 0, 'Arial');
      const texts = Array.from(g.querySelectorAll('text'));
      texts.forEach(t => expect(t.getAttribute('font-family')).toBe('Arial'));
    });

    it('should offset the group by the given offsetY plus the legend top padding', () => {
      // LEGEND_PADDING_TOP = 12, so transform = translate(0, 150 + 12) = translate(0,162)
      const g: SVGGElement = (service as any).buildLegendGroup(LEGEND_ITEMS, 400, 150, 'sans-serif');
      expect(g.getAttribute('transform')).toBe('translate(0,162)');
    });
  });

  // ── resolveColor() ─────────────────────────────────────────────────────────

  describe('resolveColor()', () => {
    it('should return a hex color unchanged', () => {
      expect((service as any).resolveColor('#e57200')).toBe('#e57200');
    });

    it('should return fallback for empty color', () => {
      expect((service as any).resolveColor('')).toBe('#cccccc');
    });

    it('should resolve a CSS custom property via getComputedStyle', () => {
      // Define the custom property value on the document root for this test
      document.documentElement.style.setProperty('--test-chart-color', '#aabbcc');
      const result = (service as any).resolveColor('--test-chart-color');
      document.documentElement.style.removeProperty('--test-chart-color');
      expect(result).toBe('#aabbcc');
    });
  });

  // ── resolveVarsInString() ──────────────────────────────────────────────────

  describe('resolveVarsInString()', () => {
    it('should replace a var() with its computed value', () => {
      document.documentElement.style.setProperty('--test-fill', 'red');
      const result = (service as any).resolveVarsInString('fill:var(--test-fill)');
      document.documentElement.style.removeProperty('--test-fill');
      expect(result).toContain('red');
    });

    it('should use the fallback when the CSS variable is not defined', () => {
      const result = (service as any).resolveVarsInString('var(--undefined-var, #123456)');
      expect(result).toBe('#123456');
    });
  });

  // ── inlineFontFamily() ─────────────────────────────────────────────────────

  describe('inlineFontFamily()', () => {
    it('should add font-family to <text> elements without one', () => {
      const svg = makeSvg();
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      svg.appendChild(text);
      (service as any).inlineFontFamily(svg, 'Roboto');
      expect(text.getAttribute('font-family')).toBe('Roboto');
    });

    it('should NOT overwrite an existing font-family attribute', () => {
      const svg = makeSvg();
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('font-family', 'Arial');
      svg.appendChild(text);
      (service as any).inlineFontFamily(svg, 'Roboto');
      expect(text.getAttribute('font-family')).toBe('Arial');
    });

    it('should do nothing when fontFamily is empty', () => {
      const svg = makeSvg();
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      svg.appendChild(text);
      (service as any).inlineFontFamily(svg, '');
      expect(text.getAttribute('font-family')).toBeNull();
    });
  });
});
