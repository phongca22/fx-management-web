import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './modules/login/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
    canLoad: [LoginGuard]
  },
  {
    path: 'main',
    loadChildren: () => import('./modules/main/main.module').then((m) => m.MainModule)
  },
  { path: 'denied', loadChildren: () => import('./modules/denied/denied.module').then((m) => m.DeniedModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
