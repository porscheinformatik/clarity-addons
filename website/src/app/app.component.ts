import { Component, ElementRef, OnInit, InjectionToken, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export const PLATFORM_TOKEN = new InjectionToken<string>('clarity');

declare let ga: Function;

const PRODUCT_TITLE = require('../settings/global.json').alt_title;

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  linkRef: HTMLLinkElement;
  noHeader: boolean = false;

  themes = [
    { name: 'PHS', cdsTheme: 'phs' },
    { name: 'Clarity (light)', cdsTheme: 'light' },
    { name: 'Clarity (dark)', href: 'assets/styles/clr-ui-dark.css' },
  ];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.linkRef = this.document.createElement('link');
      this.linkRef.id = 'theme';
      this.linkRef.rel = 'stylesheet';
      this.linkRef.href = this.themes[0].href;
      this.document.querySelector('head').appendChild(this.linkRef);
    }
  }

  ngOnInit() {
    this.router.events.subscribe((change: any) => {
      if (change instanceof NavigationEnd) {
        this.bodyClasses.forEach(className => this.renderer.removeClass(this.el.nativeElement, className));
        this.updateBodyClasses();
        this.bodyClasses.forEach(className => this.renderer.addClass(this.el.nativeElement, className));

        this.updateBrowserTitle();

        this.noHeader = this.collectRouteData('noHeader')[0];

        // ga may not exist if we aren"t on the actual site
        if (typeof ga !== 'undefined') {
          ga('send', 'pageview', change.urlAfterRedirects);
        }
      }
    });
  }

  bodyClasses = [];

  updateBodyClasses() {
    this.bodyClasses.length = 0;
    this.bodyClasses = this.collectRouteData('bodyClass');
  }

  public productTitle = PRODUCT_TITLE;

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public updateBrowserTitle() {
    let browserTitles = this.collectRouteData('browserTitle');

    browserTitles.unshift(this.defaultBrowserTitle);

    // some weirdness with routing was giving us duplicate titles
    // like "Clarity Design System - Releases - Releases"
    let dupes = new Set();

    let filteredTitles = browserTitles.filter(function (ttl) {
      if (!dupes.has(ttl)) {
        dupes.add(ttl);
        return true;
      }
    });

    this.setTitle(filteredTitles.join(this.browserTitleSeparator));
  }

  private defaultBrowserTitle = 'Clarity Addons';
  private browserTitleSeparator = ' - ';

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

  setTheme(theme: { cdsTheme: string; href: string }): void {
    this.document.documentElement.setAttribute('cds-theme', theme.cdsTheme);
    this.linkRef.href = theme.href;
  }
}
