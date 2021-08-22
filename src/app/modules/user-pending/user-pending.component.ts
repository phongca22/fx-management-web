import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { findIndex, isEmpty, isNil } from 'lodash';
import { concatMap, filter } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { Support } from 'src/app/core/support';
import { UserInfo } from 'src/app/core/user-info';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { SupportPickerComponent } from '../support-picker/support-picker.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-pending',
  templateUrl: './user-pending.component.html',
  styleUrls: ['./user-pending.component.scss']
})
export class UserPendingComponent implements OnInit {
  data: UserInfo[];
  line: number;
  constructor(private service: UserService, private alert: AlertService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.service.getPendings().subscribe((res: Response) => {
      if (res.ok) {
        this.data = res.data.map((val: any) => new UserInfo(val));
      } else {
        this.alert.error();
      }
    });
  }

  setLine(i: number): void {
    this.line = i;
  }

  removeLine(): void {
    this.line = -1;
  }

  edit(data: UserInfo): void {
    this.dialog
      .open(UserEditComponent, {
        data: data,
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh'
      })
      .afterClosed()
      .pipe(filter((val: UserInfo) => !isNil(val) && !isEmpty(val)))
      .subscribe((val: UserInfo) => {
        const index = findIndex(this.data, { id: val.id });
        this.data.splice(index, 1, val);
      });
  }

  showSupportPicker(data: UserInfo): void {
    let result: Support[];
    this.dialog
      .open(SupportPickerComponent, {
        data: data.supports,
        width: '80%'
      })
      .afterClosed()
      .pipe(
        filter((val: Support[]) => !isNil(val) && !isEmpty(val)),
        concatMap((val: Support[]) => {
          result = val;
          return this.service.setSupports(
            data.id,
            val.map(({ id }: { id: number }) => id)
          );
        })
      )
      .subscribe((res: Response) => {
        if (res.ok) {
          data.supports = result;
          this.alert.success('userPending.supportUpdated');
        } else {
          this.alert.error();
        }
      });
  }

  remove(): void {}
}
