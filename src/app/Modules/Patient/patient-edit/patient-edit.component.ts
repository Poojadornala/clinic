import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient, PatientEdit } from 'src/app/Models/patient';
import { PatientService } from 'src/app/Services/patient-service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css'],
})
export class PatientEditComponent implements OnInit {
  constructor(public patientService: PatientService, public router: Router) {}
  ngOnInit() {
    this.newPatient.id = this.currentPatient._id;
    this.newPatient.name = this.currentPatient.Name;
    this.newPatient.age = this.currentPatient.Age;
    this.newPatient.photo = this.currentPatient.photo;
    this.newPatient.Address = this.currentPatient.Address;
    this.newPatient.Apointments = this.currentPatient.Apointments;
    this.newPatient.disease = this.currentPatient.Disease;
    this.newPatient.section = this.currentPatient.Section;
    this.newPatient.password = this.currentPatient.Password;
    this.newPatient.email = this.currentPatient.Email;
    this.form = new FormGroup({
      patientName: new FormControl(this.newPatient.name, [
        Validators.pattern('([a-zA-Z]{3,15})([ ])([a-zA-Z]{3,15})'),
      ]),
      patientAge: new FormControl(this.newPatient.age, [
        Validators.min(0),
        Validators.max(100),
      ]),
      city: new FormControl(this.newPatient.Address.city, [
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      street: new FormControl(this.newPatient.Address.street, [
        Validators.pattern('[a-zA-Z0-9 ]*'),
      ]),
      building: new FormControl(this.newPatient.Address.building, [
        Validators.pattern('[a-zA-Z0-9 ]*'),
      ]),
      Disease: new FormControl(this.newPatient.disease, [
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      PatientMail: new FormControl(this.newPatient.email, [
        Validators.pattern('(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})'),
      ]),
      password: new FormControl(this.newPatient.password, [
        Validators.minLength(8),
      ]),
      section: new FormControl(this.newPatient.section, [
        Validators.pattern('[a-zA-Z0-9 ]*'),
      ]),
      government: new FormControl(this.newPatient.Address.government, [
        Validators.pattern('[a-zA-Z ]*'),
      ]),
    });
  }
  government = '';
  city = '';
  street = '';
  building = '';
  emailExists: boolean = false;
  @Input() currentPatient: Patient;
  @Input() index: number;
  @Input() id: string;
  form: FormGroup;
  patientAddress = {
    government: this.government,
    city: this.city,
    street: this.street,
    building: this.building,
  };
  newPatient = new PatientEdit(
    '',
    '',
    0,
    '',
    this.patientAddress,
    [],
    '',
    '',
    '',
    ''
  );

  onEdit(id: string) {
    console.log(this.newPatient);
    // this.patientService.getAllPatientsForEdit();
    // console.log(this.patientService.patientsList);
    // console.log(this.newPatient);
    // this.patientService.getPatientByIDForEdit(id).subscribe((data) => {
    //   console.log(data);
    //   this.newPatient.id = data._id;
    //   this.newPatient.name = data.Name;
    //   this.newPatient.age = data.Age;
    //   this.newPatient.Address = data.Address;
    //   this.newPatient.photo = data.photo;
    //   this.newPatient.Apointments = data.Apointments;
    //   this.newPatient.email = data.Email;
    //   this.newPatient.section = data.Section;
    //   this.newPatient.password = data.Password;
    //   this.newPatient.disease = data.Disease;
    //   console.log(this.newPatient);
    // });
  }

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
    this.newPatient = new PatientEdit(
      this.newPatient.id,
      this.form.value.patientName,
      Number(this.form.value.patientAge),
      '',
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
      this.form.value.PatientMail
    );

    this.currentPatient.Name = this.newPatient.name;
    this.currentPatient.Age = this.newPatient.age;

    this.currentPatient.Address = this.newPatient.Address;
    this.currentPatient.Apointments = this.newPatient.Apointments;
    this.currentPatient.Disease = this.newPatient.disease;
    this.currentPatient.Section =
      this.newPatient.section =
      this.currentPatient.Password =
        this.newPatient.password;
    this.currentPatient.Email = this.newPatient.email;
    this.patientService
      .updatePatientByID(this.newPatient)
      .subscribe((Response) => {
        console.log(Response);
        this.router.navigateByUrl('/patient');
        this.form.reset();
      });
  }
}
