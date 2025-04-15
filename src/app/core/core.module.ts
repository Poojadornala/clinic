import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [NavBarComponent, FooterComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [NavBarComponent, FooterComponent],
})
export class CoreModule {}
