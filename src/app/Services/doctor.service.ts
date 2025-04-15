import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Doctor, DoctorPatch } from '../Models/doctor';
import { FormControl } from '@angular/forms';
import { AppointmentScheduler } from '../Models/appointment-scheduler';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  currentDoctor: Doctor;
  finishedAppointmentsSubject = new Subject<{
    finishedAppointments: number;
    upcomingAppointments: number;
  }>();
  baseUrl = 'http://localhost:3000/doctor/';
  profileUrl = 'http://localhost:3000/appointmentScheduler/doctorreports/';

  photoFile: File;
  doctors: Doctor[] = [];
  doctor;
  specialityParameter = '';

  getAll() {
    return this.http.get<Doctor[]>(this.baseUrl);
  }

  loadDoctors() {
    this.getAll().subscribe((data) => (this.doctors = data));
  }
  getById(id: string) {
    return this.http.get<Doctor>(this.baseUrl + id);
  }

  uploadPhoto(doctor: DoctorPatch, formData) {
    return this.http.patch<DoctorPatch>(this.baseUrl + 'uploadPhoto', formData);
  }

  addDoctor(doctor: Doctor) {
    return this.http.post<Doctor>(this.baseUrl, doctor);
  }

  editDoctor(doctor: DoctorPatch) {
    console.log(doctor);
    return this.http.patch<DoctorPatch>(this.baseUrl, doctor);
  }

  delete(id: string) {
    return this.http.delete<Doctor>(this.baseUrl + id);
  }
  constructor(public http: HttpClient) {}

  forbiddenUserNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  forbiddenNumbers(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNumbers.indexOf(control.value) !== -1)
      return { 'Number is forbidden': true };
    return null;
  }

  onSelectPhoto(event) {
    this.photoFile = event.target.files[0];
    console.log(this.photoFile.name);
    console.log(this.doctor);
  }
  onUploadPhoto() {
    const formData: FormData = new FormData();
    formData.append('photo', this.photoFile, this.photoFile.name);
    //const doc = { id: this.doctor.id, filename: formData };

    this.uploadPhoto(this.doctor, formData).subscribe(
      (response) => {
        console.log('Success:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  setCurrentDoctor(doctor: Doctor) {
    this.currentDoctor = doctor;
  }

  getAppointments(id: string) {
    console.log(id);
    return this.http.get<AppointmentScheduler[]>(this.profileUrl + id);
  }
}
