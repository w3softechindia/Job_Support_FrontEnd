import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllowAccessGuard {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // For demonstration, let's allow access to the route if the query parameter 'allowed' is present
    const allowed = next.queryParams['allowed'];
    if (allowed === 'true') {
      return true;
    } else {
      // Redirect to a different route or handle access denial as per your requirement
      this.router.navigate(['/pages/404-page']);
      return false;
    }
  }
}
