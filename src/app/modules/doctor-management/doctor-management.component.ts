import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { filter as filterLd, isNil, isString } from 'lodash';
import { of } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { USER_PROFILE } from 'src/app/core/page-config';
import { Response } from 'src/app/core/response';
import { removeAccents } from 'src/app/core/utility';
import { DestroyService } from 'src/app/services/destroy.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { RouterService } from 'src/app/services/router.service';
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
  isOpen: boolean;
  keyword: FormControl;
  @ViewChild('input') set keywordInput(element: ElementRef) {
    if (this.isOpen) {
      element.nativeElement.focus();
      this.cdr.detectChanges();
    }
  }
  filtered: Doctor[];

  constructor(
    private service: DoctorService,
    private alert: AlertService,
    private readonly $destroy: DestroyService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: RouterService
  ) {}

  ngOnInit(): void {
    this.getData();
    this.keyword = new FormControl();
    this.keyword.valueChanges
      .pipe(
        switchMap((val: string) => {
          if (val) {
            return of(
              filterLd(this.doctors, (item: Doctor) =>
                removeAccents(item.info.name.toLowerCase()).includes(removeAccents(val?.toLowerCase()))
              )
            );
          } else {
            return of(this.doctors);
          }
        }),
        takeUntil(this.$destroy)
      )
      .subscribe((data: Doctor[]) => (this.filtered = data));
  }

  open(): void {
    this.isOpen = !this.isOpen;
  }

  getData(): void {
    this.service
      .getDoctors()
      .pipe(takeUntil(this.$destroy))
      .subscribe((res: Response) => {
        if (res.ok) {
          this.doctors = res.data.map((val: any) => new Doctor(val));
          this.keyword.setValue('');
        } else {
          this.alert.error();
        }
      });
  }

  setOnline(event: MatSlideToggleChange, data: Doctor) {
    data.active = event.checked;
    this.service.setActive(data.info.id, event.checked).subscribe((res: Response) => {
      if (!res.ok) {
        this.alert.error();
        data.active = !data.active;
      }
    });
  }

  setActive(event: MatSlideToggleChange, data: Doctor) {
    data.enable = event.checked;
    this.service.setEnable(data.info.id, event.checked).subscribe((res: Response) => {
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
        data.info.gender = result.gender.id;
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

  close(): void {
    this.isOpen = false;
  }

  back(): void {
    this.router.go(USER_PROFILE);
  }
}
