/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-spinner.demo',
  templateUrl: './progress-spinner.demo.html',
  styleUrls: ['./progress-spinner.demo.css'],
})
export class ProgressSpinnerDemo implements OnInit {
  loadingState = false;

  constructor() {}

  ngOnInit() {}

  startLoading() {
    this.loadingState = true;
  }

  endLoading() {
    this.loadingState = false;
  }
}
