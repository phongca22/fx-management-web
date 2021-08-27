import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { assign, isEmpty, isNil, isNumber, isString } from 'lodash';
import { filter } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { User } from 'src/app/core/user';
import { UserConditionType } from 'src/app/core/user-condition.enum';
import { UserInfo } from 'src/app/core/user-info';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { DoctorPickerComponent } from '../doctor-picker/doctor-picker.component';
import { MemberAddComponent } from '../family/member-add/member-add.component';
import { UserConditionPickerComponent } from '../user-condition-picker/user-condition-picker.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserNoteComponent } from '../user-note/user-note.component';
import { UserSupportComponent } from '../user-support/user-support.component';

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

  showSupport(): void {
    this.dialog
      .open(UserSupportComponent, {
        data: this.user,
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .subscribe();
  }

  showNote(): void {
    this.dialog
      .open(UserNoteComponent, {
        data: this.user,
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .subscribe();
  }

  copy(): void {
    this.clipboard.copy(this.user.code);
    this.alert.info('userInfo.copy');
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
