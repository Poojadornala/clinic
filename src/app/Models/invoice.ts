import { Medicine } from './medicine';

export class Invoice {
  constructor(
    public _id: string,
    public medicine: { medicineID: string; quantity: number }[],
    public money: number,
    public appointmentId: string,
    public paymentMethod: string,
    public patientID: string,
    public date: Date,
    public payment_status: boolean,
    public discount_percentage: number
  ) {}
}
