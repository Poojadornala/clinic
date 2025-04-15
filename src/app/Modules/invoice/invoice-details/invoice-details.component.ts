import { Component, Input } from '@angular/core';
import { Invoice } from 'src/app/Models/invoice';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent {
  @Input() doctorId: string;
  @Input() index: number;
  invoice: Invoice = new Invoice(
    '',
    null,
    0,
    '',
    '',
    '',
    new Date(),
    false,
    0.1
  );
  date = '';
  time = '';
  @Input() invoices: Invoice;
  constructor(private invoiceService: InvoiceService) {}

  onShow() {
    this.invoice = this.invoices[this.index];
    this.date = new Date(this.invoice.date).toDateString();
    this.time = new Date(this.invoice.date).toLocaleTimeString();
    window.open('http://localhost:4200/invoice/' + this.invoice._id);
  }
}
