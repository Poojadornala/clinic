import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from '../Models/employee';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: Employee[] = [];
  empArr: Employee[] = [];
  currentEmployee: Employee;
  optionsSubject = new Subject<Employee[]>();
  basrURL: string = 'http://localhost:3000/employee/';

  constructor(public http: HttpClient) {
    this.http.get<Employee[]>(this.basrURL).subscribe((employees) => {
      this.employees = employees;
      this.empArr = employees;
    });
  }

  getAll() {
    return this.http.get<Employee[]>(this.basrURL);
  }
  add(employee: Employee) {
    /* return this.http.post<Employee>(this.basrURL, {
      name: employee.name,
      age: employee.age,
      email: employee.email,
      address: {
        government: 'Tanta',
        city: 'Tanta',
        street: 'Tanta',
        building: 'Tanta',
      },
      password: '123456789',
    }); */
    console.log(employee);
    return this.http.post<any>(this.basrURL, employee);
  }
  remove(id: string) {
    console.log(this.basrURL + id);
    return this.http.delete(this.basrURL + id);
  }

  edit(employee: Employee) {
    console.log(employee);
    return this.http.patch<Employee>(this.basrURL, {
      id: employee._id,
      name: employee.name,
      email: employee.email,
      password: employee.password,
      age: employee.age,
      address: {
        government: employee.address.government,
        city: employee.address.city,
        street: employee.address.street,
        building: employee.address.building,
      },
    });
  }
  setCurrentEmployee(employee: Employee) {
    this.currentEmployee = employee;
  }
  getById(id: string) {
    return this.http.get<Employee>(this.basrURL + id);
  }
  /* filters */
  filter(option: string) {
    this.empArr = this.employees.slice();
    this.empArr = this.employees.filter(
      (emp) => emp.age >= +option.slice(0, 2) && emp.age <= +option.slice(3, 5)
    );
    this.optionsSubject.next(this.empArr);
  }
}
