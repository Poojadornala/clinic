import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/Services/invoice.service';

@Component({
  selector: 'app-invoice-unpaid',
  templateUrl: './invoice-unpaid.component.html',
  styleUrls: ['./invoice-unpaid.component.css'],
})
export class InvoiceUnpaidComponent implements OnInit {
  status;
  ngOnInit() {
    this.activeRoute.params.subscribe((a) => {
      this.invoiceService.getById(a['id']).subscribe((data) => {
        this.status = data.payment_status;
        if (this.status == false)
          this.invoiceService.delete(a['id']).subscribe((data) => {});
      });
    });
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}
}
