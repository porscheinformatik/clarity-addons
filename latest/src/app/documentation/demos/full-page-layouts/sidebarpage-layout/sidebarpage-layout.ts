/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "clr-sidebarpage-layout-demo",
    templateUrl: "./sidebarpage-layout.demo.html"
})
export class SidebarpageLayoutDemo implements OnInit {

    id: number;

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.id = this.collectRouteData("id")[0];
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
