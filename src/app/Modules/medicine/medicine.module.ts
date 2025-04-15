import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { ListMedicineComponent } from './list-medicine/list-medicine.component';
import { EditMedicineComponent } from './edit-medicine/edit-medicine.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { KnobModule } from 'primeng/knob';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MegaMenuModule } from 'primeng/megamenu';
import { FilterMedicineComponent } from './filter-medicine/filter-medicine.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AddMedicineComponent,
    ListMedicineComponent,
    EditMedicineComponent,
    FilterMedicineComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    KnobModule,
    FormsModule,
    SliderModule,
    PaginatorModule,
    BrowserAnimationsModule,
    MegaMenuModule,
    DropdownModule,
  ],
  exports: [
    AddMedicineComponent,
    ListMedicineComponent,
    EditMedicineComponent,
    FilterMedicineComponent,
  ],
})
export class MedicineModule {}
