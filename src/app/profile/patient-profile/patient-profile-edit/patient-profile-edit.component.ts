import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Patient, PatientEdit } from 'src/app/Models/patient';
import { PatientService } from 'src/app/Services/patient-service';


@Component({
  selector: 'app-patient-profile-edit',
  templateUrl: './patient-profile-edit.component.html',
  styleUrls: ['./patient-profile-edit.component.css']
})
export class PatientProfileEditComponent {

  @Input() EditPatient: Patient;
 
 
  editForm:FormGroup;

constructor(public patientService: PatientService){}


ngOnInit(): void {
  console.log(this.EditPatient);
 this.editForm = new FormGroup({
   name: new FormControl(this.EditPatient.Name, Validators.required),
   email: new FormControl(this.EditPatient.Email, [Validators.required, Validators.email]),
   password: new FormControl(this.EditPatient.Password, [
     Validators.required,
     Validators.minLength(8),
   ]),
   age: new FormControl(this.EditPatient.Age, [
     Validators.required,
     Validators.min(20),
     Validators.max(60),
   ]),
   government: new FormControl(this.EditPatient.Address.government, [Validators.required]),
   city: new FormControl(this.EditPatient.Address.city, [Validators.required]),
   street: new FormControl(this.EditPatient.Address.street, [Validators.required]),
   building: new FormControl(this.EditPatient.Address.building, [Validators.required]),
 });

 
}

onSubmit() {
 console.log("ssss");
 const address ={
   city:this.editForm.value.city,
   government:this.editForm.value.government,
   street:this.editForm.value.street,
   building:this.editForm.value.building

 }
 
  this.patientService.updatePatientByID(
new PatientEdit(this.EditPatient._id,this.editForm.value.name,
  this.editForm.value.age,
  "",
  address,
  this.EditPatient.Apointments,
  this.EditPatient.Disease,
  this.EditPatient.Section,
  this.editForm.value.Password,
  this.editForm.value.Email

  )

  ).subscribe(data=>{
    console.log(data);
  })
 
}

}