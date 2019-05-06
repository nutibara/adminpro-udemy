import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { CrearHospitalComponent } from '../components/crear-hospital/crear-hospital.component';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      PipesModule,
      FormsModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent,
        CrearHospitalComponent
      ],
      exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent,
        CrearHospitalComponent
      ]
})

export class SharedModule { }
