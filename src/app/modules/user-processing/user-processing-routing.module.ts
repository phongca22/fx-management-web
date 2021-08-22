import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProcessingComponent } from './user-processing.component';

const routes: Routes = [{ path: '', component: UserProcessingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPendingRoutingModule { }
