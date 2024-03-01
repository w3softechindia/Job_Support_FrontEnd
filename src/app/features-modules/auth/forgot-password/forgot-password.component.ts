import { Component, OnInit,} from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public routes = routes;
  email!:string;
  user!:User;
  constructor(public router: Router,private userService:UserService) { }
  ngOnInit(): void {
  }

  // loginFormSubmit(){
  //   this.Router.navigate([routes.employee_dashboard])
  // }

  sendOTP(){
    this.userService.SendOtp(this.email,this.user).subscribe((data)=>{
      console.log(data);
      alert('Otp sent to registered email..!!!')
      this.router.navigate(['/auth/otp-verify',this.email]);
    },error=>{
      console.log(error);
      alert("Your Email is not Registered...!!!");
    })
  }
}
