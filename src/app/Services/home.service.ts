import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class HomeService {
  docsURL: string = 'http://localhost:3000/doctor/count';
  public docsCount;
  appointmentsURL: string = 'http://localhost:3000/appointmentScheduler/count';
  public appointmentsCount;
  patientURL: string = 'http://localhost:3000/patient/count';
  public patientsCount;
  clinicsURL: string = 'http://localhost:3000/clinic/count';
  public clinicsCount;

  constructor(public http: HttpClient) { }
  getDoctorsCount() {
    return this.http.get(this.docsURL)

  }
  getAppointmentsCount() {
    return this.http.get(this.appointmentsURL)

  }
  getPatientsCount() {
    return this.http.get(this.patientURL)
  }
  getClinicsCount() {
    return this.http.get(this.clinicsURL)
  }
}
