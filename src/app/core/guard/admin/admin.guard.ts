import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../../helpers/routes/routes';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private router: Router) { }
  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = localStorage.getItem('role');
    const adminLoggedIn = userRole === 'Admin';

    // Check if the user is logged in and their role is Employer
    if (adminLoggedIn) {
      return true;
    } else {
      return this.router.createUrlTree([routes.admin_login]);
    }
  }
}
