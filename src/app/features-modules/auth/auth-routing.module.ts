import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [{ path: '', component: AuthComponent,
children: [
  { 
    path: 'login', 
    loadChildren: () => import('../auth/login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'register', 
    loadChildren: () => import('../auth/register/register.module').then(m => m.RegisterModule) 
  },
  { 
    path: 'forgot-password', 
    loadChildren: () => import('../auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) 
  },
  { 
    path: 'change-password', 
    loadChildren: () => import('../auth/change-password/change-password.module').then(m => m.ChangePasswordModule) 
  },
  
  { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) }
] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
