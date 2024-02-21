import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EMembershipLoginRoutingModule } from './e-membership-login-routing.module';
import { EMembershipLoginComponent } from './e-membership-login.component';


@NgModule({
  declarations: [
    EMembershipLoginComponent
  ],
  imports: [
    CommonModule,
    EMembershipLoginRoutingModule
  ]
})
export class EMembershipLoginModule { }
