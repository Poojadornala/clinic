import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../Models/invoice';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  currentInvoice: Invoice;

  baseUrl = 'http://localhost:3000/invoice/';
  photoFile: File;
  invoices: Invoice[] = [];
  doctor;

  getAll() {
    return this.http.get<Invoice[]>(this.baseUrl);
  }

  loadDoctors() {
    this.getAll().subscribe((data) => (this.invoices = data));
  }
  getById(id: string) {
    return this.http.get<Invoice>(this.baseUrl + id);
  }

  addInvoice(invoice: Invoice) {
    return this.http.post<Invoice>(this.baseUrl, invoice);
  }

  editInvoice(id: string, invoice: Invoice) {
    return this.http.patch<Invoice>(this.baseUrl + id, invoice);
  }

  delete(id: string) {
    return this.http.delete<Invoice>(this.baseUrl + id);
  }
  constructor(public http: HttpClient) {}

  setCurrentDoctor(invoice: Invoice) {
    this.currentInvoice = invoice;
  }
}
