/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/classes/user';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('otpModal') otpModal!: ElementRef; // Reference to the modal element
  public routes = routes;

  registrationform: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  user: User = new User();
  email!: string;
  timerDisplay!: number;
  emailExists=false;
  constructor(public router: Router, private service: UserService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationform = this.formbuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]],
      terms: [false, Validators.requiredTrue]
    })
  }

  register() {
    this.user = this.registrationform.value;
    this.email = this.user.email;

    this.service.checkEmailExists(this.email).subscribe(
      emailExists => {
        if (emailExists) {
          this.emailExists=true;
        } else {
          // Proceed with registration
          this.service.register(this.user).subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.error('Error during registration:', error);
              // Handle error
            }
          );
        }
      },
      error => {
        console.error('Error checking email existence:', error);
        // Handle error
      }
    );
  }

  public hidePassword: boolean[] = [true];

  public togglePassword(index: number) {
    this.hidePassword[index] = !this.hidePassword[index];
  }

  // onModalShown(): void {
  //   this.user = this.registrationform.value;
  //   this.email = this.user.email;
  //   setTimeout(() => {
  //     // Redirect to another page after 7 seconds
  //     this.router.navigate(['/pages/otp', this.email]);
  //   }, 7000); // 7 seconds
  // }

  onModalShown(): void {
    this.user = this.registrationform.value;
    this.email = this.user.email;
  }

  navigation(){
    this.router.navigate(['/pages/otp', this.email]);
  }
  
  validatePassword() {
    const passwordControl = this.registrationform.get('password');
    if (passwordControl) {
      if (passwordControl.dirty || passwordControl.touched) {
        passwordControl.updateValueAndValidity();
      }
    }
  }

  validateEmail() {
    const emailControl = this.registrationform.get('email');
    if (emailControl) {
      if (emailControl.dirty || emailControl.touched) {
        emailControl.updateValueAndValidity();
      }
    }
  }

  validateName(){
    const nameControl=this.registrationform.get('name');
    if(nameControl){
      if(nameControl.dirty || nameControl.touched){
        nameControl.updateValueAndValidity();
      }
    }
  }
}
