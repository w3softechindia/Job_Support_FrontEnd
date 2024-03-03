import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrelancerLoginRoutingModule } from './frelancer-login-routing.module';
import { FrelancerLoginComponent } from './frelancer-login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FrelancerLoginComponent,
  ],
  imports: [
    CommonModule,
    FrelancerLoginRoutingModule,
    FormsModule 
  ]
})
export class FrelancerLoginModule { }
