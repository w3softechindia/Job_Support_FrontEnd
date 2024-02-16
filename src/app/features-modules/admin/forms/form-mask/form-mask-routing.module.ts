import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMaskComponent } from './form-mask.component';

const routes: Routes = [{ path: '', component: FormMaskComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormMaskRoutingModule { }
