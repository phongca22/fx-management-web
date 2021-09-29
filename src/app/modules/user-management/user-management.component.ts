import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { DestroyService } from 'src/app/services/destroy.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { User } from './user';
import { UserAddComponent } from './user-add/user-add.component';
import { UserManagementService } from './user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [DestroyService]
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'info'];
  dataSource: User[] = [];
  worker: Subject<number>;
  size: number;
  page: number;

  constructor(
    private readonly $destroy: DestroyService,
    private service: UserManagementService,
    private alert: AlertService,
    private dialog: MatDialog,
    private user: UserService
  ) {
    this.worker = new Subject();
    this.worker
      .pipe(
        tap(() => (this.dataSource = [])),
        tap((val: number) => (this.page = val)),
        switchMap((val: number) => this.getData(val)),
        takeUntil(this.$destroy)
      )
      .subscribe((res: Response) => {
        if (res.ok) {
          this.size = res.data.count;
          this.dataSource = res.data.rows.map((val: any) => new User(val));
        } else {
          this.alert.error();
        }
      });
  }

  ngOnInit(): void {
    this.worker.next(0);
  }

  getData(page: number): Observable<any> {
    return this.service.getAll(page);
  }

  changePage(event: PageEvent): void {
    this.worker.next(event.pageIndex);
  }

  add() {
    this.dialog
      .open(UserAddComponent, {
        width: '100%',
        maxWidth: '96vw'
      })
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.worker.next(this.page);
        this.user.clearTransporters();
      });
  }

  select(data: User) {
    this.dialog
      .open(UserAddComponent, {
        data: data,
        width: '100%',
        maxWidth: '96vw'
      })
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.worker.next(this.page);
      });
  }
}
