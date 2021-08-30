import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { DestroyService } from 'src/app/services/destroy.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
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
  constructor(
    private service: UserService,
    private alert: AlertService,
    private readonly $destroy: DestroyService,
    private dialog: MatDialog
  ) {
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
    return this.service.getUsers(page).pipe(takeUntil(this.$destroy));
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
