import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { Response } from 'src/app/core/response';
import { UserInfo } from 'src/app/core/user-info';
import { DestroyService } from 'src/app/services/destroy.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-user-pending',
  templateUrl: './user-processing.component.html',
  styleUrls: ['./user-processing.component.scss'],
  providers: [DestroyService]
})
export class UserProcessingComponent implements OnInit {
  data: UserInfo[];
  line: number;
  constructor(
    private service: UserService,
    private alert: AlertService,
    private dialog: MatDialog,
    private readonly $destroy: DestroyService
  ) {}

  ngOnInit(): void {
    this.service
      .getPendings()
      .pipe(takeUntil(this.$destroy))
      .subscribe((res: Response) => {
        if (res.ok) {
          this.data = res.data.map((val: any) => new UserInfo(val));
        } else {
          this.alert.error();
        }
      });
  }

  setLine(i: number): void {
    this.line = i;
  }

  removeLine(): void {
    this.line = -1;
  }
}
