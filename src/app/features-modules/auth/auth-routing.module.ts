import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [{
  path: '', component: AuthComponent,
  children: [
    {
      path: 'login',
      loadChildren: () => import('../auth/login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'e-membership-login',
      loadChildren: () => import('../auth/e-membership-login/e-membership-login.module').then(m => m.EMembershipLoginModule)
    },
    {
      path: 'f-membership-login',
      loadChildren: () => import('../auth/f-membership-login/f-membership-login.module').then(m => m.FMembershipLoginModule)
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

    { path: 'reset-password/:email', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
    
    {path:'otp-verify/:email', loadChildren: () => import('./otp-verify/otp-verify.module').then(m=>m.OtpVerifyModule)}
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
