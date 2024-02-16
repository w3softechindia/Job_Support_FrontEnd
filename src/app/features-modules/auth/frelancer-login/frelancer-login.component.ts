import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { routes } from 'src/app/core/helpers/routes/routes';
import { WebStorage } from 'src/app/core/storage/web.storage';





@Component({
  selector: 'app-frelancer-login',
  templateUrl: './frelancer-login.component.html',
  styleUrls: ['./frelancer-login.component.scss']
})
export class FrelancerLoginComponent implements   OnInit ,OnDestroy{



  public password: boolean[] = [true];
  public routes = routes
  public Toggledata = true;
   
  public CustomControler: unknown;
  public subscription: Subscription;
  form = new UntypedFormGroup({
    email: new UntypedFormControl('admin@dreamguys.in'),
    password: new UntypedFormControl('123456')
  });
  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data != '0') {
        this.CustomControler = data;
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
  otherPages(val: string) {
    localStorage.setItem(val, val);
  }
  

  public togglePassword(index: number) {
    this.password[index] = !this.password[index];
  }
}



