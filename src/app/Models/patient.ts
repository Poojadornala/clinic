import { AppointmentScheduler } from './appointment-scheduler';

export class Patient {
  constructor(
    public _id: string,
    public Age: number,
    public Address: {
      government: string;
      city: string;
      street: string;
      building: string;
    },
    public Apointments: Array<string>,
    public Disease: string,
    public Section: string,
    public Password: string,
    public Email: string,
    public name: string,
    public Name?: string,
    public photo?: string
  ) {}
}

export class PatientEdit {
  constructor(
    public id: string,
    public name: string,
    public age: number,
    public photo: string,
    public Address: {
      government: string;
      city: string;
      street: string;
      building: string;
    },
    public Apointments: Array<string>,
    public disease: string,
    public section: string,
    public password: string,
    public email: string,
    public Name?: string
  ) {}
}
export class patientAddress {
  constructor(
    public government: string,
    public city: string,
    public street: string,
    public building: string
  ) {}


}

export class PatientPost
{
  constructor(
    public _id: string,
    public age: number,
    public address: {
      government: string;
      city: string;
      street: string;
      building: string;
    },
    public apointments: Array<string>,
    public disease: string,
    public section: string,
    public password: string,
    public email: string,
    public name: string,
    public photo?: string
   
  ){}

}

export class PatientAdd {
  constructor(
    public id: string,
    public age: number,
    public address: {
      government: string;
      city: string;
      street: string;
      building: string;
    },
    public apointments: Array<string>,
    public disease: string,
    public section: string,
    public name: string,
    public photo: string,
    public password: string,
    public email: string,
    public Name?: string
  ) {}
}
