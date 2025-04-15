import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  role: string;
  constructor(private http: HttpClient) {}
  // authTokenSubject = new Subject<any>();

  // private authToken: any;
  // setAuthToken(token: any) {
  //   this.authToken = token;
  // }
  url: string = 'http://127.0.0.1:3000/signup/';
  loginUrl: string = 'http://127.0.0.1:3000/login/';
  signUp(signedUpObj: any) {
    return this.http.post<any>(this.url, signedUpObj);
  }

  login(signedInObj: any) {
    return this.http.post<any>(this.loginUrl, signedInObj);
  }
}
