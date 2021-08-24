import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, find, isNil } from 'lodash';
import { Response } from 'src/app/core/response';
import { Support } from 'src/app/core/support';
import { UserInfo } from 'src/app/core/user-info';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-support-picker',
  templateUrl: './support-picker.component.html',
  styleUrls: ['./support-picker.component.scss']
})
export class SupportPickerComponent implements OnInit {
  form: FormGroup;
  supports: Support[];
  loading: boolean;

  constructor(
    private config: ConfigService,
    private builder: FormBuilder,
    private dialog: MatDialogRef<SupportPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private service: UserService,
    private alert: AlertService
  ) {
    this.supports = this.config.supports;
  }

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

    this.supports.map((val: Support) => {
      const t = find(this.data.supports, ({ support }) => support.id === val.id);
      const f = this.builder.group({
        id: [val.id],
        value: [!isNil(t)],
        name: [val.name]
      });

      this.list.push(f);
    });
  }

  save() {
    this.loading = true;
    const data = filter(this.form.get('list')?.value, ['value', true]);
    this.service
      .setSupports(
        this.data.doctorAssignmentId,
        data.map(({ id }) => id)
      )
      .subscribe((res: Response) => {
        if (res.ok) {
          this.data.setSupport(
            res.data.map((val: any) => ({
              id: val.id,
              status: val.status,
              support: find(this.supports, { id: val.supportId })
            }))
          );
          this.dialog.close(this.data.supports);
        } else {
          this.loading = false;
          this.alert.error();
        }
      });
  }
}
