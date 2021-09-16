import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEmpty, isNil, isObject, isString } from 'lodash';
import { filter } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { PatientCondition } from 'src/app/core/patient-condition';
import { PatientStatusType } from 'src/app/core/user-condition.enum';
import { UserInfo } from 'src/app/core/user-info';
import { UserNote } from 'src/app/core/user-note';
import { UserSupport } from 'src/app/core/user-support';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';
import { DoctorPickerComponent } from '../doctor-picker/doctor-picker.component';
import { PatientStatusPickerComponent } from '../patient-status-picker/patient-status-picker.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { NoteService } from '../user-note/note.service';
import { SupportService } from '../user-support/support.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userInfo: UserInfo;
  patientCondition: PatientCondition;
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
    @Inject(MAT_DIALOG_DATA) public data: number,
    private dialogRef: MatDialogRef<UserInfoComponent>
  ) {
    this.isCoordinator = this.auth.hasRole(Role.Coordinator);
    this.isVolunteer = this.auth.hasRole(Role.Volunteer);
    this.isAdmin = this.auth.hasRole(Role.Admin);
    this.isImporter = this.auth.hasRole(Role.Importer);
    this.isManager = this.auth.hasRole(Role.Manager);
  }

  ngOnInit(): void {
    if (this.data) {
      this.service.getUserInfo(this.data).subscribe((res: Response) => {
        this.loading = false;
        if (res.ok) {
          const { patientCondition } = res.data;
          this.patientCondition = new PatientCondition(patientCondition);
          this.userInfo = new UserInfo(res.data);
          this.isDoctor = this.auth.hasRole(Role.Doctor) && this.userInfo.doctor.info.id === this.auth.user?.id;
        } else {
          this.alert.error();
        }
      });
    }
  }

  edit(): void {
    this.dialog
      .open(UserEditComponent, {
        data: {
          info: this.userInfo,
          condition: this.patientCondition
        },
        width: '100%',
        height: '100%',
        maxWidth: '100vw',
        maxHeight: '100vh',
        autoFocus: false,
        panelClass: 'mat-dialog-no-padding'
      })
      .afterClosed()
      .pipe(filter((val: any) => !isNil(val) && !isEmpty(val)))
      .subscribe((val: any) => {
        this.userInfo.setInfo(val.info);
        this.patientCondition = val.condition;
      });
  }

  editStatus(): void {
    if (!this.isDoctor) {
      return;
    }

    this.dialog
      .open(PatientStatusPickerComponent, {
        data: this.userInfo,
        width: '80%'
      })
      .afterClosed()
      .pipe(filter((val: PatientStatusType) => !isEmpty(val)))
      .subscribe((val: PatientStatusType) => {
        this.userInfo.status = val;
      });
  }

  addNote(): void {
    this.note.showAddNote(this.userInfo).subscribe();
  }

  createNote(): void {
    this.note.showCreateNote(this.userInfo).subscribe();
  }

  addSupports(): void {
    this.support
      .showAddSupports(this.userInfo)
      .pipe(filter((val: boolean) => val))
      .subscribe(() => this.note.refreshEvent.next());
  }

  createSupports(): void {
    this.support
      .showCreateSupports(this.userInfo)
      .pipe(filter((val: boolean) => val))
      .subscribe(() => this.note.refreshEvent.next());
  }

  editDoctor(): void {
    if (!this.isCoordinator) {
      return;
    }

    this.dialog
      .open(DoctorPickerComponent, {
        data: this.userInfo,
        width: '80%'
      })
      .afterClosed()
      .pipe(filter((val: Doctor) => !isNil(val) && !isString(val)))
      .subscribe((res: Doctor) => {
        this.userInfo.doctor = res;
      });
  }

  close() {
    this.dialogRef.close(this.userInfo);
  }
}
