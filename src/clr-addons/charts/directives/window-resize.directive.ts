import { DestroyRef, Directive, inject, input, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { skip } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ScreenStateService } from './screen-state.service';

@Directive({
  selector: '[cngWindowResize]',
})
export class WindowResizeDirective implements OnInit {
  public readonly debounce = input<number>(250);
  public readonly includeFirst = input<boolean>(false);
  public readonly windowResize = output<number>({ alias: 'cngWindowResize' });

  private readonly screenStateService = inject(ScreenStateService);
  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    const skipCount = this.includeFirst() ? 0 : 1;
    this.screenStateService
      .getScreenWidthChanged()
      .pipe(takeUntilDestroyed(this.destroyRef), skip(skipCount), debounceTime(this.debounce()))
      .subscribe(width => this.windowResize.emit(width));
  }
}
