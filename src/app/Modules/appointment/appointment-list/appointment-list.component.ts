import { Component } from '@angular/core';
import { AppointmentScheduler } from 'src/app/Models/appointment-scheduler';
import { Clinic } from 'src/app/Models/clinic';
import { AppointmentService } from 'src/app/Services/appointment.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {

  appointments: AppointmentScheduler[] = [];

  today: Date = new Date();

  constructor(public appointmentService: AppointmentService,

    public confirmationService: ConfirmationService,
    public messageService: MessageService,

  ) {

  }

  confirm(event: Event, ID: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure  you want to cancel this appointment?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
    console.log(ID);
        this.appointmentService.deleteAppointment(ID).subscribe(data => {
        

          this.appointments.splice(

            this.appointments.findIndex(a => a._id == ID),
            1
          )
        })

      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }


  ngOnInit() {
    this.getData();

  }

  getData() {
    this.appointmentService.getAppointmentGtToday().subscribe(data => {
      this.appointments = data;
     
    })
  }

}
