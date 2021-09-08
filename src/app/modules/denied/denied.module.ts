import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeniedRoutingModule } from './denied-routing.module';
import { DeniedComponent } from './denied.component';
import { SharedModule } from '../shared-module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DeniedComponent],
  imports: [CommonModule, DeniedRoutingModule, SharedModule, TranslateModule.forChild({})]
})
export class DeniedModule {}
