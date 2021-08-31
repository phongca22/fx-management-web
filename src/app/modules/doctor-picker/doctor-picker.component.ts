import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { find } from 'lodash';
import { Doctor } from 'src/app/core/doctor';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-doctor-picker',
  templateUrl: './doctor-picker.component.html',
  styleUrls: ['./doctor-picker.component.scss']
})
export class DoctorPickerComponent implements OnInit {
  selectCtrl: FormControl;
  doctors: Doctor[];
  loading: boolean;

  constructor(
    private dialog: MatDialogRef<DoctorPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private service: UserService,
    private alert: AlertService
  ) {
    this.doctors = this.service.doctors;
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.selectCtrl = new FormControl(find(this.doctors, { id: this.data.doctor.id }), Validators.required);
  }

  save() {
    this.loading = true;
    if (this.selectCtrl.value !== this.data) {
      this.service.setDoctor(this.data, this.selectCtrl.value.id).subscribe((res: Response) => {
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
