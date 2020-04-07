/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

const entityMap: Map<string, string> = new Map([
  ['&', '&amp;'],
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['"', '&quot;'],
  ["'", '&#39;'],
  ['/', '&#x2F;'],
]);

export function escapeHtml(source: string): string {
  return source.replace(/[&<>"'/]/g, s => entityMap.get(s));
}

export function escapeRegex(s: string): string {
  return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}
