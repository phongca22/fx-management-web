import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { find, sumBy } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { GENDER, IGender } from 'src/app/core/gender';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { DestroyService } from 'src/app/services/destroy.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { AddressService } from '../address/address.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [DestroyService]
})
export class UserFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: UserInfo;
  genders: IGender[] = GENDER;
  loading: boolean;
  doctors: Doctor[];
  provinces: any[];
  districts: any[];
  wards: any[];
  total: number;

  constructor(
    private builder: FormBuilder,
    private address: AddressService,
    private doctor: DoctorService,
    private readonly $destroy: DestroyService,
    private alert: AlertService
  ) {
    this.provinces = this.address.getProvinces();
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.form.addControl(
      'info',
      this.builder.group({
        fullname: ['', Validators.required],
        phone: ['', Validators.required],
        age: [],
        address: [''],
        gender: [],
        ward: [''],
        district: [''],
        province: [''],
        doctor: [null, Validators.required],
        member: [1]
      })
    );

    this.form
      .get('info.province')
      ?.valueChanges.pipe(takeUntil(this.$destroy))
      .subscribe((data: any) => {
        if (data) {
          this.districts = this.address.getDistricts(data.id);
          this.form.patchValue({
            info: {
              district: null,
              ward: null
            }
          });
        }
      });

    this.form
      .get('info.district')
      ?.valueChanges.pipe(takeUntil(this.$destroy))
      .subscribe((data: any) => {
        if (data) {
          this.wards = this.address.getWards(data.code);
        } else {
          this.wards = [];
        }

        this.form.patchValue({
          info: {
            ward: null
          }
        });
      });

    if (this.data) {
      this.form.get('info.doctor')?.disable();
      this.form.patchValue({
        info: {
          ...this.data,
          fullname: this.data.name,
          gender: find(this.genders, { id: this.data.gender }),
          province: find(this.provinces, { name: this.data.province })
        }
      });

      setTimeout(() => {
        this.form.patchValue({
          info: {
            district: find(this.districts, { name: this.data.district })
          }
        });

        setTimeout(() => {
          this.form.patchValue({
            info: {
              ward: find(this.wards, { name: this.data.ward })
            }
          });
        });
      });
    } else {
      this.doctor
        .getActiveDoctors()
        .pipe(takeUntil(this.$destroy))
        .subscribe((res: Response) => {
          if (res.ok) {
            this.doctors = res.data.map((val: any) => new Doctor({ count: val.count, ...val.doctor }));
            this.total = sumBy(this.doctors, 'count');
          } else {
            this.alert.error();
          }
        });
      this.form.patchValue({
        info: {
          province: this.provinces[0]
        }
      });
    }
  }
}
