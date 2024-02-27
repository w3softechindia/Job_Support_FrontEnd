import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsExpComponent } from './skills-exp.component';

const routes: Routes = [{path:'',component:SkillsExpComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillsExpRoutingModule { }
