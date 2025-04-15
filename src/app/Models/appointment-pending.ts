

export class PendingAppointmentScheduler {

    constructor(
   public patientID:string,
   public doctorID:String,
    public clinicID:string,
   public date:Date,
  public descrption?:string,
  public _id?:string
    ){}
}
