import { Component } from '@angular/core';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PendingAppointmentScheduler } from 'src/app/Models/appointment-pending';
import { PendingAppointmentService } from 'src/app/Services/pendingAppointment.service copy';
import { AppointmentScheduler } from 'src/app/Models/appointment-scheduler';
@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.css']
})
export class PendingListComponent {


  pendingAppointment: PendingAppointmentScheduler[] = [];
  empId: string;
  selectedDate: Date
  date =new Date().toLocaleDateString();
  constructor(public appointmentService: AppointmentService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public pendingService: PendingAppointmentService
  ) {
    this.empId = localStorage.getItem('id');
  }
  ngOnInit() {


    this.pendingService.getAllpending().subscribe(data => {
      console.log(data);
      this.pendingAppointment = data;

    })

  }

  confirm(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure  you want to cancel this appointment?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });

        this.pendingService.deletePending(id).subscribe(data => {
          console.log(data);
    
          this.pendingAppointment.splice(
    
            this.pendingAppointment.findIndex(a => a._id == id),
            1
          )
    
        
        })
        

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }





  makeReservation(appoint: any,selectedDate:string) {
   
   
    let finalDate:Date;
    
    if(selectedDate=='')
    finalDate=new Date(appoint.date);
    else
    finalDate=new Date(selectedDate);
  
    console.log(finalDate)
        this.appointmentService.addAppointment(

          new AppointmentScheduler(appoint.patientID._id,appoint.doctorID._id,this.empId,appoint.clinicID._id,finalDate)
        ).subscribe(data=>{
          console.log(data);
          this.pendingAppointment.splice(

            this.pendingAppointment.findIndex(a => a._id == appoint._id),
            1
          )

          this.pendingService.deletePending(appoint._id).subscribe()
         
        })
         
  }

  changeDateFormat(date:Date)
  {
    return new Date(date);
  }


}

