import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

/**
 * Enum for the Screen size in pixels, defined by clarity here https://vmware.github.io/clarity/documentation/v0.12/grid
 * We consider screens above 1200px to be a desktop, between 576px and 1199px to be a tablet and below 576px to be a phone.
 */
export enum ScreenWidth {
  EXTRA_LARGE = 1200,
  LARGE = 992,
  MEDIUM = 768,
  SMALL = 576,
  EXTRA_SMALL = 575,
}

export enum ScreenOrientation {
  PORTRAIT = 'PORTRAIT',
  LANDSCAPE = 'LANDSCAPE',
}

export const DATEPICKER_ENABLE_BREAKPOINT = 768;
export const MOBILE_USERAGENT_REGEX = /Mobi/i;

@Injectable({ providedIn: 'root' })
export class ScreenStateService {
  private screenOrientation: ScreenOrientation;
  private isUserAgentMobile = false;

  private screenWidthSubject: Subject<number> = new ReplaySubject(1);
  private screenOrientationSubject: Subject<ScreenOrientation> = new ReplaySubject(1);

  public constructor(@Inject(DOCUMENT) private _document: Document) {
    window.addEventListener('resize', () => {
      this.onResize();
    });

    window.addEventListener('orientationchange', () => {
      this.onOrientationChange();
    });

    this.determineMobileUserAgent();

    // Execute them once for initial values
    this.onResize();
    this.onOrientationChange();
  }

  public getScreenWidthChanged(): Observable<number> {
    return this.screenWidthSubject;
  }

  public getMobileStateChanged(): Observable<boolean> {
    return this.getScreenWidthChanged().pipe(
      map(screenWidth => screenWidth < DATEPICKER_ENABLE_BREAKPOINT && this.isUserAgentMobile),
      distinctUntilChanged()
    );
  }

  public getScreenOrientationChanged(): Observable<ScreenOrientation> {
    return this.screenOrientationSubject;
  }

  private onResize() {
    const windowWidth = window.innerWidth;
    this.screenWidthSubject.next(windowWidth);
  }

  private onOrientationChange() {
    const prevOrientation = this.screenOrientation;
    const orientation = window.orientation;
    // Probably not always correct since this depends on the devices default orientation.
    // Better way to identify this would probably be comparing height & width of the screen.
    if (orientation === -90 || orientation === 90) {
      this.screenOrientation = ScreenOrientation.LANDSCAPE;
    } else {
      this.screenOrientation = ScreenOrientation.PORTRAIT;
    }
    if (this.screenOrientation !== prevOrientation) {
      this.screenOrientationSubject.next(this.screenOrientation);
    }
  }

  private determineMobileUserAgent() {
    if (this._document) {
      this.isUserAgentMobile = MOBILE_USERAGENT_REGEX.test(this._document.defaultView.navigator.userAgent);
    }
  }
}
