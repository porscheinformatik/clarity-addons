import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { NgClass } from '@angular/common';
import { ClarityIcons, copyToClipboardIcon, successStandardIcon } from '@cds/core/icon';

ClarityIcons.addIcons(copyToClipboardIcon, successStandardIcon);

@Component({
  selector: 'clr-summary-area-value-copy-button',
  imports: [CdkCopyToClipboard, NgClass, ClrIconModule],
  templateUrl: './summary-item-value-copy-button.component.html',
  styleUrl: './summary-item-value-copy-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrSummaryItemValueCopyButtonComponent {
  public value = input.required<string>();
  public showValueCopiedIcon: Set<string> = new Set();

  private readonly cdr = inject(ChangeDetectorRef);

  public copyValueClicked(value: string): void {
    if (this.showValueCopiedIcon.has(value)) {
      return;
    }

    this.showValueCopiedIcon.add(value);

    setTimeout(() => {
      this.showValueCopiedIcon.delete(value);
      this.cdr.detectChanges();
    }, 1000);
  }
}
