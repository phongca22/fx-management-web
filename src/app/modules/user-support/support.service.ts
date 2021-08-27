import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupportStatus } from 'src/app/core/support-status';
import { UserInfo } from 'src/app/core/user-info';
import { BaseService } from 'src/app/services/base-service';

@Injectable({
  providedIn: 'root'
})
export class SupportService extends BaseService {
  constructor(private http: HttpClient) {
    super();
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
}
