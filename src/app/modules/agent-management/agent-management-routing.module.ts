import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentManagementComponent } from './agent-management.component';

const routes: Routes = [{ path: '', component: AgentManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentManagementRoutingModule {}
