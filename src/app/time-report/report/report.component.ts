import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { Subject, of, empty } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TogglPopupComponent } from '../toggl-popup/toggl-popup.component';
import { TogglService } from '../service/dev-ops.service';
import { EditEventPopupComponent } from '../edit-event-popup/edit-event-popup.component';
import { concatMap, map, expand, take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  view = 'month';

  viewDate: Date = new Date();

  events = new Array<CalendarEvent>();

  locale = 'en';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  apiKey = 'testapi';
  fromData: Date;
  toDate: Date;

  refresh: Subject<any> = new Subject();
  constructor(public dialog: MatDialog, public togglService: TogglService) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TogglPopupComponent, {
      width: '300px',
      data: { apiKey: this.apiKey, from: this.fromData, to: this.toDate }
    });

    dialogRef
      .afterClosed()
      .pipe(
        concatMap(result => {
          return this.togglService
            .getToggleReport(result.apiKey, result.from, result.to);
        }),
        map((timeEntry: any) => {
          console.log(timeEntry.data);

          return timeEntry.data.map(e => {
            return {
              id: e.id,
              start: new Date(e.start),
              end: new Date(e.end),
              title: e.description
            };
          });
        })
      )
      .subscribe((result: any) => {
        if (result && result.length) {
          this.events = result;
          this.events.forEach(event => {
            const nn = Number(event.title);
            if (!isNaN(nn)) {
              this.togglService.getTaskInfo(nn).subscribe(workitem => {
                if (workitem) {
                  this.events = this.events.map(e => {
                    if (e.id === event.id) {
                      return { ...e, title: workitem.fields['System.Title'] };
                    }
                    return e;
                  });
                }
              });
            }
          });
        }
      });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
