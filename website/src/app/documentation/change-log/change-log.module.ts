import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { UtilsModule } from '../../utils/utils.module';
import { RouterModule, Routes } from '@angular/router';
import { ChangeLogComponent } from './change-log.component';

const route: Routes = [
  {
    path: '',
    component: ChangeLogComponent,
    data: {
      browserTitle: 'Change Log',
    },
  },
];

@NgModule({
  declarations: [ChangeLogComponent],
  imports: [CommonModule, ClarityModule, UtilsModule, RouterModule.forChild(route)],
  providers: [],
})
export class ChangeLogModule {}
