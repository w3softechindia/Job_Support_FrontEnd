import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerMembershipRoutingModule } from './employer-membership-routing.module';
import { EmployerMembershipComponent } from './employer-membership.component';


@NgModule({
  declarations: [
    EmployerMembershipComponent
  ],
  imports: [
    CommonModule,
    EmployerMembershipRoutingModule
  ]
})
export class EmployerMembershipModule { }
