import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PendingAppointmentScheduler } from '../Models/appointment-pending';
import { AppointmentScheduler } from '../Models/appointment-scheduler';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl= 'http://localhost:3000/appointmentScheduler/';

  constructor(public http:HttpClient) { }

  getAllAppointments(){
  console.log("from service")
  return this.http.get<AppointmentScheduler[]>(this.baseUrl)
  }

  getAppointmentGtToday(){
    return this.http.get<AppointmentScheduler[]>(this.baseUrl+'allreports')
    
  }

  addAppointment(appoint:AppointmentScheduler){
    return this.http.post<AppointmentScheduler>(this.baseUrl,appoint)
  }

  updateAppointment(appoint:AppointmentScheduler)
  {
    console.log(appoint)
 return  this.http.patch(this.baseUrl,appoint);
  }

  deleteAppointment(id:string)
  {
      return this.http.delete(this.baseUrl+id);

 }
}
