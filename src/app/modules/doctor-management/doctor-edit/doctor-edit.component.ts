import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doctor } from 'src/app/core/doctor';
import { DoctorLevelList, DoctorLevelType } from 'src/app/core/doctor-level.enum';
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
    this.form.patchValue({
      name: this.data.info.name,
      phone: this.data.info.phone,
      level: this.data.level
    });
  }

  setupForm(): void {
    this.form = this.builder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      level: [null, Validators.required]
    });
  }

  save(): void {
    this.loading = true;
    this.service.edit(this.data.info.id, this.form.value).subscribe((res: Response) => {
      if (res.ok) {
        this.dialog.close(this.form.value);
      } else {
        this.alert.error();
      }
    });
  }
}
