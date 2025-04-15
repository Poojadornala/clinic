import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { MatTabsModule } from '@angular/material/tabs';
import { ButtonModule } from 'primeng/button';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PatientReserveComponent } from './patient-reserve/patient-reserve.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';
import { DoctorProfileModule } from 'src/app/profile/doctor-profile/doctor-profile.module';

@NgModule({
  declarations: [
    AddAppointmentComponent,
    PatientReserveComponent,
    AppointmentListComponent,
      PendingListComponent,
    AppointmentPageComponent,
   

  ],
  imports: [

CommonModule,ReactiveFormsModule,MatTabsModule,InputTextModule,BrowserModule,ConfirmPopupModule,
BrowserAnimationsModule,  TableModule,PaginatorModule,ButtonModule,MatButtonModule,MatFormFieldModule,MatSelectModule,
CalendarModule,DoctorProfileModule
],
exports:[TableModule,AddAppointmentComponent,PaginatorModule,PatientReserveComponent,AppointmentPageComponent]
})
export class AppointmentModule { }
