/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public Toggledata = true;

  constructor(private userService: UserService, private router: Router, private auth:AuthService) {
  }
  adminLoginData={
    email:'',
    password:''
  }
  ngOnInit() {
    console.log("Hii")
  }

  submit() {
    this.userService.login(this.adminLoginData).subscribe((response: any) => {
      console.log('Login success',response);
      
      const jwtToken = response.jwt_token;
      const user=response.user;
      const role=user.role;

      this.auth.setToken(jwtToken);
      this.auth.setRoles(role);
      this.auth.setName(user.name);
      this.auth.setEmail(user.email);

      if (role === 'Admin') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        alert("Invalid Credentials...!!")
      }
    })
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}
