import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteAccountRoutingModule } from './delete-account-routing.module';
import { DeleteAccountComponent } from './delete-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DeleteAccountComponent
  ],
  imports: [
    CommonModule,
    DeleteAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DeleteAccountModule { }
