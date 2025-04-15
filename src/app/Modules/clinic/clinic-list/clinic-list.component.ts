import { Component } from '@angular/core';
import { Clinic } from 'src/app/Models/clinic';
import { ClinicService } from 'src/app/Services/clinic.service';
import { SelectItem, FilterService, FilterMatchMode } from "primeng/api";

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent {

  clinicList:Clinic[] =[];
  tempClinic :Clinic =new Clinic('','','');
  matchModeOptions: SelectItem[];    
  cols: any[];
   constructor(public clinicService:ClinicService, public filterService: FilterService)
   {
    
   }
  ngOnInit() {
    const customFilterName = "custom-equals";

    this.filterService.register(
      customFilterName,
      (value, filter): boolean => {
        if (filter === undefined || filter === null || filter.trim() === "") {
          return true;
        }

        if (value === undefined || value === null) {
          return false;
        }

        return value.toString() === filter.toString();
      }
    );

    this.cols = [
      { field: "clinicName", header: "Clinic Name" },
      { field: "clinicAddress", header: "Clinic Address" },
     
    ];

    this.matchModeOptions = [
      { label: "Custom Equals", value: customFilterName },
      { label: "Starts With", value: FilterMatchMode.STARTS_WITH },
      { label: "Contains", value: FilterMatchMode.CONTAINS }
    ];
   
   
    this.clinicService.getAllClinics().subscribe(data=>{
     this.clinicList=data
     
     console.log(data)
    })
 }

 deleteClinic(id:string)
 {
  this.clinicService.deleteClinic(id).subscribe(data=>{
    console.log(data);

    this.clinicList.splice(
     
      this.clinicList.findIndex(a=>a._id==id),
      1
   )
  })
 }

 
edit(){

}
}
