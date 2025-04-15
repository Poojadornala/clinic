import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Medicine } from 'src/app/Models/medicine';
import { MedicineService } from 'src/app/Services/medicine.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-medicine',
  templateUrl: './list-medicine.component.html',
  styleUrls: ['./list-medicine.component.css'],
})
export class ListMedicineComponent {
  medicineList: Medicine[] = [];
  tempArray: Medicine[] = [];
  medicineObj: Medicine = new Medicine();
  isRoleEmployee: boolean;
  rowsPerPage = 6;
  currentPage = 0;
  constructor(
    private medicineService: MedicineService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {
    if (localStorage.getItem('role') == 'employee') {
      this.isRoleEmployee = true;
    } else this.isRoleEmployee = false;
  }

  ngOnInit(): void {
    this.medicineService.getAllMedicines().subscribe((data) => {
      this.medicineService.setMedicineArray(data);
      this.medicineList = this.medicineService.getMedicineArray();
    });
    this.medicineService.addObject.subscribe((medicine) =>
      this.medicineList.push(medicine)
    );
  }

  deleteMedicine(medicine: Medicine) {
    this.medicineService.deleteMedicine(medicine);
    this.medicineList = this.medicineService.getMedicineArray();
  }

  onPageChange(event) {
    this.currentPage = event.page;
    if (event.rows > this.rowsPerPage) this.rowsPerPage = event.rows;
    else this.rowsPerPage = event.rows;
  }

  getVisibleMedicineList() {
    const startIndex = this.currentPage * this.rowsPerPage;
    return this.medicineList.slice(startIndex, startIndex + this.rowsPerPage);
  }
  reciveFilteredObject(filteredObj) {
    this.medicineList = this.medicineService.getMedicineArray();
    let filteredArray = this.medicineList.filter((obj) => {
      let checkPropetyExist = Object.keys(filteredObj).every((key) => {
        return obj[key] == filteredObj[key];
      });
      if (checkPropetyExist) return obj;
    });
    this.medicineList = filteredArray;
  }
}
