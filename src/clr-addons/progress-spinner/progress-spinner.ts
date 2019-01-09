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
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[clrProgressSpinner]',
})
export class ClrProgressSpinnerDirective implements OnDestroy, OnInit {
  private static readonly MINIMUM_VISIBLE_DURATION = 200;
  private _size: string = 'sm';
  private _showSpinner: boolean;
  private startTimestamp: number;
  private hideTimeout: any;
  private spinner: ComponentRef<ClrProgressSpinnerComponent>;
  private compFactory: ComponentFactory<ClrProgressSpinnerComponent>;

  @Input('clrProgressSpinner')
  set showSpinner(value: boolean) {
    this._showSpinner = value;
    if (!!this._showSpinner) {
      this.show();
    } else {
      this.hide();
    }
  }

  @Input('clrProgressSpinnerSize')
  set size(size: string) {
    this._size = size;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.compFactory = this.resolver.resolveComponentFactory(ClrProgressSpinnerComponent);
    this.viewContainer.createEmbeddedView(this.templateRef);
  }

  ngOnDestroy(): void {
    clearTimeout(this.hideTimeout);
    this.viewContainer.clear();
    if (!!this.spinner) {
      this.spinner.destroy();
    }
  }

  private show(): void {
    if (!!this.compFactory) {
      clearTimeout(this.hideTimeout);
      this.startTimestamp = new Date().getTime();
      this.spinner = this.viewContainer.createComponent(this.compFactory);
      this.spinner.instance.size = this._size;
      this.spinner.instance.showSpinner = true;
    }
  }

  private hide(): void {
    if (!!this.spinner) {
      this.hideTimeout = setTimeout(() => {
        this.spinner.destroy();
        this.startTimestamp = undefined;
      }, this.getRemainingVisibleTime());
    }
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
  selector: 'clr-progress-spinner',
  template: `
    <span [class]="'spinner-'+size+' spinner'" *ngIf="showSpinner"></span>
  `,
  host: {
    '[class.progress-spinner-overlay]': 'showSpinner',
  },
})
export class ClrProgressSpinnerComponent {
  @Input() size: string = 'sm';
  @Input() showSpinner: boolean = false;
}
