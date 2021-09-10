import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Response } from 'src/app/core/response';
import { UserConditionType } from 'src/app/core/user-condition.enum';
import { UserInfo } from 'src/app/core/user-info';
import { ConfigService } from 'src/app/services/config.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-user-condition-picker',
  templateUrl: './user-condition-picker.component.html',
  styleUrls: ['./user-condition-picker.component.scss']
})
export class UserConditionPickerComponent implements OnInit {
  selectCtrl: FormControl;
  status: UserConditionType[];
  loading: boolean;

  constructor(
    private dialog: MatDialogRef<UserConditionPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private config: ConfigService,
    private service: UserService,
    private alert: AlertService
  ) {
    this.status = this.config.status;
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.selectCtrl = new FormControl(this.status[this.status.indexOf(this.data.condition)], Validators.required);
  }

  save() {
    this.loading = true;
    if (this.selectCtrl.value !== this.data) {
      this.service.setCondition(this.data.id, this.selectCtrl.value).subscribe((res: Response) => {
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
