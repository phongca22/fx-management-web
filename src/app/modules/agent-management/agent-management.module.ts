import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { AgentManagementRoutingModule } from './agent-management-routing.module';
import { AgentManagementComponent } from './agent-management.component';

@NgModule({
  declarations: [AgentManagementComponent],
  imports: [
    CommonModule,
    AgentManagementRoutingModule,
    SharedModule,
    TranslateModule.forChild({}),
    ReactiveFormsModule,
    OverlayModule
  ]
})
export class AgentManagementModule {}
