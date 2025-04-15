import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MedicineService } from 'src/app/Services/medicine.service';
import jwt_decode from 'jwt-decode';
import { ProfileService } from 'src/app/Services/profile.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  decodedToken = { role: '', id: '', iat: null, exp: null };
  signUpForm: FormGroup;
  signInForm: FormGroup;
  isInvalidEmailCorrect;
  isEmailDuplicated;

  signInObj = { email: '', password: '' };
  signUpObj = {
    Name: '',
    Email: '',
    Password: '',
    Age: null,
    Address: { government: '', city: '', street: '', building: '' },
  };

  constructor(
    private medicineService: MedicineService,
    private authService: AuthService,
    private route: Router,
    private profileService: ProfileService
  ) {}
  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      Name: new FormControl(null, [
        Validators.required,
        this.medicineService.stringInput.bind(this),
      ]),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      Age: new FormControl(null, [
        Validators.required,
        this.medicineService.numberInput.bind(this),
      ]),

      government: new FormControl(null, [
        Validators.required,
        this.medicineService.stringInput.bind(this),
      ]),
      city: new FormControl(null, [
        Validators.required,
        this.medicineService.stringInput.bind(this),
      ]),
      street: new FormControl(null, [Validators.required]),
      building: new FormControl(null, [Validators.required]),
    });
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmitLogin() {
    this.signInObj.email = this.signInForm.get('email').value;
    this.signInObj.password = this.signInForm.get('password').value;
    this.authService.login(this.signInObj).subscribe((Response) => {
      console.log(Response);
      if (Response.data == 'Authorized') {
        localStorage.setItem('token', Response.token);
        this.decodedToken = jwt_decode(Response.token);
        localStorage.setItem('id', this.decodedToken.id);
        localStorage.setItem('role', this.decodedToken.role);
        localStorage.setItem('logged', 'true');
        this.profileService.id = this.decodedToken.id;
        this.profileService.role = this.decodedToken.role;
        this.route.navigate(['profile']);
        this.profileService.isUserLogged = true;
      } else if (Response.data == 'please provide correct password') {
        this.isInvalidEmailCorrect = true;
      } else if (Response.data == 'not authorized') {
        this.isInvalidEmailCorrect = false;
      }
    });
  }
  onSubmitSignUp() {
    this.signUpObj.Name = this.signUpForm.get('Name').value;
    this.signUpObj.Email = this.signUpForm.get('Email').value;
    this.signUpObj.Password = this.signUpForm.get('Password').value;
    this.signUpObj.Age = this.signUpForm.get('Age').value;
    this.signUpObj.Address.government = this.signUpForm.get('government').value;
    this.signUpObj.Address.city = this.signUpForm.get('city').value;
    this.signUpObj.Address.street = this.signUpForm.get('street').value;
    this.signUpObj.Address.building = this.signUpForm.get('building').value;
    this.authService.signUp(this.signUpObj).subscribe((Response) => {
      if (Response.data == 'this email exists') {
        this.isEmailDuplicated = true;
      }
    });
  }
  onModeChanges() {
    this.isLoginMode = !this.isLoginMode;
    console.log(this.signUpForm);
  }
}
