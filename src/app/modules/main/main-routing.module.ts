import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from 'src/app/core/role';
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
        canLoad: [UserGuard],
        canActivate: [UserGuard],
        data: {
          role: [Role.Coodirnator, Role.Doctor]
        }
      },
      {
        path: 'user-pending',
        loadChildren: () => import('../user-list/user-list.module').then((m) => m.UserListModule),
        canLoad: [UserGuard, UserGuard],
        canActivate: [UserGuard, UserGuard],
        data: {
          role: [Role.Coodirnator, Role.Doctor, Role.Volunteer]
        }
      },
      {
        path: 'search',
        loadChildren: () => import('../../modules/search/search.module').then((m) => m.SearchModule),
        canLoad: [UserGuard, UserGuard],
        canActivate: [UserGuard, UserGuard],
        data: {
          role: [Role.Coodirnator, Role.Doctor, Role.Volunteer]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
