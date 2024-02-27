import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features-modules/admin/auth/login/login.component';
import { OnboardScreenComponent } from './features-modules/pages/onboard/onboard-screen/onboard-screen.component';
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
  { path: 'pages/onboard-screen/:email', component: OnboardScreenComponent },
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
