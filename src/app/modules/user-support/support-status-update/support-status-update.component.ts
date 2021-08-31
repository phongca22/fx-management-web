import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Response } from 'src/app/core/response';
import { Support } from 'src/app/core/support';
import { SupportStatus } from 'src/app/core/support-status';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { AlertService } from '../../alert/alert.service';
import { AddSupportComponent } from '../add-support/add-support.component';
import { SupportService } from '../support.service';

@Component({
  selector: 'app-support-status-update',
  templateUrl: './support-status-update.component.html',
  styleUrls: ['./support-status-update.component.scss']
})
export class SupportStatusUpdateComponent implements OnInit {
  form: FormGroup;
  status: any[] = [SupportStatus.Delivering, SupportStatus.Delivered, SupportStatus.Failed].map(
    (val: SupportStatus) => ({ id: val, name: val })
  );
  loading: boolean;
  supports: Support[];

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialogRef<AddSupportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { info: UserInfo; support: UserSupport },
    private alert: AlertService,
    private service: SupportService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.form = this.builder.group({
      reason: [this.data.support.reason],
      status: [this.data.support.status, Validators.required]
    });
  }

  save() {
    this.loading = true;
    const { status, reason } = this.form.value;
    this.service.updateStatus(this.data.info, this.data.support.id, status, reason).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.dialog.close(new UserSupport(res.data));
      } else {
        this.alert.error();
      }
    });
  }
}
