import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserConditionType } from 'src/app/core/user-condition.enum';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-user-condition-picker',
  templateUrl: './user-condition-picker.component.html',
  styleUrls: ['./user-condition-picker.component.scss']
})
export class UserConditionPickerComponent implements OnInit {
  selectCtrl: FormControl;
  status: UserConditionType[];

  constructor(
    private dialog: MatDialogRef<UserConditionPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserConditionType,
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
