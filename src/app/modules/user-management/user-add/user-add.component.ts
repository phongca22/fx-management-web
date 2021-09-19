import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { find } from 'lodash';
import { Observable } from 'rxjs';
import { GENDER, IGender } from 'src/app/core/gender';
import { General } from 'src/app/core/general';
import { Response } from 'src/app/core/response';
import { Role } from 'src/app/core/role';
import { AlertService } from '../../alert/alert.service';
import { User } from '../user';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  roles: General[];
  genders: IGender[] = GENDER;

  constructor(
    private service: UserManagementService,
    private dialog: MatDialogRef<UserAddComponent>,
    private alert: AlertService,
    private builder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.setupForm();
  }

  ngOnInit(): void {
    this.service.getRoles().subscribe((data: General[]) => {
      this.roles = data;
      if (this.data) {
        this.setData();
      }
    });
  }

  setupForm(): void {
    this.form = this.builder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      phone: [],
      role: [Role.User, Validators.required]
    });
  }

  setData() {
    this.form.patchValue({
      user: this.data.username,
      name: this.data.name,
      gender: find(this.genders, { id: this.data.gender }),
      role: find(this.roles, { id: this.data.roles[0].id }),
      phone: this.data.phone
    });

    this.form.get('pass')?.disable();
    this.form.get('user')?.disable();
  }

  save(): void {
    this.loading = true;
    this.getService(this.form.value).subscribe((res: Response) => {
      if (res.ok) {
        if (this.data) {
          this.alert.success('userManagement.updateOk');
        } else {
          this.alert.success('userManagement.createOk');
        }
        this.dialog.close(true);
      } else {
        this.loading = false;
        if (res.data.code === 500) {
          this.alert.error('userManagement.duplicatedAccount');
        } else {
          this.alert.error();
        }
      }
    });
  }

  getService(data: any): Observable<any> {
    if (this.data) {
      return this.service.update(this.data.id, data);
    } else {
      return this.service.create(data);
    }
  }
}
