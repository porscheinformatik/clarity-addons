/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * Zoneless replacement for Angular's fakeAsync tick().
 *
 * Waits for the specified timeout using async/await.
 * Intended for flushing timers in zoneless tests where fakeAsync cannot be used.
 *
 * Examples:
 *   await tickAsync();      // flushes a 0ms timeout (recommended)
 *   await tickAsync(500);   // waits 500ms in real time (slows down test)
 *
 * @param delayMs Time to wait in milliseconds (default 0)
 */
export function tickAsync(delayMs = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delayMs));
}
