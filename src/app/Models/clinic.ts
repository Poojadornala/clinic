import { Doctor } from "./doctor";

export class Clinic{

    constructor(public _id:string,public clinicName:string,public clinicAddress:string,public doctorsID? :Doctor[]){}
}