/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClarityModule} from "@clr/angular";

import {SidebarpageLayoutDemo} from "./sidebarpage-layout";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        RouterModule.forChild([{path: "", component: SidebarpageLayoutDemo}])
    ],
    declarations: [
        SidebarpageLayoutDemo
    ],
    exports: [
        SidebarpageLayoutDemo
    ]
})
export class SidebarpageLayoutDemoModule {
}
