import { ClrHistoryHttpService, ClrHistoryModel } from '@porscheinformatik/clr-addons';
import { Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MockClrHistoryHttpService implements ClrHistoryHttpService {
  private readonly history: ClrHistoryModel[] = this.readFromLocalStorage();

  addHistoryEntry(entry: ClrHistoryModel): Observable<void> {
    return of(null).pipe(
      tap(() => {
        this.history.push(entry);
        this.saveToLocalStorage();
      })
    );
  }

  getHistory(_username: string, _tenantId: string): Observable<ClrHistoryModel[]> {
    return of([...this.history].reverse().slice(1, 4)); // Return the last 3 entries, excluding the current one
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
          this.saveToLocalStorage();
        }
      })
    );
  }

  private saveToLocalStorage() {
    if (this.history.length > 5) {
      this.history.splice(0, this.history.length - 5);
    }
    localStorage.setItem('clr.history.demo', JSON.stringify(this.history));
  }

  private readFromLocalStorage(): ClrHistoryModel[] {
    return JSON.parse(localStorage.getItem('clr.history.demo') || '[]') as ClrHistoryModel[];
  }
}
