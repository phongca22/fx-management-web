import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorManagementComponent } from './doctor-management.component';

const routes: Routes = [{ path: '', component: DoctorManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorManagementRoutingModule { }
