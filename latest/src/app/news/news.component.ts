import {
    Component, OnDestroy, ElementRef,
} from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
    selector: "news",
    templateUrl: "news.component.html",
    host: {
        "[class.content-container]": "true"
    }
})
export class NewsComponent implements OnDestroy {
    releaseNumber: string;
    hasBreakingChange: boolean;

    private _subscriptions: Subscription[] = [];

    constructor(private router: Router, private el: ElementRef) {
        this._subscriptions.push(this.router.events.subscribe((change: any) => {
            if (change instanceof NavigationEnd) {
                let url: string[] = change.url.split("/");
                let urlLength: number = url.length;
                setTimeout(() => {
                    if (urlLength > 0 && url[urlLength - 1] !== "news") {
                        this.releaseNumber = url[urlLength - 1];
                    }
                    this.hasBreakingChange = this.el.nativeElement.querySelector(".breaking-change") !== null;
                }, 0);
            }
        }));
    }

    ngOnDestroy() {
        this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    }
}
