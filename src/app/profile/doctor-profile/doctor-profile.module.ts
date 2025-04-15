import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorProfileCardComponent } from './doctor-profile-card/doctor-profile-card.component';
import { DoctorProfileEditComponent } from './doctor-profile-edit/doctor-profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DoctorDataComponent } from './doctor-data/doctor-data.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from '../../app-routing.module';
import { DoctorEditComponent } from 'src/app/doctor/doctor-edit/doctor-edit.component';

@NgModule({
  declarations: [
    DoctorProfileCardComponent,
    DoctorProfileEditComponent,
    DoctorDataComponent,
    DoctorEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
    AppRoutingModule,
  ],
  exports: [
    DoctorProfileCardComponent,
    DoctorProfileEditComponent,
    DoctorDataComponent,
    BrowserAnimationsModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
  ],
})
export class DoctorProfileModule {}
