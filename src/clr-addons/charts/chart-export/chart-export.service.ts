import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChartExportService {
  exportSvg(svgEl: SVGSVGElement, filename: string): void {
    const clone = this.cloneWithDimensions(svgEl);
    const svgStr = new XMLSerializer().serializeToString(clone);
    this.download(new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' }), `${filename}.svg`);
  }

  exportPng(svgEl: SVGSVGElement, filename: string): void {
    this.toCanvas(svgEl).then(canvas => canvas.toBlob(blob => this.download(blob, `${filename}.png`), 'image/png'));
  }

  private toCanvas(svgEl: SVGSVGElement): Promise<HTMLCanvasElement> {
    return new Promise(resolve => {
      const w = svgEl.clientWidth || Number(svgEl.getAttribute('width')) || 800;
      const h = svgEl.clientHeight || Number(svgEl.getAttribute('height')) || 600;
      const clone = this.cloneWithDimensions(svgEl, w, h);
      const url = URL.createObjectURL(
        new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml;charset=utf-8' })
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

  private cloneWithDimensions(svgEl: SVGSVGElement, w?: number, h?: number): SVGSVGElement {
    const clone = svgEl.cloneNode(true) as SVGSVGElement;
    const width = w ?? svgEl.clientWidth ?? Number(svgEl.getAttribute('width')) ?? 800;
    const height = h ?? svgEl.clientHeight ?? Number(svgEl.getAttribute('height')) ?? 600;
    clone.setAttribute('width', String(width));
    clone.setAttribute('height', String(height));
    clone.style.background = '#ffffff';
    return clone;
  }

  private download(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
  }
}
