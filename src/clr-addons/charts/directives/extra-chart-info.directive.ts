// eslint-disable-next-line max-classes-per-file
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  Directive,
  inject,
  OnInit,
} from '@angular/core';
import { ClarityIcons, heartIcon } from '@cds/core/icon';
import { ClrIconModule } from '@clr/angular';
import { ClrLetterAvatarModule } from '../../letter-avatar';

ClarityIcons.addIcons(heartIcon);

@Component({
  imports: [ClrLetterAvatarModule, ClrIconModule],
  template: `
    <p class="mt-1 mb-1">Made with <cds-icon shape="heart" solid="true" /> by SFO1:</p>
    <div class="grid">
      @for (name of NAMES; track name) {
      <clr-letter-avatar [clrName]="name" [clrSize]="32" [title]="name" />
      }
    </div>
  `,
  styles: `
    cds-icon {
      color: red;
    }

    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ExtraChartComponent {
  protected readonly NAMES = [
    'Carmen Vranau',
    'Konstantin Hauswirth',
    'Marcel Popa',
    'Martin Brom',
    'Matei Mihai',
    'Matthias Gudel',
    'Nico Wollner',
    'Raul Marian',
    'Sebastian Reichl',
    'Zsolt Ferencz',
  ];
}

@Directive({
  selector: '[cngExtraChartInfo]',
})
export class ExtraChartInfoDirective implements OnInit {
  private readonly appRef = inject(ApplicationRef);

  private componentRef: ComponentRef<ExtraChartComponent> = null;

  public ngOnInit(): void {
    if (!this.componentRef) {
      return;
    }

    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = undefined;
  }
}
