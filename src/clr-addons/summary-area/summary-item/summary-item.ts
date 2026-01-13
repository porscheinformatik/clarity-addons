import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  inject,
  input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ClrSummaryItemValue } from '../summary-item-value/summary-item-value';
import {
  ClrSummaryItemError,
  ClrSummaryItemWarning,
  ClrSummaryItemLoading,
  ClrSummaryItemEditConfig,
} from './summary-item.model';
import { ClrSummaryItemValueCopyButton } from '../summary-item-value-copy-button/summary-item-value-copy-button';

@Component({
  selector: 'clr-summary-item',
  standalone: true,
  imports: [CommonModule, ClarityModule, ClrSummaryItemValue, ClrSummaryItemValueCopyButton],
  templateUrl: './summary-item.html',
  styleUrls: ['./summary-item.scss'],
})
export class ClrSummaryItem implements AfterContentInit, OnDestroy {
  @ViewChild('itemTemplate', { static: true }) template!: TemplateRef<never>;
  @ViewChild('valuesContainer') valuesContainer!: ElementRef<HTMLDivElement>;
  @ContentChildren(ClrSummaryItemValue, { descendants: true })
  valueChildren!: QueryList<ClrSummaryItemValue>;

  public label = input<string>();
  public error = input<ClrSummaryItemError | undefined>();
  public warning = input<ClrSummaryItemWarning | undefined>();
  public loading = input<ClrSummaryItemLoading | undefined>();
  public editConfig = input<ClrSummaryItemEditConfig | undefined>();
  public showOnEmptyValue = input<boolean>(true);
  public valueCopyable = input<boolean>(false);

  public hasProjectedContent = false;

  private readonly cdr = inject(ChangeDetectorRef);
  private mutationObserver?: MutationObserver;
  private contentCheckScheduled = false;

  private readonly defaultLoadingText = 'Loading...';
  private readonly defaultErrorText = 'Error';
  private readonly defaultWarningText = 'Warning';
  private readonly defaultEditText = 'Edit';

  public get hasLoading(): boolean {
    return !!this.loading() && this.loading().active;
  }

  public get loadingText(): string {
    return this.loading()?.text || this.defaultLoadingText;
  }

  public get hasError(): boolean {
    return !this.hasLoading && !!this.error() && this.error().active;
  }

  public get errorText(): string {
    return this.error()?.text || this.defaultErrorText;
  }

  public get errorClick(): (() => void) | undefined {
    return this.error()?.click;
  }

  public get hasWarning(): boolean {
    return !this.hasLoading && !this.hasError && !!this.warning() && this.warning().active;
  }
  public get warningText(): string {
    return this.warning()?.text || this.defaultWarningText;
  }
  public get warningClick(): (() => void) | undefined {
    return this.warning()?.click;
  }

  public get showEditButton(): boolean {
    return (
      !this.hasLoading &&
      !this.hasError &&
      !this.hasWarning &&
      !this.hasProjectedContent &&
      !!this.editConfig()?.enabled
    );
  }

  public get editText(): string {
    return this.editConfig()?.text || this.defaultEditText;
  }

  public get editClick(): (() => void) | undefined {
    return this.editConfig()?.click;
  }

  public get copyableValue(): string {
    // Only collect text values from child summary-item-value components
    // Exclude projected content and empty values
    return this.valueChildren
      .toArray()
      .map(child => child.value())
      .filter(value => !!value?.trim())
      .join(' ');
  }

  public get showCopyButton(): boolean {
    // Only show copy button if:
    // 1. valueCopyable is true
    // 2. Not in loading, error, warning state
    // 3. Not showing edit button
    // 4. Has actual text values from summary-item-value components (not just projected content or placeholder)
    const hasTextValues = this.valueChildren.toArray().some(child => !!child.value()?.trim());
    return (
      this.valueCopyable() &&
      !this.hasLoading &&
      !this.hasError &&
      !this.hasWarning &&
      !this.showEditButton &&
      hasTextValues
    );
  }

  public ngAfterContentInit(): void {
    if (!this.hasLoading && !this.hasError) {
      const values = this.valueChildren.toArray();
      values.forEach((child, idx) => {
        if (idx > 0 && child.hasIcon) {
          throw new Error('Icon value is only allowed for the first item value. Others must have text only.');
        }
      });
      this.valueChildren.changes.subscribe(() => this.scheduleContentCheck());
    }
    // Initial check based on valueChildren (works before template is rendered)
    this.updateProjectedContentFlag();
  }

  private viewInitialized = false;

  public ngAfterViewChecked(): void {
    // Once valuesContainer is available (template rendered), setup observer
    if (!this.viewInitialized && this.valuesContainer?.nativeElement) {
      this.viewInitialized = true;
      this.setupMutationObserver();
    }
    // Always update content flag synchronously during view check
    if (this.valuesContainer?.nativeElement) {
      this.updateProjectedContentFlag();
    }
  }

  public ngOnDestroy(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = undefined;
    }
  }

  private setupMutationObserver(): void {
    if (this.valuesContainer?.nativeElement && !this.mutationObserver) {
      this.mutationObserver = new MutationObserver(() => {
        this.scheduleContentCheck();
      });

      this.mutationObserver.observe(this.valuesContainer.nativeElement, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  }

  private scheduleContentCheck(): void {
    if (this.contentCheckScheduled) {
      return;
    }
    this.contentCheckScheduled = true;

    // Use microtask to batch multiple changes
    queueMicrotask(() => {
      this.contentCheckScheduled = false;
      this.updateProjectedContentFlag();
      this.cdr.markForCheck();
    });
  }

  private updateProjectedContentFlag(): void {
    // Check if any clr-summary-item-value child has meaningful content first
    // (this works even before template is rendered)
    if (this.valueChildren && this.valueChildren.length > 0) {
      const hasVisibleValueChild = this.valueChildren.toArray().some(child => {
        return child.hasMeaningfulContent;
      });
      if (hasVisibleValueChild) {
        this.hasProjectedContent = true;
        return;
      }
    }

    // If valuesContainer is not yet initialized, we've already checked valueChildren above
    if (!this.valuesContainer?.nativeElement) {
      this.hasProjectedContent = false;
      return;
    }

    // Check for direct content in the container (text nodes, other elements)
    const container = this.valuesContainer.nativeElement;
    this.hasProjectedContent = Array.from(container.childNodes).some(node => {
      if (node.nodeType === Node.COMMENT_NODE) {
        return false;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent && node.textContent.trim().length > 0;
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const tagName = element.tagName?.toLowerCase();
        // Skip our own components and internal elements
        if (tagName === 'clr-summary-item-value' || tagName === 'clr-summary-area-value-copy-button') {
          return false;
        }
        // Skip internal elements by class
        if (
          element.classList.contains('edit-link') ||
          element.classList.contains('value-placeholder') ||
          element.classList.contains('summary-item-loading')
        ) {
          return false;
        }
        return true;
      }

      return false;
    });
  }
}
