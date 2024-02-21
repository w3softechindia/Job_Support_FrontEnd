import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FMembershipLoginRoutingModule } from './f-membership-login-routing.module';
import { FMembershipLoginComponent } from '../f-membership-login/f-membership-login.component';


@NgModule({
  declarations: [
    FMembershipLoginComponent
  ],
  imports: [
    CommonModule,
    FMembershipLoginRoutingModule
  ]
})
export class FMembershipLoginModule { }
