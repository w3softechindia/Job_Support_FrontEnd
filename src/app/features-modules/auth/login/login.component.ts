import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { routes } from 'src/app/core/helpers/routes/routes';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { WebStorage } from 'src/app/core/storage/web.storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  public password: boolean[] = [true];
  public routes = routes
  public Toggledata = true;
   
  public CustomControler: unknown;
  public subscription: Subscription;
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  })


  constructor(private storage: WebStorage,private fb:FormBuilder,
    private userService:UserService,private auth:AuthService,private router:Router) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data != '0') {
        this.CustomControler = data;
      }
    });
  }
 
  ngOnInit() {
    this.storage.Checkuser();
    localStorage.removeItem('LoginData');
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  
    
     
   
  }

  freelancerLogin(){
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe((data:any)=>{
      console.log('Login success',data);
      
      const jwtToken = data.jwtToken;
      const user=data.user;
      const role=user.role;
      const isVerified=user.verified;

      this.auth.setToken(jwtToken);
      this.auth.setRoles(role);
      this.auth.setUsername(user.username);
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

  employerLogin(){
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe((data:any)=>{
      console.log('Login success',data);
      
      const jwtToken = data.jwtToken;
      const user=data.user;
      const role=user.role;
      const isVerified=user.verified;

      this.auth.setToken(jwtToken);
      this.auth.setRoles(role);
      this.auth.setUsername(user.username);
      this.auth.setEmail(user.email);

      console.log(jwtToken)
      console.log(user)

      if(isVerified){
        if(role ==='Employer'){
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

  submit() {
    this.storage.Login(this.loginForm.value);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
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
