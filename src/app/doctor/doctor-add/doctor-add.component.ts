import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from 'src/app/Models/doctor';
import { DoctorService } from 'src/app/Services/doctor.service';
import {
  FormControl,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, from, Observable } from 'rxjs';

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.css'],
})
export class DoctorAddComponent implements OnInit {
  signupForm: FormGroup;
  @Input() doctor: Doctor = new Doctor('', '', 0, '', '', '', '', '', []);
  photoFile: File;
  emailExists: boolean = false;
  invalidEmail: string = '';

  constructor(private doctorServices: DoctorService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern('([a-zA-Z]{3,8})([ ])([a-zA-Z]{3,8})'),
      ]),
      age: new FormControl(null, [
        Validators.required,
        Validators.min(20),
        Validators.max(80),
      ]),
      speciality: new FormControl('Surgeon', [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      photo: new FormControl(null, null),
      workinghours: new FormControl(null, [
        Validators.required,
        Validators.pattern('(^[4-8]$)'),
      ]),
    });
  }
  onSelectPhoto(event) {
    this.doctorServices.onSelectPhoto(event);
  }

  addDoctor() {
    this.doctor.name = this.signupForm.value.username;
    this.doctor.age = this.signupForm.value.age;
    this.doctor.email = this.signupForm.value.email;
    this.doctor.password = this.signupForm.value.password;
    this.doctor.photo = this.signupForm.value.photo;
    this.doctor.speciality = this.signupForm.value.speciality;
    this.doctor.workingHours = this.signupForm.value.workinghours;

    if (this.signupForm.controls.photo.dirty) {
      this.doctorServices.doctor = this.doctor;
      this.doctorServices.onUploadPhoto();
    }
    this.doctorServices
      .addDoctor(this.doctor)
      .pipe(
        catchError((error) => {
          this.emailExists = true;
          this.invalidEmail = this.signupForm.value.email;
          return from([]); // You can return an empty array or another observable to continue the stream
        })
      )
      .subscribe((data) => {
        this.doctorServices.doctors.push(this.doctor);
      });
  }

  onSubmit() {
    console.log(this.signupForm.value.username);
    console.log(this.signupForm);
  }

  /* forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (
          this.doctorServices.doctors.find((a) => a.email === control.value)
        ) {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  } */
}
