import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent{
togglePassword(arg0: number) {
throw new Error('Method not implemented.');
}
  public password: boolean[] = [true];
  public routes = routes
  public Toggledata = true;

  employerLoginData={
    email:'',
    password:''
  }

  email!:string;

  constructor(
    private userService:UserService,private auth:AuthService,private router:Router) {

  }

  employerLogin(){
    console.log(this.employerLoginData)
    this.userService.login(this.employerLoginData).subscribe((response:any)=>{
      console.log('Login success',response);
      
      const jwtToken = response.jwt_token;
      const user=response.user;
      const role=user.role;
      const isVerified=user.verified;

      this.auth.setToken(jwtToken);
      this.auth.setRoles(role);
      this.auth.setUsername(user.name);
      this.auth.setEmail(user.email);

      if(isVerified){
        if(role ==="Employer"){
         this.router.navigate(['/employer/dashboard']);
        }else{
          alert('Invalid Credentials..!!')

        }
      } else {
        alert('Your Account is not Verified..!!!');
      }
    }, (error) => {
      console.error('Login Error', error);
    });
  }
  
}
