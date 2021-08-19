import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeniedRoutingModule } from './denied-routing.module';
import { DeniedComponent } from './denied.component';


@NgModule({
  declarations: [
    DeniedComponent
  ],
  imports: [
    CommonModule,
    DeniedRoutingModule
  ]
})
export class DeniedModule { }
