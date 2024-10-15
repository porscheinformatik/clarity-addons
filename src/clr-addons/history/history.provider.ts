import { InjectionToken } from '@angular/core';
import { ClrHistoryModel } from './history-model.interface';

export const HISTORY_PROVIDER = new InjectionToken<any>('HISTORY_PROVIDER');

/**
 * Interface to be implemented by a history provider to adjust the behavior of the history components.
 * */
export abstract class HistoryProvider {
  /**
   * Modifies the history entries before they are displayed. The list of modified entries will be shown to the user.
   *
   * @param entries The history entries before modification
   * @returns The modified history entries
   */
  abstract getModifiedHistoryEntries(entries: ClrHistoryModel[]): ClrHistoryModel[];
}
