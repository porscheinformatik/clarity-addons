import { Component, ElementRef, Inject, InjectionToken, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ClarityIcons, cogIcon } from '@cds/core/icon';

ClarityIcons.addIcons(cogIcon);

export const PLATFORM_TOKEN = new InjectionToken<string>('clarity');

declare let ga: Function;

const PRODUCT_TITLE = require('../settings/global.json').alt_title;

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  noHeader: boolean = false;

  themes = [
    { name: 'PHS', cdsTheme: 'phs' },
    { name: 'Clarity (light)', cdsTheme: 'light' },
    { name: 'Clarity (dark)', cdsTheme: 'dark' },
  ];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) {}

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
    const browserTitles = this.collectRouteData('browserTitle');

    browserTitles.unshift(this.defaultBrowserTitle);

    // some weirdness with routing was giving us duplicate titles
    // like "Clarity Design System - Releases - Releases"
    const dupes = new Set();

    const filteredTitles = browserTitles.filter(function (ttl) {
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
    const returnArray = [];

    while (route) {
      if (route.data && route.data[key]) {
        returnArray.push(route.data[key]);
      }
      route = route.firstChild;
    }

    return returnArray;
  }

  setTheme(theme: { cdsTheme: string; href: string }): void {
    this.document.body.setAttribute('cds-theme', theme.cdsTheme);
  }
}
