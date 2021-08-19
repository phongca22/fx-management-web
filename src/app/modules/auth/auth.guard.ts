import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { isEqual } from 'lodash';
import { Observable } from 'rxjs';
import { IPage, LOGIN } from 'src/app/core/page-config';
import { RouterService } from 'src/app/services/router.service';
import { StoreService } from 'src/app/services/store.service';
import { User } from '../store/user/user';
import { AuthService } from './auth.service';

export interface RouteData {
  page: IPage;
  permission: number[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  user: User;

  constructor(private routerService: RouterService, private store: StoreService, private auth: AuthService) {
    this.store.selectUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    return this.isAuthenticated(route.data as RouteData);
  }

  canLoad(route: Route): boolean | Observable<boolean> {
    return this.isAuthenticated(route.data as RouteData);
  }

  isAuthenticated({ page, permission }: RouteData): boolean | Observable<boolean> {
    if (this.user) {
      if (isEqual(page, LOGIN)) {
        this.routerService.goHome();
        return false;
      } else {
        return this.hasPermission(permission);
      }
    } else {
      if (isEqual(page, LOGIN)) {
        return true;
      } else {
        this.routerService.login();
        return false;
      }
    }
  }

  hasPermission(permission: number[]) {
    if (permission) {
      if (permission.every((id: number) => this.auth.hasPermission(id))) {
        return true;
      } else {
        this.routerService.goHome();
        return false;
      }
    } else {
      return true;
    }
  }
}
