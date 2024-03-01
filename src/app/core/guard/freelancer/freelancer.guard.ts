import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreelancerGuard {
  constructor(private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean | UrlTree {
    const userRole = localStorage.getItem('role');
    const freelancerLoggedIn = userRole === 'Freelancer';
    if (freelancerLoggedIn) {
      return true;
    } else {
      this.route.navigate(['/auth/login']);
      return false;
    }
  }

}
