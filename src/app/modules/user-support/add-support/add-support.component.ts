import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { find } from 'lodash';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { Support } from 'src/app/core/support';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { ConfigService } from 'src/app/services/config.service';
import { AlertService } from '../../alert/alert.service';
import { AuthService } from '../../auth/auth.service';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-add-support',
  templateUrl: './add-support.component.html',
  styleUrls: ['./add-support.component.scss']
})
export class AddSupportComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  supports: Support[];
  isManager: boolean;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialogRef<AddSupportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private alert: AlertService,
    private service: SupportService,
    private config: ConfigService,
    private auth: AuthService
  ) {
    this.supports = this.config.supports;
    this.isManager = this.auth.hasRole(Role.Coordinator);
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

  hasValue(): boolean {
    return (
      this.form
        .get('list')
        ?.value.map(({ id, value }: any) => ({
          id: id,
          amount: value
        }))
        .filter(({ amount }: any) => amount > 0).length > 0
    );
  }

  save(emergency?: boolean) {
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
    this.getService(t, emergency).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.dialog.close(true);
      } else {
        if (res.data.code === 1) {
          this.alert.error('addSupport.pendingError');
        } else {
          this.alert.error();
        }
      }
    });
  }

  getService(data: any[], emerency?: boolean): Observable<any> {
    return this.isManager
      ? this.service.createSupportsNow(this.data, data, emerency)
      : this.service.addSupports(this.data, data, emerency);
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
