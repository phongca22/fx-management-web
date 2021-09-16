import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Response } from 'src/app/core/response';
import { PatientStatusList, PatientStatusType } from 'src/app/core/user-condition.enum';
import { UserInfo } from 'src/app/core/user-info';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-patient-status-picker',
  templateUrl: './patient-status-picker.component.html',
  styleUrls: ['./patient-status-picker.component.scss']
})
export class PatientStatusPickerComponent implements OnInit {
  selectCtrl: FormControl;
  status: PatientStatusType[] = PatientStatusList;
  loading: boolean;

  constructor(
    private dialog: MatDialogRef<PatientStatusPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private service: UserService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.selectCtrl = new FormControl(this.status[this.status.indexOf(this.data.status)], Validators.required);
  }

  save() {
    this.loading = true;
    if (this.selectCtrl.value !== this.data) {
      this.service.changePatientStatus(this.data.id, this.selectCtrl.value).subscribe((res: Response) => {
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
}
