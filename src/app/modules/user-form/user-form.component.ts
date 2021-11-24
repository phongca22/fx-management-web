import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter as filterLodash, find, sortBy, sumBy } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { Doctor } from 'src/app/core/doctor';
import { GENDER, IGender } from 'src/app/core/gender';
import { PatientCondition } from 'src/app/core/patient-condition';
import { Response } from 'src/app/core/response';
import { SGeneral } from 'src/app/core/sgeneral';
import { TestCovidTypeList } from 'src/app/core/test-covid-type.enum';
import { UserInfo } from 'src/app/core/user-info';
import { BGeneral, YesNo } from 'src/app/core/yes-no.enum';
import { DestroyService } from 'src/app/services/destroy.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { AddressService } from '../address/address.service';
import { District } from '../address/district';
import { Province } from '../address/province';
import { Ward } from '../address/ward';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [DestroyService]
})
export class UserFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() info: UserInfo;
  @Input() condition: PatientCondition;
  genders: IGender[] = GENDER;
  loading: boolean;
  doctors: Doctor[];
  provinces: Province[];
  districts: District[];
  wards: Ward[];
  total: number;
  testCovidTypes: SGeneral[] = TestCovidTypeList;
  yesNo: BGeneral[] = YesNo;

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
        province: ['']
      })
    );

    this.form.addControl(
      'condition',
      this.builder.group({
        background: [''],
        symptom: [''],
        spo2: [''],
        sickDays: [1],
        testCovid: [this.testCovidTypes[0]],
        member: [1],
        treated: [''],
        having: [''],
        zalo: [this.yesNo[0]],
        desire: [''],
        timer: [''],
        doctor: [null, Validators.required],
        note: [''],
        healthDeclaration: [this.yesNo[0]]
      })
    );

    this.form
      .get('info.province')
      ?.valueChanges.pipe(takeUntil(this.$destroy))
      .subscribe((data: Province) => {
        if (data) {
          this.districts = data.districts;
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
      .subscribe((data: District) => {
        if (data) {
          this.wards = data.wards;
        } else {
          this.wards = [];
        }

        this.form.patchValue({
          info: {
            ward: null
          }
        });
      });

    if (this.info) {
      const p = this.address.findProvince(this.info.province);
      this.form.patchValue({
        info: {
          ...this.info,
          fullname: this.info.name,
          gender: find(this.genders, { id: this.info.gender }),
          province: p
        }
      });

      if (p) {
        const d = this.address.findDistrict(p, this.info.district);
        setTimeout(() => {
          this.form.patchValue({
            info: {
              district: d
            }
          });

          if (d) {
            setTimeout(() => {
              this.form.patchValue({
                info: {
                  ward: this.address.findWard(d, this.info.ward)
                }
              });
            });
          }
        });
      }
    } else {
      this.doctor
        .getActiveDoctors()
        .pipe(takeUntil(this.$destroy))
        .subscribe((res: Response) => {
          if (res.ok) {
            this.doctors = sortBy(Doctor.parseActive(res.data), ['level']);
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

    if (this.condition) {
      this.form.get('condition.doctor')?.disable();
      this.form.patchValue({
        condition: {
          ...this.condition,
          testCovid: find(this.testCovidTypes, { id: this.condition.testCovid }),
          zalo: find(this.yesNo, { id: this.condition.zalo })
        }
      });
    }
  }
}
