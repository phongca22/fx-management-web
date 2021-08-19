import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from 'src/app/services/router.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private auth: AuthService, private router: RouterService) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.auth.hasToken()) {
      if (this.auth.user) {
        this.router.goHome();
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }

    return true;
  }
}
