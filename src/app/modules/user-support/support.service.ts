import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isEmpty } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SupportStatus } from 'src/app/core/support-status';
import { UserInfo } from 'src/app/core/user-info';
import { UserSupport } from 'src/app/core/user-support';
import { BaseService } from 'src/app/services/base-service';
import { AddSupportComponent } from './add-support/add-support.component';

@Injectable({
  providedIn: 'root'
})
export class SupportService extends BaseService {
  newSupportEvent: Subject<UserSupport[]>;
  constructor(private http: HttpClient, private dialog: MatDialog) {
    super();
    this.newSupportEvent = new Subject();
  }

  addSupports(id: number, data: any[]): Observable<any> {
    return this.http
      .post(`${this.api}/support/add`, {
        userId: id,
        supports: data
      })
      .pipe(this.getResponse(), this.getError());
  }

  getSupports(id: number): Observable<any> {
    return this.http.get(`${this.api}/support/${id}`).pipe(this.getResponse(), this.getError());
  }

  setVolunteer({ doctorAssignmentId, id }: UserInfo, psId: number, volunteerId: number): Observable<any> {
    return this.http
      .put(`${this.api}/support/volunteer`, {
        userId: id,
        daId: doctorAssignmentId,
        psId: psId,
        transporterId: volunteerId
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
      .put(`${this.api}/support/status`, {
        userId: id,
        daId: doctorAssignmentId,
        psId: psId,
        status: status,
        reason
      })
      .pipe(this.getResponse(), this.getError());
  }

  revoke({ id, doctorAssignmentId }: UserInfo, psId: number, revoke: boolean): Observable<any> {
    return this.http
      .put(`${this.api}/support/revoke`, {
        userId: id,
        daId: doctorAssignmentId,
        psId: psId,
        revoke: revoke
      })
      .pipe(this.getResponse(), this.getError());
  }

  showAddSupports(data: UserInfo): Observable<UserSupport[] | null> {
    return this.dialog
      .open(AddSupportComponent, {
        data: data,
        width: '100%',
        maxWidth: '96vw',
        autoFocus: false
      })
      .afterClosed()
      .pipe(
        map((val: UserSupport[] | string) => (isEmpty(val) ? null : (val as UserSupport[]))),
        tap((val: UserSupport[] | null) => {
          if (val) {
            this.newSupportEvent.next(val);
          }
        })
      );
  }

  listenNewSupports() {
    return this.newSupportEvent;
  }
}
