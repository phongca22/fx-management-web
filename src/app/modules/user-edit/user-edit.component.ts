import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GENDER, IGender } from 'src/app/core/gender';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

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
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private dialog: MatDialogRef<UserEditComponent>
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({});
  }

  save(): void {
    this.loading = true;
    let data = { ...this.form.value.info };
    data = { ...data, gender: data.gender?.id, id: this.data.id };
    delete data.doctor;
    this.service.updateUser(data).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.dialog.close(new UserInfo(res.data));
        this.alert.success('userEdit.success');
      } else {
        this.alert.error();
      }
    });
  }
}
