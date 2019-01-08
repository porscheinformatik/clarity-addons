/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[clrProgressSpinner]',
})
export class ClrProgressSpinnerDirective implements OnChanges, OnDestroy, OnInit {
  static readonly MINIMUM_VISIBLE_DURATION = 200;
  @Input('clrProgressSpinner') showSpinner: boolean;
  size: string = 'sm';
  startTimestamp: number;
  hideTimeout: any;
  compFactory: ComponentFactory<ClrProgressSpinnerWrapperComponent>;
  spinnerWrapper: ComponentRef<ClrProgressSpinnerWrapperComponent>;

  @Input('clrProgressSpinnerSize')
  set clrProgressSpinnerSize(size: string) {
    this.size = size;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {
    this.compFactory = this.resolver.resolveComponentFactory(ClrProgressSpinnerWrapperComponent);
  }

  ngOnInit(): void {
    this.initSpinnerWrapper();
    this.reloadState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reloadState();
  }

  ngOnDestroy(): void {
    clearTimeout(this.hideTimeout);
    this.viewContainer.clear();
  }

  private reloadState() {
    if (!!this.spinnerWrapper) {
      if (!!this.showSpinner) {
        this.show();
      } else {
        this.hide();
      }
    }
  }

  private initSpinnerWrapper() {
    const spinnerTarget = this.viewContainer.createEmbeddedView(this.templateRef);
    this.spinnerWrapper = this.viewContainer.createComponent(this.compFactory, 0, this.viewContainer.injector, [
      spinnerTarget.rootNodes,
    ]);
    this.spinnerWrapper.instance.size = this.size;
  }

  private show(): void {
    clearTimeout(this.hideTimeout);
    this.startTimestamp = new Date().getTime();
    this.spinnerWrapper.instance.showSpinner = true;
  }

  private hide(): void {
    this.hideTimeout = setTimeout(() => {
      this.spinnerWrapper.instance.showSpinner = false;
      this.startTimestamp = undefined;
    }, this.getRemainingVisibleTime());
  }

  private getRemainingVisibleTime(): number {
    return Math.max(0, ClrProgressSpinnerDirective.MINIMUM_VISIBLE_DURATION - this.getVisibleTime());
  }

  private getVisibleTime(): number {
    if (!this.startTimestamp) {
      return 0;
    } else {
      return new Date().getTime() - this.startTimestamp;
    }
  }
}

@Component({
  selector: 'clrProgressSpinnerWrapper',
  template: `
    <div style="position:relative">
      <div class="loading-overlay" *ngIf="showSpinner">        
          <span [class]="'spinner-'+size+' spinner'">
          </span>
      </div>
      <ng-content></ng-content>
    </div>
  `,
})
export class ClrProgressSpinnerWrapperComponent {
  @Input() size: string = 'sm';
  @Input() showSpinner: boolean = false;
}
