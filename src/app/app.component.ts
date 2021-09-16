import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isNil } from 'lodash';
import { of } from 'rxjs';
import { concatMap, filter, map, takeUntil, tap } from 'rxjs/operators';
import { IPage, USER_LIST } from './core/page-config';
import { Response } from './core/response';
import { ROOM } from './core/room.enum';
import { AlertService } from './modules/alert/alert.service';
import { User } from './modules/store/user/user';
import { DestroyService } from './services/destroy.service';
import { RouterService } from './services/router.service';
import { SocketService } from './services/socket.service';
import { StoreService } from './services/store.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DestroyService]
})
export class AppComponent {
  hasEmergency: boolean;

  constructor(
    private translate: TranslateService,
    private socket: SocketService,
    private readonly $destroy: DestroyService,
    private router: RouterService,
    private user: UserService,
    private coreRouter: Router,
    private route: ActivatedRoute,
    private store: StoreService,
    private cdr: ChangeDetectorRef
  ) {
    this.translate.setDefaultLang('vi');
    this.translate.use('vi');
    this.socket
      .listen(ROOM.EMERGENCY)
      .pipe(takeUntil(this.$destroy))
      .subscribe((val: boolean) => {
        this.hasEmergency = val;
        this.cdr.detectChanges();
      });

    this.store
      .selectUser()
      .pipe(
        concatMap((val: User) => {
          this.hasEmergency = false;
          if (isNil(val.id) || !val.rooms.includes(ROOM.EMERGENCY)) {
            return of(true);
          } else {
            return this.user.hasEmergency().pipe(
              tap((res: Response) => {
                this.hasEmergency = res.data;
              })
            );
          }
        })
      )
      .subscribe();

    this.coreRouter.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child?.firstChild) {
            child = child.firstChild;
          }

          return child?.snapshot.data.page;
        })
      )
      .subscribe((data: IPage) => {
        this.store.changePage({
          page: data
        });
      });
  }

  run(): void {
    this.router.go(USER_LIST, {
      state: {
        emergency: true
      }
    });
  }
}
