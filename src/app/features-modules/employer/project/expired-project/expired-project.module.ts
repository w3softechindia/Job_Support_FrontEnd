import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpiredProjectRoutingModule } from './expired-project-routing.module';
import { ExpiredProjectComponent } from './expired-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ExpiredProjectComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ExpiredProjectRoutingModule
  ]
})
export class ExpiredProjectModule { }
