import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  registrationform:FormGroup=new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  user:User= new User();
  email!:string;
  constructor(public router: Router, private service:UserService , private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.registrationform= this.formbuilder.group({
      username:['' , [Validators.required,Validators.minLength(4)]],
      email:['' , [Validators.required,Validators.email]],
      password:['' , [Validators.required,Validators.minLength(8)]]
    })
  }

      register(){
        this.user=this.registrationform.value;
        this.email=this.user.email;
        this.service.register(this.user).subscribe((data) =>{
          console.log(data);
          console.log(this.email);
          // alert("Details Saved Succesfull..!!")
          this.router.navigate(['/pages/onboard-screen',this.email]);
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
