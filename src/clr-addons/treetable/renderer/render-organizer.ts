/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TreetableRenderStep } from './render-step.enum';

@Injectable()
export class TreetableRenderOrganizer {
  protected _renderStep: Subject<TreetableRenderStep> = new Subject<TreetableRenderStep>();
  public get renderStep(): Observable<TreetableRenderStep> {
    return this._renderStep.asObservable();
  }

  public filterRenderSteps(step: TreetableRenderStep) {
    return this.renderStep.pipe(filter(testStep => step === testStep));
  }

  private alreadySized = false;

  public widths: number[] = [];

  public resize() {
    this.widths.length = 0;
    if (this.alreadySized) {
      this._renderStep.next(TreetableRenderStep.CLEAR_WIDTHS);
    }
    this._renderStep.next(TreetableRenderStep.COMPUTE_COLUMN_WIDTHS);
    this._renderStep.next(TreetableRenderStep.ALIGN_COLUMNS);
    this._renderStep.next(TreetableRenderStep.UPDATE_ROW_WIDTH);
    this.alreadySized = true;
  }
}
