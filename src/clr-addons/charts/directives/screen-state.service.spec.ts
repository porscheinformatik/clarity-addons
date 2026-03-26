import { TestBed } from '@angular/core/testing';
import { ScreenStateService } from './screen-state.service';
import { take } from 'rxjs/operators';

describe('ScreenStateService', () => {
  let service: ScreenStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ScreenStateService] });
    service = TestBed.inject(ScreenStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getScreenWidthChanged()', () => {
    it('should emit the current window width on subscription', done => {
      // take(1) ensures done() is called only once (ReplaySubject replays last value)
      service
        .getScreenWidthChanged()
        .pipe(take(1))
        .subscribe(width => {
          expect(typeof width).toBe('number');
          expect(width).toBeGreaterThanOrEqual(0);
          done();
        });
    });

    it('should emit again when the window fires a resize event', done => {
      let count = 0;
      // take(2): first emission = replayed initial value, second = the resize event
      service
        .getScreenWidthChanged()
        .pipe(take(2))
        .subscribe({
          next: width => {
            count++;
            if (count === 2) {
              expect(typeof width).toBe('number');
              done();
            }
          },
        });
      window.dispatchEvent(new Event('resize'));
    });
  });

  describe('getMobileStateChanged()', () => {
    it('should return an observable with a subscribe method', () => {
      const obs = service.getMobileStateChanged();
      expect(typeof obs.subscribe).toBe('function');
    });

    it('should emit a boolean value', done => {
      service
        .getMobileStateChanged()
        .pipe(take(1))
        .subscribe(isMobile => {
          expect(typeof isMobile).toBe('boolean');
          done();
        });
    });
  });
});
