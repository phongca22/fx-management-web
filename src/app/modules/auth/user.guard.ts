import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { isEqual, isNil } from 'lodash';
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
export class UserGuard implements CanActivate, CanLoad {
  isAccess: boolean;

  constructor(private routerService: RouterService, private store: StoreService, private auth: AuthService) {
    this.store.selectUser().subscribe((user: User) => {
      this.isAccess = !isNil(user.id);
    });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.isAuthenticated();
  }

  canLoad(route: Route): boolean {
    return this.isAuthenticated();
  }

  isAuthenticated(): boolean {
    if (this.isAccess) {
      return true;
    } else {
      this.routerService.login();
      return false;
    }

    return true;
  }
}
