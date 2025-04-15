export class Doctor {
  constructor(
    public _id: string,
    public name: string,
    public age: number,
    public speciality: string,
    public email: string,
    public password: string,
    public photo: string,
    public workingHours: string,
    public appointmentNo: string[]
  ) {}
}

export class DoctorPatch {
  constructor(
    public id: string,
    public name: string,
    public age: number,
    public speciality: string,
    public email: string,
    public password: string,
    public photo: string,
    public workingHours: string,
    public appointmentNo: string[]
  ) {}
}
