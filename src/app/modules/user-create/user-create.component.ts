import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GENDER, IGender } from 'src/app/core/gender';
import { Response } from 'src/app/core/response';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;
  genders: IGender[] = GENDER;
  loading: boolean;
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(
    private service: UserService,
    private alert: AlertService,
    private dialog: MatDialogRef<UserCreateComponent>
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {}

  save(): void {
    this.loading = true;
    let data = { ...this.form.value.info };
    data = {
      ...data,
      gender: data.gender?.id,
      doctorId: data.doctor.info.id,
      province: data.province?.name,
      district: data.district?.name,
      ward: data.ward?.name
    };
    delete data.doctor;
    this.service.createUser(data).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.form.reset();
        this.alert.success('userCreate.success');
        this.dialog.close(true);
      } else {
        this.alert.error();
      }
    });
  }
}
