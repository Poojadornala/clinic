import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stripe } from 'stripe';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  baseUrl = 'http://localhost:3000/checkout-session/';
  baseUrl1 = 'http://localhost:3000/checking/';
  private stripe: any;
  payment_status;

  getPayment() {
    return this.http.get<{ session }>(this.baseUrl);
  }

  getChecking() {
    return this.http.get<{ lastPaid }>(this.baseUrl1);
  }

  constructor(public http: HttpClient) {
    this.stripe = new Stripe(
      'pk_test_51MXKe9C29MDmzShDOlRGauGbvHPTHM2Q3wd4QLsd7rtmPyvBtIaDPfbPGyx29QuPQiTpAvmvk1ogMTEJf9mVOcDc00fKL2xpTC',
      {
        apiVersion: '2022-11-15',

        host: 'api.stripe.com',
        stripeAccount: 'acct_1MXKe9C29MDmzShD',
      }
    );
  }
}
