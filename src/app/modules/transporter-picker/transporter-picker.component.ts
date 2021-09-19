import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { chain, keys } from 'lodash';
import { UserSupport } from 'src/app/core/user-support';
import { Transporter } from 'src/app/core/transporter';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';
import { NoteService } from '../user-note/note.service';
import { SupportService } from '../user-support/support.service';

interface DialogData {
  id: number;
  psId: number;
}
@Component({
  selector: 'app-transporter-picker',
  templateUrl: './transporter-picker.component.html',
  styleUrls: ['./transporter-picker.component.scss']
})
export class TransporterPickerComponent implements OnInit {
  selectCtrl: FormControl;
  loading: boolean;
  groups: { name: string; list: Transporter[] }[];

  constructor(
    private dialog: MatDialogRef<TransporterPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: SupportService,
    private user: UserService,
    private alert: AlertService,
    private note: NoteService
  ) {}

  ngOnInit(): void {
    this.setupForm();
    this.user.getTransporters().subscribe((data: Transporter[]) => this.group(data));
  }

  group(data: Transporter[]): void {
    const group = chain(data)
      .map((val: Transporter) => {
        return val.activeDistricts.map((district: string) => {
          return { ...val, district: district };
        });
      })
      .flatten()
      .groupBy('district')
      .value();

    const result = keys(group).map((key: string) => ({
      name: key,
      list: group[key]
    }));

    this.groups = result;
  }

  setupForm(): void {
    this.selectCtrl = new FormControl(null, Validators.required);
  }

  save() {
    this.loading = true;
    if (this.selectCtrl.value !== this.data) {
      this.service
        .setTransporter(this.data.id, this.selectCtrl.value.info.id, this.data.psId)
        .subscribe((res: Response) => {
          if (res.ok) {
            this.note.refresh();
            this.dialog.close();
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
