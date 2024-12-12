import { NgModule } from '@angular/core';
import { ClrReadonlyDirective } from './readonly.directive';

@NgModule({
  declarations: [ClrReadonlyDirective],
  exports: [ClrReadonlyDirective],
})
export class ClrReadonlyDirectiveModule {}
