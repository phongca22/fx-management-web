import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { DENIED } from 'src/app/core/page-config';
import { Role } from 'src/app/core/role';
import { RouterService } from 'src/app/services/router.service';
import { StoreService } from 'src/app/services/store.service';
import { User } from '../store/user/user';
import { AuthService } from './auth.service';

export interface RouteData {
  role: Role[];
}

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanLoad {
  user: User;

  constructor(private routerService: RouterService, private store: StoreService, private auth: AuthService) {
    this.store.selectUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.isAuthenticated(route.data as RouteData);
  }

  canLoad(route: Route): boolean {
    return this.isAuthenticated(route.data as RouteData);
  }

  isAuthenticated(data: RouteData): boolean {
    if (!data || !data.role) {
      return true;
    }

    if (this.auth.hasAnyRole(data.role)) {
      return true;
    } else {
      this.routerService.go(DENIED);
      return false;
    }
  }
}
