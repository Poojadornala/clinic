import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient, PatientPost } from 'src/app/Models/patient';
import { PatientService } from 'src/app/Services/patient-service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css'],
})
export class PatientAddComponent {
  constructor(public patientService: PatientService, public router: Router) {}
  ngOnInit() {}
  government = '';
  city = '';
  street = '';
  building = '';
  emailExists: boolean = false;
  @Input() index: number;
  @Input() id: string;

  patientAddress = {
    government: this.government,
    city: this.city,
    street: this.street,
    building: this.building,
  };
  newPatient: PatientPost;

  form = new FormGroup({
    patientName: new FormControl('', [
      Validators.required,
      Validators.pattern('([a-zA-Z]{3,15})([ ])([a-zA-Z]{3,15})'),
    ]),
    patientAge: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    street: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z1-9 ]*'),
    ]),
    building: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z1-9 ]*'),
    ]),
    Disease: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    PatientMail: new FormControl('', [
      Validators.required,
      Validators.pattern('(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    section: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9 ]*'),
    ]),
    government: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
  });
  get patientName() {
    return this.form.get('patientName');
  }

  get patientAge() {
    return this.form.get('patientAge');
  }
  get patientCity() {
    return this.form.get('city');
  }
  get patientSt() {
    return this.form.get('street');
  }
  get patientMail() {
    return this.form.get('PatientMail');
  }
  get patientBuilding() {
    return this.form.get('building');
  }
  get patientDisease() {
    return this.form.get('Disease');
  }
  get patientPassword() {
    return this.form.get('password');
  }

  onSubmit() {
    this.newPatient = new PatientPost(
      '',
      Number(this.form.value.patientAge),
      {
        government: this.form.value.government,
        city: this.form.value.city,
        street: this.form.value.street,
        building: this.form.value.building,
      },
      [],
      this.form.value.Disease,
      this.form.value.section,
      this.form.value.password,
      this.form.value.PatientMail,
      this.form.value.patientName,
      ''
    );
    console.log(this.newPatient);
    this.patientService.addNewPatient(this.newPatient).subscribe((Response) => {
      console.log(Response);
      this.router.navigateByUrl('/patient');
      this.form.reset();
    });
  }
}
