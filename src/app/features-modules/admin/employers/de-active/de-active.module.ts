import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeActiveRoutingModule } from './de-active-routing.module';
import { DeActiveComponent } from './de-active.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DeActiveComponent
  ],
  imports: [
    CommonModule,
    DeActiveRoutingModule,
    FormsModule
  ]
})
export class DeActiveModule { }
