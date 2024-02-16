import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OnboardScreenRoutingModule } from './onboard-screen-routing.module';
import { OnboardScreenComponent } from './onboard-screen.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    OnboardScreenComponent
  ],
  imports: [
    CommonModule,
    OnboardScreenRoutingModule,
    SharedModule
  ],
  providers: [
    DatePipe,
  ]
})
export class OnboardScreenModule { }
