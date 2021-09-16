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
    let { info, condition } = this.form.value;
    const data = {
      info: {
        ...info,
        gender: info.gender?.id,
        province: info.province?.name,
        district: info.district?.name,
        ward: info.ward?.name
      },
      condition: {
        ...condition,
        doctorId: condition.doctor.info.id,
        testCovid: condition.testCovid.id,
        zalo: condition.zalo.id
      }
    };
    delete data.condition.doctor;
    this.service.createUser(data).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.form.reset();
        this.alert.success('userCreate.success');
        this.dialog.close(true);
      } else {
        if (res.data === 1) {
          this.alert.error('Số điện thoại đã tồn tại');
        } else if (res.data === 2) {
          this.alert.error('Địa chỉ đã tồn tại');
        } else {
          this.alert.error();
        }
      }
    });
  }
}
