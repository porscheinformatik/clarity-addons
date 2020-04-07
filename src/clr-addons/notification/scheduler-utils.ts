/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { asyncScheduler, interval, Observable, SchedulerLike, Subscription, timer } from 'rxjs';
import { NgZone } from '@angular/core';
import { observeOn } from 'rxjs/operators';

/**
 * Scheduler that runs outside the angular zone
 */
class OutsideAngularZoneScheduler implements SchedulerLike {
  constructor(private zone: NgZone, private scheduler: SchedulerLike) {}

  now(): number {
    return this.scheduler.now();
  }

  schedule(...args: any[]): Subscription {
    // eslint-disable-next-line prefer-spread
    return this.zone.runOutsideAngular(() => this.scheduler.schedule.apply(this.scheduler, args));
  }
}

/**
 * Scheduler that runs inside the angular zone
 */
class InsideAngularZoneScheduler implements SchedulerLike {
  constructor(private zone: NgZone, private scheduler: SchedulerLike) {}

  now(): number {
    return this.scheduler.now();
  }

  schedule(...args: any[]): Subscription {
    // eslint-disable-next-line prefer-spread
    return this.zone.run(() => this.scheduler.schedule.apply(this.scheduler, args));
  }
}

/**
 * Runs a timer outside of the angular zone and executes the subscription inside the angular zone.
 */
export function zonedTimer(dueTime: number | Date, zone: NgZone): Observable<number> {
  return timer(dueTime, new OutsideAngularZoneScheduler(zone, asyncScheduler)).pipe(
    observeOn(new InsideAngularZoneScheduler(zone, asyncScheduler))
  );
}

/**
 * Runs a interval outside of the angular zone and executes the subscription inside the angular zone.
 */
export function zonedInterval(period: number, zone: NgZone): Observable<number> {
  return interval(period, new OutsideAngularZoneScheduler(zone, asyncScheduler)).pipe(
    observeOn(new InsideAngularZoneScheduler(zone, asyncScheduler))
  );
}
