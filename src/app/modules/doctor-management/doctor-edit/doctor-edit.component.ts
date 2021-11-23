import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { find } from 'lodash';
import { Doctor } from 'src/app/core/doctor';
import { DoctorLevelList, DoctorLevelType } from 'src/app/core/doctor-level.enum';
import { GENDER, IGender } from 'src/app/core/gender';
import { Response } from 'src/app/core/response';
import { DoctorService } from 'src/app/services/doctor.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  levels: DoctorLevelType[] = DoctorLevelList;
  genders: IGender[] = GENDER;

  constructor(
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Doctor,
    private service: DoctorService,
    private alert: AlertService,
    private dialog: MatDialogRef<DoctorEditComponent>
  ) {
    this.setupForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue({
        name: this.data.info.name,
        phone: this.data.info.phone,
        level: this.data.level,
        account: this.data.account,
        gender: find(this.genders, { id: this.data.info.gender })
      });

      this.form.get('account')?.disable();
      this.form.get('pass')?.disable();
    }
  }

  setupForm(): void {
    this.form = this.builder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      level: [DoctorLevelType.Level_1, Validators.required],
      account: ['', Validators.required],
      pass: ['', Validators.required],
      gender: [null, Validators.required]
    });
  }

  save(): void {
    this.loading = true;
    if (this.data) {
      this.service
        .edit(this.data.info.id, { ...this.form.value, gender: this.form.value.gender.id })
        .subscribe((res: Response) => {
          if (res.ok) {
            this.dialog.close(this.form.value);
          } else {
            this.loading = false;
            this.alert.error();
          }
        });
    } else {
      this.service.create({ ...this.form.value, gender: this.form.value.gender.id }).subscribe((res: Response) => {
        if (res.ok) {
          this.dialog.close(true);
        } else {
          this.loading = false;
          this.alert.error();
        }
      });
    }
  }
}
