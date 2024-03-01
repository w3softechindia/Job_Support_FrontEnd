import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from '../../../../core/storage/web.storage';
import { Admin } from 'src/app/classes/admin';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
interface CustomControlerType {
  status: string;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public Toggledata = true;
   
  public CustomControler: CustomControlerType | undefined;
  public subscription: Subscription;
  adminLogin!:FormGroup;
  // form = new UntypedFormGroup({
  //   email: new UntypedFormControl('admin@dreamguys.in', [Validators.required]),
  //   password: new UntypedFormControl('123456', [Validators.required]),
  // });
  get f() {
    return this.adminLogin.controls;
  }

  constructor(private storage: WebStorage, private formbuilder:FormBuilder,private userService:UserService, private router:Router) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data !== '0') {
        this.CustomControler = data as CustomControlerType;
      }
    });
  }
  ngOnInit() {
    this.storage.Checkuser();
    localStorage.removeItem('LoginData');

    this.adminLogin=this.formbuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  submit() {
    this.userService.adminLogin(this.adminLogin.value).subscribe((data)=>{
      console.log("Login Success",data);
      this.router.navigate(['/admin/dashboard']);
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}
