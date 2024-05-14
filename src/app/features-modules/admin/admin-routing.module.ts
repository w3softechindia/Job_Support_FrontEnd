import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from 'src/app/core/guard/guard.index';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),canActivate: [AdminGuard]
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesModule
          ),canActivate: [AdminGuard]
      },
      {
        path: 'freelancers',
        loadChildren: () =>
          import('./freelancers/freelancers.module').then(
            (m) => m.FreelancersModule
          ),canActivate: [AdminGuard]
      },
      {
        path:'employers',
        loadChildren:()=> import('./employers/employers.module').then((m)=> m.EmployersModule),canActivate: [AdminGuard]
      },
      {
        path: 'deposit',
        loadChildren: () =>
          import('./deposit/deposit.module').then((m) => m.DepositModule),canActivate: [AdminGuard]
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./projects/projects.module').then((m) => m.ProjectsModule),canActivate: [AdminGuard]
      },
      {
        path:'project-proposals',
        loadChildren:()=> import('./project-proposals/project-proposals.module').then((m)=>m.ProjectProposalsModule),canActivate: [AdminGuard]
      },
      {
        path:'view-proposals/:id',
        loadChildren:()=> import('./view-proposals/view-proposals.module').then((m)=>m.ViewProposalsModule),canActivate: [AdminGuard]
      },
      {
        path: 'withdrawn',
        loadChildren: () =>
          import('./withdrawn/withdrawn.module').then((m) => m.WithdrawnModule),canActivate: [AdminGuard]
      },
      {
        path: 'transaction',
        loadChildren: () =>
          import('./transaction/transaction.module').then(
            (m) => m.TransactionModule
          ),canActivate: [AdminGuard]
      },
      {
        path: 'providers',
        loadChildren: () =>
          import('./providers/providers.module').then((m) => m.ProvidersModule),canActivate: [AdminGuard]
      },
      {
        path: 'subscription',
        loadChildren: () =>
          import('./subscription/subscription.module').then(
            (m) => m.SubscriptionModule
          ),canActivate: [AdminGuard]
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),canActivate: [AdminGuard]
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./roles/roles.module').then((m) => m.RolesModule),canActivate: [AdminGuard]
      },
      {
        path: 'skills',
        loadChildren: () =>
          import('./skills/skills.module').then((m) => m.SkillsModule),canActivate: [AdminGuard]
      },
      {
        path: 'verifyidentity',
        loadChildren: () =>
          import('./verifyidentity/verifyidentity.module').then(
            (m) => m.VerifyidentityModule
          ),canActivate: [AdminGuard]
      },
      {
        path: 'account-deletion',
        loadChildren: () =>
          import('./account-deletion/account-deletion.module').then(
            (m) => m.AccountDeletionModule
          ),canActivate: [AdminGuard]
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),canActivate: [AdminGuard]
      },
      {
        path: 'components',
        loadChildren: () =>
          import('./compnents/compnents.module').then((m) => m.CompnentsModule),canActivate: [AdminGuard]
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./forms/forms.module').then((m) => m.FormsModule),canActivate: [AdminGuard]
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./tables/tables.module').then((m) => m.TablesModule),canActivate: [AdminGuard]
      },
      {
        path: 'role-permission',
        loadChildren: () =>
          import('./role/role-permission/role-permission.module').then(
            (m) => m.RolePermissionModule
          ),canActivate: [AdminGuard]
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),canActivate: [AdminGuard]
      },
      {
        path: 'views',
        loadChildren: () =>
          import('./views/views.module').then((m) => m.ViewsModule),canActivate: [AdminGuard]
      },
      {
        path: 'user-transactions',
        loadChildren: () =>
          import(
            './user-profiles/user-transactions/user-transactions.module'
          ).then((m) => m.UserTransactionsModule),canActivate: [AdminGuard]
      },
      {
        path: 'activities',
        loadChildren: () =>
          import('./user-profiles/activities/activities.module').then(
            (m) => m.ActivitiesModule
          ),canActivate: [AdminGuard]
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('./user-profiles/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),canActivate: [AdminGuard]
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
