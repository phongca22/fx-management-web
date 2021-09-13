import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { chain, keys } from 'lodash';
import { SupportStatus } from 'src/app/core/support-status';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { Transporter } from 'src/app/core/volunteer';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../../alert/alert.service';
import { NoteService } from '../../user-note/note.service';
import { SupportService } from '../../user-support/support.service';
import { TransporterPickerComponent } from '../transporter-picker.component';

@Component({
  selector: 'app-transporter-create',
  templateUrl: './transporter-create.component.html',
  styleUrls: ['./transporter-create.component.scss']
})
export class TransporterCreateComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  transporters: Transporter[];
  status: any[] = [SupportStatus.Delivered, SupportStatus.Failed].map((val: SupportStatus) => ({ id: val, name: val }));

  constructor(
    private dialog: MatDialogRef<TransporterPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { info: UserInfo; patientSupport: UserSupport },
    private service: SupportService,
    private user: UserService,
    private alert: AlertService,
    private note: NoteService,
    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setupForm();
    this.user.getTransporters().subscribe((data: Transporter[]) => (this.transporters = data));
  }

  setupForm(): void {
    this.form = this.builder.group({
      user: [null, Validators.required],
      date: [null, Validators.required],
      status: [SupportStatus.Delivered, Validators.required],
      reason: ['']
    });
  }

  save() {
    this.loading = true;
    const { user, date, status, reason } = this.form.value;
    this.service
      .createTransporterLogs(this.data.info.id, this.data.patientSupport.id, {
        transporterId: user.info.id,
        date: date,
        status: status,
        reason: reason
      })
      .subscribe((res: Response) => {
        if (res.ok) {
          this.note.refreshEvent.next();
          this.dialog.close();
        } else {
          this.loading = false;
          this.alert.error();
        }
      });
  }
}
