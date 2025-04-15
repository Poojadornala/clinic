import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-employee-profile-card',
  templateUrl: './employee-profile-card.component.html',
  styleUrls: [
    './employee-profile-card.component.css',
    '../../profile/profile.component.css',
  ],
})
export class EmployeeProfileCardComponent implements OnInit {
  @Input() employee: Employee;
  @Input() index: number = 0;
  @Input() mode: string;
  role: String = '';
  selectedFile: File;
  constructor(
    private employeeService: EmployeeService,
    private profileService: ProfileService
  ) {}
  ngOnInit(): void {
    this.role = this.profileService.role;
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.uploadFile();
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('id', this.employee._id);
    formData.append('photo', this.selectedFile, this.selectedFile.name);

    this.employeeService.http
      .patch(this.employeeService.basrURL + 'uploadPhoto', formData)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }

  remove(id: string) {
    if (confirm('Are You Sure ?')) {
      this.employeeService.remove(id).subscribe((a) => {
        console.log(a);
      });
    }
  }
}
