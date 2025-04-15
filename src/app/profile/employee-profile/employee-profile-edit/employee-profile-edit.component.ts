import { Component,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-profile-edit',
  templateUrl: './employee-profile-edit.component.html',
  styleUrls: ['./employee-profile-edit.component.css','../../profile/profile.component.css']
})
export class EmployeeProfileEditComponent {

  @Input() EditeEmployee: Employee;
 
     editForm:FormGroup;

  constructor(public employeeService: EmployeeService){}


  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl(this.EditeEmployee.name, Validators.required),
      email: new FormControl(this.EditeEmployee.email, [Validators.required, Validators.email]),
      password: new FormControl(this.EditeEmployee.password, [
        Validators.required,
        Validators.minLength(8),
      ]),
      age: new FormControl(this.EditeEmployee.age, [
        Validators.required,
        Validators.min(20),
        Validators.max(60),
      ]),
      government: new FormControl(this.EditeEmployee.address.government, [Validators.required]),
      city: new FormControl(this.EditeEmployee.address.city, [Validators.required]),
      street: new FormControl(this.EditeEmployee.address.street, [Validators.required]),
      building: new FormControl(this.EditeEmployee.address.building, [Validators.required]),
    });

    
  }

  onSubmit() {
    
    let address ={
      city:this.editForm.value.city,
      government:this.editForm.value.government,
      street:this.editForm.value.street,
      building:this.editForm.value.building
    }
    let  currentEmployee:Employee=new Employee(this.editForm.value.name,
      this.editForm.value.email,
      this.editForm.value.password,
      this.editForm.value.age,
      address,
      "",
     this.EditeEmployee._id
      );

    this.employeeService.edit(currentEmployee).subscribe((emp)=>{
      console.log(emp)
      
    })
 
}
}
