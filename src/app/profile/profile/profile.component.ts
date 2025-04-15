import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from 'src/app/Models/doctor';
import { Employee } from 'src/app/Models/employee';
import { Patient } from 'src/app/Models/patient';
import { DoctorService } from 'src/app/Services/doctor.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { PatientService } from 'src/app/Services/patient-service';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  role: string;
  id: string;
  user: Employee | Doctor | Patient;
  editClick = false;
  constructor(
    private employeeService: EmployeeService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private profileService: ProfileService
  ) {
    this.role = this.profileService.role;
    this.id = this.profileService.id;
  }
  ngOnInit(): void {
  

    console.log(this.profileService.role);
    console.log(this.profileService.id);
    switch (this.profileService.role) {
      case 'employee':
        this.employeeService
          .getById(this.profileService.id)
          .subscribe((employee) => {
            this.employeeService.setCurrentEmployee(employee);
            this.user = employee;
            this.profileService.userSubject.next(employee);
          });
        break;
      case 'doctor':
        this.doctorService
          .getById(this.profileService.id)
          .subscribe((doctor) => {
            this.doctorService.setCurrentDoctor(doctor);
            this.user = doctor;
            this.profileService.userSubject.next(doctor);
          });
        break;
      case 'patient':
        this.patientService
          .getPatientByID(this.profileService.id)
          .subscribe((patient) => {
            this.user = patient;
            this.user.name = patient.Name;
            this.profileService.userSubject.next(patient);
            console.log(this.user);
          });
        break;
    }
  }
}
