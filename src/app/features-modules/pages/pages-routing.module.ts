import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'about',
        loadChildren: () =>
          import('./about-us/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path: 'employer-membership',
        loadChildren: () =>
          import('./employer-membership/employer-membership.module').then((m) => m.EmployerMembershipModule),
      },
      {
        path:'freelancer-membership',
        loadChildren:()=>
          import('./freelancer-membership/freelancer-membership.module').then((m)=>m.FreelancerMembershipModule),
      },
      {
        path:'e-membership-login',
        loadChildren:()=> import('../auth/e-membership-login/e-membership-login.module').then((m)=>m.EMembershipLoginModule)
      },
      {
        path:'f-membership-login',
        loadChildren:()=> import('../auth/f-membership-login/f-membership-login.module').then((m)=>m.FMembershipLoginModule)
      },
      {
        path: 'blank-page',
        loadChildren: () =>
          import('./starter/starter.module').then((m) => m.StarterModule),
      },
      {
        path: 'onboard-screen/:email',
        loadChildren: () =>
          import('./onboard/onboard-screen/onboard-screen.module').then(
            (m) => m.OnboardScreenModule
          ),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoices/invoice/invoice.module').then(
            (m) => m.InvoiceModule
          ),
      },
      {
        path: 'view-invoice',
        loadChildren: () =>
          import('./invoices/invoice-new/invoice-new.module').then(
            (m) => m.InvoiceNewModule
          ),
      },
      {
        path: 'user-account-details',
        loadChildren: () =>
          import('./userdetails/userdetails.module').then(
            (m) => m.UserdetailsModule
          ),
      },
      {
        path: 'onboard-employer/:email',
        loadChildren: () =>
          import('./onboard/onboard-employer/onboard-employer.module').then(
            (m) => m.OnboardEmployerModule
          ),
      },
      {
        path: 'term-condition',
        loadChildren: () =>
          import('./term-condition/term-condition.module').then(
            (m) => m.TermConditionModule
          ),
      },
      {
        path: 'privacy-policy',
        loadChildren: () =>
          import('./privacy-policy/privacy-policy.module').then(
            (m) => m.PrivacyPolicyModule
          ),
      },
      {
        path: 'otp/:email',
        loadChildren: () => import('./otp/otp.module').then((m) => m.OtpModule),
      },
      {
        path: 'faq',
        loadChildren: () => import('./faq/faq.module').then((m) => m.FaqModule),
      },
      { 
        path: '404-page', 
        loadChildren: () => import('./errorfound/errorfound.module').then(m => m.ErrorfoundModule) 
      },
      {
        path:'skills_exp',
        loadChildren:()=> import('./skills-exp/skills-exp.module').then(m=>m.SkillsExpModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
