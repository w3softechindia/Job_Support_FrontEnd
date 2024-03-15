import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployersComponent } from './employers.component';

const routes: Routes = [
  { path: '', 
  component: EmployersComponent,
  children: [
    { 
      path: 'all', 
    loadChildren: () => import('./all/all.module').then(m => m.AllModule) 
  }, 
    { 
      path: 'active', 
    loadChildren: () => import('./active/active.module').then(m => m.ActiveModule) 
  }, 
    { 
      path: 'de-activated', 
    loadChildren: () => import('./de-active/de-active.module').then(m => m.DeActiveModule) 
  },  
  ] },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployersRoutingModule { }
