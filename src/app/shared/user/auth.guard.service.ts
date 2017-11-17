import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
//import { ToastrService } from '../common/toastr.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
             ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLoggedIn(state.url);
  }
  checkLoggedIn(url: string): boolean {
   alert(this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // this.toastr.info('Please login to access this page.')
    this.router.navigate(['/login']);
    return true;
  }
}
