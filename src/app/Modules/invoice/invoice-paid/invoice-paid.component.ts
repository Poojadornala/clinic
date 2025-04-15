import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/Models/invoice';
import { InvoiceService } from 'src/app/Services/invoice.service';
import { PaymentService } from 'src/app/Services/payment.service';

@Component({
  selector: 'app-invoice-paid',
  templateUrl: './invoice-paid.component.html',
  styleUrls: ['./invoice-paid.component.css'],
})
export class InvoicePaidComponent implements OnInit {
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
  details = {
    receipt_number: '',
    payment_method_details: {
      card: { brand: '', last4: '' },
    },
    amount_captured: 0,
    amount: 0,
  };
  date = '';
  time = '';
  currentStatus;
  ngOnInit() {
    this.activeRoute.params.subscribe((a) => {
      this.invoiceService.getById(a['id']).subscribe((data) => {
        this.currentStatus = data.payment_status;
        data.payment_status = true;
        this.invoice = data;
        console.log('hhh');
        this.date = new Date(data.date).toDateString();
        this.time = new Date(data.date).toLocaleTimeString();

        if (
          this.invoice.paymentMethod === 'Credit Card' &&
          this.currentStatus === false
        ) {
          this.invoiceService.editInvoice(a['id'], this.invoice).subscribe();
        }
      });
    });
  }

  printPageArea(id) {
    const prtContent = document.getElementById(id);
    const WinPrint = window.open(
      '',
      '',
      'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0'
    );
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    setTimeout(() => {
      WinPrint.close();
    }, 1000);
  }

  constructor(
    private paymentService: PaymentService,
    private activeRoute: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {}
}
