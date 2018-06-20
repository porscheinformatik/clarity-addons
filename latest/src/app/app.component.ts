import {Component, ElementRef, OnInit, Renderer,InjectionToken, Inject, PLATFORM_ID} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {Title} from '@angular/platform-browser';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';

export const PLATFORM_TOKEN = new InjectionToken<string>("clarity");

declare let ga: Function;

const PRODUCT_TITLE = require('../settings/global.json').alt_title;

@Component({
    selector: 'root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    linkRef: HTMLLinkElement;
    noHeader: boolean = false;

    themes = [
        { name: 'MVAP', href: '/styles/clr-addons-mvap.min.css' }, 
        { name: 'VU3', href: '/styles/clr-addons-vu3.min.css' }
    ];

    constructor(private renderer: Renderer, private el: ElementRef, private router: Router, private titleService: Title, @Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.linkRef = this.document.createElement('link');
            this.linkRef.rel = 'stylesheet';
            this.linkRef.href = this.themes[0].href;
            this.document.querySelector('head').appendChild(this.linkRef);
        }
    }

    ngOnInit() {
        this.router.events.subscribe((change: any) => {
            if (change instanceof NavigationEnd) {
                this.bodyClasses.forEach(className => this.renderer.setElementClass(this.el.nativeElement, className, false));
                this.updateBodyClasses();
                this.bodyClasses.forEach(className => this.renderer.setElementClass(this.el.nativeElement, className, true));

                this.updateBrowserTitle();

                this.noHeader = this.collectRouteData("noHeader")[0];

                // ga may not exist if we aren't on the actual site
                if (typeof ga !== "undefined") {
                    ga('send', 'pageview', change.urlAfterRedirects);
                }
            }
        });
    }

    bodyClasses = [];

    updateBodyClasses() {
        this.bodyClasses.length = 0;
        this.bodyClasses = this.collectRouteData("bodyClass");
    }

    public productTitle = PRODUCT_TITLE;

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    public updateBrowserTitle() {
        let browserTitles = this.collectRouteData("browserTitle");

        browserTitles.unshift(this.defaultBrowserTitle);

        // some weirdness with routing was giving us duplicate titles
        // like "Clarity Design System - Releases - Releases"
        let dupes = new Set;

        let filteredTitles = browserTitles.filter(function (ttl) {
            if (!dupes.has(ttl)) {
                dupes.add(ttl);
                return true;
            }
        });

        this.setTitle(filteredTitles.join(this.browserTitleSeparator));
    }

    private defaultBrowserTitle = "Clarity Design System";
    private browserTitleSeparator = " - ";

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

    setTheme(theme) {
        this.linkRef.href = theme.href;
    }
}
