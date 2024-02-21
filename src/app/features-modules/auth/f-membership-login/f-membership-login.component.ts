import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-f-membership-login',
  templateUrl: './f-membership-login.component.html',
  styleUrls: ['./f-membership-login.component.scss']
})
export class FMembershipLoginComponent {
  public routes=routes;
  public password: boolean[] = [true];
  public Toggledata = true;
  
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
  
  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
}
