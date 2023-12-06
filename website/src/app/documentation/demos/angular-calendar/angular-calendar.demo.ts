import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { endOfDay, endOfYesterday, startOfDay, startOfYesterday } from 'date-fns';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'clr-angular-calendar-demo',
  templateUrl: './angular-calendar.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class AngularCalendarDemo extends ClarityDocComponent {
  stylesImport = `"styles": [
    "node_modules/angular-calendar/css/angular-calendar.css",
    "node_modules/@porscheinformatik/clr-addons/styles/clr-addons-phs.min.css",
  ],`;

  weekViewExampleCode = `
  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      title: 'Lorem Ipsum',
    },
    {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      title: 'Lorem Ipsum',
    },
    {
      start: startOfYesterday(),
      end: endOfYesterday(),
      title: 'Lorem Ipsum',
    },
  ];`;

  weekViewFormatExampleCode = `
  <mwl-calendar-week-view
  [viewDate]="viewDate"
  [events]="events"
  [headerTemplate]="customHeaderTemplate"
>
</mwl-calendar-week-view>

<ng-template
  #customHeaderTemplate
  let-days="days"
  let-locale="locale"
  let-dayHeaderClicked="dayHeaderClicked"
  let-eventDropped="eventDropped"
  let-trackByWeekDayHeaderDate="trackByWeekDayHeaderDate"
  let-dragEnter="dragEnter"
>
  <div class="cal-day-headers" role="row">
    <div
      class="cal-header"
      *ngFor="let day of days; trackBy: trackByWeekDayHeaderDate"
      [class.cal-past]="day.isPast"
      [class.cal-today]="day.isToday"
      [class.cal-future]="day.isFuture"
      [class.cal-weekend]="day.isWeekend"
      [ngClass]="day.cssClass"
      (mwlClick)="dayHeaderClicked.emit({ day: day, sourceEvent: $event })"
      mwlDroppable
      dragOverClass="cal-drag-over"
      (drop)="
  eventDropped.emit({
    event: $event.dropData.event,
    newStart: day.date
  })
"
      (dragEnter)="dragEnter.emit({ date: day.date })"
      tabindex="0"
      role="columnheader"
    >
      <b>{{ day.date | date : "EEE" }}</b>
      <br />
      <span>{{ day.date | date : "dd" }}</span>
    </div>
  </div>
</ng-template>`;

  dailyEvents: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Lorem Ipsum',
      cssClass: 'expand',
      end: endOfDay(new Date()),
      meta: {},
    },
  ];

  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      title: 'Lorem Ipsum',
    },
    {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      title: 'Lorem Ipsum',
    },
    {
      start: startOfYesterday(),
      end: endOfYesterday(),
      title: 'Lorem Ipsum',
    },
  ];

  constructor() {
    super('angular-calendar');
  }
}
