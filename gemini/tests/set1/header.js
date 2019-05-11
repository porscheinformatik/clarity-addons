/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

var WAIT_TIME = 5000;
var WAIT_LOAD_TIME = 1000;

gemini.suite('header', child => {
  gemini.suite('layout', child => {
    child
      .setUrl('/cards')
      .before((actions, find) => {
        actions.waitForElementToShow('.header', WAIT_TIME).wait(WAIT_LOAD_TIME);
      })
      .setCaptureElements('.header')
      .capture('default');
  });
});
