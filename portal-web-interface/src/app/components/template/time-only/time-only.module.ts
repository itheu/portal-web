import { TimeOnlyComponent } from './time-only.component';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    FormsModule
  ],
  declarations: [ TimeOnlyComponent ],
  bootstrap:    [ TimeOnlyComponent ]
})

export class TimeOnlyModule { }
