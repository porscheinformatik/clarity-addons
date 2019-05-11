/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

var WAIT_TIME = 5000;
var WAIT_LOAD_TIME = 1000;

gemini.suite('cards', child => {
  gemini.suite('selected', child => {
    child
      .setUrl('/cards')
      .before((actions, find) => {
        actions.waitForElementToShow('.clr-example1', WAIT_TIME).wait(WAIT_LOAD_TIME);
      })
      .setCaptureElements('.clr-example1')
      .capture('default');
  });

  gemini.suite('active', child => {
    child
      .setUrl('/cards')
      .before((actions, find) => {
        actions.waitForElementToShow('.clr-example2', WAIT_TIME).wait(WAIT_LOAD_TIME);
      })
      .setCaptureElements('.clr-example2')
      .capture('default');
  });

  gemini.suite('selectable', child => {
    child
      .setUrl('/cards')
      .before((actions, find) => {
        actions.waitForElementToShow('.clr-example3', WAIT_TIME).wait(WAIT_LOAD_TIME);
      })
      .setCaptureElements('.clr-example3')
      .capture('default')
      .capture('hovered', (actions, find) => {
        actions.mouseMove('.clr-example3');
      });
  });

  gemini.suite('clickable', child => {
    child
      .setUrl('/cards')
      .before((actions, find) => {
        actions.waitForElementToShow('.clr-example4', WAIT_TIME).wait(WAIT_LOAD_TIME);
      })
      .setCaptureElements('.clr-example4')
      .capture('default')
      .capture('hovered', (actions, find) => {
        actions.mouseMove('.clr-example4');
      });
  });
});
