import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { EmployerheaderComponent } from '../common/employerheader/employerheader.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

import { FormsModule ,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployerComponent,
    EmployerheaderComponent,
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class EmployerModule { }
