import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../auth/auth.service';

export function getUser(auth: AuthService, user: UserService, config: ConfigService) {
  return () => {
    return of(true)
      .pipe(
        concatMap(() => {
          const token = auth.getToken();
          if (token) {
            auth.setUser(token);
            return forkJoin([config.getSupports(), user.getDoctors()]).pipe(map(() => true));
          } else {
            return forkJoin([config.getSupports()]).pipe(map(() => true));
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
    UserService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: getUser,
      deps: [AuthService, UserService, ConfigService],
      multi: true
    }
  ]
})
export class AppConfigModule {}
