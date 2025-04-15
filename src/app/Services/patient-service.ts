import { Injectable } from '@angular/core';
import { Patient, PatientEdit, PatientPost } from '../Models/patient';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppointmentScheduler } from '../Models/appointment-scheduler';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  currentPatient: Patient;
  patients: Patient[] = [];
  finishedAppointmentsSubject = new Subject<{
    finishedAppointments: number;
    upcomingAppointments: number;
  }>();
  constructor(public http: HttpClient, public router: Router) {}

  baseURL = 'http://localhost:3000/patient/';
  profileURL = 'http://localhost:3000/appointmentScheduler/patientreports/';

  patientsList: PatientEdit[] = [];

  //getting All Patients
  getAllPatients() {
    return this.http.get<Patient[]>(this.baseURL);
  }

  getAllPatientsForEdit() {
    this.http.get<PatientEdit[]>(this.baseURL).subscribe((data) => {
      data.forEach((patient) => {
        this.patientsList.push(patient);
      });
    });
  }

  getPatientByID(id: string) {
    return this.http.get<Patient>(this.baseURL + id);
  }

  getPatientByIDForEdit(id: string) {
    return this.http.get<Patient>(this.baseURL + id);
  }

  addNewPatient(patient: PatientPost) {
    return this.http.post<PatientPost>(this.baseURL, patient);
  }

  updatePatientByID(patient: PatientEdit) {
    console.log(patient);
    return this.http.patch(this.baseURL, patient);
  }
  deletePatient(id: string) {
    return this.http.delete(this.baseURL + id);
  }
  setCurrentPatient(patient: Patient) {
    this.currentPatient = patient;
  }

  getAppointments(id: string) {
    console.log(id);
    return this.http.get<AppointmentScheduler[]>(this.profileURL + id);
  }
}
