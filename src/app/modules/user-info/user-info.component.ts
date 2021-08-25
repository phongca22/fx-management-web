import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { assign, find, isEmpty, isNil, isNumber, isString } from 'lodash';
import { concatMap, filter } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { SupportStatus } from 'src/app/core/support-status';
import { User } from 'src/app/core/user';
import { UserConditionType } from 'src/app/core/user-condition.enum';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { DoctorPickerComponent } from '../doctor-picker/doctor-picker.component';
import { MemberAddComponent } from '../family/member-add/member-add.component';
import { SupportPickerComponent } from '../support-picker/support-picker.component';
import { UserConditionPickerComponent } from '../user-condition-picker/user-condition-picker.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { AddNoteComponent } from '../user-note/add-note/add-note.component';
import { UserNoteComponent } from '../user-note/user-note.component';
import { UserSupportDetailComponent } from '../user-support/user-support-detail/user-support-detail.component';
import { UserSupportEditComponent } from '../user-support/user-support-edit/user-support-edit.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {
  @Input() user: UserInfo;
  @Input() init: boolean;
  @Input() full: boolean;
  doctor: Doctor;
  isAdminOrDoctor: boolean;
  once: boolean;
  loading: boolean = true;
  isVolunteer: boolean;
  isCoordinator: boolean;

  constructor(
    private service: UserService,
    private dialog: MatDialog,
    private alert: AlertService,
    private auth: AuthService,
    private clipboard: Clipboard
  ) {
    this.isAdminOrDoctor = this.auth.hasRole(Role.Admin) || this.auth.hasRole(Role.Doctor);
    this.isCoordinator = this.auth.hasRole(Role.Coodirnator);
    this.isVolunteer = this.auth.hasRole(Role.Volunteer);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.init && !this.once) {
      this.once = true;
      this.service.getUserInfo(this.user.id).subscribe((res: Response) => {
        this.loading = false;
        if (res.ok) {
          this.user.setInfo(res.data);
        } else {
          this.alert.error();
        }
      });
    }

    if (this.full) {
      this.loading = false;
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

  hasMembers(): boolean {
    if (this.user) {
      return this.user.members?.length > 0;
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

  editCondition(): void {
    this.dialog
      .open(UserConditionPickerComponent, {
        data: this.user,
        width: '80%'
      })
      .afterClosed()
      .pipe(filter((val: UserConditionType) => isNumber(val)))
      .subscribe((val: UserConditionType) => {
        this.user.condition = val;
      });
  }

  editSupport(): void {
    this.dialog
      .open(SupportPickerComponent, {
        data: this.user,
        width: '80%'
      })
      .afterClosed()
      .pipe(filter((val: UserSupport[]) => !isNil(val) && !isString(val)))
      .subscribe((data: UserSupport[]) => {
        this.user.supports = data;
      });
  }

  showUserNote(): void {
    this.dialog
      .open(UserNoteComponent, {
        data: this.user.doctorAssignmentId,
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
        data: this.user.doctorAssignmentId,
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh'
      })
      .afterClosed()
      .pipe(filter((val: UserSupport[]) => !isNil(val) && !isEmpty(val)))
      .subscribe();
  }

  editDoctor(): void {
    this.dialog
      .open(DoctorPickerComponent, {
        data: this.user,
        width: '80%'
      })
      .afterClosed()
      .pipe(filter((val: Doctor) => !isNil(val) && !isString(val)))
      .subscribe((res: Doctor) => {
        this.user.doctor = res;
      });
  }

  editSupportStatus(): void {
    this.dialog
      .open(UserSupportEditComponent, {
        data: this.user,
        width: '100%',
        maxWidth: '96vw'
      })
      .afterClosed()
      .pipe(filter((val: UserSupport[]) => !isNil(val) && !isString(val)))
      .subscribe((res: UserSupport[]) => {
        this.user.supports = this.user.supports.map((val: UserSupport) => {
          val.status = find(res, { id: val.id })?.status || SupportStatus.Failed;
          return val;
        });
      });
  }

  showSupportStatus(): void {
    this.dialog
      .open(UserSupportDetailComponent, {
        data: this.user,
        width: '100%',
        maxWidth: '96vw'
      })
      .afterClosed()
      .subscribe();
  }

  addMember(): void {
    this.dialog
      .open(MemberAddComponent, {
        data: this.user,
        width: '80%'
      })
      .afterClosed()
      .pipe(filter((val: User) => !isNil(val) && !isString(val)))
      .subscribe((data: User) => {
        this.user.addMember(data);
      });
  }
}
