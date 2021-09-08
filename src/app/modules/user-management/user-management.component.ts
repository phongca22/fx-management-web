import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { find } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { User } from 'src/app/core/user';
import { DestroyService } from 'src/app/services/destroy.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { AlertService } from '../alert/alert.service';
import { UserAddComponent } from './user-add/user-add.component';
import { UserManagementService } from './user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [DestroyService]
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'role'];
  dataSource: User[] = [];
  worker: Subject<number>;
  size: number;
  page: number;

  constructor(
    private readonly $destroy: DestroyService,
    private service: UserManagementService,
    private alert: AlertService,
    private dialog: MatDialog,
    private doctor: DoctorService
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
        this.doctor.clearCache();
        this.worker.next(this.page);
      });
  }

  select(data: User) {
    if (find(data.roles, { id: Role.Admin })) {
      return;
    }

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
