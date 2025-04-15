import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Medicine } from 'src/app/Models/medicine';
import { MedicineService } from 'src/app/Services/medicine.service';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-filter-medicine',
  templateUrl: './filter-medicine.component.html',
  styleUrls: ['./filter-medicine.component.css'],
})
export class FilterMedicineComponent implements OnInit {
  medicineFilterList: Medicine[] = [];
  items: MegaMenuItem[];
  names: any[];
  dosage: any[];
  price: any[];
  stock: any[];
  filterObj: any = {};
  placeHolder: string = 'Select';
  @Output() sendFilteredObject = new EventEmitter<any>();
  constructor(private medicineService: MedicineService) {}

  ngOnInit() {
    // const promise = new Promise<void>((resolve, reject) => {
    this.medicineService.getAllMedicines().subscribe((data) => {
      this.medicineService.setMedicineArray(data);
      this.medicineFilterList = this.medicineService.getMedicineArray();
      this.names = this.medicineFilterList
        .map(({ Name }) => ({
          Name: Name,
        }))
        .filter((item, index, self) => {
          return (
            index ===
            self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item))
          );
        });
      this.dosage = this.medicineFilterList
        .map(({ Dose }) => ({ Dose: Dose }))
        .filter((item, index, self) => {
          return (
            index ===
            self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item))
          );
        });
      this.price = this.medicineFilterList
        .map(({ Price }) => ({
          Price: Price,
        }))
        .filter((item, index, self) => {
          return (
            index ===
            self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item))
          );
        });
      this.stock = this.medicineFilterList
        .map(({ Stock }) => ({
          Stock: Stock,
        }))
        .filter((item, index, self) => {
          return (
            index ===
            self.findIndex((t) => JSON.stringify(t) === JSON.stringify(item))
          );
        });
      // resolve();
    });
    // });
    /*
    promise.then(() => {
      this.items = [
        {
          label: 'Name',
          icon: 'pi pi-fw pi-check-circle',
          items: [
            [
              {
                label: 'Medicine Available',
                items: this.names,
              },
            ],
          ],
        },
        {
          label: 'Dose',
          icon: 'pi pi-fw pi-table',
          items: [
            [
              {
                label: 'Dosage',
                items: this.dosage,
              },
            ],
          ],
        },
        {
          label: 'Price',
          icon: 'pi pi-fw pi-money-bill',
          items: [
            [
              {
                label: 'Price',
                items: this.price,
              },
            ],
          ],
        },
        {
          label: 'Stock',
          icon: 'pi pi-fw pi-shopping-cart',
          items: [
            [
              {
                label: 'Stock',
                items: this.stock,
              },
            ],
          ],
        },
      ];
    });
  }

  searchForItem(items, mark) {
    console.log(items);
    console.log(mark);
    */
  }
  search(...arr: any[]) {
    let valueArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].selectedOption != null) valueArray.push(arr[i].selectedOption);
      valueArray.forEach((obj) => {
        Object.assign(this.filterObj, { ...obj });
      });
    }
    this.sendFilteredObject.emit(this.filterObj);
  }
  rest(...arr: any[]) {
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]);
    }
    this.sendFilteredObject.emit({});
  }
}
