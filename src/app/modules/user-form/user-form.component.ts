import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { find } from 'lodash';
import { Doctor } from 'src/app/core/doctor';
import { GENDER, IGender } from 'src/app/core/gender';
import { UserInfo } from 'src/app/core/user-info';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() data: UserInfo;
  genders: IGender[] = GENDER;
  loading: boolean;
  doctors: Doctor[];

  constructor(private builder: FormBuilder, private service: UserService) {
    this.doctors = this.service.doctors;
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

    if (this.data) {
      this.form.get('info.doctor')?.disable();
      this.form.patchValue({
        info: {
          ...this.data,
          fullname: this.data.name,
          gender: find(this.genders, { id: this.data.gender })
        }
      });
    }
  }
}
