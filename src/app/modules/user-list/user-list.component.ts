import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { UserInfo } from 'src/app/core/user-info';
import { DestroyService } from 'src/app/services/destroy.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../store/user/user';
import { UserInfoComponent } from '../user-info/user-info.component';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    return this.translate.instant('paginator.page', {
      page: length === 0 ? 0 : page + 1,
      total: Math.ceil(length / pageSize)
    });
  };
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [DestroyService, { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }]
})
export class UserListComponent implements OnInit {
  data: UserInfo[] = [];
  size: number;
  worker: Subject<number>;
  user: User;
  constructor(
    private service: UserService,
    private alert: AlertService,
    private readonly $destroy: DestroyService,
    private dialog: MatDialog,
    private auth: AuthService,
    private store: StoreService
  ) {
    this.store.selectUser().subscribe((val: User) => (this.user = val));
    this.worker = new Subject();
    this.worker
      .pipe(
        tap(() => (this.data = [])),
        switchMap((val: number) => this.getData(val)),
        takeUntil(this.$destroy)
      )
      .subscribe((res: Response) => {
        if (res.ok) {
          this.size = res.data.count;
          this.data = res.data.rows.map((val: any) => new UserInfo(val));
        } else {
          this.alert.error();
        }
      });
  }

  ngOnInit(): void {
    this.worker.next(0);
  }

  getData(page?: number): Observable<any> {
    return this.getService(page).pipe(takeUntil(this.$destroy));
  }

  getService(page?: number): Observable<any> {
    if (this.auth.hasRole(Role.Doctor)) {
      return this.service.getByDoctor(this.user.id, page);
    } else if (this.auth.hasRole(Role.Coordinator)) {
      return this.service.getPending(page);
    } else if (this.auth.hasRole(Role.Volunteer)) {
      return this.service.getByTransporter(this.user.id, page);
    } else {
      return EMPTY;
    }
  }

  changePage(event: PageEvent): void {
    this.worker.next(event.pageIndex);
  }

  showInfo(data: UserInfo): void {
    this.dialog.open(UserInfoComponent, {
      data: data,
      width: '100%',
      maxWidth: '100vw',
      height: '100%',
      maxHeight: '100vh'
    });
  }
}
