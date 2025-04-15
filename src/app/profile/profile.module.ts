import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { EmployeeProfileModule } from './employee-profile/employee-profile.module';
import { DoctorProfileModule } from './doctor-profile/doctor-profile.module';
import { PatientProfileModule } from './patient-profile/patient-profile.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeProfileModule,
    DoctorProfileModule,
    PatientProfileModule,
    ReactiveFormsModule,
   
  ],
  exports:[CommonModule]
})
export class ProfileModule {}
