import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../Services/home.service';
import { DoctorService } from '../Services/doctor.service';
import { ProfileService } from '../Services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  doctorsCount: object;
  clinicsCount: object;
  patientsCount: object;
  appointmentsCount: object;
  ngOnInit() {
    if (localStorage.getItem('logged')) {
      this.profileService.isUserLogged = true;
      this.profileService.userIsStillLoged.subscribe((res) => {
        console.log(res);
        res = true;
      });
    }
    this.homeService.getDoctorsCount().subscribe((value) => {
      this.doctorsCount = value;
    });
    this.homeService.getClinicsCount().subscribe((value) => {
      this.clinicsCount = value;
    });
    this.homeService.getPatientsCount().subscribe((value) => {
      this.patientsCount = value;
    });
    this.homeService.getAppointmentsCount().subscribe((value) => {
      this.appointmentsCount = value;
    });
  }
  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private homeService: HomeService,
    private profileService: ProfileService
  ) {}

  sendingParameterToDoctorsService(speciality: string) {
    console.log(speciality);
    this.router.navigate(['/doctor']);
    this.doctorService.specialityParameter = speciality;
  }
  title = 'GFG';

  images: any[] = [
    {
      previewImageSrc: '../../assets/images/surgery.webp',
      thumbnailImageSrc:
        'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210203171024/CSSTutorial.png',
      alt: 'Surgeon image',
      title: 'Surgeon',
      href: '/doctor',
    },
    {
      previewImageSrc: '../../assets/images/urologist.jpg',
      thumbnailImageSrc:
        'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210322182256/AngularJS-Tutorial.png',
      alt: 'urologists',
      title: 'Urologist',
      href: '/doctor',
    },
    {
      previewImageSrc: '../../assets/images/dentist.webp',
      thumbnailImageSrc:
        'https://media.geeksforgeeks.org/wp-content/cdn-uploads/Java.png',
      alt: 'dentists image',
      title: 'Dentist',
      href: '/patient',
    },
    {
      previewImageSrc: '../../assets/images/orth.jpg',
      thumbnailImageSrc:
        'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220401124017/HTML-Tutorial.png',
      alt: 'orthopedic',
      title: 'orthopedist',
      href: '/doctor',
    },
    {
      previewImageSrc: '../../assets/images/opt.jpg',
      thumbnailImageSrc:
        'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220401124017/HTML-Tutorial.png',
      alt: 'Optometrist',
      title: 'optopedic',
      href: '/doctor',
    },
    {
      previewImageSrc: '../../assets/images/internist1.jpg',
      thumbnailImageSrc:
        'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220401124017/HTML-Tutorial.png',
      alt: 'internist image',
      title: 'Internist',
      href: '/doctor',
    },
  ];
}
