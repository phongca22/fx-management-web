import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GENDER, IGender } from 'src/app/core/gender';
import { PatientCondition } from 'src/app/core/patient-condition';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

interface DialogData {
  info: UserInfo;
  condition: PatientCondition;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  genders: IGender[] = GENDER;
  loading: boolean;

  constructor(
    private service: UserService,
    private alert: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialog: MatDialogRef<UserEditComponent>
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({});
  }

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
        testCovid: condition.testCovid.id,
        zalo: condition.zalo.id
      }
    };
    this.service.updateUser(this.data.info.id, data).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.dialog.close({
          info: new UserInfo({ info: res.data.info }),
          condition: new PatientCondition(res.data.condition)
        });
        this.alert.success('userEdit.success');
      } else {
        this.alert.error();
      }
    });
  }
}
