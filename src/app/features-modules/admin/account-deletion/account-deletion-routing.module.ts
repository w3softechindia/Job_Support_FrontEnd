import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDeletionComponent } from './account-deletion.component';

const routes: Routes = [{ path: '', component: AccountDeletionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDeletionRoutingModule { }
