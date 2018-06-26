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

import { DemoMenu } from "./demo-menu";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ClarityModule,
        ClrAddonsModule
    ],
    declarations: [
        DemoMenu
    ],
    exports: [
        DemoMenu
    ]
})
export class DemoMenuModule {
}
