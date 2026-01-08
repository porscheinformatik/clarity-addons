import {
  AfterContentInit,
  AfterContentChecked,
  Component,
  ContentChildren,
  ElementRef,
  input,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ClarityModule } from '@clr/angular';
import { ClrSummaryItemValueComponent } from '../summary-item-value/summary-item-value.component';
import {
  ClrSummaryItemError,
  ClrSummaryItemWarning,
  ClrSummaryItemLoading,
  ClrSummaryItemEditConfig,
} from './summary-item.model';
// import { ClrSummaryItemValueCopyButtonComponent } from '../summary-item-value-copy-button/summary-item-value-copy-button.component';

@Component({
  selector: 'clr-summary-item',
  standalone: false,
  //imports: [CommonModule, ClarityModule, ClrSummaryItemValueComponent, ClrSummaryItemValueCopyButtonComponent],
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss'],
})
export class ClrSummaryItemComponent implements AfterContentInit, AfterContentChecked {
  @ViewChild('itemTemplate', { static: true }) template!: TemplateRef<never>;
  @ViewChild('valuesContainer') valuesContainer!: ElementRef<HTMLDivElement>;
  @ContentChildren(ClrSummaryItemValueComponent, { descendants: true })
  valueChildren!: QueryList<ClrSummaryItemValueComponent>;

  public label = input<string>();
  public error = input<ClrSummaryItemError | undefined>();
  public warning = input<ClrSummaryItemWarning | undefined>();
  public loading = input<ClrSummaryItemLoading | undefined>();
  public editConfig = input<ClrSummaryItemEditConfig | undefined>();
  public showOnEmptyValue = input<boolean>(true);
  public valueCopyable = input<boolean>(false);

  public hasProjectedContent = false;

  public get hasLoading(): boolean {
    return !!this.loading() && this.loading().active;
  }

  public get loadingText(): string {
    return this.loading()?.text || 'summary.item.loading';
  }

  public get hasError(): boolean {
    return !this.hasLoading && !!this.error() && this.error().active;
  }

  public get errorText(): string {
    return this.error()?.text || 'summary.item.error';
  }

  public get errorClick(): (() => void) | undefined {
    return this.error()?.click;
  }

  public get hasWarning(): boolean {
    return !this.hasLoading && !this.hasError && !!this.warning() && this.warning().active;
  }
  public get warningText(): string {
    return this.warning()?.text || 'summary.item.warning';
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
    return this.editConfig()?.text || 'summary.item.edit';
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
      this.updateProjectedContentFlag();
      this.valueChildren.changes.subscribe(() => this.updateProjectedContentFlag());
    }
  }

  public ngAfterContentChecked(): void {
    if (!this.hasLoading && !this.hasError) {
      this.updateProjectedContentFlag();
    }
  }

  private updateProjectedContentFlag(): void {
    // Check the valuesContainer for any non-empty text node or non-placeholder element
    // This handles direct text content or custom elements projected into the summary item
    if (this.valuesContainer?.nativeElement) {
      const container = this.valuesContainer.nativeElement;
      const hasDirectContent = Array.from(container.childNodes).some(node => {
        if (node.nodeType === Node.COMMENT_NODE) {
          return false;
        }

        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent && node.textContent.trim().length > 0;
        }

        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          // Skip clr-summary-item-value elements - they will be checked separately
          if (element.tagName?.toLowerCase() === 'clr-summary-item-value') {
            return false;
          }
          // Skip placeholder elements
          if (element.classList.contains('value-placeholder')) {
            return false;
          }
          // Skip edit-link elements (rendered by this component, not projected content)
          if (element.classList.contains('edit-link')) {
            return false;
          }
          // Skip loading spinner container
          if (element.classList.contains('summary-item-loading')) {
            return false;
          }
          // Accept any other element
          return true;
        }

        return false;
      });
      if (hasDirectContent) {
        this.hasProjectedContent = true;
        return;
      }
    }

    // Check if any clr-summary-item-value child has meaningful content OR will show a placeholder
    // A child with showOnEmptyValue=true will render a placeholder, so the parent should not also render one
    if (this.valueChildren && this.valueChildren.length > 0) {
      const hasVisibleValueChild = this.valueChildren.toArray().some(child => {
        // Child has meaningful content - it will render something
        if (child.hasMeaningfulContent) {
          return true;
        }
        // Child has no content but showOnEmptyValue is true - it will render a placeholder
        // So the parent should NOT also render a placeholder
        return child.showOnEmptyValue();
      });
      if (hasVisibleValueChild) {
        this.hasProjectedContent = true;
        return;
      }
    }

    this.hasProjectedContent = false;
  }
}
