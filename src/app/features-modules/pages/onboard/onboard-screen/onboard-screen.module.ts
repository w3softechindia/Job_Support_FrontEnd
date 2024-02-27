import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OnboardScreenRoutingModule } from './onboard-screen-routing.module';
import { OnboardScreenComponent } from './onboard-screen.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OnboardScreenComponent
  ],
  imports: [
    CommonModule,
    OnboardScreenRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class OnboardScreenModule { }
