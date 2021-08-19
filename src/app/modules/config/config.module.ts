import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RouterService } from 'src/app/services/router.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../store/user/user';

export function getUser(auth: AuthService, storage: StorageService, router: RouterService) {
  return () => {
    return of(true)
      .pipe(
        map(() => {
          const t = storage.get('token');
          if (t) {
            auth.setUser(JSON.parse(t));
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
    StorageService,
    RouterService,
    {
      provide: APP_INITIALIZER,
      useFactory: getUser,
      deps: [AuthService, StorageService, RouterService],
      multi: true
    }
  ]
})
export class AppConfigModule {}
