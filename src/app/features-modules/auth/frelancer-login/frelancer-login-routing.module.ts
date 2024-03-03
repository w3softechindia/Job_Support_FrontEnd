import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrelancerLoginComponent } from './frelancer-login.component';

const routes: Routes = [{path:'',component:FrelancerLoginComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrelancerLoginRoutingModule { }
