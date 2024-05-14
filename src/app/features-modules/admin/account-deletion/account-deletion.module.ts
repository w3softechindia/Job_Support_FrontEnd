import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountDeletionRoutingModule } from './account-deletion-routing.module';
import { AccountDeletionComponent } from './account-deletion.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountDeletionComponent
  ],
  imports: [
    CommonModule,
    AccountDeletionRoutingModule,
    FormsModule
  ]
})
export class AccountDeletionModule { }
