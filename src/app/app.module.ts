import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportComponent } from './time-report/report/report.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import {DemoMaterialModule} from './material-module';
import { TogglPopupComponent } from './time-report/toggl-popup/toggl-popup.component';
import { TogglService } from './time-report/service/dev-ops.service';
import { EditEventPopupComponent } from './time-report/edit-event-popup/edit-event-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    TogglPopupComponent,
    EditEventPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DemoMaterialModule
  ],
  providers: [TogglService],
  bootstrap: [AppComponent],
  entryComponents: [TogglPopupComponent, EditEventPopupComponent]
})
export class AppModule { }
