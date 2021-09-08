import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserInfo } from 'src/app/core/user-info';
import { AlertService } from '../../alert/alert.service';
import { UserInfoComponent } from '../user-info.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() data: UserInfo;

  constructor(private dialog: MatDialog, private clipboard: Clipboard, private alert: AlertService) {}

  ngOnInit(): void {}

  showInfo(): void {
    this.dialog
      .open(UserInfoComponent, {
        data: this.data,
        width: '100%',
        maxWidth: '100vw',
        height: '100%',
        maxHeight: '100vh',
        autoFocus: false,
        panelClass: 'mat-dialog-no-padding',
        disableClose: true
      })
      .afterClosed()
      .subscribe((data: UserInfo) => {
        this.data.name = data.name;
      });
  }

  copy(data: string): void {
    this.clipboard.copy(data);
    this.alert.info('userInfo.copied');
  }
}
