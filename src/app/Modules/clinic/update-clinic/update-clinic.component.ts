import { Component, Input } from '@angular/core';
import { Clinic } from 'src/app/Models/clinic';
import { ClinicService } from 'src/app/Services/clinic.service';

@Component({
  selector: 'app-update-clinic',
  templateUrl: './update-clinic.component.html',
  styleUrls: ['./update-clinic.component.css']
})
export class UpdateClinicComponent {
  @Input() updateClinic: Clinic = new Clinic('', '', '');
  @Input() index: number
 
  getName:string;
  getAddress:string;
  
  nameInput="name-";
  addressInput="address-"
  constructor(public clinicSevice: ClinicService) { }
  
  ngOnInit() {
    // document.querySelectorAll("div")[this.index] ;
   
    
  }

      


  update(data :{}) {
  
    console.log(data["Name"]);
    console.log(data["Address"]);
   
    
    if(data["Name"] !=undefined && data["Address"] !=undefined)
    {
      
     
      let temp=new Clinic(this.updateClinic._id,data["Name"],data["Address"],this.updateClinic.doctorsID)
     console.log(temp);
      this.clinicSevice.updateClinic(temp).subscribe(data => {
        console.log(data);
        
      })
    }
   


  }

  show() {
    
    console.log();
    document.getElementById(this.nameInput+this.index).setAttribute("value",this.updateClinic.clinicName)
    document.getElementById(this.addressInput+this.index).setAttribute("value",this.updateClinic.clinicAddress)
  
  }
}
