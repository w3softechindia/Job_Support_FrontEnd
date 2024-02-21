import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerMembershipComponent } from './employer-membership.component';

const routes: Routes = [{path:'',component:EmployerMembershipComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerMembershipRoutingModule { }
