export class Employee {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public age: number,
    public address: {
      government: string;
      city: string;
      street: string;
      building: string;
    },
    public photo?: string,
    public _id?: string
  ) {}
}
