import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route } from '@angular/router';
import { isNil } from 'lodash';
import { DENIED, IPage } from 'src/app/core/page-config';
import { isDataEntry } from 'src/app/core/role';
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
export class DataEntryGuard implements CanActivate, CanLoad {
  isAccess: boolean;

  constructor(private routerService: RouterService, private store: StoreService, private auth: AuthService) {
    this.store.selectUser().subscribe((user: User) => {
      this.isAccess = !isNil(user.id) && isDataEntry(user.roles);
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
      this.routerService.go(DENIED);
      return false;
    }

    return true;
  }
}
