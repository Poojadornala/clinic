import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';

import { Invoice } from 'src/app/Models/invoice';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-inovice-list',
  templateUrl: './inovice-list.component.html',
  styleUrls: ['./inovice-list.component.css'],
})
export class InoviceListComponent implements OnInit {
  invoices: Invoice[] = [];
  pageNo: number;
  pageItems;
  pay: string = 'Payment Method';
  tag: string;
  items: MegaMenuItem[];
  date = '';

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.invoiceService.getAll().subscribe((data) => {
      this.invoiceService.invoices = data;
      this.invoices = this.invoiceService.invoices;
      this.pageNo = this.invoices.length;
      this.page({ first: 0, rows: 9 });
    });

    this.items = [
      {
        label: 'Payment Method',
        icon: 'pi pi-fw pi-cog',
        items: [
          [
            {
              label: 'Payment Method',
              items: [
                { label: 'Cash' },
                { label: 'Insurance Card' },
                { label: 'Credit Card' },
              ],
            },
          ],
        ],
      },
    ];
  }

  page(event) {
    const first = event.first;
    const row = event.rows;
    if (
      this.pay !== 'Payment Method' &&
      (this.tag === 'SPAN' || this.tag === 'A')
    ) {
      this.pageItems = this.invoices
        .filter((doc) => {
          return doc.paymentMethod === this.pay;
        })
        .slice(first, first + row);
    } else {
      if (this.date !== '') {
        console.log(event);
        this.pageItems = this.invoices
          .filter((doc) => {
            return doc.date.toLocaleString().startsWith(this.date);
          })
          .slice(first, first + row);
      } else this.pageItems = this.invoices.slice(first, first + row);
    }
  }

  filterByPaymentMethod(event) {
    this.pay = event.target.innerText;
    this.tag = event.target.tagName;
    if (this.pay !== '') {
      if (
        this.pay !== 'Payment Method' &&
        (this.tag === 'SPAN' || this.tag === 'A')
      ) {
        console.log(this.pay, this.tag);
        if (this.date === '') {
          this.pageItems = this.invoices.filter((doc) => {
            return doc.paymentMethod === this.pay;
          });
        } else {
          this.pageItems = this.invoices
            .filter((doc) => {
              return doc.paymentMethod === this.pay;
            })
            .filter((doc) => {
              return doc.date.toLocaleString().startsWith(this.date);
            });
        }

        let pageCount = this.pageItems.length;
        this.pageNo = pageCount;
      }
    }
  }
  filterByDate(event) {
    this.pageItems = this.invoices.filter((doc) => {
      return doc.date.toLocaleString().startsWith(event.target.value);
    });
    let pageCount = this.pageItems.length;
    this.pageNo = pageCount;
    this.page({ first: 0, rows: 9 });
    console.log(this.date);
  }

  resetFilter() {
    this.pay = 'Payment Method';
    this.date = '';
    this.pageItems = this.invoices;
    this.pageNo = this.invoices.length;
    this.page({ first: 0, rows: 9 });
  }

  onShow(id) {
    window.open('http://localhost:4200/invoice/' + id);
  }
}
