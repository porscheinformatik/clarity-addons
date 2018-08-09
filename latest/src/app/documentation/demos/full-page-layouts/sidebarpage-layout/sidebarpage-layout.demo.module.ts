/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ClarityModule } from "@clr/angular";
import { ClrAddonsModule } from "@porscheinformatik/clr-addons";

import { SidebarpageLayoutDemo } from "./sidebarpage-layout";
import { DemoMenuModule } from "../demo-menu/demo-menu.module";

@NgModule({
    imports: [
        CommonModule,
        ClarityModule,
        ClrAddonsModule,
        DemoMenuModule,
        RouterModule.forChild([{ path: "", component: SidebarpageLayoutDemo, outlet: "fullpage" }])
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
