/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ClrAddonsModule} from "@porscheinformatik/clr-addons";
import {ViewEditSectionDemo} from "../view-edit-section/view-edit-section.demo";
import {ClarityModule} from "@clr/angular";
import {NgModule} from "@angular/core";
import {UtilsModule} from "../../../utils/utils.module";
import {FormsModule} from "@angular/forms";
import {DocWrapperModule} from "../_doc-wrapper/doc-wrapper.module";
import {TreetableDemo} from "./treetable.demo";

@NgModule({
    imports: [
        CommonModule,
        UtilsModule,
        DocWrapperModule,
        RouterModule.forChild([{path: "", component: TreetableDemo}]),
        FormsModule,
        ClarityModule,
        ClrAddonsModule
    ],
    declarations: [
        TreetableDemo
    ],
    exports: [
        TreetableDemo
    ]
})
export class TreetableDemoModule {
}
