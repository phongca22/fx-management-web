import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RouterService } from 'src/app/services/router.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from './auth.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: RouterService,
    private alert: AlertService,
    private translate: TranslateService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.auth.isApiUrl(req.url)) {
      return next.handle(req);
    }

    let authReq = req;
    const token = this.auth.getToken();
    if (token != null) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, token)
      });
    }
    return next.handle(authReq).pipe(
      catchError((res: HttpResponse<any>) => {
        if (res.status === 401) {
          this.auth.removeUser();
          this.router.login();
        } else if (res.status === 403) {
          this.alert.error(this.translate.instant('error.token.'));
        }

        return throwError(res);
      })
    );
  }
}

export const authInterceptorProviders = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
