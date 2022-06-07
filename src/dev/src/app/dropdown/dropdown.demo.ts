/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { Observable, interval, map } from 'rxjs';

@Component({
  selector: 'clr-dropdown-demo',
  templateUrl: './dropdown.demo.html',
})
export class DropdownDemo implements OnInit {
  public asyncProducer$: Observable<boolean>;

  public ngOnInit(): void {
    this.asyncProducer$ = interval(5000).pipe(map(v => v % 2 === 0));
  }

  public getDemoArrayWithSize(size: number): number[] {
    return [...Array(size).keys()];
  }
}
