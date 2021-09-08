import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/core/user';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { Transporter } from 'src/app/core/volunteer';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { SupportService } from '../user-support/support.service';

@Component({
  selector: 'app-transporter-picker',
  templateUrl: './transporter-picker.component.html',
  styleUrls: ['./transporter-picker.component.scss']
})
export class TransporterPickerComponent implements OnInit {
  selectCtrl: FormControl;
  transporters: Transporter[];
  loading: boolean;

  constructor(
    private dialog: MatDialogRef<TransporterPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { info: UserInfo; patientSupport: UserSupport },
    private service: SupportService,
    private user: UserService,
    private alert: AlertService
  ) {
    this.user.getTransporters().subscribe((data: Transporter[]) => {
      this.transporters = data;
    });
  }

  ngOnInit(): void {
    this.setupForm();
    this.user.getTransporters().subscribe((data: Transporter[]) => (this.transporters = data));
  }

  setupForm(): void {
    this.selectCtrl = new FormControl(null, Validators.required);
  }

  save() {
    this.loading = true;
    if (this.selectCtrl.value !== this.data) {
      this.service
        .setTransporter(this.data.info, this.data.patientSupport.id, this.selectCtrl.value.id)
        .subscribe((res: Response) => {
          if (res.ok) {
            this.dialog.close(this.selectCtrl.value);
          } else {
            this.loading = false;
            this.alert.error();
          }
        });
    } else {
      this.dialog.close();
    }
  }
}
