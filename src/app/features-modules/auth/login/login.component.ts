import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public password: boolean[] = [true];
  public routes = routes
  public Toggledata = true;

  employerLoginData={
    email:'',
    password:''
  }

  constructor(
    private userService:UserService,private auth:AuthService,private router:Router) {
  }
 
  ngOnInit() {
    console.log('Hello')
  }

  employerLogin(){
    console.log(this.employerLoginData)
    this.userService.login(this.employerLoginData).subscribe((data:any)=>{
      console.log('Login success',data);
      
      const jwtToken = data.jwt_token;
      const user=data.user;
      const role=user.role;
      const isVerified=user.verified;

      this.auth.setToken(jwtToken);
      this.auth.setRoles(role);
      this.auth.setUsername(user.username);
      this.auth.setEmail(user.email);

      console.log(jwtToken)
      console.log(user)
      console.log(role) 

      if(isVerified){
        if(role ==="Employer"){
         this.router.navigate(['/employer/dashboard']);
        }else{
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
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
  otherPages(val: string) {
    localStorage.setItem(val, val);
  }
  

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
}
