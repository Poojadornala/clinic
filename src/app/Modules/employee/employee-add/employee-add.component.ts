import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, from } from 'rxjs';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent {
  currentEmployee: Employee;
  addForm: FormGroup;
  employeeService: EmployeeService;
  emailExists: boolean = false;
  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }
  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('([a-zA-Z]{3,8})([ ])([a-zA-Z]{3,8})'),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,})'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      age: new FormControl(null, [
        Validators.required,
        Validators.min(20),
        Validators.max(60),
      ]),
      government: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      city: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      street: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]*'),
      ]),
      building: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]*'),
      ]),
    });
  }

  onSubmit() {
    console.log(this.addForm);
    this.emailExists = false;
    this.currentEmployee = new Employee(
      this.addForm.value.name,
      this.addForm.value.email,
      this.addForm.value.password,
      this.addForm.value.age,
      {
        government: this.addForm.value.government,
        city: this.addForm.value.city,
        street: this.addForm.value.street,
        building: this.addForm.value.building,
      }
    );
    /*this.currentEmployee.name = this.addForm.value.name;
    this.currentEmployee.email = this.addForm.value.email;
    this.currentEmployee.password = this.addForm.value.password;
    this.currentEmployee.age = this.addForm.value.age;
    this.currentEmployee.address.government = this.addForm.value.government;
    this.currentEmployee.address.city = this.addForm.value.city;
    this.currentEmployee.address.street = this.addForm.value.street;
    this.currentEmployee.address.building = this.addForm.value.building;*/
    /*  console.log(this.addForm.value);
    console.log(this.currentEmployee);*/

    this.employeeService
      .add(this.currentEmployee)
      .pipe(
        catchError((error) => {
          this.emailExists = true;
          return from([]); // You can return an empty array or another observable to continue the stream
        })
      )
      .subscribe((Response) => {
        if (Response.data == 'this email exists') this.emailExists = true;
        else this.emailExists = false;
      });
  }
}
