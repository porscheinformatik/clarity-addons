/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ClrContentPanel } from "@porscheinformatik/clr-addons";


@Component({
    selector: "clr-basepage-layout-demo",
    templateUrl: "./basepage-layout.demo.html",
    styleUrls: ["./basepage-layout.scss"]
})
export class BasepageLayoutDemo implements OnInit {
    withCommandBar = false;
    withContentPanel = false;

    @ViewChild("leftContentPanel")
    leftContentPanel: ClrContentPanel;

    @ViewChild("rightContentPanel")
    rightContentPanel: ClrContentPanel;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.withCommandBar = this.collectRouteData("withCommand")[0];
        this.withContentPanel = this.collectRouteData("withPanel")[0];
    }

    private toggleLeftPanel() {
        this.leftContentPanel.toggle();
    }

    private toggleRightPanel() {
        this.rightContentPanel.toggle();
    }

    private collectRouteData(key: string) {
        let route = this.router.routerState.snapshot.root;
        let returnArray = [];

        while (route) {
            if (route.data && route.data[key]) {
                returnArray.push(route.data[key]);
            }
            route = route.firstChild;
        }

        return returnArray;
    }
}
