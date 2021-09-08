import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ConfigService } from 'src/app/services/config.service';
import { SocketService } from 'src/app/services/socket.service';
import { AuthService } from '../auth/auth.service';

export function getUser(auth: AuthService, socket: SocketService, config: ConfigService) {
  return () => {
    return of(true)
      .pipe(
        concatMap(() => {
          const token = auth.getToken();
          if (token) {
            auth.setUser(token);
            socket.init(token, auth.user);
            return config.getSupports();
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
    SocketService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: getUser,
      deps: [AuthService, SocketService, ConfigService],
      multi: true
    }
  ]
})
export class AppConfigModule {}
