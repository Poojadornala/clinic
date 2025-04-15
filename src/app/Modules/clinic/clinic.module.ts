import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { AddClinicComponent } from './add-clinic/add-clinic.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { UpdateClinicComponent } from './update-clinic/update-clinic.component'
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';



@NgModule({
  declarations: [
    ClinicListComponent,
    AddClinicComponent,
    UpdateClinicComponent,
    
  ],
  imports: [
    CommonModule,RouterModule,  FormsModule,TableModule,InputTextModule
  ],
  exports:[ClinicListComponent,AddClinicComponent]
  
})
export class ClinicModule { }
