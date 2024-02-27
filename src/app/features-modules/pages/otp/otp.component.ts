import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private userservice:UserService){}
  email!:string;
  public routes = routes
  oneTimePassword = {
    data1: "",
    data2: "",
    data3: "",
    data4: "",
  };
  remainingTime: string = '1:00';
  otpValue: string = '';

  // Method to concatenate OTP digits
  concatOTP(): void {
    this.otpValue = `${this.oneTimePassword.data1}${this.oneTimePassword.data2}${this.oneTimePassword.data3}${this.oneTimePassword.data4}`;
    console.log(this.otpValue);
  }

  user:User=new User();
  ngOnInit(): void {
    this.email = this.route.snapshot.params['email'];
  }

  public ValueChanged(data: string, box: string): void {
    if (box == 'digit-1' && data.length > 0) {
      document.getElementById('digit-2')?.focus();
    } else if (box == 'digit-2' && data.length > 0) {
      document.getElementById('digit-3')?.focus();
    } else if (box == 'digit-3' && data.length > 0) {
      document.getElementById('digit-4')?.focus();
    } else {
      return
    }
  }
  public tiggerBackspace(data: string, box: string) {
    let StringyfyData;
    if (data) {
      StringyfyData = data.toString();
    } else {
      StringyfyData = null;
    }
    if (box == 'digit-4' && StringyfyData == null) {
      document.getElementById('digit-3')?.focus();
    } else if (box == 'digit-3' && StringyfyData == null) {
      document.getElementById('digit-2')?.focus();
    } else if (box == 'digit-2' && StringyfyData == null) {
      document.getElementById('digit-1')?.focus();
    }
  }

  verifyEmail(){
    this.concatOTP();
    this.userservice.verifyAccount(this.email,this.otpValue,this.user).subscribe(()=>{
      this.router.navigate(['/pages/onboard-screen',this.email]);
      alert("Account verified Successfully...!!!")
    },error=>{
      alert("Invalid Otp...!!!");
      console.error(error);
    })
  }

  resetOTPDigits(): void {
    // Reset OTP input fields
    this.oneTimePassword = {
      data1: "",
      data2: "",
      data3: "",
      data4: ""
    };
  }
}
