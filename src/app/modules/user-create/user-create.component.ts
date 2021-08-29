import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Doctor } from 'src/app/core/doctor';
import { REGISTER_100 } from 'src/app/core/error';
import { GENDER, IGender } from 'src/app/core/gender';
import { Response } from 'src/app/core/response';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;
  genders: IGender[] = GENDER;
  loading: boolean;
  doctors: Doctor[];
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(private service: UserService, private alert: AlertService) {
    this.doctors = this.service.doctors;
    this.form = new FormGroup({});
  }

  ngOnInit(): void {}

  save(): void {
    this.loading = true;
    let data = { ...this.form.value.info };
    data = {
      ...data,
      gender: data.gender?.id,
      doctorId: data.doctor.id,
      province: data.province?.name,
      district: data.district?.name,
      ward: data.ward?.name
    };
    delete data.doctor;
    delete data.province;
    delete data.ward;
    delete data.district;
    this.service.createUser(data).subscribe((res: Response) => {
      this.loading = false;
      if (res.ok) {
        this.form.reset();
        this.wrapper.nativeElement.scroll(0, 0);
        this.alert.success('userCreate.success');
      } else {
        if (res.errorCode === REGISTER_100) {
          this.alert.error('error.register.100');
        } else {
          this.alert.error();
        }
      }
    });
  }
}
