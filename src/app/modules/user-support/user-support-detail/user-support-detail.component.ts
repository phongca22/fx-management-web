import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { DestroyService } from 'src/app/services/destroy.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../../alert/alert.service';

@Component({
  selector: 'app-user-support-detail',
  templateUrl: './user-support-detail.component.html',
  styleUrls: ['./user-support-detail.component.scss'],
  providers: [DestroyService]
})
export class UserSupportDetailComponent implements OnInit {
  detail: UserSupport[];
  constructor(
    private service: UserService,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo,
    private alert: AlertService,
    private readonly $destroy: DestroyService
  ) {}

  ngOnInit(): void {
    this.service
      .getSupportStatusDetail(this.data.doctorAssignmentId)
      .pipe(takeUntil(this.$destroy))
      .subscribe((res: Response) => {
        if (res.ok) {
          this.detail = res.data.map((val: any) => new UserSupport(val));
        } else {
          this.alert.error();
        }
      });
  }
}
