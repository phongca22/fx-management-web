import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { find, sortBy, sumBy } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { DestroyService } from 'src/app/services/destroy.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-doctor-picker',
  templateUrl: './doctor-picker.component.html',
  styleUrls: ['./doctor-picker.component.scss'],
  providers: [DestroyService]
})
export class DoctorPickerComponent implements OnInit {
  selectCtrl: FormControl;
  doctors: Doctor[];
  loading: boolean;
  total: number;

  constructor(
    private dialog: MatDialogRef<DoctorPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private service: DoctorService,
    private alert: AlertService,
    private readonly $destroy: DestroyService
  ) {}

  ngOnInit(): void {
    this.setupForm();
    this.service
      .getActiveDoctors()
      .pipe(takeUntil(this.$destroy))
      .subscribe((res: Response) => {
        this.doctors = sortBy(Doctor.parseActive(res.data), ['level']);
        this.total = sumBy(this.doctors, 'count');
        this.selectCtrl.setValue(find(this.doctors, { info: { id: this.data.doctor.info.id } }));
      });
  }

  setupForm(): void {
    this.selectCtrl = new FormControl(null, Validators.required);
  }

  save() {
    this.loading = true;
    if (this.selectCtrl.value !== this.data) {
      this.service.setDoctor(this.data, this.selectCtrl.value.info.id).subscribe((res: Response) => {
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
