import { Component  } from '@angular/core';
import {  Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  public routes = routes;
  constructor(public Router: Router) { }

 
 
  public password: boolean[] = [true];

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
  login() {
    this.Router.navigate([routes.freelancer_onboard])
  }
 

  submitForm() {
    
    
    this.Router.navigate([this.routes.freelancer_onboard]);
  }

}
