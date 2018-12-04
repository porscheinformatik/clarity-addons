/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ClarityModule } from "@clr/angular";

import { ComboboxDemo } from "./combobox.demo";
import { ClrAddonsModule } from "@porscheinformatik/clr-addons";
import { DocWrapperModule } from "../_doc-wrapper/doc-wrapper.module";
import { UtilsModule } from "../../../utils/utils.module";

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    DocWrapperModule,
    UtilsModule,
    RouterModule.forChild([{ path: "", component: ComboboxDemo }])],
  declarations: [ComboboxDemo],
  exports: [ComboboxDemo],
})
export class ComboboxDemoModule {}
