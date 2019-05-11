/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

var WAIT_TIME = 5000;
var WAIT_LOAD_TIME = 1000;

gemini.suite('hamburger', child => {
  gemini.suite('layout', child => {
    child
      .setUrl('/')
      .before((actions, find) => {
        actions
          .setWindowSize(800, 700)
          .waitForElementToShow('.header-hamburger-trigger', WAIT_TIME)
          .wait(WAIT_LOAD_TIME);
      })
      .setCaptureElements('.header-hamburger-trigger')
      .capture('closed')
      .capture('opened', function(actions, find) {
        actions.click('.header-hamburger-trigger').wait(WAIT_LOAD_TIME);
      });
  });
});
