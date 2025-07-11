/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { ClrHistory } from './history';
import { ClrHistoryService } from './history.service';
import { ClrHistoryModel } from './history-model.interface';
import { ClarityModule } from '@clr/angular';
import { ClrHistoryHttpService, HISTORY_TOKEN } from './history.http.service';
import { Observable, of, tap } from 'rxjs';

class MockClrHistoryHttpService implements ClrHistoryHttpService {
  private readonly history: ClrHistoryModel[] = [];

  addHistoryEntry(entry: ClrHistoryModel): Observable<void> {
    return of(null).pipe(tap(() => this.history.push(entry)));
  }

  getHistory(_username: string, _tenantId: string): Observable<ClrHistoryModel[]> {
    return of(this.history);
  }

  removeFromHistory(entry: ClrHistoryModel): Observable<void> {
    return of(null).pipe(
      tap(() => {
        const index = this.history.findIndex(
          h =>
            h.username === entry.username &&
            h.tenantId === entry.tenantId &&
            h.pageName === entry.pageName &&
            h.context === entry.context
        );
        if (index !== -1) {
          this.history.splice(index, 1);
        }
      })
    );
  }
}

describe('ClrHistory', () => {
  let component: ClrHistory;
  let fixture: ComponentFixture<ClrHistory>;
  let historyService: ClrHistoryService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [ClrHistoryService, { provide: HISTORY_TOKEN, useClass: MockClrHistoryHttpService }],
      imports: [ClarityModule],
      declarations: [ClrHistory],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(ClrHistory);
    historyService = fixture.debugElement.injector.get<ClrHistoryService>(ClrHistoryService);
    fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add', done => {
    const historyEntry: ClrHistoryModel = {
      username: 'admin',
      tenantId: '1',
      pageName: 'test1',
      title: 'test1',
      url: 'url1',
    };
    historyService.addHistoryEntry(historyEntry).subscribe();
    historyService.getHistory('admin', '1').subscribe(history => {
      expect(history.length).toEqual(1);
      done();
    });
  });

  it('should remove', done => {
    const historyEntry: ClrHistoryModel = {
      username: 'admin',
      tenantId: '1',
      pageName: 'test1',
      title: 'test1',
      url: 'url1',
    };
    historyService.addHistoryEntry(historyEntry).subscribe();
    historyService.getHistory('admin', '1').subscribe(history => {
      expect(history.length).toEqual(1);
      historyService.removeFromHistory(historyEntry).subscribe(() => {
        historyService.getHistory('admin', '1').subscribe(historyAfter => {
          expect(historyAfter.length).toEqual(0);
          done();
        });
      });
    });
  });

  it('encodeUTF8', done => {
    const czech = 'Škoda v čínštině';
    const chinese = '斯柯达👾';
    const historyEntry: ClrHistoryModel = {
      username: 'utf8',
      tenantId: '1',
      pageName: czech,
      title: chinese,
      url: 'url1',
    };
    historyService.getHistory('utf8', '1').subscribe(historyBefore => {
      expect(historyBefore.length).toEqual(0);
      historyService.addHistoryEntry(historyEntry).subscribe();
      historyService.getHistory('utf8', '1').subscribe(historyAfter => {
        expect(historyAfter.length).toEqual(1);
        const lastHistoryEntry = historyAfter[historyAfter.length - 1];
        expect(lastHistoryEntry.pageName).toEqual(czech);
        expect(lastHistoryEntry.title).toEqual(chinese);
        done();
      });
    });
  });

  it('wont update settings after onDestroy is called', fakeAsync(() => {
    const username = 'testUsername';
    component.username = username;
    historyService.setHistoryPinned(username, true);
    tick(1);
    expect(component.pinActivated).toBeTrue();

    component.ngOnDestroy();

    historyService.setHistoryPinned(username, false);
    tick(1);
    expect(component.pinActivated).toBeTrue();
  }));
});
