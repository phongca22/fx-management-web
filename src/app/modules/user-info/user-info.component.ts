import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { assign, find, isEmpty, isNil, isString } from 'lodash';
import { concatMap, filter } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { Role } from 'src/app/core/role';
import { Support } from 'src/app/core/support';
import { UserInfo } from 'src/app/core/user-info';
import { UserStatusType } from 'src/app/core/user-status.enum';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { SupportPickerComponent } from '../support-picker/support-picker.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { AddNoteComponent } from '../user-note/add-note/add-note.component';
import { UserNoteComponent } from '../user-note/user-note.component';
import { UserStatusPickerComponent } from '../user-status-picker/user-status-picker.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {
  @Input() user: UserInfo;
  doctor: Doctor;
  isAdminOrDoctor: boolean;

  constructor(
    private service: UserService,
    private dialog: MatDialog,
    private alert: AlertService,
    private auth: AuthService,
    private clipboard: Clipboard
  ) {
    this.isAdminOrDoctor = this.auth.hasRole(Role.Admin) || this.auth.hasRole(Role.Doctor);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.doctor = find(this.service.doctors, { id: this.user?.doctorId }) as Doctor;
  }

  ngOnInit(): void {}

  hasSupports(): boolean {
    if (this.user) {
      return this.user.supports.length > 0;
    } else {
      return false;
    }
  }

  edit(): void {
    this.dialog
      .open(UserEditComponent, {
        data: this.user,
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh'
      })
      .afterClosed()
      .pipe(filter((val: UserInfo) => !isNil(val) && !isEmpty(val)))
      .subscribe((val: UserInfo) => {
        assign(this.user, val);
      });
  }

  editStatus(): void {
    let result: UserStatusType;
    this.dialog
      .open(UserStatusPickerComponent, {
        data: this.user.status,
        width: '80%'
      })
      .afterClosed()
      .pipe(
        filter((val: UserStatusType) => !isNil(val) && !isEmpty(val)),
        concatMap((val: UserStatusType) => {
          result = val;
          return this.service.setStatus(this.user?.id as number, val);
        })
      )
      .subscribe((res: Response) => {
        if (res.ok) {
          this.user.status = result;
          this.alert.success('userInfo.supportUpdated');
        } else {
          this.alert.error();
        }
      });
  }

  editSupport(): void {
    let result: Support[];
    this.dialog
      .open(SupportPickerComponent, {
        data: this.user.supports,
        width: '80%'
      })
      .afterClosed()
      .pipe(
        filter((val: Support[]) => !isNil(val) && !isString(val)),
        concatMap((val: Support[]) => {
          result = val;
          return this.service.setSupports(
            this.user.id,
            val.map(({ id }: { id: number }) => id)
          );
        })
      )
      .subscribe((res: Response) => {
        if (res.ok) {
          this.user.supports = result;
          this.alert.success('userInfo.supportUpdated');
        } else {
          this.alert.error();
        }
      });
  }

  showUserNote(): void {
    this.dialog
      .open(UserNoteComponent, {
        data: this.user.id,
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        panelClass: 'gray-dialog-background',
        autoFocus: false
      })
      .afterClosed()
      .subscribe();
  }

  copy(): void {
    this.clipboard.copy(this.user.code);
    this.alert.info('userInfo.copy');
  }

  addNote(): void {
    this.dialog
      .open(AddNoteComponent, {
        data: this.user.id,
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh'
      })
      .afterClosed()
      .pipe(filter((val: Support[]) => !isNil(val) && !isEmpty(val)))
      .subscribe();
  }
}
