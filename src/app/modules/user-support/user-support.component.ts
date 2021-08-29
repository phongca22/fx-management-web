import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import { chain, groupBy, isEmpty, isNil, keys } from 'lodash';
import { filter, takeUntil } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { DestroyService } from 'src/app/services/destroy.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { AddSupportComponent } from './add-support/add-support.component';
import { SupportStatusUpdateComponent } from './support-status-update/support-status-update.component';
import { SupportService } from './support.service';
dayjs.extend(customParseFormat);

export interface Group {
  id: number;
  name: string;
  notes: UserSupport[];
}

@Component({
  selector: 'app-user-support',
  templateUrl: './user-support.component.html',
  styleUrls: ['./user-support.component.scss'],
  providers: [DestroyService]
})
export class UserSupportComponent implements OnInit {
  supports: UserSupport[];
  loaded: boolean;
  groups: Group[];
  isVolunteer: boolean;
  isDoctor: boolean;

  constructor(
    private service: SupportService,
    private readonly $destroy: DestroyService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private dialog: MatDialog,
    private auth: AuthService
  ) {
    this.isVolunteer = this.auth.hasRole(Role.Volunteer);
    this.isDoctor = this.auth.hasRole(Role.Doctor);
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service
      .getSupports(this.data.id)
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
    const t = groupBy(this.supports, 'dateLabel');
    this.groups = chain(keys(t))
      .map((date: string) => {
        return {
          id: dayjs(date, 'DD-MM-YYYY').millisecond(),
          name: date,
          notes: t[date]
        };
      })
      .orderBy(['id'], ['desc'])
      .value();
  }

  isEmpty(): boolean {
    return this.loaded && isEmpty(this.supports);
  }

  add(): void {
    this.dialog
      .open(AddSupportComponent, {
        data: this.data,
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(filter((val: UserSupport[]) => !isNil(val) && !isEmpty(val)))
      .subscribe((val: UserSupport[]) => {
        this.supports = [...val, ...this.supports];
        this.combineData();
      });
  }

  updateStatus(group: Group, data: UserSupport): void {
    if (!this.isVolunteer) {
      return;
    }

    this.dialog
      .open(SupportStatusUpdateComponent, {
        data: {
          info: this.data,
          support: data
        },
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(filter((val: UserSupport) => !isNil(val) && !isEmpty(val)))
      .subscribe((val: UserSupport) => {
        group.notes.splice(group.notes.indexOf(data), 1, val);
      });
  }
}
