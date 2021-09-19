import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { Support } from 'src/app/core/support';
import { SupportStatus } from 'src/app/core/support-status';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { AlertService } from '../../alert/alert.service';
import { AuthService } from '../../auth/auth.service';
import { AddSupportComponent } from '../add-support/add-support.component';
import { SupportService } from '../support.service';

interface DialogData {
  id: number;
  psId: number;
}

@Component({
  selector: 'app-support-status-update',
  templateUrl: './support-status-update.component.html',
  styleUrls: ['./support-status-update.component.scss']
})
export class SupportStatusUpdateComponent implements OnInit {
  form: FormGroup;
  status: any[] = [SupportStatus.Delivered, SupportStatus.Failed].map((val: SupportStatus) => ({ id: val, name: val }));
  loading: boolean;
  supports: Support[];
  isCoordinator: boolean;

  constructor(
    public builder: FormBuilder,
    public dialog: MatDialogRef<AddSupportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public alert: AlertService,
    public service: SupportService,
    private auth: AuthService
  ) {
    this.isCoordinator = this.auth.hasRole(Role.Coordinator);
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.form = this.builder.group({
      reason: [null],
      status: [null, Validators.required]
    });
  }

  save() {
    this.loading = true;
    const { status, reason } = this.form.value;
    this.getService(status, reason).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.dialog.close(true);
      } else {
        this.alert.error();
      }
    });
  }

  getService(status: SupportStatus, reason: string): Observable<any> {
    return this.isCoordinator
      ? this.service.confirmStatus(this.data.id, this.data.psId, status, reason)
      : this.service.updateStatus(this.data.id, this.data.psId, status, reason);
  }
}
