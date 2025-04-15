import { Component } from '@angular/core';
import { AppointmentScheduler } from 'src/app/Models/appointment-scheduler';
import { Patient } from 'src/app/Models/patient';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { PatientService } from 'src/app/Services/patient-service';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent {
  //patients Array to recieve patients in from DB
  public patients: Patient[] = [];
  pageItems: Patient[] = [];
  appointments: AppointmentScheduler[] = [];
  search: string = '';
  pageNo: number;
  role: String = '';

  first: number;
  row: number;
  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.role = this.profileService.role;

    this.appointmentService.getAllAppointments().subscribe((appointments) => {
      this.appointments = appointments;
      this.getAll();
    });
  }
  getAll() {
    this.patientService.getAllPatients().subscribe((data) => {
      this.patientService.patients = data;
      this.patients = data;
      this.pageNo = this.patients.length;
      this.page({ first: 0, rows: 9 });
    });
  }

  // deletePatient(id: string, index: number) {
  //   this.patientService.deletePatient(id).subscribe((response) => {
  //     console.log(response);
  //     this.patients.splice(index, 1);
  //     console.log(this.patients);
  //   });
  // }

  page(event) {
    this.first = event.first;
    this.row = event.rows;

    this.pageItems = this.patients.slice(this.first, this.first + this.row);
  }

  searchByName(event) {
    if (this.search === '') {
      this.patients = this.patientService.patients.slice();
    } else {
      this.patients = this.patients.filter((patient) => {
        return patient.Name.toLocaleLowerCase().startsWith(
          `${this.search.toLocaleLowerCase()}`
        );
      });
    }
    // this.pageItems = [];
    // this.pageNo = 0;
    //console.log(this.pageItems.length);
    // this.pageItems = this.employees.slice(0, 9);
    let pageCount = this.patients.length;
    this.pageNo = pageCount;
    this.page({ first: this.first, rows: this.row });
  }

  getFinishedCount(id: string) {
    let total = this.appointments.filter(
      (appointment) => appointment.patientID == id
    );
    let finishedAppointments = total.filter(
      (appointment) =>
        new Date(appointment.date).getTime() < new Date().getTime()
    );

    return {
      finished: finishedAppointments.length,
      upcoming: total.length - finishedAppointments.length,
    };
  }
}
