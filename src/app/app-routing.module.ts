import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClinicComponent } from './Modules/clinic/add-clinic/add-clinic.component';
import { ClinicListComponent } from './Modules/clinic/clinic-list/clinic-list.component';
import { EmployeeListComponent } from './Modules/employee/employee-list/employee-list.component';
import { AddMedicineComponent } from './Modules/medicine/add-medicine/add-medicine.component';
import { EditMedicineComponent } from './Modules/medicine/edit-medicine/edit-medicine.component';
import { ListMedicineComponent } from './Modules/medicine/list-medicine/list-medicine.component';
import { DoctorListComponent } from './doctor/doctor-list/doctor-list.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { InoviceListComponent } from './Modules/invoice/inovice-list/inovice-list.component';
import { InvoicePaidComponent } from './Modules/invoice/invoice-paid/invoice-paid.component';
import { InvoiceUnpaidComponent } from './Modules/invoice/invoice-unpaid/invoice-unpaid.component';
import { PatientListComponent } from './Modules/Patient/patient-list/patient-list.component';
import { AuthComponent } from './shared/auth/auth.component';
import { AddAppointmentComponent } from './Modules/appointment/add-appointment/add-appointment.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Services/auth.guard.service';
import { PatientReserveComponent } from './Modules/appointment/patient-reserve/patient-reserve.component';
import { AppointmentPageComponent } from './Modules/appointment/appointment-page/appointment-page.component';
import { LoggedGuard } from './Services/logged.guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clinic', component: ClinicListComponent },
  { path: 'clinic/add', component: AddClinicComponent },
  // { path: 'add-medicine', component: AddMedicineComponent },
  // { path: 'edit-medicine', component: EditMedicineComponent },
  { path: 'list-medicine', component: ListMedicineComponent },
  { path: 'employee', component: EmployeeListComponent },
  { path: 'doctor', component: DoctorListComponent },
  { path: 'patient', component: PatientListComponent },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent,
  },
  { path: 'auth', canActivate: [LoggedGuard], component: AuthComponent },
  { path: 'appointment', component: AppointmentPageComponent },
  { path: 'appointment/reserve', component: PatientReserveComponent },
  { path: 'invoice', component: InoviceListComponent },
  { path: 'invoice/:id', component: InvoicePaidComponent },
  { path: 'invoice/faild/:id', component: InvoiceUnpaidComponent },

  { path: '**', component: NotFoundComponent },
  // {path:"clinci/update/:id",component:u
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
