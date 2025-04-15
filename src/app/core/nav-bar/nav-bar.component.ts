import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/Models/doctor';
import { Employee } from 'src/app/Models/employee';
import { Patient } from 'src/app/Models/patient';
import { ProfileService } from 'src/app/Services/profile.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [
    './nav-bar.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/responsive.css',
  ],
})
export class NavBarComponent {
  @HostListener('window:storage')
  onStorageChange() {
    this.logOut();
    this.route.navigate(['/auth']);
  }
  user: Employee | Doctor | Patient;
  userLogged = false;
  currentLoggedRole: string;

  constructor(public profileService: ProfileService, private route: Router) {
    if (localStorage.getItem('logged')) {
      this.userLogged = true;
    }
    this.currentLoggedRole = localStorage.getItem('role');
    profileService.userSubject.subscribe((user) => {
      if (!this.profileService.isUserLogged) {
        this.userLogged = true; //false
      } else {
        this.userLogged = this.profileService.isUserLogged; //true
      }
      if (localStorage.getItem('logged')) {
        this.userLogged = true;
      }
      this.user = user;
      console.log('user');

      this.currentLoggedRole = localStorage.getItem('role');
      this.profileService.userIsStillLoged.next(this.userLogged);
    });
  }
  ngOnInit() {}
  logOut() {
    localStorage.clear();
    this.userLogged = !this.userLogged;
    this.currentLoggedRole = null;
    this.user = null;
  }
  // onDesplayAppointments() {
  //   if (localStorage.getItem('role') == 'patient') {
  //   }
  // }
}
