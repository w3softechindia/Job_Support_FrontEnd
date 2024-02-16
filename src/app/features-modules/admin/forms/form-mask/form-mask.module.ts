import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormMaskRoutingModule } from './form-mask-routing.module';
import { FormMaskComponent } from './form-mask.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    FormMaskComponent
  ],
  imports: [
    CommonModule,
    FormMaskRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({
      showMaskTyped : false,
      // clearIfNotMatch : true
    })
  ]
})
export class FormMaskModule { }
