import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      if (localStorage.getItem('logged')) {
        observer.next(true);
        observer.complete();
      } else {
        this.router.navigate(['/auth']);
        observer.next(false);
        observer.complete();
      }
    });
    // if (this.profileService.isUserLogged == false) {
    //   console.log(this.profileService.isUserLogged);
    //   this.router.navigate(['/add-medicine']);
    //   return false;
    // } else {
    //   return true;
    // }
    // return this.profileService.loginSubejct.subscribe(() => {
    //   if (this.profileService.userIsStillLogged == false) {
    //     this.router.navigate(['/add-medicine']);
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
  }
}
