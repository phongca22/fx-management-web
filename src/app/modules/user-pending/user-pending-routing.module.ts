import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPendingComponent } from './user-pending.component';

const routes: Routes = [{ path: '', component: UserPendingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPendingRoutingModule { }
