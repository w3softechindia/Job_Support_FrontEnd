import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent implements OnInit {
  
  constructor(private route:ActivatedRoute,private router:Router,private userservice:UserService){}
  email!:string;
  public routes = routes
  oneTimePassword = {
    data1: "",
    data2: "",
    data3: "",
    data4: "",
  };
  remainingTime = 60;
  otpValue = '';
  result!:boolean;

  // Method to concatenate OTP digits
  concatOTP(): void {
    this.otpValue = `${this.oneTimePassword.data1}${this.oneTimePassword.data2}${this.oneTimePassword.data3}${this.oneTimePassword.data4}`;
    console.log(this.otpValue);
  }

  user:User=new User();
  ngOnInit(): void {
    this.email = this.route.snapshot.params['email'];

    // Update remaining time every second
    setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--; // Decrement remaining time
      }
    }, 1000); // Update every second (1000 milliseconds)
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

  verifyOTP(){
    this.concatOTP();
    this.userservice.verifyOtpEmail(this.email,this.otpValue,this.result).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/auth/reset-password',this.email]);
      alert("Otp Verified Successfully..!!!")
    },error=>{
      alert("Entered Wrong Otp..!!");
      console.log(error);
    })
  }

  resendOTP(){
    this.userservice.resendOTP(this.email).subscribe(
      (data) => {
        console.log(data); // Handle successful response
      },
      (error) => {
        console.error('Error occurred while resending OTP:', error); // Handle error response
      }
    );
  }
}
