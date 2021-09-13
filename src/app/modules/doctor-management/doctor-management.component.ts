import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { Response } from 'src/app/core/response';
import { DestroyService } from 'src/app/services/destroy.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-doctor-management',
  templateUrl: './doctor-management.component.html',
  styleUrls: ['./doctor-management.component.scss'],
  providers: [DestroyService]
})
export class DoctorManagementComponent implements OnInit {
  doctors: Doctor[];

  constructor(private doctor: DoctorService, private alert: AlertService, private readonly $destroy: DestroyService) {}

  ngOnInit(): void {
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

  change(event: MatSelectionListChange): void {
    const t = event.options[0];
    this.doctor.setActive(t.value.info.id, t.selected).subscribe((res: Response) => {
      if (!res.ok) {
        this.alert.error();
      }
    });
  }
}
