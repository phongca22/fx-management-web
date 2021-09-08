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

  addSupports({ id, doctorAssignmentId }: UserInfo, data: any[], emergency: boolean): Observable<any> {
    return this.http
      .post(`${this.api}/support/${id}/create`, {
        daId: doctorAssignmentId,
        supports: data,
        emergency: emergency
      })
      .pipe(this.getResponse(), this.getError());
  }

  getSupports(id: number): Observable<any> {
    return this.http.get(`${this.api}/support/${id}`).pipe(this.getResponse(), this.getError());
  }

  setTransporter({ doctorAssignmentId, id }: UserInfo, psId: number, transporter: number): Observable<any> {
    return this.http
      .put(`${this.api}/support/transporter/assign`, {
        userId: id,
        daId: doctorAssignmentId,
        psId: psId,
        transporterId: transporter
      })
      .pipe(this.getResponse(), this.getError());
  }

  updateStatus(
    { doctorAssignmentId, id }: UserInfo,
    psId: number,
    status: SupportStatus,
    reason: string
  ): Observable<any> {
    return this.http
      .put(`${this.api}/support/transporter/update-status`, {
        userId: id,
        daId: doctorAssignmentId,
        psId: psId,
        status: status,
        reason
      })
      .pipe(this.getResponse(), this.getError());
  }

  showAddSupports(data: UserInfo): Observable<boolean> {
    return this.dialog
      .open(AddSupportComponent, {
        data: data,
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
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
