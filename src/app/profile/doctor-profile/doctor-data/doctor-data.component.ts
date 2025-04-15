import { Doctor } from 'src/app/Models/doctor';
import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { DoctorService } from 'src/app/Services/doctor.service';

import { AppointmentScheduler } from 'src/app/Models/appointment-scheduler';

@Component({
  selector: 'app-doctor-data',
  templateUrl: './doctor-data.component.html',
  styleUrls: ['./doctor-data.component.css'],
})
export class DoctorDataComponent {
  @Input() doctor: Doctor;
  appointments: AppointmentScheduler[] = [];
  myFilter: AppointmentScheduler[] = [];
  id: string;
  finishedAppointment:AppointmentScheduler[];
  upcommingAppointment:AppointmentScheduler[];
  constructor(public doctorService: DoctorService) {
    this.id = localStorage.getItem('id');

  }

 

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.doctorService.getAppointments(this.id).subscribe((data) => {
      console.log(data);
      this.appointments = data;
      this.myFilter = this.appointments;
      let finishedCount = this.getFinishedCount();
      this.getUpcommingAppointment();
      this.doctorService.finishedAppointmentsSubject.next({
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
        item.patientID['Name']
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
        item.patientID['Name']
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      this.upcommingAppointment = this.myFilter;
    } 
    else this.getData();
  }

  
}