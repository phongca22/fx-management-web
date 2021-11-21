import { Clipboard } from '@angular/cdk/clipboard';
import { HttpParams } from '@angular/common/http';
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
  @Input() show: boolean;
  isImporter: boolean;
  isAdmin: boolean;

  constructor(private dialog: MatDialog, private clipboard: Clipboard, private alert: AlertService) {}

  ngOnInit(): void {
    if (this.show) {
      this.showInfo();
    }
  }

  showInfo(): void {
    this.dialog
      .open(UserInfoComponent, {
        data: this.data.id,
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
        this.data.doctor = data.doctor;
        this.data.status = data.status;
      });
  }

  copyLink(): void {
    const params = new HttpParams({
      fromObject: {
        'benh-nhan': this.normalize(this.data.name),
        'tu-van': this.normalize(this.data.creator.info.name)
      }
    }).toString();
    this.clipboard.copy(`${window.origin}/main/search/${this.data.code || this.data.legacyCode}?${params.toString()}`);
    this.alert.info('userCard.linkCopied');
  }

  normalize(data: string): string {
    return encodeURIComponent(
      data
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/Đ/, 'D')
        .split(/\s+/)
        .join('_')
    );
  }
}
