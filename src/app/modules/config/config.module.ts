import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RouterService } from 'src/app/services/router.service';
import { AuthService } from '../auth/auth.service';

export function getUser(auth: AuthService, router: RouterService) {
  return () => {
    return of(true)
      .pipe(
        map(() => {
          const token = auth.getToken();
          if (token) {
            auth.setUser(token);
            router.goHome();
            return true;
          } else {
            return false;
          }
        }),
        catchError(() => of(true))
      )
      .toPromise();
  };
}

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthService,
    RouterService,
    {
      provide: APP_INITIALIZER,
      useFactory: getUser,
      deps: [AuthService, RouterService],
      multi: true
    }
  ]
})
export class AppConfigModule {}
