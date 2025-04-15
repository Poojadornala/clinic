import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { PatientProfileModule } from 'src/app/profile/patient-profile/patient-profile.module';

@NgModule({
  declarations: [
    PatientListComponent,
    PatientAddComponent,
    // PatientEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginatorModule,
    RouterModule,
    PatientProfileModule,
  ],
  exports: [PatientListComponent, PatientAddComponent],
})
export class PatientModule {}
