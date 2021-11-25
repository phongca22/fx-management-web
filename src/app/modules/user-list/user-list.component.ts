import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data: UserInfo[] = [];
  size: number;
  worker: Subject<number>;
  filterEvent: Subject<Function>;
  isAgent: boolean;
  currentPage: number;
  hasEmergency: boolean;
  loading: boolean = true;

  constructor(
    private alert: AlertService,
    private readonly $destroy: DestroyService,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.filterEvent = new Subject();
    this.worker = new Subject();
    this.isAgent = this.auth.hasRole(Role.Agent);
    this.hasEmergency = this.router.getCurrentNavigation()?.extras?.state?.emergency;
  }

  ngOnInit(): void {
    combineLatest([this.worker, this.filterEvent])
      .pipe(
        map(([page, fn]) => {
          this.data = [];
          if (page === this.currentPage) {
            page = 0;
            this.paginator.pageIndex = 0;
          }

          this.currentPage = page;
          return { page, fn };
        }),
        tap(() => (this.loading = true)),
        switchMap(({ page, fn }) => this.getData(page, fn)),
        tap(() => {
          this.loading = false;
        }),
        takeUntil(this.$destroy)
      )
      .subscribe((res: Response) => {
        if (res.ok) {
          this.size = res.data.count;
          this.data = res.data.rows.map((val: any) => new UserInfo(val));
        } else {
          this.alert.error();
        }

        this.loading = false;
      });

    this.worker.next(0);
  }

  selectFilter(data: Function): void {
    this.filterEvent.next(data);
  }

  getData(page: number, fn: Function): Observable<any> {
    return fn(page + 1).pipe(takeUntil(this.$destroy));
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
        panelClass: 'mat-dialog-no-padding'
      })
      .afterClosed()
      .pipe(filter((val: boolean) => val))
      .subscribe(() => this.worker.next(this.currentPage));
  }
}
