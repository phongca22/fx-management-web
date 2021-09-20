import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';
import { GENDER, IGender } from 'src/app/core/gender';
import { Response } from 'src/app/core/response';
import { RouterService } from 'src/app/services/router.service';
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
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(
    private service: UserService,
    private alert: AlertService,
    private dialog: MatDialogRef<UserCreateComponent>,
    private translate: TranslateService,
    private router: RouterService,
    private dialogSvc: MatDialog
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit(): void {}

  save(): void {
    let { info, condition } = this.form.value;
    const data = {
      info: {
        ...info,
        gender: info.gender?.id,
        province: info.province?.name,
        district: info.district?.name,
        ward: info.ward?.name
      },
      condition: {
        ...condition,
        doctorId: condition.doctor.info.id,
        testCovid: condition.testCovid.id,
        zalo: condition.zalo.id,
        healthDeclaration: condition.healthDeclaration.id
      }
    };
    delete data.condition.doctor;
    this.service
      .createUser(data)
      .pipe(
        tap(() => (this.loading = true)),
        concatMap((res: Response) => {
          if (res.ok) {
            this.form.reset();
            this.alert.success('userCreate.success');
            return of(true);
          } else {
            this.loading = false;
            if (res.data.code === 1) {
              return this.alert
                .confirm({
                  title: this.translate.instant('userCreate.phoneExistedMessage'),
                  ok: 'userCreate.view'
                })
                .pipe(
                  tap((result: boolean) => {
                    if (result) {
                      this.dialogSvc.closeAll();
                      this.router.goSearch(res.data.data);
                    }
                  })
                );
            } else if (res.data.code === 2) {
              return this.alert
                .confirm({
                  title: this.translate.instant('userCreate.addressExistedMessage'),
                  ok: 'userCreate.view'
                })
                .pipe(
                  tap((result: boolean) => {
                    if (result) {
                      this.dialogSvc.closeAll();
                      this.router.goSearch(res.data.data);
                    }
                  })
                );
            } else {
              this.alert.error();
              return of(false);
            }
          }
        })
      )
      .subscribe((result: boolean) => {
        if (result) {
          this.dialog.close(true);
        }
      });
  }
}
