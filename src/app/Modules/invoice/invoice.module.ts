import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { MegaMenuModule } from 'primeng/megamenu';
import { InoviceAddComponent } from './inovice-add/inovice-add.component';
import { InoviceListComponent } from './inovice-list/inovice-list.component';

import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoicePaidComponent } from './invoice-paid/invoice-paid.component';
import { InvoiceUnpaidComponent } from './invoice-unpaid/invoice-unpaid.component';

@NgModule({
  declarations: [
    InoviceAddComponent,
    InoviceListComponent,
    InvoiceDetailsComponent,
    InvoicePaidComponent,
    InvoiceUnpaidComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginatorModule,
    MegaMenuModule,
  ],
  exports: [
    InoviceAddComponent,
    InoviceListComponent,
    InvoiceDetailsComponent,
    InvoicePaidComponent,
    InvoiceUnpaidComponent,
  ],
})
export class InvoiceModule {}
