import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { chain, groupBy, isEmpty, isNil, keys } from 'lodash';
import { concatMap, filter, takeUntil, tap } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { SupportStatus } from 'src/app/core/support-status';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { DestroyService } from 'src/app/services/destroy.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { SupportStatusUpdateComponent } from './support-status-update/support-status-update.component';
import { SupportService } from './support.service';
dayjs.extend(customParseFormat);

export interface Group {
  id: number;
  name: string;
  supports: UserSupport[];
}

@Component({
  selector: 'app-user-support',
  templateUrl: './user-support.component.html',
  styleUrls: ['./user-support.component.scss'],
  providers: [DestroyService]
})
export class UserSupportComponent implements OnInit {
  @Input() user: UserInfo;
  @Input() supports: UserSupport[];
  @Output() supportsChange: EventEmitter<UserSupport[]>;
  loaded: boolean;
  groups: Group[];
  isVolunteer: boolean;
  isDoctor: boolean;
  loading: boolean;

  constructor(
    private service: SupportService,
    private readonly $destroy: DestroyService,
    private alert: AlertService,
    private dialog: MatDialog,
    private auth: AuthService
  ) {
    this.isVolunteer = this.auth.hasRole(Role.Volunteer);
    this.isDoctor = this.auth.hasRole(Role.Doctor);
    this.supportsChange = new EventEmitter();
    this.service
      .listenNewSupports()
      .pipe(takeUntil(this.$destroy))
      .subscribe((val: UserSupport[]) => {
        this.supports = [...val, ...this.supports];
        this.combineData();
      });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (!isEmpty(this.supports)) {
      this.combineData();
      return;
    }

    this.service
      .getSupports(this.user.id)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res: Response) => {
        this.loaded = true;
        if (res.ok) {
          this.supports = res.data.map((val: any) => new UserSupport(val));
          this.combineData();
        } else {
          this.alert.error();
        }
      });
  }

  combineData(): void {
    this.supportsChange.emit(this.supports);
    const t = groupBy(this.supports, 'dateLabel');
    this.groups = chain(keys(t))
      .map((date: string) => {
        return {
          id: dayjs(date, 'DD-MM-YYYY').millisecond(),
          name: date,
          supports: t[date]
        };
      })
      .orderBy(['id'], ['desc'])
      .value();
  }

  isEmpty(): boolean {
    return this.loaded && isEmpty(this.supports);
  }

  updateStatus(group: Group, data: UserSupport): void {
    if (!this.isVolunteer) {
      return;
    }

    this.dialog
      .open(SupportStatusUpdateComponent, {
        data: {
          info: this.user,
          support: data
        },
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(filter((val: UserSupport) => !isNil(val) && !isEmpty(val)))
      .subscribe((val: UserSupport) => {
        group.supports.splice(group.supports.indexOf(data), 1, val);
      });
  }

  showCollector(data: UserSupport): boolean {
    return data.status === SupportStatus.Delivered && [1, 2, 3].includes(data.support.id);
  }

  revoke(group: Group, data: UserSupport): void {
    this.alert
      .confirm({
        message: 'userSupport.revokeMessage'
      })
      .pipe(
        filter((result: boolean) => result),
        tap(() => (this.loading = true)),
        concatMap(() => this.service.revoke(this.user, data.id, true)),
        tap(() => (this.loading = false))
      )
      .subscribe(() => (res: Response) => {
        if (res.ok) {
          group.supports.splice(group.supports.indexOf(data), 1, new UserSupport(res.data));
        } else {
          this.alert.error();
        }
      });
  }
}
