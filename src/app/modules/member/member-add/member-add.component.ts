import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { General } from 'src/app/core/general';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { AlertService } from '../../alert/alert.service';
import { DoctorPickerComponent } from '../../doctor-picker/doctor-picker.component';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit {
  nameCtrl: FormControl;
  loading: boolean;
  members: General[];

  constructor(
    private dialog: MatDialogRef<DoctorPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private service: MemberService,
    private alert: AlertService
  ) {
    this.members = this.data.members;
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.nameCtrl = new FormControl('', Validators.required);
  }

  save() {
    this.loading = true;
    this.service.addMember(this.data.id, this.nameCtrl.value).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.nameCtrl.reset();
        this.members.push(new General(res.data));
      } else {
        this.alert.error();
      }
    });
  }

  remove(item: General, index: number): void {
    this.loading = true;
    this.service.removeMember(this.data.id, item.id).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.members.splice(index, 1);
      } else {
        this.alert.error();
      }
    });
  }
}
