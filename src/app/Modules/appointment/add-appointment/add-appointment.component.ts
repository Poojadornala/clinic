import { Component } from '@angular/core';
import { AppointmentScheduler } from 'src/app/Models/appointment-scheduler';
import { Clinic } from 'src/app/Models/clinic';
import { Doctor } from 'src/app/Models/doctor';
import { Patient } from 'src/app/Models/patient';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { PatientService } from 'src/app/Services/patient-service';



@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
  providers: []
})
export class AddAppointmentComponent {

  doctorArray: Doctor[] = [];
  patientArray: Patient[] = [];
  clinicArray: Clinic[] = [];
  selecteDoctor: Doctor;
  selectPatient: Patient;
  selectClinic: Clinic;
  date: Date = new Date();
  empId: string;



  constructor(public appointmentService: AppointmentService,
    public doctoService: DoctorService,
    public patientService: PatientService,
    public clinicService: ClinicService,

  ) {
    this.empId = localStorage.getItem('id');
  }




  ngOnInit() {

    this.doctoService.getAll().subscribe(data => {

      this.doctorArray = data;
    })
    this.patientService.getAllPatients().subscribe(data => {
      this.patientArray = data;

    })

    this.clinicService.getAllClinics().subscribe(data => {
      this.clinicArray = data;
    })

  }




  saveReservation() {

    // console.log(this.selectPatient);
    if (this.selecteDoctor != undefined && this.selectPatient != undefined && this.selectClinic != undefined && this.date != undefined) {
      console.log(this.selectPatient._id);
      let appoint = new AppointmentScheduler(this.selectPatient._id, this.selecteDoctor._id, this.empId, this.selectClinic._id, this.date)
     
      console.log(appoint);
      this.appointmentService.addAppointment(appoint).subscribe(data => {
        alert("new appointment has created");
      })

    }

  }



}
