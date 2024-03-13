import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../../helpers/routes/routes';

@Injectable({
  providedIn: 'root'
})
export class EmployerGuard {
  constructor(private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    const userRole = localStorage.getItem('role');
    const employerLoggedIn = userRole === 'Employer';
    if (employerLoggedIn) {
      return true;
    } else {
      return this.route.navigate([routes.login]);
    }
  }

}
