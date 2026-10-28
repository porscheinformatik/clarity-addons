/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrTreetableFilterInterface, ClrAutocompleteOff, ClrAddonsLabel } from '@porscheinformatik/clr-addons';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { OrganizationUnitMember, Role, RoleEnum } from './treetable.demo';
import { ClrCheckboxModule, ClrCommonFormsModule, ClrIcon } from '@clr/angular';
import { TitleCasePipe, KeyValuePipe } from '@angular/common';

@Component({
  selector: 'clr-role-type-filter',
  template: `
    <button class="btn btn-sm btn-icon btn-link btn-trash" (click)="clearFilter()">
      <cds-icon shape="trash"></cds-icon>
    </button>
    <clr-checkbox-container cds-layout="m-t:xs">
      @for (role of RoleEnum | keyvalue; track $index) {
        <clr-checkbox-wrapper>
          <input
            type="checkbox"
            clrCheckbox
            [name]="role.key"
            [checked]="isSelected(role.value)"
            (change)="toggleSelection(role.value)"
          />
          <label [for]="role.key">{{ role.key | titlecase }}</label>
        </clr-checkbox-wrapper>
      }
    </clr-checkbox-container>
  `,
  styles: `
    .btn-trash {
      position: absolute;
      top: 15px;
      right: 40px;
      padding: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ClrIcon,
    ClrCheckboxModule,
    ClrAutocompleteOff,
    ClrCommonFormsModule,
    ClrAddonsLabel,
    TitleCasePipe,
    KeyValuePipe,
  ],
})
export class TreetableRoleTypeFilterComponent implements ClrTreetableFilterInterface<OrganizationUnitMember, Role[]> {
  protected readonly RoleEnum = RoleEnum;

  protected readonly selectedRoles = signal<Set<Role>>(new Set());
  readonly changes: Observable<Role[]> = toObservable(this.selectedRoles).pipe(map(roleSet => Array.from(roleSet)));

  isActive(): boolean {
    return this.selectedRoles().size > 0;
  }

  accepts(item: OrganizationUnitMember): boolean {
    return this.isSelected(item?.value?.roleType);
  }

  protected isSelected(role: Role) {
    return this.selectedRoles().has(role);
  }

  protected toggleSelection(role: Role) {
    if (this.isSelected(role)) {
      this.selectedRoles.update(current => {
        current.delete(role);
        return new Set<Role>(current);
      });
      return;
    }

    this.selectedRoles.update(current => {
      current.add(role);
      return new Set<Role>(current);
    });
  }

  protected clearFilter(): void {
    this.selectedRoles.set(new Set());
  }
}
