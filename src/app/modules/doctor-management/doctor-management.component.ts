import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { isNil, isString } from 'lodash';
import { filter, takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { Response } from 'src/app/core/response';
import { DestroyService } from 'src/app/services/destroy.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { AlertService } from '../alert/alert.service';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';

@Component({
  selector: 'app-doctor-management',
  templateUrl: './doctor-management.component.html',
  styleUrls: ['./doctor-management.component.scss'],
  providers: [DestroyService]
})
export class DoctorManagementComponent implements OnInit {
  doctors: Doctor[];

  constructor(
    private doctor: DoctorService,
    private alert: AlertService,
    private readonly $destroy: DestroyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.doctor
      .getDoctors()
      .pipe(takeUntil(this.$destroy))
      .subscribe((res: Response) => {
        if (res.ok) {
          this.doctors = res.data.map((val: any) => new Doctor(val));
        } else {
          this.alert.error();
        }
      });
  }

  setActive(event: MatSlideToggleChange, data: Doctor) {
    data.active = event.checked;
    this.doctor.setActive(data.info.id, event.checked).subscribe((res: Response) => {
      if (!res.ok) {
        this.alert.error();
        data.active = !data.active;
      }
    });
  }

  setEnable(event: MatSlideToggleChange, data: Doctor) {
    data.enable = event.checked;
    this.doctor.setEnable(data.info.id, event.checked).subscribe((res: Response) => {
      if (res.ok) {
        if (!data.enable) {
          data.active = false;
        }
      } else {
        this.alert.error();
        data.enable = !data.enable;
      }
    });
  }

  edit(data: Doctor): void {
    this.dialog
      .open(DoctorEditComponent, {
        data: data,
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(filter((result: any) => !isNil(result) && !isString(result)))
      .subscribe((result: any) => {
        data.info.name = result.name;
        data.info.phone = result.phone;
        data.level = result.level;
      });
  }

  add(): void {
    this.dialog
      .open(DoctorEditComponent, {
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => this.getData());
  }
}
