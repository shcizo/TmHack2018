import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TogglPopupComponent } from '../toggl-popup/toggl-popup.component';
import { TogglService } from '../service/dev-ops.service';
import { EditEventPopupComponent } from '../edit-event-popup/edit-event-popup.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  viewDate: Date = new Date();

  events: CalendarEvent[];

  locale = 'en';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  apiKey = 'testapi';
  fromData: Date;
  toDate: Date;

  refresh: Subject<any> = new Subject();
  constructor(public dialog: MatDialog, public dialog2: MatDialog, public togglService: TogglService) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TogglPopupComponent, {
      width: '300px',
      data: { apiKey: this.apiKey, from: this.fromData, to: this.toDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.togglService
        .getToggleReport(result.data, result.from, result.to)
        .subscribe(r => {
          this.events = r.data.map(timeEntry => {
            return {
              id: timeEntry.id,
              start: new Date(timeEntry.start),
              end: new Date(timeEntry.end),
              title: timeEntry.description,
              actions: [
                {
                  label: '<i class="fa fa-fw fa-pencil"></i>',
                  onClick: ({ event }: { event: CalendarEvent }): void => {
                    const dialogRef2 = this.dialog2.open(EditEventPopupComponent, {
                      width: '300px',
                      data: event
                    });

                    dialogRef2.afterClosed().subscribe(e => {
                      this.events = this.events.map(ee => {
                        if (ee.id === e.id) {
                          return e;
                        }
                        return ee;
                      });
                    });
                  }
                }
              ]
            };
          });
        });
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
