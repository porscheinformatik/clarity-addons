/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';

import { ClrNotificationService } from './notification.service';

@Component({
  template: `
    <ng-template #notification>
      <ng-container clr-notification-message>
        Some Information<br />very<br />very<br />very<br />long information
      </ng-container>
    </ng-template>
  `,
  imports: [ClarityModule, FormsModule],
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
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    notificationService = fixture.debugElement.injector.get<ClrNotificationService>(ClrNotificationService);
    fixture.detectChanges();
  });

  function checkNotification(notificationType: string, progressbar: boolean, dismissable: boolean): void {
    tick();
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

    fixture.changeDetectorRef.detectChanges();
    expect(document.getElementsByTagName('clr-notification').length).toEqual(1);

    tick(400);

    fixture.changeDetectorRef.detectChanges();
    expect(document.getElementsByTagName('clr-notification').length).toEqual(0);
  }));

  it('with progressbar', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, { timeout: 100, progressbar: true });
    fixture.changeDetectorRef.detectChanges();

    checkNotification('info', true, false);

    tick(400);
    fixture.changeDetectorRef.detectChanges();
  }));

  it('with progressbar but no timeout', fakeAsync(() => {
    const notifRef = notificationService.openNotification(fixture.componentInstance.notification, {
      timeout: 0,
      progressbar: true,
    });
    fixture.changeDetectorRef.detectChanges();

    checkNotification('info', false, false);

    notifRef.close();
    fixture.changeDetectorRef.detectChanges();
  }));

  it('dismissable', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, { timeout: 100, dismissable: true });
    fixture.changeDetectorRef.detectChanges();

    checkNotification('info', false, true);

    tick(400);
    fixture.changeDetectorRef.detectChanges();
  }));

  it('info', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, {
      notificationType: 'info',
      timeout: 100,
    });
    fixture.changeDetectorRef.detectChanges();

    checkNotification('info', false, false);

    tick(400);
    fixture.changeDetectorRef.detectChanges();
  }));

  it('success', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, {
      notificationType: 'success',
      timeout: 100,
    });
    fixture.changeDetectorRef.detectChanges();

    checkNotification('success', false, false);

    tick(400);
    fixture.changeDetectorRef.detectChanges();
  }));

  it('warning', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, {
      notificationType: 'warning',
      timeout: 100,
    });
    fixture.changeDetectorRef.detectChanges();

    checkNotification('warning', false, false);

    tick(400);
    fixture.changeDetectorRef.detectChanges();
  }));

  it('danger', fakeAsync(() => {
    notificationService.openNotification(fixture.componentInstance.notification, {
      notificationType: 'danger',
      timeout: 100,
    });
    fixture.changeDetectorRef.detectChanges();

    checkNotification('danger', false, false);

    tick(400);
    fixture.changeDetectorRef.detectChanges();
  }));

  it('keeps default width classes when no width option is provided', fakeAsync(() => {
    const notifRef = notificationService.openNotification(fixture.componentInstance.notification);
    fixture.changeDetectorRef.detectChanges();
    tick();

    const wrapper = document.querySelector('clr-notification .notification__wrapper');
    expect(wrapper.classList.contains('notification__wrapper--sm')).toBeFalsy();
    expect(wrapper.classList.contains('notification__wrapper--md')).toBeFalsy();
    expect(wrapper.classList.contains('notification__wrapper--lg')).toBeFalsy();
    expect(wrapper.classList.contains('notification__wrapper--xl')).toBeFalsy();

    notifRef.close();
    fixture.changeDetectorRef.detectChanges();
  }));

  it('applies width modifier class when width option is set', fakeAsync(() => {
    const notifRef = notificationService.openNotification(fixture.componentInstance.notification, { width: 'xl' });
    fixture.changeDetectorRef.detectChanges();
    tick();

    const wrapper = document.querySelector('clr-notification .notification__wrapper');
    expect(wrapper.classList.contains('notification__wrapper--xl')).toBeTruthy();

    notifRef.close();
    fixture.changeDetectorRef.detectChanges();
  }));

  it('falls back to default class behavior for invalid runtime width values', fakeAsync(() => {
    const invalidWidth = JSON.parse('"invalid-size"');
    const notifRef = notificationService.openNotification(fixture.componentInstance.notification, {
      width: invalidWidth,
    });
    fixture.changeDetectorRef.detectChanges();
    tick();

    const wrapper = document.querySelector('clr-notification .notification__wrapper');
    expect(wrapper.className).not.toContain('notification__wrapper--');

    notifRef.close();
    fixture.changeDetectorRef.detectChanges();
  }));

  it('keeps vertical translation behavior for width preset notifications', fakeAsync(() => {
    const notifRef = notificationService.openNotification(fixture.componentInstance.notification, {
      width: 'sm',
      timeout: 0,
    });
    tick();

    const activeNotifications = Array.from((notificationService as any).elements.values());
    expect(activeNotifications.length).toBe(1);
    const notification = activeNotifications[0] as any;
    expect(notification.translate).toBe(0);

    notification.moveDown(120);
    expect(notification.translate).toBe(120);

    notification.moveUp(120);
    expect(notification.translate).toBe(0);

    notifRef.close();
    fixture.changeDetectorRef.detectChanges();
  }));
});
