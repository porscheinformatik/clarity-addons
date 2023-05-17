import { Directive, EmbeddedViewRef, Input, OnDestroy, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DaterangeControlStateService } from '../providers/daterange-control-state.service';

import { ClrDaterangepickerContainerComponent } from './daterangepicker-container/daterangepicker-container.component';

/**
 * Directive for multiple error messages.
 * It works the same as Clarity `ClrIfError`, but for customized `ClrDaterangepickerContainerComponent`.
 * Using Clarity `ClrIfError` requires the container to have service implemented that are not publicly exported.
 *
 * @see https://clarity.design/documentation/forms (section "Multiple error messages").
 *
 * Altered version from https://github.com/vmware-clarity/ng-clarity/blob/138a6dd95fdc4ffb67b054391c44ce5fa3c44660/projects/angular/src/forms/common/if-control-state/if-error.ts
 */
@Directive({
  selector: '[clrIfDaterangeError]',
})
export class ClrIfDaterangeErrorDirective implements OnDestroy {
  /** Error name. */
  @Input()
  public clrIfDaterangeError: string;

  /** Rendered view. */
  private embeddedViewRef: EmbeddedViewRef<any>;

  /** Flag to remember if content is displayed. */
  protected displayedContent = false;

  /** List of subscriptions to later destroy. */
  private subscriptions: Array<Subscription> = [];

  public constructor(
    private readonly template: TemplateRef<any>,
    private readonly container: ViewContainerRef,
    @Optional() private readonly daterangeControlStateService: DaterangeControlStateService,
    @Optional()
    private readonly daterangepickerContainerComponent: ClrDaterangepickerContainerComponent
  ) {
    console.log('ClrIfDaterangeErrorDirective.ctor', {
      daterangeService: this.daterangeControlStateService,
      daterangepickerContainerComponent: this.daterangepickerContainerComponent,
    });

    // This directive only works inside `clr-daterangepicker-container`.
    if (this.daterangeControlStateService == null || this.daterangepickerContainerComponent == null) {
      throw new Error('`ClrIfDaterangeErrorDirective` can only be used within `ClrDaterangepickerContainerComponent`');
    }

    // Listen to status changes to toggle error visibility.
    this.subscriptions.push(
      this.daterangeControlStateService.statusChange.subscribe((_status: boolean) => {
        console.log('ClrIfDaterangeErrorDirective.daterangeControlStateService.statusChange', {
          _status,
        });

        this.handleState();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Handle error depending on states.
   */
  private handleState() {
    console.log('ClrIfDaterangeErrorDirective.toggleErrorVisibility', {
      invalid: this.daterangeControlStateService.invalid,
      errors: this.daterangeControlStateService.errors,
      clrIfDaterangeError: this.clrIfDaterangeError,
    });

    if (!this.daterangeControlStateService.invalid) {
      // If control is not invalid, hide all errors.
      this.toggleErrorVisibility(false);
    } else if (this.clrIfDaterangeError) {
      // Display error only if error input is list of errors.
      const hasError = this.clrIfDaterangeError in this.daterangeControlStateService.errors;
      this.toggleErrorVisibility(hasError);
    } else {
      // Display error.
      this.toggleErrorVisibility(true);
    }
  }

  /**
   * Display/hide error.
   * @param displayError - Wether to show/hide error.
   */
  private toggleErrorVisibility(displayError: boolean) {
    console.log('ClrIfDaterangeErrorDirective.toggleErrorVisibility', {
      invalid: this.daterangeControlStateService.invalid,
      errors: this.daterangeControlStateService.errors,
      container: this.container,
      displayedContent: this.displayedContent,
      embeddedViewRef: this.embeddedViewRef,
    });

    if (displayError) {
      const error = this.daterangeControlStateService.errors[this.clrIfDaterangeError];
      if (this.displayedContent === false) {
        this.embeddedViewRef = this.container.createEmbeddedView(this.template, {
          error,
        });
        this.displayedContent = true;
      } else if (this.embeddedViewRef && this.embeddedViewRef.context) {
        // If view is already rendered, update the error object to keep it in sync.
        this.embeddedViewRef.context.error = error;
      }
    } else {
      this.container.clear();
      this.displayedContent = false;
    }
  }
}
