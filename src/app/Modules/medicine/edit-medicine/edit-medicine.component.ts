import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Medicine } from 'src/app/Models/medicine';
import { MedicineService } from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-edit-medicine',
  templateUrl: './edit-medicine.component.html',
  styleUrls: ['./edit-medicine.component.css'],
})
export class EditMedicineComponent implements OnInit, OnDestroy {
  isRoleEmployee: boolean;
  constructor(
    private medicineService: MedicineService,
    private renderer: Renderer2
  ) {
    if (localStorage.getItem('role') == 'employee') {
      this.isRoleEmployee = true;
    } else this.isRoleEmployee = false;
  }
  @Input() medicineObj: Medicine = new Medicine();
  @Input() index: number;
  @ViewChild('maindiv') maindiv: ElementRef;
  medicineData: FormGroup;
  ngOnInit() {
    this.medicineData = new FormGroup({
      Name: new FormControl(null, [
        Validators.required,
        this.medicineService.stringInput.bind(this),
        ,
      ]),
      Dose: new FormControl(null, [
        Validators.required,
        this.medicineService.numberInput.bind(this),
      ]),
      Price: new FormControl(null, [
        Validators.required,
        this.medicineService.numberInput.bind(this),
      ]),
      Stock: new FormControl(null, [
        Validators.required,
        this.medicineService.numberInput.bind(this),
      ]),
    });
  }

  onSubmit(elementRef: ElementRef) {
    // let medicineObjTemp = { id: null, Name: '', Dose: 0, Price: 0, Stock: 0 };
    // medicineObjTemp.Name = this.medicineData.get('Name').value;
    // medicineObjTemp.Dose = this.medicineData.get('Dose').value;
    // medicineObjTemp.Price = this.medicineData.get('Price').value;
    // medicineObjTemp.Stock = this.medicineData.get('Stock').value;
    // medicineObjTemp.id = this.medicineObj._id;
    this.medicineObj.Name = this.medicineData.get('Name').value;
    this.medicineObj.Dose = this.medicineData.get('Dose').value;
    this.medicineObj.Price = this.medicineData.get('Price').value;
    this.medicineObj.Stock = this.medicineData.get('Stock').value;
    for (let prop in this.medicineObj) {
      if (this.medicineObj[prop] == '') {
        delete this.medicineObj[prop];
      }
      // if (prop == '_id') {
      //   let value = this.medicineObj[prop];
      //   console.log(value);
      //   delete this.medicineObj[prop];
      //   this.medicineObj.id = value;
      // }
    }
    // this.renderer.setProperty(this.maindiv.nativeElement, 'classList', 'hide');
    // this.renderer.setProperty(
    //   this.maindiv.nativeElement,
    //   'aria-hidden',
    //   'true'
    // );

    this.medicineService.patchMedicine(this.medicineObj);
  }
  ngOnDestroy(): void {}
  edit() {
    // console.log(this.medicineObj.Name);
    this.medicineData.setValue({
      Name: this.medicineObj.Name,
      Dose: this.medicineObj.Dose,
      Price: this.medicineObj.Price,
      Stock: this.medicineObj.Stock,
    });
  }
}
