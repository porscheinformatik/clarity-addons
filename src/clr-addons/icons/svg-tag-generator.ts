/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

const BADGED_CLASS_SUBSTRING = '--badged';
const ALERTED_CLASS_SUBSTRING = '--alerted';
const SOLID_CLASS = 'clr-i-solid';

/**
 * Class copied from Clarity as it is not accessible.
 *
 * @see {@link https://github.com/vmware/clarity/blob/0afa75bf6bf183bb76474f7c3b20ebc7dcf89263/packages/icons/src/utils/svg-tag-generator.ts}
 * @param content content of the SVG
 */
export function clrIconSVG(content: string): string {
  let classes: string = '';

  if (content.indexOf(BADGED_CLASS_SUBSTRING) > -1) {
    classes += 'can-badge ';
  }

  if (content.indexOf(ALERTED_CLASS_SUBSTRING) > -1) {
    classes += 'can-alert ';
  }

  if (content.indexOf(SOLID_CLASS) > -1) {
    classes += 'has-solid ';
  }

  let openingTag: string;
  if (classes) {
    openingTag = `<svg version="1.1" class="${classes}" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg" focusable="false" role="img">`;
  } else {
    openingTag = `<svg version="1.1" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
    xmlns="http://www.w3.org/2000/svg" focusable="false" role="img">`;
  }
  const closingTag = `</svg>`;

  return openingTag + content + closingTag;
}
