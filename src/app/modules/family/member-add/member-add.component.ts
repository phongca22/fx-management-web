import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Response } from 'src/app/core/response';
import { User } from 'src/app/core/user';
import { UserInfo } from 'src/app/core/user-info';
import { AlertService } from '../../alert/alert.service';
import { DoctorPickerComponent } from '../../doctor-picker/doctor-picker.component';
import { FamilyService } from '../family.service';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit {
  nameCtrl: FormControl;
  loading: boolean;

  constructor(
    private dialog: MatDialogRef<DoctorPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private service: FamilyService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.nameCtrl = new FormControl('', Validators.required);
  }

  save() {
    this.loading = true;
    this.service.addMember(this.data.id, this.nameCtrl.value, this.data.doctor.id).subscribe((res: Response) => {
      if (res.ok) {
        this.dialog.close(new User(res.data));
      } else {
        this.loading = false;
        this.alert.error();
      }
    });
  }
}
