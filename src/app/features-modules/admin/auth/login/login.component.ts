import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { WebStorage } from '../../../../core/storage/web.storage';
interface CustomControlerType {
  status: string;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit , OnDestroy{
  public Toggledata = true;
   
  public CustomControler: CustomControlerType | undefined;
  public subscription: Subscription;
  form = new UntypedFormGroup({
    email: new UntypedFormControl('admin@dreamguys.in', [Validators.required]),
    password: new UntypedFormControl('123456', [Validators.required]),
  });
  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data !== '0') {
        this.CustomControler = data as CustomControlerType;
      }
    });
  }
  ngOnInit() {
    this.storage.Checkuser();
    localStorage.removeItem('LoginData');
  }

  submit() {
    this.storage.Login(this.form.value);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}
