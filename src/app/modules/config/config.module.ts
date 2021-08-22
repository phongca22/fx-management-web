import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { RouterService } from 'src/app/services/router.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../auth/auth.service';

export function getUser(auth: AuthService, router: RouterService, user: UserService) {
  return () => {
    return of(true)
      .pipe(
        concatMap(() => {
          const token = auth.getToken();
          if (token) {
            auth.setUser(token);
            router.goHome();
            return forkJoin([user.getDoctors(), user.getSupports()]).pipe(map(() => true));
          } else {
            return of(false);
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
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: getUser,
      deps: [AuthService, RouterService, UserService],
      multi: true
    }
  ]
})
export class AppConfigModule {}
