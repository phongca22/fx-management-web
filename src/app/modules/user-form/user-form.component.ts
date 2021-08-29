import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { find } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { GENDER, IGender } from 'src/app/core/gender';
import { UserInfo } from 'src/app/core/user-info';
import { DestroyService } from 'src/app/services/destroy.service';
import { UserService } from 'src/app/services/user.service';
import { AddressService } from '../address/address.service';

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

  constructor(
    private builder: FormBuilder,
    private service: UserService,
    private address: AddressService,
    private readonly $destroy: DestroyService
  ) {
    this.doctors = this.service.doctors;
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
        doctor: [null, Validators.required]
      })
    );

    this.form
      .get('info.province')
      ?.valueChanges.pipe(takeUntil(this.$destroy))
      .subscribe(({ id }) => {
        this.districts = this.address.getDistricts(id);
        this.form.patchValue({
          info: {
            district: null,
            ward: null
          }
        });
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
      this.form.patchValue({
        info: {
          province: this.provinces[0]
        }
      });
    }
  }
}
