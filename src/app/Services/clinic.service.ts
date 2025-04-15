import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clinic } from '../Models/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  baseUrl="http://localhost:3000/clinic/";

  constructor(public http:HttpClient) { }

  getAllClinics(){
  console.log("from service")
  return this.http.get<Clinic[]>(this.baseUrl)
  }

  deleteClinic(id:string){
    return this.http.delete(this.baseUrl+id)
    
  }

  addClinic(_clinic:Clinic){
    return this.http.post<Clinic>(this.baseUrl,_clinic)
  }

  updateClinic(clinic:Clinic)
  {
    console.log(clinic)
 return  this.http.patch(this.baseUrl,clinic)
  }
}
