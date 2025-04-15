import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PendingAppointmentScheduler } from '../Models/appointment-pending';

@Injectable({
  providedIn: 'root'
})
export class PendingAppointmentService {

  
  pendingUrl='http://localhost:3000/appointmentScheduler/pending/';

  constructor(public http:HttpClient) { }

 

  

 addPendingAppointment(pending:PendingAppointmentScheduler )
 {
     return this.http.post(this.pendingUrl,pending) ;
 }

 getAllpending()
 {
  return this.http.get<PendingAppointmentScheduler[]>(this.pendingUrl);
 }


 deletePending(id:string)
 {
 return this.http.delete(this.pendingUrl+id);
 }
}
