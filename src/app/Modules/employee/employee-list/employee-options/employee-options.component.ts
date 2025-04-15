import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-options',
  templateUrl: './employee-options.component.html',
  styleUrls: ['./employee-options.component.css'],
})
export class EmployeeOptionsComponent {
  ageOptions: string[] = ['20:30', '31:40', '41:50'];
  employeeService: EmployeeService;
  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }
  filter(option: string) {
    console.log('changed' + option);
    this.employeeService.filter(option);
  }
}
