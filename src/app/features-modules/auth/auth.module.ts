import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FrelancerLoginComponent } from './frelancer-login/frelancer-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthComponent,
    FrelancerLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,FormsModule, ReactiveFormsModule 
  ]
})
export class AuthModule { }
