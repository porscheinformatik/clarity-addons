import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { ClrHistoryService } from '@porscheinformatik/clr-addons';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class RouteHistoryService {
  constructor(private router: Router, private historyService: ClrHistoryService) {}

  init(): void {
    this.router.events
      .pipe(filter((event): event is NavigationStart => event instanceof NavigationStart))
      .subscribe((event: RouterEvent) =>
        this.historyService.addHistoryEntry({
          context: { tenantId: '1' },
          pageName: event.url.substr(1),
          title: event.url.substr(1),
          url: event.url,
          username: 'me',
        })
      );
  }
}
