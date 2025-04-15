import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PendingAppointmentScheduler } from 'src/app/Models/appointment-pending';
import { Clinic } from 'src/app/Models/clinic';
import { Doctor } from 'src/app/Models/doctor';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { ClinicService } from 'src/app/Services/clinic.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import{PendingAppointmentService} from './../../../Services/pendingAppointment.service copy'
@Component({
  selector: 'app-patient-reserve',
  templateUrl: './patient-reserve.component.html',
  styleUrls: ['./patient-reserve.component.css']
})
export class PatientReserveComponent {

  doctor:Doctor=null;
  clinicArray:Clinic[]=[];
  selectClinic:Clinic;
  date:Date;
  patientID:string;
  today:Date=new Date();
  pendingAppointment:PendingAppointmentScheduler=null
    description:string;
    myform: FormGroup;
  


  constructor(private route: ActivatedRoute,public doctorService:DoctorService,
    public appointmentService:AppointmentService,public pendingService:PendingAppointmentService,
    public clinicService:ClinicService)
   {
            this.patientID=localStorage.getItem('id'); 
   }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
     const doctorId =params['id'];

     this.doctorService.getById(doctorId).subscribe(data=>{
      this.doctor =data;
    
      

     })


    });
    this.clinicService.getAllClinics().subscribe(data=>{
      this.clinicArray=data;
    })

  }

  saveReservation()
  {
  
   let pending =new PendingAppointmentScheduler(this.patientID,this.doctor._id,this.selectClinic._id,this.date,this.description)
  console.log(pending);
    this.pendingService.addPendingAppointment(pending).subscribe(data=>{
     
      alert("email will be sent to  confirm reservation")
      this.selectClinic=null;
      this.date=null;
      this.description='';
    })
    }
}
