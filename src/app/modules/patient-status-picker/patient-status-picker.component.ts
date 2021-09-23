import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { PatientStatusList, PatientStatusType } from 'src/app/core/user-condition.enum';
import { UserInfo } from 'src/app/core/user-info';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-patient-status-picker',
  templateUrl: './patient-status-picker.component.html',
  styleUrls: ['./patient-status-picker.component.scss']
})
export class PatientStatusPickerComponent implements OnInit {
  selectCtrl: FormControl;
  status: PatientStatusType[] = PatientStatusList;
  loading: boolean;
  isCoordinator: boolean;

  constructor(
    private dialog: MatDialogRef<PatientStatusPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private service: UserService,
    private alert: AlertService,
    private auth: AuthService
  ) {
    this.isCoordinator = this.auth.hasRole(Role.Coordinator);
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.selectCtrl = new FormControl(this.status[this.status.indexOf(this.data.status)], Validators.required);
  }

  save() {
    this.loading = true;
    if (this.selectCtrl.value !== this.data.status) {
      this.getService().subscribe((res: Response) => {
        if (res.ok) {
          this.dialog.close(this.selectCtrl.value);
        } else {
          this.loading = false;
          this.alert.error();
        }
      });
    } else {
      this.dialog.close();
    }
  }

  getService(): Observable<any> {
    return this.isCoordinator
      ? this.service.setPatientStatus(this.data.id, this.selectCtrl.value)
      : this.service.changePatientStatus(this.data.id, this.selectCtrl.value);
  }
}
