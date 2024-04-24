import { Component, OnInit,} from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
import {  Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  public routes = routes;

  registrationform: FormGroup = new FormGroup({
    email: new FormControl(''),
  })

  user: User = new User();
  email!: string;
  emailExists!:boolean;

  constructor(public router: Router,private userService:UserService,private formbuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.registrationform = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  sendOTP(){
    this.user = this.registrationform.value;
    this.email = this.user.email;

    this.userService.checkEmailExists(this.email).subscribe(
      emailExists => {
        if (emailExists) {
          this.emailExists=true;
          // Proceed with registration
          this.userService.SendOtp(this.email).subscribe((data)=>{
            console.log(data);
            // alert('Otp sent to registered email..!!!')
            // this.router.navigate(['/auth/otp-verify',this.email]);
          },error=>{
            console.log(error);
            // alert("Your Email is not Registered...!!!");
          })
        }else{
          this.emailExists=false;
        }
      },
      error => {
        console.error('Error checking email existence:', error);
        // Handle error
      }
    );
  }

  onModalShown(): void {
    this.user = this.registrationform.value;
    this.email = this.user.email;
  }

  navigation(){
    this.router.navigate(['/auth/otp-verify',this.email]);
  }
}

