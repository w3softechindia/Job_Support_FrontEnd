import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features-modules/admin/auth/login/login.component';
import { MembershipComponent } from './features-modules/employer/membership/membership.component';
// import {
//   AuthenticateGuard
//   } from './core/guard/guard.index';


const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./features-modules/features-modules.module').then( (m) => m.FeaturesModulesModule) 
  },
  {
    path:'admin-login', component:LoginComponent
  },
  {
    path:'e-membership',component:MembershipComponent
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
