import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployersRoutingModule } from './employers-routing.module';
import { EmployersComponent } from './employers.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployersComponent
  ],
  imports: [
    CommonModule,
    EmployersRoutingModule,
    FormsModule
  ]
})
export class EmployersModule { }
