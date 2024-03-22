import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectProposalsRoutingModule } from './project-proposals-routing.module';
import { ProjectProposalsComponent } from './project-proposals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProjectProposalsComponent
  ],
  imports: [
    CommonModule,
    ProjectProposalsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProjectProposalsModule { }
