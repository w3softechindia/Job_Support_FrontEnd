import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { routes } from '../../helpers/routes/routes';
import { UserService } from 'src/app/Services/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FreelancerGuard {
  constructor(private router: Router,private userService:UserService,private auth:AuthService) { }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ):
  //   Observable<boolean | UrlTree>
  //   | Promise<boolean | UrlTree>
  //   | boolean | UrlTree {
  //   const userRole = localStorage.getItem('role');
  //   const freelancerLoggedIn = userRole === 'Freelancer';
  //   if (freelancerLoggedIn) {
  //     return true;
  //   } else {
  //     return this.route.navigate([routes.login]);
  //   }
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRole = localStorage.getItem('role');
    const employerLoggedIn = userRole === 'Freelancer';
    const email=this.auth.getEmail();
    
    // Check if the user is logged in and their role is Employer
    if (employerLoggedIn) {
      // If the user is logged in as an employer, check their account status
      return this.userService.getAccountStatus(email).pipe(
        map((status: string) => {
          // Check if the user's account is active
          const accountActive = status === 'Active';
          if (accountActive) {
            // If the account is active, allow access to all pages
            return true;
          } else {
            // If the account is inactive, restrict access to allocated pages
            const allowedRoutes = ['/freelancer/dashboards', '/freelancer/profile-settings','/freelancer/verify-identity','/freelancer/change-password','/freelancer/delete-account']; // Define routes accessible for inactive accounts
            const requestedRoute = state.url;
            if (allowedRoutes.includes(requestedRoute)) {
              // If the requested route is allowed for inactive accounts, allow access
              return true;
            } else {
              // If the requested route is not allowed for inactive accounts, redirect to login
              return this.router.createUrlTree([routes.login]);
            }
          }
        })
      );
    } else {
      // If the user is not logged in as an employer, redirect to login
      return this.router.createUrlTree([routes.login]);
    }
  }

}
