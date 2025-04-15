import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/Models/patient';
import { PatientService } from 'src/app/Services/patient-service';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-patient-profile-card',
  templateUrl: './patient-profile-card.component.html',
  styleUrls: ['./patient-profile-card.component.css'],
})
export class PatientProfileCardComponent implements OnInit {
  @Input() patient: Patient;
  @Input() count = { finished: 0, upcoming: 0 };
  @Input() index: number = 0;
  @Input() mode: string;
  @Input() role: String = '';
  finishedAppointments: number = 0;
  upcomingAppointments: number = 0;
  selectedFile: File;
  constructor(private patientService: PatientService) {
    console.log(this.patient?.photo);
  }
  ngOnInit(): void {
    this.finishedAppointments = this.count.finished;
    this.upcomingAppointments = this.count.upcoming;
    this.patientService.finishedAppointmentsSubject.subscribe((obj) => {
      this.finishedAppointments = obj.finishedAppointments;
      this.upcomingAppointments = obj.upcomingAppointments;
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.uploadFile();
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('id', this.patient._id);
    formData.append('photo', this.selectedFile, this.selectedFile.name);

    this.patientService.http
      .patch(this.patientService.baseURL + 'uploadPhoto', formData)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  remove(id: string, index: number) {
    if (confirm('Are You Sure ?')) {
      this.patientService.deletePatient(id).subscribe((response) => {
        console.log(response);
        // this.patients.splice(index, 1);
        //  console.log(this.patients);
      });
    }
  }
}
