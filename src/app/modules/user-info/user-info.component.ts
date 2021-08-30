import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { assign, isEmpty, isNil, isNumber, isString } from 'lodash';
import { filter } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { UserConditionType } from 'src/app/core/user-condition.enum';
import { UserInfo } from 'src/app/core/user-info';
import { UserNote } from 'src/app/core/user-note';
import { UserSupport } from 'src/app/core/user-support';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { DoctorPickerComponent } from '../doctor-picker/doctor-picker.component';
import { UserConditionPickerComponent } from '../user-condition-picker/user-condition-picker.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { NoteService } from '../user-note/note.service';
import { SupportService } from '../user-support/support.service';
import { UserSupportComponent } from '../user-support/user-support.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnChanges {
  @Input() user: UserInfo;
  doctor: Doctor;
  isDoctor: boolean;
  loading: boolean = true;
  isVolunteer: boolean;
  isCoordinator: boolean;
  notes: UserNote[] = [];
  supports: UserSupport[] = [];

  constructor(
    private service: UserService,
    private dialog: MatDialog,
    private alert: AlertService,
    private auth: AuthService,
    private clipboard: Clipboard,
    private note: NoteService,
    private support: SupportService,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo
  ) {
    this.isDoctor = this.auth.hasRole(Role.Doctor);
    this.isCoordinator = this.auth.hasRole(Role.Coodirnator);
    this.isVolunteer = this.auth.hasRole(Role.Volunteer);
    if (this.data) {
      this.user = this.data;
      this.service.getUserInfo(this.user.id).subscribe((res: Response) => {
        this.loading = false;
        if (res.ok) {
          this.user.setInfo(res.data);
        } else {
          this.alert.error();
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

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

  addNote(): void {
    this.note.showAddNote(this.user).subscribe();
  }

  addSupports(): void {
    this.support.showAddSupports(this.user).subscribe();
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
}
