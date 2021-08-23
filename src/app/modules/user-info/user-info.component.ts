import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { assign, find, isEmpty, isNil, isNumber, isString } from 'lodash';
import { concatMap, filter } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { Support } from 'src/app/core/support';
import { UserInfo } from 'src/app/core/user-info';
import { UserConditionType } from 'src/app/core/user-condition.enum';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { SupportPickerComponent } from '../support-picker/support-picker.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { AddNoteComponent } from '../user-note/add-note/add-note.component';
import { UserNoteComponent } from '../user-note/user-note.component';
import { UserConditionPickerComponent } from '../user-condition-picker/user-condition-picker.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {
  @Input() user: UserInfo;
  @Input() init: boolean;
  doctor: Doctor;
  isAdminOrDoctor: boolean;
  once: boolean;

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
    if (this.init && !this.once) {
      this.once = true;
      this.service.getUserInfo(this.user.id).subscribe((res: Response) => {
        if (res.ok) {
          this.user.setInfo(res.data);
          this.doctor = find(this.service.doctors, { id: this.user.doctorId }) as Doctor;
        } else {
          this.alert.error();
        }
      });
    }
  }

  ngOnInit(): void {}

  hasSupports(): boolean {
    if (this.user) {
      return this.user.supports?.length > 0;
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
        this.doctor = find(this.service.doctors, { id: this.user.doctorId }) as Doctor;
      });
  }

  editCondition(): void {
    let result: UserConditionType;
    this.dialog
      .open(UserConditionPickerComponent, {
        data: this.user.condition,
        width: '80%'
      })
      .afterClosed()
      .pipe(
        filter((val: UserConditionType) => isNumber(val)),
        concatMap((val: UserConditionType) => {
          result = val;
          return this.service.setCondition(this.user.patientConditionId, val);
        })
      )
      .subscribe((res: Response) => {
        if (res.ok) {
          this.user.condition = result;
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
            this.user.doctorAssignmentId,
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
