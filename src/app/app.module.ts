import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportComponent } from './time-report/report/report.component';
import { FormsModule } from '@angular/forms';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import {DemoMaterialModule} from './material-module';
import { TogglPopupComponent } from './time-report/toggl-popup/toggl-popup.component';
// import { DevOpsService } from './time-report/service/dev-ops.service';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent,
    TogglPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DemoMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TogglPopupComponent]
})
export class AppModule { }
