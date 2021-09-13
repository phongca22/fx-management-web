import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEmpty, isNil, isString } from 'lodash';
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

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() user: UserInfo;
  doctor: Doctor;
  isDoctor: boolean;
  loading: boolean = true;
  isVolunteer: boolean;
  isCoordinator: boolean;
  notes: UserNote[] = [];
  supports: UserSupport[] = [];
  isAdmin: boolean;
  isImporter: boolean;
  isManager: boolean;

  constructor(
    private service: UserService,
    private dialog: MatDialog,
    private alert: AlertService,
    private auth: AuthService,
    private note: NoteService,
    private support: SupportService,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private dialogRef: MatDialogRef<UserInfoComponent>
  ) {
    this.isCoordinator = this.auth.hasRole(Role.Coordinator);
    this.isVolunteer = this.auth.hasRole(Role.Volunteer);
    this.isAdmin = this.auth.hasRole(Role.Admin);
    this.isImporter = this.auth.hasRole(Role.Importer);
    this.isManager = this.auth.hasRole(Role.Manager);
    if (this.data) {
      this.user = this.data;
      this.service.getUserInfo(this.user.id).subscribe((res: Response) => {
        this.loading = false;
        if (res.ok) {
          const { condition, doctor } = res.data;
          this.user.setDoctor(doctor);
          this.user.setCondition(condition);
          this.isDoctor = this.auth.hasRole(Role.Doctor) && this.user.doctor.info.id === this.auth.user?.id;
        } else {
          this.alert.error();
        }
      });
    }
  }

  ngOnInit(): void {}

  edit(): void {
    this.dialog
      .open(UserEditComponent, {
        data: this.user,
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        autoFocus: false,
        panelClass: 'mat-dialog-no-padding'
      })
      .afterClosed()
      .pipe(filter((val: UserInfo) => !isNil(val) && !isEmpty(val)))
      .subscribe((val: UserInfo) => {
        this.user.setInfo(val);
      });
  }

  editCondition(): void {
    if (!this.isDoctor) {
      return;
    }

    this.dialog
      .open(UserConditionPickerComponent, {
        data: this.user,
        width: '80%'
      })
      .afterClosed()
      .pipe(filter((val: UserConditionType) => !isEmpty(val)))
      .subscribe((val: UserConditionType) => {
        this.user.condition = val;
      });
  }

  addNote(): void {
    this.note.showAddNote(this.user).subscribe();
  }

  createNote(): void {
    this.note.showCreateNote(this.user).subscribe();
  }

  addSupports(): void {
    this.support
      .showAddSupports(this.user)
      .pipe(filter((val: boolean) => val))
      .subscribe(() => this.note.refreshEvent.next());
  }

  createSupports(): void {
    this.support
      .showCreateSupports(this.user)
      .pipe(filter((val: boolean) => val))
      .subscribe(() => this.note.refreshEvent.next());
  }

  editDoctor(): void {
    if (!this.isCoordinator) {
      return;
    }

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

  close() {
    this.dialogRef.close(this.user);
  }
}
