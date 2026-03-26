/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { AfterViewInit, computed, Directive, ElementRef, input, signal, viewChild } from '@angular/core';

/**
 * Abstract base class shared by all chart components.
 * ...
 */
@Directive()
export abstract class ChartBase<TSelected = unknown> implements AfterViewInit {
  // ── Common Input ───────────────────────────────────────────────────────────
  /** Whether the chart is in loading state (shows skeleton). */
  readonly loading = input(false);

  // ── View references ────────────────────────────────────────────────────────
  /** Reference to the `<svg #chart>` element in the component template. */
  protected readonly chartRef = viewChild<ElementRef>('chart');
  /** Reference to the `<div #container>` host element in the component template. */
  protected readonly containerRef = viewChild<ElementRef>('container');
  /** Exposes the raw SVG element for the chart-export button. */
  readonly svgElement = computed(() => this.chartRef()?.nativeElement as SVGSVGElement | undefined);

  // ── Tooltip State ──────────────────────────────────────────────────────────
  protected readonly selectedItem = signal<TSelected | undefined>(undefined);
  protected readonly tooltipPosition = signal<{ x: number; y: number } | undefined>(undefined);

  // ── Lifecycle ──────────────────────────────────────────────────────────────
  /** Schedules the first render after the view is ready. */
  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.updateChart());
  }

  // ── Abstract ───────────────────────────────────────────────────────────────
  /** Each chart implements its own D3 rendering logic here. */
  protected abstract updateChart(): void;

  // ── Common Implementations ─────────────────────────────────────────────────
  /** Returns the pixel dimensions of the container div. */
  protected getContainerDimensions(): { width: number; height: number } {
    const el: HTMLElement = this.containerRef().nativeElement;
    return { width: el.clientWidth, height: el.clientHeight };
  }

  /**
   * Clears the active tooltip.  Override in subclasses that have additional
   * selection state
   */
  public resetTooltip(): void {
    if (this.selectedItem() || this.tooltipPosition()) {
      this.selectedItem.set(undefined);
      this.tooltipPosition.set(undefined);
    }
  }
}
