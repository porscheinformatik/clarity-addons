import { TestBed } from '@angular/core/testing';
import { ChartExportService } from './chart-export.service';

function makeSvg(width = 200, height = 100): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  return svg;
}

describe('ChartExportService', () => {
  let service: ChartExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('exportSvg()', () => {
    it('should call download with an SVG blob and the correct filename', () => {
      const downloadSpy = spyOn<any>(service, 'download');
      service.exportSvg(makeSvg(), 'my-chart');
      expect(downloadSpy).toHaveBeenCalledOnceWith(jasmine.any(Blob), 'my-chart.svg');
    });

    it('should set explicit width and height on the cloned SVG when provided', () => {
      const svg = makeSvg(300, 150);
      // Pass explicit dimensions (clientWidth is 0 in headless, ?? does not treat 0 as nullish)
      const clone = (service as any).cloneWithDimensions(svg, 300, 150);
      expect(clone.getAttribute('width')).toBe('300');
      expect(clone.getAttribute('height')).toBe('150');
    });

    it('should set a white background on the cloned SVG', () => {
      const clone = (service as any).cloneWithDimensions(makeSvg(), 200, 100);
      expect(clone.style.background).toBe('rgb(255, 255, 255)');
    });
  });

  describe('exportPng()', () => {
    it('should call toCanvas with the SVG element', async () => {
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

  describe('cloneWithDimensions()', () => {
    it('should use the provided w/h overrides', () => {
      const clone = (service as any).cloneWithDimensions(makeSvg(), 640, 480);
      expect(clone.getAttribute('width')).toBe('640');
      expect(clone.getAttribute('height')).toBe('480');
    });

    it('should clone all child nodes from the original SVG', () => {
      const svg = makeSvg(100, 100);
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      svg.appendChild(rect);
      const clone = (service as any).cloneWithDimensions(svg, 100, 100);
      expect(clone.querySelector('rect')).toBeTruthy();
    });
  });
});
