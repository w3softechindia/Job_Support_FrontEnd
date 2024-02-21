import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FMembershipLoginComponent } from './f-membership-login.component';

const routes: Routes = [{path:'',component:FMembershipLoginComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FMembershipLoginRoutingModule { }
