import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { Admin } from 'src/app/classes/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public Toggledata = true;
  
  constructor(private adminService:AdminService, private router:Router) {
  }
    email!:string;
    password!:string;
    admin!:Admin;
  ngOnInit() {
    console.log("Hii")
  }

  submit() {
    this.adminService.adminlogin(this.email,this.password,this.admin).subscribe((data:any)=>{
      console.log("Login Success",data);
      if(data.role==='Admin'){
        this.router.navigate(['/admin/dashboard']);
      }else{
        alert("Invalid Credentials...!!")
      }
    })
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}
