import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from 'src/app/Models/doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor-profile-card',
  templateUrl: './doctor-profile-card.component.html',
  styleUrls: [
    './doctor-profile-card.component.css',
    './../../profile/profile.component.css',
  ],
})
export class DoctorProfileCardComponent implements OnInit {
  @Input() doctor: Doctor;
  @Input() count = { finished: 0, upcoming: 0 };
  @Input() index: number = 0;
  @Input() mode: string;
  @Input() role: String = '';
  selectedFile: File;
  finishedAppointments: number = 0;
  upcomingAppointments: number = 0;
  constructor(private doctorService: DoctorService) {}
  ngOnInit(): void {
    this.finishedAppointments = this.count.finished;
    this.upcomingAppointments = this.count.upcoming;
    this.doctorService.finishedAppointmentsSubject.subscribe((obj) => {
      this.finishedAppointments = obj.finishedAppointments;
      this.upcomingAppointments = obj.upcomingAppointments;
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.uploadFile();
  }

  uploadFile() {
    console.log(this.doctor);
    const formData = new FormData();
    formData.append('id', this.doctor._id);
    formData.append('photo', this.selectedFile, this.selectedFile.name);

    this.doctorService.http
      .patch(this.doctorService.baseUrl + 'uploadPhoto', formData)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
  remove(id: string, index: number) {
    let confirmDeleted = confirm('Are you sure?');
    if (confirmDeleted) {
      this.doctorService.delete(id).subscribe();
      //this.doctorServices.doctors.splice(index, 1);
      // this.pageItems.splice(index, 1);
    }
  }
}
