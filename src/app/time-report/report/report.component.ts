import { Component, OnInit } from '@angular/core';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TogglPopupComponent } from '../toggl-popup/toggl-popup.component';
import { DevOpsService } from '../service/dev-ops.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Draggable event',
      // color: colors.yellow,
      start: new Date(),
      draggable: true
    },
    {
      title: 'A non draggable event',
      // color: colors.blue,
      start: new Date()
    }
  ];

  locale = 'en';

  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

  apiKey = 'testapi';
  fromData: Date;
  toDate: Date;

  refresh: Subject<any> = new Subject();
  constructor(public dialog: MatDialog, public devOpsService: DevOpsService) {}

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TogglPopupComponent, {
      width: '250px',
      data: { apiKey: this.apiKey, from: this.fromData, to: this.toDate }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  public getTask(): void {
    this.devOpsService
      .getTaskById(123)
      .subscribe(result => console.log(result));
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
