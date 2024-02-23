import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-e-membership-login',
  templateUrl: './e-membership-login.component.html',
  styleUrls: ['./e-membership-login.component.scss']
})
export class EMembershipLoginComponent {
public routes=routes;
// public password: boolean[] = [true];
// public Toggledata = true;

// iconLogle() {
//   this.Toggledata = !this.Toggledata;
// }

// public togglePassword(index: number) {
//   this.password[index] = !this.password[index];
// }
// constructor(private router: Router) {}
// login(){
//   this.router.navigate(['/employee-membership-plans']);
// }
}
