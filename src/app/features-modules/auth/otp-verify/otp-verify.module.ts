import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpVerifyRoutingModule } from './otp-verify-routing.module';
import { OtpVerifyComponent } from './otp-verify.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OtpVerifyComponent
  ],
  imports: [
    CommonModule,
    OtpVerifyRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class OtpVerifyModule { }
