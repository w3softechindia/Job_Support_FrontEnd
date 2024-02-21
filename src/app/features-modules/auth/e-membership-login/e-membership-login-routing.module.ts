import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EMembershipLoginComponent } from './e-membership-login.component';

const routes: Routes = [{path:'',component:EMembershipLoginComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EMembershipLoginRoutingModule { }
