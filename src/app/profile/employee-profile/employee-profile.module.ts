import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeProfileCardComponent } from './employee-profile-card/employee-profile-card.component';
import { EmployeeProfileEditComponent } from './employee-profile-edit/employee-profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeModule } from 'src/app/Modules/employee/employee.module';
import { EmployeeEditComponent } from 'src/app/Modules/employee/employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    EmployeeProfileCardComponent,
    EmployeeProfileEditComponent,
    EmployeeEditComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [EmployeeProfileCardComponent, EmployeeProfileEditComponent],
})
export class EmployeeProfileModule {}
