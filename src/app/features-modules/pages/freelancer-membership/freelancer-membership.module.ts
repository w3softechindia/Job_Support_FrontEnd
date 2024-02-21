import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerMembershipRoutingModule } from './freelancer-membership-routing.module';
import { FreelancerMembershipComponent } from './freelancer-membership.component';


@NgModule({
  declarations: [
    FreelancerMembershipComponent
  ],
  imports: [
    CommonModule,
    FreelancerMembershipRoutingModule
  ]
})
export class FreelancerMembershipModule { }
