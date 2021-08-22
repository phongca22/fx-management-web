import { Injectable, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { DialogData } from '../confirm/confirm';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AlertComponent } from './alert.component';
import { Type } from './type.enum';
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  template: TemplateRef<any>;
  constructor(private service: MatSnackBar, private dialog: MatDialog, private translate: TranslateService) {}

  setTemplate(template: TemplateRef<any>): void {
    this.template = template;
  }

  create(type: Type, message: any) {
    this.service.openFromComponent(AlertComponent, {
      duration: 2500,
      data: {
        type: type,
        message: this.translate.instant(message)
      }
    });
  }

  success(message: string): void {
    this.create(Type.Success, message);
  }

  error(message?: string): void {
    this.create(Type.Error, message || 'error.general');
  }

  info(message: any): void {
    this.create(Type.Info, message);
  }

  getOpt(msg: string, title: string): any {
    return [title, msg];
  }

  confirm(data: DialogData, option?: any): Observable<any> {
    return this.dialog
      .open(ConfirmComponent, {
        data: data,
        ...option
      })
      .afterClosed();
  }
}
