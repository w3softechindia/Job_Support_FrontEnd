import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProposalsComponent } from './view-proposals.component';

const routes: Routes = [{path:'',component:ViewProposalsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewProposalsRoutingModule { }
