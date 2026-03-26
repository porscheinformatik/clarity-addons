import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ChartExportButtonComponent } from './chart-export-button.component';
import { ChartExportService } from './chart-export.service';

describe('ChartExportButtonComponent', () => {
  let fixture: ComponentFixture<ChartExportButtonComponent>;
  let component: ChartExportButtonComponent;
  let componentRef: ComponentRef<ChartExportButtonComponent>;
  let exportService: jasmine.SpyObj<ChartExportService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<ChartExportService>('ChartExportService', ['exportSvg', 'exportPng']);

    await TestBed.configureTestingModule({
      imports: [ChartExportButtonComponent],
      providers: [provideNoopAnimations(), { provide: ChartExportService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartExportButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    exportService = TestBed.inject(ChartExportService) as jasmine.SpyObj<ChartExportService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default filename "chart"', () => {
    expect(component.filename()).toBe('chart');
  });

  it('should have undefined svgRef by default', () => {
    expect(component.svgRef()).toBeUndefined();
  });

  describe('export()', () => {
    it('should not call any export method when svgRef is undefined', () => {
      component.export('svg');
      component.export('png');
      expect(exportService.exportSvg).not.toHaveBeenCalled();
      expect(exportService.exportPng).not.toHaveBeenCalled();
    });

    it('should call exportSvg with the correct svg and filename', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
      componentRef.setInput('svgRef', svg);
      componentRef.setInput('filename', 'bar-chart');
      component.export('svg');
      expect(exportService.exportSvg).toHaveBeenCalledOnceWith(svg, 'bar-chart');
    });

    it('should call exportPng with the correct svg and filename', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg') as SVGSVGElement;
      componentRef.setInput('svgRef', svg);
      componentRef.setInput('filename', 'line-chart');
      component.export('png');
      expect(exportService.exportPng).toHaveBeenCalledOnceWith(svg, 'line-chart');
    });
  });
});
