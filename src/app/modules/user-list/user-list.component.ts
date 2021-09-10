import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { UserInfo } from 'src/app/core/user-info';
import { DestroyService } from 'src/app/services/destroy.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { UserCreateComponent } from '../user-create/user-create.component';

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
  filterEvent: Subject<Function>;
  isDoctor: boolean;
  isCoordinator: boolean;
  currentPage: number;
  isAdmin: boolean;
  hasEmergency: boolean;

  constructor(
    private alert: AlertService,
    private readonly $destroy: DestroyService,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.filterEvent = new Subject();
    this.worker = new Subject();
    this.isDoctor = this.auth.hasRole(Role.Doctor);
    this.isCoordinator = this.auth.hasRole(Role.Coordinator);
    this.isAdmin = this.auth.hasRole(Role.Admin);
    this.hasEmergency = this.router.getCurrentNavigation()?.extras?.state?.count > 0;
  }

  ngOnInit(): void {
    combineLatest([this.worker, this.filterEvent])
      .pipe(
        tap(([page]) => {
          this.data = [];
          this.currentPage = page;
        }),
        switchMap(([page, fn]) => this.getData(page, fn)),
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

    this.worker.next(0);
  }

  selectFilter(data: Function): void {
    this.filterEvent.next(data);
  }

  getData(page: number, fn: Function): Observable<any> {
    return fn(page).pipe(takeUntil(this.$destroy));
  }

  changePage(event: PageEvent): void {
    this.worker.next(event.pageIndex);
  }

  showAddUser() {
    this.dialog
      .open(UserCreateComponent, {
        data: this.data,
        width: '100%',
        maxWidth: '100vw',
        height: '100%',
        maxHeight: '100vh',
        autoFocus: false,
        panelClass: 'mat-dialog-no-padding'
      })
      .afterClosed()
      .pipe(filter((val: boolean) => val))
      .subscribe(() => this.worker.next(this.currentPage));
  }
}
