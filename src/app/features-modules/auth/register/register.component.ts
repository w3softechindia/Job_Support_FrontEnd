import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  implements OnInit {
  public routes = routes;

  selectedusertype='';
  registrationform!:FormGroup;

  constructor(public Router: Router, private service:UserService , private formbuilder:FormBuilder) { }
  ngOnInit(): void {
    this.registrationform= this.formbuilder.group({
      username:['' , [Validators.required,Validators.minLength(4)]],
      email:['' , [Validators.required,Validators.email]],
      password:['' , [Validators.required,Validators.minLength(8)]]
    })
  }

 


  user:User= new User();

      register(){
        this.user=this.registrationform.value;
        console.log(this.selectedusertype)
        this.user.role =this.selectedusertype;
        
        this.service.register(this.user).subscribe((data) =>{
          console.log(data);
        })
      }

 

 
 
  public password: boolean[] = [true];

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
  login() {
    // this.Router.navigate([routes.freelancer_onboard])
  }
 

  submitForm() {
    
    
    // this.Router.navigate([this.routes.freelancer_onboard]);
  }

}
