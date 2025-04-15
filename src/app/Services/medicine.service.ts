import { Injectable } from '@angular/core';
import { Medicine } from '../Models/medicine';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  constructor(private http: HttpClient) {}
  private medicineList: Medicine[] = [];
  private medicineElement: Medicine = new Medicine();
  addObject = new Subject<any>();

  url: string = 'http://127.0.0.1:3000/medicine/';

  setMedicineArray(medicine: Medicine[]) {
    this.medicineList = medicine;
  }
  setMedicineArrayPushElement(medicine: Medicine) {
    this.medicineList.push(medicine);
  }
  getMedicineArray() {
    return this.medicineList;
  }

  getAllMedicines() {
    return this.http.get<Medicine[]>(this.url);
  }
  postMedicineToServer(medicine: Medicine) {
    return this.http.post<Medicine>(this.url, medicine);
  }

  patchMedicine(medicine) {
    this.http.patch(this.url, medicine).subscribe((response) => {
      for (let i = 0; i < this.medicineList.length; i++) {
        if (this.medicineList[i]._id == medicine._id) {
          this.medicineList.splice(i, 1, medicine);
        }
      }
      console.log(response);
    });
  }
  deleteMedicine(medicine: Medicine) {
    this.http.delete(this.url + medicine._id).subscribe((response) => {
      for (let i = 0; i < this.medicineList.length; i++) {
        if (this.medicineList[i]._id == medicine._id) {
          this.medicineList.splice(i, 1);
        }
      }
      console.log(response);
    });
  }

  stringInput(control: FormControl): { [s: string]: boolean } {
    if (!isNaN(control.value) && control.value != null && control.value != '') {
      return { numbersIsForbidden: true };
    }

    return null;
  }
  numberInput(control: FormControl): { [s: string]: boolean } {
    if (
      +control.value < 0 ||
      (/^\s*$/.test(control.value) && control.value != '') ||
      (isNaN(control.value) && control.value != undefined)
    ) {
      return { stringIsForbidden: true };
    }

    return null;
  }
}
