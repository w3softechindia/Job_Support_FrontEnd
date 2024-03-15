import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeActiveComponent } from './de-active.component';

const routes: Routes = [{path:'',component:DeActiveComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeActiveRoutingModule { }
