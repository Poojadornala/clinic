import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentScheduler } from 'src/app/Models/appointment-scheduler';
import { Patient } from 'src/app/Models/patient';
import { PatientService } from 'src/app/Services/patient-service';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css'],
})
export class PatientDataComponent {
  @Input() patient: Patient;
  id :string
  appointments: AppointmentScheduler[];
  myFilter: AppointmentScheduler[];
  finishedAppointment:AppointmentScheduler[];
  upcommingAppointment:AppointmentScheduler[];

  constructor(public patientService: PatientService) {
    console.log(this.patient);
    this.id=localStorage.getItem("id");
  }

  ngOnInit() {
    this.getData();
  }

 

  getData() {
    this.patientService.getAppointments(this.id).subscribe((data) => {
      this.appointments = data;
      let finishedCount = this.getFinishedCount();
      this.getUpcommingAppointment();
      this.patientService.finishedAppointmentsSubject.next({
        finishedAppointments: finishedCount,
        upcomingAppointments: this.appointments.length - finishedCount,
      });
    });
  }
  getFinishedCount() {
   this.finishedAppointment = this.appointments.filter(
      (appointment) =>
        new Date(appointment.date).getTime() < new Date().getTime()
    );
   
    return this.finishedAppointment.length;
  }


  getUpcommingAppointment()
  {
      this.upcommingAppointment = this.appointments.filter(
      (appointment) =>
        new Date(appointment.date).getTime() > new Date().getTime()
        
    );
  

  }
  filterFinishedData(event: any)
  {
    if (event.target.value != '') {
      this.myFilter = this.finishedAppointment.filter((item) =>
        item.doctorID['name']
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      this.finishedAppointment = this.myFilter;
    } 
    else this.getData();
  }

  filterupcommingData(event:any)
  {
    if (event.target.value != '') {
      this.myFilter = this.upcommingAppointment.filter((item) =>
        item.doctorID['name']
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      this.upcommingAppointment = this.myFilter;
    } 
    else this.getData();
  }

}
