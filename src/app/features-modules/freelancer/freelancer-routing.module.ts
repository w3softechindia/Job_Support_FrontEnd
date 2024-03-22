import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancerComponent } from './freelancer.component';
import { FreelancerGuard } from 'src/app/core/guard/guard.index';

const routes: Routes = [
  {
    path: '',
    component: FreelancerComponent,
    children: [
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      {
        path: 'dashboards',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'developer-profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'membership',
        loadChildren: () =>
          import('./membership/membership.module').then(
            (m) => m.MembershipModule
          ),canActivate: [FreelancerGuard],
      },

      {
        path: 'chats',
        loadChildren: () =>
          import('./chats/chats.module').then((m) => m.ChatsModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('./review/review.module').then((m) => m.ReviewModule),canActivate: [FreelancerGuard],
      },

      {
        path: 'project',
        loadChildren: () =>
          import('./project/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: 'project-details/:id',
        loadChildren: () =>
          import('./project/projects-details/projects-details.module').then(
            (m) => m.ProjectsDetailsModule
          ),
      },
      {
        path: 'portfolio',
        loadChildren: () =>
          import('./portfolio/portfolio.module').then((m) => m.PortfolioModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'statement',
        loadChildren: () =>
          import('./statement/statement.module').then((m) => m.StatementModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'payout',
        loadChildren: () =>
          import('./payout/payout.module').then((m) => m.PayoutModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'ongoing-projects',
        loadChildren: () =>
          import('./project/ongoing-projects/ongoing-projects.module').then(
            (m) => m.OngoingProjectsModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'completed-projects',
        loadChildren: () =>
          import('./project/completed-projects/completed-projects.module').then(
            (m) => m.CompletedProjectsModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'cancelled-projects',
        loadChildren: () =>
          import('./project/cancelled-projects/cancelled-projects.module').then(
            (m) => m.CancelledProjectsModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'project-list',
        loadChildren: () =>
          import('./project/project-list/project-list.module').then(
            (m) => m.ProjectListModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'favourites',
        loadChildren: () =>
          import(
            './favourites/freelancer-favourites/freelancer-favourites.module'
          ).then((m) => m.FreelancerFavouritesModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'invitations',
        loadChildren: () =>
          import(
            './favourites/freelancer-invitations/freelancer-invitations.module'
          ).then((m) => m.FreelancerInvitationsModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'files',
        loadChildren: () =>
          import('./project/files/files.module').then((m) => m.FilesModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'milestones',
        loadChildren: () =>
          import('./project/milestones/milestones.module').then(
            (m) => m.MilestonesModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'payments',
        loadChildren: () =>
          import('./project/payments/payments.module').then(
            (m) => m.PaymentsModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'profile-settings',
        loadChildren: () =>
          import('./settings/profile-settings/profile-settings.module').then(
            (m) => m.ProfileSettingsModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'project-proposals',
        loadChildren: () =>
          import('./project/project-proposals/project-proposals.module').then(
            (m) => m.ProjectProposalsModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'task',
        loadChildren: () =>
          import('./project/task/task.module').then((m) => m.TaskModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'verified',
        loadChildren: () =>
          import('./settings/verified/verified.module').then(
            (m) => m.VerifiedModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'verify-identity',
        loadChildren: () =>
          import('./settings/verify-identity/verify-identity.module').then(
            (m) => m.VerifyIdentityModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'view-project-detail/:id',
        loadChildren: () =>
          import(
            './project/view-project-detail/view-project-detail.module'
          ).then((m) => m.ViewProjectDetailModule),canActivate: [FreelancerGuard],
      },
      {
        path: 'delete-account',
        loadChildren: () =>
          import('./settings/delete-account/delete-account.module').then(
            (m) => m.DeleteAccountModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'withdraw-money',
        loadChildren: () =>
          import('./withdraw-money/withdraw-money.module').then(
            (m) => m.WithdrawMoneyModule
          ),canActivate: [FreelancerGuard],
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./settings/change-password/change-password.module').then(
            (m) => m.ChangePasswordModule
          ),canActivate: [FreelancerGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancerRoutingModule {}
