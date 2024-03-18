import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProposalsRoutingModule } from './view-proposals-routing.module';
import { ViewProposalsComponent } from './view-proposals.component';


@NgModule({
  declarations: [
    ViewProposalsComponent
  ],
  imports: [
    CommonModule,
    ViewProposalsRoutingModule
  ]
})
export class ViewProposalsModule { }
