import { Injectable } from '@angular/core';
import { Employee } from '../Models/employee';
import { Doctor } from '../Models/doctor';
import { Patient } from '../Models/patient';
import { Subject } from 'rxjs';
import { EmployeeService } from './employee.service';
import { DoctorService } from './doctor.service';
import { PatientService } from './patient-service';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  role: string = '';
  id: string = '';
  user: Employee | Doctor | Patient;
  userIsStillLogged: boolean;
  userIsStillLoged = new Subject<boolean>();
  userSubject = new Subject<Employee | Doctor | Patient>();
  isUserLogged = false;

  constructor(
    private employeeService: EmployeeService,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) {
    this.role = localStorage.getItem('role');
    this.id = localStorage.getItem('id');
    console.log('Iam profile service');
    this.getUser();
  }
  getUser() {
    switch (this.role) {
      case 'employee':
        this.employeeService.getById(this.id).subscribe((employee) => {
          this.employeeService.setCurrentEmployee(employee);
          this.user = employee;
          this.userSubject.next(employee);
        });
        break;
      case 'doctor':
        this.doctorService.getById(this.id).subscribe((doctor) => {
          this.doctorService.setCurrentDoctor(doctor);
          this.user = doctor;
          this.userSubject.next(doctor);
        });
        break;
      case 'patient':
        this.patientService.getPatientByID(this.id).subscribe((patient) => {
          this.user = patient;
          this.user.name = patient.Name;
          this.userSubject.next(patient);
          console.log(this.user);
        });
        break;
    }
  }
}
