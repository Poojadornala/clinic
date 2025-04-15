import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientProfileCardComponent } from './patient-profile-card/patient-profile-card.component';
import { PatientProfileEditComponent } from './patient-profile-edit/patient-profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { PatientEditComponent } from 'src/app/Modules/Patient/patient-edit/patient-edit.component';

@NgModule({
  declarations: [
    PatientProfileCardComponent,
    PatientProfileEditComponent,
    PatientDataComponent,
    PatientEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    TableModule,
    PaginatorModule,
    InputTextModule,
  ],
  exports: [
    PatientProfileCardComponent,
    PatientProfileEditComponent,
    PatientDataComponent,
  ],
})
export class PatientProfileModule {}
