import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AGENT_MANAGEMENT, DOCTOR_MANAGEMENT, SEARCH, USER_LIST, USER_PROFILE } from 'src/app/core/page-config';
import { Role } from 'src/app/core/role';
import { EmptyComponent } from 'src/app/empty/empty.component';
import { UserGuard } from '../auth/user.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'blank',
        component: EmptyComponent
      },
      {
        path: 'profile',
        loadChildren: () => import('../../modules/profile/profile.module').then((m) => m.ProfileModule),
        canLoad: [UserGuard],
        canActivate: [UserGuard],
        data: {
          page: USER_PROFILE
        }
      },
      {
        path: 'users',
        loadChildren: () => import('../user-list/user-list.module').then((m) => m.UserListModule),
        canLoad: [UserGuard],
        canActivate: [UserGuard],
        data: {
          role: [Role.Agent, Role.Doctor, Role.Volunteer],
          page: USER_LIST
        }
      },
      {
        path: 'search',
        loadChildren: () => import('../../modules/search/search.module').then((m) => m.SearchModule),
        canLoad: [UserGuard],
        canActivate: [UserGuard],
        data: {
          role: [Role.Agent, Role.Doctor, Role.Volunteer],
          page: SEARCH
        }
      },
      {
        path: 'doctor-management',
        loadChildren: () =>
          import('../../modules/doctor-management/doctor-management.module').then((m) => m.DoctorManagementModule),
        canLoad: [UserGuard],
        canActivate: [UserGuard],
        data: {
          role: [Role.UserManagement],
          page: DOCTOR_MANAGEMENT,
          hideMenu: true
        }
      },
      {
        path: 'agent-management',
        loadChildren: () =>
          import('../../modules/agent-management/agent-management.module').then((m) => m.AgentManagementModule),
        canLoad: [UserGuard],
        canActivate: [UserGuard],
        data: {
          role: [Role.UserManagement],
          page: AGENT_MANAGEMENT,
          hideMenu: true
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
