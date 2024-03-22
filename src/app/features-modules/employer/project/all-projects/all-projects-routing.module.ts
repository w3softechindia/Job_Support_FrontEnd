import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectsComponent } from './all-projects.component';
import { ViewProjectDetailsComponent } from '../view-project-details/view-project-details.component';

const routes: Routes = [{ path: '', component: AllProjectsComponent },
{ path: 'view/:id', component: ViewProjectDetailsComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllProjectsRoutingModule { }
