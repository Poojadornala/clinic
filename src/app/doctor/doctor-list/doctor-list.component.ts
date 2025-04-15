import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { AppointmentScheduler } from 'src/app/Models/appointment-scheduler';

import { Doctor } from 'src/app/Models/doctor';
import { AuthService } from 'src/app/Services/auth.service';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  providers: [],
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];
  appointments: AppointmentScheduler[] = [];
  pageNo: number;
  pageItems;
  items: MegaMenuItem[];
  search: string = '';
  sep: string = 'Speciality';
  tag: string;
  role: String = '';
  constructor(
    private doctorServices: DoctorService,
    private profileService: ProfileService,
    public appointmentService: AppointmentService
  ) {}
  ngOnInit() {
    this.role = this.profileService.role;
    this.function3adia();
    if (this.doctorServices.specialityParameter === '') {
      this.items = [
        {
          label: 'Speciality',
          icon: 'pi pi-fw pi-cog',
          items: [
            [
              {
                label: 'Speciality',
                items: [
                  { label: 'Internist' },
                  { label: 'Optometrist' },
                  { label: 'orthopedist' },
                  { label: 'Dentist' },
                  { label: 'Urologist' },
                  { label: 'Surgeon' },
                ],
              },
            ],
          ],
        },
      ];
    }

    this.appointmentService.getAllAppointments().subscribe((appointments) => {
      this.appointments = appointments;
      this.function3adia();
    });
  }
  searchByName(event) {
    if (this.search === '') this.pageItems = this.doctors;
    this.pageItems = this.pageItems.filter((doc) => {
      return doc.name
        .toLocaleLowerCase()
        .startsWith(`${this.search.toLocaleLowerCase()}`);
    });

    let pageCount = this.pageItems.length;
    this.pageNo = pageCount;
  }

  page(event) {
    const first = event.first;
    const row = event.rows;

    this.pageItems = this.doctors.slice(first, first + row);
  }
  filterBySpec(event) {
    this.sep = event.target.innerText;
    this.tag = event.target.tagName;
    if (this.sep !== '') {
      if (
        this.sep !== 'Speciality' &&
        this.sep != '' &&
        (this.tag === 'SPAN' || this.tag === 'A') &&
        this.search === undefined
      ) {
        this.pageItems = this.doctors.filter((doc) => {
          return doc.speciality === this.sep;
        });
        let pageCount = this.pageItems.length;
        this.pageNo = pageCount;
      } else if (
        this.sep !== 'Speciality' &&
        (this.tag === 'SPAN' || this.tag === 'A') &&
        this.search !== undefined
      ) {
        this.pageItems = this.doctors.filter((doc) => {
          return doc.speciality === this.sep;
        });
        let pageCount = this.pageItems.length;
        this.pageNo = pageCount;
      }
    }
  }
  // deleteDoctor(id: string, index: number) {
  //   console.log(id, index);
  //   let confirmDeleted = confirm('Are you sure?');
  //   if (confirmDeleted) {
  //     this.doctorServices.delete(id).subscribe();
  //     //this.doctorServices.doctors.splice(index, 1);
  //     this.pageItems.splice(index, 1);
  //   }
  // }
  function3adia(): any {
    this.pageItems = this.doctorServices.getAll().subscribe((data) => {
      this.doctorServices.doctors = data;
      if (this.doctorServices.specialityParameter == '') {
        this.pageItems = this.doctorServices.doctors;
      } else {
        this.pageItems = this.doctorServices.doctors.filter((doc) => {
          return doc.speciality == this.doctorServices.specialityParameter;
        });
      }
      this.doctors = this.pageItems;
      this.pageNo = this.doctors.length;
      this.page({ first: 0, rows: 9 });
    });
    this.page({ first: 0, rows: 9 });
  }

  getFinishedCount(id: string) {
    let total = this.appointments.filter(
      (appointment) => appointment.doctorID == id
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
