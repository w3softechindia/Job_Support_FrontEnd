import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule, FormsModule, ReactiveFormsModule
  ]
})
export class PagesModule { }
