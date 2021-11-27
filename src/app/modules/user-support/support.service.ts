import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isString } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupportStatus } from 'src/app/core/support-status';
import { UserInfo } from 'src/app/core/user-info';
import { BaseService } from 'src/app/services/base-service';
import { AddSupportComponent } from './add-support/add-support.component';

@Injectable({
  providedIn: 'root'
})
export class SupportService extends BaseService {
  constructor(private http: HttpClient, private dialog: MatDialog) {
    super();
  }

  addSupports({ id }: UserInfo, data: any[], emergency?: boolean): Observable<any> {
    return this.http
      .post(`${this.api}/support/${id}/create`, {
        supports: data,
        emergency: emergency
      })
      .pipe(this.getResponse(), this.getError());
  }

  createSupportsWithDate({ id }: UserInfo, data: any[]): Observable<any> {
    return this.http
      .post(`${this.api}/support/${id}/create-with-date`, {
        supports: data
      })
      .pipe(this.getResponse(), this.getError());
  }

  createSupportsNow({ id }: UserInfo, data: any[], emergency?: boolean): Observable<any> {
    return this.http
      .post(`${this.api}/support/${id}/create-now`, {
        supports: data,
        emergency: emergency
      })
      .pipe(this.getResponse(), this.getError());
  }

  getSupports(id: number): Observable<any> {
    return this.http.get(`${this.api}/support/${id}`).pipe(this.getResponse(), this.getError());
  }

  setTransporter(userId: number, transporterId: number, psId: number): Observable<any> {
    return this.http
      .put(`${this.api}/support/transporter/assign`, {
        userId: userId,
        psId: psId,
        transporterId: transporterId
      })
      .pipe(this.getResponse(), this.getError());
  }

  createTransporterLogs(userId: number, psId: number, { transporterId, date, reason, status }: any): Observable<any> {
    return this.http
      .put(`${this.api}/support/transporter/create-logs`, {
        userId: userId,
        psId: psId,
        transporterId: transporterId,
        date: date,
        reason: reason,
        status: status
      })
      .pipe(this.getResponse(), this.getError());
  }

  updateStatus(userId: number, psId: number, status: SupportStatus, reason: string): Observable<any> {
    return this.http
      .put(`${this.api}/support/transporter/update-status`, {
        userId: userId,
        psId: psId,
        status: status,
        reason: reason
      })
      .pipe(this.getResponse(), this.getError());
  }

  confirmStatus(userId: number, psId: number, status: SupportStatus, reason: string): Observable<any> {
    return this.http
      .put(`${this.api}/support/transporter/confirm-status`, {
        userId: userId,
        psId: psId,
        status: status,
        reason: reason
      })
      .pipe(this.getResponse(), this.getError());
  }

  showAddSupports(data: UserInfo): Observable<boolean> {
    return this.dialog
      .open(AddSupportComponent, {
        data: data,
        width: '100%',
        maxWidth: '500px',
        maxHeight: '100vh',
        height: '100%',
        autoFocus: false,
        panelClass: ['main-dialog-bg', 'mat-dialog-no-padding']
      })
      .afterClosed()
      .pipe(
        map((val: any) => {
          if (isString(val)) {
            return false;
          } else {
            return val;
          }
        })
      );
  }
}
