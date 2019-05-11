/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

var WAIT_TIME = 5000;
var WAIT_LOAD_TIME = 1000;

gemini.suite('flowbar', child => {
  gemini.suite('layout', child => {
    child
      .setUrl('/flow-bar')
      .before((actions, find) => {
        actions.waitForElementToShow('clr-flow-bar-demo', WAIT_TIME);
        actions.wait(WAIT_LOAD_TIME);
        this.next = find('.btn-primary');
      })
      .setCaptureElements('clr-flow-bar-demo')
      .capture('default')
      .capture('clicked-next', (actions, find) => {
        actions.click(this.next);
        actions.wait(WAIT_LOAD_TIME);
      });
  });
});
