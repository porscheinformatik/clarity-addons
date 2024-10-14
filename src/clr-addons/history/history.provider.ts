import { InjectionToken } from '@angular/core';
import { ClrHistoryModel } from './history-model.interface';

export const HISTORY_PROVIDER = new InjectionToken<any>('HISTORY_PROVIDER');

export abstract class HistoryProvider {
  abstract modifyHistoryEntries(entries: ClrHistoryModel[]): void;
}
