import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { find } from 'lodash';
import { UserStatusType } from 'src/app/core/user-status.enum';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-user-status-picker',
  templateUrl: './user-status-picker.component.html',
  styleUrls: ['./user-status-picker.component.scss']
})
export class UserStatusPickerComponent implements OnInit {
  selectCtrl: FormControl;
  status: UserStatusType[];

  constructor(
    private dialog: MatDialogRef<UserStatusPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserStatusType,
    private config: ConfigService
  ) {
    this.status = this.config.status;
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.selectCtrl = new FormControl(this.status[this.status.indexOf(this.data)], Validators.required);
  }

  save() {
    if (this.selectCtrl.value !== this.data) {
      this.dialog.close(this.selectCtrl.value);
    } else {
      this.dialog.close();
    }
  }
}
