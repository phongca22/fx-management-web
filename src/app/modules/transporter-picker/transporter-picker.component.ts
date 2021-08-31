import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { find } from 'lodash';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { Volunteer } from 'src/app/core/volunteer';
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
  volunteers: Volunteer[];
  loading: boolean;

  constructor(
    private dialog: MatDialogRef<TransporterPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { info: UserInfo; support: UserSupport },
    private service: SupportService,
    private user: UserService,
    private alert: AlertService
  ) {
    this.volunteers = this.user.volunteers;
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.selectCtrl = new FormControl(
      find(this.volunteers, { id: this.data.support.transporter?.id }),
      Validators.required
    );
  }

  save() {
    this.loading = true;
    if (this.selectCtrl.value !== this.data) {
      this.service
        .setVolunteer(this.data.info, this.data.support.id, this.selectCtrl.value.id)
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
