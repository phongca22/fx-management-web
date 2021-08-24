import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { find } from 'lodash';
import { Response } from 'src/app/core/response';
import { SupportStatus } from 'src/app/core/support-status';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-user-support-edit',
  templateUrl: './user-support-edit.component.html',
  styleUrls: ['./user-support-edit.component.scss']
})
export class UserSupportEditComponent implements OnInit {
  form: FormGroup;
  status: any[] = [SupportStatus.Pending, SupportStatus.Delivering, SupportStatus.Delivered, SupportStatus.Failed].map(
    (val: SupportStatus) => ({ id: val, name: val })
  );
  loading: boolean;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialogRef<UserSupportEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private alert: AlertService,
    private service: UserService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  get list() {
    return this.form.controls['list'] as FormArray;
  }

  setupForm(): void {
    this.form = this.builder.group({
      list: this.builder.array([])
    });

    this.data.supports.map((val: UserSupport) => {
      const f = this.builder.group({
        id: [val.id],
        value: [find(this.status, { id: val.status })],
        name: [val.support.name]
      });

      this.list.push(f);
    });
  }

  save() {
    this.loading = true;
    const t = this.form.get('list')?.value.map(({ id, value }: any) => ({
      id: id,
      status: value.id
    }));
    this.service.updateUserSupport(t).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.dialog.close(t);
      } else {
        this.alert.error();
      }
    });
  }
}
