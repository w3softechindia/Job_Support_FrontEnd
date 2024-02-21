import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerMembershipComponent } from './freelancer-membership.component';

const routes: Routes = [{path:'',component:FreelancerMembershipComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerMembershipRoutingModule { }
