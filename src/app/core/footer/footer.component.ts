import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/responsive.css',
  ],
})
export class FooterComponent {
  ngOnDestroy() {
    console.log('destroy-footer');
  }
}
