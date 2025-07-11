import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { ClrHistoryService } from '@porscheinformatik/clr-addons';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class RouteHistoryService {
  constructor(private readonly router: Router, private readonly historyService: ClrHistoryService) {}

  init(): void {
    this.router.events
      .pipe(filter((event): event is NavigationStart => event instanceof NavigationStart))
      .subscribe((event: RouterEvent) =>
        this.historyService
          .addHistoryEntry({
            tenantId: '1',
            pageName: event.url.substring(1),
            title: event.url.substring(1),
            url: event.url,
            username: 'me',
          })
          .subscribe()
      );
  }
}
