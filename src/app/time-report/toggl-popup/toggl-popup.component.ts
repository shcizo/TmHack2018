import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'app-toggl-popup',
  templateUrl: './toggl-popup.component.html',
  styleUrls: ['./toggl-popup.component.scss']
})
export class TogglPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);

  }

}
