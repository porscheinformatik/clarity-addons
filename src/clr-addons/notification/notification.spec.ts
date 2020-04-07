/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

import { ClrNotificationModule } from './notification.module';
import { ClrNotificationService } from './notification.service';

@Component({
  template: `
    <ng-template #notification>
      <ng-container clr-notification-message>
        Some Information<br />very<br />very<br />very<br />long information
      </ng-container>
    </ng-template>
  `,
})
class TestComponent {
  @ViewChild('notification', { static: true }) notification;
}

describe('NotificationComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let notificationService: ClrNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClrNotificationService],
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ClrNotificationModule],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    notificationService = fixture.debugElement.injector.get<ClrNotificationService>(ClrNotificationService);
    fixture.detectChanges();
  });

  function checkNotification(notificationType: string, progressbar: boolean, dismissable: boolean): void {
    const notifEl = document.getElementsByTagName('clr-notification').item(0);

    expect(notifEl.querySelector('.alert.alert-' + notificationType)).toBeTruthy();

    if (progressbar) {
      expect(notifEl.querySelector('.progress')).toBeTruthy();
    } else {
      expect(notifEl.querySelector('.progress')).toBeFalsy();
    }

    if (dismissable) {
      expect(notifEl.querySelector('.close')).toBeTruthy();
    } else {
      expect(notifEl.querySelector('.close')).toBeFalsy();
    }
  }

  it('should create', () => {
    const notifRef = notificationService.openNotification(fixture.componentInstance.notification);
    expect(document.getElementsByTagName('clr-notification').length).toEqual(1);
    notifRef.close();
  });

  it('with timeout', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, { timeout: 100 });

    fixture.detectChanges();
    expect(document.getElementsByTagName('clr-notification').length).toEqual(1);

    tick(400);

    fixture.detectChanges();
    expect(document.getElementsByTagName('clr-notification').length).toEqual(0);
  }));

  it('with progressbar', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, { timeout: 100, progressbar: true });
    fixture.detectChanges();

    checkNotification('info', true, false);

    tick(400);
    fixture.detectChanges();
  }));

  it('with progressbar but no timeout', () => {
    const notifRef = notificationService.openNotification(fixture.componentInstance.notification, {
      timeout: 0,
      progressbar: true,
    });
    fixture.detectChanges();

    checkNotification('info', false, false);

    notifRef.close();
    fixture.detectChanges();
  });

  it('dismissable', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, { timeout: 100, dismissable: true });
    fixture.detectChanges();

    checkNotification('info', false, true);

    tick(400);
    fixture.detectChanges();
  }));

  it('info', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, {
      notificationType: 'info',
      timeout: 100,
    });
    fixture.detectChanges();

    checkNotification('info', false, false);

    tick(400);
    fixture.detectChanges();
  }));

  it('success', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, {
      notificationType: 'success',
      timeout: 100,
    });
    fixture.detectChanges();

    checkNotification('success', false, false);

    tick(400);
    fixture.detectChanges();
  }));

  it('warning', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, {
      notificationType: 'warning',
      timeout: 100,
    });
    fixture.detectChanges();

    checkNotification('warning', false, false);

    tick(400);
    fixture.detectChanges();
  }));

  it('danger', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, {
      notificationType: 'danger',
      timeout: 100,
    });
    fixture.detectChanges();

    checkNotification('danger', false, false);

    tick(400);
    fixture.detectChanges();
  }));
});
