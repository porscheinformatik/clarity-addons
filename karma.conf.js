/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

module.exports = function (karma) {
  'use strict';

  const config = {
    autoWatch: true,
    basePath: '',
    frameworks: ['jasmine', 'jasmine-matchers', '@angular-devkit/build-angular'],
    plugins: [
      // Frameworks
      require('karma-jasmine'),
      require('karma-jasmine-matchers'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('@alasdair/karma-scss-preprocessor'),
      // Reporters
      require('karma-jasmine-html-reporter'),
      require('karma-htmlfile-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha-reporter'),
      require('karma-notify-reporter'),
      // Launchers
      require('karma-chrome-launcher'),
    ],
    files: [
      // Custom Elements
      {
        pattern: './node_modules/@webcomponents/custom-elements/custom-elements.min.js',
        included: true,
        watched: false,
      },
      // Clarity Core
      {
        pattern: './node_modules/@cds/core/global.min.css',
        included: true,
        watched: false,
      },
      // Clarity Angular
      {
        pattern: './node_modules/@clr/ui/clr-ui.min.css',
        included: true,
        watched: false,
      },
      // Clarity Addons
      {
        pattern: './src/clr-addons/themes/phs/phs-theme.scss',
        included: true,
        watched: true,
      },

      // Entry point to all our spec files
      { pattern: './tests/tests.entry.ts', watched: false },
    ],
    preprocessors: {
      'src/**/*.scss': ['scss'],
    },
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    reporters: ['mocha', 'coverage-istanbul', 'html', 'notify'],
    htmlReporter: {
      outputFile: './reports/unit/index.html',
      useLegacyStyle: true,
      useCompactStyle: true,
    },
    scssPreprocessor: {
      options: {
        sourceMap: true,
        includePaths: ['node_modules'],
      },
    },
    coverageIstanbulReporter: {
      dir: './reports/coverage/',
      fixWebpackSourcePaths: true,
      reports: ['html', 'lcovonly', 'cobertura'],
    },
    browsers: ['ChromeHeadless'],
    browserNoActivityTimeout: 100000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    port: 9090,
    runnerPort: 9191,
    colors: true,
    logLevel: karma.LOG_INFO,
    singleRun: process.env.TRAVIS ? true : false,
    concurrency: Infinity,
    captureTimeout: 120000,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: ['--headless', '--disable-gpu', '--remote-debugging-port=9222'],
      },
    },
    mochaReporter: {
      ignoreSkipped: true,
    },
  };

  karma.set(config);
};
