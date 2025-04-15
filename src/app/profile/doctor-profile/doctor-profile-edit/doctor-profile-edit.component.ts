import { Component,Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DoctorPatch } from 'src/app/Models/doctor';
import { DoctorService } from 'src/app/Services/doctor.service';

@Component({
  selector: 'app-doctor-profile-edit',
  templateUrl: './doctor-profile-edit.component.html',
  styleUrls: ['./doctor-profile-edit.component.css',"../../profile/profile.component.css"]
})
export class DoctorProfileEditComponent {

  @Input() EditDoctor: DoctorPatch;

  editForm: FormGroup;
  constructor(public doctorService: DoctorService) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(this.EditDoctor?.name, Validators.required),
      email: new FormControl(this.EditDoctor?.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.EditDoctor?.password, [
        Validators.required,
        Validators.minLength(8),
      ]),
      age: new FormControl(this.EditDoctor?.age, [
        Validators.required,
        Validators.min(20),
        Validators.max(60),
      ]),
    });
  }
  onSubmit() {
    console.log(this.editForm.value.age);
    console.log(this.editForm.value.name);

    let doctor = new DoctorPatch(
      this.EditDoctor.id,
      this.editForm.value.name,
      this.editForm.value.age,
      this.EditDoctor.speciality,
      this.editForm.value.email,
      this.editForm.value.password,
      '',
      this.EditDoctor.workingHours,
      this.EditDoctor.appointmentNo
    );

    this.doctorService.editDoctor(doctor).subscribe((data) => {
      console.log(data);
    });
  }
}


 
 








