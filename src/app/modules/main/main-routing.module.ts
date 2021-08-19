import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataEntryGuard } from '../auth/data-entry.guard';
import { UserGuard } from '../auth/user.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        loadChildren: () => import('../../modules/profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [UserGuard]
      },
      {
        path: 'user-create',
        loadChildren: () => import('../../modules/user-create/user-create.module').then((m) => m.UserCreateModule),
        canLoad: [DataEntryGuard],
        canActivate: [DataEntryGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
