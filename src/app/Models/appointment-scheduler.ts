

export class AppointmentScheduler {

    constructor(
   public patientID:string,
   public doctorID:String,
   public employeeID:String,
   public clinicID:string,
   public date:Date,
   public _id?:string
    ){}
}
