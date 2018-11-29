import { Component, OnInit, Inject } from '@angular/core';
import { ReportComponent } from '../report/report.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-event-popup',
  templateUrl: './edit-event-popup.component.html',
  styleUrls: ['./edit-event-popup.component.scss']
})
export class EditEventPopupComponent implements OnInit {

  constructor(public dialogRef2: MatDialogRef<ReportComponent>,
    @Inject(MAT_DIALOG_DATA) public event: any) {
      console.log(event);

    }

  ngOnInit() {
  }

}
