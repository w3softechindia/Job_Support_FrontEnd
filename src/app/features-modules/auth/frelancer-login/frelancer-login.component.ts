import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';





@Component({
  selector: 'app-frelancer-login',
  templateUrl: './frelancer-login.component.html',
  styleUrls: ['./frelancer-login.component.scss']
})

export class FrelancerLoginComponent {

  public password: boolean[] = [true];
  public routes = routes
  public Toggledata = true;
  freelancerLoginData={
    email:'',
    password:''
  }

  constructor(private userService:UserService,private auth:AuthService,private router:Router) {
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
  otherPages(val: string) {
    localStorage.setItem(val, val);
  }
  

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }

  freelancerLogin(){
    console.log(this.freelancerLoginData);
    this.userService.login(this.freelancerLoginData).subscribe((response:any)=>{
      console.log('Login success',response);
      
      const jwtToken = response.jwt_token;
      const user=response.user;
      const role=user.role;
      const isVerified=user.verified;

      this.auth.setToken(jwtToken);
      this.auth.setRoles(role);
      this.auth.setUsername(user.name);
      this.auth.setEmail(user.email);

      console.log(jwtToken)
      console.log(user)

      if(isVerified){
        if(role ==='Freelancer'){
          this.router.navigate(['/freelancer/dashboards']);
        }
        else{
          alert('Invalid Credentials..!!') 
        }
      }
      else{
        alert('Your Account is not Verified..!!!')
      }
    },(error)=>{
      console.error('Login Error',error);
    })
  }
}



