import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';

import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

import { MatSortModule } from '@angular/material/sort';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgChartsModule } from 'ng2-charts';
import { LightboxModule } from 'ngx-lightbox';
import { CountUpModule } from 'ngx-countup';
import { NgxEditorModule } from 'ngx-editor';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LightgalleryModule } from 'lightgallery/angular'; 
import { MatTooltipModule } from '@angular/material/tooltip';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';


@NgModule({
  
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSliderModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatStepperModule,
    MatProgressBarModule,
    ClipboardModule,
    DragDropModule,
    MatCheckboxModule,
    ScrollingModule,
    MatIconModule,
    PopoverModule.forRoot(),
    MatTooltipModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgScrollbarModule,
    NgChartsModule,
    LightboxModule,
    MatSelectModule,
    CountUpModule,
    NgxEditorModule,
    BsDatepickerModule.forRoot(),
    CarouselModule,
    LightgalleryModule,
    TimepickerModule.forRoot()
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSliderModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatStepperModule,
    MatProgressBarModule,
    ClipboardModule,
    DragDropModule,
    MatCheckboxModule,
    ScrollingModule,
    MatIconModule,
    PopoverModule,
    ModalModule,
    MatTooltipModule,
    ToastrModule,
    NgScrollbarModule,
    NgChartsModule,
    LightboxModule,
    MatSelectModule,
    CountUpModule,
    NgxEditorModule,
    BsDatepickerModule,
    CarouselModule,
    LightgalleryModule,
    TimepickerModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    BsDatepickerConfig
  ],
})
export class SharedModule {}
