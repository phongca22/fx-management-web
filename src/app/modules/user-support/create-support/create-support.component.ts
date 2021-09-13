import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Support } from 'src/app/core/support';
import { UserInfo } from 'src/app/core/user-info';
import { ConfigService } from 'src/app/services/config.service';
import { AlertService } from '../../alert/alert.service';
import { AddSupportComponent } from '../add-support/add-support.component';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-create-support',
  templateUrl: './create-support.component.html',
  styleUrls: ['./create-support.component.scss']
})
export class CreateSupportComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  supports: Support[];

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialogRef<AddSupportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private alert: AlertService,
    private service: SupportService,
    private config: ConfigService
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
      const f = this.builder.group({
        id: [val.id],
        value: [0],
        name: [val.name]
      });

      this.list.push(f);
    });
  }

  save() {
    const t = this.form
      .get('list')
      ?.value.map(({ id, value }: any) => ({
        id: id,
        amount: value
      }))
      .filter(({ amount }: any) => amount > 0);

    if (t.length === 0) {
      return;
    }

    this.loading = true;
    this.service.createSupportsWithDate(this.data, t).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.dialog.close(true);
      } else {
        this.alert.error();
      }
    });
  }

  update(ctrl: AbstractControl, data: number) {
    const t = ctrl.get('value');
    const result = t?.value + data;
    if (result <= 0) {
      t?.setValue(0);
    } else {
      t?.setValue(t.value + data);
    }
  }
}
