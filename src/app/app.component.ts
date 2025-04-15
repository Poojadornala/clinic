import { Component, OnInit, Injectable } from '@angular/core';
import { MedicineService } from './Services/medicine.service';
import { Medicine } from './Models/medicine';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private medicineService: MedicineService,
    library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
  }
}
